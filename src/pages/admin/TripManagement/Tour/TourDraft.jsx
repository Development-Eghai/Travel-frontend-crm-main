import JoditEditor from 'jodit-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NonEmptyArrayValidation, NonEmptyValidation, normalizeEmptyFields, NumberValidation, SlugValidation, StringValidation } from '../../../../common/Validation';
import { CreateTripPackage, GetAllDestination, GetAllTourCategory, MultipleFileUpload, SingleFileUpload } from '../../../../common/api/ApiService';
import CreatableSelect from 'react-select/creatable';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';
import { errorMsg, successMsg } from '../../../../common/Toastify';

const TourCreation = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);
  const [activeTripTab, setActiveTripTab] = useState(1);
  const [activePricingTab, setActivePricingTab] = useState(1);

  const [destinationList, setDestinationList] = useState([])
  const [categoryList, setcategoryList] = useState([])


  const sectionTabs = [
    {
      id: 1,
      name: 'Trip Type',
      detail: {
        head: "Select Trip Type",
        para: "Choose the type of trip package you want to create. This will determine the available fields and options."
      }
    },
    {
      id: 2,
      name: 'Basic Info',
      detail: {
        head: "Basic Trip Informatione",
        para: "Provide basic details about the trip."
      }
    },
    {
      id: 3,
      name: 'Details',
      detail: {
        head: "Trip Details",
        para: "Provide detailed information about the trip"
      }
    },
    {
      id: 4,
      name: 'Pricing',
      detail: {
        head: "Pricing & Inclusions",
        para: "Set pricing and inclusion details for the trip."
      }
    },
    {
      id: 5,
      name: 'SEO',
      detail: {
        head: "SEO & Advanced Options",
        para: "Optimize your trip for search engines and provide advanced options."
      }
    },

  ]

  const TripTypeCard = [
    {
      id: 1,
      head: 'Customized Package',
      para: 'Tailor-made trips for individual customers'
    },
    {
      id: 2,
      head: 'Fixed Departure',
      para: 'Scheduled group trips with fixed dates'
    },

  ]

  const PricingTab = [
    {
      id: 1,
      head: 'Price Per Person',
      para: 'Individual pricing model'
    },
    {
      id: 2,
      head: 'Price Per Package',
      para: 'Package-based pricing'
    },
  ]

  const getAllDestination = async () => {
    const response = await GetAllDestination()
    if (response && response?.statusCode === 200) {
      setDestinationList(response?.data)
    }
  }

  const getAllTourCategory = async () => {
    const response = await GetAllTourCategory()
    if (response && response?.statusCode === 200) {
      setcategoryList(response?.data);
    }
  }


  // Itinerarys based

  const [itinerarys, setItinerary] = useState([{ day_title: "", day_description: "", day_images: [] }]);

  const addItinerary = () => {
    setItinerary([...itinerarys, { day_title: "", day_description: "", day_images: [] }]);
  };

  const deleteItinerary = (indexToRemove) => {
    if (indexToRemove !== 0) {
      const updatedItinerary = itinerarys.filter((_, index) => index !== indexToRemove);
      setItinerary(updatedItinerary);
    }
  };

  const updateItinerary = (index, key, value) => {
    const updatedItinerary = [...itinerarys];
    updatedItinerary[index][key] = value;
    setItinerary(updatedItinerary);
  };

  const handleBlurCustomizedItinerary = (index) => {
    const current = itinerarys[index];
    const title = current.day_title?.trim();
    const desc = current.day_description?.trim();

    let message = "";

    if ((title && !desc) || (!title && desc)) {
      message = `Both title and description are required if either is filled for Day ${index + 1}.`;
    }

    const isValid = message === "";

    setValidation(prev => ({
      ...prev,
      [`itinerarys_${index}_day_title`]: {
        status: isValid,
        message,
      },
      [`itinerarys_${index}_day_description`]: {
        status: isValid,
        message,
      },
    }));
  };



  // File Uploads

  const handleFileUpload = async (e, key, tripType) => {
    const file = e.target.files[0];

    if (!file) return;
    let image_name = e?.target?.files[0]?.name;
    let image_type = image_name?.split(".");
    let type = image_type?.pop();
    if (type !== "jpeg" && type !== "png" && type !== "jpg" && type !== "pdf" && type !== "webp") {
      errorMsg
        ("Unsupported file type")
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("storage", "local");
    const response = await SingleFileUpload(formData);

    if (response?.statusCode !== 200) {
      errorMsg("Failed to upload file")
      return;
    }
    const path = response?.path;

    if (tripType === "customized") {
      setCustomizedPackageData({ ...customizedPackageData, [key]: path })
    }
    if (tripType === "fixed_departure") {
      setFixedPackageData({ ...fixedPackageData, [key]: path })
    }
    if (validation[key]) {
      setValidation({ ...validation, [key]: false })
    }
    successMsg("File upload successfully")
  };

  const handleMultipleFileUpload = async (e, key, index, trip_type) => {
    const file = e.target.files[0];

    if (!file) return;
    let image_name = e?.target?.files[0]?.name;
    let image_type = image_name?.split(".");
    let type = image_type?.pop();
    if (type !== "jpeg" && type !== "png" && type !== "jpg" && type !== "pdf" && type !== "webp") {
      errorMsg
        ("Unsupported file type")
      return;
    }

    const formData = new FormData();
    formData.append("files", file);
    formData.append("storage", "local");
    const response = await MultipleFileUpload(formData);

    if (response?.statusCode !== 200) {
      errorMsg("Failed to upload Image")
      return;
    }

    const path = response?.path;

    if (key === "hero_slider_images") {
      const existingImages = trip_type === "fixed_departure" ? fixedPackageData?.hero_slider_images || [] : customizedPackageData?.hero_slider_images || [];

      const newPaths = Array.isArray(path)
        ? path.flat()
        : [path];

      const updatedImages = [...existingImages, ...newPaths];


      if (trip_type === "fixed_departure") {
        setFixedPackageData({
          ...fixedPackageData,
          hero_slider_images: updatedImages,
        });
      }
      else {
        setCustomizedPackageData({
          ...customizedPackageData,
          hero_slider_images: updatedImages,
        });
      }
      if (validation?.hero_slider_images?.status === false) {
        setValidation((prev) => ({
          ...prev,
          hero_slider_images: { status: true, message: "" },
        }));
      }

    }

    if (key === "gallery_images") {
      const existingImages = trip_type === "fixed_departure" ? fixedPackageData?.gallery_images || [] : customizedPackageData?.gallery_images || [];

      const newPaths = Array.isArray(path)
        ? path.flat()
        : [path];

      const updatedImages = [...existingImages, ...newPaths];


      if (trip_type === "fixed_departure") {
        setFixedPackageData({
          ...fixedPackageData,
          gallery_images: updatedImages,
        });
      }
      else {
        setCustomizedPackageData({
          ...customizedPackageData,
          gallery_images: updatedImages,
        });
      }

      if (validation?.gallery_images?.status === false) {
        setValidation((prev) => ({
          ...prev,
          gallery_images: { status: true, message: "" },
        }));
      }
    }

    if (key === "day_images") {
      const existingDayImages = itinerarys[index].day_images || [];

      const newPaths = Array.isArray(path) ? path.flat() : [path];

      const updatedDayImages = [...existingDayImages, ...newPaths];

      const updatedItinerary = [...itinerarys];
      updatedItinerary[index].day_images = updatedDayImages;
      setItinerary(updatedItinerary);
    }

    successMsg("Image uploaded successfully");


  };

  // customized package

  const [customizedPackageData, setCustomizedPackageData] = useState({});
  const [validation, setValidation] = useState({})

  const handleBlurCustomized = (fieldName, value) => {
    const updatedData = {
      ...customizedPackageData,
      [fieldName]: value,
    };

    const cleanedData = normalizeEmptyFields(updatedData);
    const fieldValidation = validateDetails(cleanedData);

    setValidation((prev) => ({
      ...prev,
      [fieldName]: fieldValidation[fieldName],
    }));
  };

  const handleCustomizedPackageChange = (e) => {
    const { name, value } = e.target
    setCustomizedPackageData({ ...customizedPackageData, [name]: value })
    if (validation[name]) {
      setValidation({ ...validation, [name]: false })
    }
  }

  const validateDetails = (data) => {
    let validate = {};

    validate.trip_title = StringValidation(data?.trip_title);
    validate.trip_category = NonEmptyValidation(data?.trip_category);
    validate.destination = NonEmptyValidation(data?.destination);
    validate.slug = SlugValidation(data?.slug);
    validate.days = NumberValidation(data?.days);
    validate.nights = NumberValidation(data?.nights);
    validate.short_description = NonEmptyValidation(data?.short_description);
    validate.long_description = NonEmptyValidation(data?.long_description);
    validate.primary_trip_image = NonEmptyValidation(data?.primary_trip_image);
    validate.hero_slider_images = NonEmptyArrayValidation(data?.hero_slider_images);


    validate.meta_title = NonEmptyValidation(data?.meta_title);
    validate.meta_description = NonEmptyValidation(data?.meta_description);
    validate.meta_tags = NonEmptyValidation(data?.meta_tags);
    validate.gallery_images = NonEmptyArrayValidation(data?.gallery_images);

    return validate;
  };


  // Fixed Departure package
  const [fixedPackageData, setFixedPackageData] = useState({});
  const handleFixedPackageChange = (e) => {
    const { name, value } = e.target
    setFixedPackageData({ ...fixedPackageData, [name]: value })
    if (validation[name]) {
      setValidation({ ...validation, [name]: false })
    }
  }


  //Fixed Departure Departure Slot Arrays

  const [departureSlots, setDepartureSlots] = useState([{
    start_date: null,
    end_date: null,
    total_slots: "",
    available_slots: "",
    special_price: "",
    status: ""
  }]);
  const [departureSlotsValidation, setDepartureSlotsValidation] = useState({});

  const addDepartureSlots = () => {
    setDepartureSlots([
      ...departureSlots,
      {
        start_date: null,
        end_date: null,
        total_slots: "",
        available_slots: "",
        special_price: "",
        status: ""
      }
    ]);
  };

  const deleteDepartureSlots = (indexToRemove) => {
    if (indexToRemove !== 0) {
      const updatedItinerary = departureSlots.filter((_, index) => index !== indexToRemove);
      setDepartureSlots(updatedItinerary);
    }
  };

  const updateDepartureSlots = (index, key, value) => {
    const updatedSlots = [...departureSlots];
    updatedSlots[index][key] = value;
    setDepartureSlots(updatedSlots);
  };

  const handleBlurDepartureSlots = (fieldName, value, index) => {
    const isValid = value !== "" && value !== null;
    const message = isValid ? "" : `is required`;

    setDepartureSlotsValidation((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [fieldName]: {
          status: isValid,
          message,
        }
      }
    }));
  };

  const [fixedPricePerPerson, setFixedPricePerPerson] = useState({})
  const [fixedPricePerPersonValidation, setFixedPricePerPersonValidation] = useState({})

  const handleFixedPricePerPersonChange = (key, value) => {
    setFixedPricePerPerson({ ...fixedPricePerPerson, [key]: value })
    if (fixedPricePerPersonValidation[key]) {
      setFixedPricePerPersonValidation({ ...fixedPricePerPersonValidation, [key]: false })
    }
  }

  const handleFixedPricePerPersonBlur = (fieldName, value) => {
    const updatedData = {
      ...fixedPricePerPerson,
      [fieldName]: value,
    };

    const cleanedData = normalizeEmptyFields(updatedData);
    const fieldValidation = FixedPricePerPackageValidation(cleanedData);

    setFixedPricePerPersonValidation((prev) => ({
      ...prev,
      [fieldName]: fieldValidation[fieldName],
    }));
  };


  const FixedPricePerPackageValidation = (data) => {
    let validate = {};

    validate.base_price = NumberValidation(data?.base_price);
    validate.currency = NonEmptyValidation(data?.currency);
    validate.start_from = NonEmptyValidation(data?.start_from);
    validate.double_occupancy = NonEmptyValidation(data?.double_occupancy);
    validate.quad_occupancy = NonEmptyValidation(data?.quad_occupancy);
    validate.triple_occupancy = NonEmptyValidation(data?.triple_occupancy);
    validate.inclusion = NonEmptyValidation(data?.inclusion);
    validate.exclusion = NonEmptyValidation(data?.exclusion);
    validate.key_highlights = NonEmptyValidation(data?.key_highlights);
    validate.cancellation_policy = NonEmptyValidation(data?.cancellation_policy);

    return validate;
  }


  // console.log(departureSlots, "departureSlots")
  // console.log(fixedPackageData, "fixedPackageData")
  // console.log(fixedPricePerPerson, "fixedPricePerPerson")


  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // const [numberOfDays, setNumberOfDays] = useState(5);

  // useEffect(() => {
  //   if (startDate && numberOfDays > 0) {
  //     const end = new Date(startDate);
  //     end.setDate(end.getDate() + (numberOfDays - 1));
  //     setEndDate(end);
  //   }
  // }, [startDate, numberOfDays]);

  const editor = useRef(null);


  useEffect(() => {
    getAllDestination()
    getAllTourCategory()
  }, [])



  // PricingDetail Based Arrays

  const [pricingDetail, setPricingDetail] = useState([{ start_date: "", end_date: "", season_price: "", season_name: "", }]);
  const [pricingDetailPackage, setPricingDetailPackage] = useState([{ start_date: "", end_date: "", season_price: "", season_name: "", }]);


  const addPricingDetail = (dataValue) => {
    if (dataValue === "pricingPerPerson") {
      setPricingDetail([...pricingDetail, { start_date: "", end_date: "", season_price: "", season_name: "", }]);
    }
    // if (dataValue === "pricingPerPackage") {
    //   setPricingDetailPackage([...pricingDetailPackage, { start_date: "", end_date: "", season_price: "", season_name: "", }]);
    // }
  };

  const deletePricingDetail = (indexToRemove, dataValue) => {
    if (dataValue === "pricingPerPerson") {
      if (indexToRemove !== 0) {
        const updatedItinerary = pricingDetail.filter((_, index) => index !== indexToRemove);
        setPricingDetail(updatedItinerary);
      }
    }

    // if (dataValue === "pricingPerPackage") {
    //   if (indexToRemove !== 0) {
    //     const updatedItinerary = pricingDetailPackage.filter((_, index) => index !== indexToRemove);
    //     setPricingDetailPackage(updatedItinerary);
    //   }
    // }


  };

  const updatePricingDetail = (index, key, value, dataValue) => {
    if (dataValue === "pricingPerPerson") {
      const updatedItinerary = [...pricingDetail];
      updatedItinerary[index][key] = value;
      setPricingDetail(updatedItinerary);
    }
    // if (dataValue === "pricingPerPackage") {
    //   const updatedItinerary = [...pricingDetailPackage];
    //   updatedItinerary[index][key] = value;
    //   setPricingDetailPackage(updatedItinerary);
    // }

  };

  // PricePerPerson based

  const [customPricePerPerson, setCustomPricePerPerson] = useState({})
  const [pricingValidation, setPricingValidation] = useState({})


  const [customPricePerPackage, setCustomPricePerPackage] = useState({})

  const handleBlurPricingDetails = (index) => {
    const current = pricingDetail[index];

    const start_date = current.start_date ? String(current.start_date).trim() : '';
    const end_date = current.end_date ? String(current.end_date).trim() : '';
    const season_price = current.season_price ? String(current.season_price).trim() : '';
    const season_name = current.season_name ? String(current.season_name).trim() : '';

    const anyFilled = start_date || end_date || season_price || season_name;
    const allFilled = start_date && end_date && season_price && season_name;
    const isValid = !anyFilled || allFilled;

    const message = isValid
      ? ""
      : `All fields are required if any one is filled in Season ${index + 1}.`;

    const status = Boolean(isValid);

    setPricingValidation((prev) => ({
      ...prev,
      [`pricingDetail_${index}_start_date`]: {
        status,
        message,
      },
      [`pricingDetail_${index}_end_date`]: {
        status,
        message,
      },
      [`pricingDetail_${index}_season_price`]: {
        status,
        message,
      },
      [`pricingDetail_${index}_season_name`]: {
        status,
        message,
      },
    }));
  };

  const handlePricePackageChange = (key, value, priceType) => {
    // if (priceType === "per_person") {
    setCustomPricePerPerson({ ...customPricePerPerson, [key]: value })
    if (pricingValidation[key]) {
      setPricingValidation({ ...pricingValidation, [key]: false })
    }
    // }
    // if (priceType === "per_package") {
    //   setCustomPricePerPackage({ ...customPricePerPackage, [key]: value })
    //   if (pricingValidation[key]) {
    //     setPricingValidation({ ...pricingValidation, [key]: false })
    //   }
    // }
  }

  const handleBlurPricing = (fieldName, value) => {
    const updatedData = {
      ...customPricePerPerson,
      [fieldName]: value,
    };

    const cleanedData = normalizeEmptyFields(updatedData);
    const fieldValidation = pricingValidationDetail(cleanedData);

    setPricingValidation((prev) => ({
      ...prev,
      [fieldName]: fieldValidation[fieldName],
    }));

  };

  const pricingValidationDetail = (data) => {
    let validate = {};

    validate.base_price = NumberValidation(data?.base_price);
    validate.currency = NonEmptyValidation(data?.currency);
    validate.inclusion = NonEmptyValidation(data?.inclusion);
    validate.exclusion = NonEmptyValidation(data?.exclusion);
    validate.key_highlights = NonEmptyValidation(data?.key_highlights);
    validate.cancellation_policy = NonEmptyValidation(data?.cancellation_policy);

    return validate;
  }


  // Tags Creation

  const [selectedCreatedTags, setCreatedTags] = useState([]);
  const [options, setOptions] = useState([]);

  const handleCreatedTags = (newValue) => {
    setCreatedTags(newValue);
  };

  const handleCreateOption = (inputValue) => {
    const formattedLabel =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();

    const newOption = {
      label: formattedLabel,
      value: inputValue.toLowerCase().replace(/\s+/g, '-'),
    };

    setOptions(prev => [...prev, newOption]);
    setCreatedTags(prev => [...prev, newOption]);
  };

  const isFullyFilled = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (key === "seasonal_pricing") {
        if (!Array.isArray(value) || value.length === 0) return false;

        for (const item of value) {
          if (
            !item.start_date ||
            !item.end_date ||
            !item.season_price ||
            !item.season_name
          ) {
            return false;
          }
        }
      } else {
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return false;
        }
      }
    }

    return true;
  };



  // handleCustomPackageSubmit

  const handleCustomPackageSubmit = async (e) => {
    customizedPackageData.day_wise_itenary = itinerarys
    const isValidePricingDetail = pricingValidationDetail(customPricePerPerson)
   console.log(isValidePricingDetail, "isValidePricingDetail")
    // customPricePerPerson.seasonal_pricing = pricingDetail
    customPricePerPerson.seasonal_pricing = pricingDetail
    // console.log(customPricePerPerson, 'customPricePerPerson')

    // if (isFullyFilled(customPricePerPerson)) {
    //   customizedPackageData.price_per_person = customPricePerPerson
    // }

    if (isFullyFilled(customPricePerPerson)) {
      activePricingTab === 1 ? customizedPackageData.price_per_person = customPricePerPerson : customizedPackageData.price_per_package = customPricePerPerson
    }

    customizedPackageData.nights = (customizedPackageData?.days - 1).toString()
    delete customizedPackageData.undefined

    const cleanedData = normalizeEmptyFields(customizedPackageData);
    // console.log(cleanedData, "cleanedData")
    const isValideFirst = validateDetails(cleanedData)
    let isValidePrice = {}
    activePricingTab === 1 ? isValidePrice = pricingValidationDetail(cleanedData?.price_per_package) : isValidePrice = pricingValidationDetail(cleanedData?.price_per_person)

    // if (Object.values(isValideFirst).every((data) => data.status === true) &&
    //   Object.values(isValidePrice).every((data) => data.status === true)) {

    // }
    // const response = await CreateTripPackage({ customizePackage: cleanedData })
    // if (response && response?.statusCode === 200) {
    //   navigate(-1)
    //   successMsg("Trip created successsfully")
    // }

  }

  const handleFixedPackageSubmit = async (e) => {
    fixedPackageData.departure_Slots = departureSlots
    fixedPackageData.nights = (fixedPackageData?.days - 1).toString()
    fixedPackageData.price_per_package = fixedPricePerPerson

    const cleanedData = normalizeEmptyFields(fixedPackageData);
    const isValideFirst = validateDetails(cleanedData)
    const isValidePricePerPerson = FixedPricePerPackageValidation(cleanedData?.price_per_package)
    // console.log(isValideFirst, "isValideFirst", isValidePricePerPerson, "isValidePricePerPerson")
    // console.log(cleanedData, "cleanedData")

    if (Object.values(isValideFirst).every((data) => data.status === true) &&
      Object.values(isValidePricePerPerson).every((data) => data.status === true)) {
      // console.log("validate success")
    }

    const response = await CreateTripPackage({ fixedPackage: cleanedData })
    // console.log(response,"response")
    if (response && response?.statusCode === 200) {
      // console.log(response?.data, "response-FixedPackageSubmit")
      navigate(-1)
      successMsg("Trip created successsfully")
    }


    // console.log(customizedPackageData, "customizedPackageData-customizedPackageData")

  }

  // console.log(customPricePerPerson, "customPricePerPerson-customPricePerPerson")
  // console.log(customizedPackageData, "customizedPackageData-customizedPackageData")

  return (
    <div className='admin-content-main'>

      <div className='d-flex justify-content-around mt-2'>
        {sectionTabs.map((item, index) => (
          <div className='trip-creation-steps cursor'>
            <p className={`steps-main ${activeTab === item?.id ? 'active' : ''}`} onClick={() => setActiveTab(item?.id)}>{item?.id}</p>
            <p className='step-para'>{item?.name}</p>
          </div>
        ))}
      </div>

      <div className='mt-4 d-flex justify-content-between '>

        {activeTab !== 1 && (
          <button className={`admin-add-button ${activeTab === 0 ? 'disabled' : ''}`}
            onClick={() => { setActiveTab(activeTab - 1); setValidation({}) }}><i className="fa-solid fa-arrow-left me-2"></i>Previous</button>
        )}


        {activeTab !== sectionTabs?.length && (
          <button className={`admin-add-button ${activeTab === sectionTabs?.length ? 'disabled' : ''}`}
            onClick={() => { setActiveTab(activeTab + 1); setValidation({}) }}>Next <i className="fa-solid fa-arrow-right ms-2"></i></button>
        )}

      </div>

      <div className='trip-creation-form'>
        <h4>{sectionTabs[activeTab - 1]?.id}.{sectionTabs[activeTab - 1]?.detail?.head}</h4>
        <p>{sectionTabs[activeTab - 1]?.detail?.para}</p>
      </div>

      <div className='mt-3 mb-5'>

        {activeTab == 1 && (
          <>
            <div className='d-flex mb-4'>
              {TripTypeCard.map((item, index) => (
                <div className={`trip-type-card ${activeTripTab === item?.id ? 'active' : ''}`} key={item?.id} onClick={() => setActiveTripTab(item?.id)}>
                  <div className='my-auto'>
                    <input type='checkbox' checked={activeTripTab === item?.id} />
                  </div>
                  <div className='d-flex flex-column trip-type-card-content ms-2'>
                    <h6>{item?.head}</h6>
                    <p>{item?.para}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab == 2 && activeTripTab == 1 && (

          <>
            <h3 className='my-3 mt-4 text-decoration-underline'>Customized Package</h3>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Trip Title <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Trip Title' name="trip_title"
                    value={customizedPackageData?.trip_title}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.trip_title?.status === false && validation?.trip_title?.message && (
                    <p className='error-para'>Trip Title {validation.trip_title.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Destination  <span className='required-icon'>*</span></label>
                  <select name="destination" value={customizedPackageData?.destination}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  >
                    <option value="" defaultValue={""}>Select Destination</option>
                    {destinationList?.map((item, index) => (
                      <option key={index} value={item?._id}>{item?.destination_name}</option>
                    ))}
                  </select>
                  {validation?.destination?.status === false && validation?.destination?.message && (
                    <p className='error-para'>Destination {validation.destination.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Trip Category  <span className='required-icon'>*</span></label>
                  <select name="trip_category" value={customizedPackageData?.trip_category}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  >
                    <option value="" defaultValue={""}>Select Category</option>
                    {categoryList?.map((item, index) => (
                      <option key={index} value={item?._id}>{item?.name}</option>
                    ))}
                  </select>
                  {validation?.trip_category?.status === false && validation?.trip_category?.message && (
                    <p className='error-para'>Trip Category {validation.trip_category.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Slug <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Trip Title' name="slug"
                    value={customizedPackageData?.slug}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.slug?.status === false && validation?.slug?.message && (
                    <p className='error-para'>Slug {validation.slug.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Duration (Days) <span className='required-icon'>*</span></label>
                  <input type="number" placeholder='Number of Days' name="days"
                    value={customizedPackageData?.days}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                    onWheelCapture={e => { e.target.blur() }}
                    onKeyDown={(evt) => ["e", "E", "+", "-",].includes(evt.key) && evt.preventDefault()} />
                  {validation?.days?.status === false && validation?.days?.message && (
                    <p className='error-para'>Days {validation.days.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Nights <span className='required-icon'>*</span></label>
                  <input type="number" placeholder='Number of Nights' name="nights"
                    value={customizedPackageData?.days > 0 ? customizedPackageData.days - 1 : ""}
                    readOnly
                    onWheelCapture={e => { e.target.blur() }}
                    onKeyDown={(evt) => ["e", "E", "+", "-", "-1"].includes(evt.key) && evt.preventDefault()} />
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Short Description / Tagline <span className='required-icon'>*</span></label>
                  <textarea type="text" placeholder='Short Description For Listing Pages' name="short_description"
                    value={customizedPackageData?.short_description}
                    className="form-control"
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.short_description?.status === false && validation?.short_description?.message && (
                    <p className='error-para'>Short Description {validation.short_description.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Select Featured Trip Page </label>
                  <select onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                    name="featured_trip_page"
                    value={customizedPackageData?.featured_trip_page}>
                    <option value="" defaultValue={""}>Select Featured Page</option>
                    <option value="Home">Home</option>
                    <option value="Destination">Destination</option>
                    <option value="Payment Page">Payment Page</option>
                  </select>
                </div>
              </div>


            </div>
          </>

        )}

        {activeTab == 3 && activeTripTab == 1 && (
          <>
            <h3 className='my-3 mt-4 text-decoration-underline'>Customized Package</h3>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='admin-input-div'>
                  <label className='text-area-label'>Long Description <span className='required-icon'>*</span></label>
                  <div className="mt-2">
                    <JoditEditor
                      ref={editor}
                      value={customizedPackageData?.long_description || ""}
                      config={{
                        readonly: false,
                        height: 300,
                        toolbarButtonSize: "middle",
                        askBeforePasteHTML: false,
                        askBeforePasteFromWord: false,
                        defaultActionOnPaste: "insert_clear_html",
                        allowPaste: true
                      }}
                      tabIndex={1}
                      onBlur={(newContent) =>
                        setCustomizedPackageData({
                          ...customizedPackageData,
                          long_description: newContent,
                        })
                      }
                    />
                    {validation?.long_description?.status === false && validation?.long_description?.message && (
                      <p className='error-para'>Long Description {validation.long_description.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Tags to be used in search </label>
                  <CreatableSelect
                    isMulti
                    placeholder="Type and Enter Tags"
                    value={selectedCreatedTags}
                    onChange={handleCreatedTags}
                    onCreateOption={handleCreateOption}
                    options={options}
                  />
                </div>
              </div>

              <div className='col-lg-6'>
                <div className="admin-input-div">
                  <label>Primary Trip Image <span className='required-icon'>*</span></label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleFileUpload(e, "primary_trip_image", "customized")}
                  />
                  {validation?.primary_trip_image?.status === false && validation?.primary_trip_image?.message && (
                    <p className='error-para'>Primary Trip Image {validation.primary_trip_image.message}</p>
                  )}
                  {customizedPackageData?.primary_trip_image && (
                    <div className='upload-image-div destination-image-div'>
                      <div className='upload-image-div'>
                        <img src={`${BACKEND_DOMAIN}${customizedPackageData?.primary_trip_image}`} alt="Category-Preview" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='col-lg-12'>
                <div className='col-lg-6'>
                  <div className="admin-input-div">
                    <label>Add Hero Slider Images <span className='required-icon'>*</span></label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => handleMultipleFileUpload(e, "hero_slider_images")}
                    />
                    {validation?.hero_slider_images?.status === false && validation?.hero_slider_images?.message && (
                      <p className='error-para'>Hero Slider Images {validation.hero_slider_images.message}</p>
                    )}

                    {customizedPackageData?.hero_slider_images && customizedPackageData?.hero_slider_images?.length > 0 && (
                      <div className="d-flex flex-wrap">
                        {customizedPackageData?.hero_slider_images?.map((image, index) => (
                          <div className='upload-image-div destination-image-div'>
                            <div>
                              <img src={`${BACKEND_DOMAIN}${image}`} alt="Category-Preview" key={index} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>

            {activeTripTab == 1 && (
              <div className='itenary-main my-5'>
                <div className='admin-input-div mt-0'>
                  <label>Day Wise Itenary </label>
                </div>

                <div className='itenary-list-main mt-4 '>
                  <div className='itenary-content mb-5'>
                    <h5 className='text-center'>Itinerary Builder</h5>
                    <p className='text-center'>Create day-by-day itinerary for your customized package</p>
                  </div>

                  <div className="destination-faq">
                    <div className="accordion" id="accordionExample">
                      {itinerarys.map((itinerary, index) => (
                        <div className='mt-4'>
                          <div className="accordion-item" key={index} >
                            <h2 className="accordion-header d-flex align-items-center justify-content-between">
                              <button
                                className="accordion-button flex-grow-1 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                              >
                                DAY {index + 1}
                              </button>
                              <div className="ms-3 d-flex gap-2">
                                <button className="destination-faq-add me-3" onClick={addItinerary}>
                                  Add
                                </button>
                                {index !== 0 && (
                                  <button
                                    className="destination-faq-add faq-delete me-4"
                                    onClick={() => deleteItinerary(index)}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </h2>

                            <div
                              id={`collapse${index}`}
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <div className="admin-input-div mb-3">
                                  <label className=''>Day Title <span className='required-icon'>*</span></label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={itinerary?.day_title}
                                    placeholder="Enter Day Title"
                                    onChange={(e) =>
                                      updateItinerary(index, "day_title", e.target.value)
                                    }
                                    onBlur={() => handleBlurCustomizedItinerary(index)}
                                  />
                                  {validation[`itinerarys_${index}_day_title`]?.status === false && (
                                    <div className="text-danger small">
                                      {validation[`itinerarys_${index}_day_title`].message}
                                    </div>
                                  )}
                                </div>

                                <div className="admin-input-div admin-desti-faq">
                                  <label>Day Description <span className='required-icon'>*</span></label>
                                  <textarea
                                    className="form-control"
                                    placeholder="Enter Day Description"
                                    value={itinerary?.day_description}
                                    onChange={(e) =>
                                      updateItinerary(index, "day_description", e.target.value)
                                    }
                                    onBlur={(e) => handleBlurCustomizedItinerary(index, "day_description", e.target.value)}
                                  />
                                  {validation[`itinerarys_${index}_day_description`]?.status === false && (
                                    <div className="text-danger small">
                                      {validation[`itinerarys_${index}_day_description`].message}
                                    </div>
                                  )}
                                </div>

                                <div className="admin-input-div admin-desti-faq">
                                  <label>Day Images (Optional) </label>
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="form-control"
                                    // onChange={(e) =>
                                    //   updateItinerary(index, "day_images", e.target.files)
                                    // }
                                    onChange={(e) => handleMultipleFileUpload(e, "day_images", index)}
                                  />


                                  {itinerary?.day_images && itinerary?.day_images?.length > 0 && (
                                    <div className="d-flex flex-wrap">
                                      {itinerary?.day_images?.map((image, index) => (
                                        <div className='upload-image-div destination-image-div'>
                                          <div>
                                            <img src={`${BACKEND_DOMAIN}${image}`} alt="Category-Preview" key={index} />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab == 4 && activeTripTab == 1 && (
          <>
            <h3 className='my-3 mt-4 text-decoration-underline'>Customized Package</h3>
            {activeTripTab == 1 && (
              <div className='d-flex mb-4'>
                {PricingTab.map((item, index) => (
                  <div className={`trip-type-card ${activePricingTab === item?.id ? 'active' : ''} pricing-tab-card`} key={item?.id} onClick={() => { setActivePricingTab(item?.id); setPricingValidation({}) }}>
                    <div className='d-flex flex-column trip-type-card-content ms-2'>
                      <h6>{item?.head}</h6>
                      <p>{item?.para}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTripTab == 2 && (
              <div className='d-flex mb-4'>
                <div className={`trip-type-card ${activePricingTab === 1 ? 'active' : ''} pricing-tab-card`} onClick={() => setActivePricingTab(1)}>
                  <div className='d-flex flex-column trip-type-card-content ms-2'>
                    <h6>{PricingTab[1]?.head}</h6>
                    <p>{PricingTab[1]?.para}</p>
                  </div>
                </div>
              </div>
            )}

            {/* {activeTripTab == 1 && activePricingTab === 1 && ( */}
            <>
              <h3>Customized Package - Price Per Person</h3>
              <div className='itenary-main my-5'>
                <h5 className='fw-bold mb-4'>Price Configuration</h5>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='admin-input-div mt-0'>
                      <label>Base Price <span className='required-icon'>*</span></label>
                      <input type="number" placeholder='Base Price' name='base_price'
                        value={customPricePerPerson?.base_price}
                        onChange={(e) => handlePricePackageChange("base_price", e.target.value, "per_person")}
                        onBlur={(e) => handleBlurPricing(e.target.name, e.target.value)}
                        onWheelCapture={e => { e.target.blur() }}
                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                      />
                      {pricingValidation?.base_price?.status === false && pricingValidation?.base_price?.message && (
                        <p className='error-para'>Base Pricing {pricingValidation.base_price.message}</p>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-6'>
                    <div className='admin-input-div mt-0'>
                      <label>Currency  <span className='required-icon'>*</span></label>
                      <select value={customPricePerPerson?.currency} name='currency'
                        onChange={(e) => handlePricePackageChange("currency", e.target.value, "per_person")}
                        onBlur={(e) => handleBlurPricing(e.target.name, e.target.value)}>
                        <option value="" defaultValue={""}>Select Currency</option>
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EURO">EURO (€)</option>
                      </select>
                      {pricingValidation?.currency?.status === false && pricingValidation?.currency?.message && (
                        <p className='error-para'>Currency {pricingValidation.currency.message}</p>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-6'>
                    <div className='admin-input-div'>
                      <label>Discounted Price (Optional)</label>
                      <input type="number" placeholder='Enter Discounted Price'
                        value={customPricePerPerson?.discount_price} name='discount_price'
                        onChange={(e) => handlePricePackageChange("discount_price", e.target.value, "per_person")}
                        onWheelCapture={e => { e.target.blur() }}
                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} />
                      {pricingValidation?.discount_price?.status === false && pricingValidation?.discount_price?.message && (
                        <p className='error-para'>Discounted Price {pricingValidation.discount_price.message}</p>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='admin-input-div'>
                      <label>Display as "Starts From" Price (Optional)</label>
                      <select value={customPricePerPerson?.start_from} name='start_from'
                        onChange={(e) => handlePricePackageChange("start_from", e.target.value, "per_person")}
                      >
                        <option value="" defaultValue={""}>Select Dispay Type</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    {/* <div className='col-lg-4'>
                      <div className='admin-input-div'>
                        <label>Display as "Starts From" Price (Optional)</label>
                        <label className="switch">
                          <input type="checkbox" checked={customPricePerPerson?.start_from}
                            onChange={(e) => handlePricePackageChange(e.target.checked)} name='start_from' />
                          <span className="slider-table round"></span>
                        </label>
                      </div>
                    </div> */}
                  </div>

                </div>

                {activeTripTab == 1 && (
                  <div className='itenary-list-main mt-4 '>
                    <div className='itenary-content mb-5'>
                      <h5 className='text-center'>Seasonal Pricing (Optional)</h5>
                      <p className='text-center'>Add different prices for different seasons or dates</p>
                    </div>

                    <div className="destination-faq">
                      <div className="accordion" id="accordionExample">
                        {pricingDetail.map((pricing, index) => (
                          <div className='mt-4'>
                            <div className="accordion-item" key={index} >
                              <h2 className="accordion-header d-flex align-items-center justify-content-between">
                                <button
                                  className="accordion-button flex-grow-1 fw-bold"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse${index}`}
                                  aria-expanded="true"
                                  aria-controls={`collapse${index}`}
                                >
                                  Season {index + 1}
                                </button>
                                <div className="ms-3 d-flex gap-2">

                                  <button className="destination-faq-add me-4" onClick={() => addPricingDetail("pricingPerPerson")}>
                                    Add
                                  </button>

                                  {index !== 0 && (
                                    <button
                                      className="destination-faq-add faq-delete me-4"
                                      onClick={() => deletePricingDetail(index, "pricingPerPerson")}
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </h2>

                              <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse show"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">

                                  <div className='row'>
                                    <div className='col-lg-6'>
                                      <div className='admin-input-div mt-0'>
                                        <label>Start Date<span className='required-icon'>*</span></label>
                                        <DatePicker
                                          selected={pricingDetail[index].start_date ? new Date(pricingDetail[index].start_date) : null}
                                          onChange={(date) => updatePricingDetail(index, "start_date", date, "pricingPerPerson")}
                                          onBlur={() => handleBlurPricingDetails(index)}
                                          placeholderText="Select Start Date"
                                          minDate={new Date()}
                                          className="w-100"
                                        />
                                        {pricingValidation[`pricingDetail_${index}_start_date`]?.status === false && (
                                          <div className="text-danger small">
                                            {pricingValidation[`pricingDetail_${index}_start_date`].message}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className='col-lg-6 '>
                                      <div className='admin-input-div mt-0'>
                                        <label>End Date <span className='required-icon'>*</span></label>
                                        <DatePicker
                                          selected={pricingDetail[index].end_date ? new Date(pricingDetail[index].end_date) : null}
                                          onChange={(date) => updatePricingDetail(index, "end_date", date, "pricingPerPerson")}
                                          onBlur={() => handleBlurPricingDetails(index)}
                                          placeholderText="Select End Date"
                                          minDate={new Date()}
                                          className="w-100"
                                        />
                                        {pricingValidation[`pricingDetail_${index}_end_date`]?.status === false && (
                                          <div className="text-danger small">
                                            {pricingValidation[`pricingDetail_${index}_end_date`].message}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className='col-lg-6'>
                                      <div className='admin-input-div'>
                                        <label>Season Price <span className='required-icon'>*</span></label>
                                        <input type="number" placeholder='Enter Discounted Price' name="season_price"
                                          value={pricing?.season_price}
                                          onChange={(e) => updatePricingDetail(index, "season_price", e.target.value, "pricingPerPerson")}
                                          onWheelCapture={e => { e.target.blur() }}
                                          onBlur={() => handleBlurPricingDetails(index)}
                                          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} />
                                      </div>
                                      {pricingValidation[`pricingDetail_${index}_season_price`]?.status === false && (
                                        <div className="text-danger small">
                                          {pricingValidation[`pricingDetail_${index}_season_price`].message}
                                        </div>
                                      )}
                                    </div>

                                    <div className='col-lg-6'>
                                      <div className='admin-input-div'>
                                        <label>Season Name <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Discounted Price' name="season_name"
                                          value={pricing?.season_name}
                                          onBlur={() => handleBlurPricingDetails(index)}
                                          onChange={(e) => updatePricingDetail(index, "season_name", e.target.value, "pricingPerPerson")}
                                        />
                                        {pricingValidation[`pricingDetail_${index}_season_name`]?.status === false && (
                                          <div className="text-danger small">
                                            {pricingValidation[`pricingDetail_${index}_season_name`].message}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='admin-input-div'>
                    <label className='text-area-label'>Inclusion <span className='required-icon'>*</span></label>
                    <div className="mt-2">
                      <JoditEditor
                        ref={editor}
                        value={customPricePerPerson?.inclusion}
                        config={{
                          readonly: false,
                          height: 350,
                          toolbarButtonSize: "middle",
                          askBeforePasteHTML: false,
                          askBeforePasteFromWord: false,
                          defaultActionOnPaste: "insert_clear_html",
                          allowPaste: true
                        }}
                        tabIndex={1}
                        onBlur={(newContent) => handlePricePackageChange("inclusion", newContent, "per_person")}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <div className='admin-input-div'>
                    <label className='text-area-label'>Exclusion <span className='required-icon'>*</span></label>
                    <div className="mt-2">
                      <JoditEditor
                        ref={editor}
                        value={customPricePerPerson?.exclusion}
                        config={{
                          readonly: false,
                          height: 350,
                          toolbarButtonSize: "middle",
                          askBeforePasteHTML: false,
                          askBeforePasteFromWord: false,
                          defaultActionOnPaste: "insert_clear_html",
                          allowPaste: true
                        }}
                        tabIndex={1}
                        onBlur={(newContent) => handlePricePackageChange("exclusion", newContent, "per_person")}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <div className='admin-input-div'>
                    <label className='text-area-label'>Key Highlights/Features <span className='required-icon'>*</span></label>
                    <div className="mt-2">
                      <JoditEditor
                        ref={editor}
                        value={customPricePerPerson?.key_highlights}
                        config={{
                          readonly: false,
                          height: 350,
                          toolbarButtonSize: "middle",
                          askBeforePasteHTML: false,
                          askBeforePasteFromWord: false,
                          defaultActionOnPaste: "insert_clear_html",
                          allowPaste: true
                        }}
                        tabIndex={1}
                        onBlur={(newContent) => handlePricePackageChange("key_highlights", newContent, "per_person")}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <div className='admin-input-div'>
                    <label className='text-area-label'>Cancellation Policy <span className='required-icon'>*</span></label>
                    <div className="mt-2">
                      <JoditEditor
                        ref={editor}
                        value={customPricePerPerson?.cancellation_policy}
                        config={{
                          readonly: false,
                          height: 350,
                          toolbarButtonSize: "middle",
                          askBeforePasteHTML: false,
                          askBeforePasteFromWord: false,
                          defaultActionOnPaste: "insert_clear_html",
                          allowPaste: true
                        }}
                        tabIndex={1}
                        onBlur={(newContent) => handlePricePackageChange("cancellation_policy", newContent, "per_person")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
            {/* )} */}

            {/* {activeTripTab == 1 && activePricingTab === 2 && (
              <>
                <h3>Customized Package - Price Per Package</h3>
                <div className='itenary-main my-5'>
                  <h5 className='fw-bold mb-4'>Price Configuration</h5>
                  <div className='row'>

                    <div className='col-lg-6'>
                      <div className='admin-input-div mt-0'>
                        <label>Base Price <span className='required-icon'>*</span></label>
                        <input type="number" placeholder='Base Price' name='base_price'
                          value={customPricePerPackage?.base_price}
                          onChange={(e) => handlePricePackageChange('base_price', e.target.value, "per_package")}
                          onBlur={(e) => handleBlurPricing(e.target.name, e.target.value)}
                          onWheelCapture={e => { e.target.blur() }}
                          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                        />
                        {pricingValidation?.base_price?.status === false && pricingValidation?.base_price?.message && (
                          <p className='error-para'>Base Pricing {pricingValidation.base_price.message}</p>
                        )}
                      </div>
                    </div>

                    <div className='col-lg-6'>
                      <div className='admin-input-div mt-0'>
                        <label>Currency  <span className='required-icon'>*</span></label>
                        <select value={customPricePerPackage?.currency} name='currency'
                          onChange={(e) => handlePricePackageChange('currency', e.target.value, "per_package")}
                          onBlur={(e) => handleBlurPricing(e.target.name, e.target.value)}>
                          <option value="" defaultValue={""}>Select Currency</option>
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EURO">EURO (€)</option>
                        </select>
                        {pricingValidation?.currency?.status === false && pricingValidation?.currency?.message && (
                          <p className='error-para'>Currency {pricingValidation.currency.message}</p>
                        )}
                      </div>
                    </div>

                    <div className='col-lg-6'>
                      <div className='admin-input-div'>
                        <label>Discounted Price (Optional)</label>
                        <input type="number" placeholder='Enter Discounted Price'
                          value={customPricePerPackage?.discount_price} name='discount_price'
                          onChange={(e) => handlePricePackageChange('discount_price', e.target.value, "per_package")}
                          onWheelCapture={e => { e.target.blur() }}
                          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} />
                        {pricingValidation?.discount_price?.status === false && pricingValidation?.discount_price?.message && (
                          <p className='error-para'>Discounted Price {pricingValidation.discount_price.message}</p>
                        )}
                      </div>
                    </div>

                    <div className='col-lg-4'>
                      <div className='admin-input-div'>
                        <label>Display as "Starts From" Price (Optional)</label>
                        <select value={customPricePerPackage?.start_from} name='start_from'
                          onChange={(e) => handlePricePackageChange('start_from', e.target.value, "per_package")}
                          onBlur={(e) => handleBlurPricing(e.target.name, e.target.value)}>
                          <option value="" defaultValue={""}>Select Dispay Type</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {activeTripTab == 1 && (
                    <div className='itenary-list-main mt-4 '>
                      <div className='itenary-content mb-5'>
                        <h5 className='text-center'>Seasonal Pricing (Optional)</h5>
                        <p className='text-center'>Add different prices for different seasons or dates</p>
                      </div>

                      <div className="destination-faq">
                        <div className="accordion" id="accordionExample">
                          {pricingDetailPackage.map((pricing, index) => (
                            <div className='mt-4'>
                              <div className="accordion-item" key={index} >
                                <h2 className="accordion-header d-flex align-items-center justify-content-between">
                                  <button
                                    className="accordion-button flex-grow-1 fw-bold"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="true"
                                    aria-controls={`collapse${index}`}
                                  >
                                    Season {index + 1}
                                  </button>
                                  <div className="ms-3 d-flex gap-2">

                                    <button className="destination-faq-add me-4" onClick={() => addPricingDetail("pricingPerPackage")}>
                                      Add
                                    </button>

                                    {index !== 0 && (
                                      <button
                                        className="destination-faq-add faq-delete me-4"
                                        onClick={() => deletePricingDetail(index, "pricingPerPackage")}
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </div>
                                </h2>

                                <div
                                  id={`collapse${index}`}
                                  className="accordion-collapse collapse show"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">

                                    <div className='row'>
                                      <div className='col-lg-6'>
                                        <div className='admin-input-div mt-0'>
                                          <label>Start Date<span className='required-icon'>*</span></label>
                                          <DatePicker
                                            selected={pricingDetailPackage[index].start_date ? new Date(pricingDetailPackage[index].start_date) : null}
                                            onChange={(date) => updatePricingDetail(index, "start_date", date, "pricingPerPackage")}
                                            onBlur={() => handleBlurPricingDetails(index)}
                                            placeholderText="Select Start Date"
                                            minDate={new Date()}
                                            className="w-100"
                                          />
                                          {pricingValidation[`pricingDetail_${index}_start_date`]?.status === false && (
                                            <div className="text-danger small">
                                              {pricingValidation[`pricingDetail_${index}_start_date`].message}
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div className='col-lg-6 '>
                                        <div className='admin-input-div mt-0'>
                                          <label>End Date <span className='required-icon'>*</span></label>
                                          <DatePicker
                                            selected={pricingDetailPackage[index].end_date ? new Date(pricingDetailPackage[index].end_date) : null}
                                            onChange={(date) => updatePricingDetail(index, "end_date", date, "pricingPerPackage")}
                                            onBlur={() => handleBlurPricingDetails(index)}
                                            placeholderText="Select End Date"
                                            minDate={new Date()}
                                            className="w-100"
                                          />
                                          {pricingValidation[`pricingDetail_${index}_end_date`]?.status === false && (
                                            <div className="text-danger small">
                                              {pricingValidation[`pricingDetail_${index}_end_date`].message}
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div className='col-lg-6'>
                                        <div className='admin-input-div'>
                                          <label>Season Price <span className='required-icon'>*</span></label>
                                          <input type="number" placeholder='Enter Discounted Price' name="season_price"
                                            value={pricing?.season_price}
                                            onChange={(e) => updatePricingDetail(index, "season_price", e.target.value, "pricingPerPackage")}
                                            onWheelCapture={e => { e.target.blur() }}
                                            onBlur={() => handleBlurPricingDetails(index)}
                                            onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} />
                                        </div>
                                        {pricingValidation[`pricingDetail_${index}_season_price`]?.status === false && (
                                          <div className="text-danger small">
                                            {pricingValidation[`pricingDetail_${index}_season_price`].message}
                                          </div>
                                        )}
                                      </div>

                                      <div className='col-lg-6'>
                                        <div className='admin-input-div'>
                                          <label>Season Name <span className='required-icon'>*</span></label>
                                          <input type="text" placeholder='Enter Discounted Price' name="season_name"
                                            value={pricing?.season_name}
                                            onBlur={() => handleBlurPricingDetails(index)}
                                            onChange={(e) => updatePricingDetail(index, "season_name", e.target.value, "pricingPerPackage")}
                                          />
                                          {pricingValidation[`pricingDetail_${index}_season_name`]?.status === false && (
                                            <div className="text-danger small">
                                              {pricingValidation[`pricingDetail_${index}_season_name`].message}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='admin-input-div'>
                      <label className='text-area-label'>Inclusion <span className='required-icon'>*</span></label>
                      <div className="mt-2">
                        <JoditEditor
                          ref={editor}
                          value={customPricePerPackage?.inclusion}
                          config={{
                            readonly: false,
                            height: 350,
                            toolbarButtonSize: "middle",
                            askBeforePasteHTML: false,
                            askBeforePasteFromWord: false,
                            defaultActionOnPaste: "insert_clear_html",
                            allowPaste: true
                          }}
                          tabIndex={1}
                          onBlur={(newContent) => handlePricePackageChange("inclusion", newContent, "per_package")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='admin-input-div'>
                      <label className='text-area-label'>Exclusion <span className='required-icon'>*</span></label>
                      <div className="mt-2">
                        <JoditEditor
                          ref={editor}
                          value={customPricePerPackage?.exclusion}
                          config={{
                            readonly: false,
                            height: 350,
                            toolbarButtonSize: "middle",
                            askBeforePasteHTML: false,
                            askBeforePasteFromWord: false,
                            defaultActionOnPaste: "insert_clear_html",
                            allowPaste: true
                          }}
                          tabIndex={1}
                          onBlur={(newContent) => handlePricePackageChange("exclusion", newContent, "per_package")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='admin-input-div'>
                      <label className='text-area-label'>Key Highlights/Features <span className='required-icon'>*</span></label>
                      <div className="mt-2">
                        <JoditEditor
                          ref={editor}
                          value={customPricePerPackage?.key_highlights}
                          config={{
                            readonly: false,
                            height: 350,
                            toolbarButtonSize: "middle",
                            askBeforePasteHTML: false,
                            askBeforePasteFromWord: false,
                            defaultActionOnPaste: "insert_clear_html",
                            allowPaste: true
                          }}
                          tabIndex={1}
                          onBlur={(newContent) => handlePricePackageChange("key_highlights", newContent, "per_package")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='admin-input-div'>
                      <label className='text-area-label'>Cancellation Policy <span className='required-icon'>*</span></label>
                      <div className="mt-2">
                        <JoditEditor
                          ref={editor}
                          value={customPricePerPackage?.cancellation_policy}
                          config={{
                            readonly: false,
                            height: 350,
                            toolbarButtonSize: "middle",
                            askBeforePasteHTML: false,
                            askBeforePasteFromWord: false,
                            defaultActionOnPaste: "insert_clear_html",
                            allowPaste: true
                          }}
                          tabIndex={1}
                          onBlur={(newContent) => handlePricePackageChange("cancellation_policy", newContent, "per_package")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )} */}
          </>
        )}

        {activeTab == 5 && activeTripTab == 1 && (
          <>
            <h3 className='my-3 mt-4 text-decoration-underline'>Customized Package</h3>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Meta Title <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Meta Title' name="meta_title"
                    value={customizedPackageData?.meta_title}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.meta_title?.status === false && validation?.meta_title?.message && (
                    <p className='error-para'>Meta Title {validation.meta_title.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Meta Tag <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Meta Title' name="meta_tags"
                    value={customizedPackageData?.meta_tags}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.meta_tags?.status === false && validation?.meta_tags?.message && (
                    <p className='error-para'>Meta Tag {validation.meta_tags.message}</p>
                  )}

                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Meta Description <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Meta Title' name="meta_description"
                    value={customizedPackageData?.meta_description}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.meta_description?.status === false && validation?.meta_description?.message && (
                    <p className='error-para'>Meta Description {validation.meta_description.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Video Links </label>
                  <input type="text" placeholder='Enter Meta Title' name="video_link"
                    value={customizedPackageData?.video_link}
                    onChange={(e) => handleCustomizedPackageChange(e)}
                  />
                  {validation?.video_link?.status === false && validation?.video_link?.message && (
                    <p className='error-para'>Video Link {validation.video_link.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className="admin-input-div">
                  <label>Gallery <span className='required-icon'>*</span></label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleMultipleFileUpload(e, "gallery_images")}
                  />
                  {validation?.gallery_images?.status === false && validation?.gallery_images?.message && (
                    <p className='error-para'>Hero Slider Images {validation.gallery_images.message}</p>
                  )}

                  {customizedPackageData?.gallery_images && customizedPackageData?.gallery_images?.length > 0 && (
                    <div className="d-flex flex-wrap">
                      {customizedPackageData?.gallery_images?.map((image, index) => (
                        <div className='upload-image-div destination-image-div'>
                          <div>
                            <img src={`${BACKEND_DOMAIN}${image}`} alt="Category-Preview" key={index} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Related Trips  <span className='required-icon'>*</span></label>
                  <select>
                    <option value="">Select Trips</option>
                    <option value="">Bali Honey Moon</option>
                    <option value="">Kerala BackWater</option>
                    <option value="">Goa Beach Holiday</option>
                  </select>
                </div>
              </div>

              {customizedPackageData && Object.keys(customizedPackageData).length > 0 &&
                <button className="create-common-btn mt-5" onClick={(e) => handleCustomPackageSubmit(e)}>Create Custom Package</button>
              }



            </div>
          </>
        )}

        {/* Fixed Departure Tabs */}

        {activeTab == 2 && activeTripTab == 2 && (

          <>
            <h3 className='my-3 mt-4 text-decoration-underline'>Fixed Departure</h3>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Trip Title <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Trip Title' name="trip_title"
                    value={fixedPackageData?.trip_title}
                    onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.trip_title?.status === false && validation?.trip_title?.message && (
                    <p className='error-para'>Trip Title {validation.trip_title.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Destination  <span className='required-icon'>*</span></label>
                  <select name="destination" value={fixedPackageData?.destination}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                    onChange={(e) => handleFixedPackageChange(e)}
                  >
                    <option value="" defaultValue={""}>Select Destination</option>
                    {destinationList?.map((item, index) => (
                      <option key={index} value={item?._id}>{item?.destination_name}</option>
                    ))}
                  </select>
                  {validation?.destination?.status === false && validation?.destination?.message && (
                    <p className='error-para'>Destination {validation.destination.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Trip Category  <span className='required-icon'>*</span></label>
                  <select name="trip_category" value={fixedPackageData?.trip_category}
                    onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  >
                    <option value="" defaultValue={""}>Select Category</option>
                    {categoryList?.map((item, index) => (
                      <option key={index} value={item?._id}>{item?.name}</option>
                    ))}
                  </select>
                  {validation?.trip_category?.status === false && validation?.trip_category?.message && (
                    <p className='error-para'>Trip Category {validation.trip_category.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Slug <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Trip Title' name="slug"
                    value={fixedPackageData?.slug}
                    onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.slug?.status === false && validation?.slug?.message && (
                    <p className='error-para'>Slug {validation.slug.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Duration (Days) <span className='required-icon'>*</span></label>
                  <input type="number" placeholder='Number of Days' name="days"
                    value={fixedPackageData?.days}
                    onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                    onWheelCapture={e => { e.target.blur() }}
                    onKeyDown={(evt) => ["e", "E", "+", "-",].includes(evt.key) && evt.preventDefault()} />
                  {validation?.days?.status === false && validation?.days?.message && (
                    <p className='error-para'>Days {validation.days.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Nights <span className='required-icon'>*</span></label>
                  <input type="number" placeholder='Number of Nights' name="nights"
                    value={fixedPackageData?.days > 0 ? fixedPackageData.days - 1 : ""}
                    readOnly
                    onWheelCapture={e => { e.target.blur() }}
                    onKeyDown={(evt) => ["e", "E", "+", "-", "-1"].includes(evt.key) && evt.preventDefault()} />
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Short Description / Tagline <span className='required-icon'>*</span></label>
                  <textarea type="text" placeholder='Short Description For Listing Pages' name="short_description"
                    value={fixedPackageData?.short_description}
                    className="form-control"
                    onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.short_description?.status === false && validation?.short_description?.message && (
                    <p className='error-para'>Short Description {validation.short_description.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Select Featured Trip Page </label>
                  <select onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                    name="featured_trip_page"
                    value={fixedPackageData?.featured_trip_page}>
                    <option value="" defaultValue={""}>Select Featured Page</option>
                    <option value="Home">Home</option>
                    <option value="Destination">Destination</option>
                    <option value="Payment Page">Payment Page</option>
                  </select>
                </div>
              </div>


            </div>
          </>

        )}

        {activeTab == 3 && activeTripTab == 2 && (
          <>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='admin-input-div'>
                  <label className='text-area-label'>Long Description <span className='required-icon'>*</span></label>
                  <div className="mt-2">
                    <JoditEditor
                      ref={editor}
                      value={fixedPackageData?.long_description || ""}
                      config={{
                        readonly: false,
                        height: 300,
                        toolbarButtonSize: "middle",
                        askBeforePasteHTML: false,
                        askBeforePasteFromWord: false,
                        defaultActionOnPaste: "insert_clear_html",
                        allowPaste: true
                      }}
                      tabIndex={1}
                      onBlur={(newContent) =>
                        setFixedPackageData({
                          ...fixedPackageData,
                          long_description: newContent,
                        })
                      }
                    />
                    {validation?.long_description?.status === false && validation?.long_description?.message && (
                      <p className='error-para'>Long Description {validation.long_description.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Tags to be used in search </label>
                  <CreatableSelect
                    isMulti
                    placeholder="Type and Enter Tags"
                    value={selectedCreatedTags}
                    onChange={handleCreatedTags}
                    onCreateOption={handleCreateOption}
                    options={options}
                  />
                </div>
              </div>

              <div className='col-lg-6'>
                <div className="admin-input-div">
                  <label>Primary Trip Image <span className='required-icon'>*</span></label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleFileUpload(e, "primary_trip_image", "fixed_departure")}
                  />
                  {validation?.primary_trip_image?.status === false && validation?.primary_trip_image?.message && (
                    <p className='error-para'>Primary Trip Image {validation.primary_trip_image.message}</p>
                  )}
                  {fixedPackageData?.primary_trip_image && (
                    <div className='upload-image-div destination-image-div'>
                      <div className='upload-image-div'>
                        <img src={`${BACKEND_DOMAIN}${fixedPackageData?.primary_trip_image}`} alt="Category-Preview" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='col-lg-12'>
                <div className='col-lg-6'>
                  <div className="admin-input-div">
                    <label>Add Hero Slider Images <span className='required-icon'>*</span></label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => handleMultipleFileUpload(e, "hero_slider_images", 0, "fixed_departure")}
                    />
                    {validation?.hero_slider_images?.status === false && validation?.hero_slider_images?.message && (
                      <p className='error-para'>Hero Slider Images {validation.hero_slider_images.message}</p>
                    )}

                    {fixedPackageData?.hero_slider_images && fixedPackageData?.hero_slider_images?.length > 0 && (
                      <div className="d-flex flex-wrap">
                        {fixedPackageData?.hero_slider_images?.map((image, index) => (
                          <div className='upload-image-div destination-image-div'>
                            <div>
                              <img src={`${BACKEND_DOMAIN}${image}`} alt="Category-Preview" key={index} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>

            {activeTripTab == 2 && (
              <div className='itenary-main my-5'>
                <div className='admin-input-div mt-0'>
                  <label>Fixed Departure Details</label>
                </div>

                <div className='itenary-list-main mt-4 '>
                  <div className='itenary-content mb-5'>
                    <h5 className='text-center'>Manage Departures & Slots</h5>
                  </div>

                  <div className="destination-faq">
                    <div className="accordion" id="accordionExample">
                      {departureSlots.map((slots, index) => (
                        <div className='mt-4'>
                          <div className="accordion-item" key={index} >
                            <h2 className="accordion-header d-flex align-items-center justify-content-between">
                              <button
                                className="accordion-button flex-grow-1 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                              >
                                Departure {index + 1}
                              </button>
                              <div className="ms-3 d-flex gap-2">
                                <button className="destination-faq-add me-3" onClick={addDepartureSlots}>
                                  Add
                                </button>
                                {index !== 0 && (
                                  <button
                                    className="destination-faq-add faq-delete me-4 "
                                    onClick={() => deleteDepartureSlots(index)}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </h2>

                            <div
                              id={`collapse${index}`}
                              className="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">

                                <div className='row'>
                                  <div className='col-lg-6'>
                                    <div className='admin-input-div mt-0'>
                                      <label>Start Date<span className='required-icon'>*</span></label>
                                      <DatePicker
                                        selected={departureSlots[index].start_date ? new Date(departureSlots[index].start_date) : null}
                                        onChange={(date) => updateDepartureSlots(index, "start_date", date)}
                                        onBlur={() => handleBlurDepartureSlots("start_date", departureSlots[index].start_date, index)}
                                        placeholderText="Select Start Date"
                                        minDate={new Date()}
                                        className="w-100"
                                      />
                                      {departureSlotsValidation[index]?.start_date?.status === false && (
                                        <p className='error-para'>Start Date {departureSlotsValidation[index]?.start_date?.message}</p>
                                      )}
                                    </div>
                                  </div>

                                  <div className='col-lg-6 '>
                                    <div className='admin-input-div mt-0'>
                                      <label>End Date</label>
                                      <DatePicker
                                        selected={departureSlots[index].end_date ? new Date(departureSlots[index].end_date) : null}
                                        onChange={(date) => updateDepartureSlots(index, "end_date", date)}
                                        onBlur={() => handleBlurDepartureSlots("end_date", departureSlots[index].end_date, index)}
                                        placeholderText="Select End Date"
                                        minDate={new Date()}
                                        className="w-100"
                                      />
                                      {departureSlotsValidation[index]?.end_date?.status === false && (
                                        <p className='error-para'>End Date {departureSlotsValidation[index]?.end_date?.message}</p>
                                      )}
                                    </div>
                                  </div>

                                  <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                      <label>Total Slots <span className='required-icon'>*</span></label>
                                      <input type="number" placeholder='Enter Total No Of Slots'
                                        value={departureSlots[index].total_slots}
                                        onChange={(e) => updateDepartureSlots(index, "total_slots", e.target.value)}
                                        onBlur={() => handleBlurDepartureSlots("total_slots", departureSlots[index].total_slots, index)}
                                        onWheelCapture={e => { e.target.blur() }}
                                        onKeyDown={(evt) => ["e", "E", "+", "-", "-1"].includes(evt.key) && evt.preventDefault()} />
                                      {departureSlotsValidation[index]?.total_slots?.status === false && (
                                        <p className='error-para'>Total Slots {departureSlotsValidation[index]?.total_slots?.message}</p>
                                      )}
                                    </div>
                                  </div>

                                  <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                      <label>Available Slots <span className='required-icon'>*</span></label>
                                      <input type="number" placeholder='Enter Available Slots'
                                        value={departureSlots[index].available_slots}
                                        onBlur={(e) => handleBlurDepartureSlots("available_slots", departureSlots[index].available_slots, index)}
                                        onChange={(e) => updateDepartureSlots(index, "available_slots", e.target.value)}
                                        onWheelCapture={e => { e.target.blur() }}
                                        onKeyDown={(evt) => ["e", "E", "+", "-", "-1"].includes(evt.key) && evt.preventDefault()} />
                                      {departureSlotsValidation[index]?.available_slots?.status === false && (
                                        <p className='error-para'>Available Slots {departureSlotsValidation[index].available_slots.message}</p>
                                      )}
                                    </div>
                                  </div>

                                  <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                      <label>Price Override (Optional)</label>
                                      <input type="number" placeholder='Special Price For This Departure'
                                        value={departureSlots[index].special_price}
                                        onChange={(e) => updateDepartureSlots(index, "special_price", e.target.value)}
                                        onWheelCapture={e => { e.target.blur() }}
                                        onKeyDown={(evt) => ["e", "E", "+", "-", "-1"].includes(evt.key) && evt.preventDefault()} />
                                    </div>
                                  </div>

                                  <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                      <label>Status  <span className='required-icon'>*</span></label>
                                      <select value={departureSlots[index].status}
                                        onChange={(e) => updateDepartureSlots(index, "status", e.target.value)}
                                        onBlur={(e) => handleBlurDepartureSlots("status", departureSlots[index].status, index)}>
                                        <option value="">Select Status</option>
                                        <option value="Booked_Out">Booked Out</option>
                                        <option value="Cancelled">Cancelled</option>
                                      </select>
                                      {departureSlotsValidation[index]?.status?.status === false && (
                                        <p className='error-para'>Status {departureSlotsValidation[index].status.message}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab == 4 && activeTripTab == 2 && (
          <>

            {activeTripTab == 2 && (
              <div className='d-flex mb-4'>
                <div className={`trip-type-card ${activePricingTab === 1 ? 'active' : ''} pricing-tab-card`} onClick={() => setActivePricingTab(1)}>
                  <div className='d-flex flex-column trip-type-card-content ms-2'>
                    <h6>{PricingTab[1]?.head}</h6>
                    <p>{PricingTab[1]?.para}</p>
                  </div>
                </div>
              </div>
            )}

            <div className='itenary-main my-5'>

              <h5 className='fw-bold mb-4'>Price Configuration</h5>

              <div className='row'>

                <div className='col-lg-6'>
                  <div className='admin-input-div mt-0'>
                    <label>Base Price <span className='required-icon'>*</span></label>
                    <input type="number" placeholder='Base Price' name='base_price'
                      value={fixedPricePerPerson?.base_price}
                      onChange={(e) => handleFixedPricePerPersonChange("base_price", e.target.value)}
                      onBlur={(e) => handleFixedPricePerPersonBlur(e.target.name, e.target.value)}
                      onWheelCapture={e => { e.target.blur() }}
                      onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                    />
                    {fixedPricePerPersonValidation?.base_price?.status === false && fixedPricePerPersonValidation?.base_price?.message && (
                      <p className='error-para'>Base Pricing {fixedPricePerPersonValidation.base_price.message}</p>
                    )}
                  </div>
                </div>


                <div className='col-lg-6'>
                  <div className='admin-input-div mt-0'>
                    <label>Currency  <span className='required-icon'>*</span></label>
                    <select value={fixedPricePerPerson?.currency} name='currency'
                      onChange={(e) => handleFixedPricePerPersonChange('currency', e.target.value)}
                      onBlur={(e) => handleFixedPricePerPersonBlur(e.target.name, e.target.value)}>
                      <option value="" defaultValue={""}>Select Currency</option>
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EURO">EURO (€)</option>
                    </select>
                    {fixedPricePerPersonValidation?.currency?.status === false && fixedPricePerPersonValidation?.currency?.message && (
                      <p className='error-para'>Currency {fixedPricePerPersonValidation.currency.message}</p>
                    )}
                  </div>
                </div>


                <div className='col-lg-6'>
                  <div className='admin-input-div'>
                    <label>Discounted Price (Optional)</label>
                    <input type="number" placeholder='Enter Discounted Price'
                      value={fixedPricePerPerson?.discount_price} name='discount_price'
                      onChange={(e) => handleFixedPricePerPersonChange("discount_price", e.target.value)}
                      onWheelCapture={e => { e.target.blur() }}
                      onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} />
                    {fixedPricePerPersonValidation?.discount_price?.status === false && fixedPricePerPersonValidation?.discount_price?.message && (
                      <p className='error-para'>Discounted Price {fixedPricePerPersonValidation.discount_price.message}</p>
                    )}
                  </div>
                </div>


                <div className='col-lg-4'>
                  <div className='admin-input-div'>
                    <label>Display as "Starts From" Price</label>
                    <select value={fixedPricePerPerson?.start_from} name='start_from'
                      onChange={(e) => handleFixedPricePerPersonChange("start_from", e.target.value)}>
                      <option value="" defaultValue={""}>Select Dispay Type</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                {activeTripTab == 2 && (
                  <>
                    <div className='col-lg-6'>
                      <div className='admin-input-div'>
                        <label>Double Occupancy <span className='required-icon'>*</span></label>
                        <input type="number" placeholder='Enter Price'
                          value={fixedPricePerPerson?.double_occupancy} name='double_occupancy'
                          onChange={(e) => handleFixedPricePerPersonChange("double_occupancy", e.target.value)}
                          onBlur={(e) => handleFixedPricePerPersonBlur(e.target.name, e.target.value)}
                          onWheelCapture={e => { e.target.blur() }}
                          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} />
                        {fixedPricePerPersonValidation?.double_occupancy?.status === false && fixedPricePerPersonValidation?.double_occupancy?.message && (
                          <p className='error-para'>Double Occupancy {fixedPricePerPersonValidation.double_occupancy.message}</p>
                        )}
                      </div>
                    </div>

                    <div className='col-lg-6'>
                      <div className='admin-input-div'>
                        <label>Triple Occupancy <span className='required-icon'>*</span></label>
                        <input type="number" placeholder='Enter Price'
                          value={fixedPricePerPerson?.triple_occupancy} name='triple_occupancy'
                          onChange={(e) => handleFixedPricePerPersonChange("triple_occupancy", e.target.value)}
                          onBlur={(e) => handleFixedPricePerPersonBlur(e.target.name, e.target.value)}
                          onWheelCapture={e => { e.target.blur() }}
                          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} />
                        {fixedPricePerPersonValidation?.triple_occupancy?.status === false && fixedPricePerPersonValidation?.triple_occupancy?.message && (
                          <p className='error-para'>Double Occupancy {fixedPricePerPersonValidation.triple_occupancy.message}</p>
                        )}
                      </div>
                    </div>


                    <div className='col-lg-6'>
                      <div className='admin-input-div'>
                        <label>Quad Occupancy <span className='required-icon'>*</span></label>
                        <input type="number" placeholder='Enter Price'
                          value={fixedPricePerPerson?.quad_occupancy} name='quad_occupancy'
                          onChange={(e) => handleFixedPricePerPersonChange("quad_occupancy", e.target.value)}
                          onBlur={(e) => handleFixedPricePerPersonBlur(e.target.name, e.target.value)}
                          onWheelCapture={e => { e.target.blur() }}
                          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} />
                        {fixedPricePerPersonValidation?.quad_occupancy?.status === false && fixedPricePerPersonValidation?.quad_occupancy?.message && (
                          <p className='error-para'>Double Occupancy {fixedPricePerPersonValidation.quad_occupancy.message}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}


              </div>

            </div>

            <div className='row'>
              <div className='col-lg-12'>
                <div className='admin-input-div'>
                  <label className='text-area-label'>Inclusion <span className='required-icon'>*</span></label>
                  <div className="mt-2">
                    <JoditEditor
                      ref={editor}
                      value={fixedPricePerPerson?.inclusion}
                      config={{
                        readonly: false,
                        height: 350,
                        toolbarButtonSize: "middle",
                        askBeforePasteHTML: false,
                        askBeforePasteFromWord: false,
                        defaultActionOnPaste: "insert_clear_html",
                        allowPaste: true
                      }}
                      tabIndex={1}
                      onBlur={(newContent) => handleFixedPricePerPersonChange("inclusion", newContent)}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-12'>
                <div className='admin-input-div'>
                  <label className='text-area-label'>Exclusion <span className='required-icon'>*</span></label>
                  <div className="mt-2">
                    <JoditEditor
                      ref={editor}
                      value={fixedPricePerPerson?.exclusion}
                      config={{
                        readonly: false,
                        height: 350,
                        toolbarButtonSize: "middle",
                        askBeforePasteHTML: false,
                        askBeforePasteFromWord: false,
                        defaultActionOnPaste: "insert_clear_html",
                        allowPaste: true
                      }}
                      tabIndex={1}
                      onBlur={(newContent) => handleFixedPricePerPersonChange("exclusion", newContent)}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-12'>
                <div className='admin-input-div'>
                  <label className='text-area-label'>Key Highlights/Features <span className='required-icon'>*</span></label>
                  <div className="mt-2">
                    <JoditEditor
                      ref={editor}
                      value={fixedPricePerPerson?.key_highlights}
                      config={{
                        readonly: false,
                        height: 350,
                        toolbarButtonSize: "middle",
                        askBeforePasteHTML: false,
                        askBeforePasteFromWord: false,
                        defaultActionOnPaste: "insert_clear_html",
                        allowPaste: true
                      }}
                      tabIndex={1}
                      onBlur={(newContent) => handleFixedPricePerPersonChange("key_highlights", newContent)}
                    />
                  </div>
                </div>
              </div>
              <div className='col-lg-12'>
                <div className='admin-input-div'>
                  <label className='text-area-label'>Cancellation Policy <span className='required-icon'>*</span></label>
                  <div className="mt-2">
                    <JoditEditor
                      ref={editor}
                      value={fixedPricePerPerson?.cancellation_policy}
                      config={{
                        readonly: false,
                        height: 350,
                        toolbarButtonSize: "middle",
                        askBeforePasteHTML: false,
                        askBeforePasteFromWord: false,
                        defaultActionOnPaste: "insert_clear_html",
                        allowPaste: true
                      }}
                      tabIndex={1}
                      onBlur={(newContent) => handleFixedPricePerPersonChange("cancellation_policy", newContent)}
                    />
                  </div>
                </div>
              </div>
            </div>

          </>
        )}

        {activeTab == 5 && activeTripTab == 2 && (
          <>
            <h3 className='my-3 mt-4 text-decoration-underline'>Customized Package</h3>
            <div className='row'>
              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Meta Title <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Meta Title' name="meta_title"
                    value={fixedPackageData?.meta_title}
                    onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.meta_title?.status === false && validation?.meta_title?.message && (
                    <p className='error-para'>Meta Title {validation.meta_title.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Meta Tag <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Meta Title' name="meta_tags"
                    value={fixedPackageData?.meta_tags}
                    onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.meta_tags?.status === false && validation?.meta_tags?.message && (
                    <p className='error-para'>Meta Tag {validation.meta_tags.message}</p>
                  )}

                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Meta Description <span className='required-icon'>*</span></label>
                  <input type="text" placeholder='Enter Meta Title' name="meta_description"
                    value={fixedPackageData?.meta_description}
                    onChange={(e) => handleFixedPackageChange(e)}
                    onBlur={(e) => handleBlurCustomized(e.target.name, e.target.value)}
                  />
                  {validation?.meta_description?.status === false && validation?.meta_description?.message && (
                    <p className='error-para'>Meta Description {validation.meta_description.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Video Links </label>
                  <input type="text" placeholder='Enter Meta Title' name="video_link"
                    value={fixedPackageData?.video_link}
                    onChange={(e) => handleFixedPackageChange(e)}
                  />
                  {validation?.video_link?.status === false && validation?.video_link?.message && (
                    <p className='error-para'>Video Link {validation.video_link.message}</p>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className="admin-input-div">
                  <label>Gallery <span className='required-icon'>*</span></label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleMultipleFileUpload(e, "gallery_images", 0, "fixed_departure")}
                  />
                  {validation?.gallery_images?.status === false && validation?.gallery_images?.message && (
                    <p className='error-para'>Gallery Images {validation.gallery_images.message}</p>
                  )}

                  {fixedPackageData?.gallery_images && fixedPackageData?.gallery_images?.length > 0 && (
                    <div className="d-flex flex-wrap">
                      {fixedPackageData?.gallery_images?.map((image, index) => (
                        <div className='upload-image-div destination-image-div'>
                          <div>
                            <img src={`${BACKEND_DOMAIN}${image}`} alt="Category-Preview" key={index} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className='col-lg-6'>
                <div className='admin-input-div'>
                  <label>Related Trips  <span className='required-icon'>*</span></label>
                  <select>
                    <option value="">Select Trips</option>
                    <option value="">Bali Honey Moon</option>
                    <option value="">Kerala BackWater</option>
                    <option value="">Goa Beach Holiday</option>
                  </select>
                </div>
              </div>

              {customizedPackageData && Object.keys(customizedPackageData).length > 0 &&
                <button className="create-common-btn mt-5" onClick={(e) => handleCustomPackageSubmit(e)}>Create Custom Package</button>
              }

              {fixedPackageData && Object.keys(fixedPackageData).length > 0 &&
                <button className="create-common-btn mt-5" onClick={(e) => handleFixedPackageSubmit(e)}>Create Fixed Package</button>
              }

            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default TourCreation
