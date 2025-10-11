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

  return (
    <div className="overflow-hidden">
      <div
        className={`header-main ${
          !no_fixed_header_for?.includes(window.location.pathname)
            ? ""
            : "not-fixed-header"
        }`}
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
                  className={`nav-item dropdown ${
                    openDropdown === "domestic" ? "show" : ""
                  }`}
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
                    className={`dropdown-menu ${
                      openDropdown === "domestic" ? "show" : ""
                    }`}
                  >
                    <li>
                      <Link
                        to="/domestic/uttarakhand"
                        className="dropdown-item"
                      >
                        Uttarakhand
                      </Link>
                    </li>
                    <li>
                      <Link to="/domestic/himachal" className="dropdown-item">
                        Himachal
                      </Link>
                    </li>
                    <li>
                      <Link to="/domestic/goa" className="dropdown-item">
                        Goa
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* International Dropdown */}
                <li
                  className={`nav-item dropdown ${
                    openDropdown === "international" ? "show" : ""
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
                    International Trips{" "}
                    <span className="arrow" aria-hidden>
                      {openDropdown === "international" ? "▲" : "▼"}
                    </span>
                  </button>

                  <ul
                    className={`dropdown-menu ${
                      openDropdown === "international" ? "show" : ""
                    }`}
                  >
                    <li>
                      <Link to="/international/europe" className="dropdown-item">
                        Europe
                      </Link>
                    </li>
                    <li>
                      <Link to="/international/bali" className="dropdown-item">
                        Bali
                      </Link>
                    </li>
                    <li>
                      <Link to="/international/dubai" className="dropdown-item">
                        Dubai
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Other Links */}
                <li className="nav-item">
                  <Link to="/blogs" className="nav-link custom-link">
                    Blogs
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/careers" className="nav-link custom-link">
                    Careers
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/contact-us" className="nav-link custom-link">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about-us" className="nav-link custom-link">
                    About Us
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
            backgroundColor: "#eb662b",
            transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
            zIndex: 1050,
            color: "#000",
          }}
        >
          <button
            className="btn-close mb-4"
            onClick={() => setMobileMenuOpen(false)}
          ></button>

          <ul className="list-unstyled d-flex flex-column gap-3 m-0">
            <li>
              <Link
                to="/blogs"
                className="text-decoration-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blogs
              </Link>
            </li>
            {/* <li>
              <Link
                to="/careers"
                className="text-decoration-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>
            </li> */}
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
