import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";
import { APIBaseUrl } from "../common/api/api";
import { useDispatch } from "react-redux";
import { setAllDestination, setFeaturedTripSice } from "../store/slices/HomePageSlice";

const TopHeader = () => {

  const dispatch = useDispatch();
  

  const getAllTrips = async () => {
    try {
      const res = await APIBaseUrl.get("trips/", {
        headers: {
          "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
        },
      });
      if (res?.data?.success === true && res?.data?.error_code === 0) {
        dispatch(setFeaturedTripSice(res?.data?.data)); 
      }

    } catch (error) {
      console.error("Error fetching trips:", error?.response?.data || error.message);
      throw error;
    }
  };

  const getAllDestination = async () => {

    try {
        const res = await APIBaseUrl.get("destinations/", {
            headers: {
                "x-api-key": "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M",
            },
        });
        if (res?.data?.success === true) {

          dispatch(setAllDestination(res?.data?.data)); 
        }

    } catch (error) {
        console.error("Error fetching trips:", error?.response?.data || error.message);
        throw error;
    }

}

  useEffect(() => {
    getAllTrips()
    getAllDestination()
  }, [])


  return (
    <div className="d-none d-md-block border-bottom bg-white">
      <div className="container-fluid d-flex align-items-center justify-content-between py-2">
        {/* Logo */}
        <Link to="/">
          <img
            src="/logo192.png" // replace with your logo path
            alt="logo"
            style={{ height: "40px" }}
          />
        </Link>

        {/* Search with icon inside */}
        <button className="plan-trip-btn">
          Plan Your Trip

        </button>

        {/* Menu links */}
        <div className="d-flex align-items-center gap-1">
          <Link to="/special" className="nav-link">
            Christmas🎄New Year
          </Link>
          <Link to="/upcoming-trips" className="nav-link">
            Upcoming Trips✈️
          </Link>
          <Link to="/solo-tours" className="nav-link">
            Solo Trips🧳
          </Link>

          <Link to="/corporate-tours" className="nav-link">
            Corporate Tours🏖️
          </Link>



        </div>

        {/* Phone button */}
        <a
          href="tel:+919090403075"
          className="btn btn-dark rounded-pill "
        >
          <FaPhoneAlt className="me-1 ring-over" /> +91-9090403075
        </a>
      </div>
    </div>
  );
};

export default TopHeader;
