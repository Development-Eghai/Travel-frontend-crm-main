import React from 'react'

const LoginPage = () => {
    return (
        <div>
            <div className='container'>
                <div className='admin-login-parent'>
                    <div>
                        <div className='row'>
                            <div className='col-lg-8'>
                                <div className='admin-login-left mb-5 me-5'>
                                    <div className='d-flex icon-div-main'>
                                        <div className='icon-div'>
                                            <i class="fa-solid fa-plane-circle-check"></i>
                                        </div>

                                        <div>
                                            <p className='head'>WanderCraft Suite</p>
                                            <p className='para'>Complete Travel Management Solution</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h1>Manage Your</h1>
                                        <h1>Travel Business</h1>
                                        <h1>Like Never Before</h1>
                                        <p className='normal-para'>Complete travel agency management system with 15+ modules including trip management,
                                            hotel inventory, lead tracking, quotation builder, and marketing automation.</p>
                                    </div>

                                    <div className='mt-4'>
                                        <div className='row'>
                                            <div className='col-lg-3'>
                                                <div className='bottom-icon-div-main'>
                                                    <div className='icon-div-bottom'>
                                                        <i class="fa-solid fa-location-dot"></i>
                                                    </div>
                                                    <p className='small-head'>Trip Management</p>
                                                    <p className='packages'>156 Packages</p>
                                                </div>
                                            </div>
                                            <div className='col-lg-3'>
                                                <div className='bottom-icon-div-main'>
                                                    <div className='icon-div-bottom'>
                                                        <i class="fa-solid fa-hotel"></i>
                                                    </div>
                                                    <p className='small-head'>Hotel Inventory</p>
                                                    <p className='packages'>89 Properties</p>
                                                </div>
                                            </div>
                                            <div className='col-lg-3'>
                                                <div className='bottom-icon-div-main'>
                                                    <div className='icon-div-bottom'>
                                                        <i class="fa-solid fa-people-group"></i>
                                                    </div>
                                                    <p className='small-head'>Lead Management</p>
                                                    <p className='packages'>1,234 Leads</p>
                                                </div>
                                            </div>
                                            <div className='col-lg-3'>
                                                <div className='bottom-icon-div-main'>
                                                    <div className='icon-div-bottom'>
                                                        <i class="fa-solid fa-location-dot "></i>
                                                    </div>
                                                    <p className='small-head'>Full Suite</p>
                                                    <p className='packages'>15+ Modules</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-lg-4'>
                                <div className='admin-login-dright-input'>
                                    <p className='form-head'>Agency Login</p>
                                    <p className='form-normal'>Access your travel management dashboardd</p>

                                    <div className='admin-login-input-div mt-4'>
                                        <label>Email</label>
                                        <input type='email' placeholder='eg.john@gmail.com' />
                                    </div>
                                    <div className='admin-login-input-div mt-4'>
                                        <label>Password</label>
                                        <input type='email' placeholder='********' />
                                    </div>

                                    <button>Login</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
