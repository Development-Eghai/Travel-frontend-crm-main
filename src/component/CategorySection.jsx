import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import TripCard from './TripCard';

const CategorySection = ({ title, trips = [], isLoading, link }) => {
  const swiperRef = useRef(null);
  const [navState, setNavState] = useState({ prev: false, next: true });
  // NEW STATE: To track if any modal is open in this section
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // NEW HANDLER: To manage modal open/close and temporary overflow fix
  const handleModalToggle = (shouldOpen, targetElement = null) => {
    setIsModalOpen(shouldOpen);
    
    // Attempt to temporarily fix clipping on the active slide container
    if (shouldOpen && targetElement) {
      // Find the direct parent SwiperSlide element
      let slideElement = targetElement.closest('.swiper-slide');
      if (slideElement) {
        slideElement.style.overflow = 'visible';
        slideElement.style.zIndex = '999999'; // Ensure the active slide is on top
      }
    } else {
      // When closing, reset all slides (safer than trying to find the one active)
      if (swiperRef.current?.slides) {
        swiperRef.current.slides.forEach(slide => {
          slide.style.overflow = ''; // Reset CSS property
          slide.style.zIndex = '';
        });
      }
    }
  };

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
            {/* Navigation Arrows - Disabled while modal is open */}
            <div className="slider-navigation">
              <button 
                onClick={() => handleNavClick('prev')} 
                className={`nav-btn ${navState.prev ? 'active-nav-btn' : 'disabled-nav-btn'}`}
                disabled={!navState.prev || isModalOpen} // Disabled while modal is open
              >
                ←
              </button>
              <button 
                onClick={() => handleNavClick('next')} 
                className={`nav-btn ${navState.next ? 'active-nav-btn' : 'disabled-nav-btn'}`}
                disabled={!navState.next || isModalOpen} // Disabled while modal is open
              >
                →
              </button>
            </div>
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
              // Set overflow visible globally on the Swiper wrapper to aid fixed positioning
              style={{ overflow: 'visible' }} 
            >
              {trips.map((trip, index) => (
                <SwiperSlide key={trip.id || index}>
                  {/* PASS THE NEW HANDLER TO TRIPCARD */}
                  <TripCard 
                    trip={trip} 
                    onModalToggle={handleModalToggle} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center py-4">No {title.toLowerCase()} available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
