import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import CustomModal from '../../../../component/CustomModel';
import { NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from '../../../../common/Validation';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import { CreateBlogTag, CreateTourCategory, DeleteBlogTag, deleteTourCategory, GetAllBlogTag, GetAllTourCategory, GetSpecificBlogTag, GetSpecificTourCategory, UpdateBlogTag, updateTourCategory } from '../../../../common/api/ApiService';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';



const TourCategory = () => {

    const [open, setOpen] = useState(false)
    const [blogTagData, setBlogTagData] = useState({})
    const [categoryList, setcategoryList] = useState([])
    const [validation, setValidation] = useState({})
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true);


    const columns = [
        { field: 'sno', headerName: 'SNO', flex: 1 },
        { field: 'tag_name', headerName: 'Name', flex: 1 },
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
                            <i className="fa-solid fa-pen-to-square" onClick={() => { setOpen(true); getSpecificBlogTag(params?.row?._id); setIsUpdate(true) }}></i>
                            <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?._id); setOpenDeleteModal(true) }}></i>
                            <i className="fa-solid fa-eye ms-3" onClick={() => { setOpen(true); getSpecificBlogTag(params?.row?._id); setIsViewOnly(true) }} ></i>
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
        setBlogTagData({ ...blogTagData, [name]: value })
        if (validation[name]) {
            setValidation({ ...validation, [name]: false })
        }
    }

    const validateDetails = (data) => {
        let validate = {};

        validate.tag_name = StringValidation(data?.tag_name);
        validate.slug = SlugValidation(data?.slug);
        validate.description = NonEmptyValidation(data?.description);

        return validate;
    };

    const handleBlur = (fieldName, value) => {
        const updatedData = {
            ...blogTagData,
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
        const cleanedData = normalizeEmptyFields(blogTagData);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await CreateBlogTag(cleanedData)
            if (response && response?.statusCode === 200) {
                successMsg("Trip category created successsfully")
                setBlogTagData({})
                setOpen(false)
                getAllBlogTag()
            }
        }
    }


    const getAllBlogTag = async () => {
        const response = await GetAllBlogTag()
        if (response && response?.statusCode === 200) {
            setcategoryList(response?.data),
                setIsLoading(false);
        }
    }

    const getSpecificBlogTag = async (_id) => {
        const response = await GetSpecificBlogTag(_id)
        if (response && response?.statusCode === 200) {
            setBlogTagData(response?.data)
        }
    }

    const handleUpdate = async (e) => {
        const { __v, createdAt, updatedAt, is_deleted, ...removedObject } = blogTagData;
        e.preventDefault()
        const cleanedData = normalizeEmptyFields(removedObject);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {
            const response = await UpdateBlogTag(cleanedData)
            if (response && response?.statusCode === 200) {
                successMsg("Trip Category Updated Successsfully")
                setBlogTagData({})
                setOpen(false)
                setIsUpdate(false)
                getAllBlogTag()
            }
        }

    }

    const handleStatusUpdate = async (_id, currentStatus) => {
        const newStatus = currentStatus ? "inactive" : "active";
        const Payload = {
            _id,
            status: newStatus,
        };

        const response = await UpdateBlogTag(Payload)
        if (response && response?.statusCode === 200) {
            successMsg("Status Updated Successsfully")
            getAllBlogTag()
        }

    }

    const handleDelete = async () => {
        const response = await DeleteBlogTag(deleteId)
        console.log(response, "handleDelete")
        if (response && response?.statusCode === 200) {
            successMsg("Trip Category Deleted Successsfully")
            setOpenDeleteModal(false)
            getAllBlogTag()
            setDeleteId('')
        }

    }


    useEffect(() => {
        getAllBlogTag()
    }, [])


    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h4 className='my-auto admin-right-title'>Blog Tags</h4>
                <button className='admin-add-button mt-0' onClick={() => { setOpen(true) }}><i class="fa-solid fa-plus me-2"></i> Add Blog Tag</button>
            </div>

            <div className='my-5'>
                <MyDataTable
                    rows={numberedRows}
                    columns={columns}
                    getRowId={(row) => row._id}
                    isLoading={isLoading}
                />
            </div>

            <CustomModal
                open={open}
                onClickOutside={() => {
                    setOpen(false);
                    setValidation({})
                    setBlogTagData({})
                    setIsViewOnly(false)
                }}
            >
                <>
                    <div className='Modal-View-Tour-Management'>

                        <h4 className='mt-2 '>{isViewOnly ? "View Tag" : isUpdate ? "Update Tag" : "Add Tag"}</h4>

                        {/* <form onSubmit={(e) => handleSubmit(e)}> */}

                        <div className='model-input-div'>
                            <label>Tag Name  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Tag Name" name='tag_name'
                                onChange={(e) => handleChange(e)}
                                value={blogTagData?.tag_name || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.tag_name?.status === false && validation?.tag_name?.message && (
                                <p className='error-para'>Tag Name {validation.tag_name.message}</p>
                            )}
                        </div>

                        <div className='model-input-div'>
                            <label>Slug  <span className='required-icon'>*</span></label>
                            <input type="text" placeholder="Enter Slug" name='slug'
                                onChange={(e) => handleChange(e)}
                                value={blogTagData?.slug || ""}
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
                                value={blogTagData?.description || ""}
                                readOnly={isViewOnly}
                                onBlur={(e) => handleBlur(e.target.name, e.target.value)}
                            />
                            {validation?.description?.status === false && validation?.description?.message && (
                                <p className='error-para'>Description {validation.description.message}</p>
                            )}
                        </div>

                        {!isViewOnly && !isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleSubmit(e)}>Add Tag</button>
                        )}

                        {isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleUpdate(e)}>Update Tag</button>
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
