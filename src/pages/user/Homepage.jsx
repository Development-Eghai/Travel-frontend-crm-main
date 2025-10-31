import React, { useRef, useEffect, useState } from 'react'
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
import { APIBaseUrl } from "../../common/api/api";
import SearchBar from '../../component/SearchBar';
import CategorySection from '../../component/CategorySection';
import DestinationSection from '../../component/DestinationSection';
import '../../css/homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const featuredSwiperRef = useRef(null);
    const heroSwiperRef = useRef(null);
    const destinationSwiperRef = useRef(null);

    const [featuredNavState, setFeaturedNavState] = useState({ prev: false, next: true });
    const [heroNavState, setHeroNavState] = useState({ prev: true, next: true });
    const [destNavState, setDestNavState] = useState({ prev: false, next: true });

    // New states for Categories and Destinations
    const [homeCategories, setHomeCategories] = useState([]); 
    const [isLoadingCategories, setIsLoadingCategories] = useState(true); 
    const [destinations, setDestinations] = useState([]);
    const [isLoadingDestinations, setIsLoadingDestinations] = useState(true); 

    // MODAL STATE AND HANDLERS
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    // END MODAL

    const allTrips = useSelector((state) => state.home_page_slice.featured_trips);
    const lastFourTrips = allTrips.slice(-4);

    const [upcomingGroupTrips, setUpcomingGroupTrips] = useState([]);
    const [honeymoonTrips, setHoneymoonTrips] = useState([]);
    const [indiaTrips, setIndiaTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    // ADDED: Why choose us data (Copied from DestinationPreview.jsx)
    const whyChooseUs = [
        {
            icon: "fa-shield-halved",
            title: "Best Price Guarantee",
            description: "Get the best deals with our price match guarantee"
        },
        {
            icon: "fa-headset",
            title: "24/7 Support",
            description: "Round the clock customer support for all needs"
        },
        {
            icon: "fa-certificate",
            title: "Verified Tours",
            description: "All tours are verified and quality assured"
        },
        {
            icon: "fa-calendar-check",
            title: "Easy Booking",
            description: "Simple and secure booking with instant confirmation"
        }
    ];
    // END ADDED

    // ----------------------------------------------------------------
    // HANDLER & UTILITY FUNCTIONS
    // ----------------------------------------------------------------

    // Destination Slider Handlers
    const handleDestSlideChange = (swiper) => {
        setDestNavState({
            prev: !swiper.isBeginning,
            next: !swiper.isEnd,
        });
    };

    const handleDestNavClick = (direction) => {
        if (direction === 'prev') {
            destinationSwiperRef.current?.slidePrev();
        } else {
            destinationSwiperRef.current?.slideNext();
        }
    };

    // Navigation Handlers
    const handleCategoryClick = (slug, id) => {
        navigate(`/category-preview/${slug}/${id}`);
    };

    const handleDestinationClick = (slug, id) => {
        navigate(`/destination/${slug}/${id}`);
    };

    // Utility function to get minimum price from popular trips
    const getDestinationStartingPrice = (destination) => {
        if (!destination?.popular_trips || destination.popular_trips.length === 0) {
            return null;
        }

        let minPrice = Infinity;
        destination.popular_trips.forEach(trip => {
            if (trip?.pricing?.pricing_model === "customized" && trip?.pricing?.customized?.final_price) {
                minPrice = Math.min(minPrice, trip.pricing.customized.final_price);
            } else if (trip?.pricing?.fixed_departure?.length > 0) {
                trip.pricing.fixed_departure.forEach(departure => {
                    if (departure?.final_price) {
                        minPrice = Math.min(minPrice, departure.final_price);
                    }
                });
            }
        });

        return minPrice !== Infinity ? minPrice : null;
    };


    // ----------------------------------------------------------------
    // API FETCH FUNCTIONS
    // ----------------------------------------------------------------

    const getTripsByCategory = async (categoryId) => { 
        try {
            const res = await APIBaseUrl.get(`categories/trip_details/${categoryId}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                return res?.data?.data || [];
            }
            return [];
        } catch (error) {
            console.error("Error fetching trips:", error);
            return [];
        }
    };

    const getTripsByDestination = async (destinationId) => { 
        try {
            const res = await APIBaseUrl.get(`destinations/${destinationId}`, {
                headers: {
                    "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
                },
            });
            if (res?.data?.success === true) {
                return res?.data?.data?.popular_trips || [];
            }
            return [];
        } catch (error) {
            console.error("Error fetching destination trips:", error);
            return [];
        }
    };

    const fetchHomeCategories = async () => {
        setIsLoadingCategories(true);
        try {
            const res = await APIBaseUrl.get('categories', {
                headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
            });
            if (res?.data?.success === true) {
                setHomeCategories(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching home categories:", error);
        } finally {
            setIsLoadingCategories(false);
        }
    };

   
const fetchAllDestinationsWithTrips = async () => {
    setIsLoadingDestinations(true);
    try {
        // Step 1: Fetch all destinations
        const res = await APIBaseUrl.get('destinations/', {
            headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
        });
        
        console.log("Destinations API Response:", res?.data);
        
        if (res?.data?.success === true) {
            const allDestinations = res?.data?.data || [];
            console.log("All destinations:", allDestinations);
            
            // Step 2: For each destination, fetch its full details (which includes popular_trips)
            const destinationsWithTripsPromises = allDestinations.map(async (dest) => {
                try {
                    // Fetch individual destination details
                    const detailRes = await APIBaseUrl.get(`destinations/${dest.id}`, {
                        headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
                    });
                    
                    if (detailRes?.data?.success === true && detailRes?.data?.data?.popular_trips?.length > 0) {
                        return detailRes.data.data;
                    }
                    return null;
                } catch (error) {
                    console.error(`Error fetching details for destination ${dest.id}:`, error);
                    return null;
                }
            });
            
            // Step 3: Wait for all requests to complete
            const resolvedDestinations = await Promise.all(destinationsWithTripsPromises);
            
            // Step 4: Filter out nulls (destinations without trips or with errors)
            const destinationsWithTrips = resolvedDestinations.filter(dest => dest !== null);
            
            console.log("Destinations with trips:", destinationsWithTrips);
            
            setDestinations(destinationsWithTrips);
        }
    } catch (error) {
        console.error("Error fetching destinations:", error);
        console.error("Error details:", error?.response?.data);
    } finally {
        setIsLoadingDestinations(false);
    }
};


    // ----------------------------------------------------------------
    // USE EFFECT AND OTHER HANDLERS
    // ----------------------------------------------------------------

    useEffect(() => {
        const fetchAllTrips = async () => {
            setIsLoading(true);
            try {
                const [upcoming, honeymoon, india] = await Promise.all([
                    getTripsByCategory(6),
                    getTripsByCategory(2),
                    getTripsByDestination(10),
                ]);

                setUpcomingGroupTrips(upcoming.slice(0, 8));
                setHoneymoonTrips(honeymoon.slice(0, 8));
                setIndiaTrips(india.slice(0, 8));
            } catch (error) {
                console.error("Error loading trips:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Call all necessary fetches
        fetchAllTrips();
        fetchHomeCategories(); 
        fetchAllDestinationsWithTrips();
    }, []);

    const handleFeaturedSlideChange = (swiper) => {
        setFeaturedNavState({
            prev: !swiper.isBeginning,
            next: !swiper.isEnd,
        });
    };

    const handleFeaturedNavClick = (direction) => {
        if (direction === 'prev') {
            featuredSwiperRef.current?.slidePrev();
        } else {
            featuredSwiperRef.current?.slideNext();
        }
    };

    const handleHeroSlideChange = (swiper) => {
        // Always keep both arrows enabled for loop
        setHeroNavState({
            prev: true,
            next: true,
        });
    };

    const handleHeroNavClick = (direction) => {
        if (direction === 'prev') {
            heroSwiperRef.current?.slidePrev();
        } else {
            heroSwiperRef.current?.slideNext();
        }
    };


    return (
        <div className='overflow-hidden-page'>
            {/* Hero Banner with loop enabled */}
            <div className='hero-banner-reduced'>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{ clickable: true }}
                    speed={800}
                    className="mySwiper"
                    onSwiper={(swiper) => {
                        heroSwiperRef.current = swiper;
                        handleHeroSlideChange(swiper);
                    }}
                    onSlideChange={handleHeroSlideChange}
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="homepaage-banner-image-1">
                            <div className="home-banner-content">
                                <h1 className="banner-heading">Explore The World <br /> Globally</h1>
                                <p className="banner-para">Search, compare and book 15,000+ multiday tours all over the world.</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide>
                        <div className="homepaage-banner-image-2">
                            <div className="home-banner-content">
                                <h1 className="banner-heading">Discover Paradise <br /> Globally</h1>
                                <p className="banner-para">Search, compare and book 15,000+ multiday tours all over the world.</p>
                                
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 3 */}
                    <SwiperSlide>
                        <div className="homepaage-banner-image-3">
                            <div className="home-banner-content">
                                <h1 className="banner-heading">Adventure Awaits <br /> Globally</h1>
                                <p className="banner-para">Search, compare and book 15,000+ multiday tours all over the world.</p>
                            
                                {/* END ADDED */}
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Search Bar Overlay */}
                <div className='search-bar-overlay'>
                    <div className='container'>
                        <SearchBar placeholder="Where do you want to go?" />
                    </div>
                </div>

                {/* Hero Navigation Arrows - Always visible with loop */}
                <div className="hero-swiper-nav">
                    <button 
                        onClick={() => handleHeroNavClick('prev')} 
                        className="nav-btn"
                    >
                        ←
                    </button>
                    <button 
                        onClick={() => handleHeroNavClick('next')} 
                        className="nav-btn"
                    >
                        →
                    </button>
                </div>
            </div>

            <div className=''>
                
                {/* ========================================
                // SECTION 1: Explore by Categories - Circular Cards 
                // ======================================== */}
                <section className="section-padding categories-section">
                    <div className="container">
                        <div className="d-flex justify-content-between mb-4 align-items-center">
                            <h4 className="common-section-heading">Explore by Categories</h4>
                        </div>

                        {isLoadingCategories ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : homeCategories.length > 0 ? (
                            <div className="categories-grid">
                                {homeCategories.slice(0, 8).map((category) => (
                                    <div
                                        key={category.id}
                                        className="category-circle-card"
                                        onClick={() => handleCategoryClick(category.slug, category.id)}
                                    >
                                        <div className="category-circle-image">
                                            <img
                                                src={category.image?.[0] || Images.featured_card}
                                                alt={category.name}
                                            />
                                        </div>
                                        <h6 className="category-circle-name">{category.name}</h6>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-4">No categories available</p>
                        )}
                    </div>
                </section>
                {/* ========================================
                // END SECTION 1
                // ======================================== */}

                {/* Featured Trips */}
                <section className='featured-trips-section section-padding'>
                    <div className='container'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h4 className='common-section-heading'>Featured Trips</h4>
                            </div>
                            <div>
                                <div className="slider-nav slider-navigation">
                                    <button 
                                        onClick={() => handleFeaturedNavClick('prev')} 
                                        className={`nav-btn ${featuredNavState.prev ? 'active-nav-btn' : 'disabled-nav-btn'}`}
                                        disabled={!featuredNavState.prev}
                                    >
                                        ←
                                    </button>
                                    <button 
                                        onClick={() => handleFeaturedNavClick('next')} 
                                        className={`nav-btn ${featuredNavState.next ? 'active-nav-btn' : 'disabled-nav-btn'}`}
                                        disabled={!featuredNavState.next}
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="featured-slider-wrapper mt-3">
                            <Swiper
                                modules={[Navigation]}
                                slidesPerView={4}
                                pagination={{ clickable: true }}
                                slidesPerGroup={1}
                                spaceBetween={20}
                                onSwiper={(swiper) => {
                                    featuredSwiperRef.current = swiper;
                                    handleFeaturedSlideChange(swiper);
                                }}
                                onSlideChange={handleFeaturedSlideChange}
                                navigation={false}
                                breakpoints={{
                                    320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 15 },
                                    576: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 15 },
                                    768: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 20 },
                                    992: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 20 },
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

                {/* ========================================
                // SECTION 2: Popular Destinations - Slider with Prices 
                // ======================================== */}
                <section className="section-padding destination-slider-section">
                    <div className="container">
                        <div className="d-flex justify-content-between mb-4 align-items-center">
                            <h4 className="common-section-heading">Popular Destinations</h4>
                            <div className="slider-navigation">
                                <button
                                    onClick={() => handleDestNavClick('prev')}
                                    className={`nav-btn ${destNavState.prev ? 'active-nav-btn' : 'disabled-nav-btn'}`}
                                    disabled={!destNavState.prev}
                                >
                                    ←
                                </button>
                                <button
                                    onClick={() => handleDestNavClick('next')}
                                    className={`nav-btn ${destNavState.next ? 'active-nav-btn' : 'disabled-nav-btn'}`}
                                    disabled={!destNavState.next}
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        {isLoadingDestinations ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : destinations.length > 0 ? (
                            <Swiper
                                modules={[Navigation]}
                                slidesPerView={4}
                                slidesPerGroup={1}
                                spaceBetween={20}
                                onSwiper={(swiper) => {
                                    destinationSwiperRef.current = swiper;
                                    handleDestSlideChange(swiper);
                                }}
                                onSlideChange={handleDestSlideChange}
                                navigation={false}
                                breakpoints={{
                                    320: { slidesPerView: 1, slidesPerGroup: 1 },
                                    576: { slidesPerView: 2, slidesPerGroup: 1 },
                                    768: { slidesPerView: 3, slidesPerGroup: 1 },
                                    992: { slidesPerView: 4, slidesPerGroup: 1 },
                                }}
                                loop={false}
                            >
                                {destinations.map((destination) => {
                                    const startingPrice = getDestinationStartingPrice(destination);
                                    const heroImage = destination?.hero_banner_images?.[0];

                                    return (
                                        <SwiperSlide key={destination.id}>
                                            <div
                                                className="destination-slider-card"
                                                onClick={() => handleDestinationClick(destination.slug, destination.id)}
                                            >
                                                <div className="destination-slider-image">
                                                    <img
                                                        src={heroImage || Images.featured_card}
                                                        alt={destination.title}
                                                    />
                                                    <div className="destination-overlay-gradient"></div>
                                                </div>
                                                <div className="destination-slider-content">
                                                    <h5 className="destination-slider-title">{destination.title}</h5>
                                                    {startingPrice !== null && (
                                                        <div className="destination-slider-price">
                                                            <span className="price-label">Starting from</span>
                                                            <span className="price-amount">₹{startingPrice.toLocaleString()}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        ) : (
                            <p className="text-center py-4">No destinations available</p>
                        )}
                    </div>
                </section>
                {/* ========================================
                // END SECTION 2
                // ======================================== */}

                <CategorySection
                    title="Upcoming Group Trips"
                    trips={upcomingGroupTrips}
                    isLoading={isLoading}
                    link="/category-preview/group-trips/6"
                />
{/* 
                <CategorySection
                    title="Honeymoon Trips"
                    trips={honeymoonTrips}
                    isLoading={isLoading}
                    link="/category-preview/honeymoon-trips/2"
                /> */}

                {/* <DestinationSection
                    title="India Trips"
                    trips={indiaTrips}
                    isLoading={isLoading}
                    link="/destination/india/10"
                /> */}

                <section >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6 p-lg-0'>
                                <div className='offer-left'>
                                    <div>
                                        <h4 className='offer-left-heading'>Grab up to <span className='offer-span-head'>35% off </span><br className='break-tag' />
                                            on your favorite<br className='break-tag' />
                                            Destination</h4>
                                        <p>Limited time offer, don't miss the opportunity</p>
                                        <button className='offer-button' onClick={handleOpenModal}>Plan Your Trip</button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 p-lg-0'>
                                {/* Image file name changed to match uploaded content */}
                                <img src={Images.offer_right} alt="offer-right" className='w-100 h-auto' />
                            </div>
                        </div>

                    </div>
                </section>

                {/* ADDED: Why Choose Us Section (Copied from DestinationPreview.jsx) */}
                <section className="why-choose-section section-padding">
                    <div className="container">
                        <div className="section-header text-center">
                            <h4 className="common-section-heading">Why Book With Us</h4>
                            <div className="title-underline"></div>
                        </div>
                        <div className="why-choose-grid">
                            {whyChooseUs.map((item, index) => (
                                <div className="why-choose-card" key={index}>
                                    <div className="why-icon">
                                        <i className={`fa-solid ${item.icon}`}></i>
                                    </div>
                                    <h5>{item.title}</h5>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* END ADDED */}

                {/* <section className='section-padding'>
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
                                        <div className='col-lg-3 col-md-6 mb-4' key={trip.id || index}>
                                            <TripCard trip={trip} />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center py-4">No Popular Tours available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* ... (Customer Reviews Section) ... */}
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
                                                    <p className="reviews-para">Amazing Trip!</p>
                                                    <p className="reviews-content-para">
                                                        I had an amazing experience with this company. The service was top-notch,
                                                        and the staff was incredibly friendly. I highly recommend them!
                                                    </p>
                                                    <div className='mt-4'>
                                                        <p className='testimonial-name'>Jane Smith</p>
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

                <section>
                    {/* The ContactForm component is now rendered as a modal at the end */}
                </section>

            </div>
            {/* ADDED: Contact Form Modal at the root level */}
            <ContactForm isOpen={isModalOpen} onClose={handleCloseModal} />
            {/* END ADDED */}
        </div>
    )
}

export default Homepage