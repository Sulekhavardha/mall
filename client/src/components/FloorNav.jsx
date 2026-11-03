import React from 'react';

export default function FloorNav({ currentFloor }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="floor-nav" id="floorNav" aria-label="Floor Navigator">
      <span className="floor-nav-badge">LEVEL</span>
      <button
        className={`floor-btn ${currentFloor === 'ground' ? 'active' : ''}`}
        onClick={() => scrollTo('fashion-shop')}
        aria-label="Navigate to Ground Floor"
      >
        <span className="num">00</span>
        <span>Ground Floor</span>
      </button>
      <button
        className={`floor-btn ${currentFloor === 'first' ? 'active' : ''}`}
        onClick={() => scrollTo('toys-shop')}
        aria-label="Navigate to First Floor"
      >
        <span className="num">01</span>
        <span>First Floor</span>
      </button>
      <button
        className={`floor-btn ${currentFloor === 'second' ? 'active' : ''}`}
        onClick={() => scrollTo('dining-section')}
        aria-label="Navigate to Second Floor"
      >
        <span className="num">02</span>
        <span>Second Floor</span>
      </button>
    </div>
  );
}

