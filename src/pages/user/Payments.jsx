import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'

const Payments = () => {
    return (
        <div className='overflow-hidden'>
            <section className='mt-5 section-padding-bottom'>
                <div className='container'>
                    <h1>Payments</h1>
                    <ol className='mt-4 temporary'>
                        <li>An advance payment of 50% is required to confirm the tour booking.</li>
                        <li>The remaining 50% must be paid 7 days before the tour start date.</li>
                        <li>Bookings made less than 7 days before the tour must be paid in full at the time of booking.</li>
                        <li>All payments are non-refundable unless cancellation is made as per our cancellation policy.</li>
                        <li>Payments can be made via UPI, bank transfer, credit/debit card, or approved wallets.</li>
                        <li>GST and applicable government taxes are charged extra unless mentioned.</li>
                        <li>Prices are subject to change based on availability and seasonal demand.</li>
                        <li>In case of natural disasters, strikes, or unforeseen events, refunds will be at management’s discretion.</li>
                        <li>Extra charges may apply for last-minute changes to itinerary or accommodations.</li>
                        <li>Entry tickets, activity charges, and personal expenses are not included unless stated.</li>
                        <li>Travel insurance is not included unless explicitly requested and charged separately.</li>
                        <li>Child and senior citizen discounts are applicable only if proof of age is provided.</li>
                        <li>Customers are responsible for ensuring they carry valid ID, documents, and permissions.</li>
                        <li>Any no-show at departure point will result in cancellation without refund.</li>
                        <li>If the client delays payment beyond the due date, the booking may be released.</li>
                        <li>Hotel check-in policies are governed by the respective property rules and may vary.</li>
                        <li>Refunds, if approved, may take 7–14 business days to process.</li>
                        <li>Force Majeure conditions (weather, lockdowns, etc.) may alter the itinerary or schedule.</li>
                        <li>Tour agency holds the right to cancel or reschedule the trip with prior notice.</li>
                        <li>By making any payment, you confirm that you agree to these terms and conditions.</li>
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default Payments
