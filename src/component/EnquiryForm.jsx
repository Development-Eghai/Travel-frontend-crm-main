import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const EnquiryForm = ({ trip, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    departure_city: '',
    travel_date: '',
    adults: 1,
    children: 0,
    hotel_category: '',
    full_name: '',
    email: '',
    contact_number: ''
  });

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.contact_number || !formData.travel_date) {
      alert("Please fill in Full Name, Email, Contact Number, and Travel Date.");
      return;
    }

    if (!trip?.title) {
      alert("Tour details are not loaded. Cannot submit enquiry.");
      return;
    }

    const payload = {
      destination: trip.title,
      departure_city: formData.departure_city || "N/A",
      travel_date: formData.travel_date,
      adults: formData.adults || 1,
      children: formData.children || 0,
      infants: 0,
      hotel_category: formData.hotel_category || "N/A",
      full_name: formData.full_name,
      contact_number: formData.contact_number,
      email: formData.email,
      additional_comments: ""
    };

    setIsSubmitting(true);
    try {
      const res = await fetch('https://api.yaadigo.com/public/api/enquires/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M',
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data?.success === true) {
        setShowSuccess(true);
        setFormData({
          departure_city: '',
          travel_date: '',
          adults: 1,
          children: 0,
          hotel_category: '',
          full_name: '',
          contact_number: '',
          email: ''
        });
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2000);
      } else {
        alert(data?.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      alert("An error occurred during submission. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <>
      {/* ✅ Success Notification */}
      {showSuccess && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000000,
            background: 'linear-gradient(135deg, #25d366 0%, #20b358 100%)',
            color: 'white',
            padding: '18px 24px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideInRight 0.4s ease-out',
            minWidth: '320px',
            maxWidth: '400px'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L5.5 10.5L12 4" stroke="#25d366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ 
              margin: 0, 
              fontWeight: '700', 
              fontSize: '15px',
              lineHeight: '1.4'
            }}>
              Your enquiry has been submitted successfully! We will contact you soon.
            </p>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.8,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.8'}
          >
            ×
          </button>
        </div>
      )}

      {/* ✅ Modal Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '20px',
          overflowY: 'auto',
          transform: 'translateZ(0)'
        }}
        onClick={onClose}
      >
        <div 
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px 28px',
            width: '100%',
            maxWidth: '650px',
            position: 'relative',
            maxHeight: '95vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
            minWidth: '300px',
            margin: 'auto',
            color: '#3b2a1a',
            animation: 'modalScaleIn 0.3s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            style={{
              position: 'absolute',
              right: '16px',
              top: '16px',
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#666',
              fontWeight: 'bold',
              padding: 0,
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0f0f0';
              e.target.style.color = '#3b2a1a';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#666';
            }}
          >
            &times;
          </button>
          
          <h3 style={{ marginBottom: '4px', fontSize: '24px', fontWeight: '700', color: '#3b2a1a', paddingRight: '40px' }}>
            Enquiry Now!
          </h3>
          <p style={{ marginBottom: '16px', color: '#666', fontSize: '13px' }}>
            Allow Us to Call You Back!
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Travel To (Destination) */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Travel To (Destination)</label>
              <input 
                type="text" 
                value={trip?.title || 'Loading...'} 
                readOnly 
                style={{ 
                  width: '100%', 
                  padding: '10px 12px', 
                  border: '2px solid #ddd', 
                  borderRadius: '8px', 
                  backgroundColor: '#f5f5f5',
                  fontWeight: '600',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }} 
              />
            </div>

            {/* Departure City + Travel Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Travel From (Departure City)</label>
                <input 
                  name="departure_city" 
                  value={formData.departure_city} 
                  onChange={handleChange} 
                  placeholder="e.g. Delhi" 
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Travel Date *</label>
                <input 
                  type="date" 
                  name="travel_date" 
                  value={formData.travel_date} 
                  onChange={handleChange} 
                  required 
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            {/* Adults + Children */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Adults (11+ yrs) *</label>
                <input 
                  type="number" 
                  name="adults" 
                  min="1" 
                  value={formData.adults} 
                  onChange={handleChange} 
                  required 
                  placeholder="1"
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Children (5–11 yrs)</label>
                <input 
                  type="number" 
                  name="children" 
                  min="0" 
                  value={formData.children}
                  onChange={handleChange} 
                  placeholder="0"
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            {/* Email + Hotel Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="e.g. JohnDoe@gmail.com" 
                  required 
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Hotel Category</label>
                <select 
                  name="hotel_category" 
                  value={formData.hotel_category} 
                  onChange={handleChange} 
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Five Star">⭐⭐⭐⭐⭐ Five Star</option>
                  <option value="Four Star">⭐⭐⭐⭐ Four Star</option>
                  <option value="Three Star">⭐⭐⭐ Three Star</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>
            </div>

            {/* Full Name + Contact Number */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Full Name *</label>
                <input 
                  name="full_name" 
                  value={formData.full_name} 
                  onChange={handleChange} 
                  placeholder="e.g. John Doe" 
                  required 
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Contact Number *</label>
                <input 
                  type="tel" 
                  name="contact_number" 
                  value={formData.contact_number} 
                  onChange={handleChange} 
                  placeholder="e.g. 1234567890" 
                  required 
                  style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '2px solid #ddd', 
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              style={{
                width: '100%',
                padding: '14px',
                background: isSubmitting 
                  ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' 
                  : 'linear-gradient(135deg, #25d366 0%, #20b358 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '16px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes modalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        body.modal-open {
          overflow: hidden;
        }
      `}</style>
    </>,
    document.body
  );
};

export default EnquiryForm;
