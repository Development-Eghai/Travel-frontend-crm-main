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
    // ... (Existing state definitions)
    const [open, setOpen] = useState(false)
    const [activityData, setActivityData] = useState({})
    const [activityList, setActivityList] = useState([])
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


    // --- API FUNCTIONS (Updated) ---

    // ⭐ NEW: Helper for generating unique slug
    const generateUniqueSlug = (originalSlug) => {
        const timestamp = Date.now();
        return `${originalSlug.toLowerCase().replace(/[^a-z0-9]/g, '-')}-copy-${timestamp}`;
    };
    
    // ⭐ NEW: Function to handle bulk delete for activities
    const handleBulkDelete = async () => {
        if (selectionModel.length === 0) return;

        try {
            const deletePromises = selectionModel.map(id => 
                APIBaseUrl.delete(`activities/${id}`, {
                    headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
                })
            );

            await Promise.allSettled(deletePromises);

            successMsg(`${selectionModel.length} activities deleted successfully.`);
            setOpenDeleteModal(false);
            setSelectionModel([]); // Clear selection
            getAllActivity(); // Refresh the list
        } catch (error) {
            console.error("Error performing bulk delete:", error);
            errorMsg("An error occurred during bulk deletion.");
            setOpenDeleteModal(false);
        }
    }

    // ⭐ NEW: Function to handle duplicate activity
    const handleDuplicateActivity = async () => {
        if (!duplicateId) return;
        
        setIsDuplicating(true);
        try {
            const getRes = await APIBaseUrl.get(`activities/${duplicateId}`, {
                headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
            });

            if (getRes?.data?.success === true) {
                const originalActivity = getRes?.data?.data;
                const { _id, createdAt, updatedAt, __v, id, ...restOfActivityData } = originalActivity;

                const duplicatePayload = {
                    ...restOfActivityData,
                    name: `${originalActivity.name} (Copy)`,
                    slug: generateUniqueSlug(originalActivity.slug),
                    tenant_id: 1,
                };

                const createRes = await APIBaseUrl.post("activities/", duplicatePayload, {
                    headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
                });

                if (createRes?.data?.success === true) {
                    successMsg("Activity duplicated successfully!");
                    setOpenDuplicateModal(false);
                    setDuplicateId("");
                    await getAllActivity(); 
                } else {
                    errorMsg(createRes?.data?.message || "Failed to duplicate activity.");
                }
            } else {
                errorMsg("Failed to fetch original activity data.");
            }
        } catch (error) {
            console.error("Error duplicating activity:", error);
            errorMsg(error?.response?.data?.message || "An error occurred while duplicating the activity.");
        } finally {
            setIsDuplicating(false);
        }
    };


    const columns = [
        { field: 'sno', headerName: 'SNO', width: 80 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'slug', headerName: 'Slug', width: 300 },
        {
            field: '_id',
            headerName: 'Actions',
            minWidth: 150,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const id = params?.row?.id;
                return (
                    <div className='admin-actions d-flex'>
                        <i className="fa-solid fa-pen-to-square" onClick={() => { setOpen(true); getSpecificActivity(id); setIsUpdate(true) }}></i>
                        
                        {/* ⭐ NEW: Duplicate Icon */}
                        <i 
                            className="fa-regular fa-copy mx-1 ms-3" 
                            style={{ cursor: "pointer", color: "#17a2b8" }}
                            onClick={() => { 
                                setDuplicateId(id); 
                                setOpenDuplicateModal(true) 
                            }}
                            title="Duplicate"
                        ></i>

                        <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(id); setOpenDeleteModal(true) }}></i>
                        <i className="fa-solid fa-eye ms-3" onClick={() => { setOpen(true); getSpecificActivity(id); setIsViewOnly(true) }} ></i>
                    </div>
                );
            },
        },
    ];

    // ... (All other functions (numberedRows, handleChange, validateDetails, handleSubmit, handleUpdate, handleDelete, etc.) are included here and updated where necessary)
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
        cleanedData.tenant_id = 1;
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        if (Object.values(isValide).every((data) => data?.status === true)) {

            try {
                const res = await APIBaseUrl.post("activities/", cleanedData, {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                });
                if (res?.data?.success === true) {
                    successMsg("Activity created successsfully")
                    setActivityData({})
                    setOpen(false)
                    getAllActivity()
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

            if (res?.data?.message === "Upload successful") {
                successMsg("Image uploaded successfully");
                setActivityData({ ...activityData, [key]: res.data.url });
            }
        } catch (error) {
            console.error("Upload error:", error);
            errorMsg("File upload failed");
        }
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
            throw error;
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const cleanedData = normalizeEmptyFields(activityData);
        cleanedData.tenant_id = 1;
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);

        if (Object.values(isValide).every((data) => data?.status === true)) {

            try {
                const res = await APIBaseUrl.put(`activities/${activityData?.id}`, cleanedData, {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                });
                if (res?.data?.success === true) {
                    successMsg("Activity Updated Successsfully")
                    setActivityData({})
                    setOpen(false)
                    setIsUpdate(false)
                    getAllActivity()
                }

            } catch (error) {
                throw error;
            }

        }

    }

    // ⭐ Changed handleDelete to handle single delete
    const handleSingleDelete = async () => {
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
                setDeleteId("")
            }

        } catch (error) {
            throw error;
        }
    }

    const handleDelete = handleSingleDelete;

    const getAllActivity = async () => {
        try {
            setIsLoading(true);
            let allActivities = [];
            let skip = 0;
            const limit = 100;
            let hasMore = true;

            // Fetch all activities with pagination
            while (hasMore) {
                const res = await APIBaseUrl.get("activities/", {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                    params: { skip, limit }
                });

                
                if (res?.data?.success === true) {
                    const activities = res?.data?.data || [];
                    allActivities = [...allActivities, ...activities];
                    
                    // If we got less than the limit, we've reached the end
                    hasMore = activities.length === limit;
                    skip += limit;
                } else {
                    hasMore = false;
                }
            }

            setActivityList(allActivities);
            setIsLoading(false);

        } catch (error) {
            setActivityList([]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllActivity()
    }, [])

    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between align-items-center'>
                <h4 className='my-auto admin-right-title'>Activity</h4>
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
                    <button className='admin-add-button mt-0' onClick={() => { setOpen(true) }}><i className="fa-solid fa-plus me-2"></i> Add Activity</button>
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
                    setActivityData({})
                    setIsViewOnly(false)
                    setIsUpdate(false)
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
                                    <img src={`${activityData?.image}`} alt="Category-Preview" />
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
                                ? `Are you sure you want to delete the ${selectionModel.length} selected activities?`
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
                        Are you sure you want to duplicate this activity?
                    </p>
                    <p className="text-center text-muted" style={{ fontSize: '14px' }}>
                        A new draft will be created with "(Copy)" appended to the name.
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <button 
                                className="delete-btn yes" 
                                onClick={handleDuplicateActivity}
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

export default TourType