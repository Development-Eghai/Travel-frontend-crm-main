import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'

const TermsAndConditions = () => {
    return (
        <div className='overflow-hidden'>
            <section className='mt-5 section-padding-bottom'>
                <div className='container'>
                    <h1>Terms And Conditions</h1>
                    <ol className='mt-4 temporary'>
                        <li>All tour bookings are subject to availability and will be confirmed only after receiving the advance payment.</li>
                        <li>Customers must provide accurate information at the time of booking. We are not responsible for issues due to incorrect details.</li>
                        <li>An advance payment of 50% is required to reserve your tour package. The remaining amount must be paid before the tour start date.</li>
                        <li>Cancellations made within the allowed period may be eligible for a refund, as per our cancellation policy.</li>
                        <li>No refunds will be given for no-shows or unused services once the tour has started.</li>
                        <li>Itineraries are subject to change based on weather, availability, and other unforeseen circumstances.</li>
                        <li>Customers are responsible for carrying valid government-issued ID and travel documents.</li>
                        <li>All personal belongings are the responsibility of the traveler. We are not liable for loss, theft, or damage.</li>
                        <li>We are not responsible for any delays or cancellations caused by natural disasters, strikes, or government restrictions.</li>
                        <li>Pricing is subject to change without prior notice due to fluctuations in transport, hotel tariffs, or currency rates.</li>
                        <li>Any additional services or activities not included in the original itinerary will incur extra charges.</li>
                        <li>Tour inclusions will be clearly listed in the itinerary. Anything not listed is considered excluded.</li>
                        <li>Hotel check-in/check-out timings are as per hotel policy and may vary by destination.</li>
                        <li>Travelers must comply with local laws and respect the customs and traditions of the destination.</li>
                        <li>We reserve the right to cancel or reschedule any tour for operational or safety reasons.</li>
                        <li>In case of complaints or issues during the tour, travelers must report them immediately for resolution.</li>
                        <li>We may take photos/videos during the tour for promotional use, unless otherwise requested in writing.</li>
                        <li>All disputes will be subject to the jurisdiction of the tour company’s registered legal address.</li>
                        <li>Travel insurance is not included in the package and is recommended for all travelers.</li>
                        <li>By booking with us, you acknowledge and agree to all the above terms and conditions.</li>
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default TermsAndConditions
