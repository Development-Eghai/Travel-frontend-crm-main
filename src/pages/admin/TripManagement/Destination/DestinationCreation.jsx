import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { UpdateDestination } from "../../../../common/api/ApiService";
// import "jodit/build/jodit.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { NonEmptyArrayValidation, NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from "../../../../common/Validation";
import { errorMsg, successMsg } from "../../../../common/Toastify";
import { APIBaseUrl } from "../../../../common/api/api";
import { CircularProgress } from "@mui/material";


const DestinationCreation = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    
    // STATE TO MANAGE DROPDOWN LOADING (FIX 1)
    const [isTripsLoading, setIsTripsLoading] = useState(true);

    const [createDestination, setCreateDestination] = useState({});
    const [destinationList, setDestinationList] = useState([])

    const [validation, setValidation] = useState({})

    const [customPackage, setCustomPackage] = useState([{ title: "", description: "", trip_ids: [] }]);

    const addCustomPackage = () => {
        setCustomPackage([...customPackage, { title: "", description: "", trip_ids: [] }]);
    };

    const deleteCustomPackage = (indexToRemove) => {
        if (indexToRemove !== 0) {
            const updatedFaqs = customPackage.filter((_, index) => index !== indexToRemove);
            setCustomPackage(updatedFaqs);
        }
    };

    const updateCustomPackage = (index, key, value) => {
        const updatedFaqs = [...customPackage];
        updatedFaqs[index][key] = value;
        setCustomPackage(updatedFaqs);
    };

    const handleChange = (key, value) => {
        setCreateDestination({ ...createDestination, [key]: value })
        if (validation[key]) {
            setValidation({ ...validation, [key]: false })
        }
    }

    const handleBlur = (fieldName, value) => {
        const updatedData = {
            ...createDestination,
            [fieldName]: value,
        };

        const cleanedData = normalizeEmptyFields(updatedData);
        const fieldValidation = validateDetails(cleanedData);

        setValidation((prev) => ({
            ...prev,
            [fieldName]: fieldValidation[fieldName],
        }));
    };

    // --- FUNCTION: REMOVE IMAGE ---
    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = createDestination.hero_banner_images.filter(
            (_, index) => index !== indexToRemove
        );

        // Re-validate if the array becomes empty
        const validationCheck = NonEmptyArrayValidation(updatedImages);
        if (validationCheck.status === false) {
             setValidation((prev) => ({
                ...prev,
                hero_banner_images: validationCheck,
            }));
        }

        setCreateDestination({
            ...createDestination,
            hero_banner_images: updatedImages,
        });
    };
    // ----------------------------------

    const handleFileUpload = async (e, key) => {
        const file = e.target.files[0];

        if (!file) return;
        let image_name = e?.target?.files[0]?.name;
        let image_type = image_name?.split(".");
        let type = image_type?.pop();
        if (type !== "jpeg" && type !== "png" && type !== "jpg" && type !== "pdf" && type !== "webp") {
            errorMsg
                ("Unsupported file type")
            return;
        }

        const formData = new FormData();
        formData.append("gallery_images", file);
        formData.append("storage", "local");
        try {
            const res = await APIBaseUrl.post("https://api.yaadigo.com/multiple", formData);
            if (res?.data?.message === "Files uploaded") {
                successMsg("Image uploaded successfully");
                const path = res.data.files;
                const existingImages = createDestination?.hero_banner_images || [];

                const newPaths = Array.isArray(path)
                    ? path.flat()
                    : [path];

                const updatedImages = [...existingImages, ...newPaths];
                if (validation?.hero_banner_images?.status === false) {
                    setValidation((prev) => ({
                        ...prev,
                        hero_banner_images: { status: true, message: "" },
                    }));
                }

                setCreateDestination({
                    ...createDestination,
                    hero_banner_images: updatedImages,
                });
            }
        } catch (error) {
            console.error("Upload error:", error);
            errorMsg("File upload failed");
        }

    };

    const validateDetails = (data) => {
        let validate = {};
        // These fields are mandatory:
        validate.title = StringValidation(data?.title);
        validate.slug = SlugValidation(data?.slug);
        validate.subtitle = NonEmptyValidation(data?.subtitle);
        validate.hero_banner_images = NonEmptyArrayValidation(data?.hero_banner_images);
        // All other fields are optional

        return validate;
    };

    const handleSubmit = async (e) => {
        console.log("in handleSubmit")
        e.preventDefault()

        const cleanedData = normalizeEmptyFields(createDestination);

        cleanedData.custom_packages = customPackage

        cleanedData.testimonial_ids = [
            501,
            502
        ]

        cleanedData.related_blog_ids = [
            302,
            303
        ]

        // Convert primary_destination_id to integer or null
        if (cleanedData.primary_destination_id === "null" || cleanedData.primary_destination_id === "" || !cleanedData.primary_destination_id) {
            cleanedData.primary_destination_id = null;
        } else {
            cleanedData.primary_destination_id = parseInt(cleanedData.primary_destination_id);
        }

        // Ensure featured_blog_ids is always present
        if (!cleanedData.featured_blog_ids || cleanedData.featured_blog_ids.length === 0) {
            cleanedData.featured_blog_ids = [];
        }
        
        // Ensure trip IDs are numbers before sending to API
        cleanedData.popular_trip_ids = (cleanedData.popular_trip_ids || []).map(Number);
        cleanedData.custom_packages = cleanedData.custom_packages.map(pkg => ({
            ...pkg,
            trip_ids: (pkg.trip_ids || []).map(Number)
        }));


        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            console.log(cleanedData, "cleanedDatacleanedData")
            try {
                setIsLoading(true);
                const res = await APIBaseUrl.post("destinations", cleanedData, {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                });
                if (res?.data?.success === true) {
                    navigate(-1)
                    setIsLoading(false);
                    successMsg("Destination created successsfully")
                    setCreateDestination({})
                    setCustomPackage([{ title: "", description: "", trip_ids: [] }])
                }

            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching trips:", error?.response?.data || error.message);
                errorMsg(error?.response?.data?.message || "Failed to create destination");
            }
        }

    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const { __v, createdAt, updatedAt, is_deleted, ...removedObject } = createDestination;

        const newData = {
            ...removedObject,
            custom_packages: customPackage
        };

        // Convert primary_destination_id to integer or null
        if (newData.primary_destination_id === "null" || newData.primary_destination_id === "" || !newData.primary_destination_id) {
            newData.primary_destination_id = null;
        } else {
            newData.primary_destination_id = parseInt(newData.primary_destination_id);
        }

        // Ensure featured_blog_ids is always present
        if (!newData.featured_blog_ids || newData.featured_blog_ids.length === 0) {
            newData.featured_blog_ids = [];
        }

        newData.testimonial_ids = [501, 502];
        newData.related_blog_ids = [302, 303];
        
        // Ensure trip IDs are numbers before sending to API
        newData.popular_trip_ids = (newData.popular_trip_ids || []).map(Number);
        newData.custom_packages = newData.custom_packages.map(pkg => ({
            ...pkg,
            trip_ids: (pkg.trip_ids || []).map(Number)
        }));


        const cleanedData = normalizeEmptyFields(newData);
        const isValide = validateDetails(cleanedData);
        setValidation(isValide);

        if (Object.values(isValide).every((data) => data?.status === true)) {
            try {
                setIsLoading(true);
                const res = await APIBaseUrl.put(`destinations/${id}`, cleanedData, {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                });
                if (res?.data?.success === true) {
                    setIsLoading(false);
                    navigate(-1);
                    successMsg("Destination Updated successfully");
                    setCreateDestination({});
                    setCustomPackage([{ title: "", description: "", trip_ids: [] }]);
                }
            } catch (error) {
                setIsLoading(false);
                console.error("Error updating destination:", error?.response?.data || error.message);
                errorMsg(error?.response?.data?.message || "Failed to update destination");
            }
        }
    };

    const editor = useRef(null);
    const editor2 = useRef(null);

    const options = [
        { value: 'adventure', label: 'Adventure' },
        { value: 'beach', label: 'Beach' },
        { value: 'wildlife', label: 'Wildlife' },
        { value: 'cultural', label: 'Cultural' },
        { value: 'honeymoon', label: 'Honeymoon' }
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleDropdown = (dropdownName, selected) => {
        setCreateDestination((prev) => ({
            ...prev,
            [dropdownName]: selected || [],
        }));

    };

    // Dropdown APi

    const [allTrips, setAllTrips] = useState([]);
    const [allBlogPost, setAllBlogPost] = useState([]);
    const [allActivity, setAllActivity] = useState([]);
    const [allBlogCategory, setAllBlogCategory] = useState([]);


    const getAllTrip = async () => {
        setIsTripsLoading(true); // Start loading
        try {
            const res = await APIBaseUrl.get("trips/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {

                const mappedOptions = res?.data?.data?.map((trip) => ({
                    value: trip?.id, // ID is stored here as a number
                    label: trip?.title,
                }));
                setAllTrips(mappedOptions);
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        } finally {
             setIsTripsLoading(false); // Stop loading regardless of success/error
        }
    }

    const getAllDestination = async () => {
        try {
            const res = await APIBaseUrl.get("destinations/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {

                setDestinationList(res?.data?.data);
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const getAllBlogPost = async () => {
        try {
            const res = await APIBaseUrl.get("blog-posts/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                const mappedOptions = res?.data?.data?.map((trip) => ({
                    value: trip?.id,
                    label: trip?.heading,
                }));
                setAllBlogPost(mappedOptions);
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const getAllBlogCategory = async () => {
        try {
            const res = await APIBaseUrl.get("blog-categories/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                const mappedOptions = res?.data?.data?.map((trip) => ({
                    value: trip?.id,
                    label: trip?.name,
                }));
                setAllBlogCategory(mappedOptions);
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const getAllActivities = async () => {
        try {
            const res = await APIBaseUrl.get("activities/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                const mappedOptions = res?.data?.data?.map((trip) => ({
                    value: trip?.id,
                    label: trip?.name,
                }));
                setAllActivity(mappedOptions);
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }



    const getSpecificDestination = async (id) => {

        try {
            const res = await APIBaseUrl.get(`destinations/${id}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                const destinationData = res?.data?.data;
                
                // FIX 1: Convert ALL ID ARRAYS TO NUMBERS EXPLICITLY on load
                if (destinationData.popular_trip_ids) {
                    destinationData.popular_trip_ids = (destinationData.popular_trip_ids || []).map(Number);
                }

                if (destinationData.custom_packages) {
                    destinationData.custom_packages = destinationData.custom_packages.map(pkg => ({
                        ...pkg,
                        // Convert custom package trip IDs to numbers
                        trip_ids: (pkg.trip_ids || []).map(Number)
                    }));
                }

                setCreateDestination(destinationData)
                setCustomPackage(destinationData.custom_packages || [{ title: "", description: "", trip_ids: [] }])
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            // Wait for trips to load first
            await getAllTrip(); 
            
            await getAllDestination();
            await getAllBlogPost();
            await getAllActivities();
            await getAllBlogCategory();
            
            if (id) {
                // Fetch specific destination data after trips are loaded
                await getSpecificDestination(id);
            }
        };

        fetchData();
    }, [id])

    console.log(createDestination, "createDestination")
    console.log(validation, "validation")


    return (
        <>

            <div className="tour-container">

                <div className='d-flex justify-content-between mb-5'>
                    <h3 className='my-auto'>{id ? "Edit Destination" : "Create Destination"}</h3>
                    <button className='admin-add-button mt-0' onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left me-2"></i> Back</button>
                </div>

                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Destination Name <span className='required-icon'>*</span></label>
                            <input type="text" value={createDestination?.title || ""} placeholder="Enter Destination Name"
                                onChange={(e) => handleChange("title", e.target.value)}
                                onBlur={(e) => handleBlur("title", e.target.value)} />
                            {validation?.title?.status === false && validation?.title?.message && (
                                <p className='error-para'>Destination Name {validation.title.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Slug <span className='required-icon'>*</span></label>
                            <input type="text" value={createDestination?.slug || ""} placeholder="Enter Slug"
                                onChange={(e) => handleChange("slug", e.target.value)}
                                onBlur={(e) => handleBlur("slug", e.target.value)} />
                            {validation?.slug?.status === false && validation?.slug?.message && (
                                <p className='error-para'>Slug {validation.slug.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className="admin-input-div">
                            <label>Hero Banner Images <span className='required-icon'>*</span></label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => handleFileUpload(e, "hero_banner_images")}
                            />

                            {validation?.hero_banner_images?.status === false && validation?.hero_banner_images?.message && (
                                <p className='error-para'>Banner Images {validation.hero_banner_images.message}</p>
                            )}

                            {createDestination?.hero_banner_images && createDestination?.hero_banner_images?.length > 0 && (
                                <div className="d-flex flex-wrap">
                                    {createDestination?.hero_banner_images?.map((image, index) => (
                                        <div className='upload-image-div destination-image-div' key={index} style={{position: 'relative'}}>
                                            <div>
                                                <img src={encodeURI(image)} alt="Category-Preview" />
                                            </div>
                                            {/* DELETE BUTTON ADDED */}
                                            <span 
                                                className="delete-image-icon" 
                                                onClick={() => handleRemoveImage(index)}
                                                style={{
                                                    position: 'absolute', 
                                                    top: '5px', 
                                                    right: '5px', 
                                                    background: 'red', 
                                                    color: 'white', 
                                                    borderRadius: '50%', 
                                                    width: '20px', 
                                                    height: '20px', 
                                                    textAlign: 'center', 
                                                    cursor: 'pointer', 
                                                    lineHeight: '20px',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                &times;
                                            </span>
                                            {/* END DELETE BUTTON */}
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Description <span className='required-icon'>*</span></label>
                            <textarea type="text" className="form-control" value={createDestination?.subtitle || ""} placeholder="Enter Description"
                                onChange={(e) => handleChange("subtitle", e.target.value)}
                                onBlur={(e) => handleBlur("subtitle", e.target.value)}
                            />
                            {validation?.subtitle?.status === false && validation?.subtitle?.message && (
                                <p className='error-para'>Description {validation.subtitle.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Primary Destination </label>
                            <select onChange={(e) => handleChange("primary_destination_id", e.target.value)}
                                onBlur={(e) => handleBlur("primary_destination_id", e.target.value)}
                                value={createDestination?.primary_destination_id || ""}>
                                <option value="null">None (Main Destination)</option>
                                {destinationList?.map((item, index) => (
                                    <option key={index} value={item?.id}>{item?.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Domestic / International</label>
                            <select onChange={(e) => handleChange("destination_type", e.target.value)}
                                onBlur={(e) => handleBlur("destination_type", e.target.value)}
                                value={createDestination?.destination_type}>
                                <option value="">Select Places</option>
                                <option value="domestic">Domestic</option>
                                <option value="international">International</option>
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Popular Trip Packages</label>
                            {/* Conditional rendering to prevent empty dropdowns before data loads */}
                            {isTripsLoading ? (
                                <div className="d-flex justify-content-center py-2">
                                    <CircularProgress size={24} color="inherit" />
                                </div>
                            ) : (
                                <Select
                                    isMulti
                                    value={allTrips?.filter((opt) =>
                                        (createDestination?.popular_trip_ids || []).includes(opt.value)
                                    )}
                                    onChange={(selectedOptions) =>
                                        handleDropdown(
                                            "popular_trip_ids",
                                            // FIX 2: Ensure saved values are explicitly numbers
                                            selectedOptions ? selectedOptions.map((opt) => Number(opt?.value)) : []
                                        )
                                    }
                                    options={allTrips}
                                />
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Blogs Category</label>
                            <Select
                                isMulti
                                value={allBlogCategory?.filter((opt) =>
                                    (createDestination?.blog_category_ids || []).includes(opt.value)
                                )}
                                onChange={(selectedOptions) =>
                                    handleDropdown(
                                        "blog_category_ids",
                                        selectedOptions ? selectedOptions.map((opt) => opt?.value) : []
                                    )
                                }
                                options={allBlogCategory}
                            />
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Featured Blogs</label>
                            <Select
                                isMulti
                                placeholder="Select Blogs"
                                value={allBlogPost?.filter((opt) =>
                                    (createDestination?.featured_blog_ids || []).includes(opt.value)
                                )}
                                onChange={(selectedOptions) =>
                                    handleDropdown(
                                        "featured_blog_ids",
                                        selectedOptions ? selectedOptions.map((opt) => opt?.value) : []
                                    )
                                }
                                options={allBlogPost}
                            />
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Activities</label>
                            <Select
                                isMulti
                                value={allActivity.filter((opt) =>
                                    (createDestination?.activity_ids || []).includes(opt.value)
                                )}
                                onChange={(selectedOptions) =>
                                    handleDropdown(
                                        "activity_ids",
                                        selectedOptions ? selectedOptions.map((opt) => opt?.value) : []
                                    )
                                }
                                options={allActivity}
                            />
                        </div>
                    </div>

                </div>

                <div className='admin-input-div mt-5'>
                    <label>About Tour Packages</label>

                    <div className="mt-3">
                        <JoditEditor
                            ref={editor}
                            value={createDestination?.overview || ""}
                            config={{
                                readonly: false,
                                height: 300,
                                toolbarButtonSize: "middle",
                                askBeforePasteHTML: false,
                                askBeforePasteFromWord: false,
                                defaultActionOnPaste: "insert_clear_html",
                                allowPaste: true
                            }}
                            tabIndex={1}
                            onBlur={(newContent) => handleChange("overview", newContent)}
                        />

                    </div>
                </div>



                <div className="mt-3 destination-faq">
                    <div className='admin-input-div'>
                        <label>Create Custom Package</label>
                    </div>
                    <div className="accordion" id="accordionExample">
                        {customPackage.map((trip, index) => (
                            <div className='mt-4' key={index}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header d-flex align-items-center justify-content-between">
                                        <button
                                            className="accordion-button flex-grow-1"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index}`}
                                            aria-expanded="true"
                                            aria-controls={`collapse${index}`}
                                        >
                                            Custom Package {index + 1}
                                        </button>
                                        <div className="ms-3 d-flex gap-2">
                                            <button className={`destination-faq-add ${index === 0 && "me-3"}`} onClick={addCustomPackage}>
                                                Add
                                            </button>
                                            {index !== 0 && (
                                                <button
                                                    className="destination-faq-add faq-delete me-3"
                                                    onClick={() => deleteCustomPackage(index)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </h2>

                                    <div
                                        id={`collapse${index}`}
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">

                                            <div className="admin-input-div mb-3">
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter title"
                                                    value={trip?.title}
                                                    onChange={(e) =>
                                                        updateCustomPackage(index, "title", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="admin-input-div admin-desti-faq">
                                                <label>Description</label>
                                                <textarea
                                                    className="form-control"
                                                    value={trip?.description}
                                                    placeholder="Enter Description"
                                                    onChange={(e) =>
                                                        updateCustomPackage(index, "description", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className='col-lg-6'>
                                                <div className='admin-input-div'>
                                                    <label>Select Trip Packages</label>
                                                    {/* Conditional rendering to prevent empty dropdowns before data loads */}
                                                    {isTripsLoading ? (
                                                        <div className="d-flex justify-content-center py-2">
                                                            <CircularProgress size={24} color="inherit" />
                                                        </div>
                                                    ) : (
                                                        <Select
                                                            isMulti
                                                            value={allTrips?.filter(opt => (trip?.trip_ids || []).includes(opt.value))}
                                                            placeholder="Select Packages Here..."
                                                            onChange={(selectedOptions) =>
                                                                // FIX 2: Ensure saved values are explicitly numbers
                                                                updateCustomPackage(index, "trip_ids", selectedOptions.map((opt) => Number(opt?.value)))
                                                            }
                                                            options={allTrips}
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {validation?.customPackage?.status === false && validation?.customPackage?.message && (
                                    <p className='error-para'>{validation.customPackage.message}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='admin-input-div mt-5'>
                    <label>Travel Guidelines</label>

                    <div className="mt-3">
                        <JoditEditor
                            ref={editor2}
                            value={createDestination?.travel_guidelines || ""}
                            config={{
                                readonly: false,
                                height: 300,
                                toolbarButtonSize: "middle",
                                askBeforePasteHTML: false,
                                askBeforePasteFromWord: false,
                                defaultActionOnPaste: "insert_clear_html",
                                allowPaste: true
                            }}
                            tabIndex={1}
                            onBlur={(newContent) => handleChange("travel_guidelines", newContent)}
                        />
                    </div>
                </div>
            
                {id ? 
                    <button className="create-common-btn" onClick={(e) => handleUpdate(e)} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Update"}
                    </button> 
                    :
                    <button className="create-common-btn" onClick={(e) => handleSubmit(e)} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create"}
                    </button>
                } 

            </div>

        </>
    )
}

export default DestinationCreation