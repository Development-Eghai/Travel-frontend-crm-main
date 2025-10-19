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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { APIBaseUrl } from "../../../../common/api/api";
import { errorMsg, successMsg } from "../../../../common/Toastify";
import { CircularProgress } from "@mui/material";

export default function TourCreation() {
  const [activeStep, setActiveStep] = useState("basic");
  const [openDay, setOpenDay] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "", // Added slug field
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
    hero_image: null,
    gallery_images: [],
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
        gst_percentage: "",
      },
    },
    highlights: [],
    inclusions: [],
    exclusions: [],
    faqs: [],
    terms: "",
    privacy_policy: "",
    payment_terms: "",
    custom_policies: [],
  });

  const [selectedPricing, setSelectedPricing] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");
  const [inclusionsInput, setInclusionsInput] = useState("");
  const [exclusionsInput, setExclusionsInput] = useState("");

  const steps = [
    { id: "basic", label: "Basic Info", icon: Info },
    { id: "itinerary", label: "Itinerary", icon: Map },
    { id: "media", label: "Media", icon: Image },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "details", label: "Details", icon: FileText },
    { id: "policies", label: "Policies", icon: Shield },
  ];

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.destination);

  useEffect(() => {
    dispatch(getSpecificDestination());
  }, [dispatch]);

  const currentIndex = steps.findIndex((s) => s.id === activeStep);
  const progress = ((currentIndex + 1) / steps.length) * 100 + "%";

  // Helper function to generate slug
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Handler functions
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      
      // Auto-generate slug when title changes (only if not editing)
      if (field === "title" && !id) {
        updated.slug = generateSlug(value);
      }
      
      return updated;
    });
  };

  const handleCustomPricingChange = (field, value) => {
    setFormData((prev) => {
      const updatedCustomized = {
        ...prev.pricing.customized,
        [field]: value,
      };

      const basePrice = parseFloat(updatedCustomized.base_price) || 0;
      const discount = parseFloat(updatedCustomized.discount) || 0;
      const gst = parseFloat(updatedCustomized.gst_percentage) || 0;

      const discountedPrice = basePrice - discount;
      const finalPrice = discountedPrice + (discountedPrice * gst / 100);

      updatedCustomized.final_price = finalPrice.toFixed(2);

      return {
        ...prev,
        pricing: {
          ...prev.pricing,
          customized: updatedCustomized,
        },
      };
    });
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

  const addFaqs = () => {
    if (faqInput?.question?.trim() && faqInput?.answer?.trim()) {
      setFaqs([...faqs, faqInput]);
      setFaqInput({ question: "", answer: "" });
    } else {
      alert("Please fill both question and answer!");
    }
  };

  const deleteFaqs = (indexToRemove) => {
    const updatedFaqs = faqs.filter((_, index) => index !== indexToRemove);
    setFaqs(updatedFaqs);
  };

  const removeItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
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
      errorMsg("Unsupported file type")
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

  const removeHeroImage = () => {
    setFormData((prev) => ({
      ...prev,
      hero_image: null,
    }));
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index),
    }));
  };

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
      slug: id ? formData.slug : generateSlug(formData.title), // Use existing slug if editing
      pricing_model: formData.pricing_model,
      highlights: formData.highlights.join("; "),
      inclusions: formData.inclusions.join("; "),
      exclusions: formData.exclusions.join("; "),
      faqs: faqs,
      terms: formData.terms,
      privacy_policy: formData.privacy_policy,
      payment_terms: formData.payment_terms,
      gallery_images: formData.gallery_images,
      hero_image: formData.hero_image,
      itinerary: formData.itineraryDays.map((day) => ({
        day_number: day.day_number,
        title: day.title,
        description: day.description,
        image_urls: [],
        activities: day.activities,
        hotel_name: day.hotel_name,
        meal_plan: day.meal_plan,
      })),
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
            gst_percentage: parseInt(formData.pricing.customized.gst_percentage) || 0,
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
      setIsLoading(true);
      const submissionData = await prepareSubmissionData();

      const res = await APIBaseUrl.post("trips/", submissionData, {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true) {
        toast.success("Trip created successfully!");
        setFormData({});
        setIsLoading(false);
        navigate("/admin/tour-list")
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      toast.error("Error creating trip. Please try again.");
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const submissionData = await prepareSubmissionData();

      const res = await APIBaseUrl.put(`trips/${id}`, submissionData, {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true) {
        toast.success("Trip updated successfully!");
        setIsLoading(false);
        navigate("/admin/tour-list")
      }
    } catch (error) {
      console.error("Error updating trip:", error);
      toast.error("Error updating trip. Please try again.");
      setIsLoading(false);
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
      console.error("Error fetching categories:", error?.response?.data || error.message);
    }
  }

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
    const updatedPackages = [...fixedPackage];
    updatedPackages[index][key] = value;

    const basePrice = parseFloat(updatedPackages[index].base_price) || 0;
    const discount = parseFloat(updatedPackages[index].discount) || 0;
    const gst = parseFloat(updatedPackages[index].gst_percentage) || 0;

    const discountedPrice = basePrice - discount;
    const finalPrice = discountedPrice + (discountedPrice * gst / 100);

    updatedPackages[index].final_price = finalPrice.toFixed(2);

    setFixedPackage(updatedPackages);
  };

  const getSpecificTrip = async (tripId) => {
    try {
      const res = await APIBaseUrl.get(`trips/${tripId}`, {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true) {
        const tripData = res?.data?.data;

        const highlightsArray = tripData.highlights ? tripData.highlights.split("; ") : [];
        const inclusionsArray = tripData.inclusions ? tripData.inclusions.split("; ") : [];
        const exclusionsArray = tripData.exclusions ? tripData.exclusions.split("; ") : [];

        const itineraryDays = tripData.itinerary?.map((day, index) => ({
          id: index + 1,
          day_number: day.day_number,
          title: day.title,
          description: day.description,
          activities: day.activities || [],
          hotel_name: day.hotel_name,
          meal_plan: day.meal_plan || [],
        })) || [];

        setFormData({
          ...formData,
          title: tripData.title || "",
          slug: tripData.slug || "", // IMPORTANT: Preserve the slug
          overview: tripData.overview || "",
          destination_id: tripData.destination_id || "",
          destination_type: tripData.destination_type || "",
          category_id: tripData.category_id || null,
          themes: tripData.themes || [],
          hotel_category: tripData.hotel_category?.toString() || "",
          pickup_location: tripData.pickup_location || "",
          drop_location: tripData.drop_location || "",
          days: tripData.days || "",
          nights: tripData.nights || "",
          hero_image: tripData.hero_image || null,
          gallery_images: tripData.gallery_images || [],
          highlights: highlightsArray,
          inclusions: inclusionsArray,
          exclusions: exclusionsArray,
          terms: tripData.terms || "",
          privacy_policy: tripData.privacy_policy || "",
          payment_terms: tripData.payment_terms || "",
          pricing_model: tripData.pricing?.pricing_model === "fixed_departure" ? "fixed" : "custom",
          itineraryDays: itineraryDays,
          pricing: {
            ...formData.pricing,
            customized: {
              pricing_type: tripData.pricing?.customized?.pricing_type || "",
              base_price: tripData.pricing?.customized?.base_price || "",
              discount: tripData.pricing?.customized?.discount || "",
              final_price: tripData.pricing?.customized?.final_price || "",
              gst_percentage: tripData.pricing?.customized?.gst_percentage || "",
            }
          }
        });

        setFaqs(tripData.faqs || []);
        setSelectedPricing(tripData.pricing?.pricing_model === "fixed_departure" ? "fixed" : "custom");

        if (tripData.pricing?.fixed_departure) {
          setFixedPackage(tripData.pricing.fixed_departure.map(pkg => ({
            from_date: pkg.from_date?.split('T')[0] || "",
            to_date: pkg.to_date?.split('T')[0] || "",
            available_slots: pkg.available_slots || "",
            title: pkg.title || "",
            description: pkg.description || "",
            base_price: pkg.base_price || "",
            discount: pkg.discount || "",
            final_price: pkg.final_price || "",
            booking_amount: pkg.booking_amount || "",
            gst_percentage: pkg.gst_percentage || "",
          })));
        }
      }
    } catch (error) {
      console.error("Error fetching trip:", error?.response?.data || error.message);
      errorMsg("Failed to load trip data");
    }
  };

  useEffect(() => {
    getAllTourCategory();
    if (id) {
      getSpecificTrip(id);
    }
  }, [id]);

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
                  <div className='upload-image-div' style={{position: 'relative'}}>
                    <img src={`${formData?.hero_image}`} alt="Hero-Preview" />
                    <span 
                      className="delete-image-icon" 
                      onClick={removeHeroImage}
                      style={{
                        position: 'absolute', 
                        top: '5px', 
                        right: '5px', 
                        background: 'red', 
                        color: 'white', 
                        borderRadius: '50%', 
                        width: '25px', 
                        height: '25px', 
                        textAlign: 'center', 
                        cursor: 'pointer', 
                        lineHeight: '25px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                      }}
                    >
                      &times;
                    </span>
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
                      <div className='upload-image-div destination-image-div' key={index} style={{position: 'relative'}}>
                        <div>
                          <img src={encodeURI(image)} alt="Gallery-Preview" />
                        </div>
                        <span 
                          className="delete-image-icon" 
                          onClick={() => removeGalleryImage(index)}
                          style={{
                            position: 'absolute', 
                            top: '5px', 
                            right: '5px', 
                            background: 'red', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: '20px', 
                            height: '20px', 
                            textAlign: 'center', 
                            cursor: 'pointer', 
                            lineHeight: '20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          &times;
                        </span>
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
                <div className="mt-3 destination-faq">
                  <div className="accordion" id="accordionExample">
                    {fixedPackage.map((trip, index) => (
                      <div className='mt-4' key={index}>
                        <div className="accordion-item">
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
                                    placeholder="Enter available slots"
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
                                    placeholder="Enter base price"
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
                                    placeholder="Enter discount price"
                                    value={trip?.discount}
                                    onChange={(e) =>
                                      updateFixedPackage(index, "discount", e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="row mb-3">
                                <div className="col-md-4">
                                  <label className="form-label">Booking Amount (₹)</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={trip?.booking_amount}
                                    placeholder="Enter booking amount"
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
                                    placeholder="Enter GST percentage"
                                    onChange={(e) =>
                                      updateFixedPackage(index, "gst_percentage", e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label">Final Price (₹)</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    readOnly
                                    value={trip?.final_price}
                                    placeholder="Auto-calculated"
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
                      placeholder="Enter base price"
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
                      placeholder="Enter discount price"
                      value={formData.pricing.customized?.discount}
                      onChange={(e) =>
                        handleCustomPricingChange("discount", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">GST Percentage (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter GST percentage"
                      value={formData.pricing.customized?.gst_percentage || ""}
                      onChange={(e) =>
                        handleCustomPricingChange("gst_percentage", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label mt-3">Final Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Auto-calculated"
                      readOnly
                      value={formData.pricing.customized?.final_price}
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
                    placeholder="Add FAQ question"
                    value={faqInput?.question}
                    onChange={(e) =>
                      setFaqInput({ ...faqInput, question: e.target.value })
                    }
                    style={{ width: "100%" }}
                  />
                  <input
                    type="text"
                    placeholder="Add FAQ answer"
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
              <label>Cancellation Policy Content</label>
              <textarea
                rows="3"
                placeholder="Enter cancellation policy"
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
          <h2>{id ? "Edit Trip" : "Add New Trip"}</h2>
          <p>Create a comprehensive travel package</p>
        </div>
        <div>
          <button className='admin-add-button mt-0' onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left me-2"></i> Back
          </button>
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
          {id ? (
            <button 
              className="button button-green" 
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Update Trip"}
            </button>
          ) : (
            <button 
              className="button button-green" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Publish Trip"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}