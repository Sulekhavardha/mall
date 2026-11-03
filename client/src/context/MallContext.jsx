import React, { createContext, useContext, useState, useEffect } from 'react';
import { categoryDetailsData } from '../data/categoryDetailsData';
import { sectionsData } from '../data/sectionsData';

const MallContext = createContext();

export function MallProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  // Load wishlist and recently viewed from localStorage
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('aurelia_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedRecent = localStorage.getItem('aurelia_recent');
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      let updated;
      if (exists) {
        updated = prev.filter((i) => i.id !== item.id);
      } else {
        updated = [item, ...prev];
      }
      try {
        localStorage.setItem('aurelia_wishlist', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isInWishlist = (itemId) => {
    return wishlist.some((i) => i.id === itemId);
  };

  const trackRecentlyViewed = (item) => {
    if (!item || !item.id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      const updated = [item, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('aurelia_recent', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Search across all categories, items, and featured brands
  const searchGlobal = (query) => {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results = [];

    // Search categories
    Object.values(categoryDetailsData).forEach((cat) => {
      if (
        cat.title.toLowerCase().includes(q) ||
        cat.tagline?.toLowerCase().includes(q) ||
        cat.intro?.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'category',
          id: cat.id,
          title: cat.title,
          subtitle: `${cat.sectionTitle} · ${cat.floor}`,
          image: cat.heroImage,
          url: `#/category/${cat.id}`,
        });
      }

      // Search items
      if (cat.items) {
        cat.items.forEach((item) => {
          if (
            item.title?.toLowerCase().includes(q) ||
            item.desc?.toLowerCase().includes(q) ||
            item.brand?.toLowerCase().includes(q) ||
            item.restaurant?.toLowerCase().includes(q) ||
            item.genre?.toLowerCase().includes(q)
          ) {
            results.push({
              type: 'item',
              id: item.id,
              title: item.title,
              subtitle: `${item.brand || item.restaurant || cat.title} · ${item.price || item.rating || ''}`,
              image: item.image || item.poster || cat.heroImage,
              itemData: item,
              categoryTitle: cat.title,
              categoryId: cat.id,
              url: `#/category/${cat.id}`,
            });
          }
        });
      }
    });

    return results.slice(0, 24);
  };

  return (
    <MallContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        trackRecentlyViewed,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isDirectoryOpen,
        setIsDirectoryOpen,
        isEventsOpen,
        setIsEventsOpen,
        searchGlobal,
      }}
    >
      {children}
    </MallContext.Provider>
  );
}

export function useMall() {
  const context = useContext(MallContext);
  if (!context) {
    throw new Error('useMall must be used within a MallProvider');
  }
  return context;
}

