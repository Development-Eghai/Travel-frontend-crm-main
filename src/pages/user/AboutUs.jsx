import React, { useEffect, useRef, useState } from 'react'
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Header from './component/Header'
import Footer from './component/Footer'
import { Images } from "../../helpers/Images/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const AboutUs = () => {
    const [Counteron, setCounterOn] = useState(false);
    const { ref, inView } = useInView();
    useEffect(() => {
        if (inView) {
            setCounterOn(true);
        } else {
            setCounterOn(false);
        }
    }, [inView]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className='overflow-hidden'>
            <section className='overflow-hidden'>
                <div className="homepaage-banner-image-1">
                    <div className="home-banner-content">
                        <h1 className="banner-heading">
                            About Us
                        </h1>
                    </div>
                </div>
            </section>

            <section className='section-padding'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='about-us-content'>
                                <h3 className='about-we-are'>We are</h3>
                                <h1 className='about-company-name'>Indian Mountain Rovers</h1>

                                <p>Welcome to Indian Mountain Rovers</p>
                                <p>We do not just make the itineraries, we actually make memories.</p>
                                <p>Indian Mountain Rovers are designed with clock-work precision. What we believe is in personalized services. Our experience and expertise in the field is ample enough to provide you with the most advanced travel facilities including accommodation transportation, flight tickets and impeccable services throughout your journey. 
                                    <br /> <br />
                                    We are committed to provide a superlative experience to our travelers by offering world class services & travel solutions at the best value. We are powered by highly professional team, latest technology and by regularly introducing innovative travel packages</p>
                               

                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='about-us-content'>
                                <p>Indian Mountain Rovers is a full fledged tourism oriented agency , is all set to make a big difference in value added tour operations . Indian Mountain Rovers is the local ground handler for worldwide customers run by a experienced enterprising businessman supported by a team who have 12 years experience in hotel management and travel industries. The company image is based on innovation, technology, credibility, quality services, fair-business practices & respect to our relationships with customers, suppliers, & office colleagues.</p>
                                <p>Through an amalgamation of user friendly tools and human touch, we deliver the most responsive personalized service in the industry. Our structure puts us in a different league compared to the many poorly organized ground handlers which you may have encountered in North India. We also have a strict policy of answering all emails and queries within 24 hours for offline requests. We believe you would have an extremely positive working relationship with our reliable team.</p>
                                <p>Journeys can be bought but memories cannot… let this journey be an experience. We invite you to the Indian Mountain Rovers to enjoy a host of privileges.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Leaders  */}

            {/* <section className='our-leader-section section-padding'>
                <div className='container'>
                    <h1 className='aboutus-head-one-common'>Our Leaders</h1>
                    <h5 className='aboutus-head-two-common'>The thought pioneers that inspire & shape us</h5>

                    <p className='mt-4'>Get to know the members of our leadership team. Their deep insights and decades of unparalleled market expertise set us apart from the competition and help us in providing our customers with super-smooth travel booking experiences.</p>

                    <div className=''>
                        <div className='row'>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-leader-card'>
                                    <div>
                                        <img src={Images?.leader_dummy} alt="" />
                                    </div>
                                    <p className='our-leader-name'>Lorem Ipsum random</p>
                                    <p className='our-leader-role'>Founder</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-leader-card'>
                                    <div>
                                        <img src={Images?.leader_dummy} alt="" />
                                    </div>
                                    <p className='our-leader-name'>Lorem Ipsum random</p>
                                    <p className='our-leader-role'>Founder</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-leader-card'>
                                    <div>
                                        <img src={Images?.leader_dummy} alt="" />
                                    </div>
                                    <p className='our-leader-name'>Lorem Ipsum random</p>
                                    <p className='our-leader-role'>Founder</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-leader-card'>
                                    <div>
                                        <img src={Images?.leader_dummy} alt="" />
                                    </div>
                                    <p className='our-leader-name'>Lorem Ipsum random</p>
                                    <p className='our-leader-role'>Founder</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-leader-card'>
                                    <div>
                                        <img src={Images?.leader_dummy} alt="" />
                                    </div>
                                    <p className='our-leader-name'>Lorem Ipsum random</p>
                                    <p className='our-leader-role'>Founder</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-leader-card'>
                                    <div>
                                        <img src={Images?.leader_dummy} alt="" />
                                    </div>
                                    <p className='our-leader-name'>Lorem Ipsum random</p>
                                    <p className='our-leader-role'>Founder</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-leader-card'>
                                    <div>
                                        <img src={Images?.leader_dummy} alt="" />
                                    </div>
                                    <p className='our-leader-name'>Lorem Ipsum random</p>
                                    <p className='our-leader-role'>Founder</p>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-leader-card'>
                                    <div>
                                        <img src={Images?.leader_dummy} alt="" />
                                    </div>
                                    <p className='our-leader-name'>Lorem Ipsum random</p>
                                    <p className='our-leader-role'>Founder</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </section> */}

            {/* Our Footprint  */}

            <section className='our-footprint-section section-padding' ref={ref}>
                <div className='container'>
                    <h1 className='aboutus-head-one-common text-white'>Our Footprint</h1>
                    <h5 className='aboutus-head-two-common text-white'>The expanse of our business and customer reach</h5>
                    <div className=''>
                        <div className='row'>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-footprint-card'>
                                    {Counteron && (
                                        <>
                                            <p className='our-footprint-number'> <CountUp
                                                className="csd-count-home-number-case"
                                                start={0}
                                                end={25}
                                                duration={3}
                                                delay={0}
                                            /> +</p>
                                            <p className='our-footprint-para'>Years of Expertise</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-footprint-card'>
                                    {Counteron && (
                                        <>
                                            <p className='our-footprint-number'> <CountUp
                                                className="csd-count-home-number-case"
                                                start={0}
                                                end={10}
                                                duration={3}
                                                delay={0}
                                            /> K+</p>
                                            <p className='our-footprint-para'>Transformative Journeys</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className='our-footprint-card'>
                                    {Counteron && (
                                        <>
                                            <p className='our-footprint-number'> <CountUp
                                                className="csd-count-home-number-case"
                                                start={0}
                                                end={100}
                                                duration={3}
                                                delay={0}
                                            /> K+</p>
                                            <p className='our-footprint-para'>Personalized Adventures</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className='col-lg-3 col-md-6'>
                                <div className='our-footprint-card'>
                                    {Counteron && (
                                        <>
                                            <p className='our-footprint-number'> <CountUp
                                                className="csd-count-home-number-case"
                                                start={0}
                                                end={100}
                                                duration={3}
                                                delay={0}
                                            /> K+</p>
                                            <p className='our-footprint-para'>Trust-Based Interactions</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                           
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Achievement  */}

            {/* <section className='section-padding'>
                <div className='container'>
                    <div className='d-flex flex-lg-row flex-md-row flex-column justify-content-lg-between justify-content-md-between'>
                        <div>
                            <h1 className='aboutus-head-one-common'>Our Achievements</h1>
                            <h5 className='aboutus-head-two-common'>The accolades we have received across categories</h5>
                        </div>

                        <div className="slider-nav slider-navigation my-auto">
                            <div>
                                <button ref={prevRef} className="nav-btn">←</button>
                            </div>
                            <div>
                                <button ref={nextRef} className="nav-btn">→</button>
                            </div>
                        </div>
                    </div>

                    <div className="featured-slider-wrapper mt-3">
                        <Swiper
                            modules={[Navigation]}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            slidesPerGroup={1}
                            spaceBetween={10}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1, slidesPerGroup: 1 },
                                576: { slidesPerView: 1, slidesPerGroup: 1 },
                                768: { slidesPerView: 1, slidesPerGroup: 1 },
                                992: { slidesPerView: 1, slidesPerGroup: 1 },
                                1200: { slidesPerView: 1, slidesPerGroup: 1 },
                            }}
                            loop={false}
                        >
                            <SwiperSlide>
                                <div className=''>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                         <a href='' >READ MORE</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                         <a href='' >READ MORE</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                         <a href='' >READ MORE</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                        <a href='' >READ MORE</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className=''>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className=''>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className=''>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                         <a href='' >READ MORE</a>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='our-achievements-card'>
                                                <div className='our-achievements-content d-flex'>
                                                    <div className='me-3 my-auto'>
                                                        <img src={Images.reviews} alt="" />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <h5>ET Human Capital Awards </h5>
                                                        <p>Excellence in Communication Strategy (Silver) – 2022</p>
                                                    </div>
                                                </div>
                                                <div className='my-auto'>
                                                    <a href='' >READ MORE</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>

                </div>

            </section> */}
                        {/*Highlights */}

            <section className='our-leader-section section-padding'>
                <div className='container'>
                    <div className=''>
                        <h1 className='aboutus-head-one-common'>Why Choose Us</h1>
                        {/* <h5 className='aboutus-head-two-common'>Hassle Free Trips</h5> */}
                        <p>After choosing to come with our agency you will be assigned a personal sales consultant who has experience dealing with airlines, customize package tours and knowledge of many other areas to meet any of your travel needs. We understand our customers and always deliver on our promises. And we don’t stop at just offering customized packages, but see to it that the tour goes smoothly and as planned for an unparalleled travel experience.</p>
                    </div>
                    
                    <br />
                    <h4 className='aboutus-head-two-common text-center' >Our Values</h4>
                    <div className=''>
                        <div className='row'>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_1} alt="" />
                                    </div>
                                    <h5>Honesty </h5>
                                    <p className='text-center'>We prioritize honest communication and fair pricing, fostering trust with clients and partners.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_2} alt="" />
                                    </div>
                                    <h5>Transparency </h5>
                                    <p className='text-center'>We ensure clarity in all our products, services, and processes.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_3} alt="" />
                                    </div>
                                    <h5>Quality </h5>
                                    <p className='text-center'>We focus on delivering excellent service and value by working with top people and operators.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_1} alt="" />
                                    </div>
                                    <h5>Personal </h5>
                                    <p className='text-center'>We offer tailored advice and personal, friendly service, making each experience unique.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_2} alt="" />
                                    </div>
                                    <h5>Sustainable Tourism </h5>
                                    <p className='text-center'>We promote responsible tourism, respecting local cultures, the environment, and fair economic practices.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_3} alt="" />
                                    </div>
                                    <h5>Professional </h5>
                                    <p className='text-center'>We approach business with integrity, efficiency, and realibility, maintaining a grounded, respectful attitude </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
            <section className='section-padding'>
                <div className='container'>
                    <h1 className='aboutus-head-one-common mb-4'>Registration Information</h1>
                    <h5>Registered with Department of Tourism Government of Himachal Pradesh, India</h5>

                    <div className='mt-3'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <h5>
                                    Indian Mountain Rovers No: </h5>
                            </div>
                            <div className='col-lg-9'>
                                < p className='ms-5'>11-576/12-DTO-SML</p>
                            </div>
                        </div>
                    </div>


                    <div className='mt-3'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <h5>
                                    Registered Office :</h5>
                            </div>
                            <div className='col-lg-9'>
                                < p className='ms-5'> Manali highway Chakkar Shimla</p>
                            </div>

                        </div>
                    </div>
                    
                    <div className='mt-3'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <h5>
                                    Phone:</h5>
                            </div>
                            <div className='col-lg-9'>
                                < p className='ms-5'>+91 82788 29941</p>
                                < p className='ms-5'>+91 94183 44227</p>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </section >
        </div >
    )
}

export default AboutUs
