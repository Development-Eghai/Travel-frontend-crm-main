import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import CustomModal from '../../../../component/CustomModel';
import { NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from '../../../../common/Validation';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';
import { CreateActivity, deleteActivity, GetAllActivity, GetSpecificActivity, SingleFileUpload, updateActivity } from '../../../../common/api/ApiService';



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
        { field: 'activity_name', headerName: 'Name', flex: 1 },
        { field: 'activity_slug', headerName: 'Slug', flex: 1 },
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
                            <i className="fa-solid fa-pen-to-square" onClick={() => { setOpen(true); getSpecificActivity(params?.row?._id); setIsUpdate(true) }}></i>
                            <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?._id); setOpenDeleteModal(true) }}></i>
                            <i className="fa-solid fa-eye ms-3" onClick={() => { setOpen(true); getSpecificActivity(params?.row?._id); setIsViewOnly(true) }} ></i>
                        </div>
                    </div>
                </>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const status = params.row.status === "active" ? true : false;
                return (
                    <div className="switch" onClick={() => handleStatusUpdate(params?.row?._id, status)}>
                        <input type="checkbox" checked={status} readOnly />
                        <span className="slider-table round"></span>
                    </div>
                );
            },
        }
    ];

    const numberedRows = activityList?.map((row, index) => ({
        ...row,
        sno: index + 1,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target
        setActivityData({ ...activityData, [name]: value })
        if (validation[name]) {
            setValidation({ ...validation, [name]: false })
        }
    }

    const validateDetails = (data) => {
        let validate = {};

        validate.activity_name = StringValidation(data?.activity_name);
        validate.activity_slug = SlugValidation(data?.activity_slug);
        validate.activity_description = NonEmptyValidation(data?.activity_description);
        validate.activity_image = NonEmptyValidation(data?.activity_image);

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

    const getAllActivity = async () => {
        const response = await GetAllActivity()
        if (response && response?.statusCode === 200) {
            setActivityList(response?.data),
                setIsLoading(false);
        }
    }

    const getSpecificActivity = async (_id) => {
        const response = await GetSpecificActivity(_id)
        if (response && response?.statusCode === 200) {
            setActivityData(response?.data)
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

    const handleStatusUpdate = async (_id, currentStatus) => {
        const newStatus = currentStatus ? "inactive" : "active";
        const Payload = {
            _id,
            status: newStatus,
        };

        const response = await updateActivity(Payload)
        if (response && response?.statusCode === 200) {
            successMsg("Status Updated Successsfully")
            getAllActivity()
        }

    }

    const handleDelete = async () => {
        const response = await deleteActivity(deleteId)
        if (response && response?.statusCode === 200) {
            successMsg("Activity Deleted Successsfully")
            setOpenDeleteModal(false)
            getAllActivity()
            setDeleteId('')
        }

    }


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
                    getRowId={(row) => row._id}
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
                            <input type="text" placeholder="Enter Name" name='activity_name'
                                onChange={(e) => handleChange(e)}
                                value={activityData?.activity_name || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.activity_name?.status === false && validation?.activity_name?.message && (
                                <p className='error-para'>Activity Name {validation.activity_name.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Activity Slug  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Activity Slug" name='activity_slug'
                                onChange={(e) => handleChange(e)}
                                value={activityData?.activity_slug || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.activity_slug?.status === false && validation?.activity_slug?.message && (
                                <p className='error-para'>Activity Slug {validation.activity_slug.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Activity Description  <span className='required-icon'>*</span></label>
                            <textarea type="text" placeholder='Enter Activity Description' name='activity_description'
                                onChange={(e) => handleChange(e)}
                                value={activityData?.activity_description || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.activity_description?.status === false && validation?.activity_description?.message && (
                                <p className='error-para'>Activity Description {validation.activity_description.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Activity Image  <span className='required-icon'>*</span></label>
                            {!isViewOnly && (
                                <input
                                    type="file"
                                    // multiple
                                    name='activity_image'
                                    accept='.png,.jpeg,.jpg,.pdf,.webp'
                                    className="form-control"
                                    onChange={(e) => { handleFileUpload(e, "activity_image"); handleChange(e) }}
                                // onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                                />
                            )}
                            {validation?.activity_image?.status === false && validation?.activity_image?.message && (
                                <p className='error-para'>Activity Image {validation.activity_image.message}</p>
                            )}
                            {activityData?.activity_image && (
                                <div className='upload-image-div'>
                                    <img src={`${BACKEND_DOMAIN}${activityData?.activity_image}`} alt="Category-Preview" />
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
