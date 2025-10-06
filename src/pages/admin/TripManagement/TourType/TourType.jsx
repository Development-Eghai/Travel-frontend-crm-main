import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import CustomModal from '../../../../component/CustomModel';
import { NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from '../../../../common/Validation';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';
import { CreateTourType, deleteTourType, GetAllTourType, GetSpecificTourType, SingleFileUpload, updateTourType } from '../../../../common/api/ApiService';
import { APIBaseUrl } from '../../../../common/api/api';



const TourType = () => {

    const [open, setOpen] = useState(false)
    const [tourTypeData, setTourTypeData] = useState({})
    const [tourTypeList, setTourTypeList] = useState([])
    const [validation, setValidation] = useState({})
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        { field: 'sno', headerName: 'SNO', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
            field: '_id',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <div>
                        <div className='admin-actions'>
                            <i className="fa-solid fa-pen-to-square" onClick={() => { setOpen(true); getSpecificTourType(params?.row?.id); setIsUpdate(true) }}></i>
                            <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?.id); setOpenDeleteModal(true) }}></i>
                            <i className="fa-solid fa-eye ms-3" onClick={() => { setOpen(true); getSpecificTourType(params?.row?.id); setIsViewOnly(true) }} ></i>
                        </div>
                    </div>
                </>
            ),
        },
    ];

    const numberedRows = Array.isArray(tourTypeList?.reverse())
        ? tourTypeList.map((row, index) => ({
            ...row,
            sno: index + 1,
        }))
        : [];

    const handleChange = (e) => {
        const { name, value } = e.target
        setTourTypeData({ ...tourTypeData, [name]: value })
        if (validation[name]) {
            setValidation({ ...validation, [name]: false })
        }
    }

    const validateDetails = (data) => {
        let validate = {};

        validate.tour_name = StringValidation(data?.tour_name);
        validate.tour_slug = SlugValidation(data?.tour_slug);
        validate.tour_description = NonEmptyValidation(data?.tour_description);
        validate.tour_image = NonEmptyValidation(data?.tour_image);

        return validate;
    };

    const handleBlur = (fieldName, value) => {
        const updatedData = {
            ...tourTypeData,
            [fieldName]: value,
        };

        const cleanedData = normalizeEmptyFields(updatedData);
        const fieldValidation = validateDetails(cleanedData);

        setValidation((prev) => ({
            ...prev,
            [fieldName]: fieldValidation[fieldName],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const cleanedData = normalizeEmptyFields(tourTypeData);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await CreateTourType(cleanedData)
            if (response && response?.statusCode === 200) {
                successMsg("Trip Type created successsfully")
                setTourTypeData({})
                setOpen(false)
                getAllTourTypes()
            }
        }

    }

    const handleFileUpload = async (e, key) => {
        const file = e.target.files[0];

        if (!file) return;
        let image_name = e?.target?.files[0]?.name;
        let image_type = image_name?.split(".");
        let type = image_type?.pop();
        if (type !== "jpeg" && type !== "png" && type !== "jpg" && type !== "pdf" && type !== "webp") {
            errorMsg("Unsupported file type")
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("storage", "local");
        const response = await SingleFileUpload(formData);

        if (response?.statusCode !== 200) {
            errorMsg("Failed to upload file")
            return;
        }

        const path = response?.path;
        successMsg("File upload successfully")
        if (validation[key]) {
            setValidation({ ...validation, [key]: false })
        }
        setTourTypeData({ ...tourTypeData, [key]: path })
    };

    const getAllTourTypes = async () => {
        try {
            const res = await APIBaseUrl.get("trip-types/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {

                setTourTypeList(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const getSpecificTourType = async (id) => {
        try {
            const res = await APIBaseUrl.get(`trip-types/${id}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                setTourTypeData(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const handleUpdate = async (e) => {
        const { __v, createdAt, updatedAt, is_deleted,...removedObject } = tourTypeData;
        e.preventDefault()
        const cleanedData = normalizeEmptyFields(removedObject);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await updateTourType(cleanedData)
            if (response && response?.statusCode === 200) {
                successMsg("Trip Type Updated Successsfully")
                setTourTypeData({})
                setOpen(false)
                setIsUpdate(false)
                getAllTourTypes()
            }
        }

    }

    const handleDelete = async () => {
        try {
            const res = await APIBaseUrl.delete(`trip-types/${deleteId}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                successMsg("Activity Deleted Successsfully")
                getAllTourTypes()
                setOpenDeleteModal(false)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }

    }


    useEffect(() => {
        getAllTourTypes()
    }, [])

    console.log(tourTypeList,"tourTypeList")

    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h4 className='my-auto admin-right-title'>Trip Type</h4>
                <button className='admin-add-button mt-0' onClick={() => { setOpen(true) }}><i class="fa-solid fa-plus me-2"></i> Add Trip Type</button>
            </div>

            <div className='my-5'>
                <MyDataTable
                    rows={numberedRows}
                    columns={columns}
                // isLoading={isLoading}
                />
            </div>

            <CustomModal
                open={open}
                onClickOutside={() => {
                    setOpen(false);
                    setValidation({})
                    setTourTypeData({})
                    setIsViewOnly(false)
                }}
            >
                <>
                    <div className='Modal-View-Tour-Management'>

                        <h4 className='mt-2 '>{isViewOnly ? "View Tour Type" : isUpdate ? "Update Tour Type" : "Add Tour Type"}</h4>

                        {/* <form onSubmit={(e) => handleSubmit(e)}> */}

                        <div className='model-input-div'>
                            <label>Tour Name  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Name" name='name'
                                onChange={(e) => handleChange(e)}
                                value={tourTypeData?.name || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.name?.status === false && validation?.name?.message && (
                                <p className='error-para'>Tour Name {validation.name.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Tour Slug  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Tour Slug" name='slug'
                                onChange={(e) => handleChange(e)}
                                value={tourTypeData?.slug || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.slug?.status === false && validation?.slug?.message && (
                                <p className='error-para'>Tour Slug {validation.slug.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Tour Description  <span className='required-icon'>*</span></label>
                            <textarea type="text" placeholder='Enter Tour Description' name='description'
                                onChange={(e) => handleChange(e)}
                                value={tourTypeData?.description || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.description?.status === false && validation?.description?.message && (
                                <p className='error-para'>Tour Description {validation.description.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Tour Image  <span className='required-icon'>*</span></label>
                            {!isViewOnly && (
                                <input
                                    type="file"
                                    // multiple
                                    name='image'
                                    accept='.png,.jpeg,.jpg,.pdf,.webp'
                                    className="form-control"
                                    onChange={(e) => { handleFileUpload(e, "image"); handleChange(e) }}
                                    // onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                                />
                            )}
                            {validation?.image?.status === false && validation?.image?.message && (
                                <p className='error-para'>Tour Image {validation.image.message}</p>
                            )}
                            {tourTypeData?.image && (
                                <div className='upload-image-div'>
                                    <img src={`${BACKEND_DOMAIN}${tourTypeData?.image}`} alt="Category-Preview" />
                                </div>
                            )}

                        </div>

                        {!isViewOnly && !isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleSubmit(e)}>Add Tour Type</button>
                        )}

                        {isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleUpdate(e)}>Update Tour Type</button>
                        )}

                        {/* </form> */}
                    </div>
                </>

            </CustomModal>

            <CustomModal
                open={openDeleteModal}
                onClickOutside={() => {
                    setOpenDeleteModal(false);
                }}
            >
                <>
                    <div className='delete-model-view-main'>
                        <p className="text-center">
                            Are you sure do you want to delete?
                        </p>
                        <div className="row">
                            <div className="col-6">
                                <button className="delete-btn yes" onClick={handleDelete}>Yes</button>
                            </div>
                            <div className="col-6">
                                <button className="delete-btn no" onClick={() => setOpenDeleteModal(false)}>No</button>
                            </div>
                        </div>
                    </div>
                </>

            </CustomModal>

        </div>
    )
}

export default TourType
