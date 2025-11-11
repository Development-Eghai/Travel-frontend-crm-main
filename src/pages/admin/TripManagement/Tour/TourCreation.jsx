// TourCreation.jsx
// Full-featured Tour Creation / Edit component
// Features:
// - Search-style Destination / Category / Activity inputs with immediate suggestions
// - Confirm modal redirects to /admin/... (relative paths) when "Create one?" is clicked
// - Auto-generate itinerary days when Days changes
// - Always-visible red delete icons
// - Fixed, single-color progress bar
// - Media upload (hero + gallery) using existing endpoints
// - Pricing: fixed departure and custom pricing
// - Details: highlights, inclusions, exclusions, FAQs
// - Policies: terms, cancellation, payment
// - Edit-mode loader to prefill all fields
// - Toast notifications for UX feedback

import React, { useEffect, useMemo, useState } from "react";
import {
  Info,
  Map,
  Image as ImageIcon,
  DollarSign,
  FileText,
  Shield,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import "./TourCreation.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

/* ---------- Config ---------- */
const BASE_URL = "https://api.yaadigo.com";
const SECURE_BASE = `${BASE_URL}/secure/api/`;
const API_KEY = "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M";
const AFTER_REDIRECT = "/admin/tour-list";

/* ---------- Defaults ---------- */
const defaultCostingPackage = {
  title: "",
  description: "",
  base_price: "",
  discount: "",
  final_price: "",
  booking_amount: "",
  gst_percentage: "",
};

const defaultFixedDepartureSlot = {
  from_date: "",
  to_date: "",
  available_slots: "",
  costingPackages: [{ ...defaultCostingPackage }],
};

/* ---------- Reusable Confirm Modal ---------- */
function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn-primary" onClick={onConfirm}>Continue</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function TourCreation() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Steps and progress
  const steps = useMemo(
    () => [
      { id: "basic", label: "Basic Info", icon: Info },
      { id: "itinerary", label: "Itinerary", icon: Map },
      { id: "media", label: "Media", icon: ImageIcon },
      { id: "pricing", label: "Pricing", icon: DollarSign },
      { id: "details", label: "Details", icon: FileText },
      { id: "policies", label: "Policies", icon: Shield },
    ],
    []
  );

  // state
  const [activeStep, setActiveStep] = useState("basic");
  const [openDay, setOpenDay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // lists from API
  const [activityList, setActivityList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [destinationList, setDestinationList] = useState([]);

  // details
  const [faqs, setFaqs] = useState([]);
  const [faqInput, setFaqInput] = useState({ question: "", answer: "" });
  const [highlightsText, setHighlightsText] = useState("");
  const [inclusionsText, setInclusionsText] = useState("");
  const [exclusionsText, setExclusionsText] = useState("");

  // Pricing
  const [fixedPackage, setFixedPackage] = useState([{ ...defaultFixedDepartureSlot }]);
  const [selectedPricing, setSelectedPricing] = useState("custom");

  // Form
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    overview: "",
    destination_id: "",
    destination_type: "",
    category_id: [],
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
    pricing_model: "custom",
    pricing: {
      customized: {
        pricing_type: "",
        base_price: "",
        discount: "",
        final_price: "",
        gst_percentage: "",
      },
    },
    terms: "",
    privacy_policy: "",
    payment_terms: "",
    custom_policies: [],
  });

  const currentIndex = steps.findIndex((s) => s.id === activeStep);
  const progressPercent = ((currentIndex + 1) / steps.length) * 100 + "%";

  /* ---------- Utilities ---------- */
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // slug generation from title if blank or new
      if (field === "title") {
        updated.slug = (!id || !prev.slug) ? generateSlug(value) : prev.slug;
      }

      // days -> auto-generate itinerary days
      if (field === "days") {
        const num = parseInt(value, 10);
        if (!isNaN(num) && num > 0) {
          const daysArr = Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            day_number: i + 1,
            title: `Day ${i + 1}: ${i === 0 ? "Arrival" : "Activity"}`,
            description: "",
            activities: [],
            hotel_name: "",
            meal_plan: [],
          }));
          updated.itineraryDays = daysArr;
          updated.nights = Math.max(0, num - 1).toString();
        } else {
          updated.itineraryDays = [];
          updated.nights = "";
        }
      }

      return updated;
    });
  };

  const handleCategoryMultiSelect = (categoryId, isChecked) => {
    setFormData((prev) => {
      const currentCategories = prev.category_id;
      const cid = String(categoryId);
      if (isChecked) {
        if (!currentCategories.includes(cid)) {
          return { ...prev, category_id: [...currentCategories, cid] };
        }
      } else {
        return { ...prev, category_id: currentCategories.filter((c) => c !== cid) };
      }
      return prev;
    });
  };

  const handleArrayChange = (dayId, field, value, isChecked) => {
    setFormData((prev) => ({
      ...prev,
      itineraryDays: prev.itineraryDays.map((d) =>
        d.id === dayId
          ? {
              ...d,
              [field]: isChecked ? [...d[field], value] : d[field].filter((a) => a !== value),
            }
          : d
      ),
    }));
  };

  const toggleDay = (id) => setOpenDay(openDay === id ? null : id);

  const addNewDay = () => {
    setFormData((prev) => {
      const newId = prev.itineraryDays.length + 1;
      return {
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
      };
    });
  };

  const deleteDay = (dayId) => {
    setFormData((prev) => ({
      ...prev,
      itineraryDays: prev.itineraryDays.filter((d) => d.id !== dayId).map((d, idx) => ({
        ...d,
        id: idx + 1,
        day_number: idx + 1,
        title: `Day ${idx + 1}: ${d.title.split(": ")[1] || "Activity"}`,
      })),
    }));
    setOpenDay(null);
  };

  /* ---------- Media Handlers ---------- */
  const handleMediaUpload = async (e, isMultiple) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const okTypes = ["jpeg", "png", "jpg", "webp"];
    for (const f of files) {
      const ext = f.name.split(".").pop().toLowerCase();
      if (!okTypes.includes(ext)) {
        toast.error(`Unsupported file type: ${f.name}`);
        return;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`File too large (>5MB): ${f.name}`);
        return;
      }
    }

    const fd = new FormData();
    files.forEach((f) => fd.append(isMultiple ? "gallery_images" : "image", f));
    fd.append("storage", "local");

    const endpoint = isMultiple ? `${BASE_URL}/multiple` : `${BASE_URL}/upload`;
    try {
      const res = await axios.post(endpoint, fd);
      if (res?.data?.message === "Upload successful" || res?.data?.message === "Files uploaded") {
        if (isMultiple) {
          const uploaded = Array.isArray(res.data.files) ? res.data.files.flat() : [res.data.files];
          setFormData((prev) => ({ ...prev, gallery_images: [...(prev.gallery_images || []), ...uploaded] }));
          toast.success(`${uploaded.length} image(s) uploaded to gallery.`);
        } else {
          setFormData((prev) => ({ ...prev, hero_image: res.data.url }));
          toast.success("Hero image uploaded.");
        }
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload error.");
    }
  };

  const removeHeroImage = () => setFormData((prev) => ({ ...prev, hero_image: null }));
  const removeGalleryImage = (index) => setFormData((prev) => ({ ...prev, gallery_images: prev.gallery_images.filter((_, i) => i !== index) }));

  /* ---------- Fixed Departure / Costing Handlers ---------- */
  const addFixedPackage = () => {
    const newSlot = {
      ...defaultFixedDepartureSlot,
      costingPackages: fixedPackage[0]?.costingPackages.map((pkg) => ({ ...pkg })) || [{ ...defaultCostingPackage }],
    };
    setFixedPackage((p) => [...p, newSlot]);
  };

  const deleteFixedPackage = (indexToRemove) => {
    if (fixedPackage.length === 1) {
      setFixedPackage([{ ...defaultFixedDepartureSlot }]);
      return;
    }
    setFixedPackage((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const addCostingPackage = () => {
    setFixedPackage((prev) => {
      const updated = [...prev];
      for (let i = 0; i < updated.length; i++) {
        updated[i].costingPackages.push({ ...defaultCostingPackage });
      }
      return updated;
    });
  };

  const deleteCostingPackage = (pkgIndex) => {
    setFixedPackage((prev) => {
      const updated = [...prev];
      if (updated[0].costingPackages.length === 1) {
        for (let i = 0; i < updated.length; i++) {
          updated[i].costingPackages = [{ ...defaultCostingPackage }];
        }
        return updated;
      }
      for (let i = 0; i < updated.length; i++) {
        updated[i].costingPackages = updated[i].costingPackages.filter((_, idx) => idx !== pkgIndex);
      }
      return updated;
    });
  };

  const updateFixedPackage = (slotIndex, key, value, packageIndex = null) => {
    setFixedPackage((prev) => {
      const updated = [...prev];
      if (packageIndex === null) {
        updated[slotIndex][key] = value;
      } else {
        for (let i = 0; i < updated.length; i++) {
          if (key !== "final_price") updated[i].costingPackages[packageIndex][key] = value;
          const pkg = updated[i].costingPackages[packageIndex];
          const basePrice = parseFloat(pkg.base_price) || 0;
          const discount = parseFloat(pkg.discount) || 0;
          const gst = parseFloat(pkg.gst_percentage) || 0;
          const discounted = Math.max(basePrice - discount, 0);
          const finalPrice = discounted + (discounted * gst) / 100;
          pkg.final_price = isNaN(finalPrice) ? "" : finalPrice.toFixed(2);
        }
      }
      return updated;
    });
  };

  const handleCustomPricingChange = (field, value) => {
    setFormData((prev) => {
      const customized = { ...prev.pricing.customized, [field]: value };
      const base = parseFloat(customized.base_price) || 0;
      const disc = parseFloat(customized.discount) || 0;
      const gst = parseFloat(customized.gst_percentage) || 0;
      const discounted = Math.max(base - disc, 0);
      const final = discounted + (discounted * gst) / 100;
      customized.final_price = isNaN(final) || !isFinite(final) ? "" : final.toFixed(2);
      return { ...prev, pricing: { ...prev.pricing, customized } };
    });
  };

  /* ---------- API Fetchers ---------- */
  const fetchList = async (endpoint, setter) => {
    try {
      const res = await axios.get(`${SECURE_BASE}${endpoint}/`, {
        headers: { "x-api-key": API_KEY },
      });
      if (res?.data?.success) {
        if (endpoint === "activities") setter(Array.isArray(res.data.data) ? res.data.data.map((a) => a.name) : []);
        else setter(res.data.data || []);
      }
    } catch (err) {
      console.error(`Failed to fetch ${endpoint}:`, err);
    }
  };

  useEffect(() => {
    fetchList("categories", setCategoryList);
    fetchList("destinations", setDestinationList);
    fetchList("activities", setActivityList);

    if (!id && !formData.pricing_model) {
      setFormData((prev) => ({ ...prev, pricing_model: "custom" }));
    }

    if (id) getSpecificTrip(id);
    // eslint-disable-next-line
  }, [id]);

  /* ---------- Load trip for edit ---------- */
  const getSpecificTrip = async (tripId) => {
    try {
      const res = await axios.get(`${SECURE_BASE}trips/${tripId}`, {
        headers: { "x-api-key": API_KEY },
      });
      if (res?.data?.success === true) {
        const tripData = res.data.data;
        const convertToLineBreaks = (text) => (text ? text.split("; ").join("\n") : "");
        setHighlightsText(convertToLineBreaks(tripData.highlights));
        setInclusionsText(convertToLineBreaks(tripData.inclusions));
        setExclusionsText(convertToLineBreaks(tripData.exclusions));

        const itineraryDays = tripData.itinerary?.map((day, index) => ({
          id: index + 1,
          day_number: day.day_number,
          title: day.title,
          description: day.description,
          activities: day.activities || [],
          hotel_name: day.hotel_name,
          meal_plan: day.meal_plan || [],
        })) || [];

        const categoryId = tripData.category_id
          ? Array.isArray(tripData.category_id) ? tripData.category_id.map(String) : [String(tripData.category_id)]
          : [];

        setFormData((prev) => ({
          ...prev,
          title: tripData.title || "",
          slug: tripData.slug || "",
          overview: tripData.overview || "",
          destination_id: tripData.destination_id || "",
          destination_type: tripData.destination_type || "",
          category_id: categoryId,
          hotel_category: tripData.hoteL_category?.toString() || tripData.hotel_category?.toString() || "",
          pickup_location: tripData.pickup_location || "",
          drop_location: tripData.drop_location || "",
          days: tripData.days || "",
          nights: tripData.nights || "",
          hero_image: tripData.hero_image || null,
          gallery_images: tripData.gallery_images || [],
          terms: tripData.terms || "",
          privacy_policy: tripData.privacy_policy || "",
          payment_terms: tripData.payment_terms || "",
          pricing_model: tripData.pricing?.pricing_model === "fixed_departure" ? "fixed" : "custom",
          itineraryDays,
          pricing: {
            customized: {
              pricing_type: tripData.pricing?.customized?.pricing_type || "",
              base_price: tripData.pricing?.customized?.base_price || "",
              discount: tripData.pricing?.customized?.discount || "",
              final_price: tripData.pricing?.customized?.final_price || "",
              gst_percentage: tripData.pricing?.customized?.gst_percentage || "",
            }
          }
        }));

        setFaqs(tripData.faqs || []);
        setSelectedPricing(tripData.pricing?.pricing_model === "fixed_departure" ? "fixed" : "custom");

        if (tripData.pricing?.fixed_departure) {
          setFixedPackage(tripData.pricing.fixed_departure.map((slot) => ({
            from_date: slot.from_date?.split("T")[0] || "",
            to_date: slot.to_date?.split("T")[0] || "",
            available_slots: slot.available_slots || "",
            costingPackages: Array.isArray(slot.costingPackages) && slot.costingPackages.length > 0 ?
              slot.costingPackages.map((pkg) => ({
                title: pkg.title || "",
                description: pkg.description || "",
                base_price: pkg.base_price || "",
                discount: pkg.discount || "",
                final_price: pkg.final_price || "",
                booking_amount: pkg.booking_amount || "",
                gst_percentage: pkg.gst_percentage || "",
              })) : [{ ...defaultCostingPackage }]
          })));
        }
      } else {
        toast.error("Failed to load trip data");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Failed to load trip data");
    }
  };

  /* ---------- Submission ---------- */
  const formatDetailString = (text) =>
    text.split("\n").map((item) => item.trim()).filter(Boolean).join("; ");

  const prepareSubmissionData = () => ({
    title: formData.title,
    overview: formData.overview,
    destination_id: formData.destination_id ? parseInt(formData.destination_id, 10) : null,
    destination_type: formData.destination_type,
    category_id: formData.category_id,
    themes: [],
    hotel_category: parseInt(formData.hotel_category, 10) || 0,
    pickup_location: formData.pickup_location,
    drop_location: formData.drop_location,
    days: parseInt(formData.days, 10) || 0,
    nights: parseInt(formData.nights, 10) || 0,
    meta_tags: `${formData.title}`,
    slug: formData.slug || generateSlug(formData.title || ""),
    pricing_model: formData.pricing_model,
    highlights: formatDetailString(highlightsText),
    inclusions: formatDetailString(inclusionsText),
    exclusions: formatDetailString(exclusionsText),
    faqs,
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
        fixed_departure: fixedPackage
          .filter(slot => slot.from_date || slot.to_date || slot.costingPackages.some(p => p.base_price))
          .map((slot) => ({
            from_date: slot.from_date ? `${slot.from_date}T00:00:00` : null,
            to_date: slot.to_date ? `${slot.to_date}T00:00:00` : null,
            available_slots: slot.available_slots ? parseInt(slot.available_slots, 10) : 0,
            costingPackages: slot.costingPackages
              .filter(pkg => pkg.base_price)
              .map(pkg => ({
                title: pkg.title || "",
                description: pkg.description || "",
                base_price: pkg.base_price ? parseFloat(pkg.base_price) : 0,
                discount: pkg.discount ? parseFloat(pkg.discount) : 0,
                final_price: pkg.final_price ? parseFloat(pkg.final_price) : 0,
                booking_amount: pkg.booking_amount ? parseFloat(pkg.booking_amount) : 0,
                gst_percentage: pkg.gst_percentage ? parseFloat(pkg.gst_percentage) : 0,
              })),
          }))
      }),
      ...(formData.pricing_model === "custom" && {
        customized: {
          pricing_type: formData.pricing.customized.pricing_type,
          base_price: parseFloat(formData.pricing.customized.base_price) || 0,
          discount: parseFloat(formData.pricing.customized.discount) || 0,
          final_price: parseFloat(formData.pricing.customized.final_price) || 0,
          gst_percentage: parseFloat(formData.pricing.customized.gst_percentage) || 0,
        }
      })
    },
    policies: [
      ...(formData.terms ? [{ title: "Terms and Conditions", content: formData.terms }] : []),
      ...(formData.privacy_policy ? [{ title: "Cancellation Policy", content: formData.privacy_policy }] : []),
      ...(formData.payment_terms ? [{ title: "Payment Terms", content: formData.payment_terms }] : []),
      ...formData.custom_policies,
    ],
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const submissionData = prepareSubmissionData();
      const res = await axios.post(`${SECURE_BASE}trips/`, submissionData, {
        headers: { "x-api-key": API_KEY },
      });
      if (res?.data?.success) {
        toast.success("Trip created successfully!");
        navigate(AFTER_REDIRECT);
      } else toast.error(res?.data?.message || "Failed to create trip");
    } catch (error) {
      console.error("Create trip error:", error?.response?.data || error.message);
      toast.error("Failed to create trip");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const submissionData = prepareSubmissionData();
      const res = await axios.put(`${SECURE_BASE}trips/${id}`, submissionData, {
        headers: { "x-api-key": API_KEY },
      });
      if (res?.data?.success) {
        toast.success("Trip updated successfully!");
        navigate(AFTER_REDIRECT);
      } else toast.error(res?.data?.message || "Failed to update trip");
    } catch (error) {
      console.error("Update trip error:", error?.response?.data || error.message);
      toast.error("Failed to update trip");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- Search-style select components ---------- */

  // Confirm modal state for create-redirects
  const [createConfirm, setCreateConfirm] = useState({ open: false, url: "", message: "" });

  const openCreateModal = (type) => {
    const mapping = {
      destination: "/admin/destination-create",
      category: "/admin/category-create",
      activity: "/admin/activity",
    };
    setCreateConfirm({ open: true, url: mapping[type], message: `No ${type} found. Go to create page?` });
  };

  const handleCreateConfirm = () => {
    setCreateConfirm({ open: false, url: "", message: "" });
    // navigate to relative path (same SPA or external)
    try {
      navigate(createConfirm.url);
    } catch (err) {
      window.location.href = createConfirm.url;
    }
  };

  const DestinationSelect = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const filtered = destinationList.filter((d) => d.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const selectedDest = destinationList.find((d) => String(d.id) === formData.destination_id);
    const displayValue = searchTerm || (selectedDest ? selectedDest.title : "");

    return (
      <div className="mb-3 custom-select-wrapper">
        <label className="form-label">Destination *</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search destinations..."
          value={displayValue}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm !== "" && (
          <div className="search-suggestion-box">
            {filtered.length > 0 ? (
              filtered.map((d) => (
                <div key={d.id} className="search-option" onClick={() => { handleInputChange("destination_id", String(d.id)); setSearchTerm(""); }}>
                  <span style={{ textAlign: "left", flex: 1 }}>{d.title}</span>
                </div>
              ))
            ) : (
              <div className="search-option no-result" onClick={() => openCreateModal("destination")}>No destinations found. <b>Create one?</b></div>
            )}
          </div>
        )}
      </div>
    );
  };

  const CategoryMultiSelect = () => {
    const [search, setSearch] = useState("");
    const filtered = categoryList.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    const selectedNames = formData.category_id.map((id) => categoryList.find((c) => String(c.id) === id)?.name).filter(Boolean);

    return (
      <div className="mb-3 custom-select-wrapper">
        <label className="form-label">Categories *</label>
        <div className="mb-2">
          {selectedNames.length === 0 ? <small className="text-muted">No categories selected</small> :
            selectedNames.map((name) => (
              <span key={name} className="activity-chip me-1">
                {name}
                <X size={12} onClick={() => { const catId = categoryList.find((c) => c.name === name)?.id; if (catId) handleCategoryMultiSelect(catId, false); }} />
              </span>
            ))
          }
        </div>
        <input type="text" className="form-control" placeholder="Search or add categories..." value={search} onChange={(e) => setSearch(e.target.value)} />
        {search !== "" && (
          <div className="search-suggestion-box">
            {filtered.length > 0 ? filtered.map((cat) => (
              <div key={cat.id} className="search-option" onClick={() => { handleCategoryMultiSelect(cat.id, !formData.category_id.includes(String(cat.id))); setSearch(""); }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="checkbox" checked={formData.category_id.includes(String(cat.id))} readOnly />
                  <span style={{ textAlign: "left" }}>{cat.name}</span>
                </div>
              </div>
            )) : <div className="search-option no-result" onClick={() => openCreateModal("category")}>No categories found. <b>Create one?</b></div>}
          </div>
        )}
      </div>
    );
  };

  const ActivityMultiSelect = ({ dayId, currentActivities }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filtered = activityList.filter((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="form-group mb-3 custom-select-wrapper activity-multi-select-group">
        <label className="form-label d-block">Select Activities</label>

        <div className="mb-2">
          {currentActivities.length === 0 ? <small className="text-muted">No activities added</small> :
            currentActivities.map((activity) => (
              <span key={activity} className="activity-chip me-1">
                <span style={{ textAlign: "left", marginRight: 6 }}>{activity}</span>
                <X size={12} onClick={() => handleArrayChange(dayId, "activities", activity, false)} />
              </span>
            ))
          }
        </div>

        <input type="text" className="form-control" placeholder="Search activity..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        {searchTerm !== "" && (
          <div className="search-suggestion-box">
            {filtered.length > 0 ? filtered.map((a) => (
              <div key={a} className="search-option" onClick={() => { handleArrayChange(dayId, "activities", a, true); setSearchTerm(""); }}>
                <span style={{ textAlign: "left" }}>{a}</span>
              </div>
            )) : <div className="search-option no-result" onClick={() => openCreateModal("activity")}>No activity found. <b>Create one?</b></div>}
          </div>
        )}
      </div>
    );
  };

  /* ---------- Render steps ---------- */

  const renderBasic = () => (
    <div>
      <h3 className="mb-4 fw-bold fs-5">Trip Details</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Trip Title *</label>
            <input type="text" className="form-control" placeholder="Enter trip title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} maxLength={100} />
            <small className="text-muted">{(formData.title || "").length}/100 characters</small>
          </div>

          <div className="mb-3">
            <label className="form-label">URL Slug *</label>
            <input type="text" className="form-control" placeholder="enter-url-slug" value={formData.slug} onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))} />
            <small className="text-muted">Only alphanumeric, hyphens and underscores. Auto-generated from title on new trips.</small>
          </div>

          <div className="mb-3">
            <label className="form-label">Trip Overview *</label>
            <textarea rows={3} className="form-control" placeholder="Describe the trip overview..." value={formData.overview} onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))} />
          </div>
        </div>

        <div className="col-md-6">
          <DestinationSelect />
          <CategoryMultiSelect />

          <div className="mb-3">
            <label className="form-label d-block">Destination Type *</label>
            <div className="form-check form-check-inline">
              <input type="radio" name="destType" className="form-check-input" checked={formData.destination_type === "Domestic"} onChange={() => setFormData(prev => ({ ...prev, destination_type: "Domestic" }))} />
              <label className="form-check-label">Domestic</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" name="destType" className="form-check-input" checked={formData.destination_type === "International"} onChange={() => setFormData(prev => ({ ...prev, destination_type: "International" }))} />
              <label className="form-check-label">International</label>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-4 fw-bold fs-5 mt-4">Location & Duration</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Pickup city *</label>
            <input type="text" className="form-control" placeholder="Enter pickup city" value={formData.pickup_location} onChange={(e) => setFormData(prev => ({ ...prev, pickup_location: e.target.value }))} />
          </div>

          <div className="mb-3">
            <label className="form-label">Drop city *</label>
            <input type="text" className="form-control" placeholder="Enter drop city" value={formData.drop_location} onChange={(e) => setFormData(prev => ({ ...prev, drop_location: e.target.value }))} />
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Days *</label>
              <input type="number" className="form-control" placeholder="Days" value={formData.days} onChange={(e) => handleInputChange("days", e.target.value)} />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Nights</label>
              <input type="number" className="form-control" placeholder="Nights" value={formData.nights} readOnly />
            </div>
          </div>
          <small className="text-muted">Nights auto-set to Days - 1</small>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label d-block">Hotel Category *</label>
            {["Camping & Cottages", "Home Stays", "3 Star Hotel", "4 Star Hotel", "5 Star Hotel"].map((cat, idx) => (
              <div className="form-check" key={cat}>
                <input type="radio" name="hotelCategory" className="form-check-input" checked={formData.hotel_category === (idx + 1).toString()} onChange={() => setFormData(prev => ({ ...prev, hotel_category: (idx + 1).toString() }))} />
                <label className="form-check-label">{cat}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderItinerary = () => (
    <div>
      <h3 className="mb-3 fw-bold">Trip Itinerary</h3>
      {formData.itineraryDays.length === 0 && (
        <div className="mb-3">
          <small className="text-muted">No days created. Enter Days in Basic Info to auto-generate itinerary days.</small>
          <div className="mt-2">
            <button className="add-day-btn" onClick={addNewDay}><Plus size={14} /> Add day</button>
          </div>
        </div>
      )}
      {formData.itineraryDays.map((day) => (
        <div key={day.id} style={{ marginBottom: 12 }}>
          <div className="itinerary-header" onClick={() => toggleDay(day.id)}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <strong style={{ fontSize: 15 }}>{day.title}</strong>
              <small className="text-muted">Day {day.day_number}</small>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button className="delete-day-btn" onClick={(e) => { e.stopPropagation(); deleteDay(day.id); }}>
                <Trash2 size={14} /> Delete
              </button>
              {openDay === day.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>

          {openDay === day.id && (
            <div className="itinerary-body">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label>Day Title *</label>
                  <input type="text" className="form-control" value={day.title} onChange={(e) => setFormData(prev => ({ ...prev, itineraryDays: prev.itineraryDays.map(d => d.id === day.id ? { ...d, title: e.target.value } : d) }))} />
                </div>
                <div className="col-md-6 mb-2">
                  <ActivityMultiSelect dayId={day.id} currentActivities={day.activities} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-2">
                  <label>Description</label>
                  <textarea className="form-control" rows={3} value={day.description} onChange={(e) => setFormData(prev => ({ ...prev, itineraryDays: prev.itineraryDays.map(d => d.id === day.id ? { ...d, description: e.target.value } : d) }))} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-2">
                  <label>Hotel Name</label>
                  <input type="text" className="form-control" value={day.hotel_name} onChange={(e) => setFormData(prev => ({ ...prev, itineraryDays: prev.itineraryDays.map(d => d.id === day.id ? { ...d, hotel_name: e.target.value } : d) }))} />
                </div>
                <div className="col-md-6 mb-2">
                  <label>Meal Plan</label>
                  <div className="meal-options">
                    {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                      <label key={meal} className="meal-checkbox">
                        <input type="checkbox" className="form-check-input" checked={day.meal_plan.includes(meal)} onChange={(e) => handleArrayChange(day.id, "meal_plan", meal, e.target.checked)} />
                        {meal}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderMedia = () => (
    <div>
      <h3 className="mb-3 fw-bold">Media Assets</h3>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* Hero */}
        <div className="media-section" style={{ minWidth: 360 }}>
          <div className="section-title">📷 Hero Image / Thumbnail <span className="required">*</span></div>
          <div className="upload-area" onClick={() => document.getElementById("heroImage")?.click()}>
            <div className="upload-icon">📷</div>
            <div className="upload-text">
              <h4>Upload Hero Image</h4>
              <p>Click to browse or drag-and-drop</p>
              {formData.hero_image && <p>Selected: {formData.hero_image.substring(formData.hero_image.lastIndexOf("/") + 1)}</p>}
            </div>
            <input type="file" id="heroImage" accept=".png,.jpeg,.jpg,.webp" style={{ display: "none" }} onChange={(e) => handleMediaUpload(e, false)} />
          </div>

          {formData.hero_image && (
            <div className="upload-image-div mt-2" style={{ position: "relative" }}>
              <img src={formData.hero_image} alt="Hero" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 8 }} />
              <button className="media-delete-btn" onClick={removeHeroImage} title="Remove">×</button>
            </div>
          )}

          <div className="file-restrictions mt-2">
            • Use JPG, PNG or WebP. Recommended 1200x800. Max 5MB.
          </div>
        </div>

        {/* Gallery */}
        <div className="media-section" style={{ minWidth: 360 }}>
          <div className="section-title">🖼️ Image Gallery <span className="required">*</span></div>
          <div className="upload-area" onClick={() => document.getElementById("galleryImages")?.click()}>
            <div className="upload-icon">🖼️</div>
            <div className="upload-text">
              <h4>Image Gallery</h4>
              <p>Click to select multiple images</p>
            </div>
            <input type="file" id="galleryImages" accept=".png,.jpeg,.jpg,.webp" multiple style={{ display: "none" }} onChange={(e) => handleMediaUpload(e, true)} />
          </div>

          {Array.isArray(formData.gallery_images) && formData.gallery_images.length > 0 && (
            <div className="gallery-preview-container mt-2">
              {formData.gallery_images.map((image, index) => (
                <div className="gallery-image-wrapper" key={`${image}-${index}`} style={{ position: "relative" }}>
                  <img src={encodeURI(image)} alt={`Gallery-${index}`} style={{ width: 120, height: 84, objectFit: "cover", borderRadius: 6 }} />
                  <button className="media-delete-btn" onClick={() => removeGalleryImage(index)} title="Remove">×</button>
                </div>
              ))}
            </div>
          )}

          <div className="file-restrictions mt-2">
            • Upload 5-10 high-quality images. Recommended 1200x800 minimum.
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricing = () => {
    const masterCostingPackages = fixedPackage[0]?.costingPackages || [];
    return (
      <div>
        <h3 className="mb-3 fw-bold">Pricing</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className={`pricing-model-card p-3 ${selectedPricing === "fixed" ? "active" : ""}`} onClick={() => { setSelectedPricing("fixed"); setFormData(prev => ({ ...prev, pricing_model: "fixed" })); }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="radio" checked={selectedPricing === "fixed"} readOnly />
                <div>
                  <div style={{ fontWeight: 600 }}>Fixed Departure</div>
                  <div className="text-muted small">Set specific dates with group bookings</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className={`pricing-model-card p-3 ${selectedPricing === "custom" ? "active" : ""}`} onClick={() => { setSelectedPricing("custom"); setFormData(prev => ({ ...prev, pricing_model: "custom" })); }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="radio" checked={selectedPricing === "custom"} readOnly />
                <div>
                  <div style={{ fontWeight: 600 }}>Customized Trip</div>
                  <div className="text-muted small">Flexible dates based on customer preference</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedPricing === "fixed" && (
          <div className="fixed-departure-container mt-3 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Departure Slots</h5>
              <button className="btn-add-slot" onClick={addFixedPackage}><Plus size={12} /> Add Slot</button>
            </div>

            {fixedPackage.map((slot, slotIndex) => (
              <div key={`slot-${slotIndex}`} className="slot-container mb-3 p-3">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div className="slot-dot" />
                    <strong>Slot {slotIndex + 1}</strong>
                  </div>
                  {fixedPackage.length > 1 && <button className="delete-day-btn" onClick={() => deleteFixedPackage(slotIndex)}><Trash2 size={14} /> Delete Slot</button>}
                </div>

                <div className="row">
                  <div className="col-md-4 mb-2">
                    <label>From Date *</label>
                    <input type="date" className="form-control" value={slot.from_date} onChange={(e) => updateFixedPackage(slotIndex, "from_date", e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-2">
                    <label>To Date *</label>
                    <input type="date" className="form-control" value={slot.to_date} onChange={(e) => updateFixedPackage(slotIndex, "to_date", e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-2">
                    <label>Available Slots *</label>
                    <input type="number" className="form-control" value={slot.available_slots} onChange={(e) => updateFixedPackage(slotIndex, "available_slots", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}

            <div className="costing-packages-section p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6>Costing Packages</h6>
                <button className="btn-add-package" onClick={addCostingPackage}><Plus size={12} /> Add Package</button>
              </div>

              {masterCostingPackages.map((pkg, pkgIndex) => (
                <div className="package-card mb-2 p-3" key={`pkg-${pkgIndex}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <strong>Package {pkgIndex + 1}</strong>
                    <div>
                      {(pkgIndex !== 0 || masterCostingPackages.length > 1) && <button className="delete-day-btn" onClick={() => deleteCostingPackage(pkgIndex)}><Trash2 size={12} /> Delete</button>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label>Package Title *</label>
                      <input type="text" className="form-control" value={pkg.title} onChange={(e) => updateFixedPackage(0, "title", e.target.value, pkgIndex)} />
                    </div>
                    <div className="col-md-3 mb-2">
                      <label>Base Price (₹) *</label>
                      <input type="number" className="form-control" value={pkg.base_price} onChange={(e) => updateFixedPackage(0, "base_price", e.target.value, pkgIndex)} />
                    </div>
                    <div className="col-md-3 mb-2">
                      <label>Discount (₹)</label>
                      <input type="number" className="form-control" value={pkg.discount} onChange={(e) => updateFixedPackage(0, "discount", e.target.value, pkgIndex)} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <label>Booking Amount (₹)</label>
                      <input type="number" className="form-control" value={pkg.booking_amount} onChange={(e) => updateFixedPackage(0, "booking_amount", e.target.value, pkgIndex)} />
                    </div>
                    <div className="col-md-4 mb-2">
                      <label>GST (%)</label>
                      <input type="number" className="form-control" value={pkg.gst_percentage} onChange={(e) => updateFixedPackage(0, "gst_percentage", e.target.value, pkgIndex)} />
                    </div>
                    <div className="col-md-4 mb-2">
                      <label>Final Price (₹)</label>
                      <input type="number" className="form-control" value={pkg.final_price} readOnly />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedPricing === "custom" && (
          <div className="custom-pricing-container mt-3 p-3">
            <h5 className="mb-2">Customized Pricing</h5>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label>Pricing Type *</label>
                <div>
                  <label style={{ marginRight: 10 }}>
                    <input type="radio" name="pricingType" checked={formData.pricing.customized.pricing_type === "Price Per Person"} onChange={() => handleCustomPricingChange("pricing_type", "Price Per Person")} /> Price Per Person
                  </label>
                  <label>
                    <input type="radio" name="pricingType" checked={formData.pricing.customized.pricing_type === "Price Per Package"} onChange={() => handleCustomPricingChange("pricing_type", "Price Per Package")} /> Price Per Package
                  </label>
                </div>
              </div>

              <div className="col-md-4 mb-2">
                <label>Base Price (₹)</label>
                <input type="number" className="form-control" value={formData.pricing.customized.base_price} onChange={(e) => handleCustomPricingChange("base_price", e.target.value)} />
              </div>
              <div className="col-md-4 mb-2">
                <label>Discount (₹)</label>
                <input type="number" className="form-control" value={formData.pricing.customized.discount} onChange={(e) => handleCustomPricingChange("discount", e.target.value)} />
              </div>
              <div className="col-md-4 mb-2">
                <label>GST (%)</label>
                <input type="number" className="form-control" value={formData.pricing.customized.gst_percentage || ""} onChange={(e) => handleCustomPricingChange("gst_percentage", e.target.value)} />
              </div>

              <div className="col-md-4 mb-2">
                <label>Final Price (₹)</label>
                <input type="number" className="form-control" value={formData.pricing.customized.final_price} readOnly />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDetails = () => (
    <div>
      <h3 className="mb-3 fw-bold">Details</h3>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="detail-card">
            <h4>Trip Highlight</h4>
            <label>Enter highlights (one per line)</label>
            <textarea className="form-control" rows={6} placeholder="E.g., Visit Taj Mahal" value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="detail-card">
            <h4>Inclusions</h4>
            <label>Enter inclusions (one per line)</label>
            <textarea className="form-control" rows={6} placeholder="E.g., 4 Nights Accommodation" value={inclusionsText} onChange={(e) => setInclusionsText(e.target.value)} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="detail-card">
            <h4>Exclusions</h4>
            <label>Enter exclusions (one per line)</label>
            <textarea className="form-control" rows={6} placeholder="E.g., Airfare/Visa charges" value={exclusionsText} onChange={(e) => setExclusionsText(e.target.value)} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="detail-card">
            <h4>FAQ (Optional)</h4>
            <label>Add FAQ</label>
            <div className="faq-input-group">
              <input className="form-control" placeholder="Question" value={faqInput.question} onChange={(e) => setFaqInput(prev => ({ ...prev, question: e.target.value }))} />
              <input className="form-control" placeholder="Answer" value={faqInput.answer} onChange={(e) => setFaqInput(prev => ({ ...prev, answer: e.target.value }))} />
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-primary" onClick={() => {
                  if (faqInput.question.trim() && faqInput.answer.trim()) {
                    setFaqs(prev => [...prev, faqInput]);
                    setFaqInput({ question: "", answer: "" });
                  } else toast.warn("Please fill question and answer.");
                }}><Plus size={12} /> Add FAQ</button>
              </div>

              <div className="faq-list mt-3">
                {faqs.map((f, idx) => (
                  <div key={idx} className="faq-item">
                    <div className="faq-content">
                      <strong>Q:</strong> {f.question}<br />
                      <strong>A:</strong> {f.answer}
                    </div>
                    <button className="delete-day-btn" onClick={() => setFaqs(prev => prev.filter((_, i) => i !== idx))}><Trash2 size={12} /> Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPolicies = () => (
    <div>
      <h3 className="mb-3 fw-bold">Policies</h3>
      <div className="form-container">
        <div className="form-group mb-3">
          <label>Terms and Conditions</label>
          <textarea rows={5} className="form-control" value={formData.terms} onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))} />
        </div>

        <div className="form-group mb-3">
          <label>Cancellation Policy</label>
          <textarea rows={5} className="form-control" value={formData.privacy_policy} onChange={(e) => setFormData(prev => ({ ...prev, privacy_policy: e.target.value }))} />
        </div>

        <div className="form-group mb-3">
          <label>Payment Terms</label>
          <textarea rows={5} className="form-control" value={formData.payment_terms} onChange={(e) => setFormData(prev => ({ ...prev, payment_terms: e.target.value }))} />
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case "basic": return renderBasic();
      case "itinerary": return renderItinerary();
      case "media": return renderMedia();
      case "pricing": return renderPricing();
      case "details": return renderDetails();
      case "policies": return renderPolicies();
      default: return <div>Step not found</div>;
    }
  };

  /* ---------- Create-modal handlers (centered) ---------- */
  const [createModal, setCreateModal] = useState({ open: false, url: "", text: "" });
  const openCreate = (url, text) => setCreateModal({ open: true, url, text });
  const cancelCreate = () => setCreateModal({ open: false, url: "", text: "" });
  const confirmCreate = () => {
    setCreateModal({ open: false, url: "", text: "" });
    navigate(createModal.url);
  };

  return (
    <div className="tour-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="d-flex justify-content-between tour-page-header align-items-center">
        <div>
          <h2>{id ? "Edit Tour" : "Add New Tour"}</h2>
          <p className="text-muted">Create a comprehensive travel package</p>
        </div>
        <div>
          <button className="admin-add-button" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar mb-3">
        <div className="progress-bar-fill" style={{ width: progressPercent }} />
      </div>

      {/* Stepper */}
      <div className="stepper mb-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const active = i <= currentIndex;
          return (
            <button key={s.id} onClick={() => setActiveStep(s.id)} className={`step-button ${active ? "step-active" : ""}`}>
              <div className={`step-circle ${active ? "step-active" : ""}`}><Icon size={16} /></div>
              <span className={`step-label ${active ? "fw-semibold" : ""}`}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="tour-creation-form-wrapper mb-3">
        <div className="form-container">
          {renderStepContent()}
        </div>
      </div>

      <div className="footer-actions">
        <span className="progress-text">{currentIndex + 1}/{steps.length} sections complete</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => setActiveStep(steps[Math.max(0, currentIndex - 1)].id)}>Previous</button>
          {id ? (
            <button className="btn-success" onClick={handleUpdate} disabled={isLoading}>{isLoading ? <CircularProgress size={18} /> : "Update Tour"}</button>
          ) : (
            <button className="btn-success" onClick={handleSubmit} disabled={isLoading}>{isLoading ? <CircularProgress size={18} /> : "Publish Tour"}</button>
          )}
          <button className="btn btn-secondary" onClick={() => setActiveStep(steps[Math.min(steps.length - 1, currentIndex + 1)].id)}>Next</button>
        </div>
      </div>

      {/* Create-confirm modal (uses relative admin paths) */}
      {createModal.open && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h4>Go to create page?</h4>
            <p>{createModal.text}</p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={cancelCreate}>Cancel</button>
              <button className="btn-primary" onClick={confirmCreate}>Go</button>
            </div>
          </div>
        </div>
      )}

      {/* Create confirm used by earlier openCreateModal (shared pattern) */}
      {createConfirm.open && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h4>Confirm Navigation</h4>
            <p>{createConfirm.message}</p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setCreateConfirm({ open: false, url: "", message: "" })}>Cancel</button>
              <button className="btn-primary" onClick={() => { setCreateConfirm({ open: false, url: "", message: "" }); navigate(createConfirm.url); }}>Yes, go</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
