import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Images } from '../../../../helpers/Images/images';
import { APIBaseUrl } from '../../../../common/api/api';
import { CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const CategoryPreview = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setcategoryData] = useState({})

  const [trips, setAllTrips] = useState([])

  const getAllTrips = async (id) => {
    try {
      setIsLoading(true);
      const res = await APIBaseUrl.get(`categories/trip_details/${id}`, {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true) {
        setIsLoading(false);
        setAllTrips(res?.data?.data)
      }

    } catch (error) {
      console.error("Error fetching trips:", error?.response?.data || error.message);
      throw error;
    }
  }


  const getSpecificTourCategory = async (id) => {
    try {
      const res = await APIBaseUrl.get(`categories/${id}`, {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true) {
        setcategoryData(res?.data?.data)
      }

    } catch (error) {
      console.error("Error fetching trips:", error?.response?.data || error.message);
      throw error;
    }
  }


  useEffect(() => {
    getAllTrips(id)
    getSpecificTourCategory(id)

  }, []);

  console.log(trips, "trips")
  console.log(categoryData, "categoryData")
  console.log(categoryData.image);

  return (
    <div className='overflow-hidden'>
      <section className="destination-detail-banner-main">
        {categoryData?.image?.length > 0 && (
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
            {categoryData?.image?.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <div
                  className="destination-slide swiper-slider-banners"
                  style={{
                    backgroundImage: `url(${encodeURI(imageUrl)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="destination-overlay"></div>
                  <div className="destination-slide-content">
                    <h3 className="dest-package-name text-center" style={{ visibility: "visible" }}>
                      {categoryData?.name}
                    </h3>
                    <p className="dest-package-para">
                      {categoryData?.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}


      </section>



      <div className='container'>
        <div className='section-padding'>
          <h1 className='category-heading-preview'>{categoryData?.name} Category</h1>

          <div className='category-preview-parent section-padding'>
            <div className='row'>

              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : trips && trips.length > 0 ? (
                trips.map((trip, index) => (
                  <div className='col-lg-3 col-md-6' key={index}>
                    <div className="featured-card-main">
                      <div className='position-relative'>
                        <div>
                          <img className="featured-card-img" src={trip?.hero_image} alt="featured" />
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
                          {/* {trip?.drop_location} */}
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
                          {/* <div className='trip-card-amount button'>
                                                    <p className="">
                                                        Trip Detail
                                                    </p>
                                                </div> */}
                          <div className='trip-card-amount'>
                            <p className="" onClick={() => window.open(`/trip-preview/${trip?.slug}/${trip?.id}`, "_blank", "noopener,noreferrer")}                                                            >
                              {/* From <span className="fw-bold"></span>/- */}
                              Trip Detail
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // 🔹 No data message
                <p className="text-center py-4 no-trip-available">No Tours available 😞</p>
              )}



            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CategoryPreview
