import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { APIBaseUrl } from "../common/api/api";
import { useDispatch } from "react-redux";
import { setAllDestination, setFeaturedTripSice } from "../store/slices/HomePageSlice";

const TopHeader = () => {
  const dispatch = useDispatch();

  const getAllTrips = async () => {
    try {
      const res = await APIBaseUrl.get("trips/", {
        headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
      });
      if (res?.data?.success === true && res?.data?.error_code === 0) {
        dispatch(setFeaturedTripSice(res?.data?.data));
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const getAllDestination = async () => {
    try {
      const res = await APIBaseUrl.get("destinations/", {
        headers: { "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M" },
      });
      if (res?.data?.success === true) {
        dispatch(setAllDestination(res?.data?.data));
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  useEffect(() => {
    getAllTrips();
    getAllDestination();
  }, []);

  return (
    <div className="d-none d-md-block border-bottom bg-white">
      <div className="container-fluid d-flex align-items-center justify-content-between py-2">

        {/* Left Section - Logo + Name */}
        <div className="d-flex align-items-center">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img
              src="dist/assets/logo-indian-mountain-rovers.png"
              alt="IndianMountainRovers-Logo"
              style={{ height: "60px" }}
            />
            <span
              className="ms-2 fw-bold"
              style={{ fontSize: "1.4rem", color: "#000" }}
            >
              Indian Mountain Rovers
            </span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-4">
          {/* Plan Your Trip button */}
          <button
            className="plan-trip-btn"
            data-bs-toggle="modal"
            data-bs-target="#travelFormModal"
          >
            PLAN YOUR TRIP
          </button>

          {/* Menu links */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/about-us" className="nav-link fw-semibold">
              About Us
            </Link>
            <Link to="/contact-us" className="nav-link fw-semibold">
              Contact Us
            </Link>
            <Link to="/blogs" className="nav-link fw-semibold">
              Blogs
            </Link>
          </div>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/919090403075"
            target="_blank"
            rel="noopener noreferrer"
            className="btn rounded-pill d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#25D366",
              borderColor: "#25D366",
              fontWeight: 600,
              color: "#fff",
              padding: "8px 16px",
            }}
          >
            <FaWhatsapp className="me-2" /> +91 9876543210
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
