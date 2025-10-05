import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import { GetAllDestination, GetAllTrip } from '../../../../common/api/ApiService';
import { capitalizeWords } from '../../../../common/Validation';

const TourList = () => {
    const [tripList, setTripList] = useState([])

    const navigate = useNavigate();
    
    const handlePreview = (slug, id) => {
        const url = `/trip-preview/${slug}/${id}`;
        window.open(url, '_blank');
    };

    const columns = [
        { field: 'sno', headerName: 'SNO', flex: 1 },
        {
            field: 'trip_title', headerName: 'Trip Title', flex: 1,
            renderCell: (params) => {
                const tripTitle = params.row?.fixedPackage?.trip_title || params.row?.customizePackage?.trip_title || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(tripTitle)}
                    </div>
                );
            }
        },
        {
            field: 'slug', headerName: 'Slug', flex: 1,
            renderCell: (params) => {
                const slug = params.row?.fixedPackage?.slug || params.row?.customizePackage?.slug || "";
                return (
                    <div className='admin-actions'>
                       {slug}
                    </div>
                );
            }
        },
        {
            field: 'featured_trip_page', headerName: 'Feature Trip Page', flex: 1,
            renderCell: (params) => {
                const slug = params.row?.fixedPackage?.featured_trip_page || params.row?.customizePackage?.featured_trip_page || "";
                return (
                    <div className='admin-actions'>
                       {slug}
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
                const slug = params.row?.fixedPackage?.slug || params.row?.customizePackage?.slug || "";
                const id = params.row?._id;

                return (
                    <div className='admin-actions'>
                        {/* <i className="fa-solid fa-pen-to-square"></i>

                        <i className="fa-solid fa-trash ms-3"></i> */}

                        <i
                            className="fa-solid fa-eye ms-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePreview(slug, id)}
                        ></i>
                    </div>
                );
            }
        },
        // {
        //     field: 'status',
        //     headerName: 'Status',
        //     flex: 1,
        //     sortable: false,
        //     filterable: false,
        //     disableColumnMenu: true,
        //     renderCell: (params) => {
        //         const status = params.row.status === "active" ? true : false;
        //         return (
        //             <div className="switch">
        //                 <input type="checkbox" checked={status} readOnly />
        //                 <span className="slider-table round"></span>
        //             </div>
        //         );
        //     },
        // }
    ];

    const numberedRows = tripList?.length && tripList?.map((row, index) => ({
        ...row,
        sno: index + 1,
    }));

    const getAllTrips = async () => {
        const response = await GetAllTrip()
        if (response && response?.statusCode === 200) {
            setTripList(response?.data)
        }
    }

    useEffect(() => {
        getAllTrips()
    }, [])


    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h3 className='my-auto'>Trip List</h3>
                <button className='admin-add-button mt-0' onClick={() => navigate("/dashboard/tour-create")}><i class="fa-solid fa-plus me-2"></i> Create Trip</button>
            </div>

            <div className='my-5'>
                <MyDataTable
                    rows={numberedRows}
                    columns={columns}
                    getRowId={(row) => row._id}
                // isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default TourList
