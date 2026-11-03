import React, { useState } from 'react';
import { sectionsData } from '../data/sectionsData';

const defaultGallery = [
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80',
    badge: 'Fine Dining Terrace · Level 02',
    label: 'Fine Dining',
    title: 'Le Bistro Paris Fine Dining',
    desc: 'Sunlit culinary terrace featuring artisanal cafes, authentic Japanese robata grills, and French patisseries.',
  },
  {
    url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80',
    badge: 'Robata Teppan & Sushi · Level 02',
    label: 'Robata Grill',
    title: 'Sora Japanese Robata & Teppanyaki',
    desc: 'Live flame robata skewers, bluefin otoro sashimi, and sake sommelier pairings on Level 02.',
  },
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
    badge: 'Artisanal Cafe & Bakery · Level 02',
    label: 'Café Terrace',
    title: 'Café Botanica & French Bakery',
    desc: 'Specialty pour-overs, flaky cardamom brioches, and afternoon tea under open glass skylights.',
  },
];

export default function DiningSection({
  active,
  storeData,
  onOpenLightbox,
  onNavigateCategory,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentItem = defaultGallery[activeIndex];

  return (
    <section
      className={`section walkthrough-3d-section ${active ? 'active-scene' : ''}`}
      id="dining-section"
      data-scene="4"
      data-level="second"
    >
      <div className="walkthrough-section-container">
        {/* Left Column: Luxury Editorial & Photo Vitrine */}
        <div className="walkthrough-editorial-panel">
          <div className="panel-tag">04 / LEVEL 02 · GOURMET DINING PROMENADE</div>
          <h2>
            A Taste of<br />
            <em>Every Experience.</em>
          </h2>
          <p>
            {storeData?.description ||
              "Ascend to Level 02's sunlit culinary terrace. Savor artisanal cafes, French brasseries, authentic Japanese robata grills, and patisseries under warm hanging lanterns."}
          </p>

          <div className="panel-media">
            <img
              className="main-img"
              src={currentItem.url}
              alt="Gourmet Dining Terrace"
              style={{ transition: 'opacity 0.25s ease' }}
            />
            <span className="media-badge">{currentItem.badge}</span>
            <button
              className="media-expand-btn"
              type="button"
              onClick={() =>
                onOpenLightbox(
                  currentItem.url,
                  currentItem.title,
                  currentItem.desc,
                  'SECOND FLOOR / DINING'
                )
              }
              title="View Fullsize"
            >
              ⛶
            </button>
          </div>

          {/* 3-Photo Gallery Switcher */}
          <div className="gallery-thumbs">
            {defaultGallery.map((item, idx) => (
              <div
                key={idx}
                className={`thumb-item ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <img src={item.thumb} alt={item.label} />
                <span className="thumb-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="chips">
            <span
              className="chip"
              onClick={() => onNavigateCategory('fine-dining')}
            >
              Fine Dining ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('cafes')}
            >
              Artisan Cafes ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('food-court')}
            >
              Food Court ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('bakery')}
            >
              Bakery ↗
            </span>
          </div>

          <div className="highlights">
            <div className="highlight-item">
              <strong>Level 02</strong>
              <span>Culinary Promenade</span>
            </div>
            <div className="highlight-item">
              <strong>38+</strong>
              <span>Gourmet Destinations</span>
            </div>
          </div>
        </div>

        {/* Right Column: 8 Interactive 3D Category Boxes */}
        <div className="walkthrough-cat-deck">
          <div className="cat-boxes-header">
            <span className="cat-boxes-tag">8 GOURMET DINING & CATERING REALMS</span>
            <span className="cat-boxes-sub">Hover for 3D tilt · Tap to explore dedicated vitrine</span>
          </div>
          <div className="cat-boxes-grid">
            {sectionsData.dining.categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="cat-box-card"
                style={{ animationDelay: `${idx * 0.06}s` }}
                onClick={() => onNavigateCategory(cat.id)}
                title={`Open ${cat.title} Dedicated Vitrine`}
              >
                <div className="cat-box-top">
                  <span className="cat-box-icon">{cat.icon}</span>
                  {cat.badge && <span className="cat-box-badge">{cat.badge}</span>}
                </div>
                <h4>{cat.title}</h4>
                <p>{cat.count}</p>
                <span className="cat-box-cta">Explore Dedicated Page ↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
