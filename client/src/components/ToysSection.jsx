import React, { useState } from 'react';
import { sectionsData } from '../data/sectionsData';

const defaultGallery = [
  {
    url: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=300&q=80',
    badge: 'Toy Wonderland · Level 01',
    label: 'Plush World',
    title: 'Wonder Toys & Play Lab',
    desc: 'Imaginative toys, Lego construction labs, giant plushies, and interactive robotics workshops on Level 01.',
  },
  {
    url: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=300&q=80',
    badge: 'Creative Lego Builds · Level 01',
    label: 'Lego Builds',
    title: 'Master Lego Builder Studio',
    desc: 'Life-sized architectural builds, motor kit challenges, and custom minifig stations.',
  },
  {
    url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=300&q=80',
    badge: 'Educational & Robotics · Level 01',
    label: 'Robotics',
    title: 'Kids STEM & Robotics Lab',
    desc: 'Hands-on coding robots, sensor kits, and interactive mechanical playground.',
  },
];

export default function ToysSection({
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
      id="toys-shop"
      data-scene="3"
      data-level="first"
    >
      <div className="walkthrough-section-container">
        {/* Left Column: Luxury Editorial & Photo Vitrine */}
        <div className="walkthrough-editorial-panel">
          <div className="panel-tag">03 / LEVEL 01 · TOYS & PLAY LAB</div>
          <h2>
            Wonder, Play &<br />
            <em>Endless Smiles.</em>
          </h2>
          <p>
            {storeData?.description ||
              'Welcome to our vibrant Toys & Play Lab! Discover premium educational toys, rare collectibles, giant plush collections, interactive robotics, and imaginative family fun for children of every age.'}
          </p>

          <div className="panel-media">
            <img
              className="main-img"
              src={currentItem.url}
              alt="Toys & Kids Wonderland"
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
                  'FIRST FLOOR / TOYS'
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
              onClick={() => onNavigateCategory('toys-games')}
            >
              Toy Wonderland ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('kids-play-zone')}
            >
              Kids Play Zone ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('educational-toys')}
            >
              Robotics & STEM ↗
            </span>
            <span
              className="chip"
              onClick={() => onNavigateCategory('building-blocks')}
            >
              Building Blocks ↗
            </span>
          </div>

          <div className="highlights">
            <div className="highlight-item">
              <strong>Level 01</strong>
              <span>Toy Boutique</span>
            </div>
            <div className="highlight-item">
              <strong>Interactive</strong>
              <span>Hands-on Play Zone</span>
            </div>
          </div>
        </div>

        {/* Right Column: 8 Interactive 3D Category Boxes */}
        <div className="walkthrough-cat-deck">
          <div className="cat-boxes-header">
            <span className="cat-boxes-tag">8 WONDER TOYS & PLAY REALMS</span>
            <span className="cat-boxes-sub">Hover for 3D tilt · Tap to explore dedicated vitrine</span>
          </div>
          <div className="cat-boxes-grid">
            {sectionsData.kids.categories.map((cat, idx) => (
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
