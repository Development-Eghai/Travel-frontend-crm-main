import React, { useRef } from 'react'
import Header from "./component/Header"
import Footer from "./component/Footer"
import HomeBanner from './component/HomeBanner'
import TripCard from '../../component/TripCard'
import { Images } from "../../helpers/Images/images";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useSelector } from 'react-redux';
import ContactForm from '../admin/TripManagement/ContactForm/ContactForm';


const Homepage = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const allTrips = useSelector((state) => state.home_page_slice.featured_trips);
    const allDestination = useSelector((state) => state.home_page_slice.all_destination);
    const lastFourTrips = allTrips.slice(-4);
    const firstSixDestination = allDestination.slice(0, 6);
    console.log(allTrips, "allTrips");


    return (
        <div className='overflow-hidden'>
            <HomeBanner />
            <div className=''>

                {/* Featured Trips */}
                <section className='featured-trips-section section-padding'>
                    <div className='container'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4 className='common-section-heading'>Featured Trips</h4>
                            </div>
                            <div>
                                <div className="slider-nav slider-navigation">
                                    <button ref={prevRef} className="nav-btn">←</button>
                                    <button ref={nextRef} className="nav-btn">→</button>
                                </div>
                            </div>
                        </div>
                        <div className="featured-slider-wrapper mt-3">
                            <Swiper
                                modules={[Navigation]}
                                slidesPerView={4}
                                pagination={{ clickable: true }}
                                slidesPerGroup={4}
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
                                    320: { slidesPerView: 1.2, slidesPerGroup: 1 },
                                    576: { slidesPerView: 2, slidesPerGroup: 2 },
                                    768: { slidesPerView: 3, slidesPerGroup: 3 },
                                    992: { slidesPerView: 4, slidesPerGroup: 4 },
                                    1200: { slidesPerView: 4, slidesPerGroup: 4 },
                                }}
                                loop={false}
                            >

                                {allTrips && allTrips.length > 0 ? (
                                    allTrips.map((trip, index) => (
                                        <SwiperSlide key={trip.id || index}>
                                            <TripCard trip={trip} />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <p className="text-center py-4">No trips available</p>
                                )}

                            </Swiper>
                        </div>
                    </div>
                </section>

                {/* Trending Destinations */}
                <section className='trending-destination-section section-padding'>
                    <div className='container'>
                        <div className='d-flex flex-lg-row flex-md-row flex-column justify-content-lg-between justify-content-md-between'>
                            <div className='d-flex justify-content-center'>
                                <h4 className='common-section-heading'>Trending Destinations</h4>
                            </div>
                            {/* <div className='mt-lg-0 my-md-auto mt-3 d-flex justify-content-center'>
                                <a href='/' className='anchor-tag text-lg-start text-center'>See all</a>
                            </div> */}
                        </div>

                        <div className='mt-4'>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className='trending-grid-one'>
                                        <div className='position-relative trending-card'>
                                            <a href={`/destination/${firstSixDestination[0]?.slug}/${firstSixDestination[0]?.id}`} target='_blank'>
                                                <figure>
                                                    <img src={Images.trending_one} alt="trending-one" className='trending-image' />
                                                </figure>
                                                <div className='trending-grid-content-three'>
                                                    <p className='trending-grid-para'>{firstSixDestination[0]?.title}</p>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='mt-4 trending-card position-relative'>
                                            <a href={`/destination/${firstSixDestination[1]?.slug}/${firstSixDestination[1]?.id}`} target='_blank'>
                                                <figure>
                                                    <img src={Images.trending_two} alt="trending-one" className='trending-image' />
                                                </figure>
                                                <div className='trending-grid-content-three'>
                                                    <p className='trending-grid-para'>{firstSixDestination[1]?.title}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className='position-relative trending-card'>
                                        <a href={`/destination/${firstSixDestination[2]?.slug}/${firstSixDestination[2]?.id}`} target='_blank'>
                                            <figure>
                                                <img src={Images.trending_three} alt="trending-one" className='trending-image' />
                                            </figure>
                                            <div className='trending-grid-content-three'>
                                                <p className='trending-grid-para'>{firstSixDestination[2]?.title}</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className='d-flex mt-4 justify-content-start justify-content-md-around'>
                                        <div className='position-relative trending-card'>
                                            <a href={`/destination/${firstSixDestination[3]?.slug}/${firstSixDestination[3]?.id}`} target='_blank'>
                                                <figure>
                                                    <img src={Images.trending_four} alt="trending-one" className='trending-image' />
                                                </figure>
                                                <div className='trending-grid-content-center-image'>
                                                    <p className='trending-grid-para'>{firstSixDestination[3]?.title}</p>
                                                </div>
                                            </a>
                                        </div>
                                        <div className='ms-4 position-relative trending-card'>
                                            <a href={`/destination/${firstSixDestination[4]?.slug}/${firstSixDestination[4]?.id}`} target='_blank'>
                                                <figure>
                                                    <img src={Images.trending_five} alt="trending-one" className='trending-image' />
                                                </figure>
                                                <div className='trending-grid-content-center-image'>
                                                    <p className='trending-grid-para'>{firstSixDestination[4]?.title}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className='position-relative trending-card'>
                                        <a href={`/destination/${firstSixDestination[5]?.slug}/${firstSixDestination[5]?.id}`} target='_blank'>
                                            <figure>
                                                <img src={Images.trending_six} alt="trending-one" className='trending-image' />
                                            </figure>
                                            <div className='trending-grid-content-three'>
                                                <p className='trending-grid-para'>{firstSixDestination[5]?.title}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section >
                    <div className='container'>
                        <div className="row">
                            <div className="col-lg-6 p-lg-0">
                                <div className='offer-left'>
                                    <div>
                                        <h4 className='offer-left-heading'>Grab up to <span className='offer-span-head'>35% off </span><br className='break-tag' />
                                            on your favorite<br className='break-tag' />
                                            Destination</h4>
                                        <p>Limited time offer, don't miss the opportunity</p>
                                        <button className='offer-button'>Book Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 p-lg-0">
                                <img src={Images.offer_right} alt="offer-right" className='w-100 h-auto' />
                            </div>
                        </div>

                    </div>
                </section>

                {/* Find Popular Tours */}
                <section className='section-padding'>
                    <div className='container'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h4 className='common-section-heading'>Find Popular Tours</h4>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <div className="row">
                                {lastFourTrips && lastFourTrips.length > 0 ? (
                                    lastFourTrips.reverse().map((trip, index) => (
                                        <div className='col-lg-3 col-md-6' key={trip.id || index}>
                                            <TripCard trip={trip} />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center py-4">No Popular Tours available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className='section-padding'>
                    <div className='container'>
                        <div>
                            <h4 className='common-section-heading text-center'>Customer Reviews</h4>
                        </div>
                        <div className='mt-3'>
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                loop={true}
                                pagination={{ clickable: true }}
                                speed={800}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-5">
                                            <div className="reviews-main text-center position-relative">
                                                <div className="d-flex justify-content-center">
                                                    <img className="reviews-img" src={Images.reviews} alt="reviews" />
                                                </div>
                                                <div className='reviews-icon-main'>
                                                    <img className="reviews-icon" src={Images.review_icon} alt="reviews" />
                                                </div>
                                                <div className="reviews-content mt-5">
                                                    <p className="reviews-para">Excellent Service!</p>
                                                    <p className="reviews-content-para">
                                                        I had an amazing experience with this company. The service was top-notch,
                                                        and the staff was incredibly friendly. I highly recommend them!
                                                    </p>
                                                    <div className='mt-4'>
                                                        <p className='testimonial-name'>John Doe</p>
                                                        <p className='testimonial-postion'>Customer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-5">
                                            <div className="reviews-main text-center position-relative">
                                                <div className="d-flex justify-content-center">
                                                    <img className="reviews-img" src={Images.reviews} alt="reviews" />
                                                </div>
                                                <div className='reviews-icon-main'>
                                                    <img className="reviews-icon" src={Images.review_icon} alt="reviews" />
                                                </div>
                                                <div className="reviews-content mt-5">
                                                    <p className="reviews-para">Service!</p>
                                                    <p className="reviews-content-para">
                                                        I had an amazing experience with this company. The service was top-notch,
                                                        and the staff was incredibly friendly. I highly recommend them!
                                                    </p>
                                                    <div className='mt-4'>
                                                        <p className='testimonial-name'>John Doe</p>
                                                        <p className='testimonial-postion'>Customer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-5">
                                            <div className="reviews-main text-center position-relative">
                                                <div className="d-flex justify-content-center">
                                                    <img className="reviews-img" src={Images.reviews} alt="reviews" />
                                                </div>
                                                <div className='reviews-icon-main'>
                                                    <img className="reviews-icon" src={Images.review_icon} alt="reviews" />
                                                </div>
                                                <div className="reviews-content mt-5">
                                                    <p className="reviews-para">Excellent</p>
                                                    <p className="reviews-content-para">
                                                        I had an amazing experience with this company. The service was top-notch,
                                                        and the staff was incredibly friendly. I highly recommend them!
                                                    </p>
                                                    <div className='mt-4'>
                                                        <p className='testimonial-name'>John Doe</p>
                                                        <p className='testimonial-postion'>Customer</p>
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

                <section className='section-padding-bottom'>
                    <div className="container">
                        <div className='booking-offer-main'>
                            <div className='row'>
                                <div className='col-lg-6 p-0'>
                                    <div className='first-booking-left'>
                                        <h4 className='first-booking-head'>Get 5% off your 1st<br className='break-tag' />
                                            app booking</h4>
                                        <p className='text-white'>Booking's better on the app. Use promo code<br className='break-tag' />
                                            "TourBooking" to save!</p>
                                        <div className='get-link-input'>
                                            <p className='get-link-para'>Get a magic link sent to your email</p>
                                            <div className='mt-2'>
                                                <input type='email' placeholder='Email' />
                                                <button className='mt-lg-0 mt-3'>Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-6 p-0'>
                                    <div className='first-booking-left'>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <ContactForm />
                </section>

            </div>
        </div>
    )
}

export default Homepage