import React from "react";
import { Link } from "react-router-dom";

import { FaSearch, FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";
const TopHeader = () => {
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
