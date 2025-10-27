import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const EnquiryForm = ({ trip, onClose, onFormSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    departure_city: '',
    travel_date: '',
    adults: 1,
    children: 0,
    hotel_category: '',
    full_name: '',
    email: '',
    contact_number: '',
    additional_comments: ''
  });

  // 🔒 Lock body scroll when modal opens
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
    setIsSubmitting(true);
    await onFormSubmit(formData, trip); 
    setIsSubmitting(false);
  };

  // 🎯 Render modal using React Portal at document.body level
  return createPortal(
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
          padding: '32px',
          width: '100%',
          maxWidth: '550px',
          position: 'relative',
          maxHeight: '90vh',
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
        
        <h3 style={{ marginBottom: '24px', fontSize: '26px', fontWeight: '700', color: '#3b2a1a', paddingRight: '40px' }}>
          Send Query for {trip?.title}
        </h3>
        
        <form onSubmit={handleSubmit}>
          {/* Travel To (Destination) - Read Only */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Travel To (Destination)</label>
            <input 
              type="text" 
              value={trip?.title} 
              readOnly 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px', 
                backgroundColor: '#f5f5f5',
                fontWeight: '600',
                boxSizing: 'border-box'
              }} 
            />
          </div>

          {/* Travel From (Departure City) */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Travel From (Departure City)</label>
            <input 
              name="departure_city" 
              value={formData.departure_city} 
              onChange={handleChange} 
              placeholder="e.g. Delhi, Mumbai" 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Travel Date * */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Travel Date *</label>
            <input 
              type="date" 
              name="travel_date" 
              value={formData.travel_date} 
              onChange={handleChange} 
              required 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* No. of Adults * */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>No. of Adults *</label>
            <input 
              type="number" 
              name="adults" 
              min="1" 
              value={formData.adults} 
              onChange={handleChange} 
              required 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* No. of Children */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>No. of Children</label>
            <input 
              type="number" 
              name="children" 
              min="0" 
              value={formData.children} 
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Hotel Category */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Hotel Category</label>
            <select 
              name="hotel_category" 
              value={formData.hotel_category} 
              onChange={handleChange} 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            >
              <option value="">Select Category</option>
              <option value="Five Star">⭐⭐⭐⭐⭐ Five Star</option>
              <option value="Four Star">⭐⭐⭐⭐ Four Star</option>
              <option value="Three Star">⭐⭐⭐ Three Star</option>
              <option value="Budget">💰 Budget</option>
            </select>
          </div>
          
          {/* Full Name * */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Full Name *</label>
            <input 
              name="full_name" 
              value={formData.full_name} 
              onChange={handleChange} 
              placeholder="e.g. John Doe" 
              required 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Email * */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Email *</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="e.g. johndoe@gmail.com" 
              required 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Contact Number * */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Contact Number *</label>
            <input 
              type="tel" 
              name="contact_number" 
              value={formData.contact_number} 
              onChange={handleChange} 
              placeholder="e.g. 9876543210" 
              required 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Additional Comments */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Additional Comments</label>
            <textarea 
              name="additional_comments" 
              value={formData.additional_comments} 
              onChange={handleChange} 
              placeholder="Write any message or special requests here..." 
              style={{ 
                width: '100%', 
                padding: '12px 14px', 
                border: '2px solid #ddd', 
                borderRadius: '8px', 
                height: '90px',
                resize: 'vertical',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b2a1a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isSubmitting ? '#999' : '#3b2a1a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#2d1f13';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 15px rgba(59, 42, 26, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#3b2a1a';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
      </div>

      {/* Keyframe animation */}
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
      `}</style>
    </div>,
    document.body // 🎯 Portal renders directly to document.body
  );
};

export default EnquiryForm;