import React from 'react';

const atriumPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=900&q=80',
    title: 'Grand 3-Storey Atrium Vista',
    desc: 'The soaring central skylight illuminates polished travertine marble floors and multi-tiered shopping balconies.',
    tag: 'ALL LEVELS / ARCHITECTURE',
    label: 'Central Atrium',
  },
  {
    src: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=900&q=80',
    title: 'Grand Entrance Plaza & Facade',
    desc: 'Water fountains, bronze architectural colonnades, and glass curtain facade greeting every guest.',
    tag: 'OUTDOOR / ENTRANCE',
    label: 'Entrance Plaza',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    title: 'Level 02 Dining Balcony',
    desc: 'Overlooking the central atrium sculpture with warm hanging lanterns and artisanal terrace cafes.',
    tag: 'LEVEL 02 / PROMENADE',
    label: 'Dining Terrace',
  },
  {
    src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    title: 'Level 00 Haute Joaillerie Salon',
    desc: 'Showcasing world-class Swiss chronometers and diamond vitrines in an intimate, bespoke environment.',
    tag: 'LEVEL 00 / JEWELLERY',
    label: 'Jewellery Salon',
  },
];

export default function AtriumSection({ active, onOpenVisit, onOpenLightbox }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        className={`section center ${active ? 'active-scene' : ''}`}
        id="atrium-reveal"
        data-scene="6"
        data-level="all"
      >
        <div className="panel">
          {/* 4-Photo Atrium Gallery Grid */}
          <div className="atrium-gallery-grid">
            {atriumPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="atrium-grid-item"
                onClick={() => onOpenLightbox(photo.src, photo.title, photo.desc, photo.tag)}
                style={{ cursor: 'pointer' }}
              >
                <img src={photo.src} alt={photo.label} />
                <span>{photo.label}</span>
              </div>
            ))}
          </div>

          <div className="panel-tag">YOUR NEXT EXPERIENCE STARTS HERE</div>
          <h2>
            We Can't Wait<br />
            to Welcome <em>You.</em>
          </h2>
          <p>
            From luxury fashion and toy shops to exquisite dining and cinema, explore three levels of architectural splendor at Aurelia. Plan your visit today.
          </p>
          <div className="actions">
            <button className="btn" type="button" onClick={onOpenVisit}>
              Plan Your Visit <span>↗</span>
            </button>
            <a
              className="btn secondary"
              href="#entrance"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('entrance');
              }}
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span>AURELIA <span>/</span> LUXURY SHOPPING DESTINATION (MERN)</span>
        <div className="footer-links">
          <a href="#fashion-shop" onClick={(e) => { e.preventDefault(); scrollTo('fashion-shop'); }}>Fashion Shop</a>
          <a href="#toys-shop" onClick={(e) => { e.preventDefault(); scrollTo('toys-shop'); }}>Toys Shop</a>
          <a href="#dining-section" onClick={(e) => { e.preventDefault(); scrollTo('dining-section'); }}>Dining</a>
          <a href="#cinema-section" onClick={(e) => { e.preventDefault(); scrollTo('cinema-section'); }}>Cinema</a>
          <a href="#atrium-reveal" onClick={(e) => { e.preventDefault(); scrollTo('atrium-reveal'); }}>Concierge</a>
        </div>
        <span>© 2026 Aurelia Mall Development Group. All Rights Reserved.</span>
      </footer>
    </>
  );
}

