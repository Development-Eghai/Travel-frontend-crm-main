import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

// Define API constants (MUST match constants used in TourPreview.js)
const DOMAIN_NAME = "https://www.indianmountainrovers.com";
const API_KEY = "bS8WV0lnLRutJH-NbUlYrO003q30b_f8B4VGYy9g45M";
const ENQUIRY_ENDPOINT = "https://api.yaadigo.com/secure/api/enquires/";
const BOOKING_REQUEST_ENDPOINT = "https://api.yaadigo.com/secure/api/booking_request/";


// --- HELPER COMPONENTS (EXTRACTED AND MEMOIZED) ---

// 1. Customized Fields Component
const CustomizedFields = React.memo(({ currentFormData, handleChange }) => (
    <>
        {/* Departure City + Travel Date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Travel From (Departure City)</label>
                <input name="departure_city" value={currentFormData.departure_city} onChange={handleChange} placeholder="e.g. Delhi" style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Travel Date *</label>
                <input type="date" name="travel_date" value={currentFormData.travel_date} onChange={handleChange} required style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }} />
            </div>
        </div>

        {/* Adults + Children */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Adults (11+ yrs) *</label>
                <input type="number" name="adults" min="1" value={currentFormData.adults} onChange={handleChange} required readOnly style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }} />
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Children (5–11 yrs)</label>
                <input type="number" name="children" min="0" value={currentFormData.children} onChange={handleChange} placeholder="0" readOnly style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }} />
            </div>
        </div>

        {/* Hotel Category */}
        <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Hotel Category</label>
            <select name="hotel_category" value={currentFormData.hotel_category} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }}>
                <option value="">Select Category</option>
                <option value="Five Star">⭐⭐⭐⭐⭐ Five Star</option>
                <option value="Four Star">⭐⭐⭐⭐ Four Star</option>
                <option value="Three Star">⭐⭐⭐ Three Star</option>
                <option value="Budget">Budget</option>
            </select>
        </div>
    </>
));

// 2. Fixed Departure Fields Component
const FixedDepartureFields = React.memo(({ trip, currentFormData, handleChange, totalPriceDisplay }) => (
    <>
        {/* Departure Date Dropdown */}
        <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Departure Date *</label>
            <select 
                name="departure_date_id" 
                value={currentFormData.departure_date_id} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }}
            >
                <option value="">Select Departure Date</option>
                {trip?.pricing?.fixed_departure?.map((departure, index) => (
                    <option key={index} value={index}>
                        {departure.title} ({new Date(departure.from_date).toLocaleDateString()} - {new Date(departure.to_date).toLocaleDateString()})
                    </option>
                ))}
            </select>
        </div>

        {/* Sharing Option Dropdown */}
        <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Sharing Option *</label>
            <select 
                name="sharing_option_id" 
                value={currentFormData.sharing_option_id} 
                onChange={handleChange} 
                required 
                disabled={currentFormData.departure_date_id === ''}
                style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }}
            >
                <option value="">Select Sharing Option</option>
                {currentFormData.departure_date_id !== '' && 
                    trip?.pricing?.fixed_departure?.[currentFormData.departure_date_id]?.costingPackages?.map((pkg, index) => (
                        <option key={index} value={index}>
                            {pkg.title} - ₹{pkg.final_price?.toLocaleString('en-IN')}
                        </option>
                    ))}
            </select>
        </div>
        
        {/* Adults + Children */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
            <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Adults (12+ yrs) *</label>
                <input type="number" name="adults" min="1" value={currentFormData.adults} onChange={handleChange} required readOnly style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }} />
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Children (2-11 yrs)</label>
                <input type="number" name="children" min="0" value={currentFormData.children} onChange={handleChange} readOnly style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }} />
            </div>
        </div>

        {/* Total Price Display */}
        {totalPriceDisplay && (
            <div style={{ background: '#3b2a1a', padding: '15px 20px', borderRadius: '8px', textAlign: 'center', margin: '15px 0 20px' }}>
                <p style={{ color: '#ffffff', fontSize: '15px', marginBottom: '4px', fontWeight: '500' }}>Total Estimated Price</p>
                <p style={{ color: '#ffffff', fontSize: '28px', fontWeight: 'bold', margin: '0' }}>₹{totalPriceDisplay}</p>
            </div>
        )}
    </>
));

// 3. Shared Contact Fields Component (now including Email)
const SharedContactFields = React.memo(({ currentFormData, handleChange }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {/* Full Name */}
        <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Full Name *</label>
            <input name="full_name" value={currentFormData.full_name} onChange={handleChange} placeholder="e.g. John Doe" required style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }} />
        </div>

        {/* Email */}
        <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Email *</label>
            <input type="email" name="email" value={currentFormData.email} onChange={handleChange} placeholder="e.g. JohnDoe@gmail.com" required style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }} />
        </div>
        
        {/* Contact Number */}
        <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Contact Number *</label>
            <input type="tel" name="contact_number" value={currentFormData.contact_number} onChange={handleChange} placeholder="e.g. 1234567890" required style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '13px' }} />
        </div>
    </div>
));


const EnquiryForm = ({ trip, onClose }) => {
    const isFixedDeparture = trip?.pricing?.pricing_model === "fixed_departure";

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // --- Customized State ---
    const [customizedFormData, setCustomizedFormData] = useState({
        departure_city: '',
        travel_date: '',
        adults: 1,
        children: 0,
        infants: 0,
        hotel_category: '',
        full_name: '',
        email: '',
        contact_number: ''
    });

    // --- Fixed Departure State ---
    const [fixedDepartureFormData, setFixedDepartureFormData] = useState({
        departure_date_id: '',
        sharing_option_id: '',
        adults: 1,
        children: 0,
        full_name: '',
        email: '',
        contact_number: ''
    });

    const currentFormData = isFixedDeparture ? fixedDepartureFormData : customizedFormData;
    const setCurrentFormData = isFixedDeparture ? setFixedDepartureFormData : setCustomizedFormData;


    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    // --- General Change Handler (Wrapped in useCallback to maintain stability for memoized components) ---
    const handleChange = useCallback((e) => {
        const { name, value, type } = e.target;
        setCurrentFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value,
        }));
    }, [isFixedDeparture]); // Dependency on isFixedDeparture ensures the correct setter is used.


    // --- Fixed Departure Price Calculation (Memoized for efficiency) ---
    const totalPriceDisplay = useMemo(() => {
        if (!isFixedDeparture) return null;

        const departureIndex = parseInt(fixedDepartureFormData.departure_date_id, 10);
        const packageIndex = parseInt(fixedDepartureFormData.sharing_option_id, 10);

        const departureData = trip?.pricing?.fixed_departure;
        
        if (
            fixedDepartureFormData.departure_date_id === '' || 
            fixedDepartureFormData.sharing_option_id === '' || 
            !departureData?.[departureIndex]?.costingPackages?.[packageIndex]
        ) {
            return null;
        }

        const pricePerPerson = departureData[departureIndex].costingPackages[packageIndex].final_price;
        const totalTravelers = fixedDepartureFormData.adults + fixedDepartureFormData.children;
        return (pricePerPerson * totalTravelers).toLocaleString('en-IN');
    }, [fixedDepartureFormData.departure_date_id, fixedDepartureFormData.sharing_option_id, fixedDepartureFormData.adults, fixedDepartureFormData.children, trip, isFixedDeparture]);


    // --- Universal Submit Handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!trip?.title) {
            alert("Tour details are not loaded. Cannot submit enquiry.");
            return;
        }

        let apiEndpoint;
        let payload;

        if (isFixedDeparture) {
            if (!currentFormData.departure_date_id || !currentFormData.sharing_option_id || !currentFormData.full_name || !currentFormData.email || !currentFormData.contact_number) {
                alert("Please fill in all required fields for Fixed Departure.");
                return;
            }

            const departureIndex = parseInt(currentFormData.departure_date_id, 10);
            const packageIndex = parseInt(currentFormData.sharing_option_id, 10);
            const selectedDeparture = trip.pricing.fixed_departure[departureIndex];
            const selectedPackage = selectedDeparture?.costingPackages[packageIndex];

            if (!selectedDeparture || !selectedPackage) {
                alert("Selected departure or sharing option details are missing.");
                return;
            }

            const pricePerPerson = selectedPackage.final_price;
            const totalTravelers = currentFormData.adults + currentFormData.children;
            const estimatedTotalPrice = pricePerPerson * totalTravelers;
            
            apiEndpoint = BOOKING_REQUEST_ENDPOINT;

            payload = {
                departure_date: selectedDeparture.from_date,
                sharing_option: selectedPackage.title,
                price_per_person: pricePerPerson,
                adults: currentFormData.adults || 1,
                children: currentFormData.children || 0,
                estimated_total_price: estimatedTotalPrice,
                full_name: currentFormData.full_name,
                email: currentFormData.email,
                phone_number: currentFormData.contact_number,
                domain_name: DOMAIN_NAME 
            };

        } else {
            if (!currentFormData.full_name || !currentFormData.email || !currentFormData.contact_number || !currentFormData.travel_date) {
                alert("Please fill in all required fields for Customized Enquiry.");
                return;
            }
            if (!currentFormData.departure_city) {
                alert("Please specify your Departure City.");
                return;
            }

            apiEndpoint = ENQUIRY_ENDPOINT;

            payload = {
                destination: trip.title,
                departure_city: currentFormData.departure_city || "N/A",
                travel_date: currentFormData.travel_date,
                adults: currentFormData.adults || 1,
                children: currentFormData.children || 0,
                infants: currentFormData.infants || 0,
                hotel_category: currentFormData.hotel_category || "N/A",
                full_name: currentFormData.full_name,
                contact_number: currentFormData.contact_number,
                email: currentFormData.email,
                additional_comments: "",
                domain_name: DOMAIN_NAME 
            };
        }

        setIsSubmitting(true);
        try {
            const res = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data?.success === true) {
                setShowSuccess(true);
                // Clear form data on success
                setCurrentFormData(isFixedDeparture ? {
                    departure_date_id: '', sharing_option_id: '', adults: 1, children: 0, full_name: '', email: '', contact_number: ''
                } : {
                    departure_city: '', travel_date: '', adults: 1, children: 0, hotel_category: '', full_name: '', email: '', contact_number: ''
                });

                setTimeout(() => {
                    setShowSuccess(false);
                    onClose();
                }, 2000);
            } else {
                alert(data?.message || "Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred during submission. Please check your network and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return createPortal(
        <>
            {/* Success Notification (styles copied from original) */}
            {showSuccess && (
                <div 
                    style={{
                        position: 'fixed', top: '20px', right: '20px', zIndex: 1000000, background: 'linear-gradient(135deg, #25d366 0%, #20b358 100%)',
                        color: 'white', padding: '18px 24px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)', display: 'flex', alignItems: 'center', gap: '12px', animation: 'slideInRight 0.4s ease-out', minWidth: '320px', maxWidth: '400px'
                    }}
                >
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                         <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7L5.5 10.5L12 4" stroke="#25d366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: '700', fontSize: '15px', lineHeight: '1.4' }}>
                             Your enquiry has been submitted successfully! We will contact you soon.
                        </p>
                    </div>
                    <button onClick={() => setShowSuccess(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer', padding: '0', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8, transition: 'opacity 0.2s ease' }}>
                        &times;
                    </button>
                </div>
            )}

            {/* Modal Overlay */}
            <div 
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999, padding: '20px', overflowY: 'auto', transform: 'translateZ(0)'
                }}
                onClick={onClose}
            >
                <div 
                    style={{
                        background: 'white', borderRadius: '12px', padding: '24px 28px', width: '100%', maxWidth: '650px', position: 'relative', maxHeight: '95vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)', minWidth: '300px', margin: 'auto', color: '#3b2a1a', animation: 'modalScaleIn 0.3s ease-out'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#f0f0f0'; e.target.style.color = '#3b2a1a'; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#666'; }}
                        style={{
                            position: 'absolute', right: '16px', top: '16px', background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#666', fontWeight: 'bold', padding: 0, width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.3s ease'
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
                        {/* Travel To (Destination) - ALWAYS SHOWN */}
                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '13px' }}>Travel To (Destination)</label>
                            <input 
                                type="text" 
                                value={trip?.title || 'Loading...'} 
                                readOnly 
                                style={{ width: '100%', padding: '10px 12px', border: '2px solid #ddd', borderRadius: '8px', backgroundColor: '#f5f5f5', fontWeight: '600', fontSize: '13px', boxSizing: 'border-box' }} 
                            />
                        </div>

                        {/* CONDITIONAL FIELDS */}
                        {isFixedDeparture 
                            ? <FixedDepartureFields 
                                trip={trip} 
                                currentFormData={currentFormData} 
                                handleChange={handleChange} 
                                totalPriceDisplay={totalPriceDisplay} 
                            /> 
                            : <CustomizedFields 
                                currentFormData={currentFormData} 
                                handleChange={handleChange} 
                            />
                        }

                        {/* SHARED CONTACT FIELDS */}
                        <SharedContactFields currentFormData={currentFormData} handleChange={handleChange} />

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            style={{
                                width: '100%', padding: '14px', background: isSubmitting ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)' : 'linear-gradient(135deg, #25d366 0%, #20b358 100%)',
                                color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1.5px'
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
                @keyframes modalScaleIn {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
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