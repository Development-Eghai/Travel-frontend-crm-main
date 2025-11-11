import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'

const TermsAndConditions = () => {
    return (
        <div className='overflow-hidden'>
            <section className='mt-5 section-padding-bottom'>
                <div className='container'>
                    <h1 className='text-3xl font-bold mb-6' style={{color: '#3b2a1a'}}>Terms And Conditions</h1>
                    
                    <div className='prose max-w-none'>
                        <p className='mb-6' style={{lineHeight: '1.8'}}>Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Indian Mountain Rovers relationship with you in relation to this website.</p>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>Our Valued Guest</h2>
                        <p className='mb-6'>As part of our effort to provide you hassle-free, enjoyable holiday the 'Terms and Conditions' below is our contract with you to prevent misunderstandings between the tour escorts/facilitators, the company and you at any time in the course of the travel. Please spare us some of your valuable time. We require you to read and ACCEPT all the terms and conditions, before you contract our services.</p>
                        
                        <p className='mb-6'>The term Indian Mountain Rovers or 'us' or 'we' refers to the owner of the website whose registered office is Shimla. The term 'you' refers to the user or viewer of our website.</p>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>General Terms</h2>
                        <ul className='list-disc pl-6 mb-6 space-y-2'>
                            <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
                            <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</li>
                            <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.</li>
                            <li>We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction.</li>
                        </ul>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>Cancellation Policy</h2>
                        <p className='mb-4' style={{lineHeight: '1.8'}}>If the Client is willing to amend or cancel his/her booking because of whatsoever reasons including accident, illness, or any other personal reasons including non-payment of the balance payment, the Company is liable to recover Cancellation charges from the Client. All cancellations are to be communicated in written.</p>
                        
                        <div className='mb-6' style={{overflowX: 'auto'}}>
                            <h3 className='text-xl font-semibold mb-4' style={{color: '#3b2a1a'}}>Cancellation Timeline & Refunds:</h3>
                            <table style={{width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden'}}>
                                <thead>
                                    <tr style={{backgroundColor: '#3b2a1a', color: 'white'}}>
                                        <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '15px'}}>Cancellation Timeline</th>
                                        <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '15px'}}>Refund Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb'}}>
                                        <td style={{padding: '15px', fontWeight: '500'}}>60 days pre-travel date</td>
                                        <td style={{padding: '15px', color: '#25d366', fontWeight: '600'}}>80% of the amount paid</td>
                                    </tr>
                                    <tr style={{backgroundColor: 'white', borderBottom: '1px solid #e5e7eb'}}>
                                        <td style={{padding: '15px', fontWeight: '500'}}>59-40 days pre-travel date</td>
                                        <td style={{padding: '15px', color: '#25d366', fontWeight: '600'}}>50% of the amount paid</td>
                                    </tr>
                                    <tr style={{backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb'}}>
                                        <td style={{padding: '15px', fontWeight: '500'}}>39-25 days pre-travel date</td>
                                        <td style={{padding: '15px', color: '#f59e0b', fontWeight: '600'}}>25% of the amount paid</td>
                                    </tr>
                                    <tr style={{backgroundColor: 'white', borderBottom: '1px solid #e5e7eb'}}>
                                        <td style={{padding: '15px', fontWeight: '500'}}>24-15 days pre-travel date</td>
                                        <td style={{padding: '15px', color: '#f59e0b', fontWeight: '600'}}>15% of the amount paid</td>
                                    </tr>
                                    <tr style={{backgroundColor: '#f9fafb'}}>
                                        <td style={{padding: '15px', fontWeight: '500'}}>Less than 15 days</td>
                                        <td style={{padding: '15px', color: '#ef4444', fontWeight: '600'}}>No Refund</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <h3 className='text-xl font-semibold mb-3'>Important Cancellation Notes:</h3>
                        <ul className='list-disc pl-6 mb-6 space-y-2'>
                            <li>Cancellations will be considered only if the request is made within 72 hours of placing an order. However, the cancellation request will not be entertained if the booking dates have been communicated to the hotels, transporters etc.</li>
                            <li>There is no cancellation of booking under the Same Day booking category.</li>
                            <li>No cancellations are entertained for those bookings that has obtained on special occasions like Pongal, Diwali, Valentine's Day, Christmas, New year and peak season time etc.</li>
                        </ul>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Postponement Policy</h2>
                        <p className='mb-4'>For postpone/prep-one of tour packages are to be communicated in written and need to be inform us at least 15 days prior of tour date. INR 20% will be charged extra for prep one/postpone.</p>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>GIT Reservation Policy</h2>
                        <ul className='list-disc pl-6 mb-6 space-y-2'>
                            <li>50% Payment required at the time of reservation.</li>
                            <li>Full & Final Payment required at the time of checking in.</li>
                            <li>No refund will be made in case of mechanical trouble to the vehicle or natural calamities like landslides, flood, earthquake, heavy snow fall or any other reason beyond the control of the Company.</li>
                            <li>We shall not be responsible in any matter whatsoever for any delay or inconvenience to the passengers during the journey either due to the breakdown of the vehicle or due to any other cause/unforeseen circumstances beyond our control.</li>
                            <li>All hotel cancellation for FIT & GIT is subject to all individual hotels terms & conditions.</li>
                        </ul>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Jurisdiction</h2>
                        <p className='mb-6'>All disputes pertaining to the tour and travel, travel-related services, adventure activities conducted by the Company, and any claim arising there-under shall be subjected to Shimla H.P., India jurisdiction only.</p>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Scope of Activity</h2>
                        <p className='mb-6'>We are travel and holiday organizers only. We do not provide insurance services. We also do not process claims of any kind. All adventure activities are risky sports, involvement in such activities is guest(s) own choice/risk and we do not take any responsibility for mishaps or accidents. We do not accept any claim.</p>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Accommodation and Transport</h2>
                        <p className='mb-4'>Hotels/Room Accommodation provided is generally on a twin sharing basis so single occupancy, arising for whatever reason, will cost more. Extra bed will also be charged as per hotel specified rates.</p>
                        <ul className='list-disc pl-6 mb-6 space-y-2'>
                            <li>Guests will have to abide by the check-in/out time of the respective hotels.</li>
                            <li>Early arrivals/late departures or overstays due for whatever reason is the responsibility of the guests themselves.</li>
                            <li>Use of hotel services and amenities are the responsibility of the guests.</li>
                            <li>Our cars are allotted on the booking priority basis.</li>
                            <li>Any damages caused by you during the travel shall be payable by you.</li>
                        </ul>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Meals</h2>
                        <p className='mb-6'>There is a pre-set menu for meals as per the tour program. We reserve the right to change the meal arrangements if circumstances demand us to do so. A tour participant missing a meal for whatever reason cannot claim the meal missed.</p>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Safety and Health Matters</h2>
                        <ul className='list-disc pl-6 mb-6 space-y-2'>
                            <li>All baggage and personal effects shall be at all times and in all circumstances, the responsibility of passengers.</li>
                            <li>We are not responsible for any type of loss and damage (baggage or person).</li>
                            <li>Health matters should be the sole responsibility of the traveler. Adequate travel insurance cover is strongly recommended.</li>
                            <li>It shall be duty of the guest to inform the Company of any medical condition(s) that may affect his ability to undertake the activities or could negatively affect the interest of the group.</li>
                            <li>The Company reserves the right to deny the guest participation in some of the activities with no refund.</li>
                            <li>Luggage is carried at owner's risk.</li>
                        </ul>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Itinerary Changes</h2>
                        <p className='mb-6'>Sometimes we may make amendments to the itinerary, due to unforeseen developments such as unavailability of sights, adverse climatic conditions etc. In some cases such changes could mean extra charges but you will be informed of the complete details. In the event of the Company exercising its rights to amend any aspect of the services, the guest(s) shall have to continue with the program as amended.</p>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Payments</h2>
                        <ul className='list-disc pl-6 mb-6 space-y-2'>
                            <li>The amount paid at the time of booking is non-refundable.</li>
                            <li>We do not accept any form of cheques.</li>
                            <li>The bookings will be processed only after 25% of the total amount has been paid.</li>
                            <li>The full amount must be paid fifteen days before the tour/stay starts.</li>
                            <li>We will send a reminder of full payment 20 days before the tour/stay starts.</li>
                            <li>Failure to deliver complete payment will result in cancellation of the arrangement.</li>
                            <li>For instant bookings or on-the-spot booking, 100% payment is required before bookings are processed.</li>
                        </ul>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Travel Documents</h2>
                        <p className='mb-4'>It is the sole responsibility of the guest(s) to collect in time and hold valid travel documents and statutory clearances, such as passports, visas, confirmed air/rail tickets, insurance and medical insurance certificates, any other document used to confirm an arrangement with service provider and other statutory certificates.</p>
                        <ul className='list-disc pl-6 mb-6 space-y-2'>
                            <li>Essential travel documents must be in the hands of the Owner at all times.</li>
                            <li>Personal documents are non-transferable.</li>
                            <li>The company will not accept request for help in replacing lost documents.</li>
                            <li>If a guest is refused entry by authorities due to missing personal document, the guest cannot claim compensation from the company.</li>
                        </ul>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Privacy of Information</h2>
                        <p className='mb-6'>We treat all information furnished by you as confidential and will exercise extreme discretion in using the information. However, we may be constrained to disclose the information furnished by you, if such disclosure is required by law or by an order of the court. The company also reserves the right to publish the guests' photograph or group's photograph taken during the tour.</p>
                        
                        <h2 className='text-2xl font-semibold mt-8 mb-4'>Acceptance of Terms</h2>
                        <p className='mb-6'>Guest's acceptance and/or signature on the booking form shall mean complete acceptance of the 'Terms and Conditions' contained herein by the guest(s). In case of one person is acting in behalf of the other members of the Group signing the 'I ACCEPT', it shall be deemed that the others have duly authorized the concerned signing person.</p>
                        
                        <div style={{backgroundColor: '#fff4ef', border: '2px solid #3b2a1a', borderRadius: '12px', padding: '30px', marginTop: '3rem'}}>
                            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                                <i className="fas fa-building" style={{fontSize: '28px', color: '#3b2a1a', marginRight: '15px'}}></i>
                                <p className='font-semibold' style={{fontSize: '20px', color: '#3b2a1a', marginBottom: '0'}}>Company Registration Details</p>
                            </div>
                            <div style={{borderTop: '2px solid #25d366', paddingTop: '20px'}}>
                                <p style={{marginBottom: '10px', fontSize: '15px', lineHeight: '1.8'}}><strong style={{color: '#3b2a1a'}}>Company Name:</strong> Indian Mountain Rovers</p>
                                <p style={{marginBottom: '10px', fontSize: '15px', lineHeight: '1.8'}}><strong style={{color: '#3b2a1a'}}>Registration:</strong> Registered with Department of Tourism Government of Himachal Pradesh, India</p>
                                <p style={{marginBottom: '10px', fontSize: '15px', lineHeight: '1.8'}}><strong style={{color: '#3b2a1a'}}>Himachal Tourism Reg.:</strong> 11-576/12-DTO-SML</p>
                                <p style={{marginBottom: '0', fontSize: '15px', lineHeight: '1.8'}}><strong style={{color: '#3b2a1a'}}>Registered Office:</strong> Manali Highway Chakkar Shimla</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TermsAndConditions
