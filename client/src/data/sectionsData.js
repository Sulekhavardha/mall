export const sectionsData = {
  shopping: {
    id: "shopping",
    title: "Luxury Shopping & Boutiques",
    floor: "Level 00 & Level 01",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
    description: "Indulge in 12 dedicated shopping realms spanning global haute couture, avant-garde streetwear, master Swiss horology, fine joaillerie, artisanal cosmetics, and bespoke interiors.",
    categories: [
      { id: "womens-fashion", title: "Women's Fashion", count: "48 Boutiques", icon: "👗", badge: "Trending" },
      { id: "mens-fashion", title: "Men's Fashion", count: "32 Boutiques", icon: "👔", badge: "Bespoke" },
      { id: "luxury-brands", title: "Luxury Brands", count: "24 Maisons", icon: "✨", badge: "Haute Couture" },
      { id: "jewellery", title: "Jewellery", count: "18 Salons", icon: "💎", badge: "Rare Gems" },
      { id: "watches", title: "Watches", count: "16 Salons", icon: "⌚", badge: "Swiss Master" },
      { id: "bags-accessories", title: "Bags & Accessories", count: "28 Boutiques", icon: "👜", badge: "Leathercraft" },
      { id: "footwear", title: "Footwear", count: "22 Boutiques", icon: "👠", badge: "Handmade" },
      { id: "beauty-cosmetics", title: "Beauty & Cosmetics", count: "26 Counters", icon: "💄", badge: "Exclusive" },
      { id: "girls-fashion", title: "Girls Fashion", count: "14 Boutiques", icon: "🎀", badge: "New Collection" },
      { id: "teen-fashion", title: "Teen Fashion", count: "16 Stores", icon: "🧢", badge: "Streetwear" },
      { id: "kids-baby", title: "Kids & Baby", count: "20 Stores", icon: "🧸", badge: "Organic" },
      { id: "lifestyle-home", title: "Lifestyle & Home", count: "19 Studios", icon: "🛋️", badge: "Artisan" },
    ]
  },

  cinema: {
    id: "cinema",
    title: "Cinema Luxe & Multiplex",
    floor: "Level 02 · North Promenade",
    heroImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=85",
    description: "Experience cinema reinvented across 12 laser-projected screens featuring IMAX 3D, Dolby VIP recliners, private screening parlours, and gourmet in-seat gastronomy.",
    categories: [
      { id: "now-showing", title: "Now Showing", count: "8 Features", icon: "🎬", badge: "Daily" },
      { id: "upcoming-movies", title: "Upcoming Movies", count: "12 Premieres", icon: "🎟️", badge: "Advance Booking" },
      { id: "imax-experience", title: "IMAX Experience", count: "Dual 4K Laser", icon: "📽️", badge: "Immersion" },
      { id: "premium-recliner", title: "Premium Recliner Experience", count: "VIP Service", icon: "🛋️", badge: "Dolby Atmos" },
      { id: "hollywood", title: "Hollywood", count: "Global Blockbusters", icon: "🌟", badge: "English / IMAX" },
      { id: "bollywood", title: "Bollywood", count: "Magnum Opuses", icon: "🎭", badge: "Hindi / 4K" },
      { id: "regional-cinema", title: "Regional Cinema", count: "World Cinema", icon: "🌍", badge: "Subtitled" },
    ]
  },

  gaming: {
    id: "gaming",
    title: "Gaming & Next-Gen Entertainment",
    floor: "Level 02 · South Galleria",
    heroImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=85",
    description: "Thrilling motion telemetry simulators, untethered 6-player free-roam VR holodecks, boutique bowling suites, and Japanese rhythm arcades for adrenaline seekers.",
    categories: [
      { id: "arcade-games", title: "Arcade Games", count: "80+ Cabinets", icon: "🕹️", badge: "Velocity" },
      { id: "virtual-reality", title: "Virtual Reality (VR)", count: "6 Co-Op Arenas", icon: "🥽", badge: "Omni Holodeck" },
      { id: "racing-games", title: "Racing Games", count: "F1 Telemetry", icon: "🏎️", badge: "Full Motion" },
      { id: "bowling", title: "Bowling", count: "8 Private Lanes", icon: "🎳", badge: "The Strike Club" },
      { id: "multiplayer-games", title: "Multiplayer Games", count: "Squad Battles", icon: "🎮", badge: "Laser Arena" },
      { id: "interactive-gaming", title: "Interactive Gaming", count: "Motion Floors", icon: "⚡", badge: "Haptic Tech" },
      { id: "family-games", title: "Family Games", count: "All Ages", icon: "🎯", badge: "Party Hub" },
    ]
  },

  kids: {
    id: "kids",
    title: "Wonder Toys & Family Wonderland",
    floor: "Level 01 · Play Central",
    heroImage: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=1600&q=85",
    description: "An enchanted multi-level sanctuary for children and families. Explore massive toy boutiques, Lego engineering studios, soft sensory obstacle parks, and private party suites.",
    categories: [
      { id: "kids-play-zone", title: "Kids Play Zone", count: "Sensory Playground", icon: "🎈", badge: "CloudNine" },
      { id: "indoor-playground", title: "Indoor Playground", count: "3-Tier Obstacles", icon: "🏰", badge: "Soft Safe" },
      { id: "toys-games", title: "Toys & Games", count: "5,000+ Items", icon: "🧩", badge: "Wonder Toys" },
      { id: "educational-toys", title: "Educational Toys", count: "STEM & Robotics", icon: "🔬", badge: "Montessori" },
      { id: "soft-toys", title: "Soft Toys", count: "Giant Plushies", icon: "🧸", badge: "Collector Edition" },
      { id: "building-blocks", title: "Building Blocks", count: "Lego Master Lab", icon: "🧱", badge: "Architectural" },
      { id: "creative-activities", title: "Creative Activities", count: "Clay & Craft", icon: "🎨", badge: "Daily Workshops" },
      { id: "birthday-party-zone", title: "Kids Birthday Party Zone", count: "Private Suites", icon: "🎂", badge: "VIP Catering" },
    ]
  },

  dining: {
    id: "dining",
    title: "Gourmet Dining Terrace & Cafes",
    floor: "Level 02 · Lantern Terrace",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
    description: "Embark on an epicurean journey across 38+ fine dining venues, sunlit Parisian bakeries, authentic Japanese robata grills, artisanal roasteries, and international culinary halls.",
    categories: [
      { id: "fine-dining", title: "Fine Dining", count: "12 Restaurants", icon: "🍷", badge: "Michelin Starred" },
      { id: "cafes", title: "Cafes", count: "14 Roasteries", icon: "☕", badge: "Specialty Brews" },
      { id: "fast-food", title: "Fast Food", count: "Gourmet Burgers & Wraps", icon: "🍔", badge: "Quick Luxury" },
      { id: "food-court", title: "Food Court", count: "Grand Concourse", icon: "🍱", badge: "Global Flavours" },
      { id: "desserts-ice-cream", title: "Desserts & Ice Cream", count: "Gelato & Patisserie", icon: "🍨", badge: "Artisan" },
      { id: "bakery", title: "Bakery", count: "French Boulangerie", icon: "🥐", badge: "Fresh Baked Daily" },
      { id: "family-restaurants", title: "Family Restaurants", count: "Spacious Seating", icon: "🍕", badge: "Kids Menus" },
      { id: "international-cuisine", title: "International Cuisine", count: "Japanese, French, Italian", icon: "🍣", badge: "Authentic" },
    ]
  },

  experiences: {
    id: "experiences",
    title: "Bespoke Lifestyle & Mall Experiences",
    floor: "All Three Levels",
    heroImage: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1600&q=85",
    description: "From world-class art exhibitions and haute couture runway showcases to personalized spa wellness suites and hands-free VIP valet delivery services.",
    categories: [
      { id: "events-exhibitions", title: "Events & Exhibitions", count: "Atrium Plaza", icon: "🏛️", badge: "Live Now" },
      { id: "beauty-wellness", title: "Beauty & Wellness", count: "Level 01 Day Spa", icon: "🌿", badge: "Holistic" },
      { id: "fitness-lifestyle", title: "Fitness & Lifestyle", count: "Rooftop Wellness", icon: "🧘", badge: "Equinox Elite" },
      { id: "luxury-experiences", title: "Luxury Experiences", count: "VIP Suites", icon: "🍾", badge: "Hands-Free Valet" },
      { id: "family-activities", title: "Family Activities", count: "All Floors", icon: "🎡", badge: "Weekend Fun" },
      { id: "special-offers", title: "Special Offers & Promotions", count: "Exclusive Privileges", icon: "🏷️", badge: "Seasonal Deals" },
    ]
  }
};

