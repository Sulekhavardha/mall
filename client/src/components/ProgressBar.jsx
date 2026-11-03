import React from 'react';

const steps = [
  { id: 'entrance', label: 'Entrance Plaza' },
  { id: 'fashion-shop', label: 'Shop: Fashion & Luxury' },
  { id: 'jewellery-shop', label: 'Shop: High Jewellery' },
  { id: 'toys-shop', label: 'Shop: Toys & Play Lab' },
  { id: 'dining-section', label: 'Level 02: Dining Terrace' },
  { id: 'cinema-section', label: 'Level 02: Cinema & Entertainment' },
  { id: 'atrium-reveal', label: 'Grand Architectural Vista' },
];

export default function ProgressBar({ activeSceneIndex }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="progress" id="progress" aria-label="Walkthrough progress">
      <div className="progress-track"></div>
      {steps.map((step, idx) => (
        <button
          key={step.id}
          className={activeSceneIndex === idx ? 'active' : ''}
          aria-label={step.label}
          onClick={() => scrollTo(step.id)}
          title={step.label}
        />
      ))}
    </div>
  );
}

