import { useEffect, useState } from "react";
import {
  Info,
  Map,
  Image,
  DollarSign,
  FileText,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "./TourCreation.css";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificDestination } from "../../../../store/slices/destinationSlices";
import { createTrip } from "../../../../store/slices/tripSlices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { APIBaseUrl } from "../../../../common/api/api";
import { errorMsg, successMsg } from "../../../../common/Toastify";

export default function TourCreation() {
  const [activeStep, setActiveStep] = useState("basic");
  const [openDay, setOpenDay] = useState(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    overview: "",
    destination_id: "",
    destination_type: "",
    category_id: null,
    themes: [],
    hotel_category: "",
    pickup_location: "",
    drop_location: "",
    days: "",
    nights: "",

    // Itinerary
    itineraryDays: [
      {
        id: 1,
        day_number: 1,
        title: "Day 1: Arrival",
        description: "",
        activities: [],
        hotel_name: "",
        meal_plan: [],
      },
    ],

    // Media - Updated to store file objects and preview URLs
    hero_image: null,
    gallery_images: [],

    // Pricing

    pricing: {
      pricing_model: "",
      fixed_departure: [
        {
          from_date: "",
          to_date: "",
          available_slots: "",
          title: "",
          description: "",
          base_price: "",
          discount: "",
          final_price: "",
          booking_amount: "",
          gst_percentage: "",
        },
      ],
      customized: {
        pricing_type: "",
        base_price: "",
        discount: "",
        final_price: "",
      },
    },

    // Details
    highlights: [],
    inclusions: [],
    exclusions: [],
    faqs: [],

    // Policies
    terms: "",
    privacy_policy: "",
    payment_terms: "",
    custom_policies: [],
  });

  const [selectedPricing, setSelectedPricing] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");
  const [inclusionsInput, setInclusionsInput] = useState("");
  const [exclusionsInput, setExclusionsInput] = useState("");
  const [customPolicyInput, setCustomPolicyInput] = useState("");

  const steps = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "itinerary", label: "Itinerary", icon: Map },
    { id: "media", label: "Media", icon: Image },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "details", label: "Details", icon: FileText },
    { id: "policies", label: "Policies", icon: Shield },
  ];

  const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivli",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Howrah",
    "Gwalior",
    "Jabalpur",
    "Coimbatore",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Chandigarh",
    "Guwahati",
    "Solapur",
    "Hubli-Dharwad",
    "Mysore",
  ];

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.destination);

  useEffect(() => {
    dispatch(getSpecificDestination());
  }, [dispatch]);

  const currentIndex = steps.findIndex((s) => s.id === activeStep);
  const progress = ((currentIndex + 1) / steps.length) * 100 + "%";

  // Handler functions
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handlePricingChange = (field, value, index = 0) => {
    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        fixed_departure: prev.pricing.fixed_departure.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const handleCustomPricingChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        customized: {
          ...prev.pricing.customized,
          [field]: value,
        },
      },
    }));
  };

  const handleArrayChange = (field, value, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: isChecked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleItineraryChange = (dayId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      itineraryDays: prev.itineraryDays.map((day) =>
        day.id === dayId ? { ...day, [field]: value } : day
      ),
    }));
  };

  const handleActivitiesChange = (dayId, activity, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      itineraryDays: prev.itineraryDays.map((day) =>
        day.id === dayId
          ? {
            ...day,
            activities: isChecked
              ? [...day.activities, activity]
              : day.activities.filter((a) => a !== activity),
          }
          : day
      ),
    }));
  };

  const handleMealPlanChange = (dayId, meal, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      itineraryDays: prev.itineraryDays.map((day) =>
        day.id === dayId
          ? {
            ...day,
            meal_plan: isChecked
              ? [...day.meal_plan, meal]
              : day.meal_plan.filter((m) => m !== meal),
          }
          : day
      ),
    }));
  };

  const toggleDay = (id) => {
    setOpenDay(openDay === id ? null : id);
  };

  const addNewDay = () => {
    const newId = formData.itineraryDays.length + 1;
    setFormData((prev) => ({
      ...prev,
      itineraryDays: [
        ...prev.itineraryDays,
        {
          id: newId,
          day_number: newId,
          title: `Day ${newId}: New Activity`,
          description: "",
          activities: [],
          hotel_name: "",
          meal_plan: [],
        },
      ],
    }));
  };

  // Add items to arrays
  const addHighlight = () => {
    if (highlightsInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, highlightsInput.trim()],
      }));
      setHighlightsInput("");
    }
  };

  const addInclusion = () => {
    if (inclusionsInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        inclusions: [...prev.inclusions, inclusionsInput.trim()],
      }));
      setInclusionsInput("");
    }
  };

  const addExclusion = () => {
    if (exclusionsInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        exclusions: [...prev.exclusions, exclusionsInput.trim()],
      }));
      setExclusionsInput("");
    }
  };

  const [faqs, setFaqs] = useState([]);
  const [faqInput, setFaqInput] = useState({ question: "", answer: "" });

  // Add FAQ
  const addFaqs = () => {
    if (faqInput?.question?.trim() && faqInput?.answer?.trim()) {
      setFaqs([...faqs, faqInput]);
      setFaqInput({ question: "", answer: "" });

    } else {
      alert("Please fill both question and answer!");
    }
  };

  // Delete FAQ
  const deleteFaqs = (indexToRemove) => {
    const updatedFaqs = faqs.filter((_, index) => index !== indexToRemove);
    setFaqs(updatedFaqs);
  };

  const addCustomPolicy = () => {
    if (customPolicyInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        custom_policies: [
          ...prev.custom_policies,
          { title: "Custom Policy", content: customPolicyInput.trim() },
        ],
      }));
      setCustomPolicyInput("");
    }
  };

  // Remove items from arrays
  // const removeItem = (field, index) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: prev[field].filter((_, i) => i !== index),
  //   }));
  // };

  // File handlers - UPDATED to handle file previews and base64 conversion
  const handleHeroImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          hero_image: file,
          hero_image_preview: e.target.result, // Base64 string for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleFileUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageName = file.name;
    const type = imageName.split(".").pop().toLowerCase();

    if (!["jpeg", "png", "jpg", "pdf", "webp"].includes(type)) {
      errorMsg("Unsupported file type");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      errorMsg("File size should not exceed 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("storage", "local");

    try {
      const res = await APIBaseUrl.post("https://api.yaadigo.com/upload", formData);
      console.log(res.data, "res?.data");

      if (res?.data?.message === "Upload successful") {
        successMsg("Image uploaded successfully");
        setFormData((prev) => ({
          ...prev,
          hero_image: res.data.url,
        }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      errorMsg("File upload failed");
    }
  };

  const handleMultipleFileUpload = async (e, key) => {
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

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      errorMsg("File size should not exceed 5MB.");
      return;
    }

    const form_Data = new FormData();
    form_Data.append("gallery_images", file);
    form_Data.append("storage", "local");
    try {
      const res = await APIBaseUrl.post("https://api.yaadigo.com/multiple", form_Data);
      if (res?.data?.message === "Files uploaded") {
        successMsg("Image uploaded successfully");
        const path = res.data.files;
        const existingImages = formData?.gallery_images || [];

        const newPaths = Array.isArray(path)
          ? path.flat()
          : [path];

        const updatedImages = [...existingImages, ...newPaths];
        setFormData((prev) => ({
          ...prev,
          gallery_images: updatedImages,
        }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      errorMsg("File upload failed");
    }

  };

  const handleGalleryImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = [];

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);

        // When all files are processed, update state
        if (newPreviews.length === files.length) {
          setFormData((prev) => ({
            ...prev,
            gallery_images: [...prev.gallery_images, ...files],
            gallery_previews: [...prev.gallery_previews, ...newPreviews],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index),
      gallery_previews: prev.gallery_previews.filter((_, i) => i !== index),
    }));
  };

  // Remove hero image
  const removeHeroImage = () => {
    setFormData((prev) => ({
      ...prev,
      hero_image: null,
      hero_image_preview: null,
    }));
  };

  // Convert file to base64 for submission
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Prepare data for API submission - UPDATED to include images
  const prepareSubmissionData = async () => {
    const submissionData = {
      title: formData.title,
      overview: formData.overview,
      destination_id: parseInt(formData.destination_id),
      destination_type: formData.destination_type,
      category_id: formData?.category_id,
      themes: formData.themes,
      hotel_category: parseInt(formData.hotel_category) || 0,
      pickup_location: formData.pickup_location,
      drop_location: formData.drop_location,
      days: parseInt(formData.days),
      nights: parseInt(formData.nights),
      meta_tags: `${formData.title}, ${formData.themes.join(", ")}`,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      pricing_model: formData.pricing_model,
      highlights: formData.highlights.join("; "),
      inclusions: formData.inclusions.join("; "),
      exclusions: formData.exclusions.join("; "),
      faqs: faqs,
      terms: formData.terms,
      privacy_policy: formData.privacy_policy,
      payment_terms: formData.payment_terms,

      gallery_images:formData.gallery_images,
      hero_image:formData.hero_image,

      itinerary: formData.itineraryDays.map((day) => ({
        day_number: day.day_number,
        title: day.title,
        description: day.description,
        image_urls: [], // Would be actual URLs after upload
        activities: day.activities,
        hotel_name: day.hotel_name,
        meal_plan: day.meal_plan,
      })),

      // UPDATED: Include actual image data in the media section
      // media: {
      //   hero_image: formData.hero_image, // Base64 string of hero image
      //   hero_image_name: "dummy name",
      //   hero_image_type: "dummy type",
      //   gallery_images: formData.gallery_images, // Array of base64 strings
      //   gallery_image_names: "dummy gallery_image_names",
      //   gallery_image_types: "gallery_image_types",

      //   // Also include URL fields for backward compatibility
      //   hero_image_url: formData.hero_image
      //     ? `${formData?.hero_image}`
      //     : "https://example.com/images/hero.jpg",
      //   thumbnail_url: formData.hero_image
      //     ? `${formData?.hero_image}`
      //     : "https://example.com/images/thumb.jpg",
      //   gallery_urls: formData?.gallery_images,
      // },

      // media: {
      //   hero_image_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO2nZ9kAAAAASUVORK5CYII=",
      //   thumbnail_url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO2nZ9kAAAAASUVORK5CYII=",
      //   gallery_urls: [
      //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO2nZ9kAAAAASUVORK5CYII="
      //   ]
      // },

      pricing: {
        pricing_model: formData?.pricing_model === "fixed" ? "fixed_departure" : "customized",
        ...(formData.pricing_model === "fixed" && {
          fixed_departure: fixedPackage?.map(
            (item) => ({
              from_date: `${item.from_date}T00:00:00`,
              to_date: `${item.to_date}T00:00:00`,
              available_slots: parseInt(item.available_slots),
              title: item.title,
              description: item.description || "",
              base_price: parseInt(item.base_price),
              discount: parseInt(item.discount) || 0,
              final_price: parseInt(item.final_price),
              booking_amount: parseInt(item.booking_amount) || 0,
              gst_percentage: parseInt(item.gst_percentage) || 0,
            })
          ),
        }),
        ...(formData.pricing_model === "custom" && {
          customized: {
            pricing_type: formData.pricing.customized.pricing_type,
            base_price: parseInt(formData.pricing.customized.base_price),
            discount: parseInt(formData.pricing.customized.discount) || 0,
            final_price: parseInt(formData.pricing.customized.final_price),
          },
        }),
      },

      policies: [
        ...(formData.terms
          ? [{ title: "Terms and Conditions", content: formData.terms }]
          : []),
        ...(formData.privacy_policy
          ? [{ title: "Privacy Policy", content: formData.privacy_policy }]
          : []),
        ...(formData.payment_terms
          ? [{ title: "Payment Terms", content: formData.payment_terms }]
          : []),
        ...formData.custom_policies,
      ],
    };

    return submissionData;
  };

  const handleSubmit = async () => {
    try {
      const submissionData = await prepareSubmissionData();
      console.log("submissionData normal:", submissionData);
      // console.log("submissionData json:", submissionData.json());

      // dispatch(createTrip(submissionData))
      //   .unwrap()
      //   .then((result) => {
      //     toast.success("Trip created successfully!");
      //     // setFormData({});
      //     // navigate("/admin/tour-list")
      //   })
      //   .catch((err) => {
      //     console.error("Error creating trip:", err);
      //     toast.error("Error creating trip. Please try again.");
      //   });


      try {
        const res = await APIBaseUrl.post("trips/", submissionData, {
          headers: {
            "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
          },
        });
        if (res?.data?.success === true) {
          console.log(res?.data, "response dataa")
          toast.success("Trip created successfully!");
          // setFormData({});
          // navigate("/admin/tour-list")
        }

      } catch (error) {
        console.error("Error fetching trips:", error?.response?.data || error.message);
        throw error;
      }

    } catch (error) {
      console.error("Error preparing data:", error);
      toast.error("Error preparing trip data. Please try again.");
    }
  };

  const [categoryList, setcategoryList] = useState([])

  const getAllTourCategory = async () => {
    try {
      const res = await APIBaseUrl.get("categories/", {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true) {

        setcategoryList(res?.data?.data)
      }

    } catch (error) {
      console.error("Error fetching trips:", error?.response?.data || error.message);
      throw error;
    }
  }
  useEffect(() => {
    getAllTourCategory()
  }, [])

  const [fixedPackage, setFixedPackage] = useState([{
    from_date: "", to_date: "", description: "",
    available_slots: "", title: "", base_price: "", discount: "", final_price: "", booking_amount: "", gst_percentage: ""
  }]);

  const addFixedPackage = () => {
    setFixedPackage([...fixedPackage, {
      from_date: "", to_date: "", description: "",
      available_slots: "", title: "", base_price: "", discount: "", final_price: "", booking_amount: "", gst_percentage: ""
    }]);
  };

  const deleteFixedPackage = (indexToRemove) => {
    if (indexToRemove !== 0) {
      const updatedFaqs = fixedPackage.filter((_, index) => index !== indexToRemove);
      setFixedPackage(updatedFaqs);
    }
  };

  const updateFixedPackage = (index, key, value) => {
    const updatedFaqs = [...fixedPackage];
    updatedFaqs[index][key] = value;
    setFixedPackage(updatedFaqs);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "basic":
        return (
          <div className="container">
            <h3 className="mb-4 fw-bold fs-5">Trip Details</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Trip Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter trip title"
                    maxLength="100"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                  <small className="text-muted">
                    {formData.title.length}/100 characters
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Trip Overview *</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    placeholder="Describe the trip overview..."
                    value={formData.overview}
                    onChange={(e) =>
                      handleInputChange("overview", e.target.value)
                    }
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Destination *</label>
                  <select
                    className="form-select"
                    value={formData.destination_id}
                    onChange={(e) =>
                      handleInputChange("destination_id", e.target.value)
                    }
                  >
                    <option value="">Select destination</option>
                    {data?.data?.map((destination) => (
                      <option key={destination.id} value={destination.id}>
                        {destination.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">
                    Destination Type *
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="destType"
                      className="form-check-input"
                      checked={formData.destination_type === "Domestic"}
                      onChange={() =>
                        handleInputChange("destination_type", "Domestic")
                      }
                    />
                    <label className="form-check-label">Domestic</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="destType"
                      className="form-check-input"
                      checked={formData.destination_type === "International"}
                      onChange={() =>
                        handleInputChange("destination_type", "International")
                      }
                    />
                    <label className="form-check-label">International</label>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label d-block">Categories *</label>
                  {categoryList?.length > 0 &&
                    categoryList.map((cat) => (
                      <div className="form-check" key={cat.id}>
                        <input
                          type="radio"
                          name="category"
                          className="form-check-input"
                          checked={Number(formData?.category_id) === Number(cat?.id)}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              category_id: Number(cat?.id),
                            }))
                          }
                        />
                        <label className="form-check-label">{cat.name}</label>
                      </div>
                    ))}

                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Trip Theme *</label>
                  {[
                    "Adventure",
                    "Nature",
                    "Religious",
                    "Wildlife",
                    "Water Activities",
                  ].map((cat) => (
                    <div className="form-check" key={cat}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData.themes.includes(cat)}
                        onChange={(e) =>
                          handleArrayChange("themes", cat, e.target.checked)
                        }
                      />
                      <label className="form-check-label">{cat}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="mb-4 fw-bold fs-5 mt-5">Location Details</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Pickup city *</label>
                        <input
                      type="text"
                      className="form-control"
                      placeholder="Enter pickup city"
                      value={formData.pickup_location}
                      onChange={(e) =>
                      handleInputChange("pickup_location", e.target.value)
                    }
                    />
                </div>

                <div className="mb-3">
                  <label className="form-label">Drop city *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter drop city"
                      value={formData.drop_location}
                      onChange={(e) =>
                        handleInputChange("drop_location", e.target.value)
                      }
                    />
                 </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Days *</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Days"
                      value={formData.days}
                      onChange={(e) =>
                        handleInputChange("days", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Nights</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Nights"
                      value={formData.nights}
                      onChange={(e) =>
                        handleInputChange("nights", e.target.value)
                      }
                    />
                  </div>
                </div>
                <small className="text-muted">
                  Example: 5 Days 4 Nights should be less than Days!
                </small>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label d-block">Hotel Category *</label>
                  {["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"].map(
                    (cat, index) => (
                      <div className="form-check" key={cat}>
                        <input
                          type="radio"
                          name="hotelCategory"
                          className="form-check-input"
                          checked={
                            formData.hotel_category === (index + 1).toString()
                          }
                          onChange={() =>
                            handleInputChange(
                              "hotel_category",
                              (index + 1).toString()
                            )
                          }
                        />
                        <label className="form-check-label">{cat}</label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "itinerary":
        return (
          <div className="form-container">
            <h3 className="mb-4 font-bold text-lg">Trip Itinerary</h3>
            {formData.itineraryDays.map((day) => (
              <div
                key={day.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleDay(day.id)}
                >
                  <span className="font-medium">{day.title}</span>
                  {openDay === day.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>

                {openDay === day.id && (
                  <div style={{ padding: "16px", background: "#fff" }}>
                    <div className="form-group">
                      <label>Day Title *</label>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) =>
                          handleItineraryChange(day.id, "title", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        rows="3"
                        placeholder="Trip Description"
                        value={day.description}
                        onChange={(e) =>
                          handleItineraryChange(
                            day.id,
                            "description",
                            e.target.value
                          )
                        }
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label>Select Activities</label>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        {[
                          "City Tour",
                          "Beach Visit",
                          "Trekking",
                          "Sightseeing",
                          "Shopping",
                          "Adventure Sports",
                        ].map((activity) => (
                          <label
                            key={activity}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={day.activities.includes(activity)}
                              onChange={(e) =>
                                handleActivitiesChange(
                                  day.id,
                                  activity,
                                  e.target.checked
                                )
                              }
                            />
                            {activity}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Hotel Name *</label>
                      <input
                        type="text"
                        placeholder="Hotel Name"
                        value={day.hotel_name}
                        onChange={(e) =>
                          handleItineraryChange(
                            day.id,
                            "hotel_name",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Meal Plan</label>
                      <div style={{ display: "flex", gap: "12px" }}>
                        {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                          <label key={meal}>
                            <input
                              type="checkbox"
                              checked={day.meal_plan.includes(meal)}
                              onChange={(e) =>
                                handleMealPlanChange(
                                  day.id,
                                  meal,
                                  e.target.checked
                                )
                              }
                            />
                            {meal}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={addNewDay}
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              + Add Another Day
            </button>
          </div>
        );

      case "media":
        return (
          <div className="form-container">
            <div className="media-header">
              <h3>Media Assets</h3>
              <p>Upload images and videos for your trip package</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div className="media-section">
                <div className="section-title">
                  📷 Hero Image / Thumbnail <span className="required">*</span>
                </div>
                <div
                  className="upload-area"
                  onClick={() => document.getElementById("heroImage")?.click()}
                >
                  <div className="upload-icon">📷</div>
                  <div className="upload-text">
                    <h4>Upload Hero Image</h4>
                    <p>Drag and drop or click to browse</p>
                    {formData?.hero_image && (
                      <p>Selected: {formData?.hero_image}</p>
                    )}
                  </div>
                  <input
                    type="file"
                    id='heroImage'
                    name='hero_image'
                    accept='.png,.jpeg,.jpg,.pdf,.webp'
                    className="file-input"
                    onChange={(e) => { handleFileUpload(e, "image"); }}
                  />
                </div>
                <div className="file-restrictions">
                  • Use high quality JPG, PNG or WebP format
                  <br />
                  • Recommended size: 1200x800 pixels
                  <br />
                  • Maximum file size: 5MB
                  <br />• This will be the main image that represents your trip
                  package
                </div>

                {formData?.hero_image && (
                  <div className='upload-image-div'>
                    <img src={`${formData?.hero_image}`} alt="Category-Preview" />
                  </div>
                )}
              </div>
              <div className="media-section">
                <div className="section-title">
                  🖼️ Image Gallery <span className="required">*</span>
                </div>
                <div
                  className="upload-area"
                  onClick={() =>
                    document.getElementById("galleryImages")?.click()
                  }
                >
                  <div className="upload-icon">🖼️</div>
                  <div className="upload-text">
                    <h4>Image Gallery</h4>
                    <p>Add multiple images</p>
                  </div>
                  <input
                    type="file"
                    id="galleryImages"
                    name='gallery_images'
                    accept='.png,.jpeg,.jpg,.pdf,.webp'
                    className="file-input"
                    onChange={(e) => { handleMultipleFileUpload(e, "image"); }}
                  />
                </div>
                <div className="file-restrictions">
                  Gallery best practices: • Upload 5-10 high-quality images
                  <br />
                  • Show different attractions and activities
                  <br />
                  • Include both landscape and close-up shots
                  <br />
                  • Maintain consistent quality and style
                  <br />• Recommended size: 1200x800px minimum
                </div>
                {formData?.gallery_images && formData?.gallery_images?.length > 0 && (
                  <div className="d-flex flex-wrap">
                    {formData?.gallery_images?.map((image, index) => (
                      <div className='upload-image-div destination-image-div'>
                        <div>
                          <img src={encodeURI(image)} alt="Category-Preview" key={index} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "pricing":
        return (
          <div className="container">
            <h5 className="mb-3 fw-bold">Pricing Model *</h5>

            <div className="row mb-4">
              <div className="col-md-6">
                <div
                  className={`p-3 border rounded d-flex align-items-center ${selectedPricing === "fixed" ? "border-primary" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedPricing("fixed");
                    handleInputChange("pricing_model", "fixed");
                  }}
                >
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    checked={selectedPricing === "fixed"}
                    onChange={() => {
                      setSelectedPricing("fixed");
                      handleInputChange("pricing_model", "fixed");
                    }}
                  />
                  <div>
                    <label className="form-check-label fw-bold">
                      Fixed Departure
                    </label>
                    <div className="small text-muted">
                      Set specific dates with group bookings
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className={`p-3 border rounded d-flex align-items-center ${selectedPricing === "custom" ? "border-primary" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedPricing("custom");
                    handleInputChange("pricing_model", "custom");
                  }}
                >
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    checked={selectedPricing === "custom"}
                    onChange={() => {
                      setSelectedPricing("custom");
                      handleInputChange("pricing_model", "custom");
                    }}
                  />
                  <div>
                    <label className="form-check-label fw-bold">
                      Customized Trip
                    </label>
                    <div className="small text-muted">
                      Flexible dates based on customer preference
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedPricing === "fixed" && (
              <>
                {/* <h6 className="fw-bold mb-2">Available Slots</h6>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">From Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.pricing.fixed_departure[0].from_date}
                      onChange={(e) =>
                        handlePricingChange("from_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">To Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.pricing.fixed_departure[0].to_date}
                      onChange={(e) =>
                        handlePricingChange("to_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Available Slots *</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="10"
                      value={
                        formData.pricing.fixed_departure[0].available_slots
                      }
                      onChange={(e) =>
                        handlePricingChange("available_slots", e.target.value)
                      }
                    />
                  </div>
                </div>

                <h6 className="fw-bold mb-2">Costing Packages</h6>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Package Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Triple Occupancy"
                      value={formData.pricing.fixed_departure[0].title}
                      onChange={(e) =>
                        handlePricingChange("title", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Base Price (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={
                        formData.pricing.fixed_departure[0].base_price
                      }
                      onChange={(e) =>
                        handlePricingChange("base_price", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Discount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.pricing.fixed_departure[0].discount}
                      onChange={(e) =>
                        handlePricingChange("discount", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Final Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={
                        formData.pricing.fixed_departure[0].final_price
                      }
                      onChange={(e) =>
                        handlePricingChange("final_price", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Booking Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={
                        formData.pricing.fixed_departure[0].booking_amount
                      }
                      onChange={(e) =>
                        handlePricingChange("booking_amount", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">GST Percentage (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={
                        formData.pricing.fixed_departure[0].gst_percentage
                      }
                      onChange={(e) =>
                        handlePricingChange("gst_percentage", e.target.value)
                      }
                    />
                  </div>
                </div> */}

                <div className="mt-3 destination-faq">
                  {/* <div className='admin-input-div'>
                    <label>Create Slots</label>
                  </div> */}
                  <div className="accordion" id="accordionExample">
                    {fixedPackage.map((trip, index) => (
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
                              Available Slots {index + 1}
                            </button>
                            <div className="ms-3 d-flex gap-2">
                              <button className={`destination-faq-add ${index === 0 && "me-3"}`} onClick={addFixedPackage}>
                                Add
                              </button>
                              {index !== 0 && (
                                <button
                                  className="destination-faq-add faq-delete me-3"
                                  onClick={() => deleteFixedPackage(index)}
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

                              <div className="row mb-3">
                                <div className="col-md-4">
                                  <label className="form-label">From Date *</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={trip?.from_date}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "from_date", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">To Date *</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={trip?.to_date}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "to_date", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">Available Slots *</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="10"
                                    value={trip?.available_slots}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "available_slots", e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <h6 className="fw-bold mb-4 mt-5">Costing Packages</h6>
                              <div className="row mb-3">
                                <div className="col-md-6">
                                  <label className="form-label">Package Title *</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Triple Occupancy"
                                    value={trip?.title}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "title", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="form-label">Base Price (₹) *</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={trip?.base_price}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "base_price", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="form-label">Discount (₹)</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={trip?.discount}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "discount", e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="row mb-3">
                                <div className="col-md-4">
                                  <label className="form-label">Final Price (₹)</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={trip?.final_price}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "final_price", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">Booking Amount (₹)</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={trip?.booking_amount}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "booking_amount", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">GST Percentage (%)</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={trip?.gst_percentage}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "gst_percentage", e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedPricing === "custom" && (
              <>
                <h6 className="fw-bold mb-2">Customized Pricing</h6>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label d-block">Pricing Type *</label>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="pricingType"
                        className="form-check-input"
                        checked={
                          formData.pricing.customized.pricing_type ===
                          "Price Per Person"
                        }
                        onChange={() =>
                          handleCustomPricingChange(
                            "pricing_type",
                            "Price Per Person"
                          )
                        }
                      />
                      <label className="form-check-label">
                        Price Per Person
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="pricingType"
                        className="form-check-input"
                        checked={
                          formData.pricing.customized?.pricing_type ===
                          "Price Per Package"
                        }
                        onChange={() =>
                          handleCustomPricingChange(
                            "pricing_type",
                            "Price Per Package"
                          )
                        }
                      />
                      <label className="form-check-label">
                        Price Per Package
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Base Price (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.pricing?.customized?.base_price}
                      onChange={(e) =>
                        handleCustomPricingChange("base_price", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Discount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.pricing.customized?.discount}
                      onChange={(e) =>
                        handleCustomPricingChange("discount", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Final Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.pricing.customized?.final_price}
                      onChange={(e) =>
                        handleCustomPricingChange("final_price", e.target.value)
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case "details":
        return (
          <div className="form-container details">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px",
              }}
            >
              <div
                style={{
                  border: "1px solid black",
                  width: "800px",
                  padding: "20px",
                }}
                className="form-container"
              >
                <h3>Trip Highlight</h3>
                <label>Add Trip Highlight</label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="TajMahal"
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    style={{ width: "70%" }}
                  />
                  <button onClick={addHighlight}>+</button>
                </div>
                <div>
                  {formData.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <span>{highlight}</span>
                      <button onClick={() => removeItem("highlights", index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid black",
                  width: "800px",
                  padding: "20px",
                }}
                className="form-container"
              >
                <h3>Inclusions</h3>
                <label>Add Inclusions</label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="4 Nights"
                    value={inclusionsInput}
                    onChange={(e) => setInclusionsInput(e.target.value)}
                    style={{ width: "70%" }}
                  />
                  <button onClick={addInclusion}>+</button>
                </div>
                <div>
                  {formData.inclusions.map((inclusion, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <span>{inclusion}</span>
                      <button onClick={() => removeItem("inclusions", index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px",
              }}
            >
              <div
                style={{
                  border: "1px solid black",
                  width: "800px",
                  padding: "20px",
                }}
                className="form-container"
              >
                <h3>Exclusions</h3>
                <label>Add Exclusions</label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Personal expenses"
                    value={exclusionsInput}
                    onChange={(e) => setExclusionsInput(e.target.value)}
                    style={{ width: "70%" }}
                  />
                  <button onClick={addExclusion}>+</button>
                </div>
                <div>
                  {formData.exclusions.map((exclusion, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <span>{exclusion}</span>
                      <button onClick={() => removeItem("exclusions", index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid black",
                  width: "800px",
                  padding: "20px",
                }}
                className="form-container"
              >
                <h3>FAQ (Optional)</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add FAQ question and answer"
                    value={faqInput?.question}
                    onChange={(e) =>
                      setFaqInput({ ...faqInput, question: e.target.value })
                    }
                    style={{ width: "100%" }}
                  />
                  <input
                    type="text"
                    placeholder="Add FAQ question and answer"
                    value={faqInput?.answer}
                    onChange={(e) =>
                      setFaqInput({ ...faqInput, answer: e.target.value })
                    }
                    style={{ width: "100%" }}
                    className="mt-4"
                  />
                  <button onClick={addFaqs} className="mt-2">Add FAQ</button>
                </div>
                <div>
                  {faqs.length > 0 &&
                    faqs.map((faq, index) =>
                      faq.question && faq.answer ? (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "8px",
                            borderBottom: "1px solid #ccc",
                            paddingBottom: "5px",
                          }}
                        >
                          <div>
                            <strong>Q:</strong> {faq.question}
                            <br />
                            <strong>A:</strong> {faq.answer}
                          </div>
                          <button
                            style={{
                              color: "white",
                              background: "red",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                              borderRadius: "4px",
                            }}
                            onClick={() => deleteFaqs(index)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : null
                    )}
                </div>
              </div>


            </div>
          </div>
        );

      case "policies":
        return (
          <div className="form-container">
            <div className="form-group">
              <label>Terms and Conditions Content</label>
              <textarea
                rows="3"
                placeholder="Enter terms and conditions"
                value={formData.terms}
                onChange={(e) => handleInputChange("terms", e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Privacy Policy Content</label>
              <textarea
                rows="3"
                placeholder="Enter privacy policy"
                value={formData.privacy_policy}
                onChange={(e) =>
                  handleInputChange("privacy_policy", e.target.value)
                }
              ></textarea>
            </div>

            <div className="form-group">
              <label>Payment Content</label>
              <textarea
                rows="3"
                placeholder="Enter payment details"
                value={formData.payment_terms}
                onChange={(e) =>
                  handleInputChange("payment_terms", e.target.value)
                }
              ></textarea>
            </div>

            {/* <div className="form-group">
              <label>Custom Policy</label>
              <textarea
                rows="3"
                placeholder="Enter custom policy"
                value={customPolicyInput}
                onChange={(e) => setCustomPolicyInput(e.target.value)}
              ></textarea>
              <button type="button" onClick={addCustomPolicy}>
                Add new Policy
              </button>
              <div>
                {formData.custom_policies.map((policy, index) => (
                  <div
                    key={index}
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <strong>{policy.title}</strong>
                    <p>{policy.content}</p>
                    <button
                      onClick={() => removeItem("custom_policies", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        );

      default:
        return <div>Step Not Found</div>;
    }
  };

  console.log(formData, "formData-formData")

  return (
    <div className="tour-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex justify-content-between">
        <div className="tour-header">
          <h2>Add New Trip</h2>
          <p>Create a comprehensive travel package</p>
        </div>
        <div>
          <button className='admin-add-button mt-0' onClick={() => navigate(-1)}><i class="fa-solid fa-plus me-2"></i> Back</button>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: progress }}></div>
      </div>

      <div className="stepper">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const active = index <= currentIndex;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className="step-button"
            >
              <div
                className={`step-circle ${active ? "step-active" : "step-inactive"}`}
              >
                <Icon />
              </div>
              <span
                className={`step-label ${active ? "step-label-active" : "step-label-inactive"}`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {renderStepContent()}

      <div
        style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#6b7280", fontSize: "14px" }}>
          {currentIndex + 1}/{steps.length} sections complete
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          {/* <button className="button button-secondary">Save Draft</button>
          <button className="button button-secondary">Preview</button> */}
          <button className="button button-green" onClick={handleSubmit}>
            Publish Trip
          </button>
        </div>
      </div>
    </div>
  );
}
