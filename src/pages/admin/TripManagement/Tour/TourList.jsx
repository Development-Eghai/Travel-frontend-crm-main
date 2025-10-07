import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import { GetAllDestination, GetAllTrip } from '../../../../common/api/ApiService';
import { capitalizeWords } from '../../../../common/Validation';
import { getAllTrips } from '../../../../store/slices/tripSlices';
import { APIBaseUrl } from '../../../../common/api/api';

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
            field: 'title', headerName: 'Trip Title', flex: 1,
            renderCell: (params) => {
                const tripTitle = params.row?.title || params.row?.title || "";
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
                const slug = params.row?.destination_type || params.row?.destination_type || "";
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
                const slug = params.row?.pickup_location || params.row?.pickup_location || "";
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
                const slug = params.row?.drop_location || params.row?.drop_location || "";
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
                const slug = params.row?.slug || params.row?.slug || "";
                const id = params.row?.id;

                return (
                    <div className='admin-actions'>
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

    const numberedRows = Array.isArray(tripList?.reverse())
        ? tripList.map((row, index) => ({
            ...row,
            sno: index + 1,
        }))
        : [];

  

    const getAllTrips = async () => {
        try {
            const res = await APIBaseUrl.get("trips/", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true && res?.data?.error_code === 0) {
                setTripList(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    };

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
                    // getRowId={(row) => row._id}
                    // isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default TourList
