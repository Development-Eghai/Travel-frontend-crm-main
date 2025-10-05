import React, { useState } from "react";
import { Info, DollarSign, FileText, Shield, List, Mail } from "lucide-react";

export default function GlobalSettings() {
  const [activeStep, setActiveStep] = useState("general");

  const steps = [
    { id: "general", label: "GENERAL", icon: Info },
    { id: "payment", label: "PAYMENT DETAILS", icon: DollarSign },
    { id: "menu", label: "MENU", icon: List },
    { id: "seo", label: "SEO", icon: FileText },
    { id: "emails", label: "EMAIL TEMPLATES", icon: Mail },
    { id: "policies", label: "POLICIES", icon: Shield },
  ];

  const currentIndex = steps.findIndex((s) => s.id === activeStep);
  const progress = ((currentIndex + 1) / steps.length) * 100 + "%";

  const renderStepContent = () => {
    switch (activeStep) {
      case "general":
        return (
          <div className="form-container">
            <h3>General Settings</h3>

            <div className="grid-2">
              <div className="form-group">
                <label>Site Title</label>
                <input type="text" placeholder="Enter site title" />
              </div>
              <div className="form-group">
                <label>Tagline</label>
                <input type="text" placeholder="Enter tagline" />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" placeholder="Company Name" />
              </div>
              <div className="form-group">
                <label>Site Description</label>
                <textarea rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Logo</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label>Fav Icon</label>
                <input type="file" />
              </div>
              <div className="form-group">
                <label>Homepage Slider (Image/Video)</label>
                <input type="file" multiple />
              </div>
            </div>

            <h4>Contact Information</h4>
            <div className="grid-2">
              <div className="form-group">
                <label>Contact Email</label>
                <input type="email" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone" />
                <button className="btn-small">+ Add More</button>
              </div>
              <div className="form-group">
                <label>Business Address</label>
                <textarea rows="2"></textarea>
              </div>
              <div className="form-group">
                <label>Social Media Links</label>
                <input type="url" placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Google Map Link</label>
                <input type="url" placeholder="Google Maps URL" />
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="form-container">
            <h3>Payment Details</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Bank Name</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Account No.</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>IFSC Code</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Branch Name</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>UPI IDs</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Upload QR Code</label>
                <input type="file" />
              </div>
            </div>
            <h4>Quotation & Invoice Format</h4>
            <textarea rows="4" placeholder="Enter format details"></textarea>
          </div>
        );

      case "menu":
        return (
          <div className="form-container">
            <h3>Menu Settings</h3>
            <div className="form-group">
              <label>Menu Name</label>
              <input type="text" placeholder="Main Menu" />
            </div>
            <div className="form-group">
              <label>Add Pages/Posts/Links</label>
              <input type="text" placeholder="Custom Link Name" />
              <input type="url" placeholder="Custom Link URL" />
              <button className="btn-small">+ Add Item</button>
            </div>
            <div className="form-group">
              <label>Categories</label>
              <select>
                <option>Select category</option>
              </select>
            </div>
            <div className="form-group">
              <label>Menu Position</label>
              <select>
                <option>Header Menu</option>
                <option>Footer Menu</option>
              </select>
            </div>
            <p className="note">
              ⚡ Drag & drop support for rearranging can be added
            </p>
          </div>
        );

      case "seo":
        return (
          <div className="form-container">
            <h3>SEO Settings</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Meta Title</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Meta Description</label>
                <textarea rows="2"></textarea>
              </div>
              <div className="form-group">
                <label>Meta Tags</label>
                <input type="text" placeholder="tag1, tag2" />
              </div>
            </div>
            <h4>Open Graph Tags</h4>
            <div className="grid-2">
              <input type="text" placeholder="OG Title" />
              <input type="text" placeholder="OG Description" />
              <input type="file" />
            </div>
            <h4>Analytics & Tracking</h4>
            <div className="form-group">
              <label>Custom Script</label>
              <textarea rows="3" placeholder="<script>...</script>"></textarea>
            </div>
            <div className="form-group">
              <label>Display Location</label>
              <select>
                <option>Header</option>
                <option>Footer</option>
                <option>Body</option>
                <option>Thank You Page</option>
              </select>
            </div>
          </div>
        );

      case "emails":
        return (
          <div className="form-container">
            <h3>Email Templates</h3>
            <h4>Incoming</h4>
            <div className="form-group">
              <label>Contact Form Submitted</label>
              <textarea rows="2"></textarea>
            </div>
            <h4>Outgoing</h4>
            {[
              "Form Submitted",
              "Quotation Sent",
              "Invoice Sent",
              "Lead Assigned",
              "Payment Confirmation",
              "Invoice Due Date",
              "Trip Updates",
              "Follow Up",
            ].map((item) => (
              <div className="form-group" key={item}>
                <label>{item}</label>
                <textarea rows="2"></textarea>
              </div>
            ))}
          </div>
        );

      case "policies":
        return (
          <div className="form-container">
            <h3>Policies</h3>
            <div className="form-group">
              <label>Terms & Conditions</label>
              <textarea rows="3"></textarea>
            </div>
            <div className="form-group">
              <label>Privacy Policy</label>
              <textarea rows="3"></textarea>
            </div>
            <div className="form-group">
              <label>Payment Policy</label>
              <textarea rows="3"></textarea>
            </div>
          </div>
        );

      default:
        return <p>Step Not Found</p>;
    }
  };

  return (
    <div className="settings-container mt-3">
      <div className="settings-header">
        <h3>Global Settings</h3>
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: progress }}></div>
      </div>

      {/* Stepper */}
      <div className="stepper">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const active = index <= currentIndex;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className="step-button"
            >
              <div className={`step-circle ${active ? "active" : ""}`}>
                <Icon size={18} />
              </div>
              <span className={active ? "active" : ""}>{step.label}</span>
            </button>
          );
        })}
      </div>

      {renderStepContent()}

      {/* Footer */}
      <div className="footer-actions">
        <span>
          {currentIndex + 1}/{steps.length} sections complete
        </span>
        <div>
          <button className="btn">Save Draft</button>
          <button className="btn">Preview</button>
          <button className="btn primary">Publish</button>
        </div>
      </div>
    </div>
  );
}
