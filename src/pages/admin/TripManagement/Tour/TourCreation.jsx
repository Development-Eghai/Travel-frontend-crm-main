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
    categories: [],
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
    hero_image_preview: null,
    gallery_images: [],
    gallery_previews: [],

    // Pricing
    pricing_model: "",
    pricing_data: {
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
  const [faqInput, setFaqInput] = useState("");
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
      pricing_data: {
        ...prev.pricing_data,
        fixed_departure: prev.pricing_data.fixed_departure.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const handleCustomPricingChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      pricing_data: {
        ...prev.pricing_data,
        customized: {
          ...prev.pricing_data.customized,
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

  const addFaq = () => {
    if (faqInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        faqs: [...prev.faqs, faqInput.trim()],
      }));
      setFaqInput("");
    }
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
  const removeItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

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
    // Convert images to base64 or prepare for upload
    let heroImageBase64 = null;
    let galleryImagesBase64 = [];

    if (formData.hero_image) {
      heroImageBase64 = await fileToBase64(formData.hero_image);
    }

    if (formData.gallery_images.length > 0) {
      for (const file of formData.gallery_images) {
        const base64 = await fileToBase64(file);
        galleryImagesBase64.push(base64);
      }
    }

    const submissionData = {
      title: formData.title,
      overview: formData.overview,
      destination_id: parseInt(formData.destination_id),
      destination_type: formData.destination_type,
      categories: formData.categories,
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
      faqs: formData.faqs.join("; "),
      terms: formData.terms,
      privacy_policy: formData.privacy_policy,
      payment_terms: formData.payment_terms,

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
      media: {
        hero_image: heroImageBase64, // Base64 string of hero image
        hero_image_name: formData.hero_image ? formData.hero_image.name : null,
        hero_image_type: formData.hero_image ? formData.hero_image.type : null,
        gallery_images: galleryImagesBase64, // Array of base64 strings
        gallery_image_names: formData.gallery_images.map((file) => file.name),
        gallery_image_types: formData.gallery_images.map((file) => file.type),

        // Also include URL fields for backward compatibility
        hero_image_url: formData.hero_image
          ? `https://example.com/images/${formData.hero_image.name}`
          : "https://example.com/images/hero.jpg",
        thumbnail_url: formData.hero_image
          ? `https://example.com/images/thumb_${formData.hero_image.name}`
          : "https://example.com/images/thumb.jpg",
        gallery_urls: formData.gallery_images.map(
          (file, index) => `https://example.com/images/gallery${index + 1}.jpg`
        ),
      },

      pricing: {
        pricing_model: formData.pricing_model,
        ...(formData.pricing_model === "fixed" && {
          fixed_departure: formData.pricing_data.fixed_departure.map(
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
            pricing_type: formData.pricing_data.customized.pricing_type,
            base_price: parseInt(formData.pricing_data.customized.base_price),
            discount: parseInt(formData.pricing_data.customized.discount) || 0,
            final_price: parseInt(formData.pricing_data.customized.final_price),
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
      // console.log("Submitting data:", JSON.stringify(submissionData, null, 2));
      // console.log("Media section data:", submissionData.media);

      dispatch(createTrip(submissionData))
        .unwrap()
        .then((result) => {
          // console.log("Trip created successfully:", result);
          toast.success("Trip created successfully!");
        })
        .catch((err) => {
          console.error("Error creating trip:", err);
          toast.error("Error creating trip. Please try again.");
        });
    } catch (error) {
      console.error("Error preparing data:", error);
      toast.error("Error preparing trip data. Please try again.");
    }
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
                  {[
                    "Honeymoon Packages",
                    "Family Packages",
                    "Friends",
                    "Group Packages",
                    "Solo Trips",
                    "All-Girls Trips",
                    "All-Boys Trips",
                    "Volunteer Trips",
                  ].map((cat) => (
                    <div className="form-check" key={cat}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData.categories.includes(cat)}
                        onChange={(e) =>
                          handleArrayChange("categories", cat, e.target.checked)
                        }
                      />
                      <label className="form-check-label">{cat}</label>
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
                  <select
                    className="form-select"
                    value={formData.pickup_location}
                    onChange={(e) =>
                      handleInputChange("pickup_location", e.target.value)
                    }
                  >
                    <option value="">Select city</option>
                    {indianCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Drop city *</label>
                  <select
                    className="form-select"
                    value={formData.drop_location}
                    onChange={(e) =>
                      handleInputChange("drop_location", e.target.value)
                    }
                  >
                    <option value="">Select city</option>
                    {indianCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
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
                    {formData.hero_image && (
                      <p>Selected: {formData.hero_image.name}</p>
                    )}
                  </div>
                  <input
                    type="file"
                    id="heroImage"
                    className="file-input"
                    accept="image/*"
                    onChange={handleHeroImageChange}
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
                    {formData.gallery_images.length > 0 && (
                      <p>Selected: {formData.gallery_images.length} files</p>
                    )}
                  </div>
                  <input
                    type="file"
                    id="galleryImages"
                    className="file-input"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImagesChange}
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
                <h6 className="fw-bold mb-2">Available Slots</h6>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">From Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.pricing_data.fixed_departure[0].from_date}
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
                      value={formData.pricing_data.fixed_departure[0].to_date}
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
                        formData.pricing_data.fixed_departure[0].available_slots
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
                      value={formData.pricing_data.fixed_departure[0].title}
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
                        formData.pricing_data.fixed_departure[0].base_price
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
                      value={formData.pricing_data.fixed_departure[0].discount}
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
                        formData.pricing_data.fixed_departure[0].final_price
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
                        formData.pricing_data.fixed_departure[0].booking_amount
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
                        formData.pricing_data.fixed_departure[0].gst_percentage
                      }
                      onChange={(e) =>
                        handlePricingChange("gst_percentage", e.target.value)
                      }
                    />
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
                          formData.pricing_data.customized.pricing_type ===
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
                          formData.pricing_data.customized.pricing_type ===
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
                      value={formData.pricing_data.customized.base_price}
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
                      value={formData.pricing_data.customized.discount}
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
                      value={formData.pricing_data.customized.final_price}
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
                    justifyContent: "space-around",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add FAQ question and answer"
                    value={faqInput}
                    onChange={(e) => setFaqInput(e.target.value)}
                    style={{ width: "70%" }}
                  />
                  <button onClick={addFaq}>Add FAQ</button>
                </div>
                <div>
                  {formData.faqs.map((faq, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <span>{faq}</span>
                      <button onClick={() => removeItem("faqs", index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "policies":
        return (
          <div className="form-container">
            <h5>Terms and Conditions</h5>

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

            <div className="form-group">
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
            </div>
          </div>
        );

      default:
        return <div>Step Not Found</div>;
    }
  };

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
          <button className="button button-secondary">Save Draft</button>
          <button className="button button-secondary">Preview</button>
          <button className="button button-green" onClick={handleSubmit}>
            Publish Trip
          </button>
        </div>
      </div>
    </div>
  );
}
