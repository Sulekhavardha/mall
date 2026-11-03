import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMall } from '../context/MallContext';
import { sectionsData } from '../data/sectionsData';

export default function Navbar({
  currentView,
  onNavigateHome,
  onNavigateSection,
  onNavigateCategory,
  onOpenVisit,
  onOpenBookingsManager,
}) {
  const { theme, setTheme } = useTheme();
  const { wishlist, setIsWishlistOpen, setIsSearchOpen, setIsDirectoryOpen, setIsEventsOpen } = useMall();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleNavClick = (sectionKey) => {
    setActiveDropdown(null);
    setMobileOpen(false);
    onNavigateSection(sectionKey);
  };

  const handleCategoryClick = (catId) => {
    setActiveDropdown(null);
    setMobileOpen(false);
    onNavigateCategory(catId);
  };

  return (
    <>
      <header className="nav" id="mainNav">
        <a
          className="logo"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
        >
          <div className="logo-diamond"></div>
          AURELIA <span>/</span> LUXURY MALL
        </a>

        <nav className="nav-links">
          <a
            href="#"
            className={currentView.type === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
          >
            3D Walkthrough
          </a>

          {/* Shopping with dropdown */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown('shopping')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a
              href="#"
              className={currentView.type === 'section' && currentView.id === 'shopping' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('shopping');
              }}
            >
              Shopping ▾
            </a>
            {activeDropdown === 'shopping' && (
              <div className="nav-dropdown-menu">
                <div className="dropdown-header">
                  <span>12 DEDICATED SHOPPING BOUTIQUES</span>
                </div>
                <div className="dropdown-grid">
                  {sectionsData.shopping.categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(c.id)}
                    >
                      <span className="dropdown-icon">{c.icon}</span>
                      <span className="dropdown-label">{c.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cinema & Movies with dropdown */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown('cinema')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a
              href="#"
              className={currentView.type === 'section' && currentView.id === 'cinema' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('cinema');
              }}
            >
              Movies & IMAX ▾
            </a>
            {activeDropdown === 'cinema' && (
              <div className="nav-dropdown-menu">
                <div className="dropdown-header">
                  <span>CINEMA LUXE 12-SCREEN MULTIPLEX</span>
                </div>
                <div className="dropdown-grid">
                  {sectionsData.cinema.categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(c.id)}
                    >
                      <span className="dropdown-icon">{c.icon}</span>
                      <span className="dropdown-label">{c.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gaming & Entertainment */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown('gaming')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a
              href="#"
              className={currentView.type === 'section' && currentView.id === 'gaming' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('gaming');
              }}
            >
              Gaming ▾
            </a>
            {activeDropdown === 'gaming' && (
              <div className="nav-dropdown-menu">
                <div className="dropdown-header">
                  <span>VELOCITY ARCADE & VR ARENAS</span>
                </div>
                <div className="dropdown-grid">
                  {sectionsData.gaming.categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(c.id)}
                    >
                      <span className="dropdown-icon">{c.icon}</span>
                      <span className="dropdown-label">{c.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Kids & Toys */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown('kids')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a
              href="#"
              className={currentView.type === 'section' && currentView.id === 'kids' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('kids');
              }}
            >
              Toys & Kids ▾
            </a>
            {activeDropdown === 'kids' && (
              <div className="nav-dropdown-menu">
                <div className="dropdown-header">
                  <span>WONDER TOYS & CLOUDNINE PLAY</span>
                </div>
                <div className="dropdown-grid">
                  {sectionsData.kids.categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(c.id)}
                    >
                      <span className="dropdown-icon">{c.icon}</span>
                      <span className="dropdown-label">{c.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dining */}
          <div
            className="nav-item-dropdown"
            onMouseEnter={() => setActiveDropdown('dining')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a
              href="#"
              className={currentView.type === 'section' && currentView.id === 'dining' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('dining');
              }}
            >
              Dining ▾
            </a>
            {activeDropdown === 'dining' && (
              <div className="nav-dropdown-menu">
                <div className="dropdown-header">
                  <span>LEVEL 02 GOURMET TERRACE</span>
                </div>
                <div className="dropdown-grid">
                  {sectionsData.dining.categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(c.id)}
                    >
                      <span className="dropdown-icon">{c.icon}</span>
                      <span className="dropdown-label">{c.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mall Directory Button */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsDirectoryOpen(true);
            }}
            title="Browse Complete Store Directory"
          >
            Directory
          </a>

          {/* Events & Offers */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsEventsOpen(true);
            }}
            title="Upcoming Mall Events & Offers"
          >
            Events
          </a>
        </nav>

        <div className="nav-actions">
          {/* Global Search Button */}
          <button
            type="button"
            className="nav-icon-btn"
            onClick={() => setIsSearchOpen(true)}
            title="Search stores, movies, dining (Ctrl+K)"
          >
            🔍
          </button>

          {/* Wishlist Button with live counter */}
          <button
            type="button"
            className="nav-icon-btn wishlist-nav-btn"
            onClick={() => setIsWishlistOpen(true)}
            title="View Saved Wishlist"
          >
            ♥
            {wishlist.length > 0 && (
              <span className="nav-wishlist-count">{wishlist.length}</span>
            )}
          </button>

          {/* Theme Palette Switcher */}
          <div className="theme-switcher" title="Change Color Atmosphere">
            <button
              className={`theme-btn ${theme === 'champagne' ? 'active' : ''}`}
              onClick={() => setTheme('champagne')}
              title="Champagne Ivory"
            >
              <span className="theme-dot"></span> Champagne
            </button>
            <button
              className={`theme-btn ${theme === 'noir' ? 'active' : ''}`}
              onClick={() => setTheme('noir')}
              title="Midnight Noir"
            >
              <span className="theme-dot"></span> Noir
            </button>
            <button
              className={`theme-btn ${theme === 'bronze' ? 'active' : ''}`}
              onClick={() => setTheme('bronze')}
              title="Imperial Bronze"
            >
              <span className="theme-dot"></span> Bronze
            </button>
          </div>

          <button
            className="nav-cta"
            type="button"
            onClick={onOpenBookingsManager}
            title="View Live MongoDB Bookings & Concierge Inquiries"
            style={{ marginRight: '4px' }}
          >
            VIP Desk <span>✦</span>
          </button>

          <button className="nav-cta" type="button" onClick={onOpenVisit}>
            Explore Mall <span>↗</span>
          </button>

          <button
            className={`menu-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobileMenu">
        <div style={{ padding: '0 0 16px', display: 'flex', gap: '8px', borderBottom: '1px solid var(--line-subtle)', marginBottom: '12px' }}>
          <button
            type="button"
            className="btn"
            style={{ flex: 1, padding: '10px', fontSize: '10px' }}
            onClick={() => { setMobileOpen(false); setIsSearchOpen(true); }}
          >
            🔍 Search Mall
          </button>
          <button
            type="button"
            className="btn secondary"
            style={{ flex: 1, padding: '10px', fontSize: '10px' }}
            onClick={() => { setMobileOpen(false); setIsWishlistOpen(true); }}
          >
            ♥ Wishlist ({wishlist.length})
          </button>
        </div>

        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            onNavigateHome();
          }}
        >
          <span>01</span> 3D Mall Walkthrough
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('shopping');
          }}
        >
          <span>02</span> Shopping (12 Categories)
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleCategoryClick('womens-fashion');
          }}
          style={{ paddingLeft: '32px', fontSize: '12px' }}
        >
          ↳ Women's Fashion Dedicated Page
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleCategoryClick('mens-fashion');
          }}
          style={{ paddingLeft: '32px', fontSize: '12px' }}
        >
          ↳ Men's Fashion Dedicated Page
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('cinema');
          }}
        >
          <span>03</span> Movies & IMAX (7 Categories)
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('gaming');
          }}
        >
          <span>04</span> Gaming & VR (7 Categories)
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('kids');
          }}
        >
          <span>05</span> Wonder Toys & Play Lab
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('dining');
          }}
        >
          <span>06</span> Gourmet Dining Terrace
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            setIsDirectoryOpen(true);
          }}
        >
          <span>07</span> Store Directory
        </a>
        <a
          href="#"
          className="mobile-nav-link"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            setIsEventsOpen(true);
          }}
        >
          <span>08</span> Events & Special Offers
        </a>
      </div>
    </>
  );
}
