import React, { useState } from 'react'
import Header from './component/Header'
import Footer from './component/Footer'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Images } from "../../helpers/Images/images";
import { useNavigate } from "react-router";


const TripsDetail = () => {
    const navigate = useNavigate();

    const bannerImages = [
        Images?.destination_one,
        Images?.destination_two,
        Images?.destination_three
    ];

    return (
        <div className=''>
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
                    {bannerImages.map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="destination-slide"
                                style={{
                                    backgroundImage: `url(${imageUrl})`,
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
            </section>

            <div className='trip-detail-content-main'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='trip-detail-left'>
                                <h2 className='trip-detail-heading'>11 Days European Pathways Community Trip - France, Netherlands, Germany, Czechia</h2>

                                <div className='d-flex trip-pickup-parent'>
                                    <div className='trip-pickup-drop me-4'>
                                        <div>
                                            <i class="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p>Pickup & Drop</p>
                                            <h3>Paris Airport - Prague Airport</h3>
                                        </div>
                                    </div>
                                    <div className='trip-pickup-drop'>
                                        <div>
                                            <i class="fa-solid fa-clock"></i>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p>Duration </p>
                                            <h3>10N - 11D</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className='trip-detail-tabs-main'>
                                    <div className='tip-detail-tabs active'>
                                        <p>Overview & Highlights</p>
                                    </div>
                                    <div className='tip-detail-tabs'>
                                        <p>Itinerary</p>
                                    </div>
                                    <div className='tip-detail-tabs'>
                                        <p>Inclusions</p>
                                    </div>
                                    <div className='tip-detail-tabs'>
                                        <p>Exclusions</p>
                                    </div>
                                    <div className='tip-detail-tabs'>
                                        <p>Other Info</p>
                                    </div>
                                </div>

                                <div className='trip-detail-section'>
                                    <h3>Overview & Highlights</h3>
                                    <p className='mt-3'>
                                        Join us as we take you to some of the dreamiest places in the world. We are talking about our amazing Backpacking Trip to Europe, covering Czechia, Germany, the Netherlands, and France in 11 days!
                                        This unforgettable adventure offers the perfect blend of guided tours and leisure time, ensuring you experience the best of each destination. Explore iconic cities with hop-on-hop-off bus tours, giving you a brief look at landmarks like the Eiffel Tower, and Prague’s Astronomical Clock.
                                        Soak in the charm of Paris with a peaceful Seine River cruise, offering mesmerizing views of historic landmarks such as Notre Dame and the Louvre. Experience the vibrant nightlife with pub crawls in Amsterdam and Prague, immersing yourself in the local culture and making new friends along the way. Marvel at the picturesque Zaanse Schans village, famous for its historic windmills and quaint wooden houses.
                                        Discover Amsterdam's rich brewing heritage with a fascinating tour of the Heineken Brewery, complete with a tasting session. Enjoy a classic canal cruise through the heart of Amsterdam, taking in the city's unique architecture and lively atmosphere. Wander through the streets of Paris, Berlin and Amsterdam at your own pace, indulging in local delicacies, visiting charming cafes, and shopping for souvenirs.
                                        This meticulously crafted itinerary by WanderOn promises an adventure filled with culture, history, and unforgettable memories. Join us on this journey and create stories that you’ll cherish for a lifetime!
                                    </p>
                                    <p className='read-more'>Read More</p>
                                </div>

                                <div className='trip-detail-section'>
                                    <h3>Itinerary</h3>
                                    <div className="container">
                                        <div className='trip-detail-faqs mt-4'>
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingOne">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            <p className='trip-faq-accordion'>Day 1</p>  Can I get the refund?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <p>Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat cancellation policy: For a full
                                                                refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Phang Nga Bay
                                                                Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingTwo">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                            Can I change the travel date?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <p>Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat cancellation policy: For a full
                                                                refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Phang Nga Bay
                                                                Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat.</p>                                    </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id="headingThree">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                            When and where does the tour end?
                                                        </button>
                                                    </h2>
                                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <p>Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat cancellation policy: For a full
                                                                refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Phang Nga Bay
                                                                Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat.</p>                                           </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='trip-detail-section inclusion'>
                                    <h3>Inclusions</h3>
                                    <p className='mt-4'>
                                        Join us as we take you to some of the dreamiest places in the world. We are talking about our amazing Backpacking Trip to Europe, covering Czechia, Germany, the Netherlands, and France in 11 days!
                                        This unforgettable adventure offers the perfect blend of guided tours and leisure time, ensuring you experience the best of each destination. Explore iconic cities with hop-on-hop-off bus tours, giving you a brief look at landmarks like the Eiffel Tower, and Prague’s Astronomical Clock.
                                        Soak in the charm of Paris with a peaceful Seine River cruise, offering mesmerizing views of historic landmarks such as Notre Dame and the Louvre. Experience the vibrant nightlife with pub crawls in Amsterdam and Prague, immersing yourself in the local culture and making new friends along the way. Marvel at the picturesque Zaanse Schans village, famous for its historic windmills and quaint wooden houses.
                                        Discover Amsterdam's rich brewing heritage with a fascinating tour of the Heineken Brewery, complete with a tasting session. Enjoy a classic canal cruise through the heart of Amsterdam, taking in the city's unique architecture and lively atmosphere. Wander through the streets of Paris, Berlin and Amsterdam at your own pace, indulging in local delicacies, visiting charming cafes, and shopping for souvenirs.
                                        This meticulously crafted itinerary by WanderOn promises an adventure filled with culture, history, and unforgettable memories. Join us on this journey and create stories that you’ll cherish for a lifetime!
                                    </p>
                                </div>

                                <div className='trip-detail-section exclusions'>
                                    <h3>Inclusions</h3>
                                    <p className='mt-4'>
                                        Join us as we take you to some of the dreamiest places in the world. We are talking about our amazing Backpacking Trip to Europe, covering Czechia, Germany, the Netherlands, and France in 11 days!
                                        This unforgettable adventure offers the perfect blend of guided tours and leisure time, ensuring you experience the best of each destination. Explore iconic cities with hop-on-hop-off bus tours, giving you a brief look at landmarks like the Eiffel Tower, and Prague’s Astronomical Clock.
                                        Soak in the charm of Paris with a peaceful Seine River cruise, offering mesmerizing views of historic landmarks such as Notre Dame and the Louvre. Experience the vibrant nightlife with pub crawls in Amsterdam and Prague, immersing yourself in the local culture and making new friends along the way. Marvel at the picturesque Zaanse Schans village, famous for its historic windmills and quaint wooden houses.
                                        Discover Amsterdam's rich brewing heritage with a fascinating tour of the Heineken Brewery, complete with a tasting session. Enjoy a classic canal cruise through the heart of Amsterdam, taking in the city's unique architecture and lively atmosphere. Wander through the streets of Paris, Berlin and Amsterdam at your own pace, indulging in local delicacies, visiting charming cafes, and shopping for souvenirs.
                                        This meticulously crafted itinerary by WanderOn promises an adventure filled with culture, history, and unforgettable memories. Join us on this journey and create stories that you’ll cherish for a lifetime!
                                    </p>
                                </div>

                                <div className='trip-detail-section'>
                                    <h3>Other Info </h3>
                                    <p className='mt-3'>
                                        Join us as we take you to some of the dreamiest places in the world. We are talking about our amazing Backpacking Trip to Europe, covering Czechia, Germany, the Netherlands, and France in 11 days!
                                        This unforgettable adventure offers the perfect blend of guided tours and leisure time, ensuring you experience the best of each destination. Explore iconic cities with hop-on-hop-off bus tours, giving you a brief look at landmarks like the Eiffel Tower, and Prague’s Astronomical Clock.
                                        Soak in the charm of Paris with a peaceful Seine River cruise, offering mesmerizing views of historic landmarks such as Notre Dame and the Louvre. Experience the vibrant nightlife with pub crawls in Amsterdam and Prague, immersing yourself in the local culture and making new friends along the way. Marvel at the picturesque Zaanse Schans village, famous for its historic windmills and quaint wooden houses.
                                        Discover Amsterdam's rich brewing heritage with a fascinating tour of the Heineken Brewery, complete with a tasting session. Enjoy a classic canal cruise through the heart of Amsterdam, taking in the city's unique architecture and lively atmosphere. Wander through the streets of Paris, Berlin and Amsterdam at your own pace, indulging in local delicacies, visiting charming cafes, and shopping for souvenirs.
                                        This meticulously crafted itinerary by WanderOn promises an adventure filled with culture, history, and unforgettable memories. Join us on this journey and create stories that you’ll cherish for a lifetime!
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-4'>

                            <div className='trip-detail-right'>
                                <div className='trip-detail-price-card'>
                                    <p className='mb-1'>Starting from</p>

                                    <div className='d-flex'>
                                        <p className='trip-price'>₹ 10,000/-</p>
                                        <p className='trip-price-per'>Per Person</p>
                                    </div>

                                    <button onClick={() => navigate('/trips-bookings')}>Dates & Pricing</button>
                                </div>
                            </div>

                            <div className='trip-detail-right'>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripsDetail
