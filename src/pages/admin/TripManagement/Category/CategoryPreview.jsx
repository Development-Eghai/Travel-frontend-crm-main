import React from 'react'
import { useParams } from 'react-router-dom';
import { Images } from '../../../../helpers/Images/images';

const CategoryPreview = () => {
  const { id } = useParams();

  return (
    <div>
      <div className='container'>
        <div className='section-padding'>
          <h1 className='category-heading-preview'>Category</h1>

          <div className='category-preview-parent section-padding'>
            <div className='row'>

              <div className="col-lg-3 col-md-6">
                <div className="featured-card-main popular-card-main m-0">
                  <a
                    href="destination-list"
                    className="text-decoration-none"
                  >
                    <div>
                      <img
                        className="featured-card-img"
                        src={Images.featured_card}
                        alt="featured"
                      />
                    </div>
                    <div className="featured-content-main">
                      <p className="featured-city-para">Paris, France</p>
                      <p className="featured-content">
                        Centipede Tour - Guided Arizona Desert Tour by ATV
                      </p>
                      <div className="featured-bottom-content d-flex gap-2">
                        <div className='trip-card-amount button'>
                        <p className="">
                            Trip Detail
                          </p>
                        </div>
                        <div className='trip-card-amount'>
                          <p className="">
                            From <span className="fw-bold">₹ 1200rs</span>/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="featured-card-main popular-card-main m-0">
                  <a
                    href="destination-list"
                    className="text-decoration-none"
                  >
                    <div>
                      <img
                        className="featured-card-img"
                        src={Images.featured_card}
                        alt="featured"
                      />
                    </div>
                    <div className="featured-content-main">
                      <p className="featured-city-para">Paris, France</p>
                      <p className="featured-content">
                        Centipede Tour - Guided Arizona Desert Tour by ATV
                      </p>
                      <div className="featured-bottom-content d-flex gap-2">
                        <div className='trip-card-amount button'>
                          <p className="">
                            Trip Detail
                          </p>
                        </div>
                        <div className='trip-card-amount'>
                          <p className="">
                            From <span className="fw-bold">₹ 1200rs</span>/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="featured-card-main popular-card-main m-0">
                  <a
                    href="destination-list"
                    className="text-decoration-none"
                  >
                    <div>
                      <img
                        className="featured-card-img"
                        src={Images.featured_card}
                        alt="featured"
                      />
                    </div>
                    <div className="featured-content-main">
                      <p className="featured-city-para">Paris, France</p>
                      <p className="featured-content">
                        Centipede Tour - Guided Arizona Desert Tour by ATV
                      </p>
                      <div className="featured-bottom-content d-flex gap-2">
                        <div className='trip-card-amount button'>
                        <p className="">
                            Trip Detail
                          </p>
                        </div>
                        <div className='trip-card-amount'>
                          <p className="">
                            From <span className="fw-bold">₹ 1200rs</span>/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="featured-card-main popular-card-main m-0">
                  <a
                    href="destination-list"
                    className="text-decoration-none"
                  >
                    <div>
                      <img
                        className="featured-card-img"
                        src={Images.featured_card}
                        alt="featured"
                      />
                    </div>
                    <div className="featured-content-main">
                      <p className="featured-city-para">Paris, France</p>
                      <p className="featured-content">
                        Centipede Tour - Guided Arizona Desert Tour by ATV
                      </p>
                      <div className="featured-bottom-content d-flex gap-2">
                        <div className='trip-card-amount button'>
                          <p className="">
                            Trip Detail
                          </p>
                        </div>
                        <div className='trip-card-amount'>
                          <p className="">
                            From <span className="fw-bold">₹ 1200rs</span>/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CategoryPreview
