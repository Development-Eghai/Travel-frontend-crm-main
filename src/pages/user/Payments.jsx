import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'

const Payments = () => {
    return (
        <div className='overflow-hidden'>
            <section className='mt-5 section-padding-bottom'>
                <div className='container'>
                    <h1 className='text-3xl font-bold mb-6' style={{color: '#3b2a1a'}}>Payment Terms & Conditions</h1>
                    
                    <div className='prose max-w-none'>
                        <p className='mb-6' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            Please read our payment terms carefully before making any booking. By proceeding with payment, you agree to comply with all the terms mentioned below.
                        </p>

                        <div style={{
                            backgroundColor: '#fff4ef', 
                            border: '2px solid #25d366', 
                            borderRadius: '12px', 
                            padding: '25px', 
                            marginBottom: '30px'
                        }}>
                            <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                                <i className="fas fa-credit-card" style={{fontSize: '24px', color: '#3b2a1a', marginRight: '12px'}}></i>
                                <h2 className='text-2xl font-semibold' style={{color: '#3b2a1a', marginBottom: '0'}}>Payment Requirements</h2>
                            </div>
                            <ul className='list-none space-y-3' style={{paddingLeft: '0'}}>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>The amount paid at the time of booking is non-refundable.</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>We do not accept any form of cheques.</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>The bookings will be processed only after <strong>25% of the total amount</strong> has been paid.</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>The full amount must be paid <strong>fifteen days before the tour/stay starts</strong>.</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>We will send a reminder of full payment 20 days before the tour/stay starts.</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Failure to deliver complete payment will result in cancellation of the arrangement.</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>For instant bookings or on-the-spot booking, <strong>100% payment is required</strong> before bookings are processed.</span>
                                </li>
                            </ul>
                        </div>

                        <div style={{
                            backgroundColor: '#f9fafb',
                            borderLeft: '4px solid #3b2a1a',
                            padding: '20px 25px',
                            marginBottom: '30px',
                            borderRadius: '8px'
                        }}>
                            <h3 className='text-xl font-semibold mb-3' style={{color: '#3b2a1a'}}>
                                <i className="fas fa-info-circle" style={{marginRight: '10px', color: '#25d366'}}></i>
                                Important Payment Notes
                            </h3>
                            <div className='space-y-3' style={{fontSize: '15px', lineHeight: '1.8'}}>
                                <p style={{marginBottom: '12px'}}>
                                    <strong style={{color: '#3b2a1a'}}>Payment Methods:</strong> We accept payments via UPI, bank transfer, credit/debit card, and approved digital wallets.
                                </p>
                                <p style={{marginBottom: '12px'}}>
                                    <strong style={{color: '#3b2a1a'}}>GST & Taxes:</strong> All government taxes and GST are charged extra unless explicitly mentioned in the package.
                                </p>
                                <p style={{marginBottom: '12px'}}>
                                    <strong style={{color: '#3b2a1a'}}>Refund Processing:</strong> If approved as per our cancellation policy, refunds may take 7-14 business days to process.
                                </p>
                                <p style={{marginBottom: '0'}}>
                                    <strong style={{color: '#3b2a1a'}}>Price Changes:</strong> Prices are subject to change based on availability and seasonal demand.
                                </p>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            padding: '25px',
                            marginBottom: '30px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}>
                            <h3 className='text-xl font-semibold mb-4' style={{color: '#3b2a1a'}}>
                                <i className="fas fa-exclamation-triangle" style={{marginRight: '10px', color: '#f59e0b'}}></i>
                                Additional Terms
                            </h3>
                            <ul className='list-disc pl-6 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                                <li>Entry tickets, activity charges, and personal expenses are not included unless stated in the package.</li>
                                <li>Travel insurance is not included unless explicitly requested and charged separately.</li>
                                <li>Extra charges may apply for last-minute changes to itinerary or accommodations.</li>
                                <li>If the client delays payment beyond the due date, the booking may be released.</li>
                                <li>Any no-show at the departure point will result in cancellation without refund.</li>
                                <li>Force Majeure conditions (weather, lockdowns, natural disasters, etc.) may alter the itinerary. Refunds in such cases will be at management's discretion.</li>
                                <li>The tour agency holds the right to cancel or reschedule the trip with prior notice.</li>
                            </ul>
                        </div>

                        <div style={{
                            backgroundColor: '#3b2a1a',
                            color: 'white',
                            borderRadius: '12px',
                            padding: '25px',
                            textAlign: 'center',
                            marginTop: '40px'
                        }}>
                            <i className="fas fa-handshake" style={{fontSize: '32px', marginBottom: '15px', display: 'block'}}></i>
                            <p style={{fontSize: '16px', lineHeight: '1.8', marginBottom: '0', color: 'white'}}>
                                <strong>By making any payment, you confirm that you have read, understood, and agree to these payment terms and conditions.</strong>
                            </p>
                        </div>

                        <div style={{
                            marginTop: '30px',
                            padding: '20px',
                            backgroundColor: '#fff4ef',
                            borderRadius: '8px',
                            borderLeft: '4px solid #25d366'
                        }}>
                            <p style={{marginBottom: '10px', fontSize: '15px', lineHeight: '1.8'}}>
                                <strong style={{color: '#3b2a1a'}}>Company Name:</strong> Indian Mountain Rovers
                            </p>
                            <p style={{marginBottom: '10px', fontSize: '15px', lineHeight: '1.8'}}>
                                <strong style={{color: '#3b2a1a'}}>Registration:</strong> Registered with Department of Tourism Government of Himachal Pradesh, India
                            </p>
                            <p style={{marginBottom: '10px', fontSize: '15px', lineHeight: '1.8'}}>
                                <strong style={{color: '#3b2a1a'}}>Himachal Tourism Reg.:</strong> 11-576/12-DTO-SML
                            </p>
                            <p style={{marginBottom: '0', fontSize: '15px', lineHeight: '1.8'}}>
                                <strong style={{color: '#3b2a1a'}}>Registered Office:</strong> Manali Highway Chakkar Shimla
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Payments