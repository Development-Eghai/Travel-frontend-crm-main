import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import { DeleteDestination, GetAllDestination, UpdateDestination } from '../../../../common/api/ApiService';
import { capitalizeWords } from '../../../../common/Validation';
import CustomModal from '../../../../component/CustomModel';
import { successMsg, errorMsg } from '../../../../common/Toastify';
import { APIBaseUrl } from '../../../../common/api/api';

const DestinationList = () => {
    const [destinationList, setDestinationList] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // State for bulk actions
    const [selectionModel, setSelectionModel] = useState([]);
    const [duplicateId, setDuplicateId] = useState("");
    const [openDuplicateModal, setOpenDuplicateModal] = useState(false);
    const [isDuplicating, setIsDuplicating] = useState(false);

    const navigate = useNavigate();

    const handlePreview = (slug, id) => {
        const url = `/destination/${slug}/${id}`;
        window.open(url, '_blank');
    };

    const handleUpdateNavigate = (_id) => {
        navigate(`/admin/destination-create/${_id}`);
    }

    // Helper for generating unique slug
    const generateUniqueSlug = (originalSlug) => {
        const timestamp = Date.now();
        return `${originalSlug.toLowerCase().replace(/[^a-z0-9]/g, '-')}-copy-${timestamp}`;
    };

    // --- API FUNCTIONS ---
    
    // Handles single item delete
    const handleSingleDelete = async () => {
        try {
            const res = await APIBaseUrl.delete(`destinations/${deleteId}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                successMsg("Destination Deleted Successfully")
                setOpenDeleteModal(false)
                getAllDestination()
                setDeleteId('')
            }
        } catch (error) {
            console.error("Error deleting destination:", error?.response?.data || error.message);
            errorMsg("Failed to delete destination.");
        }
    }
    const handleDelete = handleSingleDelete;

    // Function to handle bulk delete for destinations
    const handleBulkDelete = async () => {
        if (selectionModel.length === 0) return;

        try {
            const deletePromises = selectionModel.map(id => 
                APIBaseUrl.delete(`destinations/${id}`, {
                    headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_ff8B4VGYy9g45M" },
                })
            );

            await Promise.allSettled(deletePromises);

            successMsg(`${selectionModel.length} destinations deleted successfully.`);
            setOpenDeleteModal(false);
            setSelectionModel([]); // Clear selection
            getAllDestination(); // Refresh the list
        } catch (error) {
            console.error("Error performing bulk delete:", error);
            errorMsg("An error occurred during bulk deletion.");
            setOpenDeleteModal(false);
        }
    }
    
    // ⭐ FINAL FIX: Function to handle duplicate destination
    const handleDuplicateDestination = async () => {
        if (!duplicateId) return;
        
        setIsDuplicating(true);
        try {
            const getRes = await APIBaseUrl.get(`destinations/${duplicateId}`, {
                headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
            });

            if (getRes?.data?.success === true) {
                const originalDestination = getRes?.data?.data;
                const { 
                    _id, 
                    createdAt, 
                    updatedAt, 
                    __v, 
                    id, 
                    // Exclude properties that contain trip data objects
                    popular_trips, 
                    featured_blogs,
                    related_blogs,
                    testimonial_data,
                    blog_category_data,
                    custom_packages, // We will manually reconstruct this below
                    ...restOfDestinationData 
                } = originalDestination;

                // FIX: Map custom packages to include the required 'trip_ids' array
                const updatedCustomPackages = (originalDestination.custom_packages || []).map(pkg => ({
                    ...pkg,
                    // Map the 'trips' array of objects back to an array of just IDs
                    trip_ids: (pkg.trips || []).map(trip => trip.id),
                    // Remove the 'trips' array of objects to avoid conflicts
                    trips: undefined 
                }));

                // FIX: Map popular_trip_ids correctly
                const updatedPopularTripIds = (originalDestination.popular_trip_ids || []).map(trip => trip.id) || [];

                // Initialize all core content arrays to ensure they are present for API POST request
                const cleanedData = {
                    ...restOfDestinationData,
                    
                    // Core Content Arrays
                    highlights: originalDestination.highlights || [], 
                    itineraries: originalDestination.itineraries || [],
                    faqs: originalDestination.faqs || [],
                    includes: originalDestination.includes || [],
                    excludes: originalDestination.excludes || [],
                    
                    // Nested IDs/Packages
                    popular_trip_ids: updatedPopularTripIds,
                    custom_packages: updatedCustomPackages, 
                    
                    // Ensure the rest of the ID lists are present
                    featured_blog_ids: originalDestination.featured_blog_ids || [],
                    related_blog_ids: originalDestination.related_blog_ids || [],
                    activity_ids: originalDestination.activity_ids || [],
                    testimonial_ids: originalDestination.testimonial_ids || [],
                    blog_category_ids: originalDestination.blog_category_ids || [],


                    title: `${originalDestination.title} (Copy)`,
                    slug: generateUniqueSlug(originalDestination.slug),
                };

                const createRes = await APIBaseUrl.post("destinations/", cleanedData, { 
                    headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
                });

                if (createRes?.data?.success === true) {
                    successMsg("Destination duplicated successfully!");
                    setOpenDuplicateModal(false);
                    setDuplicateId("");
                    await getAllDestination(); 
                } else {
                    errorMsg(createRes?.data?.message || "Failed to duplicate destination. Server rejected the request.");
                }
            } else {
                errorMsg("Failed to fetch original destination data.");
            }
        } catch (error) {
            console.error("Error duplicating destination:", error);
            errorMsg(error?.response?.data?.message || "An error occurred while duplicating the destination.");
        } finally {
            setIsDuplicating(false);
        }
    };


    const getAllDestination = async () => {
        try {
            setIsLoading(true);
            const res = await APIBaseUrl.get("destinations/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                setDestinationList(res?.data?.data || [])
                setIsLoading(false);
            } else {
                setDestinationList([]);
                setIsLoading(false);
            }

        } catch (error) {
            setDestinationList([]);
            setIsLoading(false);
        }
    }


    const columns = [
        { field: 'sno', headerName: 'SNO', width: 80, resizable: true },
        {
            field: 'title', 
            headerName: 'Destination Name', 
            width: 250, 
            minWidth: 200,
            resizable: true,
            renderCell: (params) => {
                const region = params.row?.title || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(region)}
                    </div>
                );
            }
        },
        {
            field: 'destination_type', 
            headerName: 'Destination Type', 
            width: 200,
            minWidth: 150,
            resizable: true,
            renderCell: (params) => {
                const region = params.row?.destination_type || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(region)}
                    </div>
                );
            }
        },
        { field: 'slug', headerName: 'Slug', width: 250, minWidth: 200, resizable: true },
        {
            field: 'id',
            headerName: 'Actions',
            width: 150,
            minWidth: 140,
            resizable: true,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const slug = params.row?.slug;
                const id = params.row?.id;

                return (
                    <div className='admin-actions d-flex'>
                        <i className="fa-solid fa-pen-to-square mx-1" onClick={() => { handleUpdateNavigate(params?.row?.id); }}></i>

                        {/* Duplicate Icon */}
                        <i 
                            className="fa-regular fa-copy mx-1 ms-3" 
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
                );
            }
        },
    ];

    const numberedRows = Array.isArray(destinationList?.reverse())
        ? destinationList.map((row, index) => ({
            ...row,
            sno: index + 1,
        }))
        : [];

    useEffect(() => {
        getAllDestination()
    }, [])

    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='my-auto'>Destination List</h3>
                <div className='d-flex align-items-center'>
                    {/* Bulk Delete Button */}
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
                    <button className='admin-add-button mt-0' onClick={() => navigate("/admin/destination-create")}><i className="fa-solid fa-plus me-2"></i> Add Destination</button>
                </div>
            </div>

            <div className='my-5'>
                <MyDataTable
                    rows={numberedRows}
                    columns={columns}
                    getRowId={(row) => row.id || row._id}
                    isLoading={isLoading}
                    // CRITICAL FIX: Enable checkbox selection for bulk delete
                    checkboxSelection 
                    // Handle row selection changes
                    onRowSelectionModelChange={(newSelectionModel) => { 
                        setSelectionModel(newSelectionModel); 
                    }}
                    selectionModel={selectionModel}
                />
            </div>

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
                                ? `Are you sure you want to delete the ${selectionModel.length} selected destinations?`
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
            
            {/* Duplicate Modal */}
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
                        Are you sure you want to duplicate this destination?
                    </p>
                    <p className="text-center text-muted" style={{ fontSize: '14px' }}>
                        A new draft will be created with "(Copy)" appended to the title.
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <button 
                                className="delete-btn yes" 
                                onClick={handleDuplicateDestination}
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

export default DestinationList