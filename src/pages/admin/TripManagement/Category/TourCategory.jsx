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
    // ... (Existing state definitions)
    const [open, setOpen] = useState(false)
    const [categoryData, setcategoryData] = useState({})
    const [categoryList, setcategoryList] = useState([])
    const [validation, setValidation] = useState({})
    const [isViewOnly, setIsViewOnly] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    
    // ⭐ NEW: State for selected rows (for bulk actions)
    const [selectionModel, setSelectionModel] = useState([]);
    const [duplicateId, setDuplicateId] = useState("");
    const [openDuplicateModal, setOpenDuplicateModal] = useState(false);
    const [isDuplicating, setIsDuplicating] = useState(false);
    

    const handlePreview = (slug, id) => {
        const url = `/category-preview/${slug}/${id}`;
        window.open(url, '_blank');
    };
    
    // ⭐ NEW: Helper for generating unique slug
    const generateUniqueSlug = (originalSlug) => {
        const timestamp = Date.now();
        return `${originalSlug.toLowerCase().replace(/[^a-z0-9]/g, '-')}-copy-${timestamp}`;
    };

    // --- API FUNCTIONS (Updated) ---
    // ... (getAllTourCategory, getSpecificTourCategory, handleUpdate, handleFileUpload, etc.)

    const handleSingleDelete = async () => {
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
                setDeleteId("")
            }
        } catch (error) {
            console.error("Error deleting category:", error?.response?.data || error.message);
            errorMsg("Failed to delete category.");
        }
    }

    // ⭐ NEW: Function to handle bulk delete for categories
    const handleBulkDelete = async () => {
        if (selectionModel.length === 0) return;

        try {
            const deletePromises = selectionModel.map(id => 
                APIBaseUrl.delete(`categories/${id}`, {
                    headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
                })
            );

            await Promise.allSettled(deletePromises);

            successMsg(`${selectionModel.length} categories deleted successfully.`);
            setOpenDeleteModal(false);
            setSelectionModel([]); // Clear selection
            getAllTourCategory(); // Refresh the list
        } catch (error) {
            console.error("Error performing bulk delete:", error);
            errorMsg("An error occurred during bulk deletion.");
            setOpenDeleteModal(false);
        }
    }

    // ⭐ NEW: Function to handle duplicate category
    const handleDuplicateCategory = async () => {
        if (!duplicateId) return;
        
        setIsDuplicating(true);
        try {
            const getRes = await APIBaseUrl.get(`categories/${duplicateId}`, {
                headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
            });

            if (getRes?.data?.success === true) {
                const originalCategory = getRes?.data?.data;
                const { _id, createdAt, updatedAt, __v, id, ...restOfCategoryData } = originalCategory;

                const duplicatePayload = {
                    ...restOfCategoryData,
                    name: `${originalCategory.name} (Copy)`,
                    slug: generateUniqueSlug(originalCategory.slug),
                    tenant_id: 1,
                };

                const createRes = await APIBaseUrl.post("categories/", duplicatePayload, {
                    headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
                });

                if (createRes?.data?.success === true) {
                    successMsg("Category duplicated successfully!");
                    setOpenDuplicateModal(false);
                    setDuplicateId("");
                    await getAllTourCategory(); 
                } else {
                    errorMsg(createRes?.data?.message || "Failed to duplicate category.");
                }
            } else {
                errorMsg("Failed to fetch original category data.");
            }
        } catch (error) {
            console.error("Error duplicating category:", error);
            errorMsg(error?.response?.data?.message || "An error occurred while duplicating the category.");
        } finally {
            setIsDuplicating(false);
        }
    };


    const columns = [
        { field: 'sno', headerName: 'SNO', width: 80 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'slug', headerName: 'Slug', width: 300 },
        {
            field: 'id',
            headerName: 'Actions',
            minWidth: 150,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const slug = params.row?.slug;
                const id = params.row?.id;
                return (
                    <div className='admin-actions d-flex'>
                        <i className="fa-solid fa-pen-to-square mx-1" onClick={() => { setOpen(true); getSpecificTourCategory(params?.row?.id); setIsUpdate(true) }}></i>
                        
                        {/* ⭐ NEW: Duplicate Icon */}
                        <i 
                            className="fa-regular fa-copy mx-1" 
                            style={{ cursor: "pointer", color: "#17a2b8" }}
                            onClick={() => { 
                                setDuplicateId(id); 
                                setOpenDuplicateModal(true) 
                            }}
                            title="Duplicate"
                        ></i>

                        <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?.id); setOpenDeleteModal(true) }}></i>
                        <i
                            className="fa-solid fa-eye ms-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePreview(slug, id)}
                        ></i>
                    </div>
                )
            },
        },
    ];

    // ... (rest of unchanged functions like numberedRows, handleChange, validateDetails, etc.)
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

    // --- FUNCTION: REMOVE IMAGE ---
    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = categoryData.image.filter(
            (_, index) => index !== indexToRemove
        );

        // Clear validation error if images still exist
        if (updatedImages.length > 0 && validation?.image?.status === false) {
            setValidation((prev) => ({
                ...prev,
                image: { status: true, message: "" },
            }));
        }

        setcategoryData({
            ...categoryData,
            image: updatedImages,
        });
    };
    // ----------------------------------

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
                const existingImages = categoryData?.image || [];

                const newPaths = Array.isArray(path)
                    ? path.flat()
                    : [path];

                const updatedImages = [...existingImages, ...newPaths];
                if (validation?.image?.status === false) {
                    setValidation((prev) => ({
                        ...prev,
                        image: { status: true, message: "" },
                    }));
                }

                setcategoryData({
                    ...categoryData,
                    image: updatedImages,
                });
            }
        } catch (error) {
            console.error("Upload error:", error);
            errorMsg("File upload failed");
        }

    };

    const getAllTourCategory = async () => {
        try {
            setIsLoading(true);
            let allCategories = [];
            let skip = 0;
            const limit = 100;
            let hasMore = true;

            // Fetch all categories with pagination
            while (hasMore) {
                const res = await APIBaseUrl.get("categories/", {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                    params: { skip, limit }
                });

                if (res?.data?.success === true) {
                    const categories = res?.data?.data || [];
                    allCategories = [...allCategories, ...categories];
                    
                    // If we got less than the limit, we've reached the end
                    hasMore = categories.length === limit;
                    skip += limit;
                } else {
                    hasMore = false;
                }
            }

            setcategoryList(allCategories);
            setIsLoading(false);

        } catch (error) {
            setcategoryList([]);
            setIsLoading(false);
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
            throw error;
        }

    }

    // ⭐ Changed handleDelete to handle single delete
    const handleDelete = handleSingleDelete;


    useEffect(() => {
        getAllTourCategory()
    }, [])
    

    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className='my-auto admin-right-title'>Trip Category</h4>
                <div className='d-flex align-items-center'>
                     {/* ⭐ NEW: Bulk Delete Button */}
                    {selectionModel.length > 0 && (
                        <button 
                            className='admin-add-button mt-0 me-3' 
                            style={{ backgroundColor: '#dc3545', border: '1px solid #dc3545' }}
                            onClick={() => { 
                                setDeleteId(null); // Indicates bulk delete
                                setOpenDeleteModal(true);
                            }}
                        >
                            <i className="fa-solid fa-trash me-2"></i> 
                            Delete ({selectionModel.length}) Selected
                        </button>
                    )}
                    <button className='admin-add-button mt-0' onClick={() => { setOpen(true) }}><i className="fa-solid fa-plus me-2"></i> Add Category</button>
                </div>
            </div>

            <div className='my-5'>
                <MyDataTable
                    rows={numberedRows}
                    columns={columns}
                    getRowId={(row) => row.id || row._id}
                    isLoading={isLoading}
                    // ⭐ CRITICAL FIX: Enable checkbox selection
                    checkboxSelection 
                    // ⭐ NEW: Handle row selection changes
                    onRowSelectionModelChange={(newSelectionModel) => { 
                        setSelectionModel(newSelectionModel); 
                    }}
                    selectionModel={selectionModel}
                />
            </div>

            {/* Modal remains the same */}
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
                        {/* ... (Modal content for add/update/view) ... */}
                        <h4 className='mt-2 '>{isViewOnly ? "View Category" : isUpdate ? "Update Category" : "Add Category"}</h4>

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
                                    name='image'
                                    accept='.png,.jpeg,.jpg,.pdf,.webp'
                                    className="form-control"
                                    onChange={(e) => { handleFileUpload(e, "image"); handleChange(e) }}
                                />
                            )}
                            {validation?.image?.status === false && validation?.image?.message && (
                                <p className='error-para'>Image {validation.image.message}</p>
                            )}
                            {Array.isArray(categoryData?.image) && categoryData.image.length > 0 && (
                                <div className="d-flex flex-wrap">
                                    {categoryData.image.map((image, index) => (
                                        <div className="upload-image-div destination-image-div" key={index} style={{position: 'relative'}}>
                                            <div>
                                                <img src={encodeURI(image)} alt={`Category-Preview-${index}`} />
                                            </div>
                                            {/* DELETE BUTTON - Only show if not in view-only mode */}
                                            {!isViewOnly && (
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
                                            )}
                                            {/* END DELETE BUTTON */}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        {!isViewOnly && !isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleSubmit(e)}>Add Category</button>
                        )}

                        {isUpdate && (
                            <button className='model-submit-button' onClick={(e) => handleUpdate(e)}>Update Category</button>
                        )}

                    </div>
                </>

            </CustomModal>

            {/* Single/Bulk Delete Modal (Updated handler) */}
            <CustomModal
                open={openDeleteModal}
                onClickOutside={() => {
                    setOpenDeleteModal(false);
                }}
            >
                <>
                    <div className='delete-model-view-main'>
                        <p className="text-center">
                            {selectionModel.length > 0 && deleteId === null
                                ? `Are you sure you want to delete the ${selectionModel.length} selected categories?`
                                : "Are you sure do you want to delete?"}
                        </p>
                        <div className="row">
                            <div className="col-6">
                                <button 
                                    className="delete-btn yes" 
                                    onClick={deleteId !== null ? handleDelete : handleBulkDelete}
                                >
                                    Yes
                                </button>
                            </div>
                            <div className="col-6">
                                <button className="delete-btn no" onClick={() => setOpenDeleteModal(false)}>No</button>
                            </div>
                        </div>
                    </div>
                </>

            </CustomModal>
            
            {/* ⭐ NEW: Duplicate Modal */}
            <CustomModal
                open={openDuplicateModal}
                onClickOutside={() => {
                    if (!isDuplicating) {
                        setOpenDuplicateModal(false);
                    }
                }}
            >
                <div className='delete-model-view-main'>
                    <p className="text-center">
                        Are you sure you want to duplicate this category?
                    </p>
                    <p className="text-center text-muted" style={{ fontSize: '14px' }}>
                        A new draft will be created with "(Copy)" appended to the name.
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <button 
                                className="delete-btn yes" 
                                onClick={handleDuplicateCategory}
                                disabled={isDuplicating}
                            >
                                {isDuplicating ? 'Duplicating...' : 'Yes, Duplicate'}
                            </button>
                        </div>
                        <div className="col-6">
                            <button 
                                className="delete-btn no" 
                                onClick={() => setOpenDuplicateModal(false)}
                                disabled={isDuplicating}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </CustomModal>

        </div>
    )
}

export default TourCategory