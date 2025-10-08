import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const HomeBanner = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        destination: ''
    });
    const [isSearching, setIsSearching] = useState(false);

    const popularDestinations = [
        'Paris, France',
        'Bali, Indonesia',
        'Tokyo, Japan',
        'New York, USA',
        'London, UK',
        'Dubai, UAE',
        'Singapore',
        'Bangkok, Thailand'
    ];

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = () => {
        if (!searchData.destination.trim()) return;
        
        setIsSearching(true);
        
        // Simulate a brief loading state for better UX
        setTimeout(() => {
            // Navigate to travel form page
            console.log('Search data:', searchData);
            
            // Navigate to travel form page
            navigate('/travel-form');
        }, 500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearchBarClick = (e) => {
        // Prevent event bubbling to avoid multiple navigation
        e.stopPropagation();
        // Navigate to travel form page when search bar is clicked
        navigate('/travel-form');
    };

    return (
        <>
            <section className='overflow-hidden'>
                <div className="banner-container">
                    {/* Static Search Bar */}
                    {/* <div className="static-search-bar-container">
                        <div className="search-bar-container">
                            <div className="search-bar" onClick={handleSearchBarClick}>
                                <div className="search-input-group">
                                    <div className="search-input-wrapper">
                                        <i className="fa-solid fa-search search-icon" onClick={handleSearchBarClick}></i>
                                        <input
                                            type="text"
                                            name="destination"
                                            value={searchData.destination}
                                            onChange={handleSearchChange}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Search countries, cities"
                                            className="search-input"
                                            list="destinations"
                                        />
                                        <datalist id="destinations">
                                            {popularDestinations.map((dest, index) => (
                                                <option key={index} value={dest} />
                                            ))}
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Background Slider */}
                    <div className="banner-slider-container">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            speed={1200}
                            slidesPerView={1}
                            className="homepage-banner-swiper"
                        >
                            <SwiperSlide>
                                <div className="homepaage-banner-image-1">
                                    <div className="home-banner-content">
                                        <p className="banner-para">
                                            Search, compare and book 15,000+ multiday tours all over the world.
                                        </p>
                                        <h1 className="banner-heading">
                                            Tours and Trip packages <br className="break-tag" /> Globally
                                        </h1>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="homepaage-banner-image-2">
                                    <div className="home-banner-content">
                                        <p className="banner-para">
                                            Search, compare and book 15,000+ multiday tours all over the world.
                                        </p>
                                        <h1 className="banner-heading">
                                            Tours and Trip packages <br className="break-tag" /> Globally
                                        </h1>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeBanner
