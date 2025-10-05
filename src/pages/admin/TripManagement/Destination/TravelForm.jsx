import React from "react";
import "./TravelForm.css"; // external css for styles

const TravelForm = () => {
  return (
    <div className="travel-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h1>TravelPro</h1>
        <p>Your Journey Starts Here</p>

        <div className="step">
          <i className="fa fa-map-marker-alt"></i>
          <span>Select Your Tour</span>
        </div>
        <div className="step">
          <i className="fa fa-quote-right"></i>
          <span>Get Multiple Free Quotes</span>
        </div>
        <div className="step">
          <i className="fa fa-calendar-check"></i>
          <span>Customize & Book</span>
        </div>

        <div className="stats">
          <h3>1500+</h3>
          <p>Verified Agents</p>
          <h3>100k+</h3>
          <p>Happy Travellers</p>
          <h3>190+</h3>
          <p>Destinations</p>
        </div>

        <div className="contact-box">
          <i className="fa fa-phone"></i>
          <div>
            <p>Need Help? Call Us</p>
            <h4>+1 (555) 123-4567</h4>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <h2>Where do you want to go?</h2>
        <p>Tell us about your dream destination</p>

        <div className="form-group">
          <input type="text" placeholder="Search Destination" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Search City" />
        </div>

        <div className="date-toggle">
          <button className="active">Fixed</button>
          <button className="inactive">Flexible</button>
        </div>

        <div className="form-group">
          <input type="date" />
        </div>
        <div className="form-group">
          <input type="date" />
        </div>

        <div className="form-row">
          <select>
            <option>Adults</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select>
            <option>Children</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </select>
          <select>
            <option>Infants</option>
            <option>0</option>
            <option>1</option>
          </select>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Full Name" />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" />
        </div>
        <div className="form-row">
          <select>
            <option>+1</option>
            <option>+91</option>
            <option>+44</option>
          </select>
          <input type="tel" placeholder="Phone Number" />
        </div>

        <div className="form-check">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I agree to <a href="#">Terms</a> & get updates on WhatsApp
          </label>
        </div>

        <button className="submit-btn">Plan My Holidays</button>
      </div>
    </div>
  );
};

export default TravelForm;
