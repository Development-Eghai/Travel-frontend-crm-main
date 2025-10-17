import React, { useEffect, useRef, useState } from "react";
import Header from "../../../user/component/Header";
import Footer from "../../../user/component/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Images } from "../../../../helpers/Images/images";
import { useNavigate, useParams } from "react-router";
import {
  GetChildDestination,
  GetSpecificDestination,
} from "../../../../common/api/ApiService";
import { BACKEND_DOMAIN } from "../../../../common/api/ApiClient";
import TopHeader from "../../../../container/TopHeader";
import ContactForm from "../ContactForm/ContactForm";
import { APIBaseUrl } from "../../../../common/api/api";
import { de } from "date-fns/locale";

const DestinationPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [destinationContent, setDestinationContent] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const sectionTabs = [
    {
      id: 1,
      name: "Overview",
    },
    // {
    //     id: 2,
    //     name: 'Best Time To Visit'
    // },
    // {
    //     id: 3,
    //     name: 'How To Reach'
    // },
    // {
    //     id: 4,
    //     name: 'Places To Visit'
    // },
    // {
    //     id: 5,
    //     name: 'Things To do'
    // },
    // {
    //     id: 6,
    //     name: 'Travel Guide Tips'
    // }
  ];

  const [readMore, setReadMore] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

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
      console.error("Error fetching trips:", error?.response?.data || error.message);
      throw error;
    }
  }


  useEffect(() => {
    getSpecificDestination();
  }, []);

  const contentRef = useRef(null);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (contentEl) {
      const contentHeight = contentEl.scrollHeight;
      const containerHeight = 70;
      setShowReadMore(contentHeight > containerHeight);
    }
  }, [destinationContent]);
  console.log(destinationContent, "destinationContent");


  const trips = destinationContent?.popular_trips || [];
  const [visibleCount, setVisibleCount] = useState(4); // 👈 show 4 trips initially

  const handleToggle = () => {
    if (visibleCount >= trips.length) {
      // 👇 If all shown → collapse back to 4
      setVisibleCount(4);
    } else {
      // 👇 Show 4 more each click
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

  return (
    <div className="">
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
          {destinationContent?.hero_banner_images?.map((imageUrl) => (
            <SwiperSlide>
              <div
                className="destination-slide swiper-slider-banners"
                style={{
                  backgroundImage: `url(${encodeURI(imageUrl)})`,
                }}
              >
                <div className="destination-overlay"></div>
                <div className="destination-slide-content">
                  <h3 className="dest-package-name text-center">
                    {destinationContent?.title}
                  </h3>
                  <p className="dest-package-para">
                    {destinationContent?.subtitle}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* <section className="destination-tabsection-parent">
        <div className="container">
          <div className="destination-tabsection">
            {sectionTabs.map((item, index) => (
              <div
                className={`destination-tabs ${activeTab === index ? "active" : ""}`}
                key={item.id}
                onClick={() => setActiveTab(index)}
              >
                <a>{item.name}</a>
              </div>
            ))}
            <button onClick={handleOpenModal}>Get Free Quote</button>
          </div>
        </div>
      </section> */}

      {activeTab === 0 && (
        <>
          <section className="section-padding">
            <div className="container">
              <div className="destination-about-tour">
                <div
                  className={`destination-read-less-main ${readMore ? "d-flex" : "d-none"}`}
                >
                  <button
                    className="destination-read-less-btn"
                    onClick={() => setReadMore(!readMore)}
                  >
                    Read Less
                  </button>
                </div>

                <h5 className="fw-bold mb-4">
                  About {destinationContent?.title} Packages
                </h5>

                <div
                  className={`destination-about-tour-content ${readMore ? "destination-about-tour-content-expand" : ""}`}
                >
                  {showReadMore && (
                    <div className="destination-read-more-main">
                      <button
                        className="destination-read-more-btn"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Read Less..." : "Read More..."}
                      </button>
                    </div>
                  )}
                  <div ref={contentRef}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          destinationContent?.overview ||
                          "<p>No description available</p>",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding-bottom">
            <div className="container">
              <div>
                <h4 className="common-section-heading">
                  Popular Trip Packages
                </h4>
              </div>

              <div className="mt-4">

                <div className="row">
                  {trips.slice(0, visibleCount).map((trip, index) => (
                    <div className="col-lg-3 col-md-6" key={index}>
                      <div className="featured-card-main">
                        <div className='position-relative'>
                          <div>
                            <img className="featured-card-img" src={Images.featured_card} alt="featured" />
                          </div>

                          <div className='featured-card-day-card'>
                            <p>{`${trip?.days} Days`} {`${trip?.nights} Nights`} </p>
                          </div>

                        </div>

                        <div className="featured-content-main">
                          <p className="featured-city-para">
                            <p className="featured-city-para">
                              {`${trip?.pickup_location} → ${trip?.drop_location}`.length > 30
                                ? `${trip?.pickup_location} → ${trip?.drop_location}`.slice(0, 30) + "..."
                                : `${trip?.pickup_location} → ${trip?.drop_location}`}
                            </p>
                          </p>

                          <p className="featured-content">
                            {trip?.pricing?.pricing_model === "customized" ? (

                              <>
                                <span>₹{trip?.pricing?.customized?.base_price}</span>
                                ₹{trip?.pricing?.customized?.final_price}
                              </>

                            ) : (
                              <>
                                <span>₹{trip?.pricing?.fixed_departure[0]?.base_price}</span>
                                ₹{trip?.pricing?.fixed_departure[0]?.final_price}
                              </>
                            )}
                          </p>
                          <div className="featured-bottom-content d-flex gap-2">
                            <div className='trip-card-amount'>
                              <p className="" onClick={() => window.open(`/trip-preview/${trip?.slug}/${trip?.id}`, "_blank", "noopener,noreferrer")}                                                            >
                                Trip Detail
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {trips.length > 4 && (
                    <div className="destination-viewall-main d-flex justify-content-center mt-4">
                      <button className="destination-viewall" onClick={handleToggle}>
                        {visibleCount >= trips.length ? "Show Less" : "Show More"}
                        <i
                          className={`fa-solid ms-2 ${visibleCount >= trips.length ? "fa-arrow-up" : "fa-arrow-right"
                            }`}
                        ></i>
                      </button>
                    </div>
                  )}



                </div>
              </div>
            </div>
          </section>

          <section className="section-padding-bottom">
            <div className="container">
              {destinationContent?.custom_packages?.map((pkg, pkgIndex) => {
                const isExpanded = expandedSections[pkgIndex];
                const tripsToShow = isExpanded
                  ? pkg.trips
                  : pkg.trips.slice(0, 4); // show first 4 initially

                return (
                  <div key={pkgIndex} className="mb-5">
                    <div>
                      <h4 className="common-section-heading">{pkg.title}</h4>
                    </div>

                    <div className="mt-4">
                      <div className="row">
                        {tripsToShow.map((trip, index) => (
                          <div className="col-lg-3 col-md-6 mb-4" key={index}>
                            <div className="featured-card-main">
                              <div className='position-relative'>
                                <div>
                                  <img className="featured-card-img" src={Images.featured_card} alt="featured" />
                                </div>

                                <div className='featured-card-day-card'>
                                  <p>{`${trip?.days} Days`} {`${trip?.nights} Nights`} </p>
                                </div>

                              </div>

                              <div className="featured-content-main">
                                <p className="featured-city-para">
                                  <p className="featured-city-para">
                                    {`${trip?.pickup_location} → ${trip?.drop_location}`.length > 30
                                      ? `${trip?.pickup_location} → ${trip?.drop_location}`.slice(0, 30) + "..."
                                      : `${trip?.pickup_location} → ${trip?.drop_location}`}
                                  </p>
                                </p>

                                <p className="featured-content">
                                  {trip?.pricing?.pricing_model === "customized" ? (

                                    <>
                                      <span>₹{trip?.pricing?.customized?.base_price}</span>
                                      ₹{trip?.pricing?.customized?.final_price}
                                    </>

                                  ) : (
                                    <>
                                      <span>₹{trip?.pricing?.fixed_departure[0]?.base_price}</span>
                                      ₹{trip?.pricing?.fixed_departure[0]?.final_price}
                                    </>
                                  )}
                                </p>
                                <div className="featured-bottom-content d-flex gap-2">
                                  <div className='trip-card-amount'>
                                    <p className="" onClick={() => window.open(`/trip-preview/${trip?.slug}/${trip?.id}`, "_blank", "noopener,noreferrer")}                                                            >
                                      Trip Detail
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Show More / Show Less */}
                        <div className="d-flex justify-content-center">
                          {pkg.trips.length > 4 && (
                            <button
                              className="destination-viewall btn btn-outline-dark mt-3"
                              onClick={() => toggleViewMore(pkgIndex)}
                            >
                              {isExpanded ? (
                                <>
                                  Show Less{" "}
                                  <i className="fa-solid fa-arrow-up ms-2"></i>
                                </>
                              ) : (
                                <>
                                  Show More{" "}
                                  <i className="fa-solid fa-arrow-down ms-2"></i>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* <section className="section-padding-bottom">
            <div className="container">
              <div>
                <h4 className="common-section-heading text-center">
                  Frequently Asked Questions
                </h4>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="tour-overview-faqs mt-5">
                  <div className="accordion" id="accordionExample">
                    {destinationContent?.faqs?.map((faq, index) => (
                      <div className="accordion-item" key={index}>
                        <h2 className="accordion-header" id={`faqs${index}`}>
                          <button
                            className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faqsCollapse${index}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                            aria-controls={`faqsCollapse${index}`}
                          >
                            {faq?.faq_question}
                          </button>
                        </h2>
                        <div
                          id={`faqsCollapse${index}`}
                          className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                          aria-labelledby={`faqs${index}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>{faq?.faq_answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <section className="section-padding-bottom">
            <div className="container">
              <div>
                <h4 className="common-section-heading travel-guidence-head">
                  Europe Travel Guidelines
                </h4>
              </div>

              <div className="destionation-travel-guidence">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      destinationContent?.travel_guidelines ||
                      "<p>No Guidance available</p>",
                  }}
                ></p>
              </div>
            </div>
          </section>

          {/* <section className="section-padding-bottom">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-11 col-md-10 col-lg-8">
                  <div className="destination-enquiry-form p-3 p-md-4 p-lg-5 shadow-sm rounded-3 bg-white">
                    <h5 className="fw-bold text-center text-md-start mb-4">
                      Don’t Just Dream, Travel!🔥
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* <section className="section-padding-bottom">
            <div className="container">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="common-section-heading">Travel Articles</h4>
                </div>
                <div>
                  <a href="/" className="anchor-tag">
                    See all
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="blogs-card-main mt-4 position-relative">
                    <div>
                      <img
                        className="blogs-card-img"
                        src={Images.featured_card}
                        alt="featured"
                      />
                      <div className="blogs-tag-main">
                        <p>Trips</p>
                      </div>
                    </div>
                    <div className="blogs-content-main">
                      <div className="d-flex mt-4">
                        <p className="blogs-author">April 06 2023</p>
                        <p className="blogs-posted">By Ali Tufan</p>
                      </div>
                      <p className="blogs-content mt-2">
                        Kenya vs Tanzania Safari: The Better African Safari
                        Experience
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="blogs-card-main mt-4 position-relative">
                    <div>
                      <img
                        className="blogs-card-img"
                        src={Images.featured_card}
                        alt="featured"
                      />
                      <div className="blogs-tag-main">
                        <p>Trips</p>
                      </div>
                    </div>
                    <div className="blogs-content-main">
                      <div className="d-flex mt-4">
                        <p className="blogs-author">April 06 2023</p>
                        <p className="blogs-posted">By Ali Tufan</p>
                      </div>
                      <p className="blogs-content mt-2">
                        Kenya vs Tanzania Safari: The Better African Safari
                        Experience
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="blogs-card-main mt-4 position-relative">
                    <div>
                      <img
                        className="blogs-card-img"
                        src={Images.featured_card}
                        alt="featured"
                      />
                      <div className="blogs-tag-main">
                        <p>Trips</p>
                      </div>
                    </div>
                    <div className="blogs-content-main">
                      <div className="d-flex mt-4">
                        <p className="blogs-author">April 06 2023</p>
                        <p className="blogs-posted">By Ali Tufan</p>
                      </div>
                      <p className="blogs-content mt-2">
                        Kenya vs Tanzania Safari: The Better African Safari
                        Experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </>
      )}

      {activeTab === 1 && (
        <>
          <div className="container">
            <h1 className="my-5">Best Time To Visit Bangkok</h1>
          </div>
        </>
      )}

      {activeTab === 2 && (
        <>
          <div className="container">
            <h1 className="my-5">How to Go to Bangkok</h1>
          </div>
        </>
      )}

      {activeTab === 3 && (
        <>
          <div className="container">
            <section className="section-padding">
              <div className="container">
                <div className="destination-about-tour">
                  <div
                    className={`destination-read-less-main ${readMore ? "d-flex" : "d-none"}`}
                  >
                    <button
                      className="destination-read-less-btn"
                      onClick={() => setReadMore(!readMore)}
                    >
                      Read Less
                    </button>
                  </div>

                  <h5 className="fw-bold mb-4">Tourist Places In Bangkok</h5>
                  <div
                    className={`destination-about-tour-content ${readMore ? "destination-about-tour-content-expand" : "destination-about-tour-content"}`}
                  >
                    <div className="destination-read-more-main">
                      <button
                        className="destination-read-more-btn"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Read Less..." : "Read More..."}
                      </button>
                    </div>
                    <p>
                      Welcome to a realm where history and culture seamlessly
                      converge, eagerly awaiting your exploration through our
                      meticulously curated Georgia tour package. If you crave
                      breathtaking landscapes, ancient monuments, and a
                      thrilling sense of adventure at every turn, then our
                      diverse selection of Georgia trip packages is precisely
                      what you need. From vibrant cities to tranquil
                      countrysides, each Georgia tour package promises an
                      unforgettable adventure. Immerse yourself in an
                      extraordinary journey with our top-tier Georgia trip
                      packages that cater to every traveler’s fantasy. Let's
                      embark on this incredible adventure together! Top
                      Attractions Included in Georgia Travel Packages Embark on
                      a journey through the wonders of Georgia with our
                      meticulously crafted Georgia tour package. Discover the
                      rich history, vibrant culture, and stunning natural
                      landscapes that await you in this enchanting country,
                      where every destination offers a new adventure and every
                      moment is worth savoring. With that said, scroll down and
                      check out all the places which you will explore with our
                      Georgia Tour Packages. 1. Narikala Fortress Included in
                      nearly every Georgia trip package, this ancient
                      fortification offers panoramic views of Tbilisi and stands
                      as a testament to the region's rich history and
                      resilience. Dating back to the 4th century, it's a
                      must-visit attraction. Walking through its grounds, you
                      can feel the echoes of the past, with each stone narrating
                      tales of bygone eras. Whether day or night, the fortress
                      imbues your trip to Georgia with a sense of awe and
                      historical wonder. 2. Mtskheta Highlighted in most Georgia
                      travel packages, this UNESCO World Heritage site is known
                      as the religious heart of Georgia. Key sites include the
                      Svetitskhoveli Cathedral and the historic Jvari Monastery,
                      both offering profound insights into Georgia's Christian
                      heritage. Strolling through Mtskheta, you will be immersed
                      in centuries-old traditions and spiritual significance,
                      making your tour to Georgia an enriching experience filled
                      with historical and cultural discovery. 3. Kazbegi Region
                      Kazbegi Region: A highlight for nature enthusiasts on a
                      tour to Georgia, this area is famed for the majestic Mount
                      Kazbek and the Gergeti Trinity Church. Included in most
                      Georgia holiday packages from India, this region's
                      breathtaking landscapes provide a perfect blend of
                      spirituality and natural beauty. Whether you're trekking
                      up the mountain or marveling at the church perched on a
                      hill, Kazbegi leaves an indelible mark on your trip to
                      Georgia. 4. Wine Regions of Kakheti Recognized as the
                      cradle of wine, Georgia's Kakheti region is a staple in
                      many Georgia travel packages. Visitors can savor local
                      wines and witness traditional winemaking processes in the
                      fertile Alazani Valley, enriching their trip to Georgia
                      with unique cultural experiences. The lush vineyards and
                      hospitable local vintners provide not just a taste of
                      Georgia's world-renowned wines, but also a connection to
                      its ancient traditions and heritage. 5. Gudauri Ski Resort
                      For those who love winter sports, Gudauri is often
                      included in the best Georgia tour packages. Nestled in the
                      Greater Caucasus Mountain Range, this resort offers
                      exhilarating skiing and snowboarding experiences. The
                      pristine snow-covered slopes cater to all skill levels,
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-padding-bottom">
              <div className="row">
                <div className="col-lg-3 col-md-5">
                  <div className="destination-filter-main-left">
                    <div className="destination-filter-main-left-top">
                      <p className="text-white">When are you traveling?</p>
                    </div>

                    <div className="destination-filter-main-left-bottom">
                      <div className="accordion" id="accordionExample">
                        {/* Accordion One */}
                        <div className="destination-filter-main pt-4">
                          <div className="accordion-item filter-accordion">
                            <h2 className="accordion-header" id="filter-one">
                              <button
                                className="accordion-button p-0 bg-white filter-accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#filtercollapseOne"
                                aria-expanded="true"
                                aria-controls="filtercollapseOne"
                              >
                                <h5 className="mb-0">Tour Type</h5>
                              </button>
                            </h2>
                            <div
                              id="filtercollapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="filter-one"
                            >
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>Nature Tours</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>Adventure Tours</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>Cultural Tours</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>Food Tours</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>City Tours</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>Cruises Tours</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Accordion Two */}
                        <div className="destination-filter-main pt-4">
                          <div className="accordion-item filter-accordion filter-heading">
                            <h2 className="accordion-header" id="filter-two">
                              <button
                                className="accordion-button p-0 bg-white filter-accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#filtercollapsetwo"
                                aria-expanded="false"
                                aria-controls="filtercollapsetwo"
                              >
                                <h5 className="mb-0">Filter Price</h5>
                              </button>
                            </h2>
                            <div
                              id="filtercollapsetwo"
                              className="accordion-collapse collapse show"
                              aria-labelledby="filter-two"
                            >
                              <div className="filter-input">
                                <input type="checkbox" /> <span>10k - 20k</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" /> <span>20k - 30k</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" /> <span>30k - 40k</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" /> <span>40k - 50k</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Accordion Three */}
                        <div className="destination-filter-main pt-4">
                          <div className="accordion-item filter-accordion filter-heading">
                            <h2 className="accordion-header" id="filter-three">
                              <button
                                className="accordion-button p-0 bg-white filter-accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#filtercollapsethree"
                                aria-expanded="false"
                                aria-controls="filtercollapsethree"
                              >
                                <h5 className="mb-0">Duration</h5>
                              </button>
                            </h2>
                            <div
                              id="filtercollapsethree"
                              className="accordion-collapse collapse show"
                              aria-labelledby="filter-three"
                            >
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>2days - 5days</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>5days - 7days</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>7-days - 9days</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Accordion four */}
                        <div className="destination-filter-main pt-4 pb-4">
                          <div className="accordion-item filter-accordion filter-heading">
                            <h2 className="accordion-header" id="filter-four">
                              <button
                                className="accordion-button p-0 bg-white filter-accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#filtercollapsefour"
                                aria-expanded="false"
                                aria-controls="filtercollapsefour"
                              >
                                <h5 className="mb-0">Rating</h5>
                              </button>
                            </h2>
                            <div
                              id="filtercollapsefour"
                              className="accordion-collapse collapse show"
                              aria-labelledby="filter-four"
                            >
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>2days - 5days</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>5days - 7days</span>
                              </div>
                              <div className="filter-input">
                                <input type="checkbox" />{" "}
                                <span>7-days - 9days</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-7">
                  <div className="destination-filter-main-right mt-lg-0 mt-md-0 mt-4">
                    <div className="mb-4">
                      <p>1362 results</p>
                    </div>

                    <div className="destination-filter-card-main">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="position-relative">
                            <img
                              src={Images?.filter_image}
                              alt=""
                              className="w-100 h-auto"
                            />
                            <div className="filter-card-offer">
                              <p>20 % OFF</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="destination-filter-card-center pe-lg-4">
                            <p className="filter-card-place">Paris, France</p>
                            <h5 className="filter-card-head">
                              Phi Phi Islands Adventure Day Trip with Seaview
                              Lunch by V. Marine Tour
                            </h5>

                            <p className="filter-card-rating my-3">4.8 (269)</p>

                            <p className="filter-card-desc mt-3">
                              The Phi Phi archipelago is a must-visit while in
                              Phuket, and this speedboat trip.
                            </p>

                            <div className="filter-card-features">
                              <p>Best Price Guarantee</p>
                              <p>Free Cancellation</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="destination-filter-card-right">
                            <p className="filter-card-place text-center">
                              2 Days 1 Nights
                            </p>
                            <div className="filter-card-view-main">
                              <p className="filter-card-offer-pricing text-center">
                                $1200
                              </p>
                              <p className="filter-card-original-pricing text-center">
                                From <span className="fw-bold">$114</span>
                              </p>
                              <button>
                                <a
                                  className="text-decoration-none"
                                  href="tour-overview"
                                >
                                  View Details
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="destination-filter-card-main">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="position-relative">
                            <img
                              src={Images?.filter_image}
                              alt=""
                              className="w-100 h-auto"
                            />
                            <div className="filter-card-offer">
                              <p>20 % OFF</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="destination-filter-card-center pe-lg-4">
                            <p className="filter-card-place">Paris, France</p>
                            <h5 className="filter-card-head">
                              Phi Phi Islands Adventure Day Trip with Seaview
                              Lunch by V. Marine Tour
                            </h5>

                            <p className="filter-card-rating my-3">4.8 (269)</p>

                            <p className="filter-card-desc mt-3">
                              The Phi Phi archipelago is a must-visit while in
                              Phuket, and this speedboat trip.
                            </p>

                            <div className="filter-card-features">
                              <p>Best Price Guarantee</p>
                              <p>Free Cancellation</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="destination-filter-card-right">
                            <p className="filter-card-place text-center">
                              2 Days 1 Nights
                            </p>
                            <div className="filter-card-view-main">
                              <p className="filter-card-offer-pricing text-center">
                                $1200
                              </p>
                              <p className="filter-card-original-pricing text-center">
                                From <span className="fw-bold">$114</span>
                              </p>
                              <button>
                                <a
                                  className="text-decoration-none"
                                  href="tour-overview"
                                >
                                  View Details
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="destination-filter-card-main">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="position-relative">
                            <img
                              src={Images?.filter_image}
                              alt=""
                              className="w-100 h-auto"
                            />
                            <div className="filter-card-offer">
                              <p>20 % OFF</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="destination-filter-card-center pe-lg-4">
                            <p className="filter-card-place">Paris, France</p>
                            <h5 className="filter-card-head">
                              Phi Phi Islands Adventure Day Trip with Seaview
                              Lunch by V. Marine Tour
                            </h5>

                            <p className="filter-card-rating my-3">4.8 (269)</p>

                            <p className="filter-card-desc mt-3">
                              The Phi Phi archipelago is a must-visit while in
                              Phuket, and this speedboat trip.
                            </p>

                            <div className="filter-card-features">
                              <p>Best Price Guarantee</p>
                              <p>Free Cancellation</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="destination-filter-card-right">
                            <p className="filter-card-place text-center">
                              2 Days 1 Nights
                            </p>
                            <div className="filter-card-view-main">
                              <p className="filter-card-offer-pricing text-center">
                                $1200
                              </p>
                              <p className="filter-card-original-pricing text-center">
                                From <span className="fw-bold">$114</span>
                              </p>
                              <button>
                                <a
                                  className="text-decoration-none"
                                  href="tour-overview"
                                >
                                  View Details
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="destination-filter-card-main">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="position-relative">
                            <img
                              src={Images?.filter_image}
                              alt=""
                              className="w-100 h-auto"
                            />
                            <div className="filter-card-offer">
                              <p>20 % OFF</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="destination-filter-card-center pe-lg-4">
                            <p className="filter-card-place">Paris, France</p>
                            <h5 className="filter-card-head">
                              Phi Phi Islands Adventure Day Trip with Seaview
                              Lunch by V. Marine Tour
                            </h5>

                            <p className="filter-card-rating my-3">4.8 (269)</p>

                            <p className="filter-card-desc mt-3">
                              The Phi Phi archipelago is a must-visit while in
                              Phuket, and this speedboat trip.
                            </p>

                            <div className="filter-card-features">
                              <p>Best Price Guarantee</p>
                              <p>Free Cancellation</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="destination-filter-card-right">
                            <p className="filter-card-place text-center">
                              2 Days 1 Nights
                            </p>
                            <div className="filter-card-view-main">
                              <p className="filter-card-offer-pricing text-center">
                                $1200
                              </p>
                              <p className="filter-card-original-pricing text-center">
                                From <span className="fw-bold">$114</span>
                              </p>
                              <button>
                                <a
                                  className="text-decoration-none"
                                  href="tour-overview"
                                >
                                  View Details
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="destination-filter-card-main">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="position-relative">
                            <img
                              src={Images?.filter_image}
                              alt=""
                              className="w-100 h-auto"
                            />
                            <div className="filter-card-offer">
                              <p>20 % OFF</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="destination-filter-card-center pe-lg-4">
                            <p className="filter-card-place">Paris, France</p>
                            <h5 className="filter-card-head">
                              Phi Phi Islands Adventure Day Trip with Seaview
                              Lunch by V. Marine Tour
                            </h5>

                            <p className="filter-card-rating my-3">4.8 (269)</p>

                            <p className="filter-card-desc mt-3">
                              The Phi Phi archipelago is a must-visit while in
                              Phuket, and this speedboat trip.
                            </p>

                            <div className="filter-card-features">
                              <p>Best Price Guarantee</p>
                              <p>Free Cancellation</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="destination-filter-card-right">
                            <p className="filter-card-place text-center">
                              2 Days 1 Nights
                            </p>
                            <div className="filter-card-view-main">
                              <p className="filter-card-offer-pricing text-center">
                                $1200
                              </p>
                              <p className="filter-card-original-pricing text-center">
                                From <span className="fw-bold">$114</span>
                              </p>
                              <button>
                                <a
                                  className="text-decoration-none"
                                  href="tour-overview"
                                >
                                  View Details
                                </a>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pagination-main"></div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}

      {activeTab === 4 && (
        <>
          <div className="container">
            <h1 className="my-5">Things To Do In Bangkok</h1>
          </div>
        </>
      )}

      {activeTab === 5 && (
        <>
          <div className="container">
            <section className="section-padding">
              <div className="container">
                <div className="destination-about-tour">
                  <div
                    className={`destination-read-less-main ${readMore ? "d-flex" : "d-none"}`}
                  >
                    <button
                      className="destination-read-less-btn"
                      onClick={() => setReadMore(!readMore)}
                    >
                      Read Less
                    </button>
                  </div>

                  <h5 className="fw-bold mb-4">Information about Bangkok</h5>
                  <div
                    className={`destination-about-tour-content ${readMore ? "destination-about-tour-content-expand" : "destination-about-tour-content"}`}
                  >
                    <div className="destination-read-more-main">
                      <button
                        className="destination-read-more-btn"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? "Read Less..." : "Read More..."}
                      </button>
                    </div>
                    <p>
                      Welcome to a realm where history and culture seamlessly
                      converge, eagerly awaiting your exploration through our
                      meticulously curated Georgia tour package. If you crave
                      breathtaking landscapes, ancient monuments, and a
                      thrilling sense of adventure at every turn, then our
                      diverse selection of Georgia trip packages is precisely
                      what you need. From vibrant cities to tranquil
                      countrysides, each Georgia tour package promises an
                      unforgettable adventure. Immerse yourself in an
                      extraordinary journey with our top-tier Georgia trip
                      packages that cater to every traveler’s fantasy. Let's
                      embark on this incredible adventure together! Top
                      Attractions Included in Georgia Travel Packages Embark on
                      a journey through the wonders of Georgia with our
                      meticulously crafted Georgia tour package. Discover the
                      rich history, vibrant culture, and stunning natural
                      landscapes that await you in this enchanting country,
                      where every destination offers a new adventure and every
                      moment is worth savoring. With that said, scroll down and
                      check out all the places which you will explore with our
                      Georgia Tour Packages. 1. Narikala Fortress Included in
                      nearly every Georgia trip package, this ancient
                      fortification offers panoramic views of Tbilisi and stands
                      as a testament to the region's rich history and
                      resilience. Dating back to the 4th century, it's a
                      must-visit attraction. Walking through its grounds, you
                      can feel the echoes of the past, with each stone narrating
                      tales of bygone eras. Whether day or night, the fortress
                      imbues your trip to Georgia with a sense of awe and
                      historical wonder. 2. Mtskheta Highlighted in most Georgia
                      travel packages, this UNESCO World Heritage site is known
                      as the religious heart of Georgia. Key sites include the
                      Svetitskhoveli Cathedral and the historic Jvari Monastery,
                      both offering profound insights into Georgia's Christian
                      heritage. Strolling through Mtskheta, you will be immersed
                      in centuries-old traditions and spiritual significance,
                      making your tour to Georgia an enriching experience filled
                      with historical and cultural discovery. 3. Kazbegi Region
                      Kazbegi Region: A highlight for nature enthusiasts on a
                      tour to Georgia, this area is famed for the majestic Mount
                      Kazbek and the Gergeti Trinity Church. Included in most
                      Georgia holiday packages from India, this region's
                      breathtaking landscapes provide a perfect blend of
                      spirituality and natural beauty. Whether you're trekking
                      up the mountain or marveling at the church perched on a
                      hill, Kazbegi leaves an indelible mark on your trip to
                      Georgia. 4. Wine Regions of Kakheti Recognized as the
                      cradle of wine, Georgia's Kakheti region is a staple in
                      many Georgia travel packages. Visitors can savor local
                      wines and witness traditional winemaking processes in the
                      fertile Alazani Valley, enriching their trip to Georgia
                      with unique cultural experiences. The lush vineyards and
                      hospitable local vintners provide not just a taste of
                      Georgia's world-renowned wines, but also a connection to
                      its ancient traditions and heritage. 5. Gudauri Ski Resort
                      For those who love winter sports, Gudauri is often
                      included in the best Georgia tour packages. Nestled in the
                      Greater Caucasus Mountain Range, this resort offers
                      exhilarating skiing and snowboarding experiences. The
                      pristine snow-covered slopes cater to all skill levels,
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}

      <ContactForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DestinationPreview;
