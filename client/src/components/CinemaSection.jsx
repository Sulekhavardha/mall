import React, { useState } from 'react';
import { sectionsData } from '../data/sectionsData';

const movies = [
  {
    title: 'ASTRONOMIA: Beyond Time',
    format: 'IMAX 3D LASER',
    meta: 'Sci-Fi / Epic · 2h 48m · Dolby Atmos',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    times: ['1:30 PM', '4:45 PM', '8:15 PM', '11:30 PM'],
    attraction: 'Cinema Luxe: ASTRONOMIA (IMAX 3D Laser)',
  },
  {
    title: 'NIGHTFALL CHRONICLES',
    format: 'DOLBY CINEMA VIP',
    meta: 'Mystery / Noir · 2h 15m · VIP Suites',
    poster: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
    times: ['2:15 PM', '5:30 PM', '8:45 PM'],
    attraction: 'Cinema Luxe: NIGHTFALL CHRONICLES (Dolby VIP)',
  },
  {
    title: 'THE GOLDEN KINGDOM',
    format: '4K LASER PREMIERE',
    meta: 'Fantasy Epic · 2h 32m · English',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    times: ['12:45 PM', '4:00 PM', '7:15 PM', '10:30 PM'],
    attraction: 'Cinema Luxe: THE GOLDEN KINGDOM (4K Laser)',
  },
];

export default function CinemaSection({ active, onOpenBooking, onNavigateCategory }) {
  const [activePill, setActivePill] = useState('cinema-hero');
  const [selectedShowtimes, setSelectedShowtimes] = useState({
    'ASTRONOMIA: Beyond Time': '4:45 PM',
    'NIGHTFALL CHRONICLES': '5:30 PM',
    'THE GOLDEN KINGDOM': '7:15 PM',
  });

  const scrollToCard = (id) => {
    setActivePill(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSelectTime = (movieTitle, time) => {
    setSelectedShowtimes((prev) => ({ ...prev, [movieTitle]: time }));
  };

  return (
    <section
      className={`section entertainment-section ${active ? 'active-scene' : ''}`}
      id="cinema-section"
      data-scene="5"
      data-level="second"
    >
      <div className="panel entertainment-hub">
        <div className="ent-header">
          <div className="panel-tag">05 / CINEMA & ENTERTAINMENT PROMENADE · LEVEL 02</div>
          <h2>
            The Magic of Cinema.<br />
            <em>World-Class Play.</em>
          </h2>
          <p>
            Ascend to Level 02's premier entertainment destination. Immerse yourself in dual 4K Laser IMAX auditoriums, next-gen motion racing simulators, free-roam VR arenas, boutique VIP bowling, and our enchanted family play sanctuary.
          </p>

          <div className="ent-pills">
            <span
              className={`ent-pill ${activePill === 'cinema-hero' ? 'active' : ''}`}
              onClick={() => scrollToCard('cinema-hero')}
            >
              🎬 Multiplex Cinema & IMAX
            </span>
            <span
              className={`ent-pill ${activePill === 'ent-gaming' ? 'active' : ''}`}
              onClick={() => onNavigateCategory('arcade-games')}
              title="Open Dedicated Arcade Page"
            >
              🕹️ Arcade & Simulators ↗
            </span>
            <span
              className={`ent-pill ${activePill === 'ent-vr' ? 'active' : ''}`}
              onClick={() => onNavigateCategory('virtual-reality')}
              title="Open Dedicated VR Page"
            >
              🥽 Virtual Reality Arena ↗
            </span>
            <span
              className={`ent-pill ${activePill === 'ent-bowling' ? 'active' : ''}`}
              onClick={() => onNavigateCategory('bowling')}
              title="Open Dedicated Bowling Page"
            >
              🎳 Boutique Bowling ↗
            </span>
            <span
              className={`ent-pill ${activePill === 'ent-kids' ? 'active' : ''}`}
              onClick={() => onNavigateCategory('kids-play-zone')}
              title="Open Dedicated Play Zone Page"
            >
              🎈 Kids Soft Play Lab ↗
            </span>
          </div>
        </div>

        {/* 1. Cinematic Hero Feature: Cinema Luxe IMAX & Now Showing */}
        <div className="cinema-hero-card" id="cinema-hero">
          <div className="cinema-hero-media">
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80"
              alt="Cinema Luxe IMAX Auditorium"
            />
            <div className="cinema-hero-overlay">
              <span className="cinema-hero-badge">12 PREMIERE SCREENS · DUAL 4K LASER</span>
              <h3>Cinema Luxe • <em>The IMAX Experience</em></h3>
              <p>
                Heated motorized leather recliners with private at-seat cocktail service, 360° Dolby Atmos acoustic architecture, and crystal-clear laser IMAX projection.
              </p>
              <div style={{ marginTop: '12px' }}>
                <button
                  type="button"
                  className="btn"
                  style={{ padding: '8px 16px', fontSize: '10px' }}
                  onClick={() => onNavigateCategory('now-showing')}
                >
                  View Full Movies Catalog Page ↗
                </button>
              </div>
            </div>
          </div>

          {/* Now Showing & Showtime Strip */}
          <div className="now-showing-wrap">
            <div className="now-showing-title">
              <h4>Now Showing on Level 02</h4>
              <span style={{ fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Select Showtimes to Book Seats
              </span>
            </div>

            <div className="now-showing-grid">
              {movies.map((movie, idx) => (
                <div className="movie-card" key={idx}>
                  <div className="movie-poster-wrap">
                    <img src={movie.poster} alt={movie.title} />
                    <span className="movie-format-tag">{movie.format}</span>
                  </div>
                  <div className="movie-meta">
                    <strong>{movie.title}</strong>
                    <span>{movie.meta}</span>
                  </div>
                  <div className="showtime-chips">
                    {movie.times.map((time, tIdx) => (
                      <span
                        key={tIdx}
                        className={`showtime-chip ${selectedShowtimes[movie.title] === time ? 'selected' : ''}`}
                        onClick={() => handleSelectTime(movie.title, time)}
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                  <button
                    className="book-ticket-btn"
                    type="button"
                    onClick={() => onOpenBooking(movie.attraction, selectedShowtimes[movie.title])}
                  >
                    Book Seats <span>↗</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Upcoming Premiere Banner */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '16px',
                padding: '10px 14px',
                borderRadius: '4px',
                background: 'rgba(197, 160, 89, 0.12)',
                border: '1px solid var(--card-border)',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span
                style={{
                  font: "600 10px 'Manrope', sans-serif",
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                }}
              >
                ⚡ PREMIERE NEXT FRIDAY: ELYSIUM MIRAGE • EXCLUSIVE 70MM IMAX SCREENING
              </span>
              <span
                style={{ fontSize: '11px', color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => onNavigateCategory('upcoming-movies')}
              >
                Upcoming Movies Page ↗
              </span>
            </div>
          </div>
        </div>

        {/* 2. Asymmetric Editorial Grid */}
        <div className="editorial-ent-grid">
          {/* Card 1: Arcade */}
          <div className="ent-grid-card" id="ent-gaming">
            <div className="ent-card-media">
              <img
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
                alt="Velocity Arcade & Motion Simulators"
              />
              <span className="ent-card-badge">LEVEL 02 · GAMING ZONE</span>
            </div>
            <div className="ent-card-body">
              <h4>Velocity Arcade & Racing Simulators</h4>
              <p>
                Feel the g-force in motion telemetry Formula 1 simulators. Enjoy high-speed hydraulic cockpits, Japanese rhythm cabinets, air-hockey arenas, and prize redemption games in a sleek neon environment.
              </p>
              <div className="ent-features-list">
                <span className="ent-feature-tag">F1 Motion Simulators</span>
                <span className="ent-feature-tag">Modern Arcade</span>
                <span className="ent-feature-tag">Laser Tag Arena</span>
                <span className="ent-feature-tag">VIP Gaming Pods</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button
                  className="ent-card-btn"
                  type="button"
                  onClick={() => onOpenBooking('Velocity Arcade: Unlimited Play Card', 'Anytime')}
                >
                  Get Pass ↗
                </button>
                <button
                  className="btn secondary"
                  type="button"
                  style={{ padding: '8px 12px', fontSize: '9px' }}
                  onClick={() => onNavigateCategory('arcade-games')}
                >
                  Dedicated Page ↗
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: VR */}
          <div className="ent-grid-card" id="ent-vr">
            <div className="ent-card-media">
              <img
                src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80"
                alt="Omni VR Arena & Holodeck"
              />
              <span className="ent-card-badge">LEVEL 02 · VR HOLODECK</span>
            </div>
            <div className="ent-card-body">
              <h4>Omni VR Arena & Holodeck</h4>
              <p>
                Step beyond reality with 6-player untethered free-roam VR. Features full-body haptic feedback vests, high-resolution 4K headsets, and heart-pounding sci-fi, horror, and puzzle adventure missions.
              </p>
              <div className="ent-features-list">
                <span className="ent-feature-tag">Free-Roam 360° VR</span>
                <span className="ent-feature-tag">Haptic Vests</span>
                <span className="ent-feature-tag">Co-Op Quests</span>
                <span className="ent-feature-tag">4K Eye-Tracking</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button
                  className="ent-card-btn"
                  type="button"
                  onClick={() => onOpenBooking('Omni VR Holodeck: 45-Min Mission Pass', '6:00 PM')}
                >
                  Book VR ↗
                </button>
                <button
                  className="btn secondary"
                  type="button"
                  style={{ padding: '8px 12px', fontSize: '9px' }}
                  onClick={() => onNavigateCategory('virtual-reality')}
                >
                  Dedicated Page ↗
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Bowling */}
          <div className="ent-grid-card" id="ent-bowling">
            <div className="ent-card-media">
              <img
                src="https://images.unsplash.com/photo-1538388149542-5e24932d11a8?auto=format&fit=crop&w=800&q=80"
                alt="The Strike Club Boutique Bowling"
              />
              <span className="ent-card-badge">LEVEL 02 · LUXURY BOWLING</span>
            </div>
            <div className="ent-card-body">
              <h4>The Strike Club • Boutique Bowling</h4>
              <p>
                8 ambient, glow-illuminated private bowling lanes. Relax on custom leather banquettes while enjoying artisanal mocktails, gourmet sliders, and interactive digital touch-lane scoring.
              </p>
              <div className="ent-features-list">
                <span className="ent-feature-tag">8 Private Lanes</span>
                <span className="ent-feature-tag">Lounge Banquettes</span>
                <span className="ent-feature-tag">Cocktail & Food Service</span>
                <span className="ent-feature-tag">Night Glow Lanes</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button
                  className="ent-card-btn"
                  type="button"
                  onClick={() => onOpenBooking('The Strike Club: Boutique Bowling (1 Hour Private Lane)', '7:30 PM')}
                >
                  Reserve Lane ↗
                </button>
                <button
                  className="btn secondary"
                  type="button"
                  style={{ padding: '8px 12px', fontSize: '9px' }}
                  onClick={() => onNavigateCategory('bowling')}
                >
                  Dedicated Page ↗
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Soft Play */}
          <div className="ent-grid-card" id="ent-kids">
            <div className="ent-card-media">
              <img
                src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
                alt="CloudNine Kids Indoor Soft Play"
              />
              <span className="ent-card-badge">LEVEL 02 · FAMILY & KIDS</span>
            </div>
            <div className="ent-card-body">
              <h4>CloudNine Kids Adventure & Soft Play</h4>
              <p>
                A multi-level sensory adventure playground for children. Features cushioned foam obstacle mazes, interactive digital light balls, sensory toddler zones, and bespoke private birthday party suites.
              </p>
              <div className="ent-features-list">
                <span className="ent-feature-tag">Multi-Tier Soft Play</span>
                <span className="ent-feature-tag">Toddler Sensory Park</span>
                <span className="ent-feature-tag">Interactive Digital Wall</span>
                <span className="ent-feature-tag">Birthday Salons</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button
                  className="ent-card-btn"
                  type="button"
                  onClick={() => onOpenBooking('CloudNine Kids: All-Day Soft Play Pass', 'Morning Pass')}
                >
                  Family Pass ↗
                </button>
                <button
                  className="btn secondary"
                  type="button"
                  style={{ padding: '8px 12px', fontSize: '9px' }}
                  onClick={() => onNavigateCategory('kids-play-zone')}
                >
                  Dedicated Page ↗
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Entertainment & Cinema Category Boxes Inside 3D Walkthrough */}
        <div className="section-cat-boxes-wrapper" style={{ marginTop: '36px' }}>
          <div className="cat-boxes-header">
            <span className="cat-boxes-tag">CINEMA, IMAX & NEXT-GEN ENTERTAINMENT</span>
            <span className="cat-boxes-sub">Tap any category to explore</span>
          </div>
          <div className="cat-boxes-grid">
            {[...sectionsData.cinema.categories, ...sectionsData.gaming.categories.slice(0, 5)].map((cat) => (
              <div
                key={cat.id}
                className="cat-box-card"
                onClick={() => onNavigateCategory(cat.id)}
                title={`Open ${cat.title}`}
              >
                <div className="cat-box-top">
                  <span className="cat-box-icon">{cat.icon}</span>
                  {cat.badge && <span className="cat-box-badge">{cat.badge}</span>}
                </div>
                <h4>{cat.title}</h4>
                <p>{cat.count}</p>
                <span className="cat-box-cta">Explore ↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
