import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Images } from "../../../../helpers/Images/images";
import { useNavigate, useParams } from "react-router";
import Header from '../../../user/component/Header';
import { TourPreviewDetails } from '../../../../common/api/ApiService';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';


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
        const response = await TourPreviewDetails(id)

        if (response && response.statusCode === 200) {
            const fixedPackage = response.data?.fixedPackage;
            const customizePackage = response.data?.customizePackage;

            const isFixed = fixedPackage && Object.keys(fixedPackage).length > 0;
            const isCustom = customizePackage && Object.keys(customizePackage).length > 0;

            if (isFixed) {
                setSpecificTourData(fixedPackage);
                setIsFixedPackage(true);
            } else if (isCustom) {
                setSpecificTourData(customizePackage);
                setIsFixedPackage(false);
            }
        }
    }

    const handlePreview = (id) => {
        const url = `/booking/${specificTourData?.slug}/${id}`;
        window.location.href = url; // Opens in the same tab
    };

    console.log(specificTourData, "specificTourData-specificTourData")

    useEffect(() => {
        getSpecificTour()
    }, [])

    return (
        <div className=''>
            <Header />
            <section className="destination-detail-banner-main">
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
                                {/* <div className="destination-overlay"></div>
                                <div className='destination-slide-content'>
                                    <h1 className="dest-package-name">Europe Tour Packages</h1>
                                    <p className="dest-package-para">
                                        Explore the nature-kissed beauty of Thailand
                                    </p>
                                </div> */}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

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
                                            <p dangerouslySetInnerHTML={{ __html: specificTourData?.long_description || "<p>No description available</p>" }}></p>
                                        </div>
                                    </div>
                                    <p className='read-more' onClick={() => setShowReadMore(!showReadMore)}>{showReadMore ? "Read Less" : "Read More"}</p>
                                </div>

                                <div className='trip-detail-section' ref={itineraryRef}>
                                    <h3>Itinerary</h3>
                                    <div className="container">
                                        <div className='trip-detail-faqs mt-4'>
                                            <div className="accordion" id="accordionExample">

                                                {specificTourData?.day_wise_itenary.map((item, index) => (
                                                    <div className="accordion-item" key={index}>
                                                        <h2 className="accordion-header" id={`day_wise_itenary${index}`}>
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                data-bs-target={`#itenarys${index}`} aria-expanded={index === 0 ? 'true' : 'false'}
                                                                aria-controls={`itenarys${index}`}>
                                                                <p className='trip-faq-accordion'>Day {index + 1}</p>  {item?.day_title}
                                                            </button>
                                                        </h2>
                                                        <div id={`itenarys${index}`}
                                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                            aria-labelledby={`day_wise_itenary${index}`}
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <p>{item?.day_description}</p>

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
                                        <p dangerouslySetInnerHTML={{ __html: specificTourData?.price_per_package?.inclusion || "<p>No description available</p>" }}></p>
                                    </div>

                                </div>

                                <div className='trip-detail-section' ref={exclusionRef}>
                                    <h3>Exclusions</h3>
                                    <div className='mt-4'>
                                        <p dangerouslySetInnerHTML={{ __html: specificTourData?.price_per_package?.exclusion || "<p>No description available</p>" }}></p>
                                    </div>
                                </div>

                                <div className='trip-detail-section' ref={highlightsRef}>
                                    <h3>Key Highlights</h3>
                                    <div className='mt-4'>
                                        <p dangerouslySetInnerHTML={{ __html: specificTourData?.price_per_package?.key_highlights || "<p>No description available</p>" }}></p>
                                    </div>
                                </div>

                                <div className='trip-detail-section'>
                                    <h3>Cancellation Policy</h3>
                                    <div className='mt-4'>
                                        <p dangerouslySetInnerHTML={{ __html: specificTourData?.price_per_package?.cancellation_policy || "<p>No description available</p>" }}></p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='col-lg-4'>
                            {isFixedPackage && (
                                <div className='trip-detail-right'>
                                    <div className='trip-detail-price-card'>
                                        <p className='mb-1'>Starting from</p>

                                        <div className='d-flex'>
                                            <p className='trip-price'>₹ {specificTourData?.price_per_package?.base_price}/-</p>
                                            <p className='trip-price-per'>Per Person</p>
                                        </div>

                                        <button onClick={() => handlePreview(id)}>Dates & Pricing</button>
                                    </div>
                                </div>
                            )}

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
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourPreview
