import React from 'react'
import Header from './component/Header'
import { useNavigate } from 'react-router-dom';

const TripBookings = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='booking-main-parent'> 
                <div className='booking-center-card position-relative'>
                    <div>
                        <i class="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
                        <p className='dates-cost text-center'>Dates & Costing</p>
                        <div>
                            <p className='booking-trip-name'>Bali with Gili and Nusa Penida Island</p>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='booking-left'>
                                <div className='available-slots-main'>
                                    <p className='head'>Available Dates</p>

                                    <div className='booking-left-accrodion'>
                                        <div className="container px-0">
                                            <div className='trip-detail-faqs mt-4'>
                                                <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <i class="fa-solid fa-arrow-right me-3"></i>       Can I get the refund?
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <div className='booking-left-accrodion-content'>
                                                                    <p> 09 Aug 2025 - 19 Aug 2025</p>
                                                                    <p className='seats-left'> 8 Seats Left</p>
                                                                    <div className='d-flex'>
                                                                        <p className='starting-price'> Starting Price: </p>
                                                                        <p>₹1,69,990/-</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingTwo">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                <i class="fa-solid fa-arrow-right me-3"></i>      Can I change the travel date?
                                                            </button>
                                                        </h2>
                                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <div className='booking-left-accrodion-content'>
                                                                    <p> 09 Aug 2025 - 19 Aug 2025</p>
                                                                    <p className='seats-left'> 8 Seats Left</p>
                                                                    <div className='d-flex'>
                                                                        <p className='starting-price'> Starting Price: </p>
                                                                        <p>₹1,69,990/-</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingThree">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                <i class="fa-solid fa-arrow-right me-3"></i>       When and where does the tour end?
                                                            </button>
                                                        </h2>
                                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <div className='booking-left-accrodion-content'>
                                                                    <p> 09 Aug 2025 - 19 Aug 2025</p>
                                                                    <p className='seats-left'> 8 Seats Left</p>
                                                                    <div className='d-flex'>
                                                                        <p className='starting-price'> Starting Price: </p>
                                                                        <p>₹1,69,990/-</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className='notes-para'><span className='booking-note mt-0'>NOTE: </span> At the time of booking, it is mandatory for a
                                            customer to pay a minimum of ₹25,000 per person as a booking amount. We will proceed with the booking, only after receiving the booking amount.</p>

                                        <p className='notes-para'><span className='booking-note'>NOTE: </span> At the time of booking, it is mandatory for a
                                            customer to pay a minimum of ₹25,000 per person as a booking amount. We will proceed with the booking, only after receiving the booking amount.</p>

                                        <p className='notes-para'><span className='booking-note'>NOTE: </span> At the time of booking, it is mandatory for a
                                            customer to pay a minimum of ₹25,000 per person as a booking amount. We will proceed with the booking, only after receiving the booking amount.</p>

                                        <p className='notes-para'><span className='booking-note'>NOTE: </span> At the time of booking, it is mandatory for a
                                            customer to pay a minimum of ₹25,000 per person as a booking amount. We will proceed with the booking, only after receiving the booking amount.</p>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='booking-right'>
                                <div className='available-slots-main'>
                                    <p className='head'>Costing</p>
                                    <div className='costing-head-table mt-3'>
                                        <table>
                                            <tr>
                                                <th>Company</th>
                                                <th>Contact</th>
                                                <th>Country</th>
                                            </tr>
                                            <tr>
                                                <td>Alfreds Futterkiste</td>
                                                <td>Maria Anders</td>
                                                <td>Germany</td>
                                            </tr>
                                            <tr>
                                                <td>Centro comercial</td>
                                                <td>Francisco Chang</td>
                                                <td>Mexico</td>
                                            </tr>
                                            <tr>
                                                <td>Centro comercial</td>
                                                <td>Francisco Chang</td>
                                                <td>Mexico</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                                <div className='trip-detail-right booking-page'>
                                    <div className='trip-detail-price-card booking-page'>
                                        <div>
                                            <p className='mb-1'>Starting from</p>
                                            <div className='d-flex'>
                                                <p className='trip-price'>₹ 10,000/-</p>
                                                <p className='trip-price-per'>Per Person</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => navigate('/trips-bookings')}>Dates & Pricing</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripBookings
