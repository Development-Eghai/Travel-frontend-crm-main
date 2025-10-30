import { Link } from "react-router-dom";

const Footer = () => {
    // Static data derived from the latest destination API response:
    // Mapped: Himachal (18), Kashmir (26), Kerala (27), Goa (28)
    const popularDestinations = [
        { name: "Himachal Pradesh", to: "/destination/himachal/18" },
        { name: "Kashmir Valley", to: "/destination/kashmir/26" },
        { name: "Kerala Backwaters", to: "/destination/kerala/27" },
        { name: "Goa Beaches", to: "/destination/goa/28" },
    ];

    const tourCategories = [
        { name: "Group Tours", to: "/category-preview/group-tours/6" },
        { name: "Honeymoon Packages", to: "/category-preview/honeymoon/2" },
        { name: "Trekking & Adventure", to: "/category-preview/trekking/5" },
        { name: "Customized Trips", to: "/contact-us" },
    ];

    const socialLinks = [
        // Ensure these use the FAB (Font Awesome Brands) prefix
        { icon: "fab fa-facebook-f", url: "https://www.facebook.com/IndianMountainRovers/", title: "Facebook" },
        { icon: "fab fa-instagram", url: "https://www.instagram.com/indianmountainrovers_/", title: "Instagram" },
        { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/indian-mountain-rovers-4a584b328/?originalSubdomain=in", title: "LinkedIn" },
        // YouTube icon linked to Instagram URL
        { icon: "fab fa-youtube", url: "https://www.instagram.com/indianmountainrovers_/", title: "YouTube" }, 
    ];

    // Consolidated Contact Information
    const phoneNumbers = [
        "9418344227",
        "8278829941",
        // "8350970984",
        // "8679623792"
    ].map(num => `+91 ${num}`);
    
    const emailAddresses = [
        "info@indianmountainrovers.com",
        "indianmountainrovers@gmail.com",
        "mountainroversshimla@gmail.com"
    ];

    return (
        <footer
            style={{ overflowX: "hidden" }}
        >
            {/* Top Footer Section (PRIMARY THEME COLOR: #3b2a1a) */}
            {/* Added py-16 padding for appeal */}
            <div className="py-16 px-4 px-md-5" style={{ backgroundColor: "#3b2a1a", color: "#fff",   paddingTop: "30px",
    paddingBottom: "40px" }}>
                <div className="container-fluid mx-auto">
                    <div className="row gy-5 gx-5">
                        
                        {/* COL 1: Logo, About, and Newsletter (Desktop 3/12 width) */}
                        <div className="col-lg-3 col-md-6 text-center text-md-start">
                            {/* LOGO LINKED TO HOME PAGE */}
                            <Link to="/" className="d-inline-block mb-3 footer-logo-link">
                                {/* Logo: Assuming a local path /logo-indian-mountain-rovers.png exists */}
                                <img
                                    src="/logo-indian-mountain-rovers.png"
                                    alt="Indian Mountain Rovers Logo"
                                    className="img-fluid"
                                    style={{ height: "60px", width: "auto" }}
                                />
                                <span className="logo-text d-none d-md-inline ms-2 fw-bold" style={{fontSize: '1.25rem', color: '#fff'}}>Indian Mountain Rovers</span>
                            </Link>
                            
                            <p className="footer-about-text mb-4" style={{ lineHeight: "1.6", fontSize: "0.9rem", color: '#ccc' }}>
                                Explore the heart of the Himalayas with Indian Mountain Rovers! We
                                specialize in crafting bespoke adventure tours, ensuring every journey is unforgettable.
                            </p>

                            {/* Newsletter Signup (Styled for brown theme) */}
                            <div className="mt-4">
                                <h6 className="text-uppercase mb-2 fw-semibold" style={{fontSize: '0.8rem', color: '#fff'}}>Subscribe to our newsletter</h6>
                                <form className="d-flex newsletter-form">
                                    <input
                                        type="email"
                                        placeholder="your@example.com"
                                        className="form-control me-2 newsletter-input"
                                        style={{ backgroundColor: '#4a392e', border: 'none', color: '#fff', borderRadius: '5px' }}
                                    />
                                    <button type="submit" className="btn fw-bold newsletter-btn" style={{backgroundColor: '#25d366', color: '#3b2a1a'}}>Go</button>
                                </form>
                            </div>
                        </div>

                        {/* COL 2: About Company (Desktop 2/12 width) */}
                        <div className="col-lg-2 col-md-6 text-center text-md-start">
                            <h5 className="fw-bold mb-3 footer-heading">QUICK LINKS</h5>
                            <ul className="list-unstyled d-flex flex-column gap-2 footer-links-list">
                                <li><Link to="/" className="footer-link">Home</Link></li>
                                <li><Link to="/about-us" className="footer-link">About Us</Link></li>
                                <li><Link to="/contact-us" className="footer-link">Contact Us</Link></li>
                                {/* <li><Link to="/blog" className="footer-link">Blog</Link></li>
                                <li><Link to="/press" className="footer-link">Press</Link></li> */}
                            </ul>
                        </div>
                        
                        {/* COL 3: Popular Destinations (Desktop 2/12 width) */}
                        <div className="col-lg-2 col-md-6 text-center text-md-start">
                            <h5 className="fw-bold mb-3 footer-heading">POPULAR DESTINATIONS</h5>
                            <ul className="list-unstyled d-flex flex-column gap-2 footer-links-list">
                                {/* DYNAMICALLY MAPPED DATA */}
                                {popularDestinations.map((dest, index) => (
                                    <li key={index}>
                                        <Link to={dest.to} className="footer-link">{dest.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* COL 4: Destination Categories (Desktop 2/12 width) */}
                        <div className="col-lg-2 col-md-6 text-center text-md-start">
                            <h5 className="fw-bold mb-3 footer-heading">CATEGORIES</h5>
                            <ul className="list-unstyled d-flex flex-column gap-2 footer-links-list">
                                {/* Use your actual data */}
                                {tourCategories.map((cat, index) => (
                                    <li key={index}>
                                        <Link to={cat.to} className="footer-link">{cat.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* COL 5: Contact Us (Desktop 3/12 width) */}
                        <div className="col-lg-3 col-md-6 text-center text-md-start">
                            <h5 className="fw-bold mb-3 footer-heading">CONTACT US</h5>
                            
                            {/* Map Link - UPDATED ICON */}
                            <div className="mb-3">
                                <a href="https://maps.app.goo.gl/Z8kWSEmDcCDizEiB6" target="_blank" rel="noopener noreferrer" className="footer-link contact-item" style={{alignItems: 'center'}}>
                                    <i className="fa-solid fa-map-location-dot me-2" style={{color: '#25d366', fontSize: '1.2rem'}}></i> {/* Improved map icon & accent color */}
                                    View on Map
                                </a>
                            </div>

                            {/* Email Support */}
                            <ul className="list-unstyled d-flex flex-column gap-1 mb-3 contact-group">
                                {emailAddresses.map((email, index) => (
                                    <li key={`email-${index}`}>
                                        <a href={`mailto:${email}`} className="footer-link break-all">{email}</a>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Phone Support */}
                            <ul className="list-unstyled d-flex flex-column gap-1 contact-group">
                                {phoneNumbers.map((phone, index) => (
                                    <li key={`phone-${index}`}>
                                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="footer-link">{phone}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    
                    {/* Social Media Icons for the Top Section */}
                    <div className="d-flex justify-content-center justify-content-md-start gap-4 mt-5 pt-3 social-icons-dark-theme" style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)',}}>
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-box"
                                aria-label={link.title}
                            >
                                {/* Note: Added 'fab' prefix here for consistency, though it's not needed for socialLinks array in this implementation */}
                                <i className={`fab ${link.icon} fa-fw`}></i>
                            </a>
                        ))}
                    </div>

                </div>
            </div>

            {/* Bottom Footer Section (Same Background as Top) */}
            <div className="py-4 px-4 px-md-5" style={{ backgroundColor: "#3b2a1a", color: "#fff", borderTop: '1px solid #4a392e' }}>
                <div className="container-fluid mx-auto">
                    {/* --- MODIFIED BOTTOM SECTION LAYOUT (CENTERED) --- */}
                    <div className="text-center">
                        <div className="footer-bottom-left-centered">
                            {/* Policy Links */}
                            <div className="footer-bottom-links-centered">
                                <Link to="/terms-and-conditions" className="footer-policy-link">TERMS & CONDITIONS</Link>
                                <span className="separator">|</span>
                                <Link to="/privacy-policy" className="footer-policy-link">CANCELLATION POLICY</Link>
                                <span className="separator">|</span>
                                <Link to="/payments" className="footer-policy-link">SECURE PAYMENTS</Link>
                            </div>
                            
                            {/* Copyright */}
                            <p className="footer-copyright">
                                © Copyright Indian Mountain Rovers {new Date().getFullYear()}. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                    {/* --- END MODIFIED BOTTOM SECTION --- */}
                </div>
            </div>

            {/* Inline styles for aesthetics and interaction */}
            <style>
                {`
                /* General Link Styles */
                .footer-link, .footer-policy-link {
                    color: #ddd;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    font-size: 0.95rem;
                }
                .footer-link:hover, .footer-policy-link:hover {
                    color: #25d366; /* Accent Green */
                }
                
                .footer-heading {
                    color: #fff;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    padding-bottom: 5px;
                    border-bottom: 2px solid #25d366; /* Accent Green Underline */
                    display: inline-block;
                    margin-bottom: 1.5rem !important;
                    margin-top: 0.5rem !important; /* ADDED VERTICAL SPACING FIX */
                }
                
                /* Social Icons */
                .social-icon-box {
                    width: 40px;
                    height: 40px;
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .social-icon-box:hover {
                    background-color: #25d366;
                    color: #3b2a1a;
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 6px 12px rgba(37, 211, 102, 0.4);
                }
                
                /* Newsletter Input & Button */
                .newsletter-input::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }
                .newsletter-btn:hover {
                    background-color: #1ebe5a !important; /* Slightly darker green on hover */
                }

                /* Contact Section */
                .contact-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                    font-weight: 600;
                    color: #fff !important;
                }
                .contact-group a {
                    font-size: 0.9rem;
                }

                /* --- NEW CENTERED BOTTOM BAR STYLES --- */

                .footer-bottom-left-centered {
                    text-align: center;
                    width: 100%;
                }
                .footer-bottom-links-centered {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 5px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #fff;
                    opacity: 0.9;
                }
                .footer-policy-link {
                    color: #fff;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    margin: 0 5px;
                }
                .footer-policy-link:hover {
                    color: #25d366;
                }
                .separator {
                    margin: 0 5px;
                    color: rgba(255, 255, 255, 0.4);
                }
                .footer-copyright {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin: 0;
                }
                
                /* Responsive Adjustments */
                @media (max-width: 767px) {
                    .social-icons-dark-theme {
                        justify-content: center !important;
                    }
                    .footer-heading {
                        margin-top: 1rem !important; /* Consistent margin on mobile */
                    }
                    .footer-link {
                        font-size: 1rem;
                    }
                    .footer-bottom-links-centered {
                        flex-direction: column;
                        gap: 5px;
                    }
                    .separator {
                        display: none;
                    }
                }

                @media (min-width: 768px) {
                  .justify-content-md-start {
                  justify-content: center !important; 
                  }
}
                `}
            </style>
        </footer>
    );
};

export default Footer;
