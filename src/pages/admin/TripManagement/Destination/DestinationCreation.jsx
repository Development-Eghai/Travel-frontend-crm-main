
import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { UpdateDestination } from "../../../../common/api/ApiService";
// import "jodit/build/jodit.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { NonEmptyArrayValidation, NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from "../../../../common/Validation";
import { errorMsg, successMsg } from "../../../../common/Toastify";
import { APIBaseUrl } from "../../../../common/api/api";


const DestinationCreation = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [createDestination, setCreateDestination] = useState({});
    const [destinationList, setDestinationList] = useState([])

    const [validation, setValidation] = useState({})

    const [customPackage, setCustomPackage] = useState([{ title: "", description: "", trip_packages: [] }]);

    const addCustomPackage = () => {
        setCustomPackage([...customPackage, { title: "", description: "", trip_packages: [] }]);
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
        formData.append("files", file);
        formData.append("storage", "local");
        // const response = await MultipleFileUpload(formData);
        // console.log(response, "response")

        // if (response?.statusCode !== 200) {
        //     errorMsg("Failed to upload file")
        //     return;
        // }

        const path = image_name;
        const existingImages = createDestination?.hero_image || [];

        const newPaths = Array.isArray(path)
            ? path.flat()
            : [path];

        const updatedImages = [...existingImages, ...newPaths];

        if (validation?.hero_image?.status === false) {
            setValidation((prev) => ({
                ...prev,
                hero_image: { status: true, message: "" },
            }));
        }

        setCreateDestination({
            ...createDestination,
            hero_image: updatedImages,
        });

        successMsg("File uploaded successfully");


    };

    const validateDetails = (data) => {
        let validate = {};
        validate.title = StringValidation(data?.title);
        validate.slug = SlugValidation(data?.slug);
        validate.subtitle = NonEmptyValidation(data?.subtitle);
        validate.hero_image = NonEmptyArrayValidation(data?.hero_image);


        validate.primary_destination_id = (!createDestination?.primary_destination_id || createDestination.primary_destination_id.length === 0)
            ? { status: false, message: "Primary destination is required" }
            : { status: true, message: "" };

        validate.popular_trip_ids = (!createDestination?.popular_trip_ids || createDestination.popular_trip_ids.length === 0)
            ? { status: false, message: "Popular trip packages are required" }
            : { status: true, message: "" };

        validate.featured_blog_ids = (!createDestination?.featured_blog_ids || createDestination.featured_blog_ids.length === 0)
            ? { status: false, message: "Feature blogs packages are required" }
            : { status: true, message: "" };

        validate.activity_ids = (!createDestination?.activity_ids || createDestination.activity_ids.length === 0)
            ? { status: false, message: "Activities are required" }
            : { status: true, message: "" };


        validate.destination_type = NonEmptyValidation(data?.destination_type);
        validate.overview = NonEmptyValidation(data?.overview);
        // validate.customPackage = NonEmptyFaqArrayValidation(data?.customPackage);
        validate.travel_guidelines = NonEmptyValidation(data?.travel_guidelines);
        return validate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // createDestination.custom_package = customPackage
        const cleanedData = normalizeEmptyFields(createDestination);

        cleanedData.custom_packages = [
            {
                "title": "Exclusive Honeymoon Package",
                "description": "Romantic getaways in Kerala, Goa, and Udaipur.",
                "trip_ids": [
                    103,
                    104
                ]
            },
            {
                "title": "Spiritual Retreats",
                "description": "Meditation and temple tours in Rishikesh and Varanasi.",
                "trip_ids": [
                    105
                ]
            }
        ]

        cleanedData.blog_category_ids = [
            201,
            202
        ]

        cleanedData.testimonial_ids = [
            501,
            502
        ]

        cleanedData.related_blog_ids = [
            302,
            303
        ]

        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {

            try {
                const res = await APIBaseUrl.post("destinations", cleanedData, {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                });
                if (res?.data?.success === true) {
                    navigate(-1)
                    successMsg("Destination created successsfully")
                    setCreateDestination({})
                    setCustomPackage([{ title: "", description: "", trip_packages: [] }])
                }

            } catch (error) {
                console.error("Error fetching trips:", error?.response?.data || error.message);
                throw error;
            }
        }

    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const { __v, createdAt, updatedAt, is_deleted, ...removedObject } = createDestination;

        const newData = {
            ...removedObject,
            faqs: faqs.map(({ _id, ...rest }) => rest),
        };

        const cleanedData = normalizeEmptyFields(newData);
        const isValide = validateDetails(cleanedData);
        setValidation(isValide);

        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await UpdateDestination(cleanedData);
            if (response?.statusCode === 200) {
                navigate(-1);
                successMsg("Destination Updated successfully");
                setCreateDestination({});
                setCustomPackage([{ title: "", description: "" }]);
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


    const getAllTrip = async () => {
        try {
            const res = await APIBaseUrl.get("trips/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {

                const mappedOptions = res?.data?.data?.map((trip) => ({
                    value: trip?.id,
                    label: trip?.title,
                }));
                setAllTrips(mappedOptions);
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
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
                setCreateDestination(res?.data?.data)
                setCustomPackage(res?.data?.data?.custom_packages || [{ title: "", description: "", trip_packages: [] }])
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    useEffect(() => {
        getAllDestination()
        if (id) {
            getSpecificDestination(id)
        }
        getAllTrip()
        getAllBlogPost()
        getAllActivities()
    }, [])


    return (
        <>

            <div className="tour-container">

                <div className='d-flex justify-content-between mb-5'>
                    <h3 className='my-auto'>Create Destination</h3>
                    <button className='admin-add-button mt-0' onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left me-2"></i> Back</button>
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
                                onChange={(e) => handleFileUpload(e, "hero_image")}
                            />

                            {validation?.hero_image?.status === false && validation?.hero_image?.message && (
                                <p className='error-para'>Banner Images {validation.hero_image.message}</p>
                            )}

                        {/* {createDestination?.hero_image && createDestination?.hero_image?.length > 0 && (
                                <div className="d-flex flex-wrap">
                                    {createDestination?.hero_image?.map((image, index) => (
                                        <div className='upload-image-div destination-image-div'>
                                            <div>
                                                <img src={`${BACKEND_DOMAIN}${image}`} alt="Category-Preview" key={index} />
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}  */}
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

                    {/* <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Primary Destination  <span className='required-icon'>*</span></label>
                            <select onChange={(e) => handleChange("primary_destination_id", e.target.value)}
                                onBlur={(e) => handleBlur("primary_destination_id", e.target.value)}
                                value={createDestination?.primary_destination_id || ""}>
                                <option value="null">None (Main Destination)</option>
                                {destinationList?.map((item, index) => (
                                    <option key={index} value={item?.id}>{item?.title}</option>
                                ))}
                            </select>
                            {validation?.primary_destination_id?.status === false && validation?.primary_destination_id?.message && (
                                <p className='error-para'>{validation?.primary_destination_id?.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Domestic / International  <span className='required-icon'>*</span></label>
                            <select onChange={(e) => handleChange("destination_type", e.target.value)}
                                onBlur={(e) => handleBlur("destination_type", e.target.value)}
                                value={createDestination?.destination_type}>
                                <option value="">Select Places</option>
                                <option value="domestic">Domestic</option>
                                <option value="international">International</option>
                            </select>
                            {validation?.destination_type?.status === false && validation?.destination_type?.message && (
                                <p className='error-para'>Destination Type {validation.destination_type.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Popular Trip Packages</label>
                            <Select
                                isMulti
                                placeholder="Select Trip Packages"
                                value={allTrips?.filter((opt) =>
                                    (createDestination?.popular_trip_ids || []).includes(opt.value)
                                )}
                                onChange={(selectedOptions) =>
                                    handleDropdown(
                                        "popular_trip_ids",
                                        selectedOptions ? selectedOptions.map((opt) => opt?.value) : []
                                    )
                                }
                                options={allTrips}
                            />
                            {validation?.popular_trip_ids?.status === false && validation?.popular_trip_ids?.message && (
                                <p className='error-para'>{validation.popular_trip_ids.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Blogs Category</label>
                            <select>
                                <option value="">Select Category</option>
                                <option value="Fixed Price">Blogs Category 1</option>
                                <option value="Price Per Person">Blogs Category 2</option>
                                <option value="Price Per Person">Blogs Category 3</option>
                                <option value="Price Per Person">Blogs Category 4</option>
                                <option value="Price Per Person">Blogs Category 5</option>
                            </select>
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
                                    handleDropdown("featured_blog_ids", selectedOptions?.map((opt) => opt?.value))
                                }
                                options={allBlogPost}
                            />
                            {validation?.featured_blog_ids?.status === false && validation?.featured_blog_ids?.message && (
                                <p className='error-para'>{validation.featured_blog_ids.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Activities</label>
                            <Select
                                isMulti
                                placeholder="Select Trip Packages"
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
                            {validation?.activity_ids?.status === false && validation?.activity_ids?.message && (
                                <p className='error-para'>{validation.activity_ids.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Testimonial</label>
                            <Select
                                isMulti
                                value={selectedOptions}
                                placeholder="Select Blogs"
                                onChange={handleDropdown}
                                options={options}
                            />
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Related Blogs</label>
                            <Select
                                isMulti
                                value={selectedOptions}
                                placeholder="Select Blogs"
                                onChange={handleDropdown}
                                options={options}
                            />
                        </div>
                    </div> */}

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
                        {validation?.overview?.status === false && validation?.overview?.message && (
                            <p className='error-para'>About Destination {validation.overview.message}</p>
                        )}

                    </div>
                </div>

                <div className='admin-input-div'>
                    <label>Create Custom Package</label>
                </div>

                <div className="mt-3 destination-faq">
                    <div className="accordion" id="accordionExample">
                        {customPackage.map((trip, index) => (
                            <div className='mt-4'>
                                <div className="accordion-item" key={index} >
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
                                                    onChange={(e) =>
                                                        updateCustomPackage(index, "description", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className='col-lg-6'>
                                                <div className='admin-input-div'>
                                                    <label>Select Trip Packages</label>
                                                    <Select
                                                        isMulti
                                                        value={allTrips?.filter(opt => trip?.trip_packages?.includes(opt.value))}
                                                        placeholder="Select Packages Here..."
                                                        onChange={(selectedOptions) =>
                                                            updateCustomPackage(index, "trip_packages", selectedOptions.map((opt) => opt?.value))
                                                        }
                                                        options={allTrips}
                                                    />
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
                        {validation?.travel_guidelines?.status === false && validation?.travel_guidelines?.message && (
                            <p className='error-para'>Destination Guidance{validation.travel_guidelines.message}</p>
                        )}
                    </div>
                </div>

                {id ? <button className="create-common-btn" onClick={(e) => handleUpdate(e)}>Update</button> :
                    <button className="create-common-btn" onClick={(e) => handleSubmit(e)}>Create</button>}


            </div>

        </>
    )
}

export default DestinationCreation
