import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="py-5"
      style={{ backgroundColor: "#fff7f4", color: "#000", overflowX: "hidden" }}
    >
      <div className="container-fluid px-4 px-md-5">
        <div className="row gy-5 gx-5 justify-content-between align-items-start">
          
          {/* About Section */}
          <div className="col-lg-5 col-md-12 text-center text-md-start">
            <h5 className="fw-semibold mb-3">About Indian Mountain Rovers</h5>
            <Link to="/" className="d-inline-block mb-3">
              <img
                src="/logo-indian-mountain-rovers.png"
                alt="Indian Mountain Rovers Logo"
                className="img-fluid"
                style={{ height: "80px", width: "auto" }}
              />
            </Link>
            <p style={{ maxWidth: "600px", lineHeight: "1.7", margin: "0 auto" }}>
              Explore the heart of the Himalayas with Indian Mountain Rovers! We
              specialize in crafting bespoke adventure tours — from serene nature
              trails to thrilling expeditions. Our commitment to excellence ensures
              every journey is unforgettable.
            </p>
          </div>

          {/* Email Support */}
          <div className="col-lg-3 col-md-6 text-center text-md-start pe-lg-4">
            <h5 className="fw-semibold mb-3">Email Support</h5>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li>
                <a href="mailto:info@indianmountainrovers.com" className="footer-link">
                  info@indianmountainrovers.com
                </a>
              </li>
              <li>
                <a href="mailto:indianmountainrovers@gmail.com" className="footer-link">
                  indianmountainrovers@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:mountainroversshimla@gmail.com" className="footer-link">
                  mountainroversshimla@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Phone Support */}
          <div className="col-lg-2 col-md-6 text-center text-md-start">
            <h5 className="fw-semibold mb-3">Phone Support</h5>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li><a href="tel:+919418344227" className="footer-link">+91 9418344227</a></li>
              <li><a href="tel:+918278829941" className="footer-link">+91 8278829941</a></li>
              <li><a href="tel:+918350970984" className="footer-link">+91 8350970984</a></li>
              <li><a href="tel:+918679623792" className="footer-link">+91 8679623792</a></li>
            </ul>
          </div>

          {/* Explore Links */}
          <div className="col-lg-2 col-md-6 text-center text-md-start">
            <h5 className="fw-semibold mb-3">Explore</h5>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about-us" className="footer-link">About Us</Link></li>
              <li><Link to="/contact-us" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-5">
          <div className="mb-2 d-flex flex-wrap justify-content-center gap-3">
            <Link to="/Payments" className="footer-link">Payments</Link>
            <Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          </div>
          <p className="mb-0">
            © Copyright Indian Mountain Rovers {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Inline styles for hover and responsiveness */}
      <style>
        {`
          .footer-link {
            color: #000;
            text-decoration: none;
            position: relative;
            transition: color 0.3s ease;
          }
          .footer-link:hover {
            color: #eb662b;
          }
          .footer-link::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0%;
            height: 2px;
            background-color: #eb662b;
            transition: width 0.3s ease;
          }
          .footer-link:hover::after {
            width: 100%;
          }
          @media (max-width: 767px) {
            .footer-link::after {
              display: none;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
