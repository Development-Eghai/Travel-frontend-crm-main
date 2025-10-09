// src/components/path/to/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MemorizedSelector } from "../../../helpers/memorizedSelector";

const Header = () => {
  const { appConfigData } = MemorizedSelector();
  const no_fixed_header_for = [
    "/blogs-detail",
    "/contact-us",
    "/destination-list",
    "/Payments",
    "/privacy-policy",
    "/terms-and-conditions",
    "/tour-overview",
    "/trips-bookings",
  ];

  const [openDropdown, setOpenDropdown] = useState(null); // 'domestic' | 'international' | null
  const wrapperRef = useRef(null);
  const location = useLocation();

  // close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  // close when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleMouseEnter = (name) => {
    if (window.innerWidth >= 992) setOpenDropdown(name); // hover only on desktop
  };
  const handleMouseLeave = () => {
    if (window.innerWidth >= 992) setOpenDropdown(null);
  };

  return (
    <div className="overflow-hidden">
      <div
        className={`header-main ${
          !no_fixed_header_for?.includes(window.location.pathname)
            ? ""
            : "not-fixed-header"
        }`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container" ref={wrapperRef}>
            {/* Mobile toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Centered menu */}
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav align-items-center gap-3">

                {/* Domestic */}
                <li
                  className={`nav-item dropdown ${openDropdown === "domestic" ? "show" : ""
                    }`}
                  onMouseEnter={() => handleMouseEnter("domestic")}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Use button so Link anchors don't conflict with toggle behavior */}
                  <button
                    type="button"
                    className="nav-link dropdown-toggle custom-dropdown"
                    onClick={() => toggleDropdown("domestic")}
                    aria-expanded={openDropdown === "domestic"}
                  >
                    Domestic Trips <span className="arrow" aria-hidden>{openDropdown === "domestic" ? "▲" : "▼"}</span>
                  </button>

                  <ul className={`dropdown-menu ${openDropdown === "domestic" ? "show" : ""}`}>
                    <li>
                      <Link to="/domestic/uttarakhand" className="dropdown-item">Uttarakhand</Link>
                    </li>
                    <li>
                      <Link to="/domestic/himachal" className="dropdown-item">Himachal</Link>
                    </li>
                    <li>
                      <Link to="/domestic/goa" className="dropdown-item">Goa</Link>
                    </li>
                  </ul>
                </li>

                {/* International */}
                <li
                  className={`nav-item dropdown ${openDropdown === "international" ? "show" : ""
                    }`}
                  onMouseEnter={() => handleMouseEnter("international")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className="nav-link dropdown-toggle custom-dropdown"
                    onClick={() => toggleDropdown("international")}
                    aria-expanded={openDropdown === "international"}
                  >
                    International Trips <span className="arrow" aria-hidden>{openDropdown === "international" ? "▲" : "▼"}</span>
                  </button>

                  <ul className={`dropdown-menu ${openDropdown === "international" ? "show" : ""}`}>
                    <li>
                      <Link to="/international/europe" className="dropdown-item">Europe</Link>
                    </li>
                    <li>
                      <Link to="/international/bali" className="dropdown-item">Bali</Link>
                    </li>
                    <li>
                      <Link to="/international/dubai" className="dropdown-item">Dubai</Link>
                    </li>
                  </ul>
                </li>

                {/* Plain links */}
                <li className="nav-item">
                  <Link to="/blogs" className="nav-link custom-link">Blogs</Link>
                </li>
                <li className="nav-item">
                  <Link to="/careers" className="nav-link custom-link">Careers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact-us" className="nav-link custom-link">Contact Us</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about-us" className="nav-link custom-link">About Us</Link>
                </li>
                    
                {/* Buttons */}
                {/* <li className="nav-item">
                  <Link to="/signup" className="btn-signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="btn-login">Login</Link>
                </li> */}
                

              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
