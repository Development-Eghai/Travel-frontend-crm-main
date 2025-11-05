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
        departure_city: '', // Kept in state but hidden from UI
        travel_date: '',
        adults: 1, // Default minimum 1 adult
        children: 0,
        infants: 0, 
        hotel_category: '',
        full_name: '',
        contact_number: '',
        email: '',
        additional_comments: '' // Kept in state but hidden from UI
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
            return <i className="fa-solid fa-file-contract text-primary me-2" style={{ marginTop: '3px', fontSize: '18px', color: '#3b2a1a' }}></i>;
        } else if (lowerTitle.includes('cancel') || lowerTitle.includes('privacy')) {
            return <i className="fa-solid fa-ban text-danger me-2" style={{ marginTop: '3px', fontSize: '18px', color: '#dc3545' }}></i>;
        } else if (lowerTitle.includes('payment')) {
            return <i className="fa-solid fa-credit-card text-success me-2" style={{ marginTop: '3px', fontSize: '18px', color: '#25d366' }}></i>;
        } else {
            return <i className="fa-solid fa-circle-info text-info me-2" style={{ marginTop: '3px', fontSize: '18px', color: '#17a2b8' }}></i>;
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

    // --- NEW: Stepper functions ---
    const handleStepper = (field, increment) => {
        setEnquiryFormData(prev => {
            let newValue = prev[field] + increment;
            
            if (field === 'adults') {
                newValue = Math.max(1, newValue); // Adults minimum 1
            } else if (field === 'children') {
                newValue = Math.max(0, newValue); // Children minimum 0
            }

            return {
                ...prev,
                [field]: newValue,
            };
        });
    };
    // ------------------------------

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
    }, [id])

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
            destination: specificTourData.title, 
            departure_city: enquiryFormData.departure_city || "N/A", 
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
                                        {/* Tour Title and Overview removed from banner */}
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
                                
                                {/* Tour Title here */}
                                <h2 className='trip-detail-heading'>{specificTourData?.title}</h2>
                                {/* Tour Short Description/Tagline below the main title */}
                                <p className='lead' style={{color: '#495057', fontSize: '18px', marginBottom: '30px'}}>{specificTourData?.short_description}</p>


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
                                            
                                            {/* --- 1. Travel To (Destination) - Read Only with Icon --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>TRAVEL TO (DESTINATION)</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-plane-departure input-icon"></i>
                                                    <input
                                                        type='text'
                                                        name='destination_display'
                                                        value={specificTourData?.title || 'Loading...'}
                                                        readOnly 
                                                        className="form-control-plaintext"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* --- 2. Travel From (Departure City) - HIDDEN --- */}
                                            <input
                                                type='hidden'
                                                name='departure_city'
                                                value={enquiryFormData.departure_city}
                                                onChange={handleEnquiryChange}
                                            />
                                            
                                           
                                            {/* --- 3. Travel Date and Hotel Category - COMBINED IN ONE LINE --- */}
                                            <div className='trip-combined-line-group d-flex' style={{ gap: '10px' }}>
                                                {/* Travel Date */}
                                                <div className='trip-detail-contact-input flex-grow-1 date-category-item' style={{ flexBasis: '50%' }}>
                                                    <label>TRAVEL DATE *</label>
                                                    <div className='input-with-icon-wrapper'>
                                                        <i className="fa-solid fa-calendar-day input-icon"></i>
                                                        <input
                                                            type='date'
                                                            name='travel_date'
                                                            value={enquiryFormData.travel_date}
                                                            onChange={handleEnquiryChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                {/* Hotel Category */}
                                                <div className='trip-detail-contact-input flex-grow-1 date-category-item' style={{ flexBasis: '50%' }}>
                                                    <div className='admin-input-div mt-0'>
                                                        <label>HOTEL CATEGORY</label>
                                                        <div className='input-with-icon-wrapper'>
                                                            <i className="fa-solid fa-hotel input-icon"></i>
                                                            <select
                                                                name="hotel_category"
                                                                value={enquiryFormData.hotel_category}
                                                                onChange={handleEnquiryChange}
                                                            >
                                                                <option value="">Select Category</option>
                                                                <option value="Five Star">⭐⭐⭐⭐⭐</option>
                                                                <option value="Four Star">⭐⭐⭐⭐</option>
                                                                <option value="Three Star">⭐⭐⭐</option>
                                                                <option value="Budget">Budget</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* --- 4. Adults and Children - COMBINED IN ONE LINE --- */}
                                            <div className='trip-combined-line-group d-flex' style={{ gap: '10px' }}>
                                                {/* No. of Adults */}
                                                <div className='trip-detail-contact-input flex-grow-1 stepper-item' style={{ flexBasis: '50%' }}>
                                                    <label>ADULTS *</label>
                                                    <div className='input-stepper-wrapper'>
                                                        <input
                                                            type='number'
                                                            name='adults'
                                                            value={enquiryFormData.adults}
                                                            onChange={handleEnquiryChange}
                                                            min='1'
                                                            placeholder='1'
                                                            required
                                                            readOnly
                                                        />
                                                        <div className='stepper-controls'>
                                                            <button type='button' onClick={() => handleStepper('adults', 1)} className='stepper-up'><i className="fa-solid fa-caret-up"></i></button>
                                                            <button type='button' onClick={() => handleStepper('adults', -1)} className='stepper-down'><i className="fa-solid fa-caret-down"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* No. of Children */}
                                                <div className='trip-detail-contact-input flex-grow-1 stepper-item' style={{ flexBasis: '50%' }}>
                                                    <label>CHILDREN</label>
                                                    <div className='input-stepper-wrapper'>
                                                        <input
                                                            type='number'
                                                            name='children'
                                                            value={enquiryFormData.children}
                                                            onChange={handleEnquiryChange}
                                                            min='0'
                                                            placeholder='0'
                                                            readOnly
                                                        />
                                                        <div className='stepper-controls'>
                                                            <button type='button' onClick={() => handleStepper('children', 1)} className='stepper-up'><i className="fa-solid fa-caret-up"></i></button>
                                                            <button type='button' onClick={() => handleStepper('children', -1)} className='stepper-down'><i className="fa-solid fa-caret-down"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* --- 5. Full Name --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>FULL NAME *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-user input-icon"></i>
                                                    <input
                                                        type='text'
                                                        name='full_name'
                                                        value={enquiryFormData.full_name}
                                                        onChange={handleEnquiryChange}
                                                        placeholder='e.g. John Doe'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* --- 6. Email --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>EMAIL *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-envelope input-icon"></i>
                                                    <input
                                                        type='email'
                                                        name='email'
                                                        value={enquiryFormData.email}
                                                        onChange={handleEnquiryChange}
                                                        placeholder='e.g. JohnDoe@gmail.com'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* --- 7. Contact Number --- */}
                                            <div className='trip-detail-contact-input'>
                                                <label>CONTACT NUMBER *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-phone input-icon"></i>
                                                    <input
                                                        type='tel'
                                                        name='contact_number'
                                                        value={enquiryFormData.contact_number}
                                                        onChange={handleEnquiryChange}
                                                        placeholder='e.g. 1234567890'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* --- 8. Additional Comments - HIDDEN --- */}
                                            <input
                                                type='hidden'
                                                name='additional_comments'
                                                value={enquiryFormData.additional_comments}
                                                onChange={handleEnquiryChange} 
                                            />
                                            
                                            <button type='submit' disabled={isSubmitting}>
                                                SUBMIT ENQUIRY
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