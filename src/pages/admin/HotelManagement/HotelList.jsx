import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../src/component/MyDataTable';


const HotelList = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h3 className='my-auto'>Hotel List</h3>
                <button className='admin-add-button mt-0' onClick={() => navigate("/admin/hotel-create")}>Create New Hotel</button>
            </div>

            <div className='my-5'>
                <MyDataTable
                // rows={numberedRows}
                // columns={columns}
                // getRowId={(row) => row._id}
                // isLoading={isLoading}
                />
            </div>

        </div>
    )
}

export default HotelList
