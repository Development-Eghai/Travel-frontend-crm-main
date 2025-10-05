import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import { DeleteDestination, GetAllDestination, UpdateDestination } from '../../../../common/api/ApiService';
import { capitalizeWords } from '../../../../common/Validation';
import CustomModal from '../../../../component/CustomModel';
import { successMsg } from '../../../../common/Toastify';

const DestinationList = () => {
    const [destinationList, setDestinationList] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState("");

    const navigate = useNavigate();

    const handlePreview = (slug, id) => {
        const url = `/destination/${slug}/${id}`;
        window.open(url, '_blank');
    };

    const handleUpdateNavigate = (_id) => {
        navigate(`/dashboard/destination-create/${_id}`);
    }

    const columns = [
        { field: 'sno', headerName: 'SNO', flex: 1 },
        {
            field: 'destination_name', headerName: 'Destination Name', flex: 1,
            renderCell: (params) => {
                const region = params.row?.destination_name || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(region)}
                    </div>
                );
            }
        },
        {
            field: 'trip_region', headerName: 'Trip Region', flex: 1,
            renderCell: (params) => {
                const region = params.row?.trip_region || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(region)}
                    </div>
                );
            }
        },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
            field: '_id',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const slug = params.row?.slug;
                const id = params.row?._id;

                return (
                    <div className='admin-actions'>
                        <i className="fa-solid fa-pen-to-square" onClick={() => { handleUpdateNavigate(params?.row?._id); }}></i>

                        <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?._id); setOpenDeleteModal(true) }}></i>

                        <i
                            className="fa-solid fa-eye ms-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePreview(slug, id)}
                        ></i>
                    </div>
                );
            }
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

    const numberedRows = destinationList?.length && destinationList?.map((row, index) => ({
        ...row,
        sno: index + 1,
    }));

    const getAllDestination = async () => {
        const response = await GetAllDestination()
        if (response && response?.statusCode === 200) {
            setDestinationList(response?.data)
        }
    }

    const handleDelete = async () => {
        const response = await DeleteDestination(deleteId)
        if (response && response?.statusCode === 200) {
            successMsg("Destination Deleted Successsfully")
            setOpenDeleteModal(false)
            getAllDestination()
            setDeleteId('')
        }

    }

    const handleStatusUpdate = async (_id, currentStatus) => {
        const newStatus = currentStatus ? "inactive" : "active";
        const Payload = {
            _id,
            status: newStatus,
        };

        const response = await UpdateDestination(Payload)
        if (response && response?.statusCode === 200) {
            successMsg("Destination Updated Successsfully")
            getAllDestination()
        }

    }

    useEffect(() => {
        getAllDestination()
    }, [])



    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h3 className='my-auto'>Destination List</h3>
                <button className='admin-add-button mt-0' onClick={() => navigate("/admin/destination-create")}><i class="fa-solid fa-plus me-2"></i> Add Destination</button>
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

export default DestinationList
