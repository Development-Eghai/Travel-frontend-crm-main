import React, { useState } from 'react';

const ComprehensiveQuoteBuilder = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [quoteData, setQuoteData] = useState({
    clientName: 'Santosh',
    destination: '',
    tripType: '',
    totalDays: 1,
    days: [
      {
        dayNumber: 1,
        destination: '',
        date: '',
        activities: '',
        overnightStay: 'Yes'
      }
    ],
    pricing: {
      perAdultPrice: 25000,
      adultCount: 2,
      adultTotal: 50000,
      cwobPrice: 0,
      cwobCount: 0,
      cwobTotal: 0,
      cwbPrice: 0,
      cwbCount: 0,
      cwbTotal: 0,
      totalPrice: 50000,
      discountPercent: 10,
      discountAmount: 5000,
      payablePrice: 45000
    }
  });

  const destinationOptions = [
    'Shimla', 'Manali', 'Delhi', 'Mumbai', 'Goa', 'Kerala', 'Rajasthan',
    'Dubai', 'Switzerland', 'Paris', 'London', 'Rome', 'Bangkok', 'Singapore'
  ];

  const tripTypeOptions = ['Honeymoon', 'Family', 'Solo', 'Group', 'Business'];

  const handleAddDay = () => {
    const newDay = {
      dayNumber: quoteData.days.length + 1,
      destination: '',
      date: '',
      activities: '',
      overnightStay: 'Yes'
    };
    setQuoteData(prev => ({
      ...prev,
      days: [...prev.days, newDay],
      totalDays: prev.days.length + 1
    }));
  };

  const handleDayChange = (dayIndex, field, value) => {
    const updatedDays = quoteData.days.map((day, index) => {
      if (index === dayIndex) {
        return { ...day, [field]: value };
      }
      return day;
    });
    setQuoteData(prev => ({ ...prev, days: updatedDays }));
  };

  const handlePricingChange = (field, value) => {
    const newPricing = { ...quoteData.pricing, [field]: value };
    
    // Recalculate totals
    newPricing.adultTotal = newPricing.perAdultPrice * newPricing.adultCount;
    newPricing.cwobTotal = newPricing.cwobPrice * newPricing.cwobCount;
    newPricing.cwbTotal = newPricing.cwbPrice * newPricing.cwbCount;
    newPricing.totalPrice = newPricing.adultTotal + newPricing.cwobTotal + newPricing.cwbTotal;
    newPricing.discountAmount = (newPricing.totalPrice * newPricing.discountPercent) / 100;
    newPricing.payablePrice = newPricing.totalPrice - newPricing.discountAmount;
    
    setQuoteData(prev => ({ ...prev, pricing: newPricing }));
  };

  const handleBasicInfoChange = (field, value) => {
    setQuoteData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="comprehensive-quote-builder" style={{ padding: '2rem', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
          Comprehensive Quote Builder
        </h1>
        <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
          Create detailed quotes with day-wise itineraries and pricing breakdown
        </p>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', height: 'calc(100vh - 200px)' }}>
        
        {/* Left Section: Day Wise Itinerary */}
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {/* Section Header */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Day Wise Itinerary</h2>
          </div>

          {/* Itinerary Content */}
          <div style={{ padding: '1.5rem', height: 'calc(100% - 80px)', overflowY: 'auto' }}>
            {/* Basic Info */}
            <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Client Name</label>
                  <input
                    type="text"
                    value={quoteData.clientName}
                    onChange={e => handleBasicInfoChange('clientName', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Trip Type</label>
                  <select
                    value={quoteData.tripType}
                    onChange={e => handleBasicInfoChange('tripType', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Trip Type</option>
                    {tripTypeOptions.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Days */}
            {quoteData.days.map((day, dayIndex) => (
              <div key={dayIndex} style={{
                background: '#fafbfc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{
                    background: '#1976d2',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '14px',
                    marginRight: '1rem'
                  }}>
                    Day {day.dayNumber}
                  </div>
                  <input
                    type="text"
                    value={day.destination}
                    onChange={e => handleDayChange(dayIndex, 'destination', e.target.value)}
                    placeholder="Destination"
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px',
                      marginRight: '1rem'
                    }}
                  />
                  <input
                    type="date"
                    value={day.date}
                    onChange={e => handleDayChange(dayIndex, 'date', e.target.value)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <textarea
                  value={day.activities}
                  onChange={e => handleDayChange(dayIndex, 'activities', e.target.value)}
                  placeholder="Describe the day's activities..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    marginBottom: '1rem',
                    resize: 'vertical'
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, marginRight: '0.5rem' }}>Overnight Stay:</span>
                  <select
                    value={day.overnightStay}
                    onChange={e => handleDayChange(dayIndex, 'overnightStay', e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            ))}

            <button
              onClick={handleAddDay}
              style={{
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
              Add Day
            </button>
          </div>
        </div>

        {/* Right Section: Quotation Price */}
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {/* Section Header */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Quotation Price</h2>
          </div>

          {/* Pricing Content */}
          <div style={{ padding: '1.5rem', height: 'calc(100% - 80px)', overflowY: 'auto' }}>
            {/* Per Adult Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
                Per Adult Price (₹)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="number"
                  value={quoteData.pricing.perAdultPrice}
                  onChange={e => handlePricingChange('perAdultPrice', Number(e.target.value))}
                  style={{
                    width: '120px',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handlePricingChange('adultCount', Math.max(0, quoteData.pricing.adultCount - 1))}
                    style={{
                      background: '#f5f5f5',
                      border: '1px solid #ccc',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>
                    {quoteData.pricing.adultCount}
                  </span>
                  <button
                    onClick={() => handlePricingChange('adultCount', quoteData.pricing.adultCount + 1)}
                    style={{
                      background: '#f5f5f5',
                      border: '1px solid #ccc',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                <input
                  type="number"
                  value={quoteData.pricing.adultTotal}
                  readOnly
                  style={{
                    width: '120px',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: '#f8f9fa'
                  }}
                />
              </div>
            </div>

            {/* CWOB Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
                CWOB (₹) - Child Without Bed
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="number"
                  value={quoteData.pricing.cwobPrice}
                  onChange={e => handlePricingChange('cwobPrice', Number(e.target.value))}
                  style={{
                    width: '120px',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handlePricingChange('cwobCount', Math.max(0, quoteData.pricing.cwobCount - 1))}
                    style={{
                      background: '#f5f5f5',
                      border: '1px solid #ccc',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>
                    {quoteData.pricing.cwobCount}
                  </span>
                  <button
                    onClick={() => handlePricingChange('cwobCount', quoteData.pricing.cwobCount + 1)}
                    style={{
                      background: '#f5f5f5',
                      border: '1px solid #ccc',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                <input
                  type="number"
                  value={quoteData.pricing.cwobTotal}
                  readOnly
                  style={{
                    width: '120px',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: '#f8f9fa'
                  }}
                />
              </div>
            </div>

            {/* CWB Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
                CWB (₹) - Child With Bed
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="number"
                  value={quoteData.pricing.cwbPrice}
                  onChange={e => handlePricingChange('cwbPrice', Number(e.target.value))}
                  style={{
                    width: '120px',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handlePricingChange('cwbCount', Math.max(0, quoteData.pricing.cwbCount - 1))}
                    style={{
                      background: '#f5f5f5',
                      border: '1px solid #ccc',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>
                    {quoteData.pricing.cwbCount}
                  </span>
                  <button
                    onClick={() => handlePricingChange('cwbCount', quoteData.pricing.cwbCount + 1)}
                    style={{
                      background: '#f5f5f5',
                      border: '1px solid #ccc',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>
                <input
                  type="number"
                  value={quoteData.pricing.cwbTotal}
                  readOnly
                  style={{
                    width: '120px',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: '#f8f9fa'
                  }}
                />
              </div>
            </div>

            {/* Total Price */}
            <div style={{ 
              marginBottom: '1.5rem', 
              padding: '1rem', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 600, fontSize: '16px' }}>Total Quotation Price (₹)</span>
                <span style={{ fontWeight: 700, fontSize: '18px', color: '#1976d2' }}>
                  ₹{quoteData.pricing.totalPrice.toLocaleString()}
                </span>
              </div>

              {/* Discount */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Discount(-) (₹)</span>
                <input
                  type="number"
                  value={quoteData.pricing.discountPercent}
                  onChange={e => handlePricingChange('discountPercent', Number(e.target.value))}
                  style={{
                    width: '80px',
                    padding: '6px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <span style={{ fontSize: '14px' }}>%</span>
                <input
                  type="number"
                  value={quoteData.pricing.discountAmount}
                  readOnly
                  style={{
                    width: '120px',
                    padding: '6px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: '#f8f9fa'
                  }}
                />
              </div>

              {/* Payable Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '16px' }}>Payable Price (₹)</span>
                <span style={{ fontWeight: 700, fontSize: '20px', color: '#43a047' }}>
                  ₹{quoteData.pricing.payablePrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                style={{
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px',
                  flex: 1
                }}
              >
                Generate Quote
              </button>
              <button
                style={{
                  background: '#f5f5f5',
                  color: '#666',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px',
                  flex: 1
                }}
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveQuoteBuilder; 