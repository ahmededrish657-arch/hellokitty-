/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, Gift, Calendar, Trophy, CheckCircle, Sparkles, User, Star, HelpCircle, Download } from 'lucide-react';

interface ClubViewProps {
  points: number;
  onAddPoint: (amount: number) => void;
  profileName: string;
  updateProfileName: (name: string) => void;
}

// Memory Match Game Cards Emojis
const EMOJIS = ['🍓', '🍰', '🎈', '🧸', '🎀', '🍭'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function ClubView({ points, onAddPoint, profileName, updateProfileName }: ClubViewProps) {
  // Membership Form States
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favNeighbour, setFavNeighbour] = useState('Hello Kitty');
  const [isRegistered, setIsRegistered] = useState(false);

  // Match Game States
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [matchTries, setMatchTries] = useState(0);

  // Initialize Memory Game Card deck
  const initGame = () => {
    const deck: Card[] = [];
    const doubleEmojis = [...EMOJIS, ...EMOJIS];
    // Shuffle
    const shuffled = doubleEmojis.sort(() => Math.random() - 0.5);
    shuffled.forEach((emoji, idx) => {
      deck.push({
        id: idx,
        emoji,
        isFlipped: false,
        isMatched: false
      });
    });
    setCards(deck);
    setSelectedCards([]);
    setGameWon(false);
    setMatchTries(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    // block if already matched, flipped, or currently 2 cards flipped
    const targetCard = cards.find(c => c.id === cardId);
    if (!targetCard || targetCard.isFlipped || targetCard.isMatched || selectedCards.length >= 2 || gameWon) {
      return;
    }

    // Flip card
    const updatedCards = cards.map(c => c.id === cardId ? { ...c, isFlipped: true } : c);
    setCards(updatedCards);

    const newSelections = [...selectedCards, cardId];
    setSelectedCards(newSelections);

    if (newSelections.length === 2) {
      setMatchTries(prev => prev + 1);
      const [firstId, secondId] = newSelections;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          const matchedDeck = updatedCards.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
          );
          setCards(matchedDeck);
          setSelectedCards([]);

          // Check if game is completed
          const allMatched = matchedDeck.every(c => c.isMatched);
          if (allMatched) {
            setGameWon(true);
            onAddPoint(100); // 100 points for winning the game!
          }
        }, 500);
      } else {
        // No match, turn back
        setTimeout(() => {
          const faceDownDeck = updatedCards.map(c => 
            c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
          );
          setCards(faceDownDeck);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      updateProfileName(userName);
      onAddPoint(500); // 500 point rewards for registration!
      setIsRegistered(true);
    }
  };

  // Determine reward level tier based on current point stats
  const pointsMax = 1500;
  const rawPct = Math.min(100, (points / pointsMax) * 100);

  let currentTier = "Sweet Friend";
  let tierDesc = "Collect 1000 points to trigger Ribbon Superstar!";
  let badgeIcon = "🧸";

  if (points >= 1500) {
    currentTier = "Ribbon Legend";
    tierDesc = "Wow! You are a supreme neighborhood monarch!";
    badgeIcon = "👑";
  } else if (points >= 800) {
    currentTier = "Ribbon Superstar";
    tierDesc = "Amazing! You are a sweet neighborhood star!";
    badgeIcon = "🎀";
  }

  return (
    <div className="space-y-12 text-slate-800 animate-fade-in" id="club-page-canvas">
      
      {/* 1. MEMBERSHIP BANNER COVER TITLE */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-300 via-rose-250 to-pink-400 rounded-3xl p-8 sm:p-12 text-left text-white shadow-md" id="club-hero-welcome">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-85"
        >
          <source src="https://ik.imagekit.io/owyaqu7vl/0211d86bf422d697a341ec2b8ea16d2a.mp4" type="video/mp4" />
        </video>
        <div className="space-y-4 max-w-xl relative fallback h-full z-10">
          <span className="inline-flex items-center gap-1 bg-white/20 text-white font-sans font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/25">
            <Award className="w-3.5 h-3.5 animate-spin" />
            <span>Exclusive Membership</span>
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl leading-tight drop-shadow-sm">
            Sweetest Circle Club 🍓
          </h1>
          <p className="font-sans text-xs sm:text-sm text-pink-50 leading-relaxed max-w-md">
            Unlock digital wallpaper goodies, secure high discounts inside our boutiques, and participate in special match games to earn custom stickers! Enroll below and instantly earn <strong className="text-white">+500 Strawberry Points</strong>!
          </p>
        </div>
      </section>

      {/* 2. DYNAMIC STRAWBERRY POINTS METER */}
      <section className="bg-white border-2 border-[#FFE4E1] rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-sm justify-between" id="club-strawberry-points-meter">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-pink-50/50 p-5 rounded-2xl border border-pink-100">
          <div className="text-left space-y-1">
            <span className="block text-[10px] font-mono text-pink-400 uppercase tracking-widest font-extrabold">Active Status tier</span>
            <h3 className="font-sans font-black text-2xl text-slate-800 flex items-center gap-2">
              <span className="animate-pulse">{badgeIcon}</span> {currentTier}
            </h3>
            <p className="font-sans text-xs text-slate-500 leading-normal">{tierDesc}</p>
          </div>

          <div className="text-center sm:text-right">
            <span className="block text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Accumulated Balance</span>
            <span className="font-mono text-3xl font-black text-rose-600 animate-pulse">{points} 🍓</span>
          </div>
        </div>

        {/* Linear progression bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-500">
            <span>Tier 1: Sweet Friend (0 pts)</span>
            <span>Tier 2: Superstar (800 pts)</span>
            <span>Tier 3: Superstar Legend (1500 pts)</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full border border-slate-205/30 overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-rose-400 to-pink-500 transition-all duration-300"
              style={{ width: `${rawPct}%` }}
            ></div>
            {/* Float star labels on check check-point */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[53%] w-2 h-2 rounded-full bg-white border border-pink-500"></div>
          </div>
        </div>
      </section>

      {/* 3. DOUBLE SECTIONS - REGISTER FORM AND MEMORY GAME */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="club-activity-grid">
        
        {/* ENROLLMENT FORM */}
        <section className="lg:col-span-6 bg-white border-2 border-slate-100 rounded-3xl p-6 sm:p-8 text-left space-y-5 shadow-sm">
          <div className="border-b pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-sans font-black text-lg text-slate-800">1. Apply for sweet membership</h3>
              <p className="font-sans text-xs text-slate-400">Lock your customized name onto the top right profile badge!</p>
            </div>
            <span className="text-xl">✍️</span>
          </div>

          {isRegistered ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center space-y-3 animate-fade-in" id="membership-complete">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-slate-800 text-sm">Perfect! Membership registered!</h4>
                <p className="font-sans text-xs text-slate-500">
                  Welcome to the sweet league, <strong>{profileName}</strong>! Enjoy exclusive perks! <strong className="text-pink-600">+500 points loaded!</strong>
                </p>
              </div>
              <button 
                onClick={() => setIsRegistered(false)}
                className="py-1.5 px-4 bg-slate-100 hover:bg-slate-250 text-slate-600 rounded-lg text-xs font-semibold underline"
              >
                Change details name
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4" id="member-enroll-form">
              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase font-mono font-bold text-slate-400">Sweet User Profile Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. KittyFan99" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] uppercase font-mono font-bold text-slate-400">Dispatch Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="hello@kitty.net" 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase font-mono font-bold text-slate-400">Birthday Month</label>
                  <input 
                    type="date" 
                    required
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] uppercase font-mono font-bold text-slate-400">Favorite Companion</label>
                  <select 
                    value={favNeighbour}
                    onChange={(e) => setFavNeighbour(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none font-sans"
                  >
                    <option value="Hello Kitty">Hello Kitty 🎀</option>
                    <option value="My Melody">My Melody 🐰</option>
                    <option value="Kuromi">Kuromi 😈</option>
                    <option value="Pompompurin">Pompompurin 🍮</option>
                    <option value="Cinnamoroll">Cinnamoroll ☁️</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 border p-3.5 rounded-xl border-dashed border-slate-200 text-[10px] text-slate-400">
                Pledge: I declare to spread warm sunshine smiles, keep the neighborhood safe, swap cookie treats, and celebrate friends! 🌸
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 active:stroke-slate-50 text-white font-sans font-black text-xs uppercase rounded-xl shadow-md transition"
                id="sumbit-enroll-member-btn"
              >
                Register &amp; Claim 500 points 🍓
              </button>
            </form>
          )}
        </section>

        {/* INTERACTIVE MINI BOARD GAME */}
        <section className="lg:col-span-6 bg-gradient-to-b from-stone-50 to-pink-50/20 border-2 border-pink-100 rounded-3xl p-6 sm:p-8 text-left space-y-4 shadow-sm flex flex-col justify-between" id="club-match-emojis-game">
          <div className="space-y-3">
            <div className="border-b pb-3 border-pink-100 flex justify-between items-center">
              <div>
                <h3 className="font-sans font-black text-lg text-slate-800 flex items-center gap-1.5">
                  🍓 Sweets Emojis Match
                </h3>
                <p className="font-sans text-xs text-slate-500">Match double items below to earn <strong className="text-pink-600">+100 points</strong> payout instantly!</p>
              </div>
              <span className="text-[10px] font-mono font-black text-pink-500 border bg-white border-pink-100 px-2 py-0.5 rounded">PLAY &amp; EARN</span>
            </div>

            {gameWon ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
                <div className="text-4xl animate-bounce">🏆</div>
                <div className="space-y-1">
                  <h4 className="font-sans font-black text-base">You won in {matchTries} attempts!</h4>
                  <p className="font-sans text-xs text-slate-500">
                    Perfect memory swap! Instant rewards disbursed. <strong className="text-rose-500">+100 Strawberry Points!</strong>
                  </p>
                </div>
                <button 
                  onClick={() => {
                    initGame();
                    onAddPoint(10); // small retry bonus
                  }}
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white font-mono font-bold text-xs rounded-lg uppercase shadow transition"
                >
                  Play Another Round 🎀
                </button>
              </div>
            ) : (
              /* Grid memory board */
              <div className="grid grid-cols-4 gap-2.5 max-w-[320px] mx-auto py-2">
                {cards.map((card) => {
                  const isOpen = card.isFlipped || card.isMatched;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleCardClick(card.id)}
                      className={`h-14 sm:h-16 rounded-xl flex items-center justify-center font-bold text-xl sm:text-2xl cursor-pointer shadow-sm transition-all duration-300 transform border-2 ${
                        isOpen 
                          ? 'bg-white border-pink-300 scale-102 rotate-0' 
                          : 'bg-gradient-to-tr from-pink-400 to-rose-400 border-white text-white rotate-5 hover:rotate-0'
                      }`}
                      id={`match-card-idx-${card.id}`}
                    >
                      {isOpen ? card.emoji : '🎀'}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-pink-100/50 flex justify-between items-center text-[10px] text-slate-400">
            <span>Rounds attempted: <strong>{matchTries} times</strong></span>
            <button 
              onClick={initGame} 
              className="font-bold uppercase text-pink-400 hover:text-pink-600"
            >
              Reset Board Grid
            </button>
          </div>
        </section>
      </div>

      {/* 4. EXCLUSIVE WALLPAPER DOWNLOAD GOODIES */}
      <section className="space-y-6" id="digital-goodies-download-portal">
        <div className="text-left border-b pb-3 border-slate-100">
          <h2 className="font-sans font-black text-xl text-slate-800 flex items-center gap-1.5">
            🎁 Exclusive Digital Wallpapers
          </h2>
          <p className="font-sans text-xs text-slate-500">Check current strawberry status to trigger downloadable decorative background wallpapers for mobile &amp; desktops!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Cottage Garden Sweetness', type: 'Desktop BG (4K)', cost: 300, image: 'https://cdn.phototourl.com/free/2026-06-01-4d7b28b6-5e11-4593-8ed3-d10ef5017100.jpg' },
            { name: 'Sweets Emojis Rain', type: 'Mobile (Vert)', cost: 600, image: 'https://cdn.phototourl.com/free/2026-06-01-9cc836ce-e6c4-47d3-b315-c606b0971196.jpg' }
          ].map((g) => {
            const hasSufficient = points >= g.cost;
            return (
              <div 
                key={g.name}
                className="bg-white border hover:border-pink-100 rounded-2xl overflow-hidden shadow-sm flex items-center p-3.5 gap-4 hover:shadow-md transition text-left"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-50 relative group">
                  <img 
                    src={g.image} 
                    alt={g.name} 
                    className="w-full h-full object-cover group-hover:scale-105 duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {!hasSufficient && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-red-500 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                        Locked
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 font-mono">
                    {g.type}
                  </span>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-800 leading-snug line-clamp-1">{g.name}</h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-xs font-bold text-slate-500 flex items-center gap-0.5">
                      Cost: <strong className="text-pink-500 font-black">{g.cost} pts 🍓</strong>
                    </span>

                    <button
                      disabled={!hasSufficient}
                      onClick={() => {
                        onAddPoint(-g.cost); // deduct cost
                        alert(`Yay! Wallpaper "${g.name}" download started successfully! 🎀`);
                      }}
                      className="px-3 py-1 bg-pink-150 disabled:bg-slate-100 hover:bg-pink-200 font-sans font-extrabold text-[9px] text-pink-600 disabled:text-slate-400 rounded-lg uppercase tracking-wide flex items-center gap-1 cursor-pointer transition shadow-sm border border-pink-100"
                    >
                      <Download className="w-3 h-3" /> Get
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
