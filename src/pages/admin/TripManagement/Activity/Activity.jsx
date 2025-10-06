import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import CustomModal from '../../../../component/CustomModel';
import { NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from '../../../../common/Validation';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';
import { CreateActivity, deleteActivity, GetAllActivity, GetSpecificActivity, SingleFileUpload, updateActivity } from '../../../../common/api/ApiService';
import { APIBaseUrl } from '../../../../common/api/api';



const TourType = () => {

    const [open, setOpen] = useState(false)
    const [activityData, setActivityData] = useState({})
    const [activityList, setActivityList] = useState([])
    const [validation, setValidation] = useState({})
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

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
                            <i className="fa-solid fa-pen-to-square" onClick={() => { setOpen(true); getSpecificActivity(params?.row?.id); setIsUpdate(true) }}></i>
                            <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?.id); setOpenDeleteModal(true) }}></i>
                            <i className="fa-solid fa-eye ms-3" onClick={() => { setOpen(true); getSpecificActivity(params?.row?.id); setIsViewOnly(true) }} ></i>
                        </div>
                    </div>
                </>
            ),
        },
    ];

    const numberedRows = Array.isArray(activityList?.reverse())
        ? activityList.map((row, index) => ({
            ...row,
            sno: index + 1,
        }))
        : [];


    const handleChange = (e) => {
        const { name, value } = e.target
        setActivityData({ ...activityData, [name]: value })
        if (validation[name]) {
            setValidation({ ...validation, [name]: false })
        }
    }

    const validateDetails = (data) => {
        let validate = {};

        validate.name = StringValidation(data?.name);
        validate.slug = SlugValidation(data?.slug);
        validate.description = NonEmptyValidation(data?.description);
        validate.image = NonEmptyValidation(data?.image);

        return validate;
    };

    const handleBlur = (fieldName, value) => {
        const updatedData = {
            ...activityData,
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
        const cleanedData = normalizeEmptyFields(activityData);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await CreateActivity(cleanedData)
            if (response && response?.statusCode === 200) {
                successMsg("Activity created successsfully")
                setActivityData({})
                setOpen(false)
                getAllActivity()
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
        setActivityData({ ...activityData, [key]: path })
    };

    const getSpecificActivity = async (id) => {
        try {
            const res = await APIBaseUrl.get(`activities/${id}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                setActivityData(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const handleUpdate = async (e) => {
        const { __v, createdAt, updatedAt, is_deleted, ...removedObject } = activityData;
        e.preventDefault()
        const cleanedData = normalizeEmptyFields(removedObject);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await updateActivity(cleanedData)
            if (response && response?.statusCode === 200) {
                successMsg("Activity Updated Successsfully")
                setActivityData({})
                setOpen(false)
                setIsUpdate(false)
                getAllActivity()
            }
        }

    }

    const handleDelete = async () => {
        try {
            const res = await APIBaseUrl.delete(`activities/${deleteId}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                successMsg("Activity Deleted Successsfully")
                getAllActivity()
                setOpenDeleteModal(false)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const getAllActivity = async () => {
        try {
            const res = await APIBaseUrl.get("activities/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {

                setActivityList(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    };

    useEffect(() => {
        getAllActivity()
    }, [])

    console.log(activityData, 'activityData')

    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h4 className='my-auto admin-right-title'>Activity</h4>
                <button className='admin-add-button mt-0' onClick={() => { setOpen(true) }}><i class="fa-solid fa-plus me-2"></i> Add Activity</button>
            </div>

            <div className='my-5'>
                <MyDataTable
                    rows={numberedRows}
                    columns={columns}
                    // getRowId={(row) => row._id}
                // isLoading={isLoading}
                />
            </div>

            <CustomModal
                open={open}
                onClickOutside={() => {
                    setOpen(false);
                    setValidation({})
                    setActivityData({})
                    setIsViewOnly(false)
                }}
            >
                <>
                    <div className='Modal-View-Tour-Management'>

                        <h4 className='mt-2 '>{isViewOnly ? "View Activity" : isUpdate ? "Update Activity" : "Add Activity"}</h4>

                        {/* <form onSubmit={(e) => handleSubmit(e)}> */}

                        <div className='model-input-div'>
                            <label>Activity Name  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Name" name='name'
                                onChange={(e) => handleChange(e)}
                                value={activityData?.name || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.name?.status === false && validation?.name?.message && (
                                <p className='error-para'>Activity Name {validation.name.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Activity Slug  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Activity Slug" name='slug'
                                onChange={(e) => handleChange(e)}
                                value={activityData?.slug || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.slug?.status === false && validation?.slug?.message && (
                                <p className='error-para'>Activity Slug {validation.slug.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Activity Description  <span className='required-icon'>*</span></label>
                            <textarea type="text" placeholder='Enter Activity Description' name='description'
                                onChange={(e) => handleChange(e)}
                                value={activityData?.description || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.description?.status === false && validation?.description?.message && (
                                <p className='error-para'>Activity Description {validation.description.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Activity Image  <span className='required-icon'>*</span></label>
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
                                <p className='error-para'>Activity Image {validation.image.message}</p>
                            )}
                            {activityData?.image && (
                                <div className='upload-image-div'>
                                    <img src={`${BACKEND_DOMAIN}${activityData?.image}`} alt="Category-Preview" />
                                </div>
                            )}

                        </div>

                        {!isViewOnly && !isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleSubmit(e)}>Add Activity Type</button>
                        )}

                        {isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleUpdate(e)}>Update Activity Type</button>
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
