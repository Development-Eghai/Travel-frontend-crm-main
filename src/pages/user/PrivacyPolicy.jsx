import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'

const PrivacyPolicy = () => {
    return (
        <div className='overflow-hidden'>
            <section className='mt-5 section-padding-bottom'>
                <div className='container'>
                    <h1>PrivacyPolicy</h1>
                    <ol className='mt-4 temporary'>
                        <li>We collect personal information such as name, email, phone number, and travel preferences to process your bookings.</li>
                        <li>Your data is used solely to provide and improve our travel services and user experience.</li>
                        <li>We do not sell, rent, or share your personal information with third parties without your consent.</li>
                        <li>Payment details are handled securely through trusted third-party payment gateways; we do not store card information.</li>
                        <li>Cookies are used to enhance website functionality and improve your browsing experience.</li>
                        <li>We collect non-personal data such as browser type, device information, and IP address for analytics purposes.</li>
                        <li>All personal data is stored securely using encrypted servers and access control.</li>
                        <li>We may use your contact information to send booking confirmations, updates, and promotional offers.</li>
                        <li>You can unsubscribe from marketing emails at any time using the unsubscribe link.</li>
                        <li>We retain your personal data only for as long as necessary to fulfill the purpose of collection.</li>
                        <li>Users have the right to request access, correction, or deletion of their personal data.</li>
                        <li>Our website may contain links to third-party websites; we are not responsible for their privacy practices.</li>
                        <li>We do not knowingly collect data from children under 13 years of age without parental consent.</li>
                        <li>We may update this privacy policy from time to time, and the latest version will always be available on our website.</li>
                        <li>Access to personal data is limited to authorized personnel only.</li>
                        <li>We follow industry-standard security practices to protect your information.</li>
                        <li>Personal information will be disclosed if legally required by law enforcement or government agencies.</li>
                        <li>We may use anonymized data for reporting, research, or marketing insights.</li>
                        <li>Your continued use of the website signifies acceptance of our privacy policy.</li>
                        <li>For any privacy-related concerns or questions, you can contact us at our support email.</li>
                    </ol>
                </div>
            </section>
        </div>
    )
}

export default PrivacyPolicy
