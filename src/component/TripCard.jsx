import React, { useState } from 'react'; // Keep useState for local toggle
// Removed errorMsg, successMsg, APIBaseUrl, handleSubmit, handleChange
import EnquiryForm from './EnquiryForm'; // 👈 Import the new component

const TripCard = ({ trip }) => {
    // Local state to control modal visibility
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className="featured-card-main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className='position-relative'>
                    <div className='trip-card-image-parent'>
                        <img className="featured-card-img" src={trip?.hero_image} alt="featured" />
                    </div>

                    <div className='featured-card-day-card'>
                        <p>{`${trip?.days} Days`} {`${trip?.nights} Nights`} </p>
                    </div>
                </div>

                <div className="featured-content-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h5 className="featured-trip-title" style={{
                            minHeight: '48px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            marginBottom: '8px'
                        }}>
                            {trip?.title}
                        </h5>

                        <p className="featured-city-para" style={{ minHeight: '20px' }}>
                            {`${trip?.pickup_location} → ${trip?.drop_location}`.length > 30
                                ? `${trip?.pickup_location} → ${trip?.drop_location}`.slice(0, 30) + "..."
                                : `${trip?.pickup_location} → ${trip?.drop_location}`}
                        </p>

                        <p className="featured-content">
                            {trip?.pricing?.pricing_model === "customized" ? (
                                <>
                                    <span>₹{trip?.pricing?.customized?.base_price}</span>
                                    ₹{trip?.pricing?.customized?.final_price}
                                </>
                            ) : (
                                <>
                                    <span>₹{trip?.pricing?.fixed_departure[0]?.base_price}</span>
                                    ₹{trip?.pricing?.fixed_departure[0]?.final_price}
                                </>
                            )}
                        </p>
                    </div>

                    <div className="featured-bottom-content d-flex gap-2">
                        {/* Trip Detail Button */}
                        <button
                            style={{
                                backgroundColor: '#3b2a1a',
                                color: 'white',
                                borderRadius: '6px',
                                padding: '10px 0',
                                width: '100%',
                                border: 'none',
                                fontWeight: '700',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => window.open(`/trip-preview/${trip?.slug}/${trip?.id}`, "_blank", "noopener,noreferrer")}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#2d1f13';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 8px rgba(59, 42, 26, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#3b2a1a';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            Trip Detail
                        </button>
                        
                        {/* Send Query Button */}
                        <button
                            style={{
                                backgroundColor: 'white',
                                color: '#3b2a1a',
                                borderRadius: '6px',
                                padding: '10px 0',
                                width: '100%',
                                border: '2px solid #3b2a1a',
                                fontWeight: '700',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => setShowForm(true)} // Toggle visibility
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#25d366';
                                e.target.style.borderColor = '#25d366';
                                e.target.style.color = 'white';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 8px rgba(37, 211, 102, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = '#3b2a1a';
                                e.target.style.color = '#3b2a1a';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            Send Query
                        </button>
                    </div>
                </div>
            </div>

            {/* Render the Enquiry Form Component */}
            {showForm && (
                <EnquiryForm 
                    trip={trip} 
                    onClose={() => setShowForm(false)} 
                />
            )}
        </>
    );
};

export default TripCard;
