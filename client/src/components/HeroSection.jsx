import React from 'react';

export default function HeroSection({ active, onNavigateSection, onNavigateCategory }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={`section hero ${active ? 'active-scene' : ''}`}
      id="entrance"
      data-scene="0"
      data-level="ground"
    >
      <div className="hero-copy">
        <div className="eyebrow">THE DESTINATION FOR EVERYTHING</div>
        <h1>
          More Than Shopping.<br />
          A World of <em>Experiences.</em>
        </h1>
        <p>
          Discover a destination where luxury fashion shops, toys & family wonderland, gourmet dining, and VIP cinema come together in an extraordinary multi-storey architectural walkthrough.
        </p>
        <div className="actions">
          <button
            type="button"
            className="btn"
            onClick={() => onNavigateSection('shopping')}
          >
            Explore All 12 Shops <span>↗</span>
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => onNavigateCategory('toys-games')}
          >
            Explore Wonder Toys
          </button>
        </div>

        {/* Entrance Visual Preview Photo Cards */}
        <div className="hero-gallery-strip">
          <div
            className="hero-photo-card"
            onClick={() => onNavigateCategory('womens-fashion')}
            style={{ cursor: 'pointer' }}
            title="Open Dedicated Women's Fashion Page"
          >
            <div className="hero-photo-thumb">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"
                alt="Level 00 Fashion & Jewellery"
              />
              <span className="level-pill">LEVEL 00</span>
            </div>
            <div className="hero-photo-info">
              <strong>Fashion & High Jewellery</strong>
              <span>Women's Fashion · Maison Vendôme ↗</span>
            </div>
          </div>

          <div
            className="hero-photo-card"
            onClick={() => onNavigateCategory('kids-play-zone')}
            style={{ cursor: 'pointer' }}
            title="Open Dedicated Kids Play Zone Page"
          >
            <div className="hero-photo-thumb">
              <img
                src="https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=600&q=80"
                alt="Level 01 Toys & Play Lab"
              />
              <span className="level-pill">LEVEL 01</span>
            </div>
            <div className="hero-photo-info">
              <strong>Wonder Toys & Kids Lab</strong>
              <span>CloudNine Play Zone · Robotics ↗</span>
            </div>
          </div>

          <div
            className="hero-photo-card"
            onClick={() => onNavigateCategory('now-showing')}
            style={{ cursor: 'pointer' }}
            title="Open Dedicated Cinema Now Showing Page"
          >
            <div className="hero-photo-thumb">
              <img
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80"
                alt="Level 02 Dining & Cinema"
              />
              <span className="level-pill">LEVEL 02</span>
            </div>
            <div className="hero-photo-info">
              <strong>Gourmet Dining & IMAX</strong>
              <span>Cinema Luxe VIP · Le Bistro ↗</span>
            </div>
          </div>
        </div>

        <div className="scroll-note">Scroll down to journey into each shop & section</div>
      </div>
    </section>
  );
}
