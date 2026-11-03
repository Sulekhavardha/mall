import React, { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import Navbar from './components/Navbar';
import FloorNav from './components/FloorNav';
import ZoneHud from './components/ZoneHud';
import ProgressBar from './components/ProgressBar';
import HeroSection from './components/HeroSection';
import FashionSection from './components/FashionSection';
import JewellerySection from './components/JewellerySection';
import ToysSection from './components/ToysSection';
import DiningSection from './components/DiningSection';
import CinemaSection from './components/CinemaSection';
import AtriumSection from './components/AtriumSection';
import VisitModal from './components/VisitModal';
import BookingModal from './components/BookingModal';
import LightboxModal from './components/LightboxModal';
import BookingsManagerModal from './components/BookingsManagerModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import WishlistDrawer from './components/WishlistDrawer';
import StoreDirectoryModal from './components/StoreDirectoryModal';
import EventsOffersModal from './components/EventsOffersModal';
import { MallProvider } from './context/MallContext';
import { api } from './services/api';

export default function App() {
  return (
    <MallProvider>
      <AppContent />
    </MallProvider>
  );
}

function AppContent() {
  // Routing / View State
  const [currentView, setCurrentView] = useState({ type: 'home' });

  // 3D Walkthrough State
  const [currentZoneText, setCurrentZoneText] = useState('Ground Floor · Grand Entrance Plaza');
  const [currentFloor, setCurrentFloor] = useState('ground');
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Modals
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState({ attraction: '', time: '' });
  const [lightboxData, setLightboxData] = useState(null);
  const [isBookingsManagerOpen, setIsBookingsManagerOpen] = useState(false);

  // Dynamic Stores from Backend
  const [stores, setStores] = useState({});

  useEffect(() => {
    api.getStores()
      .then((res) => {
        if (res.data) {
          const map = {};
          res.data.forEach((s) => {
            map[s.category] = s;
          });
          setStores(map);
        }
      })
      .catch((err) => {
        console.warn('Backend API connection in progress:', err.message);
      });
  }, []);

  // Hash URL synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#/category/')) {
        const catId = hash.replace('#/category/', '');
        navigateToCategory(catId);
      } else if (hash.startsWith('#/section/')) {
        const secId = hash.replace('#/section/', '');
        navigateToSection(secId);
      } else if (hash === '#/' || hash === '' || hash.startsWith('#entrance')) {
        setCurrentView({ type: 'home' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync active section on scroll when on home view
  useEffect(() => {
    if (currentView.type !== 'home') return;

    const sectionIds = [
      'entrance',
      'fashion-shop',
      'jewellery-shop',
      'toys-shop',
      'dining-section',
      'cinema-section',
      'atrium-reveal',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) {
              setActiveSceneIndex(idx);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView.type]);

  const navigateToHome = () => {
    window.location.hash = '#/';
    setCurrentView({ type: 'home' });
    const el = document.getElementById('entrance');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (sectionId) => {
    const sectionMap = {
      shopping: 'fashion-shop',
      fashion: 'fashion-shop',
      jewellery: 'jewellery-shop',
      kids: 'toys-shop',
      toys: 'toys-shop',
      dining: 'dining-section',
      cinema: 'cinema-section',
      gaming: 'cinema-section',
      atrium: 'atrium-reveal',
      entrance: 'entrance',
      home: 'entrance',
    };
    const targetElementId = sectionMap[sectionId] || 'entrance';

    setCurrentView({ type: 'home' });
    window.location.hash = '#/';

    setTimeout(() => {
      const el = document.getElementById(targetElementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const navigateToCategory = (categoryId) => {
    const catToSection = {
      // Watches & Jewellery -> Level 00 Jewellery & Watches
      watches: 'jewellery-shop',
      jewellery: 'jewellery-shop',
      'timepieces-tourbillon': 'jewellery-shop',
      'imperial-gold': 'jewellery-shop',

      // Fashion & Lifestyle -> Level 00 Fashion District
      'womens-fashion': 'fashion-shop',
      'mens-fashion': 'fashion-shop',
      'luxury-brands': 'fashion-shop',
      footwear: 'fashion-shop',
      'bags-accessories': 'fashion-shop',
      'beauty-cosmetics': 'fashion-shop',
      'teen-fashion': 'fashion-shop',
      'girls-fashion': 'fashion-shop',
      'kids-baby': 'fashion-shop',
      'lifestyle-home': 'fashion-shop',

      // Toys & Kids -> Level 01 Toys & Play Lab
      'kids-play-zone': 'toys-shop',
      'indoor-playground': 'toys-shop',
      'toys-games': 'toys-shop',
      'educational-toys': 'toys-shop',
      'soft-toys': 'toys-shop',
      'building-blocks': 'toys-shop',
      'creative-activities': 'toys-shop',
      'kids-birthday-party-zone': 'toys-shop',

      // Dining -> Level 02 Culinary Terrace
      'fine-dining': 'dining-section',
      cafes: 'dining-section',
      'fast-food': 'dining-section',
      'food-court': 'dining-section',
      'desserts-ice-cream': 'dining-section',
      bakery: 'dining-section',
      'family-restaurants': 'dining-section',
      'international-cuisine': 'dining-section',

      // Cinema & Entertainment -> Level 02 Cinema & Play
      'now-showing': 'cinema-section',
      'upcoming-movies': 'cinema-section',
      hollywood: 'cinema-section',
      bollywood: 'cinema-section',
      'regional-cinema': 'cinema-section',
      'imax-experience': 'cinema-section',
      'premium-recliner-experience': 'cinema-section',
      'arcade-games': 'cinema-section',
      'virtual-reality': 'cinema-section',
      'racing-games': 'cinema-section',
      bowling: 'cinema-section',
      'multiplayer-games': 'cinema-section',
      'interactive-gaming': 'cinema-section',
      'family-games': 'cinema-section',
    };

    const targetSectionId = catToSection[categoryId] || 'fashion-shop';
    setCurrentView({ type: 'home' });

    if (window.location.hash !== '#/') {
      window.history.replaceState(null, '', '#/');
    }

    setTimeout(() => {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleZoneChange = (stop) => {
    if (stop.zone) setCurrentZoneText(stop.zone);
    if (stop.floor) setCurrentFloor(stop.floor);
  };

  const handleOpenBooking = (attraction, time) => {
    setBookingPrefill({ attraction, time });
    setIsBookingOpen(true);
  };

  const handleOpenLightbox = (src, title, desc, tag) => {
    setLightboxData({ src, title, desc, tag });
  };

  return (
    <>
      {/* 3D Multi-Storey Walkthrough Viewport */}
      <ThreeScene onZoneChange={handleZoneChange} />

      <div className="site">
        <Navbar
          currentView={currentView}
          onNavigateHome={navigateToHome}
          onNavigateSection={navigateToSection}
          onNavigateCategory={navigateToCategory}
          onOpenVisit={() => setIsVisitOpen(true)}
          onOpenBookingsManager={() => setIsBookingsManagerOpen(true)}
        />

        {/* Main 3D Mall Walkthrough (Persistent Canvas & Architecture) */}
        <FloorNav currentFloor={currentFloor} />
        <ZoneHud zoneText={currentZoneText} />
        <ProgressBar activeSceneIndex={activeSceneIndex} />

        <main>
          <HeroSection
            active={activeSceneIndex === 0}
            onNavigateSection={navigateToSection}
            onNavigateCategory={navigateToCategory}
          />
          <FashionSection
            active={activeSceneIndex === 1}
            storeData={stores['fashion']}
            onOpenLightbox={handleOpenLightbox}
            onNavigateCategory={navigateToCategory}
            onNavigateSection={navigateToSection}
          />
          <JewellerySection
            active={activeSceneIndex === 2}
            storeData={stores['jewellery']}
            onOpenLightbox={handleOpenLightbox}
            onNavigateCategory={navigateToCategory}
          />
          <ToysSection
            active={activeSceneIndex === 3}
            storeData={stores['toys']}
            onOpenLightbox={handleOpenLightbox}
            onNavigateCategory={navigateToCategory}
          />
          <DiningSection
            active={activeSceneIndex === 4}
            storeData={stores['dining']}
            onOpenLightbox={handleOpenLightbox}
            onNavigateCategory={navigateToCategory}
          />
          <CinemaSection
            active={activeSceneIndex === 5}
            onOpenBooking={handleOpenBooking}
            onNavigateCategory={navigateToCategory}
          />
          <AtriumSection
            active={activeSceneIndex === 6}
            onOpenVisit={() => setIsVisitOpen(true)}
            onOpenLightbox={handleOpenLightbox}
          />
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal onNavigateCategory={navigateToCategory} />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        onOpenBooking={handleOpenBooking}
        onOpenVisit={() => setIsVisitOpen(true)}
        onNavigateCategory={navigateToCategory}
      />

      {/* Store Directory Modal */}
      <StoreDirectoryModal onNavigateCategory={navigateToCategory} />

      {/* Events & Special Offers Modal */}
      <EventsOffersModal
        onOpenBooking={handleOpenBooking}
        onOpenVisit={() => setIsVisitOpen(true)}
      />

      {/* Modals available from every view */}
      <VisitModal
        isOpen={isVisitOpen}
        onClose={() => setIsVisitOpen(false)}
        onBookingSuccess={() => {}}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultAttraction={bookingPrefill.attraction}
        defaultTime={bookingPrefill.time}
        onBookingCreated={() => {}}
      />

      <LightboxModal
        isOpen={!!lightboxData}
        onClose={() => setLightboxData(null)}
        data={lightboxData}
      />

      <BookingsManagerModal
        isOpen={isBookingsManagerOpen}
        onClose={() => setIsBookingsManagerOpen(false)}
      />
    </>
  );
}
