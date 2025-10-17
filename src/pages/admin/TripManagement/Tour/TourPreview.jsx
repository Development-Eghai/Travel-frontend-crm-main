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


const TourPreview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [specificTourData, setSpecificTourData] = useState()
    const [isFixedPackage, setIsFixedPackage] = useState(false)
    const [showReadMore, setShowReadMore] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [tripList, setTripList] = useState([])


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


    const [visibleCount, setVisibleCount] = useState(4); // 👈 show 4 trips initially

    const handleToggle = () => {
        if (visibleCount >= trip.length) {
            // 👇 If all shown → collapse back to 4
            setVisibleCount(4);
        } else {
            // 👇 Show 4 more each click
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

    console.log(specificTourData, 'specificTourData')

    return (
        <div className='overflow-hidden-page'>

            {/* <section className="destination-detail-banner-main">
                <Swiper
                    modules={[EffectFade, Autoplay, Navigation]}
                    // navigation={true}
                    effect="fade"
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="destination-swiper"
                >
                    {specificTourData?.gallery_images?.map((imageUrl) => (
                        <SwiperSlide>
                            <div
                                className="destination-slide swiper-slider-banners"
                                style={{
                                    backgroundImage: `url(${encodeURI(imageUrl)})`,
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
            </section> */}



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
                                            <i class="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p>Pickup & Drop</p>
                                            <h3>{specificTourData?.pickup_location} - {specificTourData?.drop_location}</h3>
                                        </div>
                                    </div>
                                    <div className='trip-pickup-drop mt-lg-0 mt-3'>
                                        <div>
                                            <i class="fa-solid fa-clock"></i>
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
                                                                            {item?.activities?.map((item, index) => (
                                                                                <li key={index}>{item}</li>))}
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
                                                                            {item?.meal_plan?.map((item, index) => (
                                                                                <li key={index}>{item}</li>))}
                                                                        </ul>
                                                                    </>
                                                                )}

                                                                {/* <div className='d-flex flex-wrap'>
                                                                    {item?.day_images?.map((img, index) => (
                                                                        <div key={index} className='trip-day-image'>
                                                                            <img src={`${BACKEND_DOMAIN}${img}`} alt={`Day Image ${index + 1}`} />
                                                                        </div>
                                                                    ))}
                                                                </div> */}

                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='trip-detail-section' ref={itineraryRef}>
                                    <h3>Frequently Asked Questions</h3>
                                    <div className="container">
                                        <div className='trip-detail-faqs mt-4'>
                                            <div className="accordion" id="accordionExample">
                                                {specificTourData?.faqs?.map((item, index) => (
                                                    <div className="accordion-item" key={index}>
                                                        <h2 className="accordion-header" id={`day_wise_itenary${index}`}>
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                data-bs-target={`#itenarys${index}`} aria-expanded={index === 0 ? 'true' : 'false'}
                                                                aria-controls={`itenarys${index}`}>
                                                                <p className=''>{item?.question}</p>
                                                            </button>
                                                        </h2>
                                                        <div id={`itenarys${index}`}
                                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                            aria-labelledby={`day_wise_itenary${index}`}
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <p className=''>{item?.answer}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                <p className=''>{specificTourData?.faqs?.question}</p>
                                                <p className=''>{specificTourData?.faqs?.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='trip-detail-section inclusion' ref={inclusionRef}>
                                    <h3>Inclusions</h3>

                                    <div className='mt-4'>
                                        <p dangerouslySetInnerHTML={{ __html: specificTourData?.inclusions || "<p>No description available</p>" }}></p>
                                    </div>

                                </div>

                                <div className='trip-detail-section' ref={exclusionRef}>
                                    <h3>Exclusions</h3>
                                    <div className='mt-4'>
                                        <p dangerouslySetInnerHTML={{ __html: specificTourData?.exclusions || "<p>No description available</p>" }}></p>
                                    </div>
                                </div>

                                <div className='trip-detail-section' ref={highlightsRef}>
                                    <h3>Key Highlights</h3>
                                    <div className='mt-4'>
                                        <p dangerouslySetInnerHTML={{ __html: specificTourData?.highlights || "<p>No description available</p>" }}></p>
                                    </div>
                                </div>

                                <div className='trip-detail-section'>
                                    <h3>Policies</h3>
                                    <div className='mt-4'>
                                        {specificTourData?.policies?.map((item, index) => (
                                            <>
                                                <p className='mt-5 fw-bold'>{item?.title} :</p>
                                                <p className='mt-3'>{item?.content} </p>
                                            </>
                                        ))}
                                    </div>
                                </div>

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

                                    {/* <button onClick={() => handlePreview(id)} >Dates & Pricing</button> */}
                                    <button >Dates & Pricing</button>


                                </div>
                            </div>

                            <div className='trip-detail-right'>
                                {!isFixedPackage && (
                                    <div className='trip-detail-contact-form'>
                                        <div className='trip-detail-contact-form-head'>
                                            <p className='head-1'>Enquiry Now !</p>
                                            <p className='head-2'>Allow Us to Call You Back!</p>
                                        </div>

                                        <div className='trip-detail-contact-input-container'>
                                            <div className='trip-detail-contact-input'>
                                                <label>Your Name</label>
                                                <input type='text' placeholder='eg. John Doe' />
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <label>Your Phone Number</label>
                                                <input type='number' placeholder='eg. 123456789' />
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <label>Your Email Id</label>
                                                <input type='email' placeholder='eg. JohnDoe@gmail.com' />
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <div className='admin-input-div mt-0'>
                                                    <label>Select Slots </label>
                                                    <select
                                                        name="featured_trip_page">
                                                        <option value="">Select Slots</option>
                                                        <option value="Five Star">⭐ ⭐ ⭐ ⭐ ⭐</option>
                                                        <option value="Four Star">⭐ ⭐ ⭐ ⭐</option>
                                                        <option value="Three Star">⭐ ⭐ ⭐</option>
                                                        <option value="Two Star">⭐ ⭐</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <div className='admin-input-div mt-0'>
                                                    <label>Select Package</label>
                                                    <select
                                                        name="featured_trip_page">
                                                        <option value="">Select Package</option>
                                                        <option value="Double">Double</option>
                                                        <option value="Triple">Triple</option>
                                                        <option value="Quad">Quad</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <label>No. of Adults</label>
                                                <input type='number' placeholder='eg. 4' />
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <label>no. of Infants</label>
                                                <input type='number' placeholder='eg. 3' />
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <label>no. of Children</label>
                                                <input type='number' placeholder='eg. 2' />
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <div className='admin-input-div mt-0'>
                                                    <label>Wite Some Message</label>
                                                    <textarea style={{ height: "100px" }}></textarea>
                                                </div>
                                            </div>
                                            <button>Submit</button>
                                        </div>
                                    </div>
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
                                                <div className="featured-card-main">
                                                    <div className='position-relative'>
                                                        <div>
                                                            <img className="featured-card-img" src={trip?.hero_image} alt="featured" />
                                                        </div>

                                                        <div className='featured-card-day-card'>
                                                            <p>{`${trip?.days} Days`} {`${trip?.nights} Nights`} </p>
                                                        </div>

                                                    </div>

                                                    <div className="featured-content-main">
                                                        <p className="featured-city-para">
                                                            <p className="featured-city-para">
                                                                {`${trip?.pickup_location} → ${trip?.drop_location}`.length > 30
                                                                    ? `${trip?.pickup_location} → ${trip?.drop_location}`.slice(0, 30) + "..."
                                                                    : `${trip?.pickup_location} → ${trip?.drop_location}`}
                                                            </p>
                                                        </p>

                                                        <p className="featured-content">
                                                            {trip?.pricing?.pricing_model === "customized" ? (

                                                                <>
                                                                    <span>₹{trip?.pricing?.customized?.base_price}</span>
                                                                    ₹{trip?.pricing?.customized?.final_price}
                                                                </>

                                                            ) : (
                                                                <>
                                                                    <span>₹{trip?.pricing?.fixed_departure[0]?.base_price}</span>
                                                                    ₹{trip?.pricing?.fixed_departure[0]?.final_price}
                                                                </>
                                                            )}
                                                        </p>
                                                        <div className="featured-bottom-content d-flex gap-2">
                                                            <div className='trip-card-amount'>
                                                                <p className="" onClick={() => window.open(`/trip-preview/${trip?.slug}/${trip?.id}`, "_blank", "noopener,noreferrer")}                                                            >
                                                                    Trip Detail
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
