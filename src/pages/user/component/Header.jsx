import { BACKEND_DOMAIN } from '../../../common/api/ApiClient';
import { Link } from 'react-router-dom';
import { MemorizedSelector } from '../../../helpers/memorizedSelector';

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
    "/trips-bookings"
  ];

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
          <div className="container">
            {/* Logo */}
          

            {/* Mobile Toggler */}
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

            {/* Menu */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                
              </ul>

              <div className="d-flex flex-column flex-lg-row mt-3 mt-lg-0">
                <Link to="/blogs" className="navbar-brand">Blogs</Link>
                <Link to="/blogs-detail" className="navbar-brand">Blogs Detail</Link>
                <Link to="/contact-us" className="navbar-brand">Contact Us</Link>
                <Link to="/about-us" className="navbar-brand">About Us</Link>
                <Link to="/destination" className="navbar-brand">Signup</Link>
                <Link to="/admin-login" className="navbar-brand login-btn mt-lg-0 mt-4">Login</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
