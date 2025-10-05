import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import CustomModal from '../../../../component/CustomModel';
import { NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from '../../../../common/Validation';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import { CreateTourCategory, deleteTourCategory, GetAllTourCategory, GetSpecificTourCategory, SingleFileUpload, updateTourCategory } from '../../../../common/api/ApiService';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';



const TourCategory = () => {

    const [open, setOpen] = useState(false)
    const [categoryData, setcategoryData] = useState({})
    const [categoryList, setcategoryList] = useState([])
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
                            <i className="fa-solid fa-pen-to-square" onClick={() => { setOpen(true); getSpecificTourCategory(params?.row?._id); setIsUpdate(true) }}></i>
                            <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?._id); setOpenDeleteModal(true) }}></i>
                            <i className="fa-solid fa-eye ms-3" onClick={() => { setOpen(true); getSpecificTourCategory(params?.row?._id); setIsViewOnly(true) }} ></i>
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

    const numberedRows = categoryList?.map((row, index) => ({
        ...row,
        sno: index + 1,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target
        setcategoryData({ ...categoryData, [name]: value })
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
            ...categoryData,
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
        const cleanedData = normalizeEmptyFields(categoryData);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await CreateTourCategory(cleanedData)
            if (response && response?.statusCode === 200) {
                successMsg("Trip category created successsfully")
                setcategoryData({})
                setOpen(false)
                getAllTourCategory()
            }
        }

    }

    const handleFileUpload = async (e, key) => {
        const file = e.target.files[0];

        if (!file) return;
        let image_name = e?.target?.files[0]?.name;
        let image_type = image_name?.split(".");
        let type = image_type?.pop();
        if (type !== "jpeg" && type !== "png" && type !== "jpg" && type !== "pdf") {
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
        setcategoryData({ ...categoryData, [key]: path })
    };

    const getAllTourCategory = async () => {
        const response = await GetAllTourCategory()
        if (response && response?.statusCode === 200) {
            setcategoryList(response?.data),
                setIsLoading(false);
        }
    }

    const getSpecificTourCategory = async (_id) => {
        const response = await GetSpecificTourCategory(_id)
        if (response && response?.statusCode === 200) {
            setcategoryData(response?.data)
        }
    }

    const handleUpdate = async (e) => {
        const { __v, createdAt, updatedAt, is_deleted, ...removedObject } = categoryData;
        e.preventDefault()
        const cleanedData = normalizeEmptyFields(removedObject);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await updateTourCategory(cleanedData)
            if (response && response?.statusCode === 200) {
                successMsg("Trip Category Updated Successsfully")
                setcategoryData({})
                setOpen(false)
                setIsUpdate(false)
                getAllTourCategory()
            }
        }

    }

    const handleStatusUpdate = async (_id, currentStatus) => {
        const newStatus = currentStatus ? "inactive" : "active";
        const Payload = {
            _id,
            status: newStatus,
        };

        const response = await updateTourCategory(Payload)
        if (response && response?.statusCode === 200) {
            successMsg("Status Updated Successsfully")
            getAllTourCategory()
        }

    }

    const handleDelete = async () => {
        const response = await deleteTourCategory(deleteId)
        console.log(response, "handleDelete")
        if (response && response?.statusCode === 200) {
            successMsg("Trip Category Deleted Successsfully")
            setOpenDeleteModal(false)
            getAllTourCategory()
            setDeleteId('')
        }

    }


    useEffect(() => {
        getAllTourCategory()
    }, [])


    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h4 className='my-auto admin-right-title'>Trip Category</h4>
                <button className='admin-add-button mt-0' onClick={() => { setOpen(true) }}><i class="fa-solid fa-plus me-2"></i> Add Category</button>
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
                    setcategoryData({})
                    setIsViewOnly(false)
                }}
            >
                <>
                    <div className='Modal-View-Tour-Management'>

                        <h4 className='mt-2 '>{isViewOnly ? "View Category" : isUpdate ? "Update Category" : "Add Category"}</h4>

                        {/* <form onSubmit={(e) => handleSubmit(e)}> */}

                        <div className='model-input-div'>
                            <label>Name  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Name" name='name'
                                onChange={(e) => handleChange(e)}
                                value={categoryData?.name || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.name?.status === false && validation?.name?.message && (
                                <p className='error-para'>Name {validation.name.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Slug  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Slug" name='slug'
                                onChange={(e) => handleChange(e)}
                                value={categoryData?.slug || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.slug?.status === false && validation?.slug?.message && (
                                <p className='error-para'>Slug {validation.slug.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Description  <span className='required-icon'>*</span></label>
                            <textarea type="text" placeholder='Enter Description' name='description'
                                onChange={(e) => handleChange(e)}
                                value={categoryData?.description || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.description?.status === false && validation?.description?.message && (
                                <p className='error-para'>Description {validation.description.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Image  <span className='required-icon'>*</span></label>
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
                                <p className='error-para'>Image {validation.image.message}</p>
                            )}
                            {categoryData?.image && (
                                <div className='upload-image-div'>
                                    <img src={`${BACKEND_DOMAIN}${categoryData?.image}`} alt="Category-Preview" />
                                </div>
                            )}

                        </div>

                        {!isViewOnly && !isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleSubmit(e)}>Add Category</button>
                        )}

                        {isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleUpdate(e)}>Update Category</button>
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

export default TourCategory
