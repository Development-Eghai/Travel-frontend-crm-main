import React, { useState, useEffect } from 'react';
import './ContactForm.css'; // We'll create this CSS file

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    destination: '',
    city: '',
    departureType: 'fixed',
    startDate: '',
    endDate: '',
    adults: '0',
    children: '0',
    infants: '0',
    fullName: '',
    email: '',
    phone: '',
    whatsapp: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        destination: '',
        city: '',
        departureType: 'fixed',
        startDate: '',
        endDate: '',
        adults: '0',
        children: '0',
        infants: '0',
        fullName: '',
        email: '',
        phone: '',
        whatsapp: false,
      });
      setErrors({});
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleDepartureType = (type) => {
    setFormData({
      ...formData,
      departureType: type,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (formData.departureType === 'fixed') {
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required';
      }
      if (!formData.endDate) {
        newErrors.endDate = 'End date is required';
      }
      if (
        formData.startDate &&
        formData.endDate &&
        new Date(formData.startDate) > new Date(formData.endDate)
      ) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (
      formData.adults === '0' &&
      formData.children === '0' &&
      formData.infants === '0'
    ) {
      newErrors.adults = 'At least one traveler is required';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } else {
      setErrors(formErrors);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div 
      className="contact-form-modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="contact-form-modal-content">
        {/* Close Button */}
        <button
          type="button"
          className="contact-form-modal-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        
        <div className="contact-form-modal-container">
          <div className="contact-form-left-panel">
            <h3 className="contact-form-brand">TravelPro</h3>
            <p className="contact-form-subtitle">Your Journey Starts Here</p>

            <h5 className="contact-form-section-title">How It Works</h5>
            <ul className="contact-form-features-list">
              <li className="contact-form-feature-item">
                <span className="contact-form-icon">📍</span>
                Select Your Tour
              </li>
              <li className="contact-form-feature-item">
                <span className="contact-form-icon">📋</span>
                Get Multiple Free Quotes
              </li>
              <li className="contact-form-feature-item">
                <span className="contact-form-icon">✅</span>
                Customize &amp; Book
              </li>
            </ul>

            <div className="contact-form-stats">
              <p>1500+ <small>Verified Agents</small></p>
              <p>100k+ <small>Happy Travellers</small></p>
              <p>190+ <small>Destinations</small></p>
            </div>

            <div className="contact-form-help">
              <span className="contact-form-icon">📞</span>
              Need Help? Call Us
              <br />
              <span className="contact-form-phone">+1 (555) 123-4567</span>
            </div>
          </div>

          <div className="contact-form-right-panel">
            {isSubmitted ? (
              <div className="contact-form-success">
                <div className="success-icon">✅</div>
                <h4 className="success-title">Thank You!</h4>
                <p className="success-message">
                  We've received your information and will contact you shortly to
                  plan your dream holiday.
                </p>
                <button
                  className="success-close-btn"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h4 className="form-title">Where do you want to go?</h4>
                <p className="form-subtitle">
                  Tell us about your dream destination
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control ${errors.destination ? 'error' : ''}`}
                      placeholder="Search Destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                    />
                    {errors.destination && (
                      <div className="error-message">{errors.destination}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'error' : ''}`}
                      placeholder="Search City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <div className="error-message">{errors.city}</div>
                    )}
                  </div>

                  {/* Departure toggle */}
                  <div className="departure-toggle">
                    <button
                      type="button"
                      className={`toggle-btn ${formData.departureType === 'fixed' ? 'active' : ''}`}
                      onClick={() => handleDepartureType('fixed')}
                    >
                      Fixed
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn ${formData.departureType === 'flexible' ? 'active' : ''}`}
                      onClick={() => handleDepartureType('flexible')}
                    >
                      Flexible
                    </button>
                  </div>

                  {formData.departureType === 'fixed' && (
                    <div className="date-fields">
                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input
                          type="date"
                          className={`form-control ${errors.startDate ? 'error' : ''}`}
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                        {errors.startDate && (
                          <div className="error-message">{errors.startDate}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input
                          type="date"
                          className={`form-control ${errors.endDate ? 'error' : ''}`}
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                        />
                        {errors.endDate && (
                          <div className="error-message">{errors.endDate}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* People selection */}
                  <div className="people-selection">
                    <div className="form-group">
                      <label className="form-label">Adults</label>
                      <select
                        className={`form-select ${errors.adults ? 'error' : ''}`}
                        name="adults"
                        value={formData.adults}
                        onChange={handleChange}
                      >
                        <option value="0">0</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i+1}>{i+1}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Children</label>
                      <select
                        className="form-select"
                        name="children"
                        value={formData.children}
                        onChange={handleChange}
                      >
                        <option value="0">0</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i+1}>{i+1}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Infants</label>
                      <select
                        className="form-select"
                        name="infants"
                        value={formData.infants}
                        onChange={handleChange}
                      >
                        <option value="0">0</option>
                        {[...Array(5)].map((_, i) => (
                          <option key={i} value={i+1}>{i+1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {errors.adults && (
                    <div className="error-message">{errors.adults}</div>
                  )}

                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? 'error' : ''}`}
                      placeholder="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <div className="error-message">{errors.fullName}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'error' : ''}`}
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'error' : ''}`}
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="error-message">{errors.phone}</div>
                    )}
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="whatsapp"
                      name="whatsapp"
                      checked={formData.whatsapp}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="whatsapp">
                      I agree to Terms &amp; Get updates on WhatsApp
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                  >
                    Plan My Holidays
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;