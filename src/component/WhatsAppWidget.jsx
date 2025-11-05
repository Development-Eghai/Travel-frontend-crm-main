import React from 'react';

// The WhatsApp number for the link
const WHATSAPP_NUMBER = '918278829941'; 

const WhatsAppWidget = () => {
  // Construct the WhatsApp link using the number and a default message
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to plan my trip.")}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float-btn"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="whatsapp-content">
        <i className="fa-brands fa-whatsapp whatsapp-icon"></i>
        <span className="whatsapp-text">Plan Your Adventure!</span>
      </div>
    </a>
  );
};

export default WhatsAppWidget;