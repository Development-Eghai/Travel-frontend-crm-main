import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    return (
        <>
            <div className='header-parent-main'>
                <div className=''>
                    <div className='user-profile-main'>
                        <div>
                            <p className='dashboard-route'>Dashboard</p>
                            <p className='header-para'>Welcome back admin , Here's what happening with your travel portal</p>

                        </div>
                        <div className="dropdown my-auto">
                            <button className="profile-icon dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-user"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item"><i className="fa-solid fa-right-from-bracket me-2" ></i> Log out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header


