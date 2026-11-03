import React from 'react';
import { useMall } from '../context/MallContext';

export default function WishlistDrawer({ onOpenBooking, onOpenVisit, onNavigateCategory }) {
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useMall();

  if (!isWishlistOpen) return null;

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains('modal-backdrop')) setIsWishlistOpen(false);
      }}
    >
      <div className="wishlist-drawer-card">
        <div className="wishlist-drawer-header">
          <div>
            <span className="panel-tag">YOUR CURATED SELECTION</span>
            <h2>Saved Wishlist ({wishlist.length})</h2>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsWishlistOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="wishlist-drawer-body">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty-state">
              <span style={{ fontSize: '42px', display: 'block', marginBottom: '12px' }}>♡</span>
              <h3>Your wishlist is currently empty</h3>
              <p>Click the heart icon on any designer garment, high jewellery vitrine, cinema ticket, or dining dish to save it here for quick access.</p>
              <button
                type="button"
                className="btn"
                style={{ marginTop: '16px' }}
                onClick={() => setIsWishlistOpen(false)}
              >
                Browse Collections ↗
              </button>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item-card">
                  <img src={item.image || item.poster} alt={item.title} className="wishlist-thumb" />
                  <div className="wishlist-info">
                    <h4>{item.title}</h4>
                    <span className="wishlist-brand">{item.brand || item.restaurant || item.screen || 'AURELIA'}</span>
                    <span className="wishlist-price">{item.price || item.rating || ''}</span>
                    <span className="wishlist-floor">{item.floor || 'Level 00'}</span>
                  </div>
                  <div className="wishlist-actions">
                    <button
                      type="button"
                      className="wishlist-reserve-btn"
                      onClick={() => {
                        setIsWishlistOpen(false);
                        if (item.timings) {
                          onOpenBooking(item.title, item.timings[0]);
                        } else {
                          onOpenVisit();
                        }
                      }}
                    >
                      Reserve / Enquire ↗
                    </button>
                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      onClick={() => toggleWishlist(item)}
                      title="Remove from wishlist"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="wishlist-drawer-footer">
            <button
              type="button"
              className="btn"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setIsWishlistOpen(false);
                onOpenVisit();
              }}
            >
              Send All Wishlist Items to VIP Concierge ↗
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

