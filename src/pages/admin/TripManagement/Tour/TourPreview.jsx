import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { useNavigate, useParams } from "react-router";
import { APIBaseUrl } from '../../../../common/api/api'; 
import TripCard from '../../../../component/TripCard';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import './TourPreview.css';
import axios from 'axios'; 

// Define API constants as per requirements
const DOMAIN_NAME = "https://www.indianmountainrovers.com";
const API_KEY = "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M"; // Used for all API calls
const ENQUIRY_ENDPOINT = "https://api.yaadigo.com/secure/api/enquires/";
const BOOKING_REQUEST_ENDPOINT = "https://api.yaadigo.com/secure/api/booking_request/";


const TourPreview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [specificTourData, setSpecificTourData] = useState()
    const [showReadMore, setShowReadMore] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [tripList, setTripList] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Customized Package Form State
    const [customizedFormData, setCustomizedFormData] = useState({
        travel_date: '',
        adults: 1,
        children: 0,
        infants: 0,
        hotel_category: '',
        full_name: '',
        contact_number: '',
        email: '',
        departure_city: '', // <-- NEW FIELD ADDED
    })

    // Fixed Departure Form State
    const [fixedDepartureFormData, setFixedDepartureFormData] = useState({
        departure_date_id: '', // Will store the selected fixed_departure slot index
        sharing_option_id: '', // Will store the selected costing package index
        adults: 1,
        children: 0,
        full_name: '',
        contact_number: '', // Mapped to phone_number for API
        email: '',
    })

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

    const parseListItems = (htmlString) => {
        if (!htmlString) return [];
        const text = htmlString.replace(/<[^>]*>/g, '');
        return text.split(';').map(item => item.trim()).filter(item => item.length > 0);
    };

    const parsePolicyItems = (content) => {
        if (!content) return [];
        const text = content.replace(/<[^>]*>/g, '');
        return text.split('.').map(item => item.trim()).filter(item => item.length > 0);
    };

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

    const formatPolicyTitle = (title) => {
        if (!title) return title;
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('cancellation') || lowerTitle.includes('privacy')) {
            return 'Cancellation Policy';
        }
        if (lowerTitle.includes('payment')) {
            return 'Payment Terms';
        }
        return title;
    };

    // Customized Package Stepper
    const handleCustomizedStepper = (field, increment) => {
        setCustomizedFormData(prev => {
            let newValue = prev[field] + increment;

            if (field === 'adults') {
                newValue = Math.max(1, newValue);
            } else if (field === 'children' || field === 'infants') {
                newValue = Math.max(0, newValue);
            }

            return {
                ...prev,
                [field]: newValue,
            };
        });
    };

    // Fixed Departure Stepper
    const handleFixedDepartureStepper = (field, increment) => {
        setFixedDepartureFormData(prev => {
            let newValue = prev[field] + increment;

            if (field === 'adults') {
                newValue = Math.max(1, newValue);
            } else if (field === 'children') {
                newValue = Math.max(0, newValue);
            }

            return {
                ...prev,
                [field]: newValue,
            };
        });
    };

    const getSpecificTour = async () => {
        try {
            const res = await APIBaseUrl.get(`trips/${id}`, {
                headers: {
                    "x-api-key": API_KEY,
                },
            });
            if (res?.data?.success === true && res?.data?.error_code === 0) {
                setSpecificTourData(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching specific tour:", error?.response?.data || error.message);
        }
    }

    const getAlltrip = async () => {
        try {
            const res = await APIBaseUrl.get("trips", {
                headers: {
                    "x-api-key": API_KEY,
                },
            });
            if (res?.data?.success === true && res?.data?.error_code === 0) {
                setTripList(res?.data?.data)
            }

        } catch (error) {
            console.error("Error fetching all trips:", error?.response?.data || error.message);
        }
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

    // Customized Package Form Handlers
    const handleCustomizedChange = (e) => {
        const { name, value, type } = e.target;
        setCustomizedFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value,
        }));
    };

    // UPDATED CUSTOMIZED SUBMISSION
    const handleCustomizedSubmit = async (e) => {
        e.preventDefault();

        if (!customizedFormData.full_name || !customizedFormData.email || !customizedFormData.contact_number || !customizedFormData.travel_date) {
            errorMsg("Please fill in Full Name, Email, Contact Number, and Travel Date.");
            return;
        }
        
        // Added required validation for departure_city
        if (!customizedFormData.departure_city) {
            errorMsg("Please fill in your Departure City.");
            return;
        }

        if (!specificTourData?.title) {
            errorMsg("Tour details are not loaded. Cannot submit enquiry.");
            return;
        }

        const payload = {
            destination: specificTourData.title,
            departure_city: customizedFormData.departure_city, // <-- USING NEW STATE VALUE
            travel_date: customizedFormData.travel_date,
            adults: customizedFormData.adults || 1,
            children: customizedFormData.children || 0,
            infants: customizedFormData.infants || 0,
            hotel_category: customizedFormData.hotel_category || "N/A",
            full_name: customizedFormData.full_name,
            contact_number: customizedFormData.contact_number,
            email: customizedFormData.email,
            additional_comments: "",
            domain_name: DOMAIN_NAME 
        };

        setIsSubmitting(true);
        try {
            const res = await axios.post(ENQUIRY_ENDPOINT, payload, { 
                headers: {
                    "x-api-key": API_KEY,
                },
            });

            if (res?.data?.success === true) {
                successMsg("Your enquiry has been submitted successfully! We will contact you soon.");
                setCustomizedFormData({
                    travel_date: '',
                    adults: 1,
                    children: 0,
                    infants: 0,
                    hotel_category: '',
                    full_name: '',
                    contact_number: '',
                    email: '',
                    departure_city: '', // <-- RESET NEW FIELD
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

    // Fixed Departure Form Handlers
    const handleFixedDepartureChange = (e) => {
        const { name, value, type } = e.target;
        setFixedDepartureFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value,
        }));
    };

    // FIXED DEPARTURE SUBMISSION
    const handleFixedDepartureSubmit = async (e) => {
        e.preventDefault();

        if (!fixedDepartureFormData.departure_date_id || !fixedDepartureFormData.sharing_option_id) {
            errorMsg("Please select Departure Date and Sharing Option.");
            return;
        }

        if (!fixedDepartureFormData.full_name || !fixedDepartureFormData.email || !fixedDepartureFormData.contact_number) {
            errorMsg("Please fill in Full Name, Email, and Phone Number.");
            return;
        }

        if (!specificTourData?.title) {
            errorMsg("Tour details are not loaded. Cannot submit booking request.");
            return;
        }

        // Get selected departure and package details
        const departureIndex = parseInt(fixedDepartureFormData.departure_date_id, 10);
        const packageIndex = parseInt(fixedDepartureFormData.sharing_option_id, 10);
        
        // Safety check for indices
        const selectedDeparture = specificTourData.pricing.fixed_departure[departureIndex];
        const selectedPackage = selectedDeparture?.costingPackages[packageIndex];

        if (!selectedDeparture || !selectedPackage) {
             errorMsg("Selected departure or sharing option details are missing. Cannot proceed.");
             return;
        }


        const pricePerPerson = selectedPackage.final_price;
        const totalTravelers = fixedDepartureFormData.adults + fixedDepartureFormData.children;
        const estimatedTotalPrice = pricePerPerson * totalTravelers;

        // API Payload structure for Booking Request
        const payload = {
            departure_date: selectedDeparture.from_date, 
            sharing_option: selectedPackage.title,
            price_per_person: pricePerPerson,
            adults: fixedDepartureFormData.adults || 1,
            children: fixedDepartureFormData.children || 0,
            estimated_total_price: estimatedTotalPrice,
            full_name: fixedDepartureFormData.full_name,
            email: fixedDepartureFormData.email,
            phone_number: fixedDepartureFormData.contact_number, // Mapped from contact_number state
            domain_name: DOMAIN_NAME 
        };

        setIsSubmitting(true);
        try {
            const res = await axios.post(BOOKING_REQUEST_ENDPOINT, payload, { 
                headers: {
                    "x-api-key": API_KEY,
                },
            });

            if (res?.data?.success === true) {
                successMsg("Your booking request has been submitted successfully! We will contact you soon.");
                setFixedDepartureFormData({
                    departure_date_id: '',
                    sharing_option_id: '',
                    adults: 1,
                    children: 0,
                    full_name: '',
                    contact_number: '',
                    email: '',
                });
            } else {
                errorMsg(res?.data?.message || "Failed to submit booking request. Please try again.");
            }

        } catch (error) {
            console.error("Booking submission error:", error?.response?.data || error.message);
            const apiError = error?.response?.data?.detail || error?.response?.data?.message;
            errorMsg(apiError || "An error occurred during submission. Please check your network and API configuration.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Check pricing model
    const isFixedDeparture = specificTourData?.pricing?.pricing_model === "fixed_departure";

    // Utility for total price calculation in display
    const getFixedDepartureTotalPrice = () => {
        const departureIndex = parseInt(fixedDepartureFormData.departure_date_id, 10);
        const packageIndex = parseInt(fixedDepartureFormData.sharing_option_id, 10);

        if (
            fixedDepartureFormData.departure_date_id === '' || 
            fixedDepartureFormData.sharing_option_id === '' || 
            !specificTourData?.pricing?.fixed_departure?.[departureIndex]?.costingPackages?.[packageIndex]
        ) {
            return null;
        }

        const pricePerPerson = specificTourData.pricing.fixed_departure[departureIndex].costingPackages[packageIndex].final_price;
        const totalTravelers = fixedDepartureFormData.adults + fixedDepartureFormData.children;
        return (pricePerPerson * totalTravelers).toLocaleString('en-IN');
    };
    
    const totalPriceDisplay = getFixedDepartureTotalPrice();

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
                                
                                <h2 className='trip-detail-heading'>{specificTourData?.title}</h2>
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
                                            {isFixedDeparture 
                                                ? specificTourData?.pricing?.fixed_departure?.[0]?.costingPackages?.[0]?.final_price 
                                                : specificTourData?.pricing?.customized?.final_price}
                                            /-
                                        </p>
                                        <p className='trip-price-per'>Per Person</p>
                                    </div>
                                </div>
                            </div>

                            <div className='trip-detail-right'>
                                {/* FIXED DEPARTURE FORM */}
                                {isFixedDeparture ? (
                                    <form className='trip-detail-contact-form' onSubmit={handleFixedDepartureSubmit}>
                                        <div className='trip-detail-contact-form-head'>
                                            <p className='head-1'>Enquiry Now !</p>
                                            <p className='head-2'>Allow Us to Call You Back!</p>
                                        </div>

                                        <div className='trip-detail-contact-input-container'>
                                            
                                            {/* Destination - Read Only */}
                                            <div className='trip-detail-contact-input'>
                                                <label>TRAVEL TO (DESTINATION)</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-plane-departure input-icon"></i>
                                                    <input
                                                        type='text'
                                                        value={specificTourData?.title || 'Loading...'}
                                                        readOnly 
                                                        className="form-control-plaintext"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Departure Date Dropdown */}
                                            <div className='trip-detail-contact-input'>
                                                <label>DEPARTURE DATE *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-calendar-alt input-icon"></i>
                                                    <select
                                                        name="departure_date_id"
                                                        value={fixedDepartureFormData.departure_date_id}
                                                        onChange={handleFixedDepartureChange}
                                                        required
                                                    >
                                                        <option value="">Select Departure Date</option>
                                                        {specificTourData?.pricing?.fixed_departure?.map((departure, index) => (
                                                            <option key={index} value={index}>
                                                                {departure.title} ({new Date(departure.from_date).toLocaleDateString()} - {new Date(departure.to_date).toLocaleDateString()})
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Sharing Option Dropdown */}
                                            <div className='trip-detail-contact-input'>
                                                <label>SHARING OPTION *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-users input-icon"></i>
                                                    <select
                                                        name="sharing_option_id"
                                                        value={fixedDepartureFormData.sharing_option_id}
                                                        onChange={handleFixedDepartureChange}
                                                        required
                                                        disabled={fixedDepartureFormData.departure_date_id === ''}
                                                    >
                                                        <option value="">Select Sharing Option</option>
                                                        {fixedDepartureFormData.departure_date_id !== '' && 
                                                           specificTourData?.pricing?.fixed_departure?.[fixedDepartureFormData.departure_date_id]?.costingPackages?.map((pkg, index) => (
                                                                <option key={index} value={index}>
                                                                    {pkg.title} - ₹{pkg.final_price}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Adults and Children - COMBINED IN ONE LINE */}
                                            <div className='trip-combined-line-group d-flex' style={{ gap: '10px' }}>
                                                {/* No. of Adults */}
                                                <div className='trip-detail-contact-input flex-grow-1 stepper-item' style={{ flexBasis: '50%' }}>
                                                    <label>ADULTS (12+) *</label>
                                                    <div className='input-stepper-wrapper'>
                                                        <input
                                                            type='number'
                                                            name='adults'
                                                            value={fixedDepartureFormData.adults}
                                                            onChange={handleFixedDepartureChange}
                                                            min='1'
                                                            placeholder='1'
                                                            required
                                                            readOnly
                                                        />
                                                        <div className='stepper-controls'>
                                                            <button type='button' onClick={() => handleFixedDepartureStepper('adults', 1)} className='stepper-up'><i className="fa-solid fa-caret-up"></i></button>
                                                            <button type='button' onClick={() => handleFixedDepartureStepper('adults', -1)} className='stepper-down'><i className="fa-solid fa-caret-down"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* No. of Children */}
                                                <div className='trip-detail-contact-input flex-grow-1 stepper-item' style={{ flexBasis: '50%' }}>
                                                    <label>CHILDREN (2-11)</label>
                                                    <div className='input-stepper-wrapper'>
                                                        <input
                                                            type='number'
                                                            name='children'
                                                            value={fixedDepartureFormData.children}
                                                            onChange={handleFixedDepartureChange}
                                                            min='0'
                                                            placeholder='0'
                                                            readOnly
                                                        />
                                                        <div className='stepper-controls'>
                                                            <button type='button' onClick={() => handleFixedDepartureStepper('children', 1)} className='stepper-up'><i className="fa-solid fa-caret-up"></i></button>
                                                            <button type='button' onClick={() => handleFixedDepartureStepper('children', -1)} className='stepper-down'><i className="fa-solid fa-caret-down"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Full Name */}
                                            <div className='trip-detail-contact-input'>
                                                <label>FULL NAME *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-user input-icon"></i>
                                                    <input
                                                        type='text'
                                                        name='full_name'
                                                        value={fixedDepartureFormData.full_name}
                                                        onChange={handleFixedDepartureChange}
                                                        placeholder='e.g. John Doe'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className='trip-detail-contact-input'>
                                                <label>EMAIL *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-envelope input-icon"></i>
                                                    <input
                                                        type='email'
                                                        name='email'
                                                        value={fixedDepartureFormData.email}
                                                        onChange={handleFixedDepartureChange}
                                                        placeholder='e.g. JohnDoe@gmail.com'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Contact Number (Phone Number for API) */}
                                            <div className='trip-detail-contact-input'>
                                                <label>PHONE NUMBER *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-phone input-icon"></i>
                                                    <input
                                                        type='tel'
                                                        name='contact_number'
                                                        value={fixedDepartureFormData.contact_number}
                                                        onChange={handleFixedDepartureChange}
                                                        placeholder='e.g. 1234567890'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Total Price Display - Only show when sharing option is selected */}
                                            {totalPriceDisplay && (
                                                <div className='trip-total-price-display' style={{
                                                    background: '#3b2a1a',
                                                    padding: '20px',
                                                    borderRadius: '12px',
                                                    textAlign: 'center',
                                                    marginTop: '15px',
                                                    marginBottom: '15px',
                                                    boxShadow: '0 4px 15px rgba(0,123,255,0.2)'
                                                }}>
                                                    <p style={{
                                                        color: '#ffffff',
                                                        fontSize: '16px',
                                                        marginBottom: '8px',
                                                        fontWeight: '500',
                                                        letterSpacing: '0.5px'
                                                    }}>Total Estimated Price</p>
                                                    <p style={{
                                                        color: '#ffffff',
                                                        fontSize: '32px',
                                                        fontWeight: 'bold',
                                                        margin: '0',
                                                        letterSpacing: '1px'
                                                    }}>
                                                        ₹{totalPriceDisplay}
                                                    </p>
                                                </div>
                                            )}
                                            
                                            <button type='submit' disabled={isSubmitting}>
                                                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    /* CUSTOMIZED PACKAGE FORM */
                                    <form className='trip-detail-contact-form' onSubmit={handleCustomizedSubmit}>
                                        <div className='trip-detail-contact-form-head'>
                                            <p className='head-1'>Enquiry Now !</p>
                                            <p className='head-2'>Allow Us to Call You Back!</p>
                                        </div>

                                        <div className='trip-detail-contact-input-container'>
                                            
                                            {/* Destination - Read Only */}
                                            <div className='trip-detail-contact-input'>
                                                <label>TRAVEL TO (DESTINATION)</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-plane-departure input-icon"></i>
                                                    <input
                                                        type='text'
                                                        value={specificTourData?.title || 'Loading...'}
                                                        readOnly 
                                                        className="form-control-plaintext"
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Travel From / Departure City */}
                                            <div className='trip-detail-contact-input'>
                                                <label>TRAVEL FROM (DEPARTURE CITY) *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-city input-icon"></i>
                                                    <input
                                                        type='text'
                                                        name='departure_city'
                                                        value={customizedFormData.departure_city}
                                                        onChange={handleCustomizedChange}
                                                        placeholder='e.g. New Delhi, Mumbai, etc.'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Travel Date and Hotel Category - COMBINED IN ONE LINE */}
                                            <div className='trip-combined-line-group d-flex' style={{ gap: '10px' }}>
                                                {/* Travel Date */}
                                                <div className='trip-detail-contact-input flex-grow-1 date-category-item' style={{ flexBasis: '50%' }}>
                                                    <label>TRAVEL DATE *</label>
                                                    <div className='input-with-icon-wrapper'>
                                                        <i className="fa-solid fa-calendar-day input-icon"></i>
                                                        <input
                                                            type='date'
                                                            name='travel_date'
                                                            value={customizedFormData.travel_date}
                                                            onChange={handleCustomizedChange}
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
                                                                value={customizedFormData.hotel_category}
                                                                onChange={handleCustomizedChange}
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

                                            {/* Adults and Children - COMBINED IN ONE LINE */}
                                            <div className='trip-combined-line-group d-flex' style={{ gap: '10px' }}>
                                                {/* No. of Adults */}
                                                <div className='trip-detail-contact-input flex-grow-1 stepper-item' style={{ flexBasis: '50%' }}>
                                                    <label>ADULTS *</label>
                                                    <div className='input-stepper-wrapper'>
                                                        <input
                                                            type='number'
                                                            name='adults'
                                                            value={customizedFormData.adults}
                                                            onChange={handleCustomizedChange}
                                                            min='1'
                                                            placeholder='1'
                                                            required
                                                            readOnly
                                                        />
                                                        <div className='stepper-controls'>
                                                            <button type='button' onClick={() => handleCustomizedStepper('adults', 1)} className='stepper-up'><i className="fa-solid fa-caret-up"></i></button>
                                                            <button type='button' onClick={() => handleCustomizedStepper('adults', -1)} className='stepper-down'><i className="fa-solid fa-caret-down"></i></button>
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
                                                            value={customizedFormData.children}
                                                            onChange={handleCustomizedChange}
                                                            min='0'
                                                            placeholder='0'
                                                            readOnly
                                                        />
                                                        <div className='stepper-controls'>
                                                            <button type='button' onClick={() => handleCustomizedStepper('children', 1)} className='stepper-up'><i className="fa-solid fa-caret-up"></i></button>
                                                            <button type='button' onClick={() => handleCustomizedStepper('children', -1)} className='stepper-down'><i className="fa-solid fa-caret-down"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Full Name */}
                                            <div className='trip-detail-contact-input'>
                                                <label>FULL NAME *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-user input-icon"></i>
                                                    <input
                                                        type='text'
                                                        name='full_name'
                                                        value={customizedFormData.full_name}
                                                        onChange={handleCustomizedChange}
                                                        placeholder='e.g. John Doe'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className='trip-detail-contact-input'>
                                                <label>EMAIL *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-envelope input-icon"></i>
                                                    <input
                                                        type='email'
                                                        name='email'
                                                        value={customizedFormData.email}
                                                        onChange={handleCustomizedChange}
                                                        placeholder='e.g. JohnDoe@gmail.com'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Contact Number */}
                                            <div className='trip-detail-contact-input'>
                                                <label>CONTACT NUMBER *</label>
                                                <div className='input-with-icon-wrapper'>
                                                    <i className="fa-solid fa-phone input-icon"></i>
                                                    <input
                                                        type='tel'
                                                        name='contact_number'
                                                        value={customizedFormData.contact_number}
                                                        onChange={handleCustomizedChange}
                                                        placeholder='e.g. 1234567890'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            
                                            <button type='submit' disabled={isSubmitting}>
                                                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
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