/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Heart, Gift, MessageCircle, AlertCircle, Smile, HelpCircle } from 'lucide-react';
import { CHARACTERS, Character } from '../types';

interface CharactersViewProps {
  onAddFavorite: (charId: string) => void;
  favorites: string[];
  onAddPoint: (amount: number) => void;
}

export default function CharactersView({ onAddFavorite, favorites, onAddPoint }: CharactersViewProps) {
  const [selectedFriend, setSelectedFriend] = useState<Character | null>(null);
  const [isWaving, setIsWaving] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [careMessage, setCareMessage] = useState('');
  const [careSent, setCareSent] = useState(false);

  // Filtered array
  const filteredFriends = CHARACTERS.filter(char => 
    char.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    char.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const handleWave = (friendId: string) => {
    setIsWaving(friendId);
    onAddPoint(10); // Reward for saying hi!
    setTimeout(() => {
      setIsWaving(null);
    }, 1500);
  };

  const handleCareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (careMessage.trim() && selectedFriend) {
      setCareSent(true);
      onAddPoint(40);
      setTimeout(() => {
        setCareSent(false);
        setCareMessage('');
      }, 3000);
    }
  };

  return (
    <div className="space-y-12 text-slate-800" id="characters-page-canvas">
      
      {/* Page Title Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-400 via-rose-300 to-amber-100 p-8 sm:p-12 text-center rounded-3xl text-white shadow-sm" id="char-hero-showcase">
        <video 
          src="https://ik.imagekit.io/owyaqu7vl/083fb839cee7d772828fcfec8e7d0349.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none animate-video-loop"
          style={{ opacity: 0.55 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 space-y-4 max-w-xl mx-auto">
          <span className="text-3xl animate-bounce inline-block">🎈</span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-white drop-shadow-sm">Meet My Friends</h1>
          <p className="font-sans text-xs sm:text-sm text-pink-50 max-w-md mx-auto leading-relaxed">
            "You can never have too many friends!" Check out the sweet personalities, birthdays, and favorite foods of Hello Kitty's neighborhood mates.
          </p>
          
          {/* Quick Search Filtering */}
          <div className="pt-2 max-w-sm mx-auto">
            <input 
              type="text" 
              placeholder="Search by name, tag or hobby..." 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-slate-700 bg-white/95 text-xs sm:text-sm pl-4 pr-10 py-2.5 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 font-sans transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main Friends listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="friends-grid-container">
        {filteredFriends.map((char) => {
          const isFav = favorites.includes(char.id);
          const isActivelyWaving = isWaving === char.id;

          return (
            <div 
              key={char.id}
              className="bg-white border-2 border-slate-100 rounded-3xl overflow-hidden hover:border-pink-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              id={`friend-card-${char.id}`}
            >
              {/* Photo backdrop circle */}
              <div className={`relative p-6 flex justify-center items-center min-h-[190px] overflow-hidden ${char.bgColor}`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_white_30%,_transparent_75%)] opacity-20"></div>
                
                <img 
                  src={char.image} 
                  alt={char.name} 
                  className={`w-36 h-auto object-contain select-none transition-transform duration-300 relative z-10 ${
                    isActivelyWaving ? 'animate-swing transform scale-110' : 'hover:scale-104'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Favorite Toggle button */}
                <button
                  type="button"
                  onClick={() => {
                    onAddFavorite(char.id);
                    onAddPoint(15);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full border border-pink-50 text-slate-300 hover:text-pink-500 hover:scale-105 active:scale-95 transition-all shadow-sm z-20"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-pink-500 text-pink-500' : ''}`} />
                </button>

                {/* Floating Wave Sparkle Indicator */}
                {isActivelyWaving && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <span className="bg-pink-500 text-white font-sans font-bold text-[10px] px-2.5 py-1 rounded-full shadow-lg border border-white rotate-6 animate-zoom-in">
                      Waving! ✨ 👋
                    </span>
                  </div>
                )}
              </div>

              {/* Text metadata */}
              <div className="p-5 text-left flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans font-black text-lg text-slate-800">{char.name}</h3>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-mono font-bold px-1.5 py-0.5 rounded">
                      {char.birthday}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {char.tags.map(t => (
                      <span key={t} className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="font-sans text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {char.description}
                  </p>
                </div>

                {/* Bottom interactive row */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => handleWave(char.id)}
                    className="w-1/2 py-2 border-2 border-pink-100 text-pink-500 hover:bg-pink-50 font-sans font-extrabold text-xs rounded-xl active:scale-98 transition text-center uppercase"
                  >
                    👋 Say Hi!
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFriend(char);
                      onAddPoint(10);
                    }}
                    className="w-1/2 py-2 bg-pink-500 hover:bg-pink-600 text-white font-sans font-extrabold text-xs rounded-xl active:scale-98 transition text-center uppercase shadow-sm"
                  >
                    Details 🔍
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredFriends.length === 0 && (
          <div className="col-span-full bg-slate-50 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto" id="no-search-results">
            <div className="text-4xl text-slate-400">🧸</div>
            <h3 className="font-sans font-bold text-slate-600 text-sm">No adorable friend matches!</h3>
            <p className="font-sans text-xs text-slate-400">Try searching "kitty", "pink", "sweet" or clear your query.</p>
            <button 
              onClick={() => setSearchFilter('')}
              className="px-4 py-2 bg-pink-500 text-white font-sans font-bold text-xs rounded-lg uppercase"
            >
              Show All Friends
            </button>
          </div>
        )}
      </div>

      {/* 2. FRIENDSHIP SURVEY BOX / EMAIL GREETING */}
      <section className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-100 rounded-3xl p-8 text-left" id="newsletter-friendship-signup">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-3">
            <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-800 tracking-tight flex items-center gap-2">
              💌 Sweetest Newsletter Signup
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              Want to see actual letters sent by Sanrio artists, cute printable paper models, coloring book pages, and get alerts for vintage plush restorations? Give us your email. It takes 10 seconds and we promise never to spam!
            </p>
          </div>
          
          <div className="md:col-span-5">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onAddPoint(100); // 100 points for newsletter signups
                alert("Thank you! You are now subscribed to Hello Kitty's sweet dispatch! +100 Strawberry Points! 🍓");
              }} 
              className="space-y-3 bg-white p-5 rounded-2xl border border-pink-100 shadow-sm"
            >
              <div className="space-y-1">
                <label className="block text-[10px] tracking-wide font-mono uppercase text-slate-400 font-extrabold">Your Sweet Email</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  className="w-full px-3 py-2 text-xs font-sans border border-slate-200 rounded-lg focus:outline-none focus:border-pink-400 bg-white"
                />
              </div>

              <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                <AlertCircle className="w-3 h-3 text-pink-400 shrink-0 animate-pulse" />
                <span>By clicking join, you pledge to keep the world beautiful.</span>
              </div>

              <button 
                type="submit" 
                className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-sans font-extrabold text-xs rounded-xl shadow-md transition uppercase cursor-pointer"
              >
                Join dispatch of joy 🎀
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. DETAIL MODAL DIALOG */}
      {selectedFriend && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="friend-detail-modal">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-pink-200 max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto animate-zoom-in">
            
            {/* Header backdrop banner */}
            <div className={`p-6 text-left relative flex items-center justify-between overflow-hidden border-b-2 border-slate-100 ${selectedFriend.bgColor}`}>
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-1 rounded-2xl bg-white border border-pink-100 shrink-0">
                  <img 
                    src={selectedFriend.image} 
                    alt={selectedFriend.name} 
                    className="w-12 h-12 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-sans font-black text-xl text-slate-800">{selectedFriend.name}</h3>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                    {selectedFriend.jpName || 'Sanrio Neighbor'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedFriend(null);
                  setCareSent(false);
                }}
                className="relative z-10 p-1 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-800 shadow"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 text-left space-y-6">
              
              {/* Profile Bio details */}
              <div className="space-y-2">
                <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-400">Sweet Friendship Bio</h4>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedFriend.description}
                </p>
              </div>

              {/* Grid attributes */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                  <span className="block text-[8px] font-mono text-slate-400 font-extrabold uppercase mb-0.5">Birthday Calendar</span>
                  <span className="font-sans font-bold text-xs text-slate-700 block">{selectedFriend.birthday}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                  <span className="block text-[8px] font-mono text-slate-400 font-extrabold uppercase mb-0.5">Known Traits</span>
                  <span className="font-sans font-bold text-xs text-slate-700 block">{selectedFriend.personality}</span>
                </div>
                <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                  <span className="block text-[8px] font-mono text-slate-400 font-extrabold uppercase mb-0.5">Most Loved Sweets</span>
                  <span className="font-sans font-bold text-xs text-slate-700 block">{selectedFriend.favorite}</span>
                </div>
              </div>

              {/* Stats meter parameters */}
              <div className="space-y-3">
                <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-400">Kindness Scale</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Sweetness level', pct: selectedFriend.stats.sweetness, color: 'bg-rose-400' },
                    { label: 'Kindness scale', pct: selectedFriend.stats.kindness, color: 'bg-emerald-400' },
                    { label: 'Mischievous attitude', pct: selectedFriend.stats.mischief, color: 'bg-[#9D6BFF]' },
                    { label: 'Patience index', pct: selectedFriend.stats.patience, color: 'bg-[#4B9EFF]' },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>{stat.label}</span>
                        <span className="font-mono">{stat.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write postcard letter segment to earn points */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-600 flex items-center gap-1">
                  🍪 Bake a postcard for {selectedFriend.name}
                </h4>
                {careSent ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-4 rounded-xl text-center animate-fade-in">
                    <p className="font-bold">💕 Postcard Delighted!</p>
                    <p className="text-[11px] text-emerald-600 mt-1">
                      You just baked a beautiful postcard showing warm support! You earned <strong className="text-pink-600">+40 points</strong>!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCareSubmit} className="space-y-2">
                    <textarea 
                      placeholder={`Tell ${selectedFriend.name} your favorite cookie recipe or share some love... 🎀`}
                      required
                      value={careMessage}
                      onChange={(e) => setCareMessage(e.target.value)}
                      className="w-full min-h-[70px] p-2.5 border border-slate-200 rounded-2xl text-xs font-sans focus:outline-none focus:border-pink-400 bg-white resize-none"
                    />
                    <button 
                      type="submit" 
                      className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-sans font-extrabold text-xs rounded-xl shadow-md transition uppercase"
                    >
                      Whisper postcard with support
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
