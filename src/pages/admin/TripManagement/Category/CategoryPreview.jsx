import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Images } from '../../../../helpers/Images/images';
import { APIBaseUrl } from '../../../../common/api/api';

const CategoryPreview = () => {
  const { id } = useParams();

  const [trips, setAllTrips] = useState([])

  const getAllTrips = async (id) => {
    try {
      const res = await APIBaseUrl.get(`categories/trip_details/${id}`, {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true) {
        setAllTrips(res?.data?.data)
      }

    } catch (error) {
      console.error("Error fetching trips:", error?.response?.data || error.message);
      throw error;
    }
  }

  useEffect(() => {
    getAllTrips(id)
  }, []);

  console.log(trips, "trips")

  return (
    <div>
      <div className='container'>
        <div className='section-padding'>
          <h1 className='category-heading-preview'>Category</h1>

          <div className='category-preview-parent section-padding'>
            <div className='row'>

              {trips && trips.length > 0 ? (
                trips.map((trip, index) => (
                  <div className='col-lg-3 col-md-6'>
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
                          {trip?.pickup_location} → {trip?.drop_location}
                        </p>

                        <p className="featured-content">
                          <span>₹{trip?.pricing?.fixed_departure?.fixed_departure?.[0]?.base_price} </span>
                          ₹{trip?.pricing?.fixed_departure?.fixed_departure?.[0]?.base_price}
                        </p>
                        <div className="featured-bottom-content d-flex gap-2">
                          <div className='trip-card-amount'>
                            <p className="" onClick={() => window.open(`/trip-preview/${trip?.slug}/${trip?.id}`, "_blank", "noopener,noreferrer")}>
                              Trip Detail
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>


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
