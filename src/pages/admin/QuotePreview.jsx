import React from 'react';

const QuotePreview = ({ quote, onClose, onExportPDF }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotal = () => {
    return quote.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  return (
    <div className="quote-preview-modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="quote-preview-content" style={{
        background: '#fff',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
      }}>
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>
              Quote Preview
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={onExportPDF}
                style={{
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <i className="fa-solid fa-download"></i>
                Export PDF
              </button>
              <button
                onClick={onClose}
                style={{
                  background: '#f5f5f5',
                  color: '#666',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Quote Content */}
        <div id="quote-content" style={{ padding: '24px' }}>
          {/* Company Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px', padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#1976d2' }}>
              TRAVEL AGENCY
            </h1>
            <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#666' }}>
              Your Trusted Travel Partner
            </p>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '14px', color: '#666' }}>
              <span><i className="fa-solid fa-phone" style={{ marginRight: '6px' }}></i>+1 234 567 8900</span>
              <span><i className="fa-solid fa-envelope" style={{ marginRight: '6px' }}></i>info@travelagency.com</span>
              <span><i className="fa-solid fa-globe" style={{ marginRight: '6px' }}></i>www.travelagency.com</span>
            </div>
          </div>

          {/* Quote Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
                Quote To:
              </h3>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>
                  {quote.leadName}
                </p>
                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666' }}>
                  <i className="fa-solid fa-phone" style={{ marginRight: '6px' }}></i>
                  {quote.leadPhone}
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  <i className="fa-solid fa-map-marker-alt" style={{ marginRight: '6px' }}></i>
                  {quote.destination}
                </p>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
                Quote Details:
              </h3>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Quote ID:</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{quote.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Date:</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                    {formatDate(quote.createdDate)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Valid Until:</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                    {formatDate(quote.validUntil)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Trip Type:</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                    {quote.tripType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
              Trip Details
            </h3>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>
                    {quote.destination}
                  </p>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    {quote.tripType} Package
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#666' }}>
                    Quote Status
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: '#e8f5e9',
                    color: '#43a047',
                    fontWeight: 600,
                    fontSize: '12px'
                  }}>
                    {quote.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Day Wise Itinerary */}
          {quote.days && quote.days.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
                Day Wise Itinerary
              </h3>
              {quote.days.map((day, index) => (
                <div key={index} style={{
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '6px',
                  marginBottom: '12px',
                  borderLeft: '4px solid #1976d2'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1976d2' }}>
                      Day {day.dayNumber}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      {day.date ? formatDate(day.date) : ''}
                    </span>
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <strong>Destination:</strong> {day.destination || 'TBD'}
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <strong>Activities:</strong> {day.activities || 'To be planned'}
                  </div>
                  <div>
                    <strong>Overnight Stay:</strong> {day.overnightStay || 'Yes'}
                  </div>
                </div>
              ))}
            </div>
          )}

                      {/* Quote Items Table */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
                Package Inclusions
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e0e0e0' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0', fontWeight: 600, color: '#1a1a1a' }}>
                      Item Description
                    </th>
                    <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e0e0e0', fontWeight: 600, color: '#1a1a1a' }}>
                      Amount (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quote.items.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>
                        {item.name}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                        ₹{Number(item.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {quote.pricing && (
                    <>
                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>
                          <strong>Per Adult ({quote.pricing.adultCount} × ₹{quote.pricing.perAdultPrice})</strong>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                          ₹{quote.pricing.adultTotal.toLocaleString()}
                        </td>
                      </tr>
                      {quote.pricing.cwobCount > 0 && (
                        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>
                            <strong>Child Without Bed ({quote.pricing.cwobCount} × ₹{quote.pricing.cwobPrice})</strong>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                            ₹{quote.pricing.cwobTotal.toLocaleString()}
                          </td>
                        </tr>
                      )}
                      {quote.pricing.cwbCount > 0 && (
                        <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>
                            <strong>Child With Bed ({quote.pricing.cwbCount} × ₹{quote.pricing.cwbPrice})</strong>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
                            ₹{quote.pricing.cwbTotal.toLocaleString()}
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                  <tr style={{ background: '#f8fafc', borderTop: '2px solid #e0e0e0' }}>
                    <td style={{ padding: '12px', fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>
                      Total Amount
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontSize: '18px', fontWeight: 700, color: '#1976d2' }}>
                      ₹{quote.pricing ? quote.pricing.totalPrice.toLocaleString() : calculateTotal().toLocaleString()}
                    </td>
                  </tr>
                  {quote.pricing && quote.pricing.discountPercent > 0 && (
                    <>
                      <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px', fontSize: '14px', color: '#1a1a1a' }}>
                          <strong>Discount ({quote.pricing.discountPercent}%)</strong>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: 600, color: '#e53935' }}>
                          -₹{quote.pricing.discountAmount.toLocaleString()}
                        </td>
                      </tr>
                      <tr style={{ background: '#e8f5e9', borderTop: '2px solid #e0e0e0' }}>
                        <td style={{ padding: '12px', fontSize: '16px', fontWeight: 700, color: '#1a1a1a' }}>
                          Payable Amount
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', fontSize: '18px', fontWeight: 700, color: '#43a047' }}>
                          ₹{quote.pricing.payablePrice.toLocaleString()}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

          {/* Terms and Conditions */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
              Terms & Conditions
            </h3>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px', fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>This quote is valid until {formatDate(quote.validUntil)}</li>
                <li>Prices are subject to change based on availability</li>
                <li>Booking confirmation requires 50% advance payment</li>
                <li>Cancellation policy applies as per standard terms</li>
                <li>All prices are in INR and include applicable taxes</li>
              </ul>
            </div>
          </div>

          {/* Notes */}
          {quote.notes && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>
                Additional Notes
              </h3>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px', fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                {quote.notes}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid #e0e0e0', marginTop: '32px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>
              Thank you for choosing our services!
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              For any queries, please contact us at info@travelagency.com or call +1 234 567 8900
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePreview; 