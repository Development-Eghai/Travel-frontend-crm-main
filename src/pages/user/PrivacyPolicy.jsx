import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'

const PrivacyPolicy = () => {
    return (
        <div className='overflow-hidden'>
            <section className='mt-5 section-padding-bottom'>
                <div className='container'>
                    <h1 className='text-3xl font-bold mb-6' style={{color: '#3b2a1a'}}>Privacy Policy</h1>
                    
                    <div className='prose max-w-none'>
                        <p className='mb-6' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            At Indian Mountain Rovers, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and protect your data when you use our website and services.
                        </p>

                        <p className='mb-6' style={{lineHeight: '1.8', fontSize: '15px', fontStyle: 'italic', color: '#666'}}>
                            <strong>Last Updated:</strong> November 2025
                        </p>

                        <div style={{
                            backgroundColor: '#fff4ef',
                            borderLeft: '4px solid #25d366',
                            padding: '20px 25px',
                            marginBottom: '30px',
                            borderRadius: '8px'
                        }}>
                            <p style={{marginBottom: '0', fontSize: '15px', lineHeight: '1.8'}}>
                                By using our website and services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                            </p>
                        </div>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            1. Information We Collect
                        </h2>
                        
                        <div style={{marginBottom: '30px'}}>
                            <h3 className='text-xl font-semibold mb-3' style={{color: '#3b2a1a'}}>
                                <i className="fas fa-user" style={{marginRight: '10px', color: '#25d366'}}></i>
                                Personal Information
                            </h3>
                            <p className='mb-3' style={{lineHeight: '1.8', fontSize: '15px'}}>
                                We collect personal information that you voluntarily provide to us when you:
                            </p>
                            <ul className='list-disc pl-6 mb-4 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                                <li>Make a booking or inquiry</li>
                                <li>Register for an account</li>
                                <li>Subscribe to our newsletter</li>
                                <li>Contact us via email, phone, or contact forms</li>
                                <li>Participate in surveys or promotions</li>
                            </ul>
                            <p className='mb-3' style={{lineHeight: '1.8', fontSize: '15px'}}>
                                <strong>This may include:</strong> Name, email address, phone number, postal address, date of birth, travel preferences, passport information (for international bookings), emergency contact details, and payment information.
                            </p>
                        </div>

                        <div style={{marginBottom: '30px'}}>
                            <h3 className='text-xl font-semibold mb-3' style={{color: '#3b2a1a'}}>
                                <i className="fas fa-chart-line" style={{marginRight: '10px', color: '#25d366'}}></i>
                                Automatically Collected Information
                            </h3>
                            <p className='mb-3' style={{lineHeight: '1.8', fontSize: '15px'}}>
                                When you visit our website, we automatically collect certain information about your device and browsing behavior:
                            </p>
                            <ul className='list-disc pl-6 mb-4 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                                <li>IP address and device identifiers</li>
                                <li>Browser type and version</li>
                                <li>Operating system</li>
                                <li>Pages visited and time spent on pages</li>
                                <li>Referring website addresses</li>
                                <li>Clickstream data</li>
                            </ul>
                        </div>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            2. How We Use Your Information
                        </h2>
                        
                        <div style={{
                            backgroundColor: '#f9fafb',
                            borderRadius: '12px',
                            padding: '25px',
                            marginBottom: '30px'
                        }}>
                            <ul className='list-none space-y-3' style={{paddingLeft: '0'}}>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Process and manage your bookings and reservations</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Send booking confirmations, itineraries, and travel updates</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Communicate with you about your inquiries and requests</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Provide customer support and respond to your questions</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Send promotional offers, newsletters, and marketing communications (with your consent)</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Improve our website, services, and user experience</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Analyze website traffic and user behavior for business insights</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Prevent fraud and ensure security</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>•</span>
                                    <span>Comply with legal obligations and regulatory requirements</span>
                                </li>
                            </ul>
                        </div>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            3. Information Sharing and Disclosure
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            We respect your privacy and do not sell, rent, or trade your personal information to third parties. However, we may share your information in the following circumstances:
                        </p>

                        <div style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '30px'
                        }}>
                            <h3 className='text-lg font-semibold mb-3' style={{color: '#3b2a1a'}}>Service Providers</h3>
                            <p style={{lineHeight: '1.8', fontSize: '15px', marginBottom: '15px'}}>
                                We may share your information with trusted third-party service providers who assist us in operating our business, such as:
                            </p>
                            <ul className='list-disc pl-6 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                                <li>Hotels, resorts, and accommodation providers</li>
                                <li>Transportation companies (airlines, car rentals, bus services)</li>
                                <li>Tour operators and activity providers</li>
                                <li>Payment processors and financial institutions</li>
                                <li>Email service providers and marketing platforms</li>
                                <li>Website hosting and analytics services</li>
                            </ul>
                        </div>

                        <div style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '30px'
                        }}>
                            <h3 className='text-lg font-semibold mb-3' style={{color: '#3b2a1a'}}>Legal Requirements</h3>
                            <p style={{lineHeight: '1.8', fontSize: '15px'}}>
                                We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety, or that of our users or the public.
                            </p>
                        </div>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            4. Payment Security
                        </h2>
                        
                        <div style={{
                            backgroundColor: '#fff4ef',
                            border: '2px solid #25d366',
                            borderRadius: '12px',
                            padding: '25px',
                            marginBottom: '30px'
                        }}>
                            <p style={{lineHeight: '1.8', fontSize: '15px', marginBottom: '15px'}}>
                                <i className="fas fa-lock" style={{marginRight: '10px', color: '#25d366', fontSize: '20px'}}></i>
                                <strong>Your payment security is our priority.</strong>
                            </p>
                            <ul className='list-disc pl-6 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                                <li>All payment transactions are processed through secure, PCI-DSS compliant payment gateways</li>
                                <li>We do not store your credit card or debit card information on our servers</li>
                                <li>Payment details are encrypted using SSL/TLS technology</li>
                                <li>We use industry-standard security measures to protect your financial information</li>
                            </ul>
                        </div>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            5. Cookies and Tracking Technologies
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.
                        </p>
                        
                        <div style={{marginBottom: '30px'}}>
                            <h3 className='text-lg font-semibold mb-3' style={{color: '#3b2a1a'}}>Types of Cookies We Use:</h3>
                            <ul className='list-disc pl-6 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                                <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness</li>
                            </ul>
                            <p className='mt-3' style={{lineHeight: '1.8', fontSize: '15px'}}>
                                You can manage cookie preferences through your browser settings. However, disabling certain cookies may affect website functionality.
                            </p>
                        </div>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            6. Data Security
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction:
                        </p>
                        
                        <ul className='list-disc pl-6 mb-4 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                            <li>Encrypted data transmission using SSL/TLS protocols</li>
                            <li>Secure servers with restricted access controls</li>
                            <li>Regular security audits and vulnerability assessments</li>
                            <li>Employee training on data protection and confidentiality</li>
                            <li>Multi-factor authentication for administrative access</li>
                        </ul>
                        
                        <div style={{
                            backgroundColor: '#fff4ef',
                            borderLeft: '4px solid #f59e0b',
                            padding: '15px 20px',
                            marginBottom: '30px',
                            borderRadius: '8px'
                        }}>
                            <p style={{marginBottom: '0', fontSize: '14px', lineHeight: '1.8'}}>
                                <strong>Please Note:</strong> While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                            </p>
                        </div>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            7. Data Retention
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Factors determining retention periods include:
                        </p>
                        
                        <ul className='list-disc pl-6 mb-4 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                            <li>The duration of our relationship with you</li>
                            <li>Legal and regulatory requirements</li>
                            <li>Dispute resolution and legal claims</li>
                            <li>Business operational needs</li>
                        </ul>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            8. Your Rights and Choices
                        </h2>
                        
                        <div style={{
                            backgroundColor: '#f9fafb',
                            borderRadius: '12px',
                            padding: '25px',
                            marginBottom: '30px'
                        }}>
                            <p className='mb-3' style={{lineHeight: '1.8', fontSize: '15px'}}>
                                You have the following rights regarding your personal information:
                            </p>
                            <ul className='list-none space-y-3' style={{paddingLeft: '0'}}>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>✓</span>
                                    <span><strong>Access:</strong> Request a copy of the personal information we hold about you</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>✓</span>
                                    <span><strong>Correction:</strong> Request correction of inaccurate or incomplete information</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>✓</span>
                                    <span><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>✓</span>
                                    <span><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>✓</span>
                                    <span><strong>Portability:</strong> Request transfer of your data to another service provider</span>
                                </li>
                                <li style={{display: 'flex', alignItems: 'start', lineHeight: '1.8'}}>
                                    <span style={{color: '#25d366', marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>✓</span>
                                    <span><strong>Object:</strong> Object to certain processing of your personal information</span>
                                </li>
                            </ul>
                            <p className='mt-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                                To exercise any of these rights, please contact us using the information provided below.
                            </p>
                        </div>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            9. Marketing Communications
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            With your consent, we may send you promotional emails about new destinations, special offers, travel tips, and updates. You can opt out at any time by:
                        </p>
                        
                        <ul className='list-disc pl-6 mb-4 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                            <li>Clicking the "Unsubscribe" link at the bottom of any marketing email</li>
                            <li>Contacting us directly to update your preferences</li>
                            <li>Managing your account settings (if applicable)</li>
                        </ul>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            Please note that even if you opt out of marketing communications, we will still send you transactional emails related to your bookings and account.
                        </p>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            10. Third-Party Links
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            Our website may contain links to third-party websites, social media platforms, or services that are not operated by us. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                        </p>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            11. Children's Privacy
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            Our services are not directed to children under the age of 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will take steps to delete such information.
                        </p>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            12. International Data Transfers
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer your information internationally, we ensure appropriate safeguards are in place to protect your data in accordance with applicable laws.
                        </p>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            13. Changes to This Privacy Policy
                        </h2>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                        </p>
                        
                        <ul className='list-disc pl-6 mb-4 space-y-2' style={{fontSize: '15px', lineHeight: '1.8'}}>
                            <li>Posting the updated policy on our website with a new "Last Updated" date</li>
                            <li>Sending an email notification (for significant changes)</li>
                            <li>Displaying a prominent notice on our website</li>
                        </ul>
                        
                        <p className='mb-4' style={{lineHeight: '1.8', fontSize: '15px'}}>
                            Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                        </p>

                        <h2 className='text-2xl font-semibold mt-8 mb-4' style={{color: '#3b2a1a', borderLeft: '4px solid #25d366', paddingLeft: '15px'}}>
                            14. Contact Us
                        </h2>
                        
                        <div style={{
                            backgroundColor: '#3b2a1a',
                            color: 'white',
                            borderRadius: '12px',
                            padding: '30px',
                            marginBottom: '30px'
                        }}>
                            <h3 className='text-xl font-semibold mb-4' style={{color: 'white'}}>
                                <i className="fas fa-envelope" style={{marginRight: '10px'}}></i>
                                Questions About Your Privacy?
                            </h3>
                            <p style={{lineHeight: '1.8', fontSize: '15px', marginBottom: '20px', color: 'white'}}>
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div style={{borderTop: '2px solid #25d366', paddingTop: '20px, color'}}>
                                <p style={{marginBottom: '10px', lineHeight: '1.8', color: 'white'}}><strong>Company:</strong> Indian Mountain Rovers</p>
                                <p style={{marginBottom: '10px', lineHeight: '1.8', color: 'white'}}><strong>Address:</strong> Manali Highway Chakkar, Shimla, Himachal Pradesh, India</p>
                                <p style={{marginBottom: '10px', lineHeight: '1.8', color: 'white'}}><strong>Email:</strong> sales@indianmountainrovers.com</p>
                                <p style={{marginBottom: '10px', lineHeight: '1.8', color: 'white'}}><strong>Phone:</strong> +91 9418344227</p>
                                <p style={{marginBottom: '0', lineHeight: '1.8', color: 'white'}}><strong>Registration:</strong> 11-576/12-DTO-SML (Himachal Pradesh Tourism)</p>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: '#fff4ef',
                            border: '2px solid #25d366',
                            borderRadius: '12px',
                            padding: '25px',
                            textAlign: 'center'
                        }}>
                            <i className="fas fa-shield-alt" style={{fontSize: '32px', color: '#25d366', marginBottom: '15px', display: 'block'}}></i>
                            <p style={{fontSize: '16px', lineHeight: '1.8', marginBottom: '0', color: '#3b2a1a'}}>
                                <strong>Your privacy matters to us. We are committed to protecting your personal information and maintaining your trust.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PrivacyPolicy