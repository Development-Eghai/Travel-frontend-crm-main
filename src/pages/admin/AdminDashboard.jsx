import React from 'react'

const AdminDashboard = () => {
    return (
        <>

            {/* <div className='px-4 py-4'>
            <div className=''>
                <div className="row">
                    <div className="col-lg-3">
                        <div className='dashboard-top-card'>
                            <p>Total Enquiries</p>
                            <div className='d-flex justify-content-between dashboard-top-card-div'>
                                <p>0</p>
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <p className='data-percent'>+12% from last month</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className='dashboard-top-card'>
                            <p>Active Bookings</p>
                            <div className='d-flex justify-content-between dashboard-top-card-div'>
                                <p>0</p>
                                <i className="fa-solid fa-calendar-week"></i>
                            </div>
                            <p className='data-percent'>+13% from last month</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className='dashboard-top-card'>
                            <p>Revenue</p>
                            <div className='d-flex justify-content-between dashboard-top-card-div'>
                                <p>0</p>
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                            </div>
                            <p className='data-percent'>+15% from last month</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className='dashboard-top-card'>
                            <p>Active Packages</p>
                            <div className='d-flex justify-content-between dashboard-top-card-div'>
                                <p>0</p>
                                <i className="fa-solid fa-box-archive"></i>
                            </div>
                            <p className='data-percent'>4 added from last month</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-4'>
                <div className="row">
                    <div className="col-lg-6">
                        <div className='dashboard-layer-2'>
                            <div className='d-flex justify-content-between'>
                                <p className='head-para'>Recent Inquiries</p>
                                <p className='anchor-para my-auto cursor'>View All <i className="fa-solid fa-arrow-right ms-3"></i></p>
                            </div>

                            <div className='d-flex justify-content-center align-items-center flex-column no-data-div'>
                                <i className="fa-regular fa-envelope"></i>
                                <p className='inquiry-head'>No inquiries yet</p>
                                <p className='inquiry-para'>New inquiries will appear here</p>
                            </div>


                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='dashboard-layer-2'>
                            <div className='d-flex justify-content-between'>
                                <p className='head-para'>Popular Packages</p>
                                <p className='anchor-para my-auto cursor'>View All <i className="fa-solid fa-arrow-right ms-3"></i></p>
                            </div>

                            <div className='d-flex justify-content-center align-items-center flex-column no-data-div'>
                                <i className="fa-solid fa-box"></i>
                                <p className='inquiry-head'>No inquiries yet</p>
                                <p className='inquiry-para'>New inquiries will appear here</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='my-3 dashboard-top-card'>
                <p className='head-para-common'>Quick Actions</p>
                <div className="row">
                    <div className="col-lg-3">
                        <div className='dashboard-bottom-card card-1 d-flex justify-content-center align-items-center flex-column'>
                            <i className="fa-solid fa-boxes-stacked"></i>
                            <p className='mt-2 fw-bold'>Add Packages</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className='dashboard-bottom-card card-2 d-flex justify-content-center align-items-center flex-column'>
                        <i className="fa-solid fa-hotel"></i>
                            <p className='mt-2 fw-bold'>Add Hotel</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className='dashboard-bottom-card card-3 d-flex justify-content-center align-items-center flex-column'>
                        <i className="fa-solid fa-laptop"></i>
                            <p className='mt-2 fw-bold'>Write Blog</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className='dashboard-bottom-card card-4 d-flex justify-content-center align-items-center flex-column'>
                        <i className="fa-solid fa-window-restore"></i>
                            <p className='mt-2 fw-bold'>View Inquiries</p>
                        </div>
                    </div>
                </div>
            </div>
            </div> */}


            <div className="container-fluid dashboard">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold text-primary mb-0">Dashboard <span className="text-secondary">Overview</span></h3>
                        <p className="text-muted">Welcome back! Here's what's happening with your travel business today.</p>
                    </div>
                    <div>
                        <button className="btn btn-light me-2">Download Report</button>
                        <button className="admin-add-button py-2 px-3 "><i class="fa-solid fa-plus me-2"></i>Add New Lead</button>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">

                            <div className='d-flex justify-content-between'>
                                <p className="fw-bold mb-2">Total Leads</p>
                                <i class="fa-solid fa-user-group" style={{ color: "blue" }}></i>
                            </div>

                            <h4 className="fw-bold">1,234</h4>
                            <p className="text-success small">+12% from last month</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">

                            <div className='d-flex justify-content-between'>
                                <p className="fw-bold mb-2">Active Bookings</p>
                                <i class="fa-solid fa-calendar" style={{ color: "green" }}></i>
                            </div>

                            <h4 className="fw-bold">89</h4>
                            <p className="text-success small">+8% from last month</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">

                            <div className='d-flex justify-content-between'>
                                <p className="fw-bold mb-2">Revenue (Month)</p>
                                <i class="fa-solid fa-dollar-sign" style={{ color: "orange" }}></i>
                            </div>

                            <h4 className="fw-bold">₹5,67,890</h4>
                            <p className="text-success small">+24% from last month</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="stat-card">

                            <div className='d-flex justify-content-between'>
                                <p className="fw-bold mb-2">Conversion Rate</p>
                                <i class="fa-solid fa-bullseye" style={{ color: "orange" }}></i>
                            </div>

                            <h4 className="fw-bold">12.5%</h4>
                            <p className="text-success small">+2.1% from last month</p>
                        </div>
                    </div>
                </div>

                <div className="row g-3 my-4">
                    <div className="col-lg-5">
                        <div className="card p-3">

                            <div className='inventory-header mb-3'>
                                <div className='d-flex'>
                                    <i class="fa-solid fa-building-circle-check"></i>
                                    <h6>Inventory Overview</h6>
                                </div>
                                <p>Your travel inventory at a glance</p>
                            </div>

                            <div className="inventory-item d-flex justify-content-between align-items-center mb-2">
                                <div className='d-flex' >
                                    <i class="fa-solid fa-location-dot my-auto me-3"></i>
                                    <div className='d-flex flex-column inventory-item-content'>
                                        <h6>Trip Packages</h6>
                                        <p>142 active of 156 total</p>
                                    </div>
                                </div>
                                <button>View</button>
                            </div>

                            <div className="inventory-item d-flex justify-content-between align-items-center mb-2">
                                <div className='d-flex' >
                                    <i class="fa-regular fa-building me-3 my-auto"></i>
                                    <div className='d-flex flex-column inventory-item-content'>
                                        <h6>Hotels Listed</h6>
                                        <p>83 active of 89 total</p>
                                    </div>
                                </div>
                                <button>View</button>
                            </div>

                            <div className="inventory-item d-flex justify-content-between align-items-center mb-2">
                                <div className='d-flex' >
                                    <i class="fa-solid fa-person me-3 my-auto"></i>
                                    <div className='d-flex flex-column inventory-item-content'>
                                        <h6>Activities</h6>
                                        <p>221 active of 234 total</p>
                                    </div>
                                </div>
                                <button>View</button>
                            </div>

                            <div className="inventory-item d-flex justify-content-between align-items-center mb-2">
                                <div className='d-flex' >
                                    <i class="fa-solid fa-car me-3 my-auto"></i>
                                    <div className='d-flex flex-column inventory-item-content'>
                                        <h6>Cab Services</h6>
                                        <p>42 active of 45 total</p>
                                    </div>
                                </div>
                                <button>View</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card p-3">
                            <div className='inventory-header mb-3'>
                                <div className='d-flex'>
                                    <i class="fa-solid fa-user-group"></i>
                                    <h6>Recent Leads</h6>
                                </div>
                                <p>Latest inquiries and their status</p>
                            </div>
                            <div className="lead-item d-flex justify-content-between">
                                <div>
                                    <p className="mb-0 fw-bold">Priya Sharma <span className="badge bg-warning text-dark">New</span></p>
                                    <small className="text-muted">Goa • Family Package</small>
                                </div>
                                <div className="text-end">
                                    <p className="fw-bold text-primary mb-0">₹45,000</p>
                                    <small className="text-muted">View Details</small>
                                </div>
                            </div>
                            <div className="lead-item d-flex justify-content-between">
                                <div>
                                    <p className="mb-0 fw-bold">Rahul Kumar <span className="badge bg-orange">Quoted</span></p>
                                    <small className="text-muted">Kerala • Honeymoon</small>
                                </div>
                                <div className="text-end">
                                    <p className="fw-bold text-primary mb-0">₹75,000</p>
                                    <small className="text-muted">View Details</small>
                                </div>
                            </div>
                            <div className="lead-item d-flex justify-content-between">
                                <div>
                                    <p className="mb-0 fw-bold">Amit Patel <span className="badge bg-primary">Confirmed</span></p>
                                    <small className="text-muted">Rajasthan • Cultural Tour</small>
                                </div>
                                <div className="text-end">
                                    <p className="fw-bold text-primary mb-0">₹1,20,000</p>
                                    <small className="text-muted">View Details</small>
                                </div>
                            </div>
                            <div className="lead-item d-flex justify-content-between">
                                <div>
                                    <p className="mb-0 fw-bold">Sneha Gupta <span className="badge bg-secondary">Negotiating</span></p>
                                    <small className="text-muted">Himachal • Adventure</small>
                                </div>
                                <div className="text-end">
                                    <p className="fw-bold text-primary mb-0">₹85,000</p>
                                    <small className="text-muted">View Details</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-3">
                    <div className='inventory-header mb-3'>
                        <div className='d-flex'>
                            <i class="fa-solid fa-building-circle-check"></i>
                            <h6>Quick Actions</h6>
                        </div>
                        <p>Common tasks and shortcuts</p>
                    </div>
                    <div className="row g-3">
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="quick-action">
                                <i class="fa-solid fa-location-dot"></i>
                                <p> Add Trip</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="quick-action">
                                <i class="fa-solid fa-hotel"></i>
                                <p> Add Hotel</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="quick-action">
                                <i class="fa-solid fa-people-group"></i>
                                <p> New Lead</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="quick-action">
                                <i class="fa-solid fa-bullseye"></i>
                                <p> Create Offer</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="quick-action">

                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                <p> Send Quote</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-6">
                            <div className="quick-action">
                                <i class="fa-solid fa-flag"></i>
                                <p>View Reports</p></div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminDashboard
