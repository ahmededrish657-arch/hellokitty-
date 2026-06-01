/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, Info, CheckCircle2, ChevronRight, Sparkles, Filter, Trash2, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, Product, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

function SakuraRain() {
  const [petals, setPetals] = useState<{
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    offsetX: number;
    offsetY: number;
    opacity: number;
  }[]>([]);

  React.useEffect(() => {
    // Generate 16 soft falling petals
    const generated = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      size: Math.random() * 10 + 8, // 8px to 18px
      duration: Math.random() * 10 + 15, // 15s to 25s for slow-floating elegance
      delay: Math.random() * -25, // offset so petals are already active on screen
      offsetX: 0,
      offsetY: 0,
      opacity: Math.random() * 0.35 + 0.25, // low saturation softness
    }));
    setPetals(generated);
  }, []);

  const handleHover = (id: number) => {
    setPetals(prev => prev.map(p => {
      if (p.id === id) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 50 + 40;
        return {
          ...p,
          offsetX: p.offsetX + Math.cos(angle) * dist,
          offsetY: p.offsetY + Math.sin(angle) * dist,
        };
      }
      return p;
    }));

    setTimeout(() => {
      setPetals(prev => prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            offsetX: p.offsetX * 0.2,
            offsetY: p.offsetY * 0.2,
          };
        }
        return p;
      }));
    }, 1200);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 min-h-full" style={{ minHeight: '100%' }}>
      {petals.map(p => (
        <div
          key={p.id}
          onMouseEnter={() => handleHover(p.id)}
          className="absolute pointer-events-auto cursor-pointer transition-transform duration-500 ease-out"
          style={{
            left: `${p.left}%`,
            top: `-20px`,
            width: `${p.size}px`,
            height: `${p.size * 0.85}px`,
            opacity: p.opacity,
            backgroundColor: '#FFCBD4', // Elegant warm light sakura color
            borderRadius: '50% 0% 50% 50%', // Perfect petal design leaf
            transform: `translate(${p.offsetX}px, ${p.offsetY}px) rotate(${45 + p.id * 15}deg)`,
            animation: `sakura-fall-${p.id % 4} ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 1px 3px rgba(255, 182, 193, 0.2)',
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sakura-fall-0 {
          0% { transform: translateY(-10px) rotate(0deg) translateX(0px); }
          50% { translateX(30px); }
          100% { transform: translateY(115vh) rotate(360deg) translateX(-15px); }
        }
        @keyframes sakura-fall-1 {
          0% { transform: translateY(-10px) rotate(15deg) translateX(0px); }
          50% { translateX(-25px); }
          100% { transform: translateY(115vh) rotate(420deg) translateX(25px); }
        }
        @keyframes sakura-fall-2 {
          0% { transform: translateY(-10px) rotate(45deg) translateX(0px); }
          70% { translateX(20px); }
          100% { transform: translateY(115vh) rotate(270deg) translateX(-25px); }
        }
        @keyframes sakura-fall-3 {
          0% { transform: translateY(-10px) rotate(-30deg) translateX(0px); }
          40% { translateX(-20px); }
          100% { transform: translateY(115vh) rotate(310deg) translateX(15px); }
        }
      `}} />
    </div>
  );
}

interface ShopViewProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateCartQuantity: (productId: string, qty: number) => void;
  onClearCart: () => void;
  onAddFavorite: (charId: string) => void;
  favorites: string[];
  onAddPoint: (amount: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export default function ShopView({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onClearCart,
  onAddFavorite,
  favorites,
  onAddPoint,
  isCartOpen,
  setIsCartOpen,
}: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<string>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Circular Category list
  const categories = [
    { name: 'All', icon: '✨' },
    { name: 'Plushies', icon: '🧸', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNi31S3IKxp5lbWe_n9Y707zONshDWBPUXLQSu-JLsOJKKdZSWDB7Kj1WjlTMQeE3UsnyYTIdXIDB1y0Hfnqtf4eREJpPjJ8y7laGHgrTW2BG6UAIvhNS-0rWkw1aOuST_4MmwMEs_JdkvP9ucigKoshu4hSJIYsfeozgK4b7ylA4X9bF1KY3TMR8xVeEaYkc-UO0DPSQXRx3RVB2o9Hy4Xid_GxfQMWdlmL2GeDa2AkUhZ9kvH_egHYl2Pb4-B0QZRctAekR0bCE' },
    { name: 'Stationery', icon: '✏️', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASj8XeTUm36JFoJCZnqalkSfQ2EHTqPePv-BrodU7FmYgVti7V2lLfYXm5SkhtiK9MgQL4VPtYBruJPq4MKCPlpH7WzoQy8YBJW7_UHB-8uhfiPFV0Jc2MSHpmI1mLgnOW1ZrtcYWBLXuQmO3cPsgnrhSl_ex15QE5Am6wGbME9IunEqZEBZQkkZxAuHm77vtg72-F3Drx8NVdI5ssQ5Dkdt4dWSU2F6NkCcqaxC5ArXERBuwTW_b-icQRmMPNt4jn4FPvHTZwiug' },
    { name: 'Home', icon: '🏠', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbu47eC2herIdDjBpmTWgwB8CF7RGrhHLDUnzpKqZxNfxiDu6lanOHoC_3i8VOXyI1ttQyahxOlT0IQlPgmO05_xUswWTObCggsRBYMpBVs7BnBvWWOrDttAs_nfOleJsevEeCF2In1vB9uaolQDdhxjPG2_I7ejp4HozJ7qqH_fCZUSiUDWM9TunWPFrPIGQ7hAe9sSt9pJP4Wdm3fZjbNySXryPgbYIcj_Tl5YYaMTRpz-9E1bsii07EDnsPL2hVkvVsblVVvB8' },
    { name: 'Fashion', icon: '👗', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4S8fdgePef_3i77yhYQ0Xg6kKUijtsBFcau_gxkdlMOIVpDw76CBQCeKcOlg6YaeeB9c56JSTBUFe47jp0LdYXhM93uMpMNuqPgb0GdIpVvHbdFIfa0LgUQZz9Yc03ZKXxyTHdDr7GpTYeQ2j2_Jp8uRw6xXUu6slkSl5e2tJd0QyYmdrOm6qPYDeO-KNqCaFe9yePcNlxIqK_VeTtCSVd6cDeC2UefP2ICEyyzlE6QdJubDtb-0wB6LY65Pw70T41lPQBELYKY0' }
  ];

  // Filtering + Searching + Sorting logic
  let displayedProducts = PRODUCTS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (sortOption === 'price-low') {
    displayedProducts.sort((a,b) => a.price - b.price);
  } else if (sortOption === 'price-high') {
    displayedProducts.sort((a,b) => b.price - a.price);
  } else if (sortOption === 'rating') {
    displayedProducts.sort((a,b) => b.rating - a.rating);
  }

  // totals
  return (
    <div className="space-y-12 text-slate-800 relative min-h-screen" id="shop-view-canvas">
      <SakuraRain />
      
      {/* 1. SEASONAL SPECIAL BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#FFDDE1] to-[#EE9CA7] rounded-3xl p-8 sm:p-12 text-left shadow-inner flex flex-col md:flex-row items-center justify-between gap-8 border border-rose-200" id="pink-summer-banner">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none select-none mix-blend-multiply"
        >
          <source src="https://ik.imagekit.io/owyaqu7vl/97e4ee9e888a5e87910a7210cded74c1_raw.mp4" type="video/mp4" />
        </video>
        <div className="space-y-4 max-w-lg relative z-10">
          <div className="inline-flex items-center gap-1 bg-white/90 text-rose-500 font-sans font-black text-[10px] uppercase px-3 py-1 rounded-full border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Seasonal Highlight</span>
          </div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl text-rose-900 leading-tight">
            Seasonal Special: <br />
            Pink Summer Collection! 🌸
          </h1>
          <p className="font-sans text-xs sm:text-sm text-rose-800/80 leading-relaxed">
            Carry Hello Kitty's dreamy garden romance with you! Indulge in delicate embroidery, heavy weight pastel sweatshirts, and vintage collection roses plushies. Enjoy <strong>free shipping</strong> on all orders over ¥5,000!
          </p>
          <div className="pt-2">
            <button 
              onClick={() => {
                setSelectedCategory('Plushies');
                onAddPoint(10);
              }}
              className="px-6 py-2.5 bg-white hover:bg-rose-50 text-rose-600 font-sans font-bold text-xs rounded-full shadow transition"
            >
              Shop The Vintage Plush 🧸
            </button>
          </div>
        </div>

        {/* Banner Right Image backdrop with highly immersive 2.5D video floating animation */}
        <div className="relative w-full max-w-xs md:max-w-sm flex justify-center shrink-0">
          {/* Soft pulsing halo background aura */}
          <motion.div 
            animate={{
              scale: [1, 1.15, 0.95, 1.15, 1],
              opacity: [0.25, 0.55, 0.25, 0.55, 0.25]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white/40 blur-2xl rounded-full z-0 w-64 h-64 mx-auto"
          />

          {/* Liquid dynamic card container with gentle slow tilt & float */}
          <motion.div
            animate={{
              y: [0, -12, 4, -8, 0],
              rotate: [2, -2, 3, -1, 2],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <motion.img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL5D0G-BsLuSb5EVI23vxnwXkm-HlkYvtGlbm-WI4j8QmV55J0fg1QaX9_diklYfFaQvfJ90UZGjZbjgF33cZ1_Vrsh7MaZccJu9m8Gki07vIHLhlk1rhzQTaTHpVVgOfQ_lY2IpOdlwHTik-I6Hpgh49OoqlDTZAvRNOmMh27teA3K_Ve2YGicYSG95GSxiFBvHDbzsq1lUZ8t8gQCx-R15x8FFl3n6b87mPvvU4Tc28S2hXMhG0-udj-KeFqerX38dYXSCSoRXs" 
              alt="Pink Summer Cover" 
              className="w-56 h-auto object-contain rounded-2xl shadow-2xl border-4 border-white duration-300 relative z-10"
              referrerPolicy="no-referrer"
              whileHover={{ 
                scale: 1.06,
                boxShadow: "0 25px 50px -12px rgba(244, 63, 94, 0.35)",
              }}
              transition={{
                duration: 4,
                ease: "easeInOut"
              }}
            />
            {/* Adorable dynamic floating stars that orbit the cover block */}
            <motion.div 
              animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -left-3 text-xl select-none"
            >
              ✨
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-3 -right-3 text-xl select-none"
            >
              💖
            </motion.div>
            <motion.div 
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-6 text-lg select-none"
            >
              🌸
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. KAWAII PICKS (FEATURED ITEMS CAROUSEL) */}
      <section className="space-y-6" id="kawaii-featured-picks-section">
        <div className="text-left border-b border-slate-100 pb-3">
          <h2 className="font-sans font-black text-2xl text-slate-800 tracking-tight flex items-center gap-1.5">
            ✨ Kawaii Picks
          </h2>
          <p className="font-sans text-xs text-slate-400">Handpicked crowd favorites starring lovely designs and premium materials.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[PRODUCTS[0], PRODUCTS[1]].map((prod) => (
            <div 
              key={prod.id} 
              className="bg-white border-2 border-pink-100/50 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 text-left hover:shadow-lg hover:shadow-pink-200/50 hover:border-pink-300 hover:-translate-y-1 transition-all duration-300 group"
              id={`featured-card-${prod.id}`}
            >
              <div className="w-40 h-40 bg-pink-50 rounded-2xl flex items-center justify-center p-3 shrink-0 relative overflow-hidden text-center">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-contain relative z-10 transform group-hover:scale-106 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-between h-full">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">
                    FEATURED FAVORITE
                  </span>
                  <h3 className="font-sans font-black text-lg text-slate-800">{prod.name}</h3>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                  <div className="text-left">
                    <span className="block text-[8px] font-mono text-slate-400 font-bold uppercase">Price Tag</span>
                    <span className="font-mono text-lg font-black text-pink-500">¥{prod.price.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(prod);
                      onAddPoint(30);
                    }}
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-sans font-extrabold text-xs rounded-xl shadow-md uppercase transition-all duration-200 active:scale-95 active:ring-4 active:ring-pink-100"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (ROUND CIRCLES) */}
      <section className="space-y-6" id="shop-categories-section">
        <div className="text-center">
          <h3 className="font-sans font-black text-xs uppercase tracking-widest text-[#DB7093] mb-2">Sweet Collections</h3>
          <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-800">Shop by Category</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 overflow-x-auto py-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  onAddPoint(5);
                }}
                className="flex flex-col items-center gap-2 group focus:outline-none"
                id={`category-pill-${cat.name}`}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 shadow-inner transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'border-pink-500 bg-pink-50 scale-105' 
                    : 'border-slate-100 bg-white hover:border-pink-200'
                }`}>
                  {cat.image ? (
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-2xl">{cat.icon}</span>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center">
                      <span className="bg-pink-500 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-full scale-90">GO</span>
                    </div>
                  )}
                </div>
                <span className={`font-sans text-xs font-bold tracking-wide transition ${
                  isActive ? 'text-pink-600 font-extrabold' : 'text-slate-600 group-hover:text-pink-500'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. PRODUCT LISTING SYSTEM & CONTROLS */}
      <section className="space-y-6" id="product-listings-and-search">
        
        {/* Inline parameters controls */}
        <div className="bg-slate-50 border border-slate-100/50 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between text-left">
          
          {/* Internal search filter */}
          <div className="relative w-full max-w-xs">
            <span className="absolute inset-y-0 left-2.5 flex items-center text-slate-400">
              <Search className="w-4 h-4 text-pink-400" />
            </span>
            <input 
              type="text" 
              placeholder="Search sweets &amp; treats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-pink-400 bg-white"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto">
            {/* Sort parameter */}
            <span className="text-xs text-slate-400 whitespace-nowrap font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-pink-400" /> Filter:
            </span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-xs border border-slate-200 bg-white rounded-lg p-2 focus:outline-none focus:border-pink-400 font-sans"
            >
              <option value="popular">Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated ⭐</option>
            </select>
          </div>
        </div>

        {/* Products grid */}
        <motion.div 
          layout 
          className="grid grid-cols-2 md:grid-cols-4 gap-6" 
          id="all-products-grid"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((prod) => {
              const isFav = favorites.includes(prod.id);
              const isHighlight = selectedCategory !== 'All' && prod.category === selectedCategory;
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0.3, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0.3, y: 15, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  key={prod.id}
                  className={`bg-white border rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between relative group ${
                    isHighlight 
                      ? 'border-pink-400 ring-4 ring-pink-100/75 shadow-xl shadow-pink-200/50 scale-[1.02]' 
                      : 'border-slate-100 shadow-sm hover:border-pink-300 hover:shadow-lg hover:shadow-pink-200/40 hover:-translate-y-1.5'
                  }`}
                  id={`product-grid-card-${prod.id}`}
                >
                  {/* Badges */}
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                    {prod.isNew && (
                      <span className="bg-sky-500 text-white font-mono font-black text-[8px] px-1.5 py-0.5 rounded leading-none uppercase tracking-wider">
                        NEW
                      </span>
                    )}
                    {prod.isPopular && (
                      <span className="bg-pink-500 text-white font-mono font-black text-[8px] px-1.5 py-0.5 rounded leading-none uppercase tracking-wider">
                        POP
                      </span>
                    )}
                  </div>

                  {/* Photo frame */}
                  <div className="relative bg-slate-50 rounded-xl p-4 flex items-center justify-center h-40 overflow-hidden mb-3">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="h-full w-auto object-contain select-none max-h-[140px] transform group-hover:scale-106 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Actions Panel absolute overlay */}
                    <div className="absolute inset-0 bg-slate-900/5 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-150 rounded-xl">
                      <button
                        onClick={() => {
                          setSelectedProduct(prod);
                          onAddPoint(10);
                        }}
                        className="p-2 bg-white rounded-full text-slate-600 hover:text-pink-500 hover:scale-105 active:scale-95 shadow-md transition"
                        title="Quick Specs"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onAddToCart(prod);
                          onAddPoint(20);
                        }}
                        className="p-2 bg-white rounded-full text-slate-600 hover:text-emerald-500 hover:scale-105 active:scale-95 active:ring-3 active:ring-pink-100 shadow-md transition-all duration-200"
                        title="Add to Basket"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* metadata */}
                  <div className="text-left space-y-1">
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 font-mono">
                      {prod.category}
                    </p>
                    <h4 className="font-sans font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-pink-500 transition cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                      {prod.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#FFB800]">★</span>
                      <span className="text-slate-600 font-bold font-mono">{prod.rating}</span>
                      <span className="text-[10px] text-slate-400">({prod.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Price and Cart Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono text-sm font-black text-pink-500">
                      ¥{prod.price.toLocaleString()}
                    </span>
                    
                    <button
                      onClick={() => {
                        onAddToCart(prod);
                        onAddPoint(20);
                      }}
                      className="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl shadow-sm hover:shadow active:scale-95 active:ring-4 active:ring-pink-100 transition-all duration-200 cursor-pointer text-xs flex items-center gap-1.5 font-bold"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Buy
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {displayedProducts.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400 leading-relaxed font-sans space-y-2">
              <span className="text-4xl">🛒</span>
              <p className="text-sm font-bold">No lovely treasures match your query!</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 bg-pink-100 text-pink-500 hover:bg-pink-200 text-xs font-bold rounded-lg uppercase"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>
      </section>



      {/* 6. SINGLE PRODUCT DETAIL SPEC MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" id="product-detail-modal">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border-2 border-pink-100 max-h-[90vh] overflow-y-auto animate-zoom-in text-left">
            
            {/* Header backdrop with photo */}
            <div className="p-6 bg-rose-50 text-left relative flex justify-center h-52 items-center overflow-hidden border-b border-rose-100">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white/70 hover:bg-white text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center shadow"
              >
                ✕
              </button>
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="h-full object-contain relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {selectedProduct.category}
                </span>
                <h3 className="font-sans font-black text-xl text-slate-800 leading-tight">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-amber-400 font-serif">★★★★★</span>
                  <span className="text-slate-600 font-bold font-mono">{selectedProduct.rating}</span>
                  <span className="text-[10px] text-slate-400">({selectedProduct.reviewsCount} customer reviews)</span>
                </div>
              </div>

              <div className="font-mono text-xl font-black text-pink-500">
                ¥{selectedProduct.price.toLocaleString()}
              </div>

              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-xs uppercase text-slate-400">Boutique Description</h4>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {selectedProduct.tags.map(t => (
                  <span key={t} className="bg-pink-50 text-pink-500 border border-pink-100 rounded text-[9px] font-bold font-mono uppercase px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => {
                    onAddFavorite(selectedProduct.id);
                    onAddPoint(10);
                  }}
                  className="px-4 py-2 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-xl font-sans text-xs text-center border font-bold uppercase transition flex items-center gap-1.5"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(selectedProduct.id) ? 'fill-pink-500 text-pink-500' : ''}`} />
                  Like Her
                </button>
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    onAddPoint(30);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-2 bg-pink-500 hover:bg-pink-600 text-white font-sans text-xs font-bold rounded-xl text-center shadow-md uppercase cursor-pointer active:scale-95 active:ring-4 active:ring-pink-100 transition-all duration-200"
                >
                  🛒 Add to Basket • ¥{selectedProduct.price.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
