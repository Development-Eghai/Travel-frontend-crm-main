import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import TripCard from "./TripCard";

const DestinationSection = ({ title, trips = [], isLoading, link }) => {
  const swiperRef = useRef(null);
  const [navState, setNavState] = useState({ prev: false, next: true });
  // Removed: isModalOpen state

  const handleSlideChange = (swiper) => {
    setNavState({
      prev: !swiper.isBeginning,
      next: !swiper.isEnd,
    });
  };

  const handleNavClick = (direction) => {
    if (direction === 'prev') {
      swiperRef.current?.slidePrev();
    } else {
      swiperRef.current?.slideNext();
    }
  };

  // Removed: handleModalToggle function

  return (
    <section className="section-padding">
      <div className="container">
        {/* Section Header with Navigation */}
        <div className="d-flex justify-content-between mb-4 align-items-center">
          <h4 className="common-section-heading">{title}</h4>
          <div className="d-flex align-items-center gap-3">
            {link && (
              <a href={link} className="anchor-tag">
                See all
              </a>
            )}
            {/* Navigation Arrows */}
            {trips.length > 4 && (
              <div className="slider-navigation">
                <button 
                  onClick={() => handleNavClick('prev')} 
                  className={`nav-btn ${navState.prev ? 'active-nav-btn' : 'disabled-nav-btn'}`}
                  disabled={!navState.prev} // Removed: || isModalOpen
                >
                  ←
                </button>
                <button 
                  onClick={() => handleNavClick('next')} 
                  className={`nav-btn ${navState.next ? 'active-nav-btn' : 'disabled-nav-btn'}`}
                  disabled={!navState.next} // Removed: || isModalOpen
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section Content */}
        <div className="row">
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : trips.length > 0 ? (
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              slidesPerGroup={1}
              spaceBetween={20}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                handleSlideChange(swiper);
              }}
              onSlideChange={handleSlideChange}
              navigation={false}
              breakpoints={{
                320: { slidesPerView: 1, slidesPerGroup: 1 },
                576: { slidesPerView: 2, slidesPerGroup: 1 },
                768: { slidesPerView: 3, slidesPerGroup: 1 },
                992: { slidesPerView: 4, slidesPerGroup: 1 },
              }}
              loop={false}
              // Removed: style={{ overflow: 'visible' }} 
            >
              {trips.map((trip, index) => (
                <SwiperSlide key={trip.id || index}>
                  {/* Removed: onModalToggle prop */}
                  <TripCard 
                    trip={trip} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center py-4">No trips available for {title.toLowerCase()}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
