import React, { useState } from 'react';
import { useMall } from '../context/MallContext';

const mallStoresDirectory = [
  // Level 00
  { name: 'Maison Vendôme', floor: 'Level 00', category: 'Fashion & Luxury', unit: 'Store 101', catId: 'womens-fashion', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0101' },
  { name: 'Cartier & Diamant Salon', floor: 'Level 00', category: 'Jewellery & Diamonds', unit: 'Store 102', catId: 'jewellery', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0102' },
  { name: 'Sartoria Napoli', floor: 'Level 00', category: "Men's Fashion", unit: 'Store 103', catId: 'mens-fashion', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0103' },
  { name: 'Atelier Milano', floor: 'Level 00', category: "Women's Fashion", unit: 'Store 104', catId: 'womens-fashion', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0104' },
  { name: 'Swiss Horology & Patek', floor: 'Level 00', category: 'Master Watches', unit: 'Store 105', catId: 'watches', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0105' },
  { name: 'Geneva Goldsmiths', floor: 'Level 00', category: 'Fine Gold & Gems', unit: 'Store 106', catId: 'jewellery', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0106' },
  { name: 'Saint-Honoré Paris', floor: 'Level 00', category: 'Ready-to-Wear', unit: 'Store 108', catId: 'womens-fashion', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0108' },
  { name: 'Kingsman & Co. Tailors', floor: 'Level 00', category: "Bespoke Men's Suiting", unit: 'Store 110', catId: 'mens-fashion', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0110' },
  { name: 'Pellegrini Firenze Leather', floor: 'Level 00', category: 'Bags & Accessories', unit: 'Store 114', catId: 'bags-accessories', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0114' },
  { name: 'Vittorio Rossi Shoes', floor: 'Level 00', category: 'Luxury Footwear', unit: 'Store 117', catId: 'footwear', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 011-0117' },

  // Level 01
  { name: 'Wonder Toys Flagship', floor: 'Level 01', category: 'Toys & Collectibles', unit: 'Store 201', catId: 'toys-games', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 012-0201' },
  { name: 'StemIQ Robotics Lab', floor: 'Level 01', category: 'Educational STEM', unit: 'Store 203', catId: 'educational-toys', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 012-0203' },
  { name: 'Parfums Royale & Niche Beauty', floor: 'Level 01', category: 'Beauty & Cosmetics', unit: 'Store 205', catId: 'beauty-cosmetics', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 012-0205' },
  { name: 'Lego Brick Master Studio', floor: 'Level 01', category: 'Building Blocks', unit: 'Store 208', catId: 'building-blocks', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 012-0208' },
  { name: 'Petite Fleur Girls Boutique', floor: 'Level 01', category: 'Girls Fashion', unit: 'Store 211', catId: 'girls-fashion', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 012-0211' },
  { name: 'Neo Tokyo Streetwear Studio', floor: 'Level 01', category: 'Teen Fashion', unit: 'Store 216', catId: 'teen-fashion', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 012-0216' },
  { name: 'Bébé Luxe Organic Nursery', floor: 'Level 01', category: 'Kids & Baby', unit: 'Store 220', catId: 'kids-baby', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 012-0220' },
  { name: 'Maison Textile & Home Living', floor: 'Level 01', category: 'Lifestyle & Interiors', unit: 'Store 224', catId: 'lifestyle-home', hours: '10:00 AM - 10:00 PM', phone: '+1 (555) 012-0224' },
  { name: 'The Aurelia Day Spa & Retreat', floor: 'Level 01', category: 'Wellness & Spa', unit: 'Sanctuary East', catId: 'beauty-wellness', hours: '09:00 AM - 09:00 PM', phone: '+1 (555) 012-0299' },

  // Level 02
  { name: 'Cinema Luxe IMAX 12-Screen', floor: 'Level 02', category: 'Cinema & Multiplex', unit: 'Auditoriums 1-12', catId: 'now-showing', hours: '10:00 AM - 01:00 AM', phone: '+1 (555) 013-0301' },
  { name: 'Le Bistro Paris Fine Dining', floor: 'Level 02', category: 'Fine Dining Brasserie', unit: 'Terrace East', catId: 'fine-dining', hours: '11:30 AM - 12:30 AM', phone: '+1 (555) 013-0302' },
  { name: 'Sora Robata Teppanyaki', floor: 'Level 02', category: 'Japanese Gastronomy', unit: 'Terrace North', catId: 'fine-dining', hours: '12:00 PM - 12:00 AM', phone: '+1 (555) 013-0303' },
  { name: 'Café Botanica Specialty Roasters', floor: 'Level 02', category: 'Artisanal Cafes', unit: 'Promenade Balcony', catId: 'cafes', hours: '08:30 AM - 11:00 PM', phone: '+1 (555) 013-0304' },
  { name: 'Velocity Arcade & Racing Sims', floor: 'Level 02', category: 'Arcade Gaming', unit: 'South Hub', catId: 'arcade-games', hours: '10:00 AM - 12:00 AM', phone: '+1 (555) 013-0305' },
  { name: 'Omni VR Holodeck Arena', floor: 'Level 02', category: 'Virtual Reality', unit: 'VR Suite', catId: 'virtual-reality', hours: '11:00 AM - 11:00 PM', phone: '+1 (555) 013-0306' },
  { name: 'The Strike Club Boutique Bowling', floor: 'Level 02', category: 'VIP Bowling', unit: 'East Lounge', catId: 'bowling', hours: '11:00 AM - 12:30 AM', phone: '+1 (555) 013-0307' },
  { name: 'CloudNine Kids Soft Adventure', floor: 'Level 02', category: 'Play Playground', unit: 'Play Pavilion', catId: 'kids-play-zone', hours: '10:00 AM - 09:30 PM', phone: '+1 (555) 013-0308' },
  { name: 'Gelateria Firenze & Patisserie', floor: 'Level 02', category: 'Desserts & Gelato', unit: 'Sweet Court', catId: 'desserts-ice-cream', hours: '10:00 AM - 12:00 AM', phone: '+1 (555) 013-0309' },
];

export default function StoreDirectoryModal({ onNavigateCategory }) {
  const { isDirectoryOpen, setIsDirectoryOpen } = useMall();
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isDirectoryOpen) return null;

  const filteredStores = mallStoresDirectory.filter((s) => {
    if (selectedFloor !== 'all' && s.floor !== selectedFloor) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.unit.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('modal-backdrop')) setIsDirectoryOpen(false);
      }}
    >
      <div className="modal-card directory-modal-card">
        <div className="directory-modal-header">
          <div>
            <span className="panel-tag">AURELIA MALL COMPREHENSIVE DIRECTORY</span>
            <h2>Store & Experience Directory</h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '13px', margin: '4px 0 0' }}>
              Locate any luxury boutique, cinema screen, restaurant, or play arena across all three levels.
            </p>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsDirectoryOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Filters Bar */}
        <div className="directory-filters-bar">
          <div className="floor-filter-pills">
            <button
              type="button"
              className={`dir-pill ${selectedFloor === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFloor('all')}
            >
              All Levels
            </button>
            <button
              type="button"
              className={`dir-pill ${selectedFloor === 'Level 00' ? 'active' : ''}`}
              onClick={() => setSelectedFloor('Level 00')}
            >
              Level 00 (Fashion & Jewellery)
            </button>
            <button
              type="button"
              className={`dir-pill ${selectedFloor === 'Level 01' ? 'active' : ''}`}
              onClick={() => setSelectedFloor('Level 01')}
            >
              Level 01 (Toys & Lifestyle)
            </button>
            <button
              type="button"
              className={`dir-pill ${selectedFloor === 'Level 02' ? 'active' : ''}`}
              onClick={() => setSelectedFloor('Level 02')}
            >
              Level 02 (Dining & Cinema)
            </button>
          </div>

          <input
            type="text"
            className="directory-search-input"
            placeholder="Filter stores by name, category, or unit..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

        {/* Stores Table Grid */}
        <div className="directory-table-container">
          <div className="directory-grid-list">
            {filteredStores.map((store, idx) => (
              <div key={idx} className="dir-store-card">
                <div className="dir-store-header">
                  <span className="dir-floor-badge">{store.floor}</span>
                  <span className="dir-unit-badge">{store.unit}</span>
                </div>
                <h3>{store.name}</h3>
                <span className="dir-cat-label">{store.category}</span>
                <div className="dir-hours-row">
                  <span>🕒 {store.hours}</span>
                  <span>📞 {store.phone}</span>
                </div>
                <button
                  type="button"
                  className="dir-visit-btn"
                  onClick={() => {
                    setIsDirectoryOpen(false);
                    onNavigateCategory(store.catId);
                  }}
                >
                  View Catalog Page ↗
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

