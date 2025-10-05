import Header from './component/Header'
import Footer from './component/Footer'
import { Images } from "../../helpers/Images/images";

const DestinationFilters = () => {
  return (
    <div>
      <div className='section-padding-bottom'>
        <div className="container">
          <div className='destination-filter-top mt-5'>
            <div className='d-flex'>
              <a className='destination-filter' href='/'>Home</a><i className="fa-solid fa-greater-than mx-2 mt-1"></i>
              <a className='destination-filter'>Tours</a><i className="fa-solid fa-greater-than mx-2 mt-1"></i>
              <a className='destination-filter'>Phuket</a>
            </div>
            <div>
              <p className='destination-filter'>THE TOP {10} Phuket Tours & Excursions</p>
            </div>
          </div>

          <h2 className='destination-filter-heading'>Explore all things to do in Phuket</h2>

          <section >
            <div className="row">
              <div className="col-lg-3 col-md-5">
                <div className='destination-filter-main-left'>
                  <div className='destination-filter-main-left-top'>
                    <p className='text-white'>When are you traveling?</p>
                  </div>

                  <div className='destination-filter-main-left-bottom'>
                    <div className="accordion" id="accordionExample">

                      {/* Accordion One */}
                      <div className='destination-filter-main pt-4'>
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
                              <h5 className='mb-0'>Tour Type</h5>
                            </button>
                          </h2>
                          <div
                            id="filtercollapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="filter-one"
                          >
                            <div className='filter-input'><input type="checkbox" /> <span>Nature Tours</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>Adventure Tours</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>Cultural Tours</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>Food Tours</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>City Tours</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>Cruises Tours</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Two */}
                      <div className='destination-filter-main pt-4'>
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
                              <h5 className='mb-0'>Filter Price</h5>
                            </button>
                          </h2>
                          <div
                            id="filtercollapsetwo"
                            className="accordion-collapse collapse show"
                            aria-labelledby="filter-two"
                          >
                            <div className='filter-input'><input type="checkbox" /> <span>10k - 20k</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>20k - 30k</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>30k - 40k</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>40k - 50k</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Three */}
                      <div className='destination-filter-main pt-4'>
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
                              <h5 className='mb-0'>Duration</h5>
                            </button>
                          </h2>
                          <div
                            id="filtercollapsethree"
                            className="accordion-collapse collapse show"
                            aria-labelledby="filter-three"
                          >
                            <div className='filter-input'><input type="checkbox" /> <span>2days - 5days</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>5days - 7days</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>7-days - 9days</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Accordion four */}
                      <div className='destination-filter-main pt-4 pb-4'>
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
                              <h5 className='mb-0'>Rating</h5>
                            </button>
                          </h2>
                          <div
                            id="filtercollapsefour"
                            className="accordion-collapse collapse show"
                            aria-labelledby="filter-four"
                          >
                            <div className='filter-input'><input type="checkbox" /> <span>2days - 5days</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>5days - 7days</span></div>
                            <div className='filter-input'><input type="checkbox" /> <span>7-days - 9days</span></div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-7">
                <div className='destination-filter-main-right mt-lg-0 mt-md-0 mt-4'>
                  <div className='mb-4'>
                    <p>1362 results</p>
                  </div>

                  <div className='destination-filter-card-main'>
                    <div className='row'>
                      <div className="col-lg-3">
                        <div className='position-relative'>
                          <img src={Images?.filter_image} alt="" className='w-100 h-auto' />
                          <div className='filter-card-offer'>
                            <p>20 % OFF</p>
                          </div>
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className='destination-filter-card-center pe-lg-4'>
                          <p className='filter-card-place'>Paris, France</p>
                          <h5 className='filter-card-head'>Phi Phi Islands Adventure Day Trip with
                            Seaview Lunch by V. Marine Tour</h5>

                          <p className='filter-card-rating my-3'>4.8 (269)</p>

                          <p className='filter-card-desc mt-3'>The Phi Phi archipelago is a must-visit while in
                            Phuket, and this speedboat trip.</p>

                          <div className='filter-card-features'>
                            <p>Best Price Guarantee</p>
                            <p>Free Cancellation</p>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className='destination-filter-card-right'>
                          <p className='filter-card-place text-center'>2 Days 1 Nights</p>
                          <div className='filter-card-view-main'>
                            <p className='filter-card-offer-pricing text-center'>$1200</p>
                            <p className='filter-card-original-pricing text-center'>From <span className='fw-bold'>$114</span></p>
                            <button><a className='text-decoration-none' href='tour-overview'>View Details</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='destination-filter-card-main'>
                    <div className='row'>
                      <div className="col-lg-3">
                        <div className='position-relative'>
                          <img src={Images?.filter_image} alt="" className='w-100 h-auto' />
                          <div className='filter-card-featured filter-card-offer'>
                            <p>FEATURED</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className='destination-filter-card-center pe-lg-4'>
                          <p className='filter-card-place'>Paris, France</p>
                          <h5 className='filter-card-head'>Phi Phi Islands Adventure Day Trip with
                            Seaview Lunch by V. Marine Tour</h5>

                          <p className='filter-card-rating my-3'>4.8 (269)</p>

                          <p className='filter-card-desc mt-3'>The Phi Phi archipelago is a must-visit while in
                            Phuket, and this speedboat trip.</p>

                          <div className='filter-card-features'>
                            <p>Best Price Guarantee</p>
                            <p>Free Cancellation</p>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className='destination-filter-card-right'>
                          <p className='filter-card-place text-center'>2 Days 1 Nights</p>
                          <div className='filter-card-view-main'>
                            <p className='filter-card-offer-pricing text-center'>$1200</p>
                            <p className='filter-card-original-pricing text-center'>From <span className='fw-bold'>$114</span></p>
                            <button><a className='text-decoration-none' href='tour-overview'>View Details</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='destination-filter-card-main'>
                    <div className='row'>
                      <div className="col-lg-3">
                        <div>
                          <img src={Images?.filter_image} alt="" className='w-100 h-auto' />
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className='destination-filter-card-center pe-lg-4'>
                          <p className='filter-card-place'>Paris, France</p>
                          <h5 className='filter-card-head'>Phi Phi Islands Adventure Day Trip with
                            Seaview Lunch by V. Marine Tour</h5>

                          <p className='filter-card-rating my-3'>4.8 (269)</p>

                          <p className='filter-card-desc mt-3'>The Phi Phi archipelago is a must-visit while in
                            Phuket, and this speedboat trip.</p>

                          <div className='filter-card-features'>
                            <p>Best Price Guarantee</p>
                            <p>Free Cancellation</p>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className='destination-filter-card-right'>
                          <p className='filter-card-place text-center'>2 Days 1 Nights</p>
                          <div className='filter-card-view-main'>
                            <p className='filter-card-offer-pricing text-center'>$1200</p>
                            <p className='filter-card-original-pricing text-center'>From <span className='fw-bold'>$114</span></p>
                            <button><a className='text-decoration-none' href='tour-overview'>View Details</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='destination-filter-card-main'>
                    <div className='row'>
                      <div className="col-lg-3">
                        <div>
                          <img src={Images?.filter_image} alt="" className='w-100 h-auto' />
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className='destination-filter-card-center pe-lg-4'>
                          <p className='filter-card-place'>Paris, France</p>
                          <h5 className='filter-card-head'>Phi Phi Islands Adventure Day Trip with
                            Seaview Lunch by V. Marine Tour</h5>

                          <p className='filter-card-rating my-3'>4.8 (269)</p>

                          <p className='filter-card-desc mt-3'>The Phi Phi archipelago is a must-visit while in
                            Phuket, and this speedboat trip.</p>

                          <div className='filter-card-features'>
                            <p>Best Price Guarantee</p>
                            <p>Free Cancellation</p>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className='destination-filter-card-right'>
                          <p className='filter-card-place text-center'>2 Days 1 Nights</p>
                          <div className='filter-card-view-main'>
                            <p className='filter-card-offer-pricing text-center'>$1200</p>
                            <p className='filter-card-original-pricing text-center'>From <span className='fw-bold'>$114</span></p>
                            <button><a className='text-decoration-none' href='tour-overview'>View Details</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='destination-filter-card-main'>
                    <div className='row'>
                      <div className="col-lg-3">
                        <div>
                          <img src={Images?.filter_image} alt="" className='w-100 h-auto' />
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className='destination-filter-card-center pe-lg-4'>
                          <p className='filter-card-place'>Paris, France</p>
                          <h5 className='filter-card-head'>Phi Phi Islands Adventure Day Trip with
                            Seaview Lunch by V. Marine Tour</h5>

                          <p className='filter-card-rating my-3'>4.8 (269)</p>

                          <p className='filter-card-desc mt-3'>The Phi Phi archipelago is a must-visit while in
                            Phuket, and this speedboat trip.</p>

                          <div className='filter-card-features'>
                            <p>Best Price Guarantee</p>
                            <p>Free Cancellation</p>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className='destination-filter-card-right'>
                          <p className='filter-card-place text-center'>2 Days 1 Nights</p>
                          <div className='filter-card-view-main'>
                            <p className='filter-card-offer-pricing text-center'>$1200</p>
                            <p className='filter-card-original-pricing text-center'>From <span className='fw-bold'>$114</span></p>
                            <button><a className='text-decoration-none' href='tour-overview'>View Details</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='destination-filter-card-main'>
                    <div className='row'>
                      <div className="col-lg-3">
                        <div>
                          <img src={Images?.filter_image} alt="" className='w-100 h-auto' />
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className='destination-filter-card-center pe-lg-4'>
                          <p className='filter-card-place'>Paris, France</p>
                          <h5 className='filter-card-head'>Phi Phi Islands Adventure Day Trip with
                            Seaview Lunch by V. Marine Tour</h5>

                          <p className='filter-card-rating my-3'>4.8 (269)</p>

                          <p className='filter-card-desc mt-3'>The Phi Phi archipelago is a must-visit while in
                            Phuket, and this speedboat trip.</p>

                          <div className='filter-card-features'>
                            <p>Best Price Guarantee</p>
                            <p>Free Cancellation</p>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className='destination-filter-card-right'>
                          <p className='filter-card-place text-center'>2 Days 1 Nights</p>
                          <div className='filter-card-view-main'>
                            <p className='filter-card-offer-pricing text-center'>$1200</p>
                            <p className='filter-card-original-pricing text-center'>From <span className='fw-bold'>$114</span></p>
                            <button><a className='text-decoration-none' href='tour-overview'>View Details</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='destination-filter-card-main'>
                    <div className='row'>
                      <div className="col-lg-3">
                        <div>
                          <img src={Images?.filter_image} alt="" className='w-100 h-auto' />
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className='destination-filter-card-center pe-lg-4'>
                          <p className='filter-card-place'>Paris, France</p>
                          <h5 className='filter-card-head'>Phi Phi Islands Adventure Day Trip with
                            Seaview Lunch by V. Marine Tour</h5>

                          <p className='filter-card-rating my-3'>4.8 (269)</p>

                          <p className='filter-card-desc mt-3'>The Phi Phi archipelago is a must-visit while in
                            Phuket, and this speedboat trip.</p>

                          <div className='filter-card-features'>
                            <p>Best Price Guarantee</p>
                            <p>Free Cancellation</p>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className='destination-filter-card-right'>
                          <p className='filter-card-place text-center'>2 Days 1 Nights</p>
                          <div className='filter-card-view-main'>
                            <p className='filter-card-offer-pricing text-center'>$1200</p>
                            <p className='filter-card-original-pricing text-center'>From <span className='fw-bold'>$114</span></p>
                            <button><a className='text-decoration-none' href='tour-overview'>View Details</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='destination-filter-card-main'>
                    <div className='row'>
                      <div className="col-lg-3">
                        <div>
                          <img src={Images?.filter_image} alt="" className='w-100 h-auto' />
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className='destination-filter-card-center pe-lg-4'>
                          <p className='filter-card-place'>Paris, France</p>
                          <h5 className='filter-card-head'>Phi Phi Islands Adventure Day Trip with
                            Seaview Lunch by V. Marine Tour</h5>

                          <p className='filter-card-rating my-3'>4.8 (269)</p>

                          <p className='filter-card-desc mt-3'>The Phi Phi archipelago is a must-visit while in
                            Phuket, and this speedboat trip.</p>

                          <div className='filter-card-features'>
                            <p>Best Price Guarantee</p>
                            <p>Free Cancellation</p>
                          </div>

                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className='destination-filter-card-right'>
                          <p className='filter-card-place text-center'>2 Days 1 Nights</p>
                          <div className='filter-card-view-main'>
                            <p className='filter-card-offer-pricing text-center'>$1200</p>
                            <p className='filter-card-original-pricing text-center'>From <span className='fw-bold'>$114</span></p>
                            <button><a className='text-decoration-none' href='tour-overview'>View Details</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='pagination-main'>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div >
    </div >
  )
}

export default DestinationFilters
