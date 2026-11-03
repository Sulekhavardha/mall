import React, { useState } from 'react';
import { api } from '../services/api';

export default function VisitModal({ isOpen, onClose, onBookingSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    guestName: '',
    guestContact: '',
    serviceType: 'Personal Styling & Fitting Suite',
    plannedDate: 'This Weekend',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.guestContact) {
      alert('Please fill in your name and contact details.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.createInquiry(formData);
      setSuccessMessage(
        `✦ VIP CONCIERGE CONFIRMED ✦\n\nDear ${formData.guestName},\nYour inquiry for "${formData.serviceType}" has been logged in Aurelia's database. Our Lead Concierge will reach you at ${formData.guestContact}.`
      );
      if (onBookingSuccess) onBookingSuccess();
    } catch (err) {
      alert('Could not submit VIP inquiry: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('modal-backdrop')) onClose();
      }}
    >
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          ✕
        </button>
        <div className="panel-tag">GUEST SERVICES & VISIT INFORMATION</div>
        <h2 id="modalTitle" style={{ fontSize: '32px', margin: '10px 0 16px' }}>
          Welcome to Aurelia.
        </h2>
        <p style={{ color: 'var(--ink-muted)', fontSize: '13.5px', lineHeight: 1.7 }}>
          Plan an effortless day of shopping, toys exploration, exquisite gastronomy, and cinematic recreation across all three levels of our architectural sanctuary.
        </p>

        <div className="modal-grid">
          <div className="modal-info-block">
            <h4>Opening Hours</h4>
            <p><strong>Retail, Fashion & Toys:</strong><br />Mon – Sun: 10:00 AM – 10:00 PM</p>
            <p style={{ marginTop: '6px' }}><strong>Dining & Cinema:</strong><br />Daily until 12:30 AM</p>
          </div>
          <div className="modal-info-block">
            <h4>Location & Parking</h4>
            <p>100 Grand Boulevard, Aurelia District</p>
            <p style={{ marginTop: '6px' }}>Dedicated Valet at Ground Entrance.<br />4,500 smart parking bays with EV charging.</p>
          </div>
          <div className="modal-info-block">
            <h4>VIP Concierge</h4>
            <p>Hands-free shopping delivery across all floors, private fitting suites, and reservation management.</p>
          </div>
          <div className="modal-info-block">
            <h4>Metro Concourse</h4>
            <p>Direct underground concourse to Aurelia Metro Station (Lines 1 & 4, Exit B).</p>
          </div>
        </div>

        {/* Interactive VIP Concierge Form connecting to MERN */}
        <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(197, 160, 89, 0.08)', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: '15px' }}>Request VIP Concierge Assistance (MERN API)</h4>
          {successMessage ? (
            <div style={{ whiteSpace: 'pre-line', color: 'var(--ink)', fontSize: '13px', lineHeight: 1.6, padding: '12px', background: 'rgba(197, 160, 89, 0.2)', borderRadius: '4px' }}>
              {successMessage}
              <div style={{ marginTop: '12px' }}>
                <button className="btn" type="button" onClick={() => setSuccessMessage(null)}>
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Name</label>
                  <input
                    type="text"
                    className="booking-input"
                    placeholder="e.g. Lord Julian Sterling"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone / Email</label>
                  <input
                    type="text"
                    className="booking-input"
                    placeholder="e.g. julian@estate.com"
                    value={formData.guestContact}
                    onChange={(e) => setFormData({ ...formData, guestContact: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Desired Service</label>
                  <select
                    className="booking-select"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  >
                    <option value="Personal Styling & Fitting Suite">Personal Styling & Fitting Suite</option>
                    <option value="Hands-Free Shopping Delivery">Hands-Free Shopping Delivery</option>
                    <option value="VIP Valet & Parking Reserve">VIP Valet & Parking Reserve</option>
                    <option value="Dining & Table Reservation">Dining & Table Reservation</option>
                    <option value="Private Tour / Event Inquiry">Private Tour / Event Inquiry</option>
                    <option value="General Visit Assistance">General Visit Assistance</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Date</label>
                  <select
                    className="booking-select"
                    value={formData.plannedDate}
                    onChange={(e) => setFormData({ ...formData, plannedDate: e.target.value })}
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Weekend">This Weekend</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Special Notes (Optional)</label>
                <input
                  type="text"
                  className="booking-input"
                  placeholder="e.g. Private dressing room reserved at Maison Vendôme"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="actions" style={{ marginTop: '16px' }}>
                <button className="btn" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting to MongoDB...' : 'Confirm VIP Request ↗'}
                </button>
                <button className="btn secondary" type="button" onClick={onClose}>
                  Return to Tour
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

