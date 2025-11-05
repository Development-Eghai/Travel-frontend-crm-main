import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useParams } from "react-router";
import ContactForm from "../ContactForm/ContactForm";
import { APIBaseUrl } from "../../../../common/api/api";
import TripCard from '../../../../component/TripCard';
import "../../../../css/DestinationPreview.css";

const DestinationPreview = () => {
  const { id } = useParams();
  const [destinationContent, setDestinationContent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const getSpecificDestination = async () => {
    try {
      const res = await APIBaseUrl.get(`destinations/${id}`, {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true && res?.data?.error_code === 200) {
        setDestinationContent(res?.data?.data)
      }
    } catch (error) {
      console.error("Error fetching destination:", error?.response?.data || error.message);
    }
  }

  useEffect(() => {
    getSpecificDestination();
  }, [id]);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      const contentHeight = contentEl.scrollHeight;
      const containerHeight = 120;
      setShowReadMore(contentHeight > containerHeight);
    }
  }, [destinationContent]);

  const trips = destinationContent?.popular_trips || [];
  const [visibleCount, setVisibleCount] = useState(4);

  const handleToggle = () => {
    if (visibleCount >= trips.length) {
      setVisibleCount(4);
    } else {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const [expandedSections, setExpandedSections] = useState({});

  const toggleViewMore = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Stats data
  const destinationStats = [
    { icon: "fa-map-location-dot", value: trips.length + "+", label: "Tour Packages" },
    { icon: "fa-users", value: "10K+", label: "Happy Travelers" },
    { icon: "fa-mountain", value: "50+", label: "Destinations" },
    { icon: "fa-star", value: "4.8", label: "Average Rating" }
  ];

  // Why choose us
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

  return (
    <div className="destination-landing-page">
      {/* Hero Banner */}
      <section className="destination-detail-banner-main">
        {destinationContent?.hero_banner_images?.length > 0 && (
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
            {destinationContent.hero_banner_images.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <div
                  className="destination-slide swiper-slider-banners"
                  style={{
                    backgroundImage: `url(${encodeURI(imageUrl)})`,
                  }}
                >
                  <div className="destination-overlay"></div>
                  <div className="destination-slide-content">
                    <h1 className="dest-package-name text-center">
                      {destinationContent?.title}
                    </h1>
                    <p className="dest-package-para">
                      {destinationContent?.subtitle}
                    </p>
                    <div className="hero-cta-buttons">
                      <button className="cta-primary" onClick={handleOpenModal}>
                        <i className="fa-solid fa-paper-plane me-2"></i>
                        Get Free Quote
                      </button>
                      <button className="cta-secondary" onClick={() => {
                        document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}>
                        <i className="fa-solid fa-compass me-2"></i>
                        Explore Packages
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* Quick Stats Section */}
      <section className="destination-stats-section">
        <div className="container">
          <div className="row">
            {destinationStats.map((stat, index) => (
              <div className="col-lg-3 col-md-6 mb-4 mb-lg-0" key={index}>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className={`fa-solid ${stat.icon}`}></i>
                  </div>
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Destination */}
      <section className="about-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Discover {destinationContent?.title}</h2>
            <div className="title-underline"></div>
          </div>

          <div className={`about-content ${readMore ? "expanded" : ""}`}>
            <div ref={contentRef}>
              <div
                dangerouslySetInnerHTML={{
                  __html: destinationContent?.overview || "<p>No description available</p>",
                }}
              ></div>
            </div>
            {showReadMore && (
              <button
                className="read-more-btn"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="packages-section" id="packages-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Popular Trip Packages</h2>
            <div className="title-underline"></div>
          </div>

          <div className="packages-grid">
            {trips.slice(0, visibleCount).map((trip, index) => (
              <div className="package-item" key={index}>
                <TripCard trip={trip} />
              </div>
            ))}
          </div>

          {trips.length > 4 && (
            <div className="text-center mt-4">
              <button className="view-more-btn" onClick={handleToggle}>
                {visibleCount >= trips.length ? (
                  <>
                    Show Less <i className="fa-solid fa-chevron-up ms-2"></i>
                  </>
                ) : (
                  <>
                    View More Packages <i className="fa-solid fa-chevron-down ms-2"></i>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Custom Packages */}
      {destinationContent?.custom_packages?.map((pkg, pkgIndex) => {
        const isExpanded = expandedSections[pkgIndex];
        const tripsToShow = isExpanded ? pkg.trips : pkg.trips.slice(0, 4);

        return (
          <section className="packages-section" key={pkgIndex}>
            <div className="container">
              <div className="section-header text-center">
                <h2 className="section-title">{pkg.title}</h2>
                <div className="title-underline"></div>
                {pkg.description && (
                  <p className="section-subtitle">{pkg.description}</p>
                )}
              </div>

              <div className="packages-grid">
                {tripsToShow.map((trip, index) => (
                  <div className="package-item" key={index}>
                    <TripCard trip={trip} />
                  </div>
                ))}
              </div>

              {pkg.trips.length > 4 && (
                <div className="text-center mt-4">
                  <button
                    className="view-more-btn"
                    onClick={() => toggleViewMore(pkgIndex)}
                  >
                    {isExpanded ? (
                      <>
                        Show Less <i className="fa-solid fa-chevron-up ms-2"></i>
                      </>
                    ) : (
                      <>
                        View More <i className="fa-solid fa-chevron-down ms-2"></i>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Book With Us</h2>
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

      {/* Travel Guidelines */}
      <section className="guidelines-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">{destinationContent?.title} Travel Guidelines</h2>
            <div className="title-underline"></div>
          </div>

          <div className="guidelines-content">
            <div
              dangerouslySetInnerHTML={{
                __html: destinationContent?.travel_guidelines || "<p>No guidance available</p>",
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Explore {destinationContent?.title}?</h2>
              <p className="cta-text">
                Book your dream vacation today and create unforgettable memories
              </p>
              <button className="cta-button" onClick={handleOpenModal}>
                <i className="fa-solid fa-phone me-2"></i>
                Contact Us Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default DestinationPreview;