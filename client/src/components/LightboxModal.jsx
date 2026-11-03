import React from 'react';

export default function LightboxModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <div
      className={`lightbox-modal ${isOpen ? 'active' : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('lightbox-modal') || e.target.classList.contains('lightbox-overlay')) {
          onClose();
        }
      }}
    >
      <div className="lightbox-overlay"></div>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose} aria-label="Close photo view">
          ✕
        </button>
        <div className="lightbox-img-wrap">
          <img src={data.src} alt={data.title || 'Enlarged photo view'} />
        </div>
        <div className="lightbox-caption">
          <div className="lightbox-tag">{data.tag || 'AURELIA GALLERY'}</div>
          <div className="lightbox-title">{data.title || 'Aurelia Luxury Collection'}</div>
          <div className="lightbox-desc">{data.desc || 'Experience three levels of world-class architectural and retail splendor.'}</div>
        </div>
      </div>
    </div>
  );
}
