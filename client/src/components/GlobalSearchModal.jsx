import React, { useState, useEffect, useRef } from 'react';
import { useMall } from '../context/MallContext';

export default function GlobalSearchModal({ onNavigateCategory }) {
  const { isSearchOpen, setIsSearchOpen, searchGlobal } = useMall();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setResults(searchGlobal(val));
  };

  if (!isSearchOpen) return null;

  const handleSelectResult = (item) => {
    setIsSearchOpen(false);
    if (item.categoryId) {
      onNavigateCategory(item.categoryId);
    } else if (item.id) {
      onNavigateCategory(item.id);
    }
  };

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('modal-backdrop')) setIsSearchOpen(false);
      }}
    >
      <div className="modal-card search-modal-card">
        <div className="search-modal-header">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search stores, designer fashion, movies, dining, toys, VR..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            type="button"
            className="search-modal-close"
            onClick={() => setIsSearchOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="search-results-container">
          {!searchTerm.trim() ? (
            <div className="search-suggestions-box">
              <span className="suggestions-title">POPULAR LUXURY SEARCHES:</span>
              <div className="suggestion-tags">
                <button type="button" className="sug-tag" onClick={() => { setSearchTerm("Women's Fashion"); setResults(searchGlobal("Women's Fashion")); }}>
                  👗 Women's Fashion
                </button>
                <button type="button" className="sug-tag" onClick={() => { setSearchTerm("Footwear"); setResults(searchGlobal("Footwear")); }}>
                  👠 Footwear & Shoes
                </button>
                <button type="button" className="sug-tag" onClick={() => { setSearchTerm("Cinema IMAX"); setResults(searchGlobal("Cinema IMAX")); }}>
                  🎬 IMAX 3D Movies
                </button>
                <button type="button" className="sug-tag" onClick={() => { setSearchTerm("Fine Dining"); setResults(searchGlobal("Fine Dining")); }}>
                  🍷 Fine Dining
                </button>
                <button type="button" className="sug-tag" onClick={() => { setSearchTerm("Wonder Toys"); setResults(searchGlobal("Wonder Toys")); }}>
                  🧸 Kids Toys & Lego
                </button>
                <button type="button" className="sug-tag" onClick={() => { setSearchTerm("Virtual Reality"); setResults(searchGlobal("Virtual Reality")); }}>
                  🥽 Omni VR Holodeck
                </button>
                <button type="button" className="sug-tag" onClick={() => { setSearchTerm("Watches"); setResults(searchGlobal("Watches")); }}>
                  ⌚ Swiss Chronometers
                </button>
                <button type="button" className="sug-tag" onClick={() => { setSearchTerm("Jewellery"); setResults(searchGlobal("Jewellery")); }}>
                  💎 Haute Joaillerie
                </button>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="search-empty-state">
              <p>No results found for "{searchTerm}". Try searching for brands like "Maison Vendôme", "IMAX", "Robata", or "Lego".</p>
            </div>
          ) : (
            <div className="search-results-list">
              <span className="results-count-banner">Found {results.length} results across Aurelia Mall:</span>
              {results.map((res, idx) => (
                <div
                  key={idx}
                  className="search-result-item"
                  onClick={() => handleSelectResult(res)}
                >
                  <img src={res.image} alt={res.title} className="result-thumb" />
                  <div className="result-info">
                    <h4>{res.title}</h4>
                    <span>{res.subtitle}</span>
                  </div>
                  <span className="result-type-pill">{res.type === 'category' ? 'Category' : 'Item'} ↗</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--line-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--ink-muted)' }}>
          <span>Tip: Search across 48 categories, 150+ boutiques, showtimes & menus</span>
          <span style={{ background: 'var(--btn-secondary-bg)', padding: '3px 10px', borderRadius: '12px', border: '1px solid var(--card-border)', font: '600 10px "Manrope", sans-serif', letterSpacing: '0.08em' }}>ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
