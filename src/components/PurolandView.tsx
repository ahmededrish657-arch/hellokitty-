/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Clock, Star, Info, CheckCircle, Sparkles, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PurolandViewProps {
  onAddPoint: (amount: number) => void;
}

interface AttractionPin {
  id: string;
  name: string;
  icon: string;
  top: string;
  left: string;
  description: string;
  duration: string;
  crowdLevel: 'Low' | 'Moderate' | 'High';
}

interface PinkCastleProps {
  key?: string;
  top: string;
  left: string;
  onClick: () => void;
  onHoverStateChange: (hovered: boolean) => void;
}

function PinkCastle({ top, left, onClick, onHoverStateChange }: PinkCastleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; scale: number; type: string }[]>([]);

  useEffect(() => {
    onHoverStateChange(isHovered);
    if (!isHovered) {
      setParticles([]);
      return;
    }
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-6),
        {
          id: Date.now() + Math.random(),
          x: (Math.random() - 0.5) * 50,
          scale: Math.random() * 0.4 + 0.8,
          type: ['💖', '✨', '🌸'][Math.floor(Math.random() * 3)],
        }
      ]);
    }, 600);
    return () => clearInterval(interval);
  }, [isHovered, onHoverStateChange]);

  const handleContainerClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 600);
    onClick();
  };

  return (
    <div className="absolute z-20" style={{ top: `calc(${top} - 32px)`, left: `calc(${left} - 32px)` }}>
      {/* Particle Emitter */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, y: 10, x: p.x, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: -50, 
              x: p.x + (Math.random() - 0.5) * 15, 
              scale: p.scale 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
            className="absolute text-xs pointer-events-none select-none text-pink-400"
            style={{ left: '20px', top: '0px' }}
          >
            {p.type}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Castle Body */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleContainerClick}
        animate={isBouncing ? {
          y: [0, -18, 5, -3, 0],
          scaleX: [1, 0.85, 1.1, 0.95, 1],
          scaleY: [1, 1.15, 0.85, 1.05, 1],
        } : isHovered ? { scale: 1.08 } : { scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15,
          scale: { duration: 0.4, ease: "easeInOut" }
        }}
        className={`cursor-pointer transition-shadow duration-300 p-1 rounded-2xl ${
          isHovered ? 'drop-shadow-[0_0_15px_rgba(255,105,180,0.85)] filter' : 'drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] filter'
        }`}
        style={{ width: '64px', height: '64px' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Main Back Wall */}
          <rect x="25" y="45" width="50" height="35" fill="#FFE3E7" rx="3" />
          
          {/* Left Tower */}
          <rect x="20" y="40" width="13" height="40" fill="#FFB7C5" rx="1.5" stroke="#FFA3B1" strokeWidth="0.5" />
          <polygon points="17,40 26.5,10 36,40" fill="#E6C2FF" stroke="#CC99FF" strokeWidth="0.5" />
          
          {/* Right Tower */}
          <rect x="67" y="40" width="13" height="40" fill="#FFB7C5" rx="1.5" stroke="#FFA3B1" strokeWidth="0.5" />
          <polygon points="64,40 73.5,10 83,40" fill="#E6C2FF" stroke="#CC99FF" strokeWidth="0.5" />

          {/* Center Keep */}
          <rect x="36" y="32" width="28" height="48" fill="#FF9EAF" rx="3" stroke="#FF7E96" strokeWidth="0.5" />
          
          {/* Center Tall Spire Roof */}
          <polygon points="32,32 50,-5 68,32" fill="#D3A4FF" stroke="#B380FF" strokeWidth="0.5" />

          {/* Swinging Flag on Central Spire */}
          <motion.path 
            d="M50,-5 L68,-11 L50,-17 Z" 
            fill="#FF2E63"
            animate={{ 
              rotateY: [0, 20, 0, -20, 0],
              skewY: [0, 4, 0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut"
            }}
            style={{ originX: "50%", originY: "-5px" }}
          />
          
          {/* Arched Palace Gate */}
          <path d="M43,80 C43,65 57,65 57,80 Z" fill="#6A2E46" stroke="#4D1F31" strokeWidth="0.5" />

          {/* Cute Little Windows */}
          <rect x="24" y="48" width="5" height="8" rx="1" fill="#FFF8AC" />
          <rect x="71" y="48" width="5" height="8" rx="1" fill="#FFF8AC" />
          <rect x="47.5" y="42" width="5" height="8" rx="1" fill="#FFF8AC" />
          
          {/* Hello Kitty Bow representation above Gate */}
          <path d="M50,38 C48.5,36.5 45,36.5 46.5,39 C48,41.5 50,40 50,40 C50,40 52,41.5 53.5,39 C55,36.5 51.5,36.5 50,38 Z" fill="#FF1E56" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function PurolandView({ onAddPoint }: PurolandViewProps) {
  // Ticket Form States
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Map state
  const [activePin, setActivePin] = useState<AttractionPin | null>(null);
  const [showCastleModal, setShowCastleModal] = useState(false);

  // Seat Selector Plan state
  const [chosenTier, setChosenTier] = useState<'Standard' | 'Royal Bow VIP'>('Standard');

  // Timetable timers
  const [timeLeft, setTimeLeft] = useState({ parade: '', theatre: '', lights: '' });

  // Calculating remaining time to mock shows today
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Mock Parade at 14:30
      const paradeTime = new Date();
      paradeTime.setHours(14, 30, 0);
      let diffP = paradeTime.getTime() - now.getTime();
      if (diffP < 0) diffP += 24 * 60 * 60 * 1000; // tomorrow

      // Mock Theatre at 16:15
      const theatreTime = new Date();
      theatreTime.setHours(16, 15, 0);
      let diffT = theatreTime.getTime() - now.getTime();
      if (diffT < 0) diffT += 24 * 60 * 60 * 1000;

      // Mock Lights at 18:00
      const lightsTime = new Date();
      lightsTime.setHours(18, 0, 0);
      let diffL = lightsTime.getTime() - now.getTime();
      if (diffL < 0) diffL += 24 * 60 * 60 * 1000;

      const formatTime = (ms: number) => {
        const hrs = Math.floor(ms / (1000 * 60 * 60));
        const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hrs}h ${mins}m ${secs}s`;
      };

      setTimeLeft({
        parade: formatTime(diffP),
        theatre: formatTime(diffT),
        lights: formatTime(diffL),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const priceAdult = 3900;
  const priceChild = 2800;
  const priceSenior = 2200;
  const vipPremium = chosenTier === 'Royal Bow VIP' ? 1500 : 0;

  const ticketsCount = adults + children + seniors;
  const subtotal = (adults * priceAdult) + (children * priceChild) + (seniors * priceSenior);
  const grandTotal = subtotal + (ticketsCount * vipPremium);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketsCount > 0 && selectedDate) {
      const ref = `PL-${Math.floor(Math.random() * 90000 + 10000)}-${selectedDate.replace(/-/g, '')}`;
      setBookingRef(ref);
      setBookingCompleted(true);
      onAddPoint(200); // 200 points for ticket orders!
    }
  };

  const handleResetBooking = () => {
    setBookingCompleted(false);
    setSelectedDate('');
    setAdults(1);
    setChildren(0);
    setSeniors(0);
    setChosenTier('Standard');
  };

  // 8 beautiful pins overlayed over the isometric theme park map layout
  const PINS: AttractionPin[] = [
    { id: 'boat', name: 'Character Boat Ride', icon: '⛵', top: '22%', left: '50%', duration: '12 min', crowdLevel: 'High', description: "Sail along the glowing neon strawberry canal! Together with Cinnamon and My Melody, you sail past sweet gingerbread houses to Hello Kitty's royal birthday party." },
    { id: 'house', name: 'Lady Kitty House', icon: '👑', top: '15%', left: '20%', duration: 'Walkthrough', crowdLevel: 'Moderate', description: "Step inside Hello Kitty's personal royal vanity mansion! Admire holographic crystal towers, custom white pianos, and receive a virtual hugs photo clip." },
    { id: 'castle', name: 'Wisdom Tree Stage', icon: '🌳', top: '48%', left: '46%', duration: '25 min Show', crowdLevel: 'High', description: "The absolute core centerpiece of Puroland! Ground zero for our spectacular laser shows, projecting dreamscapes directly onto the branches." },
    { id: 'shop', name: 'Royal Entrance Shop', icon: '🛍️', top: '78%', left: '80%', duration: 'Boutique', crowdLevel: 'Moderate', description: "The largest physical boutique shop! Home to exclusive seasonal pastries, customized ear band accessories, and embroidered plush collection ribbons." },
    { id: 'bell', name: 'Melody Road bells', icon: '🔔', top: '65%', left: '15%', duration: 'Continuous', crowdLevel: 'Low', description: "Stroll along musical sidewalks that trigger lovely instrumental chimes based on how you step. A dream acoustic retreat for toddlers and parents." },
    { id: 'dining', name: 'Kawaii Desserts Dining', icon: '🍨', top: '40%', left: '82%', duration: 'Pastry bar', crowdLevel: 'High', description: "Puroland's premium restaurant. Treat yourself to Hello Kitty shortcakes, pastel blue Cinnamoroll soda shakes, and star-shaped pudding plates." }
  ];

  return (
    <div className="space-y-12 text-slate-800 animate-fade-in" id="puroland-page-canvas">
      
      {/* 1. EXPERIENCE HERO COVER BANNER */}
      <section 
        className="relative overflow-hidden bg-slate-900 bg-cover bg-center rounded-3xl p-8 sm:p-12 lg:p-16 text-left text-white shadow-xl min-h-[360px] flex items-center"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.1) 90%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWpw7dDcMZMLYteZRT9xrpEXqjep9RQyxXAFpzMsY_uCapUUsIqhD4cmwy1f3xIxoPv56C2bYzUe1Lts6nGi4C2QmBEdJ7r-Az4JoAbfXGYPJZUAaBoeq9eZWmv4ZH3x8hXiH772GgzJPBO3ogKBxt0bb2JvRTiS2BMGperyNHxdwMK2UPPfE-lT0cQalBGGpHJOEhpYJUnU745wB-LNcvBzRuITYiMwNq2g9W-A6v1k1uCJTzb_UWR20e62v6JQeJl815ViXcd-s')` 
        }}
        id="puroland-hero-banner"
      >
        <div className="absolute inset-0 bg-[#FF69B4]/10 pointer-events-none"></div>
        
        <div className="space-y-4 max-w-xl relative z-10">
          <span className="inline-flex items-center gap-1 bg-pink-500 text-white font-sans font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-pink-400">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Tokyo Theme Park</span>
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl leading-tight text-white drop-shadow-md">
            Experience the <br />
            Magic of Puroland! ✨
          </h1>
          <p className="font-sans text-xs sm:text-sm text-pink-50 max-w-md leading-relaxed">
            Step into the world's most whimsical physical indoor theme park located in Tama New Town, Tokyo! Explore glowing boat rivers, massive interactive theatres, and dine with Hello Kitty in original dining castles!
          </p>
          <div className="pt-2">
            <a 
              href="#ticket-builder-section" 
              className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 font-sans font-bold text-xs rounded-full shadow-lg hover:shadow-xl transition text-center uppercase inline-block whitespace-nowrap"
            >
              🎟️ Book Your Tickets Below
            </a>
          </div>
        </div>
      </section>

      {/* 2. MAP SECTION AND INFORMATION BLOCKS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="park-adventure-map-grid">
        
        {/* MAP PANEL */}
        <div className="lg:col-span-8 bg-white border-2 border-slate-100 rounded-3xl p-6 text-left space-y-4 shadow-sm relative">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-sans font-black text-lg text-slate-800 flex items-center gap-1.5">
                🗺️ Interactive Park Map
              </h3>
              <p className="font-sans text-xs text-slate-400">Click a pin over the isometric layout to inspect ride parameters, timers, and reviews!</p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-500 font-mono font-bold px-2 py-0.5 rounded leading-none">
              96% ACTIVE
            </span>
          </div>

          {/* Map canvas containing official maps image and overlay dots pins */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-rose-50" id="isometric-park-pins-canvas">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMbKXbzMK1vEsLa0T702a9RrWmXjLAW1TEJ0Pt5I8-0iPtbCKG38S2e_7vhkql59tpK24syHWdMbGN6kgHxgp-oYPVvGltfqUveiGwoQFwAPOn82klpaRGjoEkJto_0ZJ2T8Zzf3lncwxd8J7KQOdafmQMLqr_Us-WisNx2mwZxpkdzkEnXh5RYEjcxH2ZEvnlmucG4gvLeBLYk334ijabIX9udIk4VdcGdevKikM-2BmZp7h_fqay9bg5w-yCUDamMgXTYttG6vY" 
              alt="Puroland Isometric map Layout" 
              className="w-full h-auto object-cover select-none min-h-[280px]"
              referrerPolicy="no-referrer"
            />

            {/* Pins overlay map loops */}
            {PINS.map((pin) => {
              if (pin.id === 'house') {
                return (
                  <PinkCastle 
                    key={pin.id}
                    top={pin.top}
                    left={pin.left}
                    onClick={() => {
                      setActivePin(pin);
                      setShowCastleModal(true);
                      onAddPoint(30);
                    }}
                    onHoverStateChange={() => {}}
                  />
                );
              }
              const isActive = activePin?.id === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    setActivePin(pin);
                    onAddPoint(15);
                  }}
                  className={`absolute p-1.5 sm:p-2 bg-white rounded-full shadow-lg border-2 hover:border-pink-500 transition-all duration-150 transform hover:scale-110 active:scale-95 z-10 ${
                    isActive ? 'border-pink-500 scale-110 ring-4 ring-pink-100' : 'border-pink-200'
                  }`}
                  style={{ top: pin.top, left: pin.left }}
                  title={pin.name}
                >
                  <span className="text-sm sm:text-base flex items-center justify-center">{pin.icon}</span>
                </button>
              );
            })}
          </div>

          {/* Hello Kitty Pink Castle Custom Popup Modal */}
          <AnimatePresence>
            {showCastleModal && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/45 backdrop-blur-xs z-30 flex items-center justify-center p-4 rounded-3xl"
                id="castle-modal-overlay"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 15 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="bg-white/95 backdrop-blur-md border-4 border-pink-200 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-left"
                >
                  {/* Adorable Hello Kitty Bow decoration inside the top corner */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-pink-50 border border-pink-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                    <span className="text-xl select-none">🎀</span>
                  </div>

                  {/* Closing Button with scale jump */}
                  <button
                    onClick={() => setShowCastleModal(false)}
                    className="absolute top-3 right-3 w-7 h-7 bg-pink-50 hover:bg-pink-100 rounded-full flex items-center justify-center text-pink-500 font-bold transition-all duration-200 active:scale-90 shadow-sm border border-pink-100"
                    title="Close"
                  >
                    ✕
                  </button>

                  <div className="space-y-4 pt-3">
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-pink-500 font-mono">
                        👑 Hello Kitty Pink Castle
                      </span>
                      <h4 className="font-sans font-black text-sm text-slate-800 mt-0.5">
                        凯蒂猫粉色庆典城堡 🎀
                      </h4>
                    </div>

                    <p className="font-sans text-xs text-slate-600 leading-relaxed text-justify bg-pink-50/40 p-4 rounded-2xl border border-pink-100/50">
                      💖 这座宏伟的粉色城堡是三丽鸥彩虹乐园的梦幻中心！城堡内部装潢如同童话般耀眼，有着凯蒂猫专属的梦幻衣橱、会弹奏奇妙曲调的水晶三角钢琴，和铺满精美蕾丝沙发的贵宾下午茶沙龙。在这里，你不仅能在精美的旋转房间里探索各种隐藏的魔法彩蛋，更能获得与凯蒂猫本尊甜密合影的珍贵回忆！🏰✨
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-sans px-1 text-slate-500">
                      <span>⏱️ 探秘时长: 约15分钟</span>
                      <span className="text-pink-500 font-bold">🍓 推荐度: ★★★★★</span>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setShowCastleModal(false)}
                        className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-sans font-extrabold text-xs rounded-xl uppercase tracking-wider shadow-md active:scale-95 transition-all duration-200 text-center cursor-pointer"
                      >
                        带上魔法钥匙出发 💖
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive pinpoint result display descriptor */}
          {activePin ? (
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center sm:items-start text-left animate-fade-in shadow-inner">
              <div className="w-12 h-12 bg-white border border-slate-100 shadow rounded-full flex items-center justify-center text-2xl shrink-0">
                {activePin.icon}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-sans font-black text-sm text-slate-800">{activePin.name}</h4>
                  <span className="text-[10px] bg-pink-100 text-pink-500 font-mono font-bold px-1.5 py-0.5 rounded">
                    ⚡ Duration: {activePin.duration}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    activePin.crowdLevel === 'High' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
                  }`}>
                    👥 Crowd: {activePin.crowdLevel}
                  </span>
                </div>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  {activePin.description}
                </p>
                <div className="pt-1">
                  <button 
                    onClick={() => setActivePin(null)}
                    className="text-[10px] text-slate-400 hover:text-slate-600 font-mono font-bold uppercase"
                  >
                    Dismiss pin info
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 py-4 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs font-sans">
              📍 Click any ride pin above to explore Lady Kitty House, Wisdom Tree performance stage, or themed pastry bars!
            </div>
          )}
        </div>

        {/* SHOWS & PARADES SCHEDULE TIMETABLE CARD */}
        <div className="lg:col-span-4 bg-gradient-to-b from-stone-50 to-pink-50/10 border-2 border-pink-100 rounded-3xl p-6 text-left space-y-4 flex flex-col justify-between h-full" id="parade-schedules-card">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-pink-100">
              <h3 className="font-sans font-black text-xs uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                🎉 Shows &amp; Parades Today
              </h3>
              <span className="text-[10px] font-bold text-pink-500 bg-white border border-pink-100 px-2 py-0.5 rounded">WEEKEND ACTS</span>
            </div>

            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Plan your day! Puroland coordinates fantastic high-laser parades daily! Live timers countdown.
            </p>

            <div className="space-y-3.5">
              
              {/* Parade 1 */}
              <div className="bg-white border border-pink-100 rounded-xl p-3.5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-bold text-slate-800">1. Miracle Gift Parade 🎀</span>
                  <span className="text-[10px] font-mono font-bold bg-pink-50 text-pink-500 px-1.5 py-0.5 rounded">14:30 PM</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-pink-400" />
                  <span>Remaining: </span>
                  <strong className="text-pink-500 font-semibold">{timeLeft.parade}</strong>
                </div>
              </div>

              {/* Parade 2 */}
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-bold text-slate-800">2. Hello Kitty 3D Theatre 🎩</span>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">16:15 PM</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Remaining: </span>
                  <strong className="text-slate-600 font-semibold">{timeLeft.theatre}</strong>
                </div>
              </div>

              {/* Parade 3 */}
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-bold text-slate-800">3. Sparkling Light Walkway 🌟</span>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">18:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Remaining: </span>
                  <strong className="text-slate-600 font-semibold">{timeLeft.lights}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-pink-100/50 mt-6 md:mt-0 text-[10px] text-slate-400 text-center font-sans">
            Timers sync automatically. Check schedule boards for details.
          </div>
        </div>
      </section>

      {/* 3. TICKET BOOKING BUILDER */}
      <section className="bg-white border-2 border-slate-100 rounded-3xl p-6 sm:p-8 lg:p-10 text-left space-y-6 shadow-sm" id="ticket-builder-section">
        <div className="text-left border-b pb-3">
          <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-800 flex items-center gap-1.5">
            🎟️ Plan Your Visit &amp; Book Tickets
          </h2>
          <p className="font-sans text-xs text-slate-400">Buy your Tokyo Puroland entry passports in advance! Swipe your membership points to get digital pass codes.</p>
        </div>

        {bookingCompleted ? (
          // Printable digital entry passport
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-6 text-center animate-fade-in" id="ticket-booking-complete">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto space-y-3">
              <h3 className="font-sans font-black text-xl text-slate-800">Puroland Entry Passes Issued!</h3>
              <p className="font-sans text-xs text-slate-500">
                Congratulations! We issued your digital QR Codes. Present this screen at the Tama Center physical turnstile! <strong className="text-pink-600">+200 Strawberry Points awarded!</strong>
              </p>
            </div>

            {/* Simulated Printed Ticket */}
            <div className="bg-white rounded-2xl border-2 border-slate-200/50 shadow-lg text-left overflow-hidden max-w-sm mx-auto">
              {/* Ticket Top Ribbon */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 justify-between flex items-center">
                <div className="text-left">
                  <span className="block text-[8px] tracking-widest uppercase font-mono font-bold">PUROLAND PASSPORT</span>
                  <span className="font-sans font-black text-sm">Royal Entry Voucher</span>
                </div>
                <div className="font-sans text-right font-black text-lg">🎀</div>
              </div>

              {/* Ticket details */}
              <div className="p-5 space-y-4 text-xs font-sans text-slate-600">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[8px] font-mono text-slate-400 font-bold uppercase">Date of Visit</span>
                    <span className="font-bold text-slate-700">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono text-slate-400 font-bold uppercase">Booking Voucher Ref</span>
                    <span className="font-mono font-bold text-slate-700">{bookingRef}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono text-slate-400 font-bold uppercase">Quantity issued</span>
                    <span className="font-bold text-slate-700">{ticketsCount} Passports ({adults} Ad, {children} Ch, {seniors} Se)</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono text-slate-400 font-bold uppercase">Rides Tier tier</span>
                    <span className="font-bold text-pink-500 font-semibold">{chosenTier}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex justify-between items-center font-sans">
                  <div>
                    <span className="block text-[8px] font-mono text-slate-400 font-bold">Total charged points</span>
                    <span className="font-mono text-base font-black text-rose-500">¥{grandTotal.toLocaleString()}</span>
                  </div>
                  {/* Fake Barcode representation */}
                  <div className="flex flex-col items-end">
                    <div className="w-24 h-6 bg-slate-900 border-l-4 border-r border-white flex justify-between">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`h-full bg-white`} style={{ width: `${Math.random() * 4 + 1}px` }}></div>
                      ))}
                    </div>
                    <span className="text-[7px] font-mono text-slate-400 mt-1">SCAN AT TURNSTILE</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleResetBooking}
              className="py-2.5 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-sans font-bold text-xs rounded-xl uppercase transition cursor-pointer"
            >
              Order More Passes
            </button>
          </div>
        ) : (
          // ticket builder form
          <form onSubmit={handleBookSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Input counter panels */}
            <div className="md:col-span-7 space-y-4 text-left">
              
              <div className="grid grid-cols-3 gap-4">
                
                {/* Adults counter */}
                <div className="bg-slate-50 border p-3.5 rounded-2xl flex flex-col justify-between text-left h-24">
                  <span className="block text-[9px] uppercase font-mono font-bold text-slate-400">Adult (18+)</span>
                  <span className="block text-xs font-sans text-slate-500 font-bold">¥3,900</span>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => setAdults(Math.max(0, adults - 1))}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold text-slate-700">{adults}</span>
                    <button 
                      type="button" 
                      onClick={() => setAdults(adults + 1)}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children counter */}
                <div className="bg-slate-50 border p-3.5 rounded-2xl flex flex-col justify-between text-left h-24">
                  <span className="block text-[9px] uppercase font-mono font-bold text-slate-400">Child (3-17)</span>
                  <span className="block text-xs font-sans text-slate-500 font-bold">¥2,800</span>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold text-slate-700">{children}</span>
                    <button 
                      type="button" 
                      onClick={() => setChildren(children + 1)}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Senior counter */}
                <div className="bg-slate-50 border p-3.5 rounded-2xl flex flex-col justify-between text-left h-24">
                  <span className="block text-[9px] uppercase font-mono font-bold text-slate-400">Senior (65+)</span>
                  <span className="block text-xs font-sans text-slate-500 font-bold">¥2,200</span>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => setSeniors(Math.max(0, seniors - 1))}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold text-slate-700">{seniors}</span>
                    <button 
                      type="button" 
                      onClick={() => setSeniors(seniors + 1)}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Date pick picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="block text-[9px] uppercase font-mono font-bold text-slate-400">Preferred Visit Date</label>
                  <input 
                    type="date" 
                    required
                    min="2026-05-28"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-none focus:border-pink-400"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-[9px] uppercase font-mono font-bold text-slate-400">Sweets Rides Access Tier</label>
                  <select 
                    value={chosenTier}
                    onChange={(e: any) => setChosenTier(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 bg-white rounded-lg focus:outline-none focus:border-pink-400 font-sans"
                  >
                    <option value="Standard">Standard Entry Passport (No VIP)</option>
                    <option value="Royal Bow VIP">Royal Bow VIP Passes (+¥1,500/head)</option>
                  </select>
                </div>
              </div>

              {/* Informational checklist block */}
              <div className="bg-slate-50 border p-4 rounded-2xl text-xs text-slate-500 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-700">Important Advisory:</p>
                  <p className="leading-relaxed">
                    Vouchers can be deferred or swapped for another date free of charge up to 24 hours prior to visit. Children under 3 do not require entry passports and can walk in free of charge with parents.
                  </p>
                </div>
              </div>
            </div>

            {/* Side summary card */}
            <div className="md:col-span-5 bg-gradient-to-b from-stone-50 to-pink-50/20 border-2 border-pink-100 rounded-3xl p-6 text-left flex flex-col justify-between h-full">
              <div className="space-y-4">
                <span className="block font-sans font-black text-xs uppercase tracking-wide text-slate-700">Booking Summary</span>
                
                <div className="space-y-2 border-b border-pink-150 pb-4 text-xs font-sans text-slate-500">
                  <div className="flex justify-between">
                    <span>Adult Passes ({adults}x):</span>
                    <span className="font-mono">¥{(adults * priceAdult).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Child Passes ({children}x):</span>
                    <span className="font-mono">¥{(children * priceChild).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Senior Passes ({seniors}x):</span>
                    <span className="font-mono">¥{(seniors * priceSenior).toLocaleString()}</span>
                  </div>
                  {chosenTier === 'Royal Bow VIP' && ticketsCount > 0 && (
                    <div className="flex justify-between font-bold text-pink-500">
                      <span>Royal Bow Premium VIP:</span>
                      <span className="font-mono">+¥{(ticketsCount * vipPremium).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-emerald-600 border-t border-slate-100/60 pt-2 text-[11px]">
                    <span>Earn Strawberry Points:</span>
                    <span>+{Math.floor(grandTotal / 10) + 200} pts 🍓</span>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <span className="block text-[8px] font-mono font-bold uppercase text-slate-400">Total charge amount</span>
                  <span className="font-mono text-2xl font-black text-rose-500">¥{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  type="submit" 
                  disabled={ticketsCount <= 0 || !selectedDate}
                  className="w-full py-3 bg-pink-500 disabled:bg-slate-300 hover:bg-pink-600 font-sans font-extrabold text-xs text-white uppercase rounded-xl tracking-wider shadow-md disabled:shadow-none transition duration-150 cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  Confirm Entry Passports 🎀
                </button>
                {ticketsCount <= 0 && (
                  <p className="text-[9px] text-red-500 font-sans text-center mt-2 font-bold">
                    * Choose at least one passport quantity!
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
      </section>

      {/* 4. KAWAII DINING MENU SECTIONS */}
      <section className="space-y-6" id="kawaii-puro-dining">
        <div className="text-left">
          <h2 className="font-sans font-black text-2xl text-slate-800 tracking-tight flex items-center gap-1.5">
            🧁 Kawaii Dining Menus
          </h2>
          <p className="font-sans text-xs text-slate-400">Indulge in character themed pastries, dessert parfaits, and sweets served across park cafes!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Cinnamoroll Sky Soda', price: '¥850', tag: 'Limited special', desc: 'Sparkling blue curacao soda topped with soft whipped vanilla foam, micro blue sugar stars and a custom Cinnamoroll print wafer cookie.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOwpZ1tRtHE4ZwvU6g1WIvHf2X0qBRVN6aV6_k9e10CZCUyDY-A90nSg3ZQcxtiON17hurDxeqKELO4WXp3G810XwsC_Pa3zZMcgixU6J6tn_6DHCTP_7ELkGDy-Ina4In7zC9SWl0xEI-6zfdOz_WE-Bpf6kodYjfEf-_fylpAJvVpXwXY_sr5ZKblwh6lKjnnT7A8ZN8CKhwHfuoswWM0F_HZ4Oo6Mri_ZMu_VUaJFkr8r9LGcECEFv69uLPomyi058VlMSOYA8' },
            { name: 'Hello Kitty Royal Shortcake', price: '¥1,100', tag: 'Famous seller', desc: 'Tiered fluffy sponge cake layered with sweet strawberries and light whipped cream, showing a chocolate red bow badge.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwrwHfz2YMQsaMtjl0AzuJK8ZGgLg2SNtmDg2GIT_7Bax4Y6xsvqKGBBDR7JdiEpZibf6EmZuAzKeHaiIrGUGhNPHgonEXRz30Xcli0ipCI3Ag4Kk8rVJylwDU7a05IOItm0SW0HDfcmqeoZg-qKIBdbV3Xq8vC2_BXJZYjY6g2NyrDO9qz5cEaU9ZSSQ9spCngQE45qrCbokl5RDjYZPLVNxprXw3Rwlg6JOgVnKF0S4hPDMCn3L9hdTN2DwqtbvE0v87GjWDWDs' },
            { name: 'Pompompurin Custard Pudding', price: '¥950', tag: 'All ages choice', desc: 'Silky smooth caramel custard pudding styled directly looking like Pompompurin with cookies beret and caramel drip.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDApEAXtS1F4lEokaslEdeR6YSZfvmlyYEl0-dKbY8OauF6qBCqTsSk5lQjwf3vMvHi-_BqZC9Bwy9a5T2X1s_PCrrELRSZX1aKVnzRxn6hbdEmWRu7S7DNFMFb53bPbg6TrNKS-8X1g-279uscIE45DOZATmw8naYiWoM1U3oY8LgPj3Qi9xXdeieBSXrg7yqJeb1yJl7ul1Nqd7FrmX0Hlhi0xGXVjMFqKbEn2aJcF2eGne3HroDkRKZP7tpd3Gu8b4bb-cz4NJU' }
          ].map((item) => (
            <div 
              key={item.name} 
              className="bg-white border hover:border-pink-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow transition"
            >
              <div className="h-44 bg-pink-50 flex items-center justify-center p-4 relative overflow-hidden group">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full object-contain transform group-hover:scale-104 duration-305"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 text-[8px] bg-white text-pink-500 font-mono font-black border border-pink-100 px-1.5 py-0.5 rounded leading-none uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="p-5 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-800 leading-tight">{item.name}</h4>
                  <span className="font-mono text-xs font-black text-pink-500 font-bold">{item.price}</span>
                </div>
                <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
