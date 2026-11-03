import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function BookingsManagerModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [bRes, iRes, hRes] = await Promise.all([
        api.getBookings().catch(() => ({ data: [] })),
        api.getInquiries().catch(() => ({ data: [] })),
        api.getHealth().catch(() => null),
      ]);
      setBookings(bRes.data || []);
      setInquiries(iRes.data || []);
      setHealth(hRes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCancelBooking = async (id) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      await api.cancelBooking(id);
      setActionMsg('Reservation cancelled successfully in MongoDB.');
      loadData();
      setTimeout(() => setActionMsg(''), 3000);
    } catch (err) {
      alert('Failed to cancel: ' + err.message);
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
      <div className="modal-card" style={{ maxWidth: '850px', maxHeight: '88vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          ✕
        </button>
        <div className="panel-tag">AURELIA VIP DESK · MERN LIVE DATABASE</div>
        <h2 style={{ fontSize: '28px', margin: '8px 0 14px' }}>
          Concierge & Bookings Dashboard
        </h2>

        {/* Database Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(197, 160, 89, 0.12)', borderRadius: '6px', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: health?.database?.connected ? '#28a745' : '#c5a059' }}></span>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>
              Database: {health?.database?.mode || 'MERN REST API Connected'}
            </span>
          </div>
          <button
            className="btn secondary"
            style={{ padding: '6px 12px', fontSize: '9px' }}
            onClick={loadData}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : '↻ Refresh Records'}
          </button>
        </div>

        {actionMsg && (
          <div style={{ padding: '10px 14px', background: 'rgba(40, 167, 69, 0.15)', border: '1px solid #28a745', borderRadius: '4px', marginBottom: '14px', fontSize: '12px' }}>
            {actionMsg}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--line-subtle)', paddingBottom: '12px', marginBottom: '16px' }}>
          <button
            type="button"
            className={`btn ${activeTab === 'bookings' ? '' : 'secondary'}`}
            style={{ padding: '8px 16px', fontSize: '10px' }}
            onClick={() => setActiveTab('bookings')}
          >
            Reservations ({bookings.length})
          </button>
          <button
            type="button"
            className={`btn ${activeTab === 'inquiries' ? '' : 'secondary'}`}
            style={{ padding: '8px 16px', fontSize: '10px' }}
            onClick={() => setActiveTab('inquiries')}
          >
            VIP Concierge Inquiries ({inquiries.length})
          </button>
        </div>

        {/* Bookings View */}
        {activeTab === 'bookings' && (
          <div>
            {bookings.length === 0 ? (
              <p style={{ color: 'var(--ink-muted)', fontSize: '13px' }}>
                No reservations found yet. Use the "Book Seats" buttons on Level 02 Cinema or Attractions to create one!
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {bookings.map((b, idx) => (
                  <div
                    key={b._id || idx}
                    style={{
                      padding: '14px',
                      background: 'var(--btn-secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                          {b.bookingCode || 'AUR-PASS'}
                        </span>
                        <span
                          style={{
                            fontSize: '9px',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            background: b.status === 'Cancelled' ? 'rgba(214, 34, 70, 0.2)' : 'rgba(40, 167, 69, 0.2)',
                            color: b.status === 'Cancelled' ? '#d62246' : 'inherit',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                          }}
                        >
                          {b.status || 'Confirmed'}
                        </span>
                      </div>
                      <strong style={{ fontSize: '14px', display: 'block' }}>{b.attraction}</strong>
                      <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                        Guest: <strong>{b.guestName}</strong> ({b.guestContact}) · {b.guestsCount}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                        Slot: {b.date} at {b.time}
                        {b.specialRequests && <span> · Request: "{b.specialRequests}"</span>}
                      </div>
                    </div>

                    {b.status !== 'Cancelled' && (
                      <button
                        className="btn secondary"
                        style={{ padding: '8px 12px', fontSize: '9px', borderColor: 'rgba(214, 34, 70, 0.4)' }}
                        onClick={() => handleCancelBooking(b._id || b.bookingCode)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Concierge Inquiries View */}
        {activeTab === 'inquiries' && (
          <div>
            {inquiries.length === 0 ? (
              <p style={{ color: 'var(--ink-muted)', fontSize: '13px' }}>
                No VIP inquiries logged yet.
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {inquiries.map((inq, idx) => (
                  <div
                    key={inq._id || idx}
                    style={{
                      padding: '14px',
                      background: 'var(--btn-secondary-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '14px' }}>{inq.serviceType}</strong>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 600 }}>
                        {inq.status || 'New'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--ink-muted)' }}>
                      Guest: <strong>{inq.guestName}</strong> ({inq.guestContact}) · Target Date: {inq.plannedDate}
                    </div>
                    {inq.notes && (
                      <div style={{ fontSize: '12px', marginTop: '6px', fontStyle: 'italic', color: 'var(--ink)' }}>
                        "{inq.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="actions" style={{ marginTop: '24px' }}>
          <button className="btn secondary" type="button" onClick={onClose}>
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

