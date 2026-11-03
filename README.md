# AURELIA — Multi-Storey Luxury Shopping Mall (MERN Stack)

A full-stack **MERN** (MongoDB, Express, React, Node.js) luxury architectural experience featuring an interactive **Three.js 3D Walkthrough**, real-time booking system, VIP concierge desk, and multi-theme palette engine.

---

## 🏛️ Architecture & Technologies

### 1. **Frontend (React + Vite + Three.js)**
- **Three.js 3D Engine**: Procedural travertine textures, multi-storey escalators, lit boutique vitrines, cinema marquee, neon velocity arcade, and kinetic atrium chandelier.
- **7-Stop Cinematic Walkthrough**:
  1. *Level 00*: Grand Entrance Plaza
  2. *Level 00*: Luxury Fashion Boutiques (Maison Vendôme)
  3. *Level 00*: Haute Joaillerie & Swiss Watches (Diamant Salon)
  4. *Level 01*: Wonder Toys & Kids Play Lab
  5. *Level 02*: Gourmet Dining Terrace (Le Bistro, Sora Robata)
  6. *Level 02*: Cinema & Entertainment (Cinema Luxe IMAX, VR Holodeck, Bowling)
  7. *All Levels*: Grand 3-Storey Central Atrium Vista
- **Theme Engine**: 3 Luxury atmosphere modes (*Champagne Ivory*, *Midnight Noir*, *Imperial Bronze*) dynamically modifying CSS variables and WebGL ambient illumination.
- **Floor Navigation & Zone HUD**: Direct level switcher and live zone indicators.
- **Interactive Modals**:
  - Cinema & Attraction Ticket Booking Modal
  - VIP Concierge & Guest Services Modal
  - Fullscreen Photo Lightbox Modal
  - **VIP Concierge Desk**: Live dashboard to inspect, manage, and cancel MongoDB reservations and concierge requests in real time.

### 2. **Backend (Node.js & Express)**
- **RESTful Endpoints**:
  - `GET /api/stores`: Filter stores by floor (`ground`, `first`, `second`) or category (`fashion`, `jewellery`, `toys`, `dining`, `cinema`).
  - `POST /api/bookings`: Create movie & entertainment reservations.
  - `GET /api/bookings`: Retrieve all reservations with guest details & pass codes.
  - `PATCH /api/bookings/:id/cancel`: Cancel an existing booking.
  - `POST /api/concierge`: Submit VIP styling and guest visit inquiries.
  - `GET /api/concierge`: Retrieve all concierge requests.
  - `GET /api/stats`: Mall metrics (floors, boutiques, screens, parking).
  - `GET /api/health`: Database connection status and server health.

### 3. **Database (MongoDB & Mongoose)**
- **Mongoose Models**:
  - `Store.js`: Store catalog, floor, category, gallery, tags, and highlights.
  - `Booking.js`: Experience bookings with unique `AUR-XXXXXX` confirmation codes.
  - `ConciergeInquiry.js`: VIP personal shopping, valet, and fitting suite requests.
- **Resilient Fallback Mode**: If local MongoDB is not yet running, the server automatically activates a seamless in-memory fallback store so all APIs and the frontend work immediately without errors.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install-all
```
*(Or install separately in `/server` and `/client` using `npm install`)*

### 2. Start the Backend Server
```bash
npm run server:dev
```
Server runs at `http://localhost:5000`

### 3. Start the React Frontend
In a new terminal window:
```bash
npm run client
```
Frontend runs at `http://localhost:5173`

### 4. (Optional) Seed Initial Catalog into MongoDB
```bash
npm run seed
```

---

## 📂 Project Structure

```
html/
  ├── client/
  │    ├── index.html
  │    ├── package.json
  │    ├── vite.config.js
  │    └── src/
  │         ├── main.jsx
  │         ├── App.jsx
  │         ├── index.css
  │         ├── context/
  │         │    └── ThemeContext.jsx
  │         ├── services/
  │         │    └── api.js
  │         └── components/
  │              ├── ThreeScene.jsx
  │              ├── Navbar.jsx
  │              ├── FloorNav.jsx
  │              ├── ZoneHud.jsx
  │              ├── ProgressBar.jsx
  │              ├── HeroSection.jsx
  │              ├── FashionSection.jsx
  │              ├── JewellerySection.jsx
  │              ├── ToysSection.jsx
  │              ├── DiningSection.jsx
  │              ├── CinemaSection.jsx
  │              ├── AtriumSection.jsx
  │              ├── BookingModal.jsx
  │              ├── VisitModal.jsx
  │              ├── LightboxModal.jsx
  │              └── BookingsManagerModal.jsx
  ├── server/
  │    ├── package.json
  │    ├── server.js
  │    ├── .env
  │    ├── config/
  │    │    └── db.js
  │    ├── models/
  │    │    ├── Store.js
  │    │    ├── Booking.js
  │    │    └── ConciergeInquiry.js
  │    ├── routes/
  │    │    ├── storeRoutes.js
  │    │    ├── bookingRoutes.js
  │    │    └── conciergeRoutes.js
  │    ├── controllers/
  │    │    ├── storeController.js
  │    │    ├── bookingController.js
  │    │    └── conciergeController.js
  │    ├── data/
  │    │    └── seedData.js
  │    └── scripts/
  │         └── seed.js
  ├── package.json
  └── README.md
```

