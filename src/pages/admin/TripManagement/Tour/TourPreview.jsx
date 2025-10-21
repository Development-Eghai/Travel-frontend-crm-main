import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Images } from "../../../../helpers/Images/images";
import { useNavigate, useParams } from "react-router";
import { TourPreviewDetails } from '../../../../common/api/ApiService';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';
import { APIBaseUrl } from '../../../../common/api/api';
import TripCard from '../../../../component/TripCard';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import './TourPreview.css';

const TourPreview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [specificTourData, setSpecificTourData] = useState()
    const [isFixedPackage, setIsFixedPackage] = useState(false)
    const [showReadMore, setShowReadMore] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [tripList, setTripList] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- NEW: Enquiry Form State ---
    const [enquiryFormData, setEnquiryFormData] = useState({
        departure_city: '',
        travel_date: '',
        adults: 1, // Default minimum 1 adult
        children: 0,
        infants: 0,
        hotel_category: '',
        full_name: '',
        contact_number: '',
        email: '',
        additional_comments: ''
    })
    // -------------------------------


    const TripTab = [
        {
            id: 1,
            title: "Overview"
        },
        {
            id: 2,
            title: "Itinerary"
        },
        {
            id: 3,
            title: "Inclusion"
        },
        {
            id: 4,
            title: "Exclusion"
        },
        {
            id: 5,
            title: "Highlights"
        },]

    const itineraryRef = useRef(null);
    const inclusionRef = useRef(null);
    const exclusionRef = useRef(null);
    const highlightsRef = useRef(null);
    const overviewRef = useRef(null);

    const scrollToSection = (id) => {
        setActiveTab(id);
        let ref = null;
        switch (id) {
            case 1:
                ref = overviewRef;
                break;
            case 2:
                ref = itineraryRef;
                break;
            case 3:
                ref = inclusionRef;
                break;
            case 4:
                ref = exclusionRef;
                break;
            case 5:
                ref = highlightsRef;
                break;
            default:
                break;
        }

        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Helper function to parse and split inclusions/exclusions
    const parseListItems = (htmlString) => {
        if (!htmlString) return [];

        // Remove HTML tags
        const text = htmlString.replace(/<[^>]*>/g, '');

        // Split by semicolon and filter out empty items
        return text.split(';').map(item => item.trim()).filter(item => item.length > 0);
    };

    // Helper function to parse policy content by full stops
    const parsePolicyItems = (content) => {
        if (!content) return [];

        // Remove HTML tags if any
        const text = content.replace(/<[^>]*>/g, '');

        // Split by full stop (period) and filter out empty items
        return text.split('.').map(item => item.trim()).filter(item => item.length > 0);
    };

    // Helper function to get icon for policy type
    const getPolicyIcon = (title) => {
        const lowerTitle = title.toLowerCase();

        if (lowerTitle.includes('terms') || lowerTitle.includes('condition')) {
            return <i className="fa-solid fa-file-contract text-primary me-2" style={{ marginTop: '3px', fontSize: '18px' }}></i>;
        } else if (lowerTitle.includes('cancel') || lowerTitle.includes('privacy')) {
            return <i className="fa-solid fa-ban text-danger me-2" style={{ marginTop: '3px', fontSize: '18px' }}></i>;
        } else if (lowerTitle.includes('payment')) {
            return <i className="fa-solid fa-credit-card text-success me-2" style={{ marginTop: '3px', fontSize: '18px' }}></i>;
        } else {
            return <i className="fa-solid fa-circle-info text-info me-2" style={{ marginTop: '3px', fontSize: '18px' }}></i>;
        }
    };

    // Helper function to format policy title
    const formatPolicyTitle = (title) => {
        if (!title) return title;

        // Replace "Privacy Policy" with "Cancellation Policy"
        if (title.toLowerCase().includes('privacy')) {
            return 'Cancellation Policy';
        }

        // Replace "Payment Terms" remains as is but can be customized
        if (title.toLowerCase().includes('payment')) {
            return 'Payment Terms';
        }

        return title;
    };


    const getSpecificTour = async () => {
        try {
            const res = await APIBaseUrl.get(`trips/${id}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true && res?.data?.error_code === 0) {
                setSpecificTourData(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    }

    const getAlltrip = async () => {
        try {
            const res = await APIBaseUrl.get("trips", {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true && res?.data?.error_code === 0) {
                setTripList(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching trips:", error?.response?.data || error.message);
            throw error;
        }
    };


    const handlePreview = (id) => {
        const url = `/booking/${specificTourData?.slug}/${id}`;
        window.location.href = url;
    };

    useEffect(() => {
        getSpecificTour()
        getAlltrip()
    }, [])


    const [visibleCount, setVisibleCount] = useState(4);

    const handleToggle = () => {
        if (visibleCount >= tripList.length) {
            setVisibleCount(4);
        } else {
            setVisibleCount((prev) => prev + 4);
        }
    };

    const [expandedSections, setExpandedSections] = useState({});

    const toggleViewMore = (index) => {
        setExpandedSections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // --- NEW: Enquiry Form Handlers ---
    const handleEnquiryChange = (e) => {
        const { name, value, type } = e.target;
        setEnquiryFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value,
        }));
    };

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!enquiryFormData.full_name || !enquiryFormData.email || !enquiryFormData.contact_number || !enquiryFormData.travel_date) {
            errorMsg("Please fill in Full Name, Email, Contact Number, and Travel Date.");
            return;
        }

        if (!specificTourData?.title) {
            errorMsg("Tour details are not loaded. Cannot submit enquiry.");
            return;
        }

        const payload = {
            destination: specificTourData.title, // Auto-filled from trip data (This is "Travel To")
            departure_city: enquiryFormData.departure_city || "N/A", // This is "Travel From"
            travel_date: enquiryFormData.travel_date,
            adults: enquiryFormData.adults || 1, 
            children: enquiryFormData.children || 0,
            infants: enquiryFormData.infants || 0,
            hotel_category: enquiryFormData.hotel_category || "N/A",
            full_name: enquiryFormData.full_name,
            contact_number: enquiryFormData.contact_number,
            email: enquiryFormData.email,
            additional_comments: enquiryFormData.additional_comments || ""
        };

        setIsSubmitting(true);
        try {
            // CORRECTED FIX: Only using the endpoint path, assuming APIBaseUrl is configured with the base prefix, and maintaining the trailing slash.
            // This fixes the "Not Found" error caused by double-prefixing.
            const res = await APIBaseUrl.post(`https://api.yaadigo.com/public/api/enquires/`, payload, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });

            if (res?.data?.success === true) {
                successMsg("Your enquiry has been submitted successfully! We will contact you soon.");
                // Reset form
                setEnquiryFormData({
                    departure_city: '',
                    travel_date: '',
                    adults: 1,
                    children: 0,
                    infants: 0,
                    hotel_category: '',
                    full_name: '',
                    contact_number: '',
                    email: '',
                    additional_comments: ''
                });
            } else {
                errorMsg(res?.data?.message || "Failed to submit enquiry. Please try again.");
            }

        } catch (error) {
            console.error("Enquiry submission error:", error?.response?.data || error.message);
            // Display a more specific error message based on the API response structure if available
            const apiError = error?.response?.data?.detail || error?.response?.data?.message;
            errorMsg(apiError || "An error occurred during submission. Please check your network and API configuration.");
        } finally {
            setIsSubmitting(false);
        }
    };
    // ------------------------------------

    return (
        <div className='overflow-hidden-page'>

            <section className="destination-detail-banner-main">
                {specificTourData?.gallery_images?.length > 0 && (
                    <Swiper
                        modules={[EffectFade, Autoplay, Navigation]}
                        navigation={true}
                        effect="fade"
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="destination-swiper"
                    >
                        {specificTourData?.gallery_images?.map((imageUrl, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="destination-slide swiper-slider-banners"
                                    style={{
                                        backgroundImage: `url(${encodeURI(imageUrl)})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="destination-overlay"></div>
                                    <div className="destination-slide-content">
                                        <h3 className="dest-package-name text-center">
                                            {specificTourData?.title}
                                        </h3>
                                        <p className="dest-package-para">
                                            {specificTourData?.overview}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </section>
          
            <div className='trip-detail-content-main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='trip-detail-left'>
                                <h2 className='trip-detail-heading'>{specificTourData?.short_description}</h2>

                                <div className='d-flex trip-pickup-parent'>
                                    <div className='trip-pickup-drop me-lg-4 me-0'>
                                        <div>
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p>Pickup & Drop</p>
                                            <h3>{specificTourData?.pickup_location} - {specificTourData?.drop_location}</h3>
                                        </div>
                                    </div>
                                    <div className='trip-pickup-drop mt-lg-0 mt-3'>
                                        <div>
                                            <i className="fa-solid fa-clock"></i>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p>Duration </p>
                                            <h3>{specificTourData?.days}D - {specificTourData?.nights}N</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className='trip-detail-tabs-main'>
                                    {TripTab.map((item, index) => (
                                        <div className={`tip-detail-tabs ${activeTab === item.id ? 'active' : ''}`} key={index}
                                            onClick={() => scrollToSection(item.id)}>
                                            <p>{item.title}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className='trip-detail-section' ref={overviewRef}>
                                    <h3>Overview & Highlights</h3>
                                    <div className={showReadMore ? "trip-detail-overview-more" : 'trip-detail-overview'}>
                                        <div>
                                            <p dangerouslySetInnerHTML={{ __html: specificTourData?.overview || "<p>No description available</p>" }}></p>
                                        </div>
                                    </div>
                                    <p className='read-more' onClick={() => setShowReadMore(!showReadMore)}>{showReadMore ? "Read Less" : "Read More"}</p>
                                </div>

                                <div className='trip-detail-section' ref={itineraryRef}>
                                    <h3>Itinerary</h3>
                                    <div className="container">
                                        <div className='trip-detail-faqs mt-4'>
                                            <div className="accordion" id="accordionExample">
                                                {specificTourData?.itinerary?.map((item, index) => (
                                                    <div className="accordion-item" key={index}>
                                                        <h2 className="accordion-header" id={`day_wise_itenary${index}`}>
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                data-bs-target={`#itenarys${index}`} aria-expanded={index === 0 ? 'true' : 'false'}
                                                                aria-controls={`itenarys${index}`}>
                                                                <p className='trip-faq-accordion'>Day {index + 1}</p>  {item?.title}
                                                            </button>
                                                        </h2>
                                                        <div id={`itenarys${index}`}
                                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                            aria-labelledby={`day_wise_itenary${index}`}
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <p>{item?.description}</p>

                                                                {item?.activities && item?.activities.length > 0 && (
                                                                    <>
                                                                        <p className='mt-3 fw-bold'>Activity : </p>
                                                                        <ul>
                                                                            {item?.activities?.map((activity, idx) => (
                                                                                <li key={idx}>{activity}</li>))}
                                                                        </ul>
                                                                    </>
                                                                )}

                                                                {item?.hotel_name && item?.hotel_name !== "" && (
                                                                    <>
                                                                        <p className='mt-3'><span className='fw-bold'>Hotel Name :</span> {item?.hotel_name}</p>
                                                                    </>
                                                                )}

                                                                {item?.meal_plan && item?.meal_plan.length > 0 && (
                                                                    <>
                                                                        <p className='mt-3 fw-bold'>Meal Plan : </p>
                                                                        <ul>
                                                                            {item?.meal_plan?.map((meal, idx) => (
                                                                                <li key={idx}>{meal}</li>))}
                                                                        </ul>
                                                                    </>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                

                                <div className='trip-detail-section inclusion' ref={inclusionRef}>
                                    <h3>Inclusions</h3>

                                    <div className='mt-4'>
                                        <ul className='inclusion-exclusion-list' style={{ listStyle: 'none', paddingLeft: 0 }}>
                                            {parseListItems(specificTourData?.inclusions).map((item, index) => (
                                                <li key={index} className='inclusion-item' style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                    <i className="fa-solid fa-circle-check text-success me-2" style={{ marginTop: '3px', fontSize: '18px' }}></i>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {parseListItems(specificTourData?.inclusions).length === 0 && (
                                            <p>No inclusions available</p>
                                        )}
                                    </div>

                                </div>

                                <div className='trip-detail-section' ref={exclusionRef}>
                                    <h3>Exclusions</h3>
                                    <div className='mt-4'>
                                        <ul className='inclusion-exclusion-list' style={{ listStyle: 'none', paddingLeft: 0 }}>
                                            {parseListItems(specificTourData?.exclusions).map((item, index) => (
                                                <li key={index} className='exclusion-item' style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                    <i className="fa-solid fa-circle-xmark text-danger me-2" style={{ marginTop: '3px', fontSize: '18px' }}></i>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {parseListItems(specificTourData?.exclusions).length === 0 && (
                                            <p>No exclusions available</p>
                                        )}
                                    </div>
                                </div>

                                <div className='trip-detail-section' ref={highlightsRef}>
                                    <h3>Key Highlights</h3>
                                    <div className='mt-4'>
                                        <ul className='inclusion-exclusion-list' style={{ listStyle: 'none', paddingLeft: 0 }}>
                                            {parseListItems(specificTourData?.highlights).map((item, index) => (
                                                <li key={index} className='highlight-item' style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                    <i className="fa-solid fa-star text-warning me-2" style={{ marginTop: '3px', fontSize: '18px' }}></i>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {parseListItems(specificTourData?.highlights).length === 0 && (
                                            <p>No highlights available</p>
                                        )}
                                    </div>
                                </div>

                                <div className='trip-detail-section'>
                                    <h3>Policies</h3>
                                    <div className='mt-4'>
                                        {specificTourData?.policies?.map((policy, policyIndex) => {
                                            const policyItems = parsePolicyItems(policy?.content);
                                            const formattedTitle = formatPolicyTitle(policy?.title);

                                            return (
                                                <div key={policyIndex} className='mb-5'>
                                                    <h5 className='fw-bold mb-3' style={{ color: '#2c3e50', fontSize: '18px' }}>
                                                        {formattedTitle}
                                                    </h5>

                                                    {policyItems.length > 0 ? (
                                                        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                                            {policyItems.map((item, itemIndex) => (
                                                                <li
                                                                    key={itemIndex}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'flex-start',
                                                                        marginBottom: '12px',
                                                                        lineHeight: '1.6'
                                                                    }}
                                                                >
                                                                    {getPolicyIcon(policy?.title)}
                                                                    <span>{item}.</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                                                            No {formattedTitle.toLowerCase()} available
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        {(!specificTourData?.policies || specificTourData?.policies.length === 0) && (
                                            <p style={{ color: '#6c757d', fontStyle: 'italic' }}>No policies available</p>
                                        )}
                                    </div>
                                </div>
                                    {/* FAQ Section */}

                                    {specificTourData?.faqs && specificTourData?.faqs.length > 0 && (
                                    <div className='trip-detail-section'>
                                        <h3>Frequently Asked Questions</h3>
                                        <div className="container">
                                            <div className='trip-detail-faqs mt-4'>
                                                <div className="accordion" id="accordionFAQ">
                                                    {specificTourData?.faqs?.map((item, index) => (
                                                        <div className="accordion-item" key={index}>
                                                            <h2 className="accordion-header" id={`faq_header${index}`}>
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target={`#faq${index}`} aria-expanded={index === 0 ? 'true' : 'false'}
                                                                    aria-controls={`faq${index}`}>
                                                                    <p>{item?.question}</p>
                                                                </button>
                                                            </h2>
                                                            <div id={`faq${index}`}
                                                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                                aria-labelledby={`faq_header${index}`}
                                                                data-bs-parent="#accordionFAQ">
                                                                <div className="accordion-body">
                                                                    <p>{item?.answer}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='col-lg-4'>
                            <div className='trip-detail-right'>
                                <div className='trip-detail-price-card'>
                                    <p className='mb-1'>Starting from</p>

                                    <div className='d-flex'>
                                        <p className='trip-price'>
                                            ₹

                                            {specificTourData?.pricing?.pricing_model === "fixed_departure" ? specificTourData?.pricing?.fixed_departure[0]?.final_price :
                                                specificTourData?.pricing?.customized?.final_price}

                                            /-</p>
                                        <p className='trip-price-per'>Per Person</p>
                                    </div>

                                    {/* <button >Dates & Pricing</button> */}

                                </div>
                            </div>

                            <div className='trip-detail-right'>
                                {!isFixedPackage && (
                                    <form className='trip-detail-contact-form' onSubmit={handleEnquirySubmit}>
                                        <div className='trip-detail-contact-form-head'>
                                            <p className='head-1'>Enquiry Now !</p>
                                            <p className='head-2'>Allow Us to Call You Back!</p>
                                        </div>

                                        <div className='trip-detail-contact-input-container'>
                                            
                                            {/* --- 1. Travel To (Destination) --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>Travel To (Destination)</label>
                                                <input
                                                    type='text'
                                                    name='destination_display'
                                                    value={specificTourData?.title || 'Loading...'}
                                                    readOnly // The destination is the tour title, so it should not be editable
                                                    className="form-control-plaintext"
                                                    style={{ fontWeight: 'bold' }}
                                                />
                                            </div>
                                            {/* ---------------------------------- */}
                                            
                                            {/* --- 2. Travel From (Departure City) --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>Travel From (Departure City)</label>
                                                <input
                                                    type='text'
                                                    name='departure_city'
                                                    value={enquiryFormData.departure_city}
                                                    onChange={handleEnquiryChange}
                                                    placeholder='eg. Delhi, Mumbai'
                                                />
                                            </div>
                                            
                                           

                                            {/* --- 6. Travel Date --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>Travel Date *</label>
                                                <input
                                                    type='date'
                                                    name='travel_date'
                                                    value={enquiryFormData.travel_date}
                                                    onChange={handleEnquiryChange}
                                                    required
                                                />
                                            </div>


                                            {/* --- 7. No. of Adults --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>No. of Adults *</label>
                                                <input
                                                    type='number'
                                                    name='adults'
                                                    value={enquiryFormData.adults}
                                                    onChange={handleEnquiryChange}
                                                    min='1'
                                                    placeholder='eg. 2'
                                                    required
                                                />
                                            </div>

                                            {/* --- 8. No. of Children --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>No. of Children</label>
                                                <input
                                                    type='number'
                                                    name='children'
                                                    value={enquiryFormData.children}
                                                    onChange={handleEnquiryChange}
                                                    min='0'
                                                    placeholder='eg. 0'
                                                />
                                            </div>

                                            {/* --- 9. No. of Infants ---
                                            <div className='trip-detail-contact-input'>
                                                <label>No. of Infants</label>
                                                <input
                                                    type='number'
                                                    name='infants'
                                                    value={enquiryFormData.infants}
                                                    onChange={handleEnquiryChange}
                                                    min='0'
                                                    placeholder='eg. 0'
                                                />
                                            </div> */}

                                            {/* --- 10. Hotel Category --- */}
                                            <div className='trip-detail-contact-input'>
                                                <div className='admin-input-div mt-0'>
                                                    <label>Hotel Category</label>
                                                    <select
                                                        name="hotel_category"
                                                        value={enquiryFormData.hotel_category}
                                                        onChange={handleEnquiryChange}
                                                    >
                                                        <option value="">Select Hotel Category</option>
                                                        <option value="Five Star">⭐⭐⭐⭐⭐ (Five Star)</option>
                                                        <option value="Four Star">⭐⭐⭐⭐ (Four Star)</option>
                                                        <option value="Three Star">⭐⭐⭐ (Three Star)</option>
                                                        <option value="Two Star">⭐⭐ (Two Star)</option>
                                                        <option value="Budget">Budget</option>
                                                    </select>
                                                </div>
                                            </div>
                                                 {/* --- 3. Full Name --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>Full Name *</label>
                                                <input
                                                    type='text'
                                                    name='full_name'
                                                    value={enquiryFormData.full_name}
                                                    onChange={handleEnquiryChange}
                                                    placeholder='eg. John Doe'
                                                    required
                                                />
                                            </div>

                                            {/* --- 4. Email --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>Email *</label>
                                                <input
                                                    type='email'
                                                    name='email'
                                                    value={enquiryFormData.email}
                                                    onChange={handleEnquiryChange}
                                                    placeholder='eg. JohnDoe@gmail.com'
                                                    required
                                                />
                                            </div>

                                            {/* --- 5. Contact Number --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>Contact Number *</label>
                                                <input
                                                    type='tel'
                                                    name='contact_number'
                                                    value={enquiryFormData.contact_number}
                                                    onChange={handleEnquiryChange}
                                                    placeholder='eg. 1234567890'
                                                    required
                                                />
                                            </div>
                                            {/* --- 11. Additional Comments --- */}
                                            <div className='trip-detail-contact-input'>
                                                <div className='admin-input-div mt-0'>
                                                    <label>Additional Comments</label>
                                                    <textarea
                                                        name='additional_comments'
                                                        value={enquiryFormData.additional_comments}
                                                        onChange={handleEnquiryChange}
                                                        placeholder='Write any message or special requests here...'
                                                        style={{ height: "100px" }}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <button type='submit' disabled={isSubmitting}>
                                                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>

                        </div>

                        <section className="section-padding">
                            <div className="container">
                                <div>
                                    <h4 className="common-section-heading">
                                        Related Trip Packages
                                    </h4>
                                </div>

                                <div className="mt-4">
                                    <div className="row">
                                        {tripList?.slice(0, visibleCount).map((trip, index) => (
                                            <div className="col-lg-3 col-md-6" key={index}>
                                                <TripCard trip={trip} />
                                            </div>
                                        ))}

                                        {tripList.length > 4 && (
                                            <div className="destination-viewall-main d-flex justify-content-center mt-4">
                                                <button className="destination-viewall" onClick={handleToggle}>
                                                    {visibleCount >= tripList.length ? "Show Less" : "Show More"}
                                                    <i
                                                        className={`fa-solid ms-2 ${visibleCount >= tripList.length ? "fa-arrow-up" : "fa-arrow-right"
                                                            }`}
                                                    ></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourPreview