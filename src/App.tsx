/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CharactersView from './components/CharactersView';
import ShopView from './components/ShopView';
import PurolandView from './components/PurolandView';
import ClubView from './components/ClubView';
import BakeryView from './components/BakeryView';
import LoginView from './components/LoginView';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem } from './types';

export default function App() {
  // Login Gate state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Navigation Router state
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Back to Top button visibility state
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // 1. Automatic scroll-to-top when switching activeTab
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    // Give layout brief render window, then scroll perfectly and smoothly
    const timer = setTimeout(handleScrollToTop, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // 2. Scroll event listener to show/hide the back-to-top button
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Basket drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Likes favorites state
  const [favorites, setFavorites] = useState<string[]>(['hello-kitty']);

  // Rewards dynamic Points balance
  const [points, setPoints] = useState<number>(650);

  // User details
  const [profileName, setProfileName] = useState<string>('Sweet Friend');

  // Global methods
  const handleAddPoint = (amount: number) => {
    setPoints((prev) => Math.max(0, prev + amount));
  };

  const handleAddFavorite = (charId: string) => {
    setFavorites((prev) => {
      if (prev.includes(charId)) {
        // remove
        return prev.filter(id => id !== charId);
      } else {
        // add
        return [...prev, charId];
      }
    });
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
    // Open drawer automatically
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter(item => item.product.id !== productId));
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNewsletterSignup = (email: string) => {
    handleAddPoint(100);
  };

  if (!isLoggedIn) {
    return (
      <LoginView 
        onLogin={(nickname) => {
          setProfileName(nickname);
          setIsLoggedIn(true);
          setActiveTab('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-pink-200 selection:text-pink-900" id="app-root-frame">
      
      {/* Dynamic Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        favorites={favorites}
        points={points}
        profileName={profileName}
      />

      {/* Main viewport canvas container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="app-main-viewport">
        
        {/* Animated fade in wrappers for tabs navigation swapping */}
        <div className="transition-all duration-300">
          
          {activeTab === 'home' && (
            <div className="animate-fade-in" id="viewport-home-tab">
              <HomeView 
                onNavigate={setActiveTab}
                onAddPoint={handleAddPoint}
                onAddFavorite={handleAddFavorite}
                favorites={favorites}
              />
            </div>
          )}

          {activeTab === 'characters' && (
            <div className="animate-fade-in" id="viewport-characters-tab">
              <CharactersView 
                onAddFavorite={handleAddFavorite}
                favorites={favorites}
                onAddPoint={handleAddPoint}
              />
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="animate-fade-in" id="viewport-shop-tab">
              <ShopView 
                cart={cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateCartQuantity={handleUpdateCartQuantity}
                onClearCart={handleClearCart}
                onAddFavorite={handleAddFavorite}
                favorites={favorites}
                onAddPoint={handleAddPoint}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
              />
            </div>
          )}

          {activeTab === 'puroland' && (
            <div className="animate-fade-in" id="viewport-puroland-tab">
              <PurolandView 
                onAddPoint={handleAddPoint}
              />
            </div>
          )}

          {activeTab === 'club' && (
            <div className="animate-fade-in" id="viewport-club-tab">
              <ClubView 
                points={points}
                onAddPoint={handleAddPoint}
                profileName={profileName}
                updateProfileName={setProfileName}
              />
            </div>
          )}

          {activeTab === 'bakery' && (
            <div className="animate-fade-in" id="viewport-bakery-tab">
              <BakeryView 
                onAddPoint={handleAddPoint}
                profileName={profileName}
              />
            </div>
          )}

        </div>
      </main>

      {/* Dynamic Footer with newsletter points hook */}
      <Footer onNewsletterSignup={handleNewsletterSignup} />

      {/* Global Shoppoing Basket Drawer with smooth dynamic animations */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
        onAddPoint={handleAddPoint}
      />

      {/* Kawaii Scroll-To-Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.12, y: -4 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 bg-white hover:bg-pink-50 border-3 border-pink-200 text-pink-500 rounded-2xl shadow-lg p-3 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors duration-200 group font-sans font-black text-[11px] w-14 h-14"
            title="回到顶部"
            id="global-back-to-top-btn"
          >
            <span className="text-base select-none group-hover:animate-bounce">🎀</span>
            <ChevronUp className="w-4 h-4 text-pink-400 group-hover:text-pink-600 transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
