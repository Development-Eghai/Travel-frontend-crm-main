import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../user/component/Header";
import { TourPreviewDetails } from "../../../../common/api/ApiService";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  setCount,
} from "../../../../store/slices/RoomSharingSlice";
import {
  EmailValidation,
  normalizeEmptyFields,
  NumberValidation,
  StringValidation,
} from "../../../../common/Validation";
import CustomModal from "../../../../component/CustomModel";
import { successMsg } from "../../../../common/Toastify";

const TourBookingPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const count = useSelector((state) => state.sharing.count);

  const [specificTourData, setSpecificTourData] = useState();
  const [validation, setValidation] = useState({});
  const [bookingPersonalDetail, setBookingPersonalDetail] = useState({});
  const [isValidate, setIsValidate] = useState(false);
  const [paymentType, setPaymentType] = useState("full");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [tripSection, setTripSection] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingPersonalDetail({ ...bookingPersonalDetail, [name]: value });
    if (validation[name]) {
      setValidation({ ...validation, [name]: false });
    }
  };

  const validateDetails = (data) => {
    let validate = {};
    validate.name = StringValidation(data?.name);
    validate.phone_number = NumberValidation(data?.phone_number?.toString());
    validate.email = EmailValidation(data?.email);

    return validate;
  };

  const handleBlur = (fieldName, value) => {
    const updatedData = {
      ...bookingPersonalDetail,
      [fieldName]: value,
    };

    const cleanedData = normalizeEmptyFields(updatedData);
    const fieldValidation = validateDetails(cleanedData);

    setValidation((prev) => ({
      ...prev,
      [fieldName]: fieldValidation[fieldName],
    }));
  };

  const getSpecificTour = async () => {
    const response = await TourPreviewDetails(id);

    if (response && response.statusCode === 200) {
      const fixedPackage = response.data?.fixedPackage;
      const customizePackage = response.data?.customizePackage;

      const isFixed = fixedPackage && Object.keys(fixedPackage).length > 0;
      const isCustom =
        customizePackage && Object.keys(customizePackage).length > 0;

      if (isFixed) {
        setSpecificTourData(fixedPackage);
      } else if (isCustom) {
        setSpecificTourData(customizePackage);
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const cleanedData = normalizeEmptyFields(bookingPersonalDetail);
  //   const isValide = validateDetails(cleanedData)
  //   setValidation(isValide);
  //   if (Object.values(isValide).every((data) => data?.status === true)) {

  //   }

  // }

  useEffect(() => {
    getSpecificTour();
  }, []);

  useEffect(() => {
    const allValid =
      validation.name?.status === true &&
      validation.phone_number?.status === true &&
      validation.email?.status === true;

    console.log(validation, "validation");

    setIsValidate(allValid);
  }, [validation]);

  const selectedSlot = specificTourData?.departure_Slots?.[selectedIndex];

  const selectedStartDate = selectedSlot
    ? moment(selectedSlot.start_date).format("DD MMM YYYY")
    : "";
  const selectedEndDate = selectedSlot
    ? moment(selectedSlot.end_date).format("DD MMM YYYY")
    : "";

  const basePrice = specificTourData?.price_per_package?.base_price || 0;
  const gstPerUnit = 8500;
  const tcsPerUnit = 8924;

  const total = basePrice * count + gstPerUnit * count + tcsPerUnit * count;

  const handleSuccess = () => {
    successMsg("Successfuuly Paid");
    setBookingPersonalDetail({});
    setValidation({});
    dispatch(setCount(1));
    setTripSection(5);
    setOpen(false);
  };

  console.log(isValidate, "isValidate");

  return (
    <div>
      <div className="booking-main-parent">
        {/* <Header fixed={false} /> */}

        {tripSection === 1 && (
          <div className="">
            <div className="booking-center-card position-relative">
              <div>
                <i
                  class="fa-solid fa-arrow-left"
                  onClick={() => navigate(-1)}
                ></i>
                <p className="dates-cost text-center">Dates & Costing</p>
                <div>
                  <p className="booking-trip-name">
                    {specificTourData?.short_description}
                  </p>
                </div>
              </div>
            </div>

            <div className="booking-bottom-parent">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="booking-left">
                      <div className="available-slots-main">
                        <p className="head">Available Dates</p>

                        <div className="booking-left-accrodion">
                          <div className="container px-0">
                            <div className="trip-detail-faqs mt-4">
                              <div className="accordion" id="accordionExample">
                                {specificTourData?.departure_Slots?.map(
                                  (item, index) => (
                                    <div className="accordion-item" key={index}>
                                      <h2
                                        className="accordion-header"
                                        id={`departureHeading${index}`}
                                      >
                                        <button
                                          className={`accordion-button ${index !== selectedIndex ? "collapsed" : ""}`}
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#departureCollapse${index}`}
                                          aria-expanded={
                                            index === selectedIndex
                                              ? "true"
                                              : "false"
                                          }
                                          aria-controls={`departureCollapse${index}`}
                                          onClick={() =>
                                            setSelectedIndex(index)
                                          }
                                        >
                                          <i className="fa-solid fa-arrow-right me-3"></i>
                                          {moment(item?.start_date).format(
                                            "DD MMM 'YY"
                                          )}
                                        </button>
                                      </h2>
                                      <div
                                        id={`departureCollapse${index}`}
                                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                        aria-labelledby={`departureHeading${index}`}
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="booking-left-accrodion-content">
                                            <p>
                                              {moment(item?.start_date).format(
                                                "DD MMM YYYY"
                                              )}{" "}
                                              -{" "}
                                              {moment(item?.end_date).format(
                                                "DD MMM YYYY"
                                              )}
                                            </p>
                                            <p className="seats-left">
                                              {item?.available_slots} Seats Left
                                            </p>
                                            <div className="d-flex">
                                              <p className="starting-price">
                                                Starting Price:{" "}
                                              </p>
                                              <p>
                                                ₹{" "}
                                                {
                                                  specificTourData
                                                    ?.price_per_package
                                                    ?.base_price
                                                }
                                                /-
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="notes-para">
                            <span className="booking-note mt-0">NOTE: </span> At
                            the time of booking, it is mandatory for a customer
                            to pay a minimum of ₹25,000 per person as a booking
                            amount. We will proceed with the booking, only after
                            receiving the booking amount.
                          </p>

                          <p className="notes-para">
                            <span className="booking-note">NOTE: </span> At the
                            time of booking, it is mandatory for a customer to
                            pay a minimum of ₹25,000 per person as a booking
                            amount. We will proceed with the booking, only after
                            receiving the booking amount.
                          </p>

                          <p className="notes-para">
                            <span className="booking-note">NOTE: </span> At the
                            time of booking, it is mandatory for a customer to
                            pay a minimum of ₹25,000 per person as a booking
                            amount. We will proceed with the booking, only after
                            receiving the booking amount.
                          </p>

                          <p className="notes-para">
                            <span className="booking-note">NOTE: </span> At the
                            time of booking, it is mandatory for a customer to
                            pay a minimum of ₹25,000 per person as a booking
                            amount. We will proceed with the booking, only after
                            receiving the booking amount.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="booking-right">
                      <div className="available-slots-main">
                        <p className="head">Costing</p>
                        <div className="costing-head-table mt-3">
                          <table>
                            <tr>
                              <th>Room Sharing</th>
                              <th>
                                Selling Cost
                                <br />
                                (Per Person)
                              </th>
                              <th>
                                Discounted Cost
                                <br />
                                (Per Person)
                              </th>
                            </tr>
                            <tr>
                              <td>Double Occupancy</td>
                              <td className="selling-cost">
                                ₹{" "}
                                {
                                  specificTourData?.price_per_package
                                    ?.base_price
                                }
                                /
                              </td>
                              <td>
                                ₹{" "}
                                {
                                  specificTourData?.price_per_package
                                    ?.double_occupancy
                                }
                                /-
                              </td>
                            </tr>
                            <tr>
                              <td>Triple Occupancy</td>
                              <td className="selling-cost">
                                ₹{" "}
                                {
                                  specificTourData?.price_per_package
                                    ?.base_price
                                }
                                /
                              </td>
                              <td>
                                ₹{" "}
                                {
                                  specificTourData?.price_per_package
                                    ?.triple_occupancy
                                }
                                /-
                              </td>
                            </tr>
                            <tr>
                              <td>Quad Occupancy </td>
                              <td className="selling-cost">
                                ₹{" "}
                                {
                                  specificTourData?.price_per_package
                                    ?.base_price
                                }
                                /
                              </td>
                              <td>
                                ₹{" "}
                                {
                                  specificTourData?.price_per_package
                                    ?.quad_occupancy
                                }
                                /-
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <div className="trip-detail-right booking-page">
                        <div className="trip-detail-price-card booking-page">
                          <div>
                            <p className="mb-1">Starting from</p>
                            <div className="d-flex">
                              <p className="trip-price">
                                ₹{" "}
                                {
                                  specificTourData?.price_per_package
                                    ?.base_price
                                }
                                /-
                              </p>
                              <p className="trip-price-per">Per Person</p>
                            </div>
                          </div>
                          <div>
                            <button onClick={() => setTripSection(2)}>
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          {tripSection !== 1 && tripSection !== 5 && (
            <div className="booking-center-card position-relative">
              <i
                class="fa-solid fa-arrow-left"
                onClick={() => setTripSection(tripSection - 1)}
              ></i>

              <div class="stepper">
                <div class="step">
                  <div class="step-column">
                    <i class="fa-solid fa-circle-check circle completed"></i>
                    <div class="label">Booking Details</div>
                  </div>
                </div>
                <div class="line completed"></div>

                <div class="step">
                  <div class="step-column">
                    {tripSection >= 4 ? (
                      <i class="fa-solid fa-circle-check circle completed"></i>
                    ) : (
                      <i class="fa-regular fa-circle circle"></i>
                    )}
                    <div class="label">Payment</div>
                  </div>
                </div>

                {tripSection === 5 ? (
                  <div class="line completed"></div>
                ) : (
                  <div class="line"></div>
                )}

                <div class="step">
                  <div class="step-column">
                    {tripSection === 5 ? (
                      <i class="fa-solid fa-circle-check circle completed"></i>
                    ) : (
                      <i class="fa-regular fa-circle circle"></i>
                    )}
                    <div class="label">Confirmation</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="booking-bottom-parent">
            {tripSection === 2 && (
              <div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="">
                        <div className="booking-personal-detail-left">
                          <p className="booking-personal-detail-head">
                            Personal Details
                          </p>

                          <div className="booking-personal-detail-form-main">
                            <div>
                              <div className="booking-personal-detail-form">
                                <label>
                                  Full Name{" "}
                                  <span className="required-icon">*</span>
                                </label>
                                <input
                                  placeholder="Enter Full Name"
                                  type="text"
                                  name="name"
                                  onChange={(e) => handleChange(e)}
                                  value={bookingPersonalDetail?.name || ""}
                                  onBlur={(e) =>
                                    handleBlur(e.target.name, e.target.value)
                                  }
                                />
                                {validation?.name?.status === false &&
                                  validation?.name?.message && (
                                    <p className="error-para">
                                      Name {validation.name.message}
                                    </p>
                                  )}
                              </div>

                              <div className="booking-personal-detail-form">
                                <label>
                                  Contact No{" "}
                                  <span className="required-icon">*</span>
                                </label>
                                <input
                                  placeholder="Enter Contact No"
                                  type="number"
                                  name="phone_number"
                                  onChange={(e) => handleChange(e)}
                                  value={
                                    bookingPersonalDetail?.phone_number || ""
                                  }
                                  onBlur={(e) =>
                                    handleBlur(e.target.name, e.target.value)
                                  }
                                  onWheelCapture={(e) => {
                                    e.target.blur();
                                  }}
                                  onKeyDown={(evt) =>
                                    ["e", "E", "+", "-"].includes(evt.key) &&
                                    evt.preventDefault()
                                  }
                                />
                                {validation?.phone_number?.status === false &&
                                  validation?.phone_number?.message && (
                                    <p className="error-para">
                                      Phone Number{" "}
                                      {validation.phone_number.message}
                                    </p>
                                  )}
                              </div>

                              <div className="booking-personal-detail-form">
                                <label>
                                  Email ID{" "}
                                  <span className="required-icon">*</span>
                                </label>
                                <input
                                  placeholder="Enter Email ID"
                                  name="email"
                                  type="email"
                                  onChange={(e) => handleChange(e)}
                                  value={bookingPersonalDetail?.email || ""}
                                  onBlur={(e) =>
                                    handleBlur(e.target.name, e.target.value)
                                  }
                                />
                                {validation?.email?.status === false &&
                                  validation?.email?.message && (
                                    <p className="error-para">
                                      Email Id {validation.email.message}
                                    </p>
                                  )}
                              </div>
                            </div>

                            <button
                              className={`booking-personal-detail-button ${isValidate ? "active" : "non-active"}`}
                              disabled={!isValidate}
                              onClick={() => setTripSection(3)}
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="">
                        <div className="booking-personal-trip-detail-main d-flex">
                          <div className="booking-personal-trip-detail">
                            <h1>{specificTourData?.short_description}</h1>
                            <p className="mt-1">
                              {selectedStartDate} - {selectedEndDate}
                            </p>
                          </div>
                          <div className="trip-duration-div">
                            <p className="trip-duration">
                              {specificTourData?.days}D/
                              {specificTourData?.nights}N
                            </p>
                          </div>
                        </div>

                        <div className="">
                          <div className="trip-detail-price-card my-4">
                            <div>
                              <p className="mb-1">Starting from</p>
                              <div className="d-flex">
                                <p className="trip-price">
                                  ₹{" "}
                                  {
                                    specificTourData?.price_per_package
                                      ?.base_price
                                  }
                                  /-
                                </p>
                                <p className="trip-price-per">Per Person</p>
                              </div>
                            </div>
                          </div>
                          <div className="booking-personal-awesome d-flex">
                            <p className="ps-2">🥳</p>
                            <p className="ms-3">
                              Ready, set, jet! Book now for instant excitement!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tripSection === 3 && (
              <div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="booking-personal-detail-left">
                        <p className="booking-personal-detail-head">
                          Booking Details
                        </p>

                        <div className="py-4 px-4">
                          <div className="room-div d-flex">
                            <i class="fa-solid fa-bed"></i>
                            <p className="">Room Sharing</p>
                          </div>

                          <div className="room-sharing-indicator-main">
                            <div>
                              <p>Sharing</p>
                            </div>

                            <div className="d-flex">
                              <p
                                className="me-3 fw-bold my-auto"
                                style={{ fontSize: "14px" }}
                              >
                                Sharing
                              </p>

                              <div className="indicator-main">
                                <i
                                  class="fa-solid fa-minus"
                                  onClick={() => dispatch(decrement())}
                                ></i>
                                <p>{count}</p>
                                <i
                                  class="fa-solid fa-plus"
                                  onClick={() => dispatch(increment())}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="position-relative booking-detail-right">
                        <div className="booking-personal-trip-detail-main d-flex">
                          <div className="booking-personal-trip-detail">
                            <h1>{specificTourData?.short_description}</h1>
                            <p className="mt-1">
                              {selectedStartDate} - {selectedEndDate}
                            </p>
                          </div>
                          <div className="trip-duration-div">
                            <p className="trip-duration">
                              {specificTourData?.days}D/
                              {specificTourData?.nights}N
                            </p>
                          </div>
                        </div>

                        <div className="payment-details-div">
                          <p className="booking-personal-detail-head">
                            Booking Details
                          </p>

                          <div className="py-3 px-4 payment-detail-content">
                            <p>Sharing</p>

                            <div className="d-flex gap-2">
                              <p className="fw-bold">
                                ₹{" "}
                                {
                                  specificTourData?.price_per_package
                                    ?.base_price
                                }
                                /-
                              </p>
                              <span>x</span>
                              <p>{count}</p>
                            </div>
                          </div>

                          <div className="py-3 px-4 payment-detail-content">
                            <p>GST @ 5%</p>

                            <div>
                              <p className="fw-bold">
                                ₹ {gstPerUnit * count}/-
                              </p>
                            </div>
                          </div>

                          <div className="py-3 px-4 payment-detail-content">
                            <p>TCS @ 5%</p>

                            <div>
                              <p className="fw-bold">
                                ₹ {tcsPerUnit * count}/-
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 px-4 pb-4 total-cost-pament">
                            <p className="total">Total</p>
                            <p className="amount">₹ {total}/-</p>
                          </div>
                        </div>

                        <div className="d-flex justify-content-end">
                          <button
                            className="booking-common-btn m-0"
                            onClick={() => setTripSection(4)}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tripSection === 4 && (
              <div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="booking-personal-detail-left">
                        <p className="booking-personal-detail-head">
                          Booking Details
                        </p>

                        <div className="py-3 px-4 mt-4">
                          <p className="booking-personal-detail-head p-0 border-0">
                            Booking Details
                          </p>

                          <div className="booking-confirm-detail">
                            <div className="inner-div">
                              <i class="fa-solid fa-circle-user"></i>
                              <p className="fw-bold">
                                {bookingPersonalDetail?.name}
                              </p>
                            </div>

                            <div className="inner-div">
                              <i class="fa-solid fa-envelope"></i>
                              <p className="">{bookingPersonalDetail?.email}</p>
                            </div>

                            <div className="inner-div">
                              <i class="fa-solid fa-phone-volume"></i>
                              <p className="">
                                {bookingPersonalDetail?.phone_number}
                              </p>
                            </div>

                            <div className="inner-div">
                              <i class="fa-solid fa-people-group"></i>
                              <p className="">{count}</p>
                            </div>
                          </div>
                        </div>

                        <div className="py-3 px-4">
                          <p className="booking-personal-detail-head p-0 border-0">
                            Payment Details
                          </p>

                          <div className="booking-confirm-detail">
                            <div className="pb-3 payment-detail-content">
                              <p>Sharing</p>

                              <div className="d-flex gap-2">
                                <p className="fw-bold">₹ 1,69,990/-</p>
                                <span>x</span>
                                <p>{count}</p>
                              </div>
                            </div>

                            <div className="pb-3 payment-detail-content">
                              <p>GST @ 5%</p>

                              <div>
                                <p className="fw-bold">
                                  ₹ {gstPerUnit * count}/-
                                </p>
                              </div>
                            </div>

                            <div className=" pb-3 payment-detail-content">
                              <p>TCS @ 5%</p>

                              <div>
                                <p className="fw-bold">
                                  ₹ {tcsPerUnit * count}/-
                                </p>
                              </div>
                            </div>

                            <div className=" pb-3 payment-detail-content total-cost-pament">
                              <p className="fw-bold">Total</p>

                              <div>
                                <p className="fw-bold">₹ {total}/-</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="position-relative booking-detail-right">
                        <div className="booking-personal-trip-detail-main d-flex">
                          <div className="booking-personal-trip-detail">
                            <h1>{specificTourData?.short_description}</h1>
                            <p className="mt-1">
                              {selectedStartDate} - {selectedEndDate}
                            </p>
                          </div>
                          <div className="trip-duration-div">
                            <p className="trip-duration">
                              {specificTourData?.days}D/
                              {specificTourData?.nights}N
                            </p>
                          </div>
                        </div>

                        <div className="pay-full-amount-main">
                          <div className="d-flex justify-content-between pb-4">
                            <div className="d-flex">
                              <input
                                type="checkbox"
                                checked={paymentType === "full"}
                                onChange={() => setPaymentType("full")}
                              />
                              <p className="my-auto pay-full-text">
                                Pay full amount now
                              </p>
                            </div>

                            {paymentType === "full" ? (
                              <div className="pay-full-amount">
                                <p>₹ {total}/-</p>
                                <p className="convenience">+ Convenience fee</p>
                              </div>
                            ) : (
                              <div className="pay-half-amount">
                                <p>₹ {total}/-</p>
                              </div>
                            )}
                          </div>

                          <div className="pay-remaining-main">
                            <div className="d-flex">
                              <input
                                type="checkbox"
                                checked={paymentType === "half"}
                                onChange={() => setPaymentType("half")}
                              />
                              <p className="my-auto pay-full-text">
                                Book now & pay remaining amount later
                              </p>
                            </div>

                            <div className="d-flex justify-content-between mt-3">
                              <div className="d-flex">
                                <p className="my-auto">Pay to Book</p>
                              </div>

                              {paymentType === "half" ? (
                                <div className="pay-full-amount">
                                  <p>₹ 30,000/-</p>
                                  <p className="convenience">
                                    + Convenience fee
                                  </p>
                                </div>
                              ) : (
                                <div className="pay-half-amount">
                                  <p>₹ 30,000/-</p>
                                </div>
                              )}
                            </div>

                            <div className="d-flex justify-content-between mt-3">
                              <div className="d-flex">
                                <p className="my-auto">
                                  Pay due amount before 28 Aug
                                </p>
                              </div>
                              <div className="pay-half-amount">
                                <p>₹ 1,57,414/-</p>
                              </div>
                            </div>

                            <button
                              className="pay-now-amount m-0"
                              onClick={() => setOpen(true)}
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tripSection === 5 && (
              <div className="success-div">
                <h1>Payment Confirmed</h1>
                <p>
                  Your trip has been successfully booked. A confirmation email
                  with all the details has been sent to you.
                </p>

                <div className="d-flex justify-content-center">
                  <button
                    className="pay-now-amount-2 m-0"
                    onClick={() => navigate("/")}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CustomModal
        open={open}
        onClickOutside={() => {
          setOpen(false);
        }}
      >
        <>
          <div className="delete-model-view-main">
            <p className="text-center">Are you sure do you want to Pay Now?</p>
            <div className="row">
              <div className="col-6">
                <button
                  className="delete-btn yes"
                  onClick={() => handleSuccess()}
                >
                  Yes
                </button>
              </div>
              <div className="col-6">
                <button
                  className="delete-btn no"
                  onClick={() => setOpen(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      </CustomModal>
    </div>
  );
};

export default TourBookingPreview;
