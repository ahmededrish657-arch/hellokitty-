/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Award, Sparkles, User, Bell } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  favorites: string[];
  points: number;
  profileName: string;
}

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  favorites,
  points,
  profileName,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchFeedback, setShowSearchFeedback] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'characters', label: 'Characters' },
    { id: 'shop', label: 'Shop Boutique' },
    { id: 'puroland', label: 'Sanrio Puroland' },
    { id: 'bakery', label: 'Sweet Bakery' },
    { id: 'club', label: 'Sweetest Club' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchFeedback(true);
      setTimeout(() => setShowSearchFeedback(false), 3000);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-pink-100 shadow-sm" id="main-app-header">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 text-white text-xs font-medium py-1 px-4 flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px] opacity-20"></div>
        <div className="flex items-center gap-1.5 relative z-10 mx-auto md:mx-0">
          <Sparkles className="w-3 H-3 animate-spin" />
          <span>Pink Summer Carnival: Register for Hello Kitty Club and get 500 Strawberry Points! 🎀</span>
        </div>
        <div className="hidden md:flex items-center gap-4 relative z-10 text-[11px] font-semibold text-pink-50">
          <span className="hover:text-white cursor-pointer transition">Gift Cards</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer transition">Support</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer transition">Location Finder</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Brand Frame */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 focus:outline-none group transform hover:scale-102 transition duration-200"
            id="brand-logo-btn"
          >
            <div className="relative">
              <img 
                src="https://cdn.phototourl.com/free/2026-06-01-9edc45ee-5ad0-4ee5-ba2d-ab784f4b5aa1.jpg" 
                alt="Hello Kitty Logo" 
                className="h-10 sm:h-12 w-auto object-contain drop-shadow"
                referrerPolicy="no-referrer"
              />
              {/* Floating Little Bow Decorator */}
              <div className="absolute -top-1 -right-2 bg-pink-500 text-[8px] text-white px-1 py-0.5 rounded-full rotate-12 scale-90 font-bold border border-white shadow">
                🎀
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <span className="block font-sans font-black tracking-tight text-xl text-pink-500 uppercase leading-none">
                Hello Kitty
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                &amp; Friends World
              </span>
            </div>
          </button>

          {/* Center: Interactive Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative max-w-sm w-full" id="header-search-form">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <Search className="w-4 h-4 text-pink-400" />
            </span>
            <input 
              type="text" 
              placeholder="Search boutique, park updates or characters..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-2 border-pink-100 rounded-full font-sans text-sm focus:outline-none focus:border-pink-400 transition"
            />
            {showSearchFeedback && (
              <div className="absolute top-11 left-0 right-0 bg-pink-500 text-white text-xs py-2 px-3 rounded-lg shadow-lg flex items-center justify-between animate-fade-in z-20">
                <span>Searching "{searchQuery}" in our treats boutique... 🎀</span>
                <span className="font-bold text-[10px] bg-white text-pink-500 px-1.5 py-0.5 rounded">Searching</span>
              </div>
            )}
          </form>

          {/* Right: Quick Stats & Interactive Actions */}
          <div className="flex items-center gap-2 sm:gap-4" id="header-interactive-actions">
            
            {/* Strawberry Points Tracker Pill */}
            <button 
              onClick={() => setActiveTab('club')} 
              className="flex items-center gap-1.5 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border border-red-200 px-3 py-1.5 rounded-full transition group"
              id="points-pill-btn"
            >
              <span className="text-sm font-bold text-red-500 animate-bounce">🍓</span>
              <div className="text-left leading-none">
                <span className="block text-[8px] font-bold text-red-400 uppercase tracking-wider">My Points</span>
                <span className="text-xs font-black text-rose-600 font-mono group-hover:scale-105 transition duration-150">
                  {points}
                </span>
              </div>
            </button>

            {/* Favorite Counter Badge */}
            <div className="relative group">
              <button 
                onClick={() => setActiveTab('characters')}
                className="p-2 text-slate-400 hover:text-pink-500 active:scale-95 transition-all text-sm rounded-full hover:bg-pink-50"
                title={`${favorites.length} Favorites`}
                id="favorites-shortcut-btn"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-b from-pink-500 to-rose-600 text-white font-mono font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>

            {/* Cart Button with popup logic */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-slate-400 hover:text-pink-500 active:scale-95 transition-all text-sm rounded-full relative hover:bg-pink-50"
              id="shopping-bag-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 text-pink-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white font-mono font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Thumbnail */}
            <button 
              onClick={() => setActiveTab('club')}
              className="flex items-center gap-2 hover:bg-pink-50 pl-1 pr-2 sm:pr-3 py-1 rounded-full border border-pink-50 transition group"
              id="profile-thumbnail-btn"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL_rEl6eVj_gzqBafiChwyhnl2lvLqtDBGLkyC-7UaibTYlXV4hNIY7i6deZpgsbcQVLqb4RyHR5LOm_tQJldfRCL684o4S25y_XNkpvCpzy8EFKJUqR2r9wxpmxZzcQFpJT5Nm0AdDb4qVABMwENKED9AKA8PNrAH6PT8P5_Iqo8s57tV0wUub91mktN7UqwZUZDiAZaWYkAqnzW51Ls1Hpm8tpGewCHOirX3VlO1AGRjKInOq75hVYlt_wH55KMNGffPwBnDcfk" 
                alt="User Profile" 
                className="w-7 h-7 rounded-full object-cover border border-pink-400 group-hover:scale-105 transition"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block text-left leading-none">
                <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">MEMBER</span>
                <span className="text-xs font-bold text-slate-700 font-sans group-hover:text-pink-500 transition">
                  {profileName}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="mt-4 flex overflow-x-auto no-scrollbar scroll-smooth border-t border-slate-100 pt-3" id="main-navigation-bar">
          <ul className="flex items-center gap-1.5 md:gap-4 mx-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-4 py-2 font-sans font-bold text-xs sm:text-sm tracking-wide rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-pink-500 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-pink-500 hover:bg-pink-50/50'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {item.id === 'home' && '🏠 '}
                      {item.id === 'characters' && '🎈 '}
                      {item.id === 'shop' && '🛍️ '}
                      {item.id === 'puroland' && '🎡 '}
                      {item.id === 'bakery' && '🧁 '}
                      {item.id === 'club' && '🎀 '}
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full -z-10 shadow-sm shadow-pink-200"></span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
