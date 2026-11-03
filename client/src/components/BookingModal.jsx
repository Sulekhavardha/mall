import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function BookingModal({ isOpen, onClose, defaultAttraction, defaultTime, onBookingCreated }) {
  const [attraction, setAttraction] = useState(defaultAttraction || 'Cinema Luxe: ASTRONOMIA (IMAX 3D Laser)');
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState(defaultTime || '4:45 PM');
  const [guestsCount, setGuestsCount] = useState('2 Guests');
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (defaultAttraction) setAttraction(defaultAttraction);
    if (defaultTime) setTime(defaultTime);
  }, [defaultAttraction, defaultTime]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName || !guestContact) {
      alert('Please provide your name and contact details.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.createBooking({
        attraction,
        guestName,
        guestContact,
        date,
        time,
        guestsCount,
        specialRequests,
      });

      setConfirmation(res.data);
      if (onBookingCreated) onBookingCreated();
    } catch (err) {
      alert('Error booking reservation: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    onClose();
  };

  return (
    <div
      className={`booking-modal ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('booking-modal') || e.target.classList.contains('booking-overlay')) {
          onClose();
        }
      }}
    >
      <div className="booking-overlay"></div>
      <div className="booking-card">
        <button className="modal-close" onClick={onClose} aria-label="Close booking modal">
          ✕
        </button>
        <div className="panel-tag">AURELIA ENTERTAINMENT CONCIERGE · LEVEL 02</div>
        <h2 style={{ fontSize: '28px', margin: '10px 0 10px' }}>
          Reserve Your Experience.
        </h2>
        <p style={{ color: 'var(--ink-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
          Secure premiere IMAX seating, private bowling lanes, VR holodeck sessions, or family kids day passes stored directly in MongoDB.
        </p>

        {confirmation ? (
          <div style={{ padding: '20px', background: 'rgba(197, 160, 89, 0.16)', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
            <h3 style={{ margin: '0 0 10px', color: 'var(--ink)' }}>✦ RESERVATION CONFIRMED ✦</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.8 }}>
              Dear <strong>{confirmation.guestName}</strong>,<br />
              Your reservation for <strong>"{confirmation.attraction}"</strong> has been saved with confirmation pass code:
            </p>
            <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.15em', margin: '12px 0', color: 'var(--accent-gold)' }}>
              {confirmation.bookingCode}
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)' }}>
              Scheduled for <strong>{confirmation.date}</strong> at <strong>{confirmation.time}</strong> ({confirmation.guestsCount}).<br />
              A concierge confirmation pass has been registered in the Aurelia database.
            </p>
            <div className="actions" style={{ marginTop: '20px' }}>
              <button className="btn" type="button" onClick={handleReset}>
                Done & Close ↗
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="booking-form-group">
              <label htmlFor="bookExperience">Selected Attraction</label>
              <select
                id="bookExperience"
                className="booking-select"
                value={attraction}
                onChange={(e) => setAttraction(e.target.value)}
              >
                <option value="Cinema Luxe: ASTRONOMIA (IMAX 3D Laser)">Cinema Luxe: ASTRONOMIA (IMAX 3D Laser)</option>
                <option value="Cinema Luxe: NIGHTFALL CHRONICLES (Dolby VIP)">Cinema Luxe: NIGHTFALL CHRONICLES (Dolby VIP)</option>
                <option value="Cinema Luxe: THE GOLDEN KINGDOM (4K Laser)">Cinema Luxe: THE GOLDEN KINGDOM (4K Laser)</option>
                <option value="Premiere: ELYSIUM MIRAGE (70mm IMAX)">Premiere: ELYSIUM MIRAGE (70mm IMAX)</option>
                <option value="The Strike Club: Boutique Bowling (1 Hour Private Lane)">The Strike Club: Boutique Bowling (1 Hour Private Lane)</option>
                <option value="Omni VR Holodeck: 45-Min Mission Pass">Omni VR Holodeck: 45-Min Mission Pass</option>
                <option value="Velocity Arcade: Unlimited Play Card">Velocity Arcade: Unlimited Play Card</option>
                <option value="CloudNine Kids: All-Day Soft Play Pass">CloudNine Kids: All-Day Soft Play Pass</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <div className="booking-form-group" style={{ marginTop: 0 }}>
                <label htmlFor="bookDate">Date</label>
                <select
                  id="bookDate"
                  className="booking-select"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                >
                  <option value="Today">Today (Evening)</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="This Friday">This Friday (Premiere)</option>
                  <option value="This Saturday">This Saturday (Weekend)</option>
                  <option value="This Sunday">This Sunday</option>
                </select>
              </div>

              <div className="booking-form-group" style={{ marginTop: 0 }}>
                <label htmlFor="bookTime">Time Slot</label>
                <select
                  id="bookTime"
                  className="booking-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="2:15 PM">2:15 PM</option>
                  <option value="4:45 PM">4:45 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="7:15 PM">7:15 PM</option>
                  <option value="8:15 PM">8:15 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                  <option value="11:30 PM">11:30 PM</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
              <div className="booking-form-group" style={{ marginTop: 0 }}>
                <label htmlFor="bookName">Guest Name</label>
                <input
                  type="text"
                  id="bookName"
                  className="booking-input"
                  placeholder="e.g. Eleanor Vance"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />
              </div>

              <div className="booking-form-group" style={{ marginTop: 0 }}>
                <label htmlFor="bookGuests">Party Size</label>
                <select
                  id="bookGuests"
                  className="booking-select"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4 Guests">4 Guests</option>
                  <option value="5+ Guests (VIP Suite)">5+ Guests (VIP Suite)</option>
                </select>
              </div>
            </div>

            <div className="booking-form-group" style={{ marginTop: '16px' }}>
              <label htmlFor="bookContact">Mobile Number or Email</label>
              <input
                type="text"
                id="bookContact"
                className="booking-input"
                placeholder="e.g. +1 (555) 019-2834 or guest@vip.com"
                value={guestContact}
                onChange={(e) => setGuestContact(e.target.value)}
                required
              />
            </div>

            <div className="booking-form-group" style={{ marginTop: '16px' }}>
              <label htmlFor="bookSpecial">Special Preferences (Optional)</label>
              <input
                type="text"
                id="bookSpecial"
                className="booking-input"
                placeholder="e.g. Center recliners, celebratory bottle service"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>

            <div className="actions" style={{ marginTop: '24px' }}>
              <button type="submit" className="btn" disabled={submitting}>
                {submitting ? 'Confirming with MongoDB...' : 'Confirm Reservation ↗'}
              </button>
              <button type="button" className="btn secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

