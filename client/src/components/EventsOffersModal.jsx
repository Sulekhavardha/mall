import React, { useState } from 'react';
import { useMall } from '../context/MallContext';

const mallEvents = [
  {
    title: 'Kinetic Gold Chandelier: "Celestial Rhythms"',
    date: 'Daily Throughout November',
    location: 'Central Atrium · All 3 Floors',
    tag: 'Art Exhibition',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80',
    desc: 'Suspended three-tier kinetic gold torus sculpture performing synchronized harmonic light movements every hour on the hour.',
  },
  {
    title: 'Autumn Runway Showcase & Haute Couture Trunk Show',
    date: 'This Friday & Saturday · 7:30 PM',
    location: 'Level 00 · Grand Galleria',
    tag: 'Fashion Week',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    desc: 'Live runway fashion show featuring Parisian couture and Italian tailoring with champagne guest receptions.',
  },
  {
    title: '70mm IMAX Premiere Night: ELYSIUM MIRAGE',
    date: 'Next Friday · 8:00 PM',
    location: 'Level 02 · Cinema Luxe Screen 1',
    tag: 'Cinema Premiere',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    desc: 'Exclusive red-carpet screening with director intro, complimentary popcorn trio, and VIP gift bag.',
  },
  {
    title: 'Weekend Kids STEM & Robotics Tournament',
    date: 'Every Saturday & Sunday · 11:00 AM',
    location: 'Level 01 · Play Central',
    tag: 'Family & Kids',
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80',
    desc: 'Interactive Lego speed building and AI robotics challenge with prizes for young builders aged 5-14.',
  },
];

const mallOffers = [
  {
    title: 'Complimentary Valet & Hands-Free Shopping Delivery',
    terms: 'Valid on purchases above $1,000 across all Level 00 boutiques.',
    badge: 'VIP Privilege',
  },
  {
    title: 'Cinema & Gastronomy Duo: 25% Off Dining Credit',
    terms: 'Book any IMAX 3D recliner ticket and receive a $25 dining voucher at Le Bistro Paris.',
    badge: 'Dining Special',
  },
  {
    title: 'Wonder Toys Weekend Pass: Buy 1 Get 1 Family Admission',
    terms: 'Valid for CloudNine Soft Play Zone every Sunday morning before 1:00 PM.',
    badge: 'Kids Offer',
  },
];

export default function EventsOffersModal({ onOpenBooking, onOpenVisit }) {
  const { isEventsOpen, setIsEventsOpen } = useMall();
  const [activeTab, setActiveTab] = useState('events');

  if (!isEventsOpen) return null;

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('modal-backdrop')) setIsEventsOpen(false);
      }}
    >
      <div className="modal-card events-modal-card">
        <div className="events-modal-header">
          <div>
            <span className="panel-tag">WHAT'S HAPPENING AT AURELIA</span>
            <h2>Events & Special Privileges</h2>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsEventsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="events-tab-row">
          <button
            type="button"
            className={`events-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Upcoming Events & Exhibitions (4)
          </button>
          <button
            type="button"
            className={`events-tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            Special Offers & Mall Perks (3)
          </button>
        </div>

        {/* Events Tab Content */}
        {activeTab === 'events' && (
          <div className="events-cards-grid">
            {mallEvents.map((ev, idx) => (
              <div key={idx} className="event-item-card">
                <div className="event-item-media">
                  <img src={ev.image} alt={ev.title} />
                  <span className="event-tag-pill">{ev.tag}</span>
                </div>
                <div className="event-item-body">
                  <div className="event-date-row">
                    <span>📅 {ev.date}</span>
                    <span>📍 {ev.location}</span>
                  </div>
                  <h3>{ev.title}</h3>
                  <p>{ev.desc}</p>
                  <button
                    type="button"
                    className="btn secondary"
                    style={{ padding: '8px 16px', fontSize: '9px', marginTop: '12px' }}
                    onClick={() => {
                      setIsEventsOpen(false);
                      onOpenVisit();
                    }}
                  >
                    Reserve Guest Pass ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Offers Tab Content */}
        {activeTab === 'offers' && (
          <div className="offers-list">
            {mallOffers.map((off, idx) => (
              <div key={idx} className="offer-item-card">
                <div className="offer-badge">{off.badge}</div>
                <div className="offer-info">
                  <h3>{off.title}</h3>
                  <p>{off.terms}</p>
                </div>
                <button
                  type="button"
                  className="btn"
                  style={{ padding: '9px 16px', fontSize: '9.5px', whiteSpace: 'nowrap' }}
                  onClick={() => {
                    setIsEventsOpen(false);
                    onOpenVisit();
                  }}
                >
                  Claim with Concierge ↗
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

