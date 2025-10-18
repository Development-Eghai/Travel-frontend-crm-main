import React from 'react';

const TripCard = ({ trip }) => {
    return (
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
                    <div className='trip-card-amount'>
                        <p className="" onClick={() => window.open(`/trip-preview/${trip?.slug}/${trip?.id}`, "_blank", "noopener,noreferrer")}>
                            Trip Detail
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripCard;