import React, { useState } from 'react';
import { sectionsData } from '../data/sectionsData';

const defaultGallery = [
  {
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80',
    badge: 'Runway Fashion · Level 00',
    label: 'Haute Runway',
    title: 'Maison Vendôme Haute Couture',
    desc: 'Curated runway collections, bespoke Parisian tailoring, and private VIP styling suites on Level 00.',
  },
  {
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80',
    badge: 'Leather Goods · Level 00',
    label: 'Leathercraft',
    title: 'Artisanal Leather & Accessories',
    desc: 'Handmade Italian leather bags, monogrammed trunks, and fine footwear craftsmanship.',
  },
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80',
    badge: 'Boutique Studio · Level 00',
    label: 'VIP Studio',
    title: 'Private Styling Suites',
    desc: 'Dedicated private suites with personal shoppers and champagne consultation.',
  },
];

export default function FashionSection({
  active,
  storeData,
  onOpenLightbox,
  onNavigateCategory,
  onNavigateSection,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentItem = defaultGallery[activeIndex];

  return (
    <section
      className={`section walkthrough-3d-section ${active ? 'active-scene' : ''}`}
      id="fashion-shop"
      data-scene="1"
      data-level="ground"
    >
      <div className="walkthrough-section-container">
        {/* Left Column: Luxury Editorial & Photo Vitrine */}
        <div className="walkthrough-editorial-panel">
          <div className="panel-tag">01 / LEVEL 00 · FASHION GALLERIA</div>
          <h2>
            Discover Your<br />
            <em>Signature Style.</em>
          </h2>
          <p>
            {storeData?.description ||
              'Step directly into our premier fashion boutiques. Explore Parisian ready-to-wear, bespoke Italian tailoring, Swiss horology, fine joaillerie, and curated runway collections with personalized styling suites.'}
          </p>

          <div className="panel-media">
            <img
              className="main-img"
              src={currentItem.url}
              alt="Luxury Fashion Boutique"
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
                  'GROUND FLOOR / FASHION'
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

          {/* Clickable Subcategories Quick Chips */}
          <div className="chips">
            <span
              className="chip"
              onClick={() => onNavigateCategory('womens-fashion')}
              title="Open Women's Fashion"
            >
              Haute Couture ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('mens-fashion')}
              title="Open Men's Fashion"
            >
              Men's Tailoring ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('bags-accessories')}
              title="Open Bags & Accessories"
            >
              Leather Goods ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('footwear')}
              title="Open Footwear"
            >
              Footwear ↗
            </span>
          </div>

          <div className="highlights">
            <div className="highlight-item">
              <strong>Level 00</strong>
              <span>Fashion Galleria</span>
            </div>
            <div className="highlight-item">
              <strong>75+</strong>
              <span>Global Boutiques</span>
            </div>
          </div>
        </div>

        {/* Right Column: 12 Interactive 3D Category Boxes */}
        <div className="walkthrough-cat-deck">
          <div className="cat-boxes-header">
            <span className="cat-boxes-tag">12 DEDICATED SHOPPING REALMS</span>
            <span className="cat-boxes-sub">Hover for 3D tilt · Tap to explore dedicated vitrine</span>
          </div>
          <div className="cat-boxes-grid">
            {sectionsData.shopping.categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="cat-box-card"
                style={{ animationDelay: `${idx * 0.05}s` }}
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
