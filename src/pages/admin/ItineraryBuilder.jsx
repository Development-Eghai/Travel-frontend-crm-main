import React, { useState } from 'react';

const ItineraryBuilder = () => {
  const [itineraries, setItineraries] = useState([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [currentItinerary, setCurrentItinerary] = useState({
    title: '',
    leadName: '',
    leadPhone: '',
    totalDays: 1,
    days: [
      {
        dayNumber: 1,
        destination: '',
        date: '',
        activities: '',
        overnightStay: 'Yes'
      }
    ]
  });

  const destinationOptions = [
    'Manali', 'Shimla', 'Delhi', 'Mumbai', 'Goa', 'Kerala', 'Rajasthan',
    'Dubai', 'Switzerland', 'Paris', 'London', 'Rome', 'Bangkok', 'Singapore'
  ];

  const handleAddDay = () => {
    const newDay = {
      dayNumber: currentItinerary.days.length + 1,
      destination: '',
      date: '',
      activities: '',
      overnightStay: 'Yes'
    };
    setCurrentItinerary(prev => ({
      ...prev,
      days: [...prev.days, newDay],
      totalDays: prev.days.length + 1
    }));
  };

  const handleRemoveDay = (dayIndex) => {
    if (currentItinerary.days.length > 1) {
      const updatedDays = currentItinerary.days.filter((_, index) => index !== dayIndex);
      const renumberedDays = updatedDays.map((day, index) => ({
        ...day,
        dayNumber: index + 1
      }));
      setCurrentItinerary(prev => ({
        ...prev,
        days: renumberedDays,
        totalDays: renumberedDays.length
      }));
    }
  };

  const handleDayChange = (dayIndex, field, value) => {
    const updatedDays = currentItinerary.days.map((day, index) => {
      if (index === dayIndex) {
        return { ...day, [field]: value };
      }
      return day;
    });
    setCurrentItinerary(prev => ({ ...prev, days: updatedDays }));
  };

  const handleInputChange = (field, value) => {
    setCurrentItinerary(prev => ({ ...prev, [field]: value }));
  };

  const saveItinerary = () => {
    const itineraryData = {
      id: `IT${(itineraries.length + 1).toString().padStart(3, '0')}`,
      ...currentItinerary,
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'Draft'
    };
    setItineraries([itineraryData, ...itineraries]);
    setShowBuilder(false);
    setCurrentItinerary({
      title: '',
      leadName: '',
      leadPhone: '',
      totalDays: 1,
      days: [
        {
          dayNumber: 1,
          destination: '',
          date: '',
          activities: '',
          overnightStay: 'Yes'
        }
      ]
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="itinerary-builder-page" style={{ padding: '2rem', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Top Navigation Tabs */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0', background: '#fff', borderRadius: '8px', padding: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: 'fit-content' }}>
          <button 
            onClick={() => setShowBuilder(false)}
            style={{ 
              background: !showBuilder ? '#1976d2' : 'transparent', 
              color: !showBuilder ? '#fff' : '#666', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '6px', 
              fontWeight: 600, 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            Itinerary Builder
          </button>
          <button 
            onClick={() => setShowBuilder(true)}
            style={{ 
              background: showBuilder ? '#1976d2' : 'transparent', 
              color: showBuilder ? '#fff' : '#666', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '6px', 
              fontWeight: 600, 
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            Create Itinerary
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
          {showBuilder ? 'Create New Itinerary' : 'Itinerary Builder'}
        </h1>
        <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
          {showBuilder 
            ? 'Plan detailed day-by-day travel itineraries for your clients.' 
            : 'Manage and organize travel itineraries with detailed daily plans.'
          }
        </p>
      </div>

      {!showBuilder ? (
        /* Itineraries List View */
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {/* Section Header */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>All Itineraries</h2>
            <button 
              onClick={() => setShowBuilder(true)}
              style={{ 
                background: '#1976d2', 
                color: '#fff', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                fontWeight: 600, 
                cursor: 'pointer',
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <i className="fa-solid fa-plus"></i>
              Create Itinerary
            </button>
          </div>

          {/* Itineraries Table */}
          <div style={{ padding: '1.5rem' }}>
            {itineraries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
                <i className="fa-solid fa-route" style={{ fontSize: 48, marginBottom: '1rem', color: '#ccc' }}></i>
                <h3 style={{ marginBottom: '0.5rem', color: '#666' }}>No Itineraries Yet</h3>
                <p style={{ marginBottom: '1.5rem', color: '#999' }}>Create your first travel itinerary to get started.</p>
                <button 
                  onClick={() => setShowBuilder(true)}
                  style={{ 
                    background: '#1976d2', 
                    color: '#fff', 
                    border: 'none', 
                    padding: '12px 24px', 
                    borderRadius: '6px', 
                    fontWeight: 600, 
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  Create First Itinerary
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {itineraries.map((itinerary) => (
                  <div key={itinerary.id} style={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    background: '#fafbfc'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>
                          {itinerary.title || `Itinerary ${itinerary.id}`}
                        </h3>
                        <p style={{ margin: '0 0 0.25rem 0', fontSize: '14px', color: '#666' }}>
                          <i className="fa-solid fa-user" style={{ marginRight: '6px' }}></i>
                          {itinerary.leadName}
                        </p>
                        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                          <i className="fa-solid fa-calendar" style={{ marginRight: '6px' }}></i>
                          {itinerary.totalDays} days • Created {formatDate(itinerary.createdAt)}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{
                          background: '#f5f5f5',
                          color: '#666',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 500
                        }}>
                          <i className="fa-solid fa-eye" style={{ marginRight: '4px' }}></i>
                          View
                        </button>
                        <button style={{
                          background: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 500
                        }}>
                          <i className="fa-solid fa-download" style={{ marginRight: '4px' }}></i>
                          Export
                        </button>
                      </div>
                    </div>
                    
                    {/* Quick Day Preview */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {itinerary.days.slice(0, 3).map((day) => (
                        <div key={day.dayNumber} style={{
                          background: '#fff',
                          border: '1px solid #e0e0e0',
                          borderRadius: '4px',
                          padding: '0.5rem',
                          fontSize: '12px',
                          color: '#666'
                        }}>
                          <strong>Day {day.dayNumber}:</strong> {day.destination || 'TBD'}
                        </div>
                      ))}
                      {itinerary.days.length > 3 && (
                        <div style={{
                          background: '#f0f0f0',
                          borderRadius: '4px',
                          padding: '0.5rem',
                          fontSize: '12px',
                          color: '#666'
                        }}>
                          +{itinerary.days.length - 3} more days
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Itinerary Builder Form */
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Create New Itinerary</h2>
            <button 
              onClick={() => setShowBuilder(false)}
              style={{ 
                background: '#f5f5f5', 
                color: '#666', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                fontWeight: 500, 
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Back to Itineraries
            </button>
          </div>

          <form onSubmit={e => { e.preventDefault(); saveItinerary(); }}>
            {/* Basic Information */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1976d2', marginBottom: '1rem' }}>Basic Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Itinerary Title</label>
                  <input
                    type="text"
                    value={currentItinerary.title}
                    onChange={e => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Honeymoon in Manali"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Client Name</label>
                  <input
                    type="text"
                    value={currentItinerary.leadName}
                    onChange={e => handleInputChange('leadName', e.target.value)}
                    placeholder="Client name"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Client Phone</label>
                  <input
                    type="tel"
                    value={currentItinerary.leadPhone}
                    onChange={e => handleInputChange('leadPhone', e.target.value)}
                    placeholder="Phone number"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Daily Itinerary */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1976d2', margin: 0 }}>Daily Itinerary</h3>
                <button
                  type="button"
                  onClick={handleAddDay}
                  style={{
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '4px' }}></i>
                  Add Day
                </button>
              </div>

              {currentItinerary.days.map((day, dayIndex) => (
                <div key={dayIndex} style={{
                  background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  border: '1px solid #e8eaff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      background: '#1976d2',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '14px',
                      marginRight: '1rem'
                    }}>
                      Day {day.dayNumber}
                    </div>
                    {currentItinerary.days.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDay(dayIndex)}
                        style={{
                          background: '#e53935',
                          color: '#fff',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                        title="Remove Day"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Destination</label>
                      <select
                        value={day.destination}
                        onChange={e => handleDayChange(dayIndex, 'destination', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          background: '#fff'
                        }}
                      >
                        <option value="">Select Destination</option>
                        {destinationOptions.map(dest => (
                          <option key={dest} value={dest}>{dest}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Date</label>
                      <input
                        type="date"
                        value={day.date}
                        onChange={e => handleDayChange(dayIndex, 'date', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          background: '#fff'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Overnight Stay</label>
                      <select
                        value={day.overnightStay}
                        onChange={e => handleDayChange(dayIndex, 'overnightStay', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          background: '#fff'
                        }}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '14px' }}>Daily Activities</label>
                    <textarea
                      value={day.activities}
                      onChange={e => handleDayChange(dayIndex, 'activities', e.target.value)}
                      placeholder="Describe the day's activities, sightseeing, meals, etc."
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#fff',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowBuilder(false)}
                style={{
                  background: '#f5f5f5',
                  color: '#666',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Save Itinerary
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ItineraryBuilder; 