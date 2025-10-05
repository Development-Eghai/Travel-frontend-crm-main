
import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { CreateDestination, GetAllDestination, GetSpecificDestination, MultipleFileUpload, UpdateDestination } from "../../../../common/api/ApiService";
// import "jodit/build/jodit.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { NonEmptyArrayValidation, NonEmptyFaqArrayValidation, NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from "../../../../common/Validation";
import { errorMsg, successMsg } from "../../../../common/Toastify";
import { BACKEND_DOMAIN } from "../../../../common/api/ApiClient";
import MyDataTable from "../../../../component/MyDataTable";


const DestinationCreation = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [createDestination, setCreateDestination] = useState({});
    const [destinationList, setDestinationList] = useState([])

    const [validation, setValidation] = useState({})

    const [faqs, setFaqs] = useState([{ faq_question: "", faq_answer: "" }]);

    const addFaq = () => {
        setFaqs([...faqs, { faq_question: "", faq_answer: "" }]);
    };

    const deleteFaq = (indexToRemove) => {
        if (indexToRemove !== 0) {
            const updatedFaqs = faqs.filter((_, index) => index !== indexToRemove);
            setFaqs(updatedFaqs);
        }
    };

    const updateFaq = (index, key, value) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index][key] = value;
        setFaqs(updatedFaqs);
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
        const response = await MultipleFileUpload(formData);
        console.log(response, "response")

        if (response?.statusCode !== 200) {
            errorMsg("Failed to upload file")
            return;
        }

        const path = response?.path;
        const existingImages = createDestination?.banner_images || [];

        const newPaths = Array.isArray(path)
            ? path.flat()
            : [path];

        const updatedImages = [...existingImages, ...newPaths];

        if (validation?.banner_images?.status === false) {
            setValidation((prev) => ({
                ...prev,
                banner_images: { status: true, message: "" },
            }));
        }

        setCreateDestination({
            ...createDestination,
            banner_images: updatedImages,
        });

        successMsg("File uploaded successfully");


    };

    const validateDetails = (data) => {
        let validate = {};
        validate.destination_name = StringValidation(data?.destination_name);
        validate.slug = SlugValidation(data?.slug);
        validate.description = NonEmptyValidation(data?.description);
        validate.banner_images = NonEmptyArrayValidation(data?.banner_images);
        validate.trip_region = NonEmptyValidation(data?.trip_region);
        validate.about_destination = NonEmptyValidation(data?.about_destination);
        validate.faqs = NonEmptyFaqArrayValidation(data?.faqs);
        validate.destination_guidance = NonEmptyValidation(data?.destination_guidance);
        return validate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        createDestination.faqs = faqs
        const cleanedData = normalizeEmptyFields(createDestination);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await CreateDestination(cleanedData)
            if (response?.statusCode === 200) {
                navigate(-1)
                successMsg("Destination created successsfully")
                setCreateDestination({})
                setFaqs([{ faq_question: "", faq_answer: "" }])
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
                setFaqs([{ faq_question: "", faq_answer: "" }]);
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

    const handleDropdown = (selected) => {
        setSelectedOptions(selected);
        console.log("Selected options:", selected);
    };

    const getAllDestination = async () => {
        const response = await GetAllDestination()
        if (response && response?.statusCode === 200) {
            setDestinationList(response?.data)
        }
    }

    const getSpecificDestination = async (_id) => {
        const response = await GetSpecificDestination(_id)
        if (response && response?.statusCode === 200) {
            setCreateDestination(response?.data)
            setFaqs(response?.data?.faqs || [{ faq_question: "", faq_answer: "" }])
        }
    }

    useEffect(() => {
        getAllDestination()
        if (id) {
            getSpecificDestination(id)
        }
    }, [])

    console.log(createDestination, 'createDestination')

    return (
        <>

            <div className='admin-content-main'>
                <div className='d-flex justify-content-between mb-5'>
                    <h3 className='my-auto'>Create Destination</h3>
                    <button className='admin-add-button mt-0' onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left me-2"></i> Back</button>
                </div>

                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Destination Name <span className='required-icon'>*</span></label>
                            <input type="text" value={createDestination?.destination_name || ""} placeholder="Enter Destination Name"
                                onChange={(e) => handleChange("destination_name", e.target.value)}
                                onBlur={(e) => handleBlur("destination_name", e.target.value)} />
                            {validation?.destination_name?.status === false && validation?.destination_name?.message && (
                                <p className='error-para'>Destination Name {validation.destination_name.message}</p>
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
                                onChange={(e) => handleFileUpload(e, "banner_images")}
                            />

                            {validation?.banner_images?.status === false && validation?.banner_images?.message && (
                                <p className='error-para'>Banner Images {validation.banner_images.message}</p>
                            )}

                            {createDestination?.banner_images && createDestination?.banner_images?.length > 0 && (
                                <div className="d-flex flex-wrap">
                                    {createDestination?.banner_images?.map((image, index) => (
                                        <div className='upload-image-div destination-image-div'>
                                            <div>
                                                <img src={`${BACKEND_DOMAIN}${image}`} alt="Category-Preview" key={index} />
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Description <span className='required-icon'>*</span></label>
                            <textarea type="text" className="form-control" value={createDestination?.description || ""} placeholder="Enter Description"
                                onChange={(e) => handleChange("description", e.target.value)}
                                onBlur={(e) => handleBlur("description", e.target.value)}
                            />
                            {validation?.description?.status === false && validation?.description?.message && (
                                <p className='error-para'>Description {validation.description.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Parent Destination  <span className='required-icon'>*</span></label>
                            <select onChange={(e) => handleChange("parent_destination", e.target.value)}
                                onBlur={(e) => handleBlur("parent_destination", e.target.value)}
                                value={createDestination?.parent_destination}>
                                <option value="null" defaultValue={null}>None (Main Destination)</option>
                                {destinationList?.map((item, index) => (
                                    <option key={index} value={item?._id}>{item?.destination_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Domestic / International  <span className='required-icon'>*</span></label>
                            <select onChange={(e) => handleChange("trip_region", e.target.value)}
                                onBlur={(e) => handleBlur("trip_region", e.target.value)}
                                value={createDestination?.trip_region}>
                                <option value="">Select Places</option>
                                <option value="domestic">Domestic</option>
                                <option value="international">International</option>
                            </select>
                            {validation?.trip_region?.status === false && validation?.trip_region?.message && (
                                <p className='error-para'>Trip Region {validation.trip_region.message}</p>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Featured Hotels</label>
                            <Select
                                isMulti
                                placeholder="Select Trip Packages"
                                value={selectedOptions}
                                onChange={handleDropdown}
                                options={options}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='admin-input-div'>
                            <label>Select Popular Trip Packages</label>
                            <Select
                                isMulti
                                placeholder="Select Trip Packages"
                                value={selectedOptions}
                                onChange={handleDropdown}
                                options={options}
                            />
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
                                value={selectedOptions}
                                placeholder="Select Blogs"
                                onChange={handleDropdown}
                                options={options}
                            />
                        </div>
                    </div>
                </div>

                <div className='admin-input-div mt-5'>
                    <label>About Tour Packages</label>

                    <div className="mt-3">
                        <JoditEditor
                            ref={editor}
                            value={createDestination?.about_destination || ""}
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
                            onBlur={(newContent) => handleChange("about_destination", newContent)}
                        />
                        {validation?.about_destination?.status === false && validation?.about_destination?.message && (
                            <p className='error-para'>About Destination {validation.about_destination.message}</p>
                        )}

                    </div>
                </div>

                <div className='admin-input-div'>
                    <label>Frequently Asked Questions</label>
                </div>

                <div className="mt-3 destination-faq">
                    <div className="accordion" id="accordionExample">
                        {faqs.map((faq, index) => (
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
                                            FAQ {index + 1}
                                        </button>
                                        <div className="ms-3 d-flex gap-2">
                                            <button className={`destination-faq-add ${index === 0 && "me-3"}`} onClick={addFaq}>
                                                Add
                                            </button>
                                            {index !== 0 && (
                                                <button
                                                    className="destination-faq-add faq-delete me-3"
                                                    onClick={() => deleteFaq(index)}
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
                                                <label>Faq Question</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={faq?.faq_question}
                                                    onChange={(e) =>
                                                        updateFaq(index, "faq_question", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="admin-input-div admin-desti-faq">
                                                <label>Faq Answer</label>
                                                <textarea
                                                    className="form-control"
                                                    value={faq?.faq_answer}
                                                    onChange={(e) =>
                                                        updateFaq(index, "faq_answer", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {validation?.faqs?.status === false && validation?.faqs?.message && (
                                    <p className='error-para'>{validation.faqs.message}</p>
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
                            value={createDestination?.destination_guidance || ""}
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
                            onBlur={(newContent) => handleChange("destination_guidance", newContent)}
                        />
                        {validation?.destination_guidance?.status === false && validation?.destination_guidance?.message && (
                            <p className='error-para'>Destination Guidance{validation.destination_guidance.message}</p>
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
