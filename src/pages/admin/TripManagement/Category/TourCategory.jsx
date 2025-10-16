import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import CustomModal from '../../../../component/CustomModel';
import { NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from '../../../../common/Validation';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import { CreateTourCategory, deleteTourCategory, GetAllTourCategory, GetSpecificTourCategory, SingleFileUpload, updateTourCategory } from '../../../../common/api/ApiService';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';
import { APIBaseUrl } from '../../../../common/api/api';



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

    const handlePreview = (slug, id) => {
        const url = `/category-preview/${slug}/${id}`;
        window.open(url, '_blank');
    };

    const columns = [
        { field: 'sno', headerName: 'SNO', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
            field: 'id',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const slug = params.row?.slug;
                const id = params.row?.id;
                return (
                    <>
                        <div>
                            <div className='admin-actions'>
                                <i className="fa-solid fa-pen-to-square" onClick={() => { setOpen(true); getSpecificTourCategory(params?.row?.id); setIsUpdate(true) }}></i>
                                <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?.id); setOpenDeleteModal(true) }}></i>
                                {/* <i className="fa-solid fa-eye ms-3" onClick={() => { setOpen(true); getSpecificTourCategory(params?.row?.id); setIsViewOnly(true) }} ></i> */}
                                <i
                                    className="fa-solid fa-eye ms-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handlePreview(slug, id)}
                                ></i>
                            </div>
                        </div>

                    </>
                )
            },
        },
    ];

    const numberedRows = Array.isArray(categoryList?.reverse())
        ? categoryList.map((row, index) => ({
            ...row,
            sno: index + 1,
        }))
        : [];

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
        cleanedData.tenant_id = 1;
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {

            try {
                const res = await APIBaseUrl.post("categories/", cleanedData, {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                });
                if (res?.data?.success === true) {
                    successMsg("Trip category created successsfully")
                    setcategoryData({})
                    setOpen(false)
                    getAllTourCategory()
                }

            } catch (error) {
                console.error("Error fetching trips:", error?.response?.data || error.message);
                throw error;
            }

        }

    }

    const handleFileUpload = async (e, key) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageName = file.name;
        const type = imageName.split(".").pop().toLowerCase();

        if (!["jpeg", "png", "jpg", "pdf", "webp"].includes(type)) {
            errorMsg("Unsupported file type");
            return;
        }

        const maxSize = 5 * 1024 * 1024; 
        if (file.size > maxSize) {
          errorMsg("File size should not exceed 5MB.");
          return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("storage", "local");

        try {
            const res = await APIBaseUrl.post("https://api.yaadigo.com/upload", formData);
            console.log(res.data, "res?.data");

            if (res?.data?.message === "Upload successful") {
                successMsg("Image uploaded successfully");
                setcategoryData({ ...categoryData, [key]: res.data.url });
            }
        } catch (error) {
            console.error("Upload error:", error);
            errorMsg("File upload failed");
        }
    };

    const getAllTourCategory = async () => {
        try {
            setIsLoading(true);
            const res = await APIBaseUrl.get("categories/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {

                setcategoryList(res?.data?.data)
                setIsLoading(false);
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const getSpecificTourCategory = async (id) => {
        try {
            const res = await APIBaseUrl.get(`categories/${id}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                setcategoryData(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const cleanedData = normalizeEmptyFields(categoryData);
        cleanedData.tenant_id = 1;
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        try {
            const res = await APIBaseUrl.put(`categories/${categoryData?.id}`, cleanedData, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                successMsg("Trip Category Updated Successsfully")
                setcategoryData({})
                setOpen(false)
                setIsUpdate(false)
                getAllTourCategory()
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }

    }

    const handleDelete = async () => {
        try {
            const res = await APIBaseUrl.delete(`categories/${deleteId}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                successMsg("Category Deleted Successsfully")
                getAllTourCategory()
                setOpenDeleteModal(false)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }

    }


    useEffect(() => {
        getAllTourCategory()
    }, [])

    console.log(categoryList,"categoryList")


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
                // getRowId={(row) => row._id}
                isLoading={isLoading}
                />
            </div>

            <CustomModal
                open={open}
                onClickOutside={() => {
                    setOpen(false);
                    setValidation({})
                    setcategoryData({})
                    setIsViewOnly(false)
                    setIsUpdate(false)
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
                                    <img src={`${categoryData?.image}`} alt="Category-Preview" />
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
