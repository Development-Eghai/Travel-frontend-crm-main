// src/components/path/to/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MemorizedSelector } from "../../../helpers/memorizedSelector";
import ContactForm from "../../admin/TripManagement/ContactForm/ContactForm";

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

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
    if (window.innerWidth >= 992) setOpenDropdown(name);
  };
  const handleMouseLeave = () => {
    if (window.innerWidth >= 992) setOpenDropdown(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to force a page refresh
  const handleLinkClick = (url) => {
    window.location.href = url; // Force page refresh
  };

  return (
    <div className="overflow-hidden">
      <div
        className={`header-main ${!no_fixed_header_for?.includes(window.location.pathname)
          ? ""
          : "not-fixed-header"}`}
      >
        <nav className="navbar navbar-expand-lg" ref={wrapperRef}>
          <div className="container d-flex justify-content-between align-items-center">
            {/* Logo (only on mobile) */}
            <Link to="/" className="d-lg-none">
              <img
                src={appConfigData?.logo || "/logo-indian-mountain-rovers.png"}
                alt="Logo"
                style={{ height: "45px", width: "auto" }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div
              className="collapse navbar-collapse justify-content-center d-none d-lg-flex"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav align-items-center gap-3">
                {/* Domestic Dropdown */}
                <li
                  className={`nav-item dropdown ${openDropdown === "domestic" ? "show" : ""}`}
                  onMouseEnter={() => handleMouseEnter("domestic")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className="nav-link dropdown-toggle custom-dropdown"
                    onClick={() => toggleDropdown("domestic")}
                    aria-expanded={openDropdown === "domestic"}
                  >
                    Domestic Trips{" "}
                    <span className="arrow" aria-hidden>
                      {openDropdown === "domestic" ? "▲" : "▼"}
                    </span>
                  </button>

                  <ul
                    className={`dropdown-menu ${openDropdown === "domestic" ? "show" : ""}`}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/destination/kerala/27")}
                      >
                        Kerala
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/destination/himachal/18")}
                      >
                        Himachal
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/destination/kashmir/26")}
                      >
                        Kashmir
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/destination/spiti/30")}
                      >
                        Spiti Valley
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/destination/goa/28")}
                      >
                        Goa
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("#")}
                      >
                        Rajasthan
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("#")}
                      >
                        Gujarat
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("#")}
                      >
                        Orissa
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("#")}
                      >
                        Tamil Nadu
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("#")}
                      >
                        Karnataka
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("#")}
                      >
                        Andaman and Nicobar Islands
                      </button>
                    </li>
                  </ul>
                </li>

                {/* International Dropdown */}
                <li
                  className={`nav-item dropdown ${openDropdown === "international" ? "show" : ""}`}
                  onMouseEnter={() => handleMouseEnter("international")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className="nav-link dropdown-toggle custom-dropdown"
                    onClick={() => toggleDropdown("international")}
                    aria-expanded={openDropdown === "international"}
                  >
                    International Trips{" "}
                    <span className="arrow" aria-hidden>
                      {openDropdown === "international" ? "▲" : "▼"}
                    </span>
                  </button>

                  <ul
                    className={`dropdown-menu ${openDropdown === "international" ? "show" : ""}`}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/international/dubai")}
                      >
                        Dubai
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/international/thailand")}
                      >
                        Thailand
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/international/bali")}
                      >
                        Bali
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/international/malaysia")}
                      >
                        Malaysia
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/international/nepal")}
                      >
                        Nepal
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLinkClick("/international/vietnam")}
                      >
                        Vietnam
                      </button>
                    </li>
                  </ul>
                </li>

                {/* Upcoming Group Trips */}
                <li className="nav-item">
                  <Link
                    to="/category-preview/group-tours/6"
                    className="nav-link text-decoration-none"
                    onClick={() => handleLinkClick("/category-preview/group-tours/6")}
                  >
                    Upcoming Group Trips
                  </Link>
                </li>

                {/* Honeymoon Trips */}
                <li className="nav-item">
                  <Link
                    to="/category-preview/honeymoon-trips/5"
                    className="nav-link text-decoration-none"
                    onClick={() => handleLinkClick("/category-preview/honeymoon-trips/5")}
                  >
                    Honeymoon Trips
                  </Link>
                </li>

                
              </ul>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="navbar-toggler d-lg-none border-0"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        {/* Slide-out Mobile Menu */}
        <div
          className={`mobile-menu d-lg-none position-fixed top-0 end-0 h-100 p-4 ${
            mobileMenuOpen ? "open" : ""
          }`}
          style={{
            width: "70%",
            backgroundColor: "#3b2a1a",
            transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
            zIndex: 1050,
          }}
        >
          <button
            className="btn-close mb-4 text-white btn-close-mobile"
            onClick={() => setMobileMenuOpen(false)}
          ></button>

          <ul className="list-unstyled d-flex flex-column gap-3 m-0">
            <li>
              <button className="plan-trip-btn" onClick={handleOpenModal}>
                Plan Your Trip
              </button>
            </li>
            <li>
              <Link
                to="/blogs"
                className="text-decoration-none text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="text-decoration-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="text-decoration-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/category-preview/group-tours/6"
                className="text-decoration-none text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Upcoming Group Trips
              </Link>
            </li>
            <li>
              <Link
                to="/category-preview/honeymoon-trips/5"
                className="text-decoration-none text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Honeymoon Trips
              </Link>
            </li>
            
          </ul>
        </div>
      </div>

      <ContactForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Header;