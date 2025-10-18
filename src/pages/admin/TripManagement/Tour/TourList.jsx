import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import { capitalizeWords } from '../../../../common/Validation';
import { APIBaseUrl } from '../../../../common/api/api';
import { successMsg } from '../../../../common/Toastify';
import CustomModal from '../../../../component/CustomModel';

const TourList = () => {
    const [tripList, setTripList] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const handlePreview = (slug, id) => {
        const url = `/trip-preview/${slug}/${id}`;
        window.open(url, '_blank');
    };

    const handleUpdateNavigate = (id) => {
        navigate(`/admin/tour-create/${id}`);
    }

    const columns = [
        { field: 'sno', headerName: 'SNO', flex: 1 },
        {
            field: 'title', headerName: 'Trip Title', flex: 1,
            renderCell: (params) => {
                const tripTitle = params.row?.title || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(tripTitle)}
                    </div>
                );
            }
        },
        {
            field: 'destination_type', headerName: 'Destination Type', flex: 1,
            renderCell: (params) => {
                const slug = params.row?.destination_type || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(slug)}
                    </div>
                );
            }
        },
        {
            field: 'pickup_location', headerName: 'Pickup Location', flex: 1,
            renderCell: (params) => {
                const slug = params.row?.pickup_location || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(slug)}
                    </div>
                );
            }
        },
        {
            field: 'drop_location', headerName: 'Dropup Location', flex: 1,
            renderCell: (params) => {
                const slug = params.row?.drop_location || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(slug)}
                    </div>
                );
            }
        },
        {
            field: '_id',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const slug = params.row?.slug || "";
                const id = params.row?.id;

                return (
                    <div className='admin-actions'>
                        <i 
                            className="fa-solid fa-pen-to-square" 
                            style={{ cursor: "pointer" }}
                            onClick={() => handleUpdateNavigate(id)}
                        ></i>

                        <i 
                            className="fa-solid fa-trash ms-3" 
                            style={{ cursor: "pointer" }}
                            onClick={() => { 
                                setDeleteId(id); 
                                setOpenDeleteModal(true) 
                            }}
                        ></i>

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

    const numberedRows = Array.isArray(tripList)
        ? tripList.map((row, index) => ({
            ...row,
            sno: index + 1,
        }))
        : [];

    const getAllTrips = async () => {
        try {
            setIsLoading(true);
            const res = await APIBaseUrl.get("trips", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true && res?.data?.error_code === 0) {
                setTripList(res?.data?.data)
                setIsLoading(false);
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            setIsLoading(false);
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
                getAllTrips()
                setDeleteId('')
            }

        } catch (error) {
            console.error("Error deleting trip:", error?.response?.data || error.message);
        }
    }

    useEffect(() => {
        getAllTrips()
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
                    isLoading={isLoading}
                />
            </div>

            <CustomModal
                open={openDeleteModal}
                onClickOutside={() => {
                    setOpenDeleteModal(false);
                }}
            >
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
            </CustomModal>
        </div>
    )
}

export default TourList