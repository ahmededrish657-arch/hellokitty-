/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Heart, Mail, Share2, Instagram, MessageSquare, Twitter, Award } from 'lucide-react';

interface FooterProps {
  onNewsletterSignup: (email: string) => void;
}

export default function Footer({ onNewsletterSignup }: FooterProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onNewsletterSignup(email);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-slate-50 border-t-2 border-pink-100 mt-20 relative overflow-hidden" id="app-footer">
      {/* Decorative Top Ribbon Bar */}
      <div 
        className="h-4 bg-[length:100px_auto] bg-repeat-x"
        style={{ 
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPRI14XuduDt2ZGw1EHRx_Pci90CE67DY0dz5v7UDGKSu3U4qj9D_1frLWBkleSLf0Z1y02cKBQjKBoX8o4zVrRNSEV06ASLXGVvoAgyfQdlouWC0BQCya_-U5J_mmke2yziW_Z-VPPrbgxIFq0SN7qFEIoKf7cGWExyF8kU_C5OsaArWZ8M4FEvsx5TaEX22Kxa91dJtubHKS62AVmXr8Nc1UYi_lLVYApRCnDIBEkXkBgdVqcu4ClGzhHUhE9pHAr9CnhO6d8f0')` 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/About description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.phototourl.com/free/2026-06-01-58f22a3d-f41a-42b7-ba28-abf708612009.jpg" 
                alt="Hello Kitty Tiny Logo" 
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-sans font-black text-slate-800 text-md tracking-tight uppercase leading-none">
                Hello Kitty World
              </span>
            </div>
            
            <p className="mt-4 font-sans text-xs text-slate-500 leading-relaxed">
              Welcome to the sweetest neighborhood online! Together with Hello Kitty, My Melody, Kuromi and friends, let us spread friendship, warm smiles, and pure kindness one day at a time!
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-slate-400 text-xs">Share the Love:</span>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-full text-slate-400 hover:text-[#E1306C] hover:bg-rose-50 transition">
                  <Instagram className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-full text-slate-400 hover:text-[#1DA1F2] hover:bg-blue-50 transition">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans font-bold text-slate-800 text-sm tracking-wide uppercase">World Explorer</h4>
            <ul className="mt-4 space-y-2 text-xs font-medium text-slate-500">
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Meet My Friends</span></li>
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Sweetest Boutique Shop</span></li>
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Official Ticket Planner</span></li>
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Character Map &amp; Rides</span></li>
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Join the Sweet Badge Club</span></li>
            </ul>
          </div>

          {/* Safety & Kindness rules */}
          <div>
            <h4 className="font-sans font-bold text-slate-800 text-sm tracking-wide uppercase">Sweet Guidelines</h4>
            <ul className="mt-4 space-y-2 text-xs font-medium text-slate-500">
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Share Sweetness &amp; Joy</span></li>
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Keep the Community Cheerful</span></li>
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Parental Guiding Portal</span></li>
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Privacy &amp; Cookies</span></li>
              <li><span className="hover:text-pink-500 cursor-pointer block transition">• Terms of Friendship</span></li>
            </ul>
          </div>

          {/* Sweet Newsletter */}
          <div>
            <h4 className="font-sans font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-pink-400" /> Keep In Touch!
            </h4>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Never miss a new plush drop, bakery recipe, or special ticket discount in Puroland!
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter sweet email..." 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-pink-100 rounded-lg text-xs font-sans focus:outline-none focus:border-pink-400 bg-white"
              />
              <button 
                type="submit" 
                className="bg-pink-500 shrink-0 hover:bg-pink-600 text-white font-sans font-bold text-xs px-3 py-2 rounded-lg shadow-sm font-bold transition duration-200"
              >
                Join
              </button>
            </form>
            {success && (
              <p className="mt-2 text-xs text-emerald-600 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-500 animate-spin" />
                Yay! Welcome on board, Sweet Friend! 🎀
              </p>
            )}
          </div>
        </div>

        {/* Footer Bottom copyright with a ribbon icon and warm design elements */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-medium font-sans">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Sanrio World Fan Center. Proudly built with love &amp; endless ribbons.</span>
            <Heart className="w-3 h-3 fill-pink-500 text-pink-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer block">Licensed Assets</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer block">Contact Support</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer uppercase tracking-wider bg-pink-100 text-pink-500 px-2 py-0.5 rounded font-mono font-bold text-[9px]">
              LEVEL UP 🍓
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
