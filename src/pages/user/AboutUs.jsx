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
                                <h1 className='about-company-name'>MakeMyTrip</h1>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived. </p>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since. </p>

                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='about-us-content'>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop. </p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='our-leader-section section-padding'>
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

            </section>

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
                                                end={85}
                                                duration={3}
                                                delay={0}
                                            /> Mn+</p>
                                            <p className='our-footprint-para'>Lifetime Transacted Users</p>
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
                                                end={85}
                                                duration={3}
                                                delay={0}
                                            /> Mn+</p>
                                            <p className='our-footprint-para'>Lifetime Transacted Users</p>
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
                                                end={450}
                                                duration={3}
                                                delay={0}
                                            /> Mn+</p>
                                            <p className='our-footprint-para'>Lifetime Transacted Users</p>
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
                                                end={1300}
                                                duration={3}
                                                delay={0}
                                            /> Mn+</p>
                                            <p className='our-footprint-para'>Lifetime Transacted Users</p>
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
                                                end={850}
                                                duration={3}
                                                delay={0}
                                            /> Mn+</p>
                                            <p className='our-footprint-para'>Lifetime Transacted Users</p>
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
                                                end={1345}
                                                duration={3}
                                                delay={0}
                                            /> Mn+</p>
                                            <p className='our-footprint-para'>Lifetime Transacted Users</p>
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
                                                end={987}
                                                duration={3}
                                                delay={0}
                                            /> Mn+</p>
                                            <p className='our-footprint-para'>Lifetime Transacted Users</p>
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
                                                end={345}
                                                duration={3}
                                                delay={0}
                                            /> Mn+</p>
                                            <p className='our-footprint-para'>Lifetime Transacted Users</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section-padding'>
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

            </section>

            <section className='our-leader-section section-padding'>
                <div className='container'>
                    <div className=''>
                        <h1 className='aboutus-head-one-common'>Our Achievements</h1>
                        <h5 className='aboutus-head-two-common'>The accolades we have received across categories</h5>
                    </div>

                    <div className=''>
                        <div className='row'>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_1} alt="" />
                                    </div>
                                    <h5>Curious </h5>
                                    <p className='text-center'>We are inquisitive. We ask questions to absorb, reflect and solve.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_2} alt="" />
                                    </div>
                                    <h5>Curious </h5>
                                    <p className='text-center'>We are inquisitive. We ask questions to absorb, reflect and solve.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_3} alt="" />
                                    </div>
                                    <h5>Curious </h5>
                                    <p className='text-center'>We use the customer lens proactively to anticipate and understand their expectations and champion their interests.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_1} alt="" />
                                    </div>
                                    <h5>Curious </h5>
                                    <p className='text-center'>We are inquisitive. We ask questions to absorb, reflect and solve.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_2} alt="" />
                                    </div>
                                    <h5>Curious </h5>
                                    <p className='text-center'>We are inquisitive. We ask questions to absorb, reflect and solve.</p>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='our-culture-card'>
                                    <div className='d-flex justify-content-center'>
                                        <img src={Images.culture_image_3} alt="" />
                                    </div>
                                    <h5>Curious </h5>
                                    <p className='text-center'>We make endless efforts to enhance our products, services, and processes. We believe that incremental changes are the cornerstones of breakthrough innovations.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
            <section className='section-padding'>
                <div className='container'>
                    <h1 className='aboutus-head-one-common mb-4'>Contact Us</h1>

                    <div className='mt-3'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <h5>
                                    Name of the Company:</h5>
                            </div>
                            <div className='col-lg-9'>
                                < p className='ms-5'>Lorem Ipsum is simply dummy text</p>
                            </div>
                        </div>
                    </div>


                    <div className='mt-3'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <h5>
                                    CIN:</h5>
                            </div>
                            <div className='col-lg-9'>
                                < p className='ms-5'>P45673040HR2000ADDC34567</p>
                            </div>

                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <h5>
                                    Registered Address:</h5>
                            </div>
                            <div className='col-lg-9'>
                                < p className='ms-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <h5>
                                    Telephone:</h5>
                            </div>
                            <div className='col-lg-9'>
                                < p className='ms-5'>+91 234567890</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <h5>
                                    Fax:</h5>
                            </div>
                            <div className='col-lg-9'>
                                < p className='ms-5'>+91 98765432</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section >
        </div >
    )
}

export default AboutUs
