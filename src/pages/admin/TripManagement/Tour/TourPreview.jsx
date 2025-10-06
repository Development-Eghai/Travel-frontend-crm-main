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

    const handlePreview = (id) => {
        const url = `/booking/${specificTourData?.slug}/${id}`;
        window.location.href = url;
    };

    console.log(specificTourData, "specificTourData-specificTourData")

    useEffect(() => {
        getSpecificTour()
    }, [])

    return (
        <div className=''>
            {/* <section className="destination-detail-banner-main">
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
                    {specificTourData?.hero_slider_images.map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="destination-slide"
                                style={{
                                    backgroundImage: `url(${BACKEND_DOMAIN}${imageUrl})`,
                                }}
                            >
                                <div className="destination-overlay"></div>
                                <div className='destination-slide-content'>
                                    <h1 className="dest-package-name">Europe Tour Packages</h1>
                                    <p className="dest-package-para">
                                        Explore the nature-kissed beauty of Thailand
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section> */}

            <div className='trip-detail-content-main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='trip-detail-left'>
                                <h2 className='trip-detail-heading'>{specificTourData?.short_description}</h2>

                                <div className='d-flex trip-pickup-parent'>
                                    <div className='trip-pickup-drop me-4'>
                                        <div>
                                            <i class="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p>Pickup & Drop</p>
                                            <h3>{specificTourData?.pickup_location} - {specificTourData?.drop_location}</h3>
                                        </div>
                                    </div>
                                    <div className='trip-pickup-drop'>
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
                                                                <p className='mt-3 fw-bold'>Activity : </p>
                                                                <ul>
                                                                    {item?.activities?.map((item, index) => (
                                                                        <li key={index}>{item}</li>))}
                                                                </ul>
                                                                <p className='mt-3'><span className='fw-bold'>Hotel Name :</span> {item?.hotel_name}</p>

                                                                <p className='mt-3 fw-bold'>Meal Plan : </p>
                                                                <ul>
                                                                    {item?.meal_plan?.map((item, index) => (
                                                                        <li key={index}>{item}</li>))}
                                                                </ul>

                                                                <div className='d-flex flex-wrap'>
                                                                    {item?.day_images?.map((img, index) => (
                                                                        <div key={index} className='trip-day-image'>
                                                                            <img src={`${BACKEND_DOMAIN}${img}`} alt={`Day Image ${index + 1}`} />
                                                                        </div>
                                                                    ))}
                                                                </div>
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
                                        <p dangerouslySetInnerHTML={{ __html: specificTourData?.key_highlights || "<p>No description available</p>" }}></p>
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
                            {specificTourData?.pricing?.pricing_model==="fixed" && (
                            <div className='trip-detail-right'>
                                <div className='trip-detail-price-card'>
                                    <p className='mb-1'>Starting from</p>

                                    <div className='d-flex'>
                                        <p className='trip-price'>₹ {specificTourData?.pricing?.pricing_model==="fixed" && specificTourData?.pricing?.fixed_departure?.fixed_departure[0]?.base_price}/-</p>
                                        <p className='trip-price-per'>Per Person</p>
                                    </div>

                                    <button onClick={() => handlePreview(id)}>Dates & Pricing</button>
                                </div>
                            </div>
                            )}

                            {/* <div className='trip-detail-right'>
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
                                                <label>No Of People</label>
                                                <input type='number' placeholder='eg. 5' />
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <label>No Of Days</label>
                                                <input type='number' placeholder='eg. 10' />
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <div className='admin-input-div mt-0'>
                                                    <label>Select Prepared Hotel </label>
                                                    <select
                                                        name="featured_trip_page">
                                                        <option value="">Select Hotel</option>
                                                        <option value="Five Star">⭐ ⭐ ⭐ ⭐ ⭐</option>
                                                        <option value="Four Star">⭐ ⭐ ⭐ ⭐</option>
                                                        <option value="Three Star">⭐ ⭐ ⭐</option>
                                                        <option value="Two Star">⭐ ⭐</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='trip-detail-contact-input'>
                                                <div className='admin-input-div mt-0'>
                                                    <label>Select Destination</label>
                                                    <select
                                                        name="featured_trip_page">
                                                        <option value="">Select Destination</option>
                                                        <option value="Five Star">Chennai</option>
                                                        <option value="Four Star">India</option>
                                                        <option value="Three Star">Mumbai</option>
                                                        <option value="Two Star">Keral</option>
                                                    </select>
                                                </div>
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
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourPreview
