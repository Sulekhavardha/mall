import React, { useState, useMemo } from 'react';
import { categoryDetailsData } from '../data/categoryDetailsData';
import { sectionsData } from '../data/sectionsData';
import { useMall } from '../context/MallContext';

// Curated Lookbook image vitrines for categories
const categoryLookbooks = {
  "womens-fashion": [
    { url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80", title: "Parisian Runway Autumn", desc: "Champagne silks and embroidered tailoring." },
    { url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80", title: "Evening Gown Vitrine", desc: "Hand-pleated metallic sheen cocktail dresses." },
    { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", title: "Resort Lookbook", desc: "Pastel linen suiting and sun hats." },
    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80", title: "Noir Evening Atelier", desc: "Structured velvet capes and crystal collars." },
    { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80", title: "Leathercraft Studio", desc: "Tuscan calfskin monogram bags." },
    { url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80", title: "Stiletto Salon", desc: "Crystal brooch satin pumps." }
  ],
  "footwear": [
    { url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80", title: "Pavé Crystal Brooch Stilettos", desc: "105mm Italian silk satin gala pumps with hand-set crystal buckle." },
    { url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80", title: "Hand-Polished Oxford Brogues", desc: "Goodyear welted Tuscan calfskin leather with burnished toe cap." },
    { url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80", title: "Sneaker Vault Limited Drop", desc: "Tier-1 collector silhouettes and rare monochrome retros." },
    { url: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80", title: "Suede Chelsea Boots", desc: "Handcrafted Northampton suede with elasticated gore and stacked heel." },
    { url: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80", title: "Gold Mirror Strappy Sandals", desc: "Sculpted metallic heels engineered for ballroom ease." },
    { url: "https://images.unsplash.com/photo-1512990414988-0a2ec2e74cb5?auto=format&fit=crop&w=800&q=80", title: "Artisan Cobbler Atelier", desc: "Custom wooden lasts and hand-stitched bespoke footbed fittings." }
  ],
  "jewellery": [
    { url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80", title: "Diamond River Collarette", desc: "42 carats of D-color flawless brilliant diamonds set in platinum." },
    { url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80", title: "Emerald & Sapphire Drop Earrings", desc: "Colombian emeralds with micro-pavé halos." },
    { url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80", title: "Imperial Solitaire Ring", desc: "Cushion-cut diamond with hidden diamond halo gallery." },
    { url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80", title: "High Joaillerie Vitrine", desc: "Illuminated glass salon for bespoke private commissions." },
    { url: "https://images.unsplash.com/photo-1611591475870-205307b22a6a?auto=format&fit=crop&w=800&q=80", title: "Pearl & Diamond Tiara", desc: "South Sea baroque pearls woven in yellow gold filigree." },
    { url: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80", title: "Gemological Master Bench", desc: "Precision gem-setting microscope and laser welding atelier." }
  ],
  "watches": [
    { url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80", title: "Grand Complication Tourbillon", desc: "Flying tourbillon with 72-hour power reserve and Geneva seal." },
    { url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80", title: "Perpetual Calendar Chronometer", desc: "Moonphase dial hand-lacquered in royal midnight blue." },
    { url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80", title: "Rose Gold Skeleton Calibre", desc: "Hand-beveled bridges revealing openworked gear train." },
    { url: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80", title: "Ceramic Diver 300M", desc: "Super-LumiNova indices with helium release valve." },
    { url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", title: "Diamond Bezel Gala Watch", desc: "Baguette-cut diamond bezel on integrated white gold mesh." },
    { url: "https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&w=800&q=80", title: "Master Watchmaker Suite", desc: "Cleanroom pressure testing and acoustic timing adjustment." }
  ],
  "mens-fashion": [
    { url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80", title: "Savile Row Bespoke Tuxedo", desc: "Midnight navy barathea wool with grosgrain silk peak lapels." },
    { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80", title: "Italian Double-Breasted Blazer", desc: "Loro Piana virgin wool in warm camel drape." },
    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80", title: "Executive Tailoring Suite", desc: "Private fitting lounge with Scotch tasting bar." },
    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80", title: "Sea Island Cotton Shirtings", desc: "Mother-of-pearl buttons and 140s two-ply twill weaves." },
    { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80", title: "Cashmere Overcoat", desc: "Double-faced unlined camel hair coat with horn buttons." },
    { url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80", title: "Silk Jacquard Neckwear", desc: "Hand-rolled 7-fold ties from Como, Italy." }
  ],
  "kids-play-zone": [
    { url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=800&q=80", title: "CloudNine Mega Ball Ocean", desc: "150,000 sanitized pastel balls with soft slides." },
    { url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80", title: "Interactive Sensory Soft Play", desc: "Foam geometric obstacles with LED interactive floors." },
    { url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80", title: "Kids Adventure Suspension Bridge", desc: "Enclosed safety netting ropes connecting sky treehouses." },
    { url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80", title: "Toddler Creative Exploration Hub", desc: "Safe rounded-corner wooden discovery boards and tactile walls." },
    { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80", title: "VIP Birthday Party Castle", desc: "Themed birthday banquets with mascot performances." },
    { url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80", title: "Parent Observation Café", desc: "Artisan espresso bar with 360-degree glass view of play arena." }
  ],
  "arcade-games": [
    { url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", title: "Cyber Neon Arcade Alley", desc: "Over 80 classic retro cabinets and 4K modern shooters." },
    { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", title: "Motion Simulator Cockpits", desc: "Hydraulic racing rigs with force feedback steering wheels." },
    { url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80", title: "Air Hockey Tournament Grid", desc: "Ultra-fast illuminated puck tables with electronic scoreboards." },
    { url: "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=800&q=80", title: "Prize Redemption Vault", desc: "Collector consoles, oversized plushies, and luxury tech prizes." },
    { url: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80", title: "Rhythm & Dance Stage", desc: "Dual step dance platform with booming subwoofers." },
    { url: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80", title: "Retro Pinball Gallery", desc: "Rare 1980s and 1990s analog collectible pinball machines." }
  ],
  "cafes": [
    { url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80", title: "Atrium Marble Espresso Bar", desc: "La Marzocco espresso extraction with geisha single origins." },
    { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", title: "Sunlit Terraced Patio", desc: "Outdoor lounge seating facing illuminated boulevard fountains." },
    { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", title: "Parisian Viennoiserie Showcase", desc: "Golden laminated croissants, pain au chocolat, and kouign-amann." },
    { url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80", title: "Artisan Pour-Over Bar", desc: "V60 crystal drippers highlighting jasmine and peach notes." },
    { url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", title: "Macaron Vitrine", desc: "Pistachio, salted butter caramel, and rose petal ganache." },
    { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80", title: "Velvet Booth Library Corner", desc: "Quiet seating with design monographs and international journals." }
  ],
  "now-showing": [
    { url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80", title: "Cinema Luxe IMAX Auditorium", desc: "Dual 4K Laser curved screen." },
    { url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80", title: "ASTRONOMIA IMAX Premiere", desc: "Deep space cinematic journey." },
    { url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80", title: "Dolby VIP Recliner Lounge", desc: "Heated recliners with private service." },
    { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", title: "Epic Premiere Showcase", desc: "Dolby Atmos 360 soundstage." },
    { url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80", title: "Connoisseur Cinema Bar", desc: "Gourmet popcorn and craft mocktails." },
    { url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", title: "70mm Film Laser Suite", desc: "Uncompressed optical master reels." }
  ],
  "fine-dining": [
    { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", title: "Le Bistro Paris Balcony", desc: "Sunlit culinary terrace overlooking the atrium." },
    { url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", title: "A5 Wagyu Striploin", desc: "Binchotan charcoal flame grill." },
    { url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80", title: "Sora Robata Omakase", desc: "Bluefin otoro and Hokkaido uni nigiri." },
    { url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80", title: "Sommelier Cellar Suite", desc: "Over 800 vintage Grand Cru wines." },
    { url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80", title: "Private Dining Salon", desc: "Candlelit bespoke private party dining." },
    { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", title: "Lantern Terrace Sunset", desc: "Outdoor dusk dining over boulevard fountains." }
  ],
  "toys-games": [
    { url: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&q=80", title: "Wonder Toys World", desc: "Giant plushies and collector figurines." },
    { url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80", title: "Lego Architectural Lab", desc: "Master building challenges." },
    { url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80", title: "STEM AI Robotics", desc: "Programmable coding bots." },
    { url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80", title: "Collector Statues", desc: "Limited anime and superhero editions." },
    { url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80", title: "Toddler Sensory Toys", desc: "Montessori beechwood blocks." },
    { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", title: "Future Science Workshop", desc: "Weekend interactive family experiments." }
  ]
};

// Generic fallback lookbook photos for any category
const defaultLookbook = [
  { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", title: "Aurelia Architectural Vitrine", desc: "Grand shopping gallery vista." },
  { url: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80", title: "Atrium Skylight Vista", desc: "Three levels of travertine marble." },
  { url: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80", title: "Plaza Grand Entrance", desc: "Bronze colonnades and fountains." },
  { url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80", title: "Haute Joaillerie Salon", desc: "Illuminated diamond showcases." },
  { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", title: "Culinary Terrace", desc: "Overlooking central atrium art." },
  { url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80", title: "IMAX Projection Suite", desc: "Dual 4K Laser laser optics." }
];

export default function CategoryPage({
  categoryId,
  onNavigateHome,
  onNavigateCategory,
  onNavigateSection,
  onOpenBooking,
  onOpenVisit,
  onOpenLightbox,
}) {
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlist, toggleWishlist, isInWishlist, recentlyViewed, trackRecentlyViewed } = useMall();

  const category = categoryDetailsData[categoryId] || categoryDetailsData['womens-fashion'];
  const section = sectionsData[category.section] || sectionsData['shopping'];

  const lookbookPhotos = categoryLookbooks[category.id] || defaultLookbook;

  const siblingCategories = useMemo(() => {
    return section.categories.filter((c) => c.id !== category.id);
  }, [section, category]);

  const filteredItems = useMemo(() => {
    let list = category.items || [];
    if (selectedSubcat && selectedSubcat !== 'All' && !selectedSubcat.toLowerCase().includes('all')) {
      list = list.filter(
        (item) =>
          item.subcat === selectedSubcat ||
          (item.genre && item.genre.toLowerCase().includes(selectedSubcat.toLowerCase())) ||
          (item.cuisine && item.cuisine.toLowerCase().includes(selectedSubcat.toLowerCase()))
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title?.toLowerCase().includes(q) ||
          item.desc?.toLowerCase().includes(q) ||
          item.brand?.toLowerCase().includes(q) ||
          item.restaurant?.toLowerCase().includes(q) ||
          item.subcat?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, selectedSubcat, searchQuery]);

  const handleCardClick = (item) => {
    trackRecentlyViewed({
      ...item,
      categoryId: category.id,
      categoryTitle: category.title,
    });
  };

  // Press Escape to return to 3D Walkthrough
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onNavigateHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigateHome]);

  return (
    <div className="dedicated-page-wrapper">
      {/* Floating 3D Mall Return Pill */}
      <div className="vitrine-floating-close-bar">
        <button
          type="button"
          className="vitrine-return-pill"
          onClick={onNavigateHome}
          title="Return to 3D Mall Walkthrough (Esc)"
        >
          ← Return to 3D Mall
        </button>
        <button
          type="button"
          className="vitrine-close-icon-btn"
          onClick={onNavigateHome}
          title="Close Vitrine"
        >
          ✕
        </button>
      </div>

      {/* 1. Breadcrumbs Navigation */}
      <nav className="category-breadcrumbs" aria-label="Breadcrumbs">
        <button type="button" onClick={onNavigateHome} className="crumb-link">
          Home
        </button>
        <span className="crumb-sep">/</span>
        <button
          type="button"
          onClick={() => onNavigateSection(category.section)}
          className="crumb-link"
        >
          {category.sectionTitle || section.title}
        </button>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{category.title}</span>
      </nav>

      {/* 2. Sleek Luxury Category Header Bar */}
      <header className="category-compact-header">
        <div className="cat-header-top-row">
          <div className="cat-title-cluster">
            <div className="cat-badge-line">
              <span className="cat-floor-badge">📍 {category.floor}</span>
              <span className="cat-section-tag">{section.title}</span>
            </div>
            <h1 className="cat-title-text">{category.title}</h1>
          </div>
          <div className="cat-header-ctas">
            <button
              type="button"
              className="btn secondary"
              onClick={onNavigateHome}
              title="Return to 3D Mall Walkthrough"
            >
              ← 3D Mall Walkthrough
            </button>
            <button type="button" className="btn" onClick={onOpenVisit}>
              VIP Concierge <span>↗</span>
            </button>
          </div>
        </div>
        <p className="cat-compact-tagline">
          <em>{category.tagline}</em> — {category.intro}
        </p>
      </header>

      {/* 3. Controls Bar: Subcategories Tabs & Search Input */}
      <section className="category-controls-bar">
        <div className="subcategories-tabs">
          {category.subcategories?.map((sub, idx) => (
            <button
              key={idx}
              type="button"
              className={`subcat-pill ${
                (selectedSubcat === sub || (sub.startsWith('All') && selectedSubcat === 'All'))
                  ? 'active'
                  : ''
              }`}
              onClick={() => setSelectedSubcat(sub.startsWith('All') ? 'All' : sub)}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="category-search-box">
          <input
            type="text"
            className="category-search-input"
            placeholder={`Search within ${category.title}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* 4. Featured Brands / Outlets / Flagships */}
      {category.featuredBrands && category.featuredBrands.length > 0 && (
        <section className="category-section-block">
          <div className="section-block-header">
            <span className="block-eyebrow">DESTINATIONS & MAISONS</span>
            <h2>Featured Brands & Outlets</h2>
          </div>
          <div className="featured-brands-grid">
            {category.featuredBrands.map((brand, bIdx) => (
              <div key={bIdx} className="brand-card">
                <div className="brand-logo-badge">{brand.logo}</div>
                <div className="brand-meta">
                  <h3>{brand.name}</h3>
                  <span className="brand-loc">{brand.location}</span>
                  <p>{brand.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Main Items & Products / Experiences / Movies Grid */}
      <section className="category-section-block">
        <div className="section-block-header">
          <span className="block-eyebrow">CURATED SELECTION</span>
          <h2>
            {selectedSubcat === 'All' ? 'Signature Collections & Experiences' : selectedSubcat}
            <span className="items-count-badge">({filteredItems.length})</span>
          </h2>
        </div>

        {filteredItems.length === 0 ? (
          <div className="no-items-notice">
            <p>No listings found matching "{searchQuery}". Try selecting another subcategory or clearing the search.</p>
            <button
              type="button"
              className="btn secondary"
              onClick={() => {
                setSelectedSubcat('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="category-items-grid">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="category-item-card"
                onClick={() => handleCardClick(item)}
              >
                <div className="item-card-media">
                  <img src={item.image || item.poster} alt={item.title} loading="lazy" />
                  {item.tag && <span className="item-tag-badge">{item.tag}</span>}
                  
                  {/* Wishlist Heart Button */}
                  <button
                    type="button"
                    className={`item-wishlist-btn ${isInWishlist(item.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    title={isInWishlist(item.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
                  >
                    {isInWishlist(item.id) ? '♥' : '♡'}
                  </button>

                  <button
                    type="button"
                    className="item-expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(
                        item.image || item.poster,
                        item.title,
                        item.desc,
                        category.title.toUpperCase()
                      );
                    }}
                    title="Enlarge Photo"
                  >
                    ⛶
                  </button>
                </div>

                <div className="item-card-body">
                  <div className="item-subhead">
                    <span className="item-brand-name">
                      {item.brand || item.restaurant || item.screen || item.lang || 'AURELIA'}
                    </span>
                    {item.rating && <span className="item-rating">{item.rating}</span>}
                  </div>

                  <h3 className="item-card-title">{item.title}</h3>
                  <p className="item-card-desc">{item.desc}</p>

                  {/* Movie specific timings */}
                  {item.timings && item.timings.length > 0 && (
                    <div className="item-showtimes-strip">
                      <span className="timings-label">Showtimes:</span>
                      <div className="timings-chips">
                        {item.timings.map((time, tIdx) => (
                          <span
                            key={tIdx}
                            className="time-chip"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenBooking(
                                `${category.title}: ${item.title} (${item.screen || 'Screen'})`,
                                time
                              );
                            }}
                            title="Click to reserve seats"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cast / duration if movie */}
                  {item.cast && (
                    <div className="item-cast-info">
                      <strong>Cast:</strong> {item.cast} {item.duration && `· ${item.duration}`}
                    </div>
                  )}

                  <div className="item-card-footer">
                    <div className="item-price-block">
                      <span className="item-price-val">{item.price}</span>
                      <span className="item-floor-loc">{item.floor || category.floor}</span>
                    </div>

                    <button
                      type="button"
                      className="item-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (category.section === 'cinema' || category.section === 'gaming') {
                          onOpenBooking(
                            `${item.title} - ${category.title}`,
                            item.timings?.[0] || 'Selected Time'
                          );
                        } else if (category.section === 'dining') {
                          onOpenBooking(
                            `Table Reservation: ${item.restaurant || item.title}`,
                            'Evening Dining'
                          );
                        } else {
                          onOpenVisit();
                        }
                      }}
                    >
                      {category.section === 'cinema'
                        ? 'Book Tickets ↗'
                        : category.section === 'dining'
                        ? 'Reserve Table ↗'
                        : category.section === 'gaming'
                        ? 'Get Pass ↗'
                        : 'Enquire / VIP ↗'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 6. High-Definition Visual Lookbook & Photo Vitrine */}
      <section className="category-section-block">
        <div className="section-block-header">
          <span className="block-eyebrow">VISUAL LOOKBOOK & VITRINE</span>
          <h2>Exclusive Gallery ({lookbookPhotos.length} Images)</h2>
        </div>
        <div className="lookbook-mosaic-grid">
          {lookbookPhotos.map((photo, pIdx) => (
            <div
              key={pIdx}
              className="lookbook-item"
              onClick={() => onOpenLightbox(photo.url, photo.title, photo.desc, category.title.toUpperCase())}
              title="Click to enlarge in full-resolution lightbox"
            >
              <img src={photo.url} alt={photo.title} loading="lazy" />
              <div className="lookbook-caption-overlay">
                <h4>{photo.title}</h4>
                <p>{photo.desc}</p>
                <span className="lookbook-zoom-pill">View High-Res ⛶</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Trending Collections Banner */}
      {category.trendingCollections && category.trendingCollections.length > 0 && (
        <section className="category-section-block">
          <div className="section-block-header">
            <span className="block-eyebrow">EDITORIAL SPOTLIGHT</span>
            <h2>Trending & Featured Collections</h2>
          </div>
          <div className="trending-collections-grid">
            {category.trendingCollections.map((col, cIdx) => (
              <div key={cIdx} className="trending-card">
                <div className="trending-media">
                  <img src={col.image} alt={col.title} loading="lazy" />
                  <div className="trending-overlay">
                    <h3>{col.title}</h3>
                    <p>{col.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Facilities & Services Strip */}
      {category.facilities && category.facilities.length > 0 && (
        <section className="category-facilities-strip">
          <div className="facilities-title">
            <span>✦</span> CONCIERGE PRIVILEGES & FACILITIES
          </div>
          <div className="facilities-chips-list">
            {category.facilities.map((fac, fIdx) => (
              <span key={fIdx} className="facility-pill">
                ✓ {fac}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 9. Recently Viewed Items (if any) */}
      {recentlyViewed.length > 0 && (
        <section className="category-section-block">
          <div className="section-block-header">
            <span className="block-eyebrow">CONTINUE WHERE YOU LEFT OFF</span>
            <h2>Recently Viewed Items ({recentlyViewed.length})</h2>
          </div>
          <div className="recently-viewed-strip">
            {recentlyViewed.map((item) => (
              <div
                key={item.id}
                className="recent-item-card"
                onClick={() => {
                  if (item.categoryId && item.categoryId !== category.id) {
                    onNavigateCategory(item.categoryId);
                  }
                }}
              >
                <img src={item.image || item.poster} alt={item.title} />
                <div className="recent-meta">
                  <strong>{item.title}</strong>
                  <span>{item.brand || item.restaurant || item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Sibling / Explore More Categories Navigation */}
      <section className="category-section-block explore-siblings-section">
        <div className="section-block-header">
          <span className="block-eyebrow">CONTINUE EXPLORING</span>
          <h2>More in {section.title}</h2>
        </div>
        <div className="siblings-cards-grid">
          {siblingCategories.map((sib) => (
            <div
              key={sib.id}
              className="sibling-card"
              onClick={() => onNavigateCategory(sib.id)}
            >
              <div className="sibling-icon">{sib.icon}</div>
              <div className="sibling-info">
                <h4>{sib.title}</h4>
                <span>{sib.count}</span>
              </div>
              <span className="sibling-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Bottom Back Navigation */}
      <div className="category-bottom-nav">
        <button type="button" className="btn" onClick={onNavigateHome}>
          Return to 3D Walkthrough <span>↑</span>
        </button>
        <button
          type="button"
          className="btn secondary"
          onClick={() => onNavigateSection(category.section)}
        >
          View All {section.title} Categories
        </button>
      </div>
    </div>
  );
}
