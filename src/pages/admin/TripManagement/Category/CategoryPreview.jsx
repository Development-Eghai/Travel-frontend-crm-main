import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { APIBaseUrl } from '../../../../common/api/api';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import TripCard from '../../../../component/TripCard';
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
      setIsLoading(false);
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
      console.error("Error fetching category:", error?.response?.data || error.message);
    }
  }

  useEffect(() => {
    getAllTrips(id)
    getSpecificTourCategory(id)
  }, [id]);

  return (
    <div className='overflow-hidden'>
      {/* Hero Banner */}
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

      {/* Trips Section */}
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
                  <div className='col-lg-3 col-md-6 mb-4' key={index}>
                    <TripCard trip={trip} />
                  </div>
                ))
              ) : (
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