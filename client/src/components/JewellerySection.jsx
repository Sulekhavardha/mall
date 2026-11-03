import React, { useState } from 'react';

const defaultGallery = [
  {
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80',
    badge: 'Haute Joaillerie · Level 00',
    label: 'Rare Gems',
    title: 'Diamant Vendôme High Jewellery',
    desc: 'Illuminated crystal vitrines presenting Swiss chronometers, master diamond cutters, and rare solitaires.',
  },
  {
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=300&q=80',
    badge: 'Swiss Timepieces · Level 00',
    label: 'Timepieces',
    title: 'Swiss Master Horology',
    desc: 'Tourbillon complications, perpetual calendars, and limited edition horological masterpieces.',
  },
  {
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80',
    badge: 'Diamond Vitrine · Level 00',
    label: 'Fine Gold',
    title: 'Imperial Goldsmiths',
    desc: 'Hand-chiseled 18k yellow and rose gold sets crafted by Geneva goldsmiths.',
  },
];

const watchAndJewelleryCards = [
  {
    id: 'watches',
    title: 'Master Watches & Chronometers',
    icon: '⌚',
    badge: 'Swiss Master',
    count: '16 Maisons · Level 00',
    desc: 'Grand Complications, Tourbillons, Perpetual Calendars, and certified Swiss chronometers.',
  },
  {
    id: 'jewellery',
    title: 'Haute Joaillerie & Solitaires',
    icon: '💎',
    badge: 'Rare Gems',
    count: '18 Salons · Level 00',
    desc: 'D-flawless diamonds, Colombian emeralds, and bespoke hand-set platinum colliers.',
  },
  {
    id: 'timepieces-tourbillon',
    title: 'Grand Complications Vitrine',
    icon: '⚙️',
    badge: 'Horology Atelier',
    count: 'Openworked Calibres',
    desc: 'Minute repeaters, flying tourbillons, and hand-beveled rose gold calibres.',
  },
  {
    id: 'imperial-gold',
    title: 'Imperial Goldsmiths Atelier',
    icon: '👑',
    badge: '18K & Platinum',
    count: 'Artisanal Craft',
    desc: 'Hand-chiseled yellow gold filigree and bespoke royal commissions.',
  },
];

export default function JewellerySection({
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
      id="jewellery-shop"
      data-scene="2"
      data-level="ground"
    >
      <div className="walkthrough-section-container">
        {/* Left Column: Luxury Editorial & Photo Vitrine */}
        <div className="walkthrough-editorial-panel">
          <div className="panel-tag">02 / LEVEL 00 · HIGH JOAILLERIE & WATCHES</div>
          <h2>
            Timeless Craft.<br />
            Rare <em>Diamonds.</em>
          </h2>
          <p>
            {storeData?.description ||
              "Admire illuminated vitrines showcasing Swiss chronometers, master diamond cutters, and bespoke fine jewellery crafted by the world's most venerated houses on Level 00."}
          </p>

          <div className="panel-media">
            <img
              className="main-img"
              src={currentItem.url}
              alt="Haute Joaillerie & Swiss Watches"
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
                  'GROUND FLOOR / JEWELLERY'
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
              onClick={() => onNavigateCategory('watches')}
            >
              Swiss Timepieces ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('jewellery')}
            >
              Fine Diamonds ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('beauty-cosmetics')}
            >
              Parfumerie ↗
            </span>
          </div>

          <div className="highlights">
            <div className="highlight-item">
              <strong>Level 00</strong>
              <span>Horology Promenade</span>
            </div>
            <div className="highlight-item">
              <strong>Maison</strong>
              <span>Vendôme Salons</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Category Deck for Watches & Jewellery */}
        <div className="walkthrough-cat-deck">
          <div className="cat-boxes-header">
            <span className="cat-boxes-tag">HOROLOGY & HIGH JEWELLERY VITRINES</span>
            <span className="cat-boxes-sub">Hover for 3D tilt · Interactive luxury showcases</span>
          </div>
          <div className="cat-boxes-grid">
            {watchAndJewelleryCards.map((cat, idx) => (
              <div
                key={cat.id}
                className="cat-box-card"
                style={{ animationDelay: `${idx * 0.08}s` }}
                onClick={() =>
                  onOpenLightbox(
                    defaultGallery[idx % defaultGallery.length].url,
                    cat.title,
                    cat.desc,
                    'LEVEL 00 · HOROLOGY & GEMS'
                  )
                }
                title={`View ${cat.title} Showcase`}
              >
                <div className="cat-box-top">
                  <span className="cat-box-icon">{cat.icon}</span>
                  {cat.badge && <span className="cat-box-badge">{cat.badge}</span>}
                </div>
                <h4>{cat.title}</h4>
                <p>{cat.desc}</p>
                <span className="cat-box-cta">View Vitrine ⛶</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
