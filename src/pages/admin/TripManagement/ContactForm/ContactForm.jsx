import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    destination: '',
    departure_city: '',
    departureType: 'fixed',
    travel_date: '',
    adults: 1,
    children: 0,
    infants: 0,
    hotel_category: '',
    full_name: '',
    email: '',
    contact_number: '',
    additional_comments: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Captcha state
  const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // API Endpoint
  const API_ENDPOINT = 'https://api.yaadigo.com/public/api/enquires/';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // This regex is slightly adjusted to be more robust for international numbers while checking for minimum length
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{7,15}$/; 

  // Generate captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({ num1, num2 });
    setCaptchaAnswer('');
    setCaptchaError('');
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        destination: '',
        departure_city: '',
        departureType: 'fixed',
        travel_date: '',
        adults: 1,
        children: 0,
        infants: 0,
        hotel_category: '',
        full_name: '',
        email: '',
        contact_number: '',
        additional_comments: '',
      });
      setErrors({});
      setIsSubmitted(false);
      setCaptchaAnswer('');
      setCaptchaError('');
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For number inputs, convert value to a number
    const newValue = type === 'number' ? parseInt(value) : value;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : newValue,
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
      // Clear travel_date if switching to flexible
      travel_date: type === 'flexible' ? '' : formData.travel_date, 
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Required';
    }

    if (!formData.departure_city.trim()) {
      newErrors.departure_city = 'Required';
    }

    // travel_date is required only if departureType is 'fixed'
    if (formData.departureType === 'fixed' && !formData.travel_date) {
      newErrors.travel_date = 'Required';
    }

    if (formData.adults < 1) {
      newErrors.adults = 'At least 1 adult required';
    }

    if (!formData.hotel_category) {
      newErrors.hotel_category = 'Required';
    }

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    // Normalize phone number (remove spaces) for regex test
    const cleanContactNumber = formData.contact_number.replace(/\s/g, ''); 
    if (!formData.contact_number.trim()) {
      newErrors.contact_number = 'Required';
    } else if (!phoneRegex.test(cleanContactNumber)) {
      newErrors.contact_number = 'Invalid number';
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    // 1. Validate Captcha
    const correctAnswer = captchaQuestion.num1 + captchaQuestion.num2;
    if (parseInt(captchaAnswer) !== correctAnswer) {
      setCaptchaError('Incorrect answer. Please try again.');
      generateCaptcha();
      return;
    }

    // 2. Validate Form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // 3. Submit to API
    setIsLoading(true);
    setErrors({}); // Clear any previous form errors

    // Prepare data for API: exclude departureType and use empty string for flexible date
    const payload = {
      destination: formData.destination,
      departure_city: formData.departure_city,
      travel_date: formData.departureType === 'fixed' ? formData.travel_date : '', // Use empty string if flexible
      adults: formData.adults,
      children: formData.children,
      infants: formData.infants,
      hotel_category: formData.hotel_category,
      full_name: formData.full_name,
      contact_number: formData.contact_number.replace(/\s/g, ''), // Send cleaned number
      email: formData.email,
      additional_comments: formData.additional_comments,
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other required headers (e.g., Authorization) here
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Successful submission
        console.log('Form submitted successfully:', payload);
        setIsSubmitted(true);
      } else {
        // Handle API errors (e.g., 4xx or 5xx status codes)
        const errorData = await response.json();
        console.error('Submission failed:', response.status, errorData);
        // Display a general submission error or specific field errors from API
        alert(`Submission Failed: ${errorData.message || 'Server error occurred.'}`);
        generateCaptcha(); // Re-generate captcha on failure
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error during submission:', error);
      alert('An error occurred. Please check your connection and try again.');
      generateCaptcha(); // Re-generate captcha on failure
    } finally {
      setIsLoading(false);
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

  if (!isOpen) return null;

  return (
    <div className="contact-form-fixed-backdrop" onClick={handleBackdropClick}>
      <div className="contact-form-fixed-content">
        <button
          type="button"
          className="contact-form-fixed-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="contact-form-fixed-container">
          {/* LEFT PANEL (Unchanged) */}
          <div className="contact-form-fixed-left">
            <div className="contact-form-fixed-brand">
              <span className="contact-form-fixed-icon">✈️</span>
              Indian Mountain Rovers
            </div>
            <p className="contact-form-fixed-subtitle">Your Journey Starts Here</p>

            <div className="contact-form-fixed-review">
              <div className="review-rating-fixed">
                <span className="rating-number-fixed">4.9</span>
                <div className="rating-info-fixed">
                  <div className="stars-fixed">★★★★★</div>
                  <p className="review-platform-fixed">Excellent on Google</p>
                </div>
              </div>
              <p className="review-count-fixed">Based on 1,245 reviews</p>
            </div>

            <div className="contact-form-fixed-features">
              <h5 className="features-title-fixed">Why Choose Us?</h5>
              <div className="feature-item-fixed">
                <span className="feature-icon-fixed">🚀</span>
                <div>
                  <strong>Personalized Planning</strong>
                  <p>Tailored to your needs</p>
                </div>
              </div>
              <div className="feature-item-fixed">
                <span className="feature-icon-fixed">🗺️</span>
                <div>
                  <strong>Expert Knowledge</strong>
                  <p>Insider tips guaranteed</p>
                </div>
              </div>
              <div className="feature-item-fixed">
                <span className="feature-icon-fixed">📞</span>
                <div>
                  <strong>24/7 Support</strong>
                  <p>Round-the-clock help</p>
                </div>
              </div>
            </div>

            <div className="contact-form-fixed-contact">
              <p><strong>Email:</strong> info@indianmountainrovers.com</p>
              <p><strong>Phone:</strong> +91 82788 29941</p>
              <a href="https://wa.me/918278829941" target="_blank" rel="noopener noreferrer" className="whatsapp-btn-fixed">
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT PANEL - FORM (Unchanged logic, except for handleSubmit) */}
          <div className="contact-form-fixed-right">
            {isSubmitted ? (
              <div className="contact-form-fixed-success">
                <div className="success-icon-fixed">✅</div>
                <h4 className="success-title-fixed">Thank You!</h4>
                <p className="success-message-fixed">
                  We've received your enquiry for {formData.destination}. Our team will contact you shortly.
                </p>
                <button className="success-btn-fixed" onClick={handleClose}>
                  Close
                </button>
              </div>
            ) : (
              <div className="contact-form-wrapper-fixed">
                <h4 className="form-title-fixed">Plan Your Trip</h4>
                <p className="form-subtitle-fixed">Fill details below for a custom quote</p>

                <div className="contact-form-fixed">
                  <div className="form-row-fixed">
                    <div className="form-group-fixed">
                      <label>Destination *</label>
                      <input
                        type="text"
                        className={errors.destination ? 'error' : ''}
                        placeholder="e.g., Paris"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                      />
                      {errors.destination && <span className="error-text-fixed">{errors.destination}</span>}
                    </div>

                    <div className="form-group-fixed">
                      <label>Departure City *</label>
                      <input
                        type="text"
                        className={errors.departure_city ? 'error' : ''}
                        placeholder="e.g., Delhi"
                        name="departure_city"
                        value={formData.departure_city}
                        onChange={handleChange}
                      />
                      {errors.departure_city && <span className="error-text-fixed">{errors.departure_city}</span>}
                    </div>
                  </div>

                  <div className="form-group-fixed">
                    <label>Travel Date</label>
                    <div className="toggle-group-fixed">
                      <button
                        type="button"
                        className={formData.departureType === 'fixed' ? 'active' : ''}
                        onClick={() => handleDepartureType('fixed')}
                      >
                        Fixed
                      </button>
                      <button
                        type="button"
                        className={formData.departureType === 'flexible' ? 'active' : ''}
                        onClick={() => handleDepartureType('flexible')}
                      >
                        Flexible
                      </button>
                    </div>
                    {formData.departureType === 'fixed' && (
                      <div>
                        <input
                          type="date"
                          className={errors.travel_date ? 'error' : ''}
                          name="travel_date"
                          value={formData.travel_date}
                          onChange={handleChange}
                        />
                        {errors.travel_date && <span className="error-text-fixed">{errors.travel_date}</span>}
                      </div>
                    )}
                  </div>

                  <div className="form-row-fixed three-col">
                    <div className="form-group-fixed">
                      <label>Adults *</label>
                      <input
                        type="number"
                        name="adults"
                        min="1"
                        value={formData.adults}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group-fixed">
                      <label>Children</label>
                      <input
                        type="number"
                        name="children"
                        min="0"
                        value={formData.children}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group-fixed">
                      <label>Infants</label>
                      <input
                        type="number"
                        name="infants"
                        min="0"
                        value={formData.infants}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group-fixed">
                    <label>Hotel Category *</label>
                    <div className="hotel-options-fixed">
                      {['Budget', '3 Star', '4 Star', '5 Star'].map((cat) => (
                        <label key={cat} className={formData.hotel_category === cat ? 'selected' : ''}>
                          <input
                            type="radio"
                            name="hotel_category"
                            value={cat}
                            checked={formData.hotel_category === cat}
                            onChange={handleChange}
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                    {errors.hotel_category && <span className="error-text-fixed">{errors.hotel_category}</span>}
                  </div>

                  <div className="form-row-fixed">
                    <div className="form-group-fixed">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        className={errors.full_name ? 'error' : ''}
                        placeholder="John Doe"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                      />
                      {errors.full_name && <span className="error-text-fixed">{errors.full_name}</span>}
                    </div>

                    <div className="form-group-fixed">
                      <label>Contact Number *</label>
                      <input
                        type="tel"
                        className={errors.contact_number ? 'error' : ''}
                        placeholder="+91 98765 43210"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                      />
                      {errors.contact_number && <span className="error-text-fixed">{errors.contact_number}</span>}
                    </div>
                  </div>

                  <div className="form-group-fixed">
                    <label>Email *</label>
                    <input
                      type="email"
                      className={errors.email ? 'error' : ''}
                      placeholder="john@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error-text-fixed">{errors.email}</span>}
                  </div>

                  <div className="form-group-fixed">
                    <label>Additional Comments</label>
                    <textarea
                      placeholder="Any special requirements..."
                      name="additional_comments"
                      rows="2"
                      value={formData.additional_comments}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Captcha */}
                  <div className="captcha-section-fixed">
                    <label>Security Check *</label>
                    <div className="captcha-question-fixed">
                      What is {captchaQuestion.num1} + {captchaQuestion.num2}?
                    </div>
                    <input
                      type="number"
                      className={captchaError ? 'error' : ''}
                      placeholder="Enter answer"
                      value={captchaAnswer}
                      onChange={(e) => {
                        setCaptchaAnswer(e.target.value);
                        setCaptchaError('');
                      }}
                    />
                    {captchaError && <span className="error-text-fixed">{captchaError}</span>}
                  </div>

                  <button type="button" className="submit-btn-fixed" disabled={isLoading} onClick={handleSubmit}>
                    {isLoading ? 'Submitting...' : 'Get My Custom Quote'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;