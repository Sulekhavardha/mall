const storesData = [
  {
    name: "Maison Vendôme Haute Couture",
    category: "fashion",
    floor: "ground",
    levelLabel: "Level 00",
    tagline: "Discover Your Signature Style.",
    description: "Step directly into our premier fashion boutiques. Explore Parisian ready-to-wear, bespoke Italian tailoring, and curated runway collections with personalized styling suites.",
    chips: ["Haute Couture", "Designer Apparel", "Leather Goods", "Footwear"],
    stats: [
      { label: "Fashion Galleria", value: "Level 00" },
      { label: "Global Boutiques", value: "75+" }
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
        badge: "Runway Fashion · Level 00",
        label: "Haute Runway",
        alt: "Runway Collection"
      },
      {
        url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
        badge: "Leather Goods · Level 00",
        label: "Leathercraft",
        alt: "Artisanal Leather Bags"
      },
      {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
        badge: "Boutique Studio · Level 00",
        label: "VIP Studio",
        alt: "Private Fitting Room"
      }
    ],
    openingHours: "10:00 AM - 10:00 PM",
    isFeatured: true
  },
  {
    name: "Diamant Vendôme & Haute Joaillerie",
    category: "jewellery",
    floor: "ground",
    levelLabel: "Level 00",
    tagline: "Timeless Craft. Rare Diamonds.",
    description: "Admire illuminated vitrines showcasing Swiss chronometers, master diamond cutters, and bespoke fine jewellery crafted by the world's most venerated houses.",
    chips: ["Swiss Timepieces", "Fine Diamonds", "Rare Gems", "Parfumerie"],
    stats: [
      { label: "Vendôme Salon", value: "Maison" },
      { label: "Escalator to Level 01", value: "Ascend" }
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
        badge: "Haute Joaillerie · Level 00",
        label: "Rare Gems",
        alt: "Diamond Vitrine"
      },
      {
        url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
        badge: "Swiss Timepieces · Level 00",
        label: "Timepieces",
        alt: "Luxury Chronometer"
      },
      {
        url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
        badge: "Diamond Vitrine · Level 00",
        label: "Fine Gold",
        alt: "Gold Artisan Collection"
      }
    ],
    openingHours: "10:00 AM - 10:00 PM",
    isFeatured: true
  },
  {
    name: "Wonder Toys & Play Lab",
    category: "toys",
    floor: "first",
    levelLabel: "Level 01",
    tagline: "Wonder, Play & Endless Smiles.",
    description: "Welcome to our vibrant Toys & Play Lab! Discover premium educational toys, rare collectibles, giant plush collections, interactive robotics, and imaginative family fun for children of every age.",
    chips: ["Toy Wonderland", "Collectibles", "Robotics", "Family Games"],
    stats: [
      { label: "Toy Boutique", value: "Level 01" },
      { label: "Hands-on Play Zone", value: "Interactive" }
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=900&q=80",
        badge: "Toy Wonderland · Level 01",
        label: "Plush World",
        alt: "Teddy Bears & Plushies"
      },
      {
        url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80",
        badge: "Creative Lego Builds · Level 01",
        label: "Lego Builds",
        alt: "Lego Lab"
      },
      {
        url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80",
        badge: "Educational & Robotics · Level 01",
        label: "Robotics",
        alt: "Kids Robotics Lab"
      }
    ],
    openingHours: "10:00 AM - 10:00 PM",
    isFeatured: true
  },
  {
    name: "Gourmet Dining Terrace & Le Bistro",
    category: "dining",
    floor: "second",
    levelLabel: "Level 02",
    tagline: "A Taste of Every Experience.",
    description: "Ascend to Level 02's sunlit culinary terrace. Savor artisanal cafes, French brasseries, authentic Japanese robata grills, and patisseries under warm hanging lanterns.",
    chips: ["Fine Dining", "Artisan Cafes", "Robata Teppan", "Bistro Terrace"],
    stats: [
      { label: "Culinary Promenade", value: "Level 02" },
      { label: "Gourmet Destinations", value: "38+" }
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
        badge: "Fine Dining Terrace · Level 02",
        label: "Fine Dining",
        alt: "Restaurant Terrace"
      },
      {
        url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80",
        badge: "Robata Teppan & Sushi · Level 02",
        label: "Robata Grill",
        alt: "Fresh Sushi and Teppanyaki"
      },
      {
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
        badge: "Artisanal Cafe & Bakery · Level 02",
        label: "Café Terrace",
        alt: "Specialty Coffee & Pastries"
      }
    ],
    openingHours: "10:00 AM - 12:30 AM",
    isFeatured: true
  },
  {
    name: "Cinema Luxe & Entertainment Promenade",
    category: "cinema",
    floor: "second",
    levelLabel: "Level 02",
    tagline: "The Magic of Cinema. World-Class Play.",
    description: "Dual 4K Laser IMAX auditoriums, next-gen motion racing simulators, free-roam VR arenas, boutique VIP bowling, and our enchanted family play sanctuary.",
    chips: ["12 Laser Screens", "Dolby Atmos", "F1 Simulators", "VR Holodeck", "Strike Club"],
    stats: [
      { label: "Entertainment Promenade", value: "Level 02" },
      { label: "IMAX & VIP Screens", value: "12" }
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
        badge: "Cinema Luxe VIP · Level 02",
        label: "IMAX Hall",
        alt: "Auditorium"
      },
      {
        url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
        badge: "Velocity Arcade · Level 02",
        label: "Arcade Arena",
        alt: "Arcade"
      },
      {
        url: "https://images.unsplash.com/photo-1538388149542-5e24932d11a8?auto=format&fit=crop&w=800&q=80",
        badge: "The Strike Club · Level 02",
        label: "VIP Bowling",
        alt: "Bowling Lanes"
      }
    ],
    openingHours: "10:00 AM - 01:00 AM",
    isFeatured: true
  }
];

const initialBookings = [
  {
    attraction: "Cinema Luxe: ASTRONOMIA (IMAX 3D Laser)",
    guestName: "Alexander Wright",
    guestContact: "alex.wright@luxury.com",
    date: "This Friday",
    time: "8:15 PM",
    guestsCount: "2 Guests",
    specialRequests: "Champagne bottle service at VIP recliner row G",
    bookingCode: "AUR-812903",
    status: "Confirmed"
  },
  {
    attraction: "The Strike Club: Boutique Bowling (1 Hour Private Lane)",
    guestName: "Lady Eleanor Vance",
    guestContact: "+1 (555) 948-2301",
    date: "This Saturday",
    time: "7:00 PM",
    guestsCount: "4 Guests",
    specialRequests: "Artisanal mocktails upon arrival",
    bookingCode: "AUR-502914",
    status: "Confirmed"
  }
];

const initialInquiries = [
  {
    guestName: "Sophia Montgomery",
    guestContact: "sophia.m@parisianstyle.fr",
    serviceType: "Personal Styling & Fitting Suite",
    plannedDate: "Tomorrow Afternoon",
    notes: "Requires private dressing suite at Maison Vendôme for Autumn runway selections.",
    status: "New"
  }
];

module.exports = { storesData, initialBookings, initialInquiries };

