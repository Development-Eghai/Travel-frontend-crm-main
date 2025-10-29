import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import { capitalizeWords } from '../../../../common/Validation';
import { APIBaseUrl } from '../../../../common/api/api';
import { successMsg, errorMsg } from '../../../../common/Toastify';
import CustomModal from '../../../../component/CustomModel';

const TourList = () => {
    // State variables
    const [tripList, setTripList] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openDuplicateModal, setOpenDuplicateModal] = useState(false)
    const [deleteId, setDeleteId] = useState("");
    const [duplicateId, setDuplicateId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isDuplicating, setIsDuplicating] = useState(false);

    const navigate = useNavigate();

    // --- Navigation and Preview Handlers ---

    const handlePreview = (slug, id) => {
        const url = `/trip-preview/${slug}/${id}`;
        window.open(url, '_blank');
    };

    const handleUpdateNavigate = (id) => {
        navigate(`/admin/tour-create/${id}`);
    }

    // --- API Call Functions ---

    const fetchAllTrips = async () => {
        try {
            setIsLoading(true);
            let allTrips = [];
            let skip = 0;
            const limit = 100;
            let hasMore = true;

            while (hasMore) {
                const res = await APIBaseUrl.get("trips/", {
                    headers: {
                        "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                    },
                    params: { skip, limit }
                });

                if (res?.data?.success === true && res?.data?.error_code === 0) {
                    const trips = res?.data?.data || [];
                    allTrips = [...allTrips, ...trips];
                    hasMore = trips.length === limit;
                    skip += limit;
                } else {
                    hasMore = false;
                }
            }

            setTripList(allTrips);
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            setTripList([]);
            setIsLoading(false);
            errorMsg("Failed to fetch trip list.");
        }
    };
    
    const handleDelete = async () => {
        try {
            const res = await APIBaseUrl.delete(`trips/${deleteId}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                successMsg("Trip Deleted Successfully")
                setOpenDeleteModal(false)
                fetchAllTrips()
                setDeleteId('')
            }
        } catch (error) {
            console.error("Error deleting trip:", error?.response?.data || error.message);
            errorMsg("Failed to delete trip.");
        }
    }

    const generateUniqueSlug = (originalSlug) => {
        const timestamp = Date.now();
        return `${originalSlug.toLowerCase().replace(/[^a-z0-9]/g, '-')}-copy-${timestamp}`;
    };

    const handleDuplicateTrip = async () => {
        if (!duplicateId) return;
        
        setIsDuplicating(true);
        try {
            // 1. Fetch the trip details
            const getRes = await APIBaseUrl.get(`trips/${duplicateId}`, {
                headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
            });

            if (getRes?.data?.success === true && getRes?.data?.error_code === 0) {
                const originalTrip = getRes?.data?.data;

                // Safely omit metadata fields
                const { 
                    _id, 
                    createdAt, 
                    updatedAt, 
                    __v, 
                    id, 
                    ...restOfTripData 
                } = originalTrip;

                // 2. Prepare the duplicate payload
                const duplicatePayload = {
                    ...restOfTripData,
                    title: `${originalTrip.title} (Copy)`,
                    slug: generateUniqueSlug(originalTrip.slug),
                };

                // 3. Create the duplicate trip
                const createRes = await APIBaseUrl.post("trips/", duplicatePayload, {
                    headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8VGYy9g45M" },
                });

                if (createRes?.data?.success === true) {
                    successMsg("Trip duplicated successfully!");
                    setOpenDuplicateModal(false);
                    setDuplicateId("");
                    await fetchAllTrips(); 
                } else {
                    errorMsg(createRes?.data?.message || "Failed to duplicate trip. Please try again.");
                }
            } else {
                errorMsg("Failed to fetch original trip data.");
            }

        } catch (error) {
            console.error("Error duplicating trip:", error?.response?.data || error.message);
            errorMsg(error?.response?.data?.message || "An error occurred while duplicating the trip.");
        } finally {
            setIsDuplicating(false);
        }
    };


    // --- Column Definition for DataTable ---
    const columns = [
        { field: 'sno', headerName: 'SNO', width: 70 },
        
        // TRIP TITLE: Responsive with text wrapping
        {
            field: 'title', 
            headerName: 'Trip Title', 
            flex: 1,
            minWidth: 300,
            renderCell: (params) => (
                <div className='admin-actions' style={{ 
                    whiteSpace: 'normal', 
                    lineHeight: '1.5',
                    wordWrap: 'break-word',
                    padding: '8px 0'
                }}>
                    {capitalizeWords(params.row?.title || "")}
                </div>
            )
        },
        
        // DESTINATION TYPE
        {
            field: 'destination_type', 
            headerName: 'Destination Type', 
            width: 160,
            renderCell: (params) => (
                <div className='admin-actions'>
                    {capitalizeWords(params.row?.destination_type || "")}
                </div>
            )
        },
        
        // PICKUP LOCATION
        {
            field: 'pickup_location', 
            headerName: 'Pickup Location', 
            width: 180,
            renderCell: (params) => (
                <div className='admin-actions'>
                    {capitalizeWords(params.row?.pickup_location || "")}
                </div>
            )
        },
        
        // DROP LOCATION
        {
            field: 'drop_location', 
            headerName: 'Dropup Location', 
            width: 180,
            renderCell: (params) => (
                <div className='admin-actions'>
                    {capitalizeWords(params.row?.drop_location || "")}
                </div>
            )
        },
        
        // ACTIONS
        {
            field: '_id',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const slug = params.row?.slug || "";
                const id = params.row?.id;

                return (
                    <div className='admin-actions d-flex'>
                        {/* EDIT ICON */}
                        <i 
                            className="fa-solid fa-pen-to-square mx-1" 
                            style={{ cursor: "pointer" }}
                            onClick={() => handleUpdateNavigate(id)}
                            title="Edit"
                        ></i>

                        {/* DUPLICATE ICON */}
                        <i 
                            className="fa-regular fa-copy mx-1" 
                            style={{ cursor: "pointer", color: "#17a2b8" }}
                            onClick={() => { 
                                setDuplicateId(id); 
                                setOpenDuplicateModal(true) 
                            }}
                            title="Duplicate"
                        ></i>
                        
                        {/* PREVIEW ICON */}
                        <i
                            className="fa-solid fa-eye mx-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePreview(slug, id)}
                            title="Preview"
                        ></i>

                        {/* DELETE ICON */}
                        <i 
                            className="fa-solid fa-trash mx-1" 
                            style={{ cursor: "pointer", color: "#dc3545" }}
                            onClick={() => { 
                                setDeleteId(id); 
                                setOpenDeleteModal(true) 
                            }}
                            title="Delete"
                        ></i>
                    </div>
                );
            }
        },
    ];

    const numberedRows = Array.isArray(tripList)
        ? tripList.map((row, index) => ({
            ...row,
            sno: index + 1,
        }))
        : [];

    // --- Effects and Render ---

    useEffect(() => {
        fetchAllTrips()
    }, [])

    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h3 className='my-auto'>Trip List</h3>
                <button 
                    className='admin-add-button mt-0' 
                    onClick={() => navigate("/admin/tour-create")}
                >
                    <i className="fa-solid fa-plus me-2"></i> Create Trip
                </button>
            </div>

            <div className='my-5'>
                <MyDataTable
                    rows={numberedRows}
                    columns={columns}
                    getRowId={(row) => row.id || row._id}
                    isLoading={isLoading}
                    getRowHeight={() => 'auto'}
                />
            </div>

            {/* Delete Modal */}
            <CustomModal
                open={openDeleteModal}
                onClickOutside={() => {
                    setOpenDeleteModal(false);
                }}
            >
                <div className='delete-model-view-main'>
                    <p className="text-center">
                        Are you sure you want to delete this trip?
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
                        Are you sure you want to duplicate this trip?
                    </p>
                    <p className="text-center text-muted" style={{ fontSize: '14px' }}>
                        A new draft will be created with "(Copy)" appended to the title.
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <button 
                                className="delete-btn yes" 
                                onClick={handleDuplicateTrip}
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

export default TourList