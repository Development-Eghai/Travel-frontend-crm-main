// PDF Export Utility
// Note: This requires jsPDF and html2canvas libraries to be installed
// Run: npm install jspdf html2canvas

import html2pdf from 'html2pdf.js';

export const exportQuoteToPDF = async (quoteData) => {
  try {
    // Dynamic import to avoid SSR issues
    const jsPDF = (await import('jspdf')).default;
    const html2canvas = (await import('html2canvas')).default;

    const element = document.getElementById('quote-content');
    if (!element) {
      throw new Error('Quote content element not found');
    }

    // Create canvas from the quote content
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add image to PDF
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(`Quote_${quoteData.id}_${quoteData.leadName.replace(/\s+/g, '_')}.pdf`);
    
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    return false;
  }
};

export const exportQuoteToPDF_html2pdf = (elementOrHtml, fileName = 'Travel_Quotation.pdf') => {
  let element;
  if (typeof elementOrHtml === 'string') {
    // Create a temporary element to hold the HTML string
    element = document.createElement('div');
    element.innerHTML = elementOrHtml;
    document.body.appendChild(element);
  } else {
    element = elementOrHtml;
  }
  html2pdf()
    .set({
      margin: 0.5,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    })
    .from(element)
    .save()
    .then(() => {
      if (typeof elementOrHtml === 'string') {
        document.body.removeChild(element);
      }
    });
};

// Helper: Travel banner image (royalty-free Unsplash)
const travelBanner = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80';
const airplaneIcon = '✈️';
const hotelIcon = '🏨';
const mapIcon = '🗺️';
const palmIcon = '🌴';
const sunIcon = '☀️';

// Unique travel banner images for each template
const bannerClassic = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80';
const bannerModern = 'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=900&q=80';
const bannerElegant = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80';
const bannerMinimalist = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80';
const bannerBold = 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=900&q=80';
const dayImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', // Beach
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', // Mountain
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', // City
  'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80', // Forest
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', // Lake
];

// Classic PDF template (now with banner)
export const generateSimplePDF = (quoteData, returnHTML = false) => {
  const html = `
    <html><head><title>Classic Quote</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; background: #f8fafc; }
      .banner { width: 100%; border-radius: 12px; margin-bottom: 24px; }
      .header { text-align: center; color: #1976d2; font-size: 28px; font-weight: bold; margin-bottom: 20px; }
      .section { background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #1976d220; margin-bottom: 24px; padding: 24px; }
      .section-title { color: #1976d2; font-size: 20px; font-weight: 600; margin-bottom: 12px; }
      .info-row { display: flex; gap: 32px; margin-bottom: 12px; }
      .info-label { color: #888; font-weight: 500; min-width: 120px; }
      .info-value { color: #222; font-weight: 600; }
      .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
      .table th, .table td { border: 1px solid #e0e0e0; padding: 10px; text-align: left; }
      .table th { background: #e3f2fd; color: #1976d2; }
      .total-row { background: #f8fafc; font-weight: bold; }
      .itinerary-day { margin-bottom: 16px; padding: 12px; background: #e3f2fd; border-radius: 6px; display: flex; align-items: center; }
      .itinerary-img { width: 48px; height: 48px; object-fit: cover; border-radius: 8px; margin-right: 16px; }
      .itinerary-day-title { color: #1976d2; font-weight: 600; font-size: 16px; }
    </style>
    </head><body>
      <img class="banner" src="${bannerClassic}" alt="Travel Banner" />
      <div class="header">${airplaneIcon} Travel Quotation (Classic Template)</div>
      <div class="section">
        <div class="section-title">${mapIcon} Lead Information</div>
        <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${quoteData.leadName}</span></div>
        <div class="info-row"><span class="info-label">Phone:</span><span class="info-value">${quoteData.leadPhone}</span></div>
        <div class="info-row"><span class="info-label">Destination:</span><span class="info-value">${quoteData.destination}</span></div>
        <div class="info-row"><span class="info-label">Trip Type:</span><span class="info-value">${quoteData.tripType}</span></div>
      </div>
      <div class="section">
        <div class="section-title">${hotelIcon} Quote Items</div>
        <table class="table">
          <thead><tr><th>Item</th><th>Amount (₹)</th></tr></thead>
          <tbody>
            ${quoteData.items.filter(item => item.name && item.amount !== '').map(item => `<tr><td>${item.name}</td><td>₹${Number(item.amount).toLocaleString()}</td></tr>`).join('')}
            <tr class="total-row"><td>Total</td><td>₹${quoteData.items.filter(item => item.name && item.amount !== '').reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toLocaleString()}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <div class="section-title">${palmIcon} Day-wise Itinerary</div>
        ${quoteData.days && quoteData.days.length > 0 ? quoteData.days.map((day, idx) => `
          <div class="itinerary-day">
            <img class="itinerary-img" src="${dayImages[idx % dayImages.length]}" alt="Itinerary" />
            <div>
              <div class="itinerary-day-title">Day ${day.dayNumber}: ${day.destination || ''} ${day.date ? '(' + day.date + ')' : ''}</div>
              <div><b>Activities:</b> ${day.activities || ''}</div>
              <div><b>Overnight Stay:</b> ${day.overnightStay || ''}</div>
            </div>
          </div>
        `).join('') : '<div>No itinerary added.</div>'}
      </div>
      <div class="section">
        <div class="section-title">${sunIcon} Pricing</div>
        <table class="table">
          <tbody>
            <tr><td>Per Adult Price</td><td>₹${quoteData.pricing.perAdultPrice || 0}</td></tr>
            <tr><td>Adults</td><td>${quoteData.pricing.adultCount || 0}</td></tr>
            ${quoteData.pricing.cwobPrice !== '' && quoteData.pricing.cwobCount > 0 ? `<tr><td>Child Without Bed</td><td>₹${quoteData.pricing.cwobPrice} × ${quoteData.pricing.cwobCount}</td></tr>` : ''}
            ${quoteData.pricing.cwbPrice !== '' && quoteData.pricing.cwbCount > 0 ? `<tr><td>Child With Bed</td><td>₹${quoteData.pricing.cwbPrice} × ${quoteData.pricing.cwbCount}</td></tr>` : ''}
            ${quoteData.pricing.discountPercent !== '' && Number(quoteData.pricing.discountPercent) > 0 ? `<tr><td>Discount (%)</td><td>${quoteData.pricing.discountPercent}</td></tr>` : ''}
            <tr class="total-row"><td>Total</td><td>₹${quoteData.pricing.totalPrice ? quoteData.pricing.totalPrice.toLocaleString() : 0}</td></tr>
            <tr class="total-row"><td>Payable</td><td>₹${quoteData.pricing.payablePrice ? quoteData.pricing.payablePrice.toLocaleString() : 0}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Notes</div>
        <div>${quoteData.notes || ''}</div>
      </div>
    </body></html>
  `;
  if (returnHTML) return html;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 500);
};

// Modern PDF template
export const generateModernPDF = (quoteData, returnHTML = false) => {
  const html = `
    <html><head><title>Modern Quote</title>
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; background: #f4f8fb; }
      .header { text-align: left; color: #1976d2; font-size: 28px; font-weight: bold; margin-bottom: 20px; }
      .section { background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #1976d220; margin-bottom: 24px; padding: 24px; }
      .section-title { color: #1976d2; font-size: 20px; font-weight: 600; margin-bottom: 12px; }
      .info-row { display: flex; gap: 32px; margin-bottom: 12px; }
      .info-label { color: #888; font-weight: 500; min-width: 120px; }
      .info-value { color: #222; font-weight: 600; }
      .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
      .table th, .table td { border: 1px solid #e0e0e0; padding: 10px; text-align: left; }
      .table th { background: #e3f2fd; color: #1976d2; }
      .total-row { background: #f8fafc; font-weight: bold; }
      .itinerary-day { margin-bottom: 16px; padding: 12px; background: #e3f2fd; border-radius: 6px; display: flex; align-items: center; }
      .itinerary-img { width: 48px; height: 48px; object-fit: cover; border-radius: 8px; margin-right: 16px; }
      .itinerary-day-title { color: #1976d2; font-weight: 600; font-size: 16px; }
    </style>
    </head><body>
      <div class="header">Quotation (Modern Template)</div>
      <div class="section">
        <div class="section-title">Lead Information</div>
        <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${quoteData.leadName}</span></div>
        <div class="info-row"><span class="info-label">Phone:</span><span class="info-value">${quoteData.leadPhone}</span></div>
        <div class="info-row"><span class="info-label">Destination:</span><span class="info-value">${quoteData.destination}</span></div>
        <div class="info-row"><span class="info-label">Trip Type:</span><span class="info-value">${quoteData.tripType}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Quote Items</div>
        <table class="table">
          <thead><tr><th>Item</th><th>Amount (₹)</th></tr></thead>
          <tbody>
            ${quoteData.items.map(item => `<tr><td>${item.name}</td><td>₹${Number(item.amount).toLocaleString()}</td></tr>`).join('')}
            <tr class="total-row"><td>Total</td><td>₹${quoteData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toLocaleString()}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Day-wise Itinerary</div>
        ${quoteData.days && quoteData.days.length > 0 ? quoteData.days.map((day, idx) => `
          <div class="itinerary-day">
            <img class="itinerary-img" src="${dayImages[idx % dayImages.length]}" alt="Itinerary" />
            <div>
              <div class="itinerary-day-title">Day ${day.dayNumber}: ${day.destination || ''} (${day.date || ''})</div>
              <div><b>Activities:</b> ${day.activities || ''}</div>
              <div><b>Overnight Stay:</b> ${day.overnightStay || ''}</div>
            </div>
          </div>
        `).join('') : '<div>No itinerary added.</div>'}
      </div>
      <div class="section">
        <div class="section-title">Pricing</div>
        <table class="table">
          <tbody>
            <tr><td>Per Adult Price</td><td>₹${quoteData.pricing.perAdultPrice || 0}</td></tr>
            <tr><td>Adults</td><td>${quoteData.pricing.adultCount || 0}</td></tr>
            ${quoteData.pricing.cwobPrice !== '' && quoteData.pricing.cwobCount > 0 ? `<tr><td>Child Without Bed</td><td>₹${quoteData.pricing.cwobPrice} × ${quoteData.pricing.cwobCount}</td></tr>` : ''}
            ${quoteData.pricing.cwbPrice !== '' && quoteData.pricing.cwbCount > 0 ? `<tr><td>Child With Bed</td><td>₹${quoteData.pricing.cwbPrice} × ${quoteData.pricing.cwbCount}</td></tr>` : ''}
            ${quoteData.pricing.discountPercent !== '' && Number(quoteData.pricing.discountPercent) > 0 ? `<tr><td>Discount (%)</td><td>${quoteData.pricing.discountPercent}</td></tr>` : ''}
            <tr class="total-row"><td>Total</td><td>₹${quoteData.pricing.totalPrice ? quoteData.pricing.totalPrice.toLocaleString() : 0}</td></tr>
            <tr class="total-row"><td>Payable</td><td>₹${quoteData.pricing.payablePrice ? quoteData.pricing.payablePrice.toLocaleString() : 0}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Notes</div>
        <div>${quoteData.notes || ''}</div>
      </div>
    </body></html>
  `;
  if (returnHTML) return html;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 500);
};

// Elegant PDF template
export const generateElegantPDF = (quoteData, returnHTML = false) => {
  const html = `
    <html><head><title>Elegant Quote</title>
    <style>
      body { font-family: 'Georgia', serif; margin: 40px; background: #fff; color: #222; }
      .header { text-align: center; color: #444; font-size: 32px; font-weight: bold; margin-bottom: 30px; letter-spacing: 2px; }
      .section { border-left: 6px solid #43a047; margin-bottom: 32px; padding: 20px 32px; background: #f9f9f9; border-radius: 0 12px 12px 0; }
      .section-title { color: #43a047; font-size: 22px; font-weight: 700; margin-bottom: 16px; }
      .info-row { margin-bottom: 10px; }
      .info-label { color: #888; font-weight: 500; min-width: 120px; display: inline-block; }
      .info-value { color: #222; font-weight: 600; }
      .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
      .table th, .table td { border: 1px solid #d0d0d0; padding: 10px; text-align: left; }
      .table th { background: #e8f5e9; color: #43a047; }
      .total-row { background: #e8f5e9; font-weight: bold; }
      .itinerary-day { margin-bottom: 18px; padding: 14px; background: #fff; border-radius: 8px; border: 1px solid #e0e0e0; display: flex; align-items: center; }
      .itinerary-img { width: 48px; height: 48px; object-fit: cover; border-radius: 8px; margin-right: 16px; }
      .itinerary-day-title { color: #43a047; font-weight: 700; font-size: 17px; }
    </style>
    </head><body>
      <div class="header">Travel Quotation (Elegant Template)</div>
      <div class="section">
        <div class="section-title">Client Details</div>
        <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${quoteData.leadName}</span></div>
        <div class="info-row"><span class="info-label">Phone:</span><span class="info-value">${quoteData.leadPhone}</span></div>
        <div class="info-row"><span class="info-label">Destination:</span><span class="info-value">${quoteData.destination}</span></div>
        <div class="info-row"><span class="info-label">Trip Type:</span><span class="info-value">${quoteData.tripType}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Quotation Items</div>
        <table class="table">
          <thead><tr><th>Item</th><th>Amount (₹)</th></tr></thead>
          <tbody>
            ${quoteData.items.map(item => `<tr><td>${item.name}</td><td>₹${Number(item.amount).toLocaleString()}</td></tr>`).join('')}
            <tr class="total-row"><td>Total</td><td>₹${quoteData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toLocaleString()}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Itinerary</div>
        ${quoteData.days && quoteData.days.length > 0 ? quoteData.days.map((day, idx) => `
          <div class="itinerary-day">
            <img class="itinerary-img" src="${dayImages[idx % dayImages.length]}" alt="Itinerary" />
            <div>
              <div class="itinerary-day-title">Day ${day.dayNumber}: ${day.destination || ''} (${day.date || ''})</div>
              <div><b>Activities:</b> ${day.activities || ''}</div>
              <div><b>Overnight Stay:</b> ${day.overnightStay || ''}</div>
            </div>
          </div>
        `).join('') : '<div>No itinerary added.</div>'}
      </div>
      <div class="section">
        <div class="section-title">Pricing Summary</div>
        <table class="table">
          <tbody>
            <tr><td>Per Adult Price</td><td>₹${quoteData.pricing.perAdultPrice || 0}</td></tr>
            <tr><td>Adults</td><td>${quoteData.pricing.adultCount || 0}</td></tr>
            ${quoteData.pricing.cwobPrice !== '' && quoteData.pricing.cwobCount > 0 ? `<tr><td>Child Without Bed</td><td>₹${quoteData.pricing.cwobPrice} × ${quoteData.pricing.cwobCount}</td></tr>` : ''}
            ${quoteData.pricing.cwbPrice !== '' && quoteData.pricing.cwbCount > 0 ? `<tr><td>Child With Bed</td><td>₹${quoteData.pricing.cwbPrice} × ${quoteData.pricing.cwbCount}</td></tr>` : ''}
            ${quoteData.pricing.discountPercent !== '' && Number(quoteData.pricing.discountPercent) > 0 ? `<tr><td>Discount (%)</td><td>${quoteData.pricing.discountPercent}</td></tr>` : ''}
            <tr class="total-row"><td>Total</td><td>₹${quoteData.pricing.totalPrice ? quoteData.pricing.totalPrice.toLocaleString() : 0}</td></tr>
            <tr class="total-row"><td>Payable</td><td>₹${quoteData.pricing.payablePrice ? quoteData.pricing.payablePrice.toLocaleString() : 0}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Notes</div>
        <div>${quoteData.notes || ''}</div>
      </div>
    </body></html>
  `;
  if (returnHTML) return html;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 500);
}; 

// Minimalist PDF template
export const generateMinimalistPDF = (quoteData, returnHTML = false) => {
  const html = `
    <html><head><title>Minimalist Quote</title>
    <style>
      body { font-family: 'Inter', Arial, sans-serif; margin: 40px; background: #fff; color: #222; }
      .header { text-align: left; color: #222; font-size: 28px; font-weight: 700; margin-bottom: 24px; letter-spacing: 1px; }
      .section { margin-bottom: 28px; }
      .section-title { color: #888; font-size: 16px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 2px; }
      .info-row { margin-bottom: 6px; }
      .info-label { color: #888; font-weight: 500; min-width: 120px; display: inline-block; }
      .info-value { color: #222; font-weight: 600; }
      .table { width: 100%; border-collapse: collapse; margin-top: 8px; }
      .table th, .table td { border: none; padding: 8px 0; text-align: left; }
      .table th { color: #888; font-weight: 600; text-transform: uppercase; font-size: 13px; }
      .total-row { font-weight: bold; border-top: 1px solid #eee; }
      .itinerary-day { margin-bottom: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; }
      .itinerary-img { width: 48px; height: 48px; object-fit: cover; border-radius: 8px; margin-right: 16px; }
      .itinerary-day-title { color: #222; font-weight: 600; font-size: 15px; }
    </style>
    </head><body>
      <div class="header">Quotation</div>
      <div class="section">
        <div class="section-title">Lead Info</div>
        <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${quoteData.leadName}</span></div>
        <div class="info-row"><span class="info-label">Phone:</span><span class="info-value">${quoteData.leadPhone}</span></div>
        <div class="info-row"><span class="info-label">Destination:</span><span class="info-value">${quoteData.destination}</span></div>
        <div class="info-row"><span class="info-label">Trip Type:</span><span class="info-value">${quoteData.tripType}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Quote Items</div>
        <table class="table">
          <thead><tr><th>Item</th><th>Amount (₹)</th></tr></thead>
          <tbody>
            ${quoteData.items.map(item => `<tr><td>${item.name}</td><td>₹${Number(item.amount).toLocaleString()}</td></tr>`).join('')}
            <tr class="total-row"><td>Total</td><td>₹${quoteData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toLocaleString()}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Itinerary</div>
        ${quoteData.days && quoteData.days.length > 0 ? quoteData.days.map((day, idx) => `
          <div class="itinerary-day">
            <img class="itinerary-img" src="${dayImages[idx % dayImages.length]}" alt="Itinerary" />
            <div>
              <div class="itinerary-day-title">Day ${day.dayNumber}: ${day.destination || ''} (${day.date || ''})</div>
              <div><b>Activities:</b> ${day.activities || ''}</div>
              <div><b>Overnight Stay:</b> ${day.overnightStay || ''}</div>
            </div>
          </div>
        `).join('') : '<div>No itinerary added.</div>'}
      </div>
      <div class="section">
        <div class="section-title">Pricing</div>
        <table class="table">
          <tbody>
            <tr><td>Per Adult Price</td><td>₹${quoteData.pricing.perAdultPrice || 0}</td></tr>
            <tr><td>Adults</td><td>${quoteData.pricing.adultCount || 0}</td></tr>
            ${quoteData.pricing.cwobPrice !== '' && quoteData.pricing.cwobCount > 0 ? `<tr><td>Child Without Bed</td><td>₹${quoteData.pricing.cwobPrice} × ${quoteData.pricing.cwobCount}</td></tr>` : ''}
            ${quoteData.pricing.cwbPrice !== '' && quoteData.pricing.cwbCount > 0 ? `<tr><td>Child With Bed</td><td>₹${quoteData.pricing.cwbPrice} × ${quoteData.pricing.cwbCount}</td></tr>` : ''}
            ${quoteData.pricing.discountPercent !== '' && Number(quoteData.pricing.discountPercent) > 0 ? `<tr><td>Discount (%)</td><td>${quoteData.pricing.discountPercent}</td></tr>` : ''}
            <tr class="total-row"><td>Total</td><td>₹${quoteData.pricing.totalPrice ? quoteData.pricing.totalPrice.toLocaleString() : 0}</td></tr>
            <tr class="total-row"><td>Payable</td><td>₹${quoteData.pricing.payablePrice ? quoteData.pricing.payablePrice.toLocaleString() : 0}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Notes</div>
        <div>${quoteData.notes || ''}</div>
      </div>
    </body></html>
  `;
  if (returnHTML) return html;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 500);
};

export const generateTravelMagazinePDF = (quoteData, returnHTML = false) => {
  const today = new Date().toLocaleDateString('en-US');
  const travelDates = quoteData.days && quoteData.days.length > 0
    ? `${quoteData.days[0].date || ''} - ${quoteData.days[quoteData.days.length-1].date || ''}`
    : '';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: white; padding: 20px;">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #1976d2, #1565c0); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
        <div style="font-size: 28px; font-weight: bold; margin-bottom: 5px;">TRAVEL QUOTATION</div>
        <div style="font-size: 14px; opacity: 0.9;">Quote Date: ${today}</div>
      </div>

      <!-- Summary Card -->
      <div style="background: #f8f9fa; border: 2px solid #1976d2; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="flex: 1;">
            <div style="margin-bottom: 8px;"><span style="color: #1976d2; font-weight: bold;">Prepared For:</span> <span style="font-weight: 600;">${quoteData.leadName || ''}</span></div>
            <div style="margin-bottom: 8px;"><span style="color: #1976d2; font-weight: bold;">Destination:</span> <span style="font-weight: 600;">${quoteData.destination || ''}</span></div>
            <div><span style="color: #1976d2; font-weight: bold;">Travel Dates:</span> <span style="font-weight: 600;">${travelDates}</span></div>
          </div>
          <div style="width: 80px; height: 60px; background: #1976d2; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
            LOGO
          </div>
        </div>
      </div>

      <!-- Quotation Details -->
      <div style="background: white; border: 2px solid #1976d2; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
        <div style="color: #1976d2; font-size: 18px; font-weight: bold; margin-bottom: 15px;">Quotation Details</div>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="background: #1976d2; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Rate</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${quoteData.items.filter(item => item.name && item.amount !== '').map(item => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">
                  <div style="font-weight: bold;">${item.name}</div>
                  ${item.description ? `<div style="color: #666; font-size: 11px; margin-top: 2px;">${item.description}</div>` : ''}
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${Number(item.amount).toLocaleString()}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${Number(item.amount).toLocaleString()}</td>
              </tr>
            `).join('')}
            <tr style="background: #1976d2; color: white; font-weight: bold;">
              <td colspan="2" style="border: 1px solid #ddd; padding: 8px;">Total</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${quoteData.items.filter(item => item.name && item.amount !== '').reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Package Pricing -->
      <div style="background: white; border: 2px solid #1976d2; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
        <div style="color: #1976d2; font-size: 18px; font-weight: bold; margin-bottom: 15px;">Package Pricing</div>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Per Adult Price</td>
              <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${quoteData.pricing.perAdultPrice || 0}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Adults</td>
              <td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quoteData.pricing.adultCount || 0}</td>
            </tr>
            ${quoteData.pricing.cwobPrice !== '' && quoteData.pricing.cwobCount > 0 ? `<tr><td style="border: 1px solid #ddd; padding: 8px;">Child Without Bed</td><td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${quoteData.pricing.cwobPrice} × ${quoteData.pricing.cwobCount}</td></tr>` : ''}
            ${quoteData.pricing.cwbPrice !== '' && quoteData.pricing.cwbCount > 0 ? `<tr><td style="border: 1px solid #ddd; padding: 8px;">Child With Bed</td><td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${quoteData.pricing.cwbPrice} × ${quoteData.pricing.cwbCount}</td></tr>` : ''}
            ${quoteData.pricing.discountPercent !== '' && Number(quoteData.pricing.discountPercent) > 0 ? `<tr><td style="border: 1px solid #ddd; padding: 8px;">Discount (%)</td><td colspan="2" style="border: 1px solid #ddd; padding: 8px; text-align: right;">${quoteData.pricing.discountPercent}</td></tr>` : ''}
            <tr style="background: #1976d2; color: white; font-weight: bold;">
              <td colspan="2" style="border: 1px solid #ddd; padding: 8px;">Total</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${quoteData.pricing.totalPrice ? quoteData.pricing.totalPrice.toLocaleString() : 0}</td>
            </tr>
            <tr style="background: #1976d2; color: white; font-weight: bold;">
              <td colspan="2" style="border: 1px solid #ddd; padding: 8px;">Payable</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${quoteData.pricing.payablePrice ? quoteData.pricing.payablePrice.toLocaleString() : 0}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Itinerary -->
      <div style="margin-bottom: 20px;">
        <div style="color: #1976d2; font-size: 18px; font-weight: bold; margin-bottom: 15px;">Itinerary</div>
        ${quoteData.days && quoteData.days.length > 0 ? quoteData.days.map((day, idx) => `
          <div style="background: white; border: 2px solid #1976d2; border-radius: 8px; padding: 15px; margin-bottom: 10px; display: flex;">
            <div style="width: 60px; height: 60px; background: ${['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'][idx % 5]}; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; margin-right: 15px;">
              Day ${day.dayNumber}
            </div>
            <div style="flex: 1;">
              <div style="color: #1976d2; font-weight: bold; font-size: 14px; margin-bottom: 5px;">Day ${day.dayNumber}: ${day.destination || ''} ${day.date ? '(' + day.date + ')' : ''}</div>
              <div style="font-size: 12px; margin-bottom: 3px;"><strong>Activities:</strong> ${day.activities || ''}</div>
              <div style="font-size: 12px;"><strong>Overnight Stay:</strong> ${day.overnightStay || ''}</div>
            </div>
          </div>
        `).join('') : '<div style="text-align: center; color: #666; font-style: italic;">No itinerary added.</div>'}
      </div>

      ${quoteData.notes ? `
        <div style="background: white; border: 2px solid #1976d2; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
          <div style="color: #1976d2; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Notes</div>
          <div style="font-size: 12px;">${quoteData.notes}</div>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="background: #1976d2; color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">Travel Agent Name</div>
        <div style="font-size: 12px; margin-bottom: 5px;">Travel Agency Name Here</div>
        <div style="font-size: 12px; margin-bottom: 15px;">+91-123-456-7890 | info@youragency.com</div>
        <div style="border-top: 2px solid white; width: 150px; margin: 0 auto; padding-top: 10px; font-size: 12px;">Customer Signature</div>
      </div>
    </div>
  `;
  
  if (returnHTML) return html;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 500);
};

export const generateProfessionalPDF = (quoteData, returnHTML = false) => {
  const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'; // Placeholder logo
  const banner = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80';
  const today = new Date().toLocaleDateString('en-US');
  const travelDates = quoteData.days && quoteData.days.length > 0
    ? `${quoteData.days[0].date || ''} - ${quoteData.days[quoteData.days.length-1].date || ''}`
    : '';
  const html = `
    <html><head><title>Travel Quotation</title>
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; background: #f8fafc; color: #222; }
      .header { background: #b3d1ea; padding: 32px 0 16px 0; text-align: left; position: relative; }
      .header-title { font-size: 32px; font-weight: 900; letter-spacing: 2px; color: #222; margin-left: 40px; }
      .header-date { font-size: 15px; color: #333; margin-left: 40px; margin-top: 8px; }
      .logo { position: absolute; right: 40px; top: 32px; width: 90px; height: 90px; object-fit: contain; background: #fff; border-radius: 12px; border: 1px solid #e0e0e0; }
      .summary { display: flex; align-items: center; background: #fff; border-radius: 0 0 12px 12px; box-shadow: 0 2px 8px #1976d220; margin: 0 40px; padding: 24px; margin-top: -40px; }
      .summary-info { flex: 1; }
      .summary-row { margin-bottom: 10px; font-size: 16px; }
      .summary-label { color: #888; font-weight: 600; min-width: 120px; display: inline-block; }
      .summary-value { color: #1976d2; font-weight: 700; }
      .summary-img { width: 180px; height: 120px; object-fit: cover; border-radius: 10px; margin-left: 32px; }
      .table-section { margin: 32px 40px; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #1976d220; padding: 24px; }
      .table-title { font-size: 18px; font-weight: 700; color: #1976d2; margin-bottom: 12px; }
      .quote-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
      .quote-table th, .quote-table td { border: 1px solid #e0e0e0; padding: 10px; text-align: left; }
      .quote-table th { background: #e3f2fd; color: #1976d2; font-size: 15px; }
      .quote-table .desc { color: #555; font-size: 13px; font-weight: 400; }
      .quote-table .right { text-align: right; }
      .quote-table .total-row { background: #f8fafc; font-weight: bold; }
      .footer { background: #222; color: #fff; padding: 24px 40px; font-size: 15px; border-radius: 0 0 12px 12px; margin-top: 32px; display: flex; justify-content: space-between; align-items: center; }
      .footer .agent { font-weight: 600; }
      .footer .signature { border-top: 1px solid #fff; width: 180px; text-align: center; margin-left: 40px; padding-top: 8px; }
    </style>
    </head><body>
      <div class="header">
        <div class="header-title">TRAVEL QUOTATION</div>
        <div class="header-date">Quote Date: ${today}</div>
        <img class="logo" src="${logoUrl}" alt="Logo" />
      </div>
      <div class="summary">
        <div class="summary-info">
          <div class="summary-row"><span class="summary-label">Prepared For:</span> <span class="summary-value">${quoteData.leadName || ''}</span></div>
          <div class="summary-row"><span class="summary-label">Destination:</span> <span class="summary-value">${quoteData.destination || ''}</span></div>
          <div class="summary-row"><span class="summary-label">Travel Dates:</span> <span class="summary-value">${travelDates}</span></div>
        </div>
        <img class="summary-img" src="${banner}" alt="Travel" />
      </div>
      <div class="table-section">
        <div class="table-title">Quotation Details</div>
        <table class="quote-table">
          <thead><tr><th>Item</th><th>Description</th><th>Rate</th><th>Amount</th></tr></thead>
          <tbody>
            ${quoteData.items.filter(item => item.name && item.amount !== '').map(item => `
              <tr>
                <td>${item.name}</td>
                <td class="desc">${item.description || ''}</td>
                <td class="right">₹${Number(item.amount).toLocaleString()}</td>
                <td class="right">₹${Number(item.amount).toLocaleString()}</td>
              </tr>
            `).join('')}
            <tr class="total-row"><td colspan="3">Subtotal</td><td class="right">₹${quoteData.items.filter(item => item.name && item.amount !== '').reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toLocaleString()}</td></tr>
          </tbody>
        </table>
        <div class="table-title">Package Pricing</div>
        <table class="quote-table">
          <tbody>
            <tr><td>Per Adult Price</td><td colspan="2"></td><td class="right">₹${quoteData.pricing.perAdultPrice || 0}</td></tr>
            <tr><td>Adults</td><td colspan="2"></td><td class="right">${quoteData.pricing.adultCount || 0}</td></tr>
            ${quoteData.pricing.cwobPrice !== '' && quoteData.pricing.cwobCount > 0 ? `<tr><td>Child Without Bed</td><td colspan="2"></td><td class="right">₹${quoteData.pricing.cwobPrice} × ${quoteData.pricing.cwobCount}</td></tr>` : ''}
            ${quoteData.pricing.cwbPrice !== '' && quoteData.pricing.cwbCount > 0 ? `<tr><td>Child With Bed</td><td colspan="2"></td><td class="right">₹${quoteData.pricing.cwbPrice} × ${quoteData.pricing.cwbCount}</td></tr>` : ''}
            ${quoteData.pricing.discountPercent !== '' && Number(quoteData.pricing.discountPercent) > 0 ? `<tr><td>Discount (%)</td><td colspan="2"></td><td class="right">${quoteData.pricing.discountPercent}</td></tr>` : ''}
            <tr class="total-row"><td colspan="3">Total</td><td class="right">₹${quoteData.pricing.totalPrice ? quoteData.pricing.totalPrice.toLocaleString() : 0}</td></tr>
            <tr class="total-row"><td colspan="3">Payable</td><td class="right">₹${quoteData.pricing.payablePrice ? quoteData.pricing.payablePrice.toLocaleString() : 0}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="table-section">
        <div class="table-title">Itinerary</div>
        <table class="quote-table">
          <thead><tr><th>Day</th><th>Destination</th><th>Activities</th><th>Overnight</th></tr></thead>
          <tbody>
            ${quoteData.days && quoteData.days.length > 0 ? quoteData.days.map(day => `
              <tr>
                <td>${day.dayNumber}</td>
                <td>${day.destination || ''}</td>
                <td>${day.activities || ''}</td>
                <td>${day.overnightStay || ''}</td>
              </tr>
            `).join('') : '<tr><td colspan="4">No itinerary added.</td></tr>'}
          </tbody>
        </table>
      </div>
      <div class="footer">
        <div>
          <div class="agent">Travel Agent Name</div>
          <div>Travel Agency Name Here</div>
          <div>+91-123-456-7890 | info@youragency.com</div>
        </div>
        <div class="signature">Customer Signature</div>
      </div>
    </body></html>
  `;
  if (returnHTML) return html;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 500);
}; 

export const generateUltraProPDF = (quoteData, returnHTML = false) => {
  // Hero image and logo
  const heroImg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
  const logoImg = 'https://ui-avatars.com/api/?name=Travel+Agency&background=1976d2&color=fff&size=128&rounded=true';
  const today = new Date().toLocaleDateString('en-US');
  const travelDates = quoteData.days && quoteData.days.length > 0
    ? `${quoteData.days[0].date || ''} - ${quoteData.days[quoteData.days.length-1].date || ''}`
    : '';
  const dayImages = [
    'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  ];
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 900px; margin: 0 auto; background: #f4f8fb; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 32px #1976d220;">
      <!-- Hero Section -->
      <div style="position: relative;">
        <img src="${heroImg}" style="width: 100%; height: 220px; object-fit: cover; display: block;" alt="Hero" />
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 220px; background: linear-gradient(90deg, #1976d2cc 60%, #fff0 100%); display: flex; align-items: flex-end; justify-content: space-between; padding: 32px 40px;">
          <div style="display: flex; align-items: center; gap: 18px;">
            <img src="${logoImg}" style="width: 64px; height: 64px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 8px #1976d220;" alt="Logo" />
            <div style="color: #fff; font-size: 36px; font-weight: 900; letter-spacing: 2px; text-shadow: 0 2px 8px #0008;">TRAVEL QUOTATION</div>
          </div>
          <div style="color: #fff; font-size: 18px; font-weight: 600; text-shadow: 0 2px 8px #0008;">${today}</div>
        </div>
      </div>
      <!-- Glassmorphism Summary Card -->
      <div style="backdrop-filter: blur(8px); background: rgba(255,255,255,0.85); margin: -60px 40px 32px 40px; border-radius: 18px; box-shadow: 0 4px 24px #1976d220; padding: 32px 40px; display: flex; gap: 48px; align-items: center; border: 1.5px solid #1976d2;">
        <div style="flex: 1;">
          <div style="margin-bottom: 14px; font-size: 18px;"><span style="font-size: 22px; margin-right: 8px;">👤</span><span style="color: #1976d2; font-weight: 700;">Prepared For:</span> <span style="font-weight: 600;">${quoteData.leadName || ''}</span></div>
          <div style="margin-bottom: 14px; font-size: 18px;"><span style="font-size: 22px; margin-right: 8px;">🌍</span><span style="color: #1976d2; font-weight: 700;">Destination:</span> <span style="font-weight: 600;">${quoteData.destination || ''}</span></div>
          <div style="font-size: 18px;"><span style="font-size: 22px; margin-right: 8px;">📅</span><span style="color: #1976d2; font-weight: 700;">Travel Dates:</span> <span style="font-weight: 600;">${travelDates}</span></div>
        </div>
      </div>
      <!-- Quotation Table -->
      <div style="background: #fff; border-radius: 18px; margin: 0 40px 32px 40px; box-shadow: 0 2px 8px #1976d220; border: 1.5px solid #1976d2; padding: 24px;">
        <div style="color: #1976d2; font-size: 22px; font-weight: 800; margin-bottom: 18px; letter-spacing: 1px;">Quotation Details</div>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <thead>
            <tr style="background: #1976d2; color: #fff;">
              <th style="padding: 12px; border-radius: 8px 0 0 0; text-align: left;">Item</th>
              <th style="padding: 12px; text-align: left;">Description</th>
              <th style="padding: 12px; text-align: right;">Rate</th>
              <th style="padding: 12px; border-radius: 0 8px 0 0; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${quoteData.items.filter(item => item.name && item.amount !== '').map((item, idx) => `
              <tr style="background: ${idx % 2 === 0 ? '#f4f8fb' : '#fff'};">
                <td style="padding: 10px; font-weight: 700; color: #1976d2;">${item.name}</td>
                <td style="padding: 10px; color: #444;">${item.description || ''}</td>
                <td style="padding: 10px; text-align: right; color: #1976d2; font-weight: 600;">₹${Number(item.amount).toLocaleString()}</td>
                <td style="padding: 10px; text-align: right; color: #1976d2; font-weight: 600;">₹${Number(item.amount).toLocaleString()}</td>
              </tr>
            `).join('')}
            <tr style="background: #1976d2; color: #fff; font-weight: bold;">
              <td colspan="3" style="padding: 10px;">Total</td>
              <td style="padding: 10px; text-align: right;">₹${quoteData.items.filter(item => item.name && item.amount !== '').reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Package Pricing -->
      <div style="display: flex; gap: 32px; margin: 0 40px 32px 40px;">
        <div style="flex: 1; background: #fff; border-radius: 18px; box-shadow: 0 2px 8px #1976d220; border: 1.5px solid #1976d2; padding: 24px;">
          <div style="color: #1976d2; font-size: 22px; font-weight: 800; margin-bottom: 18px; letter-spacing: 1px;">Package Pricing</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tbody>
              <tr><td style="padding: 10px;">Per Adult Price</td><td style="padding: 10px; text-align: right;">₹${quoteData.pricing.perAdultPrice || 0}</td></tr>
              <tr><td style="padding: 10px;">Adults</td><td style="padding: 10px; text-align: right;">${quoteData.pricing.adultCount || 0}</td></tr>
              ${quoteData.pricing.cwobPrice !== '' && quoteData.pricing.cwobCount > 0 ? `<tr><td style="padding: 10px;">Child Without Bed</td><td style="padding: 10px; text-align: right;">₹${quoteData.pricing.cwobPrice} × ${quoteData.pricing.cwobCount}</td></tr>` : ''}
              ${quoteData.pricing.cwbPrice !== '' && quoteData.pricing.cwbCount > 0 ? `<tr><td style="padding: 10px;">Child With Bed</td><td style="padding: 10px; text-align: right;">₹${quoteData.pricing.cwbPrice} × ${quoteData.pricing.cwbCount}</td></tr>` : ''}
              ${quoteData.pricing.discountPercent !== '' && Number(quoteData.pricing.discountPercent) > 0 ? `<tr><td style="padding: 10px;">Discount (%)</td><td style="padding: 10px; text-align: right;">${quoteData.pricing.discountPercent}</td></tr>` : ''}
              <tr style="background: #1976d2; color: #fff; font-weight: bold;"><td style="padding: 10px;">Total</td><td style="padding: 10px; text-align: right;">₹${quoteData.pricing.totalPrice ? quoteData.pricing.totalPrice.toLocaleString() : 0}</td></tr>
              <tr style="background: #1976d2; color: #fff; font-weight: bold;"><td style="padding: 10px;">Payable</td><td style="padding: 10px; text-align: right;">₹${quoteData.pricing.payablePrice ? quoteData.pricing.payablePrice.toLocaleString() : 0}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Itinerary Timeline -->
      <div style="margin: 0 40px 32px 40px;">
        <div style="color: #1976d2; font-size: 22px; font-weight: 800; margin-bottom: 18px; letter-spacing: 1px;">Itinerary</div>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          ${quoteData.days && quoteData.days.length > 0 ? quoteData.days.map((day, idx) => `
            <div style="display: flex; align-items: flex-start; gap: 18px; background: #fff; border-radius: 14px; box-shadow: 0 2px 8px #1976d220; border: 1.5px solid #1976d2; padding: 18px;">
              <img src="${dayImages[idx % dayImages.length]}" style="width: 90px; height: 70px; object-fit: cover; border-radius: 10px;" alt="Itinerary" />
              <div style="flex: 1;">
                <div style="color: #1976d2; font-weight: 700; font-size: 16px; margin-bottom: 4px;">Day ${day.dayNumber}: ${day.destination || ''} ${day.date ? '(' + day.date + ')' : ''}</div>
                <div style="font-size: 13px; margin-bottom: 2px;"><span style="font-size: 16px;">🗺️</span> <strong>Activities:</strong> ${day.activities || ''}</div>
                <div style="font-size: 13px;"><span style="font-size: 16px;">🏨</span> <strong>Overnight Stay:</strong> ${day.overnightStay || ''}</div>
              </div>
            </div>
          `).join('') : '<div style="text-align: center; color: #666; font-style: italic;">No itinerary added.</div>'}
        </div>
      </div>
      <!-- Notes -->
      ${quoteData.notes ? `
        <div style="background: #fff; border-radius: 18px; margin: 0 40px 32px 40px; box-shadow: 0 2px 8px #1976d220; border: 1.5px solid #1976d2; padding: 24px;">
          <div style="color: #1976d2; font-size: 22px; font-weight: 800; margin-bottom: 10px;">Notes</div>
          <div style="font-size: 15px;">${quoteData.notes}</div>
        </div>
      ` : ''}
      <!-- Footer -->
      <div style="background: #1976d2; color: white; padding: 32px 40px; border-radius: 0 0 24px 24px; text-align: center; position: relative;">
        <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px;">Travel Agent Name</div>
        <div style="font-size: 14px; margin-bottom: 5px;">Travel Agency Name Here</div>
        <div style="font-size: 14px; margin-bottom: 15px;">+91-123-456-7890 | info@youragency.com</div>
        <div style="border-top: 2px solid white; width: 180px; margin: 0 auto; padding-top: 10px; font-size: 14px;">Customer Signature</div>
        <div style="position: absolute; bottom: 12px; right: 32px; opacity: 0.08; font-size: 60px; font-weight: 900; letter-spacing: 8px; pointer-events: none;">TRAVEL</div>
      </div>
    </div>
  `;
  if (returnHTML) return html;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); win.close(); }, 500);
}; 