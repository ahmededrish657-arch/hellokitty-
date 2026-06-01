/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChefHat, Cookie, Cake, Coffee, Sparkles, Flame, Check, RefreshCw, ArrowRight, Heart } from 'lucide-react';

interface BakeryViewProps {
  onAddPoint: (amount: number) => void;
  profileName: string;
}

// 1. Cupcake / Cake Decorator Options
const BASES = [
  { id: 'strawberry', name: 'Sweet Strawberry Velvet 🍓', desc: 'Fluffy pink chiffon infused with fresh organic field strawberries.' },
  { id: 'peach', name: 'Honey Peach Sponge 🍑', desc: 'A airy cloud base scented with Japanese white peaches.' },
  { id: 'mocha', name: 'Dark Cocoa Fudge 🍫', desc: 'Slightly dark, moist cocoa layers with velvet espresso crumbs.' },
  { id: 'matcha', name: 'Uji Matcha Chiffon 🍵', desc: 'Rich, bittersweet ceremonial green tea cake sponge.' },
];

const FROSTINGS = [
  { id: 'rose', name: 'Rose Petal Cream 🌸', color: 'bg-rose-100 border-rose-300', text: 'text-rose-600', desc: 'Delicate pastel pink cream whipped with organic rosewater.' },
  { id: 'sky', name: 'Cinnamoroll Dust Vanilla ☁️', color: 'bg-sky-50 border-sky-200', text: 'text-sky-600', desc: 'Sky-blue cotton-candy whipped vanilla bean cream.' },
  { id: 'dark', name: 'Kuromi Blackberry Swirl 😈', color: 'bg-purple-100 border-purple-300', text: 'text-purple-600', desc: 'Deep violet lavender and wild mountain blackberry frosting.' },
  { id: 'custard', name: 'Golden Honey Glaze 🍮', color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-600', desc: 'Warm vanilla custard swirl with rich honeycomb drizzle.' },
];

const TOPPINGS = [
  { id: 'ribbon', name: 'Signature Pink Ribbon 🎀', icon: '🎀' },
  { id: 'star', name: 'Golden Sparkle Stars ⭐', icon: '⭐' },
  { id: 'bear', name: 'Cottage Biscuit Teddy 🧸', icon: '🧸' },
  { id: 'cherry', name: 'Glazed Ruby Cherry 🍒', icon: '🍒' },
  { id: 'heart', name: 'Sprinkled Candy Hearts ❤️', icon: '❤️' },
];

// 2. Character Recipes Showcase
const RECIPES = [
  {
    id: 'kitty-pie',
    author: 'Hello Kitty',
    title: 'Red Ribbon Royal Apple Pie 🍎',
    difficulty: 'Easy-Peasy',
    time: '45 mins',
    desc: 'The legendary warm pie baked with sweet caramelized Fuji apples and flaky golden lattice crust ribbons.',
    ingredients: ['3 Sweet Fuji Apples', '1 package Pre-rolled Puff Pastry', '50g Salted Butter', '30g Brown Sugar', '1 tsp Cinnamon Powder', '1 tsp Pure Vanilla Extract'],
    steps: [
      'Core and thinly slice the Fuji apples, then toss in cinnamon, sugar, and natural vanilla.',
      'Sauté apples in butter over low heat until wonderfully tender, fragrant, and caramelized.',
      'Line a small buttery tin with pastry, scoop in apples, and apply the hand-crimped ribbon lattice.',
      'Bake at 180°C/355°F for 30 minutes until beautifully puffed and crispy golden!'
    ],
    secretTip: 'Serve warm alongside a scoop of premium vanilla bean ice cream & a tiny splash of salted honey!'
  },
  {
    id: 'melody-cupcake',
    author: 'My Melody',
    title: 'Pink Forest Berry Cupcake 🍓',
    difficulty: 'Sweet Friendly',
    time: '35 mins',
    desc: 'Light pink almond sponge cupcakes topped with swirl clouds of rose butter cream and tiny fresh strawberries.',
    ingredients: ['120g Cake Flour', '80g Unsalted Butter', '2 Eggs', '60ml Organic Almond Milk', '1 tsp Strawberry Jam', 'Fresh Forest Raspberries & Strawberries'],
    steps: [
      'Whisk soft butter and white sugar until light, creamy, and pale ivory in color.',
      'Stir in vanilla on low speed, then add eggs one by one to keep the batter nice and airy.',
      'Fold sifted cake flour alternately with the sweet almond milk, then swirl in the natural jam.',
      'Spoon evenly into pastel baking liners and bake for 18 minutes. Cool before adding frosting!'
    ],
    secretTip: 'Insert a tiny center core of strawberry coulis inside each cupcake before frosting for a luscious surprise bite!'
  },
  {
    id: 'purin-pudding',
    author: 'Pompompurin',
    title: 'Mellow Caramel Crème Pudding Cup 🍮',
    difficulty: 'Needs Care',
    time: '50 mins',
    desc: 'Incredibly silky-smooth royal pudding cups drenched in sticky sweet amber caramel syrup.',
    ingredients: ['3 Big Fresh Egg Yolks', '300ml Full Cream Milk', '50g Sugar (For pudding)', '45g Sugar (For dark caramel)', '2 tbsp Hot Spring Water'],
    steps: [
      'Melt caramel sugar with a tiny splash of water in a pan without stirring until dark amber. Add hot water carefully.',
      'Divide the rich caramel sauce into the bottom of four heatproof glass pudding cups and let cool.',
      'Gently heat your milk and dissolve sugar. Slow-temper with the whisked egg yolks so it does not scramble.',
      'Strain the mixture twice for perfect smooth texture, pour into cups, and steam gently under a damp kitchen towel.'
    ],
    secretTip: 'Refrigerate overnight for at least 6 hours so the sugary caramel bottom dissolves into a perfect glaze!'
  }
];

// 3. Interactive Tea-Party Companions Conversations
const TEA_PARTY_OPTIONS = [
  {
    companion: 'Hello Kitty',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL_rEl6eVj_gzqBafiChwyhnl2lvLqtDBGLkyC-7UaibTYlXV4hNIY7i6deZpgsbcQVLqb4RyHR5LOm_tQJldfRCL684o4S25y_XNkpvCpzy8EFKJUqR2r9wxpmxZzcQFpJT5Nm0AdDb4qVABMwENKED9AKA8PNrAH6PT8P5_Iqo8s57tV0wUub91mktN7UqwZUZDiAZaWYkAqnzW51Ls1Hpm8tpGewCHOirX3VlO1AGRjKInOq75hVYlt_wH55KMNGffPwBnDcfk',
    welcome: 'Hello there, sweet baker! Welcome to our Cozy Cottage Tea Room. I just baked a fresh tray of golden shortcakes! What kind of tea should we steep today?',
    choices: [
      { text: 'A elegant pot of English Earl Grey with warm milk ☕', reply: 'Oh, superb choice! Earl Grey’s citrusy bergamot pairs beautifully with the sweet butter in our scones. Let’s pour!' },
      { text: 'A sweet infusion of Strawberry Rooibos Herbal Tea 🍓', reply: 'Perfect! Pink and fruity is my absolute favorite! It’s caffeine-free, meaning we can sip and tell sweet stories all evening long!' },
      { text: 'Pure Uji Japanese Ceremonial Green Tea 🍵', reply: 'Splendid! Rich and grounding. My grandma says whisking matcha is like painting a gentle landscape on the water.' }
    ]
  },
  {
    companion: 'Cinnamoroll',
    avatar: 'https://cdn.phototourl.com/free/2026-06-01-f12f21f9-255a-4ca2-9c7b-303cef470765.jpg',
    welcome: 'Hello! I am floating on a fluffy cinnamon sugar cloud! Look, my big soft puppy ears are shaking with excitement! Which pastry shape looks cutest to you?',
    choices: [
      { text: 'Cinnamon rolls shaped like little swirly puppy clouds ☁️', reply: 'Ah! My favorite! When they bake, they puff up so round and soft, you can use them as tiny warm pillows before eating!' },
      { text: 'Perfect starry biscuits with edible glitter sugar 🌟', reply: 'Wow, sparkles! My friends in the night stars will look down and think we are hosting a starry banquet on the garden grass!' },
      { text: 'Fluffy strawberry jam tarts shaped like sweet kitten hearts ❤️', reply: 'How delightful! Hearts taste like soft hugs in every bite. Hello Kitty will be so happy when we slide them into her parcel!' }
    ]
  },
  {
    companion: 'Kuromi',
    avatar: 'https://cdn.phototourl.com/free/2026-06-01-fbd01a81-26e8-47ba-a64b-ab9f3d3ece35.jpg',
    welcome: 'Hey, smart cook! Who says everything has to be sugar-pink? I added a wicked sour cherry swirl and spiced gingerbread cookies to my platter. Care to try one?',
    choices: [
      { text: 'I love spicy gingerbread cookies with dark chocolate drops! 🖤', reply: 'Ha! Finally, someone with serious taste! Chocolate cocoa is the king of desserts. Here is a big star cookie for you!' },
      { text: 'Let me try the sweet sour cherry glaze. I like a tang! 🍒', reply: 'Ooh! That sour bite is the magical Kuromi special! It wakes up your tongue. You are a brave foodie, I respect that!' },
      { text: 'Could I have a plain chocolate chip cupcake, please? 🧁', reply: 'A classic fan! Easy and straightforward. Let me scoop a big spoonful of purple lavender frosting on it for you anyway! Haha!' }
    ]
  }
];

export default function BakeryView({ onAddPoint, profileName }: BakeryViewProps) {
  // 1. Interactive Bakery Decorator States
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([TOPPINGS[0].id]);
  const [cakeTitle, setCakeTitle] = useState('');
  const [ovenTemp, setOvenTemp] = useState('Medium Glow (180°C)');

  const [bakeStatus, setBakeStatus] = useState<'idle' | 'baking' | 'done'>('idle');
  const [bakingProgressSecs, setBakingProgressSecs] = useState(3);
  const [bakedCakeResult, setBakedCakeResult] = useState<any | null>(null);

  // 2. Recipe Expand State
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>('kitty-pie');

  // 3. Tea Party Conversational State
  const [activeHostIdx, setActiveHostIdx] = useState(0);
  const [chatFeedback, setChatFeedback] = useState<string | null>(null);

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings(prev => {
      if (prev.includes(toppingId)) {
        return prev.filter(t => t !== toppingId);
      } else {
        if (prev.length >= 3) {
          // Max 3 toppings
          return prev;
        }
        return [...prev, toppingId];
      }
    });
  };

  const handleStartBaking = () => {
    setBakeStatus('baking');
    setBakingProgressSecs(3);
    
    const interval = setInterval(() => {
      setBakingProgressSecs(p => {
        if (p <= 1) {
          clearInterval(interval);
          setBakeStatus('done');
          // Save the baked creation
          const newlyBaked = {
            title: cakeTitle.trim() || `${profileName}'s Sweet Masterpiece`,
            base: selectedBase,
            frosting: selectedFrosting,
            toppings: selectedToppings.map(id => TOPPINGS.find(t => t.id === id)).filter(Boolean),
            temp: ovenTemp,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setBakedCakeResult(newlyBaked);
          // Reward points
          onAddPoint(150);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
  };

  const resetBakeStudio = () => {
    setBakeStatus('idle');
    setBakedCakeResult(null);
    setCakeTitle('');
  };

  const currentHost = TEA_PARTY_OPTIONS[activeHostIdx];

  return (
    <div className="space-y-12 text-slate-800 animate-fade-in" id="bakery-page-canvas">
      
      {/* SECTION 1: HEADER HERO COVER BANNER */}
      <section className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 sm:p-12 text-left text-white shadow-md animate-fade-in" id="bakery-hero">
        <video 
          src="https://ik.imagekit.io/owyaqu7vl/e2588e83cb4909b54cd4838ab876cb56.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 animate-video-cook-loop"
          style={{ opacity: 0.9 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:10px_10px] opacity-10 pointer-events-none z-0"></div>
        <div className="space-y-4 max-w-xl relative h-full z-10">
          <span className="inline-flex items-center gap-1 bg-white/20 text-white font-sans font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/25">
            <ChefHat className="w-3.5 h-3.5 text-yellow-200 animate-bounce" />
            <span>Grand Opening Cafe</span>
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-5xl leading-tight drop-shadow-sm">
            Sweet Treats Cooking Studio 🧁
          </h1>
          <p className="font-sans text-xs sm:text-sm text-pink-50 leading-relaxed max-w-md">
            Learn secret recipes, experiment over virtual ovens, and decorate luxurious baked cupcakes! Complete interactive baking trials to earn instant points to spent in our digital wallpapers store!
          </p>
        </div>
      </section>

      {/* SECTION 2: THE 3D-FEEL BAKE STUDIO BUILDER */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="baking-adventure-grid">
        
        {/* INTERACTIVE OVEN PANEL & DECORATOR SETTINGS */}
        <div className="lg:col-span-7 bg-white border-2 border-amber-100 rounded-3xl p-6 sm:p-8 text-left space-y-6 shadow-sm flex flex-col justify-between" id="bakery-studio-config">
          
          <div className="space-y-2 border-b pb-3">
            <h3 className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
              🍰 1. Customize Sweet Creation
            </h3>
            <p className="font-sans text-xs text-slate-400">Select premium bases, whipped frostings, and crown with delicious cute ribbons.</p>
          </div>

          <div className="space-y-5">
            {/* 1. Base Select */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-mono font-bold text-amber-500 tracking-wider">Select Sponge Base Cake Flavor</label>
              <div className="grid grid-cols-2 gap-2.5">
                {BASES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBase(b)}
                    className={`p-3 text-left border rounded-xl transition duration-200 relative group ${
                      selectedBase.id === b.id 
                        ? 'border-pink-500 bg-pink-50/40 shadow-sm' 
                        : 'border-slate-100 hover:border-pink-200 bg-white'
                    }`}
                  >
                    <span className="block font-sans font-black text-xs text-slate-700">{b.name}</span>
                    <span className="block font-sans text-[10px] text-slate-400 leading-tight mt-0.5">{b.desc}</span>
                    {selectedBase.id === b.id && (
                      <div className="absolute right-2.5 top-2.5 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Frosting Type Selector */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-mono font-bold text-pink-500 tracking-wider">Whipped Cream Frosting Swirl</label>
              <div className="grid grid-cols-2 gap-2.5">
                {FROSTINGS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFrosting(f)}
                    className={`p-3 text-left border rounded-xl transition duration-200 relative ${
                      selectedFrosting.id === f.id 
                        ? 'border-pink-500 bg-pink-50/40 shadow-sm' 
                        : 'border-slate-100 hover:border-pink-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-full ${f.color} border`}></div>
                      <span className={`font-sans font-black text-xs ${f.text}`}>{f.name}</span>
                    </div>
                    <span className="block font-sans text-[10px] text-slate-400 leading-tight mt-1">{f.desc}</span>
                    {selectedFrosting.id === f.id && (
                      <div className="absolute right-2.5 top-2.5 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Tiny Toppings (Pick up to 3) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold tracking-wider">
                <span className="text-purple-500">Pick Cupcake Toppings (Max 3)</span>
                <span className="text-slate-400 font-mono">{selectedToppings.length}/3 Selected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TOPPINGS.map((t) => {
                  const isChecked = selectedToppings.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggleTopping(t.id)}
                      className={`px-3 py-2 text-xs font-sans font-bold border rounded-xl flex items-center gap-1.5 transition active:scale-95 ${
                        isChecked 
                          ? 'border-purple-300 bg-purple-50/30 text-purple-700 font-extrabold' 
                          : 'border-slate-100 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="text-sm">{t.icon}</span>
                      <span>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Oven Controls Grid */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">Heat Temperature</label>
                <select
                  value={ovenTemp}
                  onChange={(e) => setOvenTemp(e.target.value)}
                  className="w-full text-xs font-sans bg-white border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-amber-400"
                >
                  <option value="Soft Fluffy Warmth (160°C)">Soft Warmth (160°C)</option>
                  <option value="Medium Glow (180°C)">Medium Glow (180°C)</option>
                  <option value="Golden Crispy Crust (200°C)">Golden Crust (200°C)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">Name your baked food</label>
                <input
                  type="text"
                  placeholder="e.g. My Pink Princess Scone"
                  value={cakeTitle}
                  onChange={(e) => setCakeTitle(e.target.value)}
                  className="w-full text-xs font-sans bg-white border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center bg-transparent mt-4">
            <span className="text-[10px] text-slate-400 leading-normal max-w-xs block font-sans">
              *Completing a baking routine registers your masterfully crafted recipe to our community guest book and awards you <strong className="text-rose-500 font-black">+150 Points!</strong>
            </span>
            
            {bakeStatus === 'idle' && (
              <button
                type="button"
                onClick={handleStartBaking}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 font-sans font-black text-xs text-white uppercase rounded-xl shadow-md cursor-pointer transition flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-yellow-300 animate-pulse" /> Bake Cake!
              </button>
            )}

            {bakeStatus === 'baking' && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-amber-800 font-mono text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>Preheating Oven... {bakingProgressSecs}s</span>
              </div>
            )}

            {bakeStatus === 'done' && (
              <button
                type="button"
                onClick={resetBakeStudio}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-mono text-xs font-bold uppercase rounded-lg transition"
              >
                Start Over
              </button>
            )}
          </div>

        </div>

        {/* PHYSICAL 3D CANVAS STAND WITH CAKE RESULT PREVIEW */}
        <div className="lg:col-span-5 bg-gradient-to-b from-rose-50 to-amber-50/40 border-2 border-pink-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center relative overflow-hidden" id="bakery-preview-canvas">
          <video 
            src="https://ik.imagekit.io/owyaqu7vl/022e5d491cdd3e2856256aadd488e41f.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{ opacity: 0.8 }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent z-0 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between w-full">
            <div className="flex justify-between items-center w-full border-b pb-3 border-pink-100">
              <span className="text-[10px] font-mono text-pink-400 font-black tracking-widest uppercase">Live Scone Display</span>
              <span className="p-1 font-mono text-[9px] bg-white text-pink-500 border border-pink-100 rounded tracking-wider">ACADEMY KITCHEN</span>
            </div>

            <div className="my-auto py-8 flex flex-col items-center justify-center space-y-5">
              {bakeStatus === 'idle' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-pink-100/50 rounded-full blur-xl scale-75 animate-pulse"></div>
                    <ChefHat className="w-20 h-20 text-pink-300 drop-shadow animate-bounce" />
                    <div className="absolute top-1/2 -translate-y-1/2 text-2xl animate-spin w-full h-full border border-dashed border-pink-200 rounded-full scale-105" style={{ animationDuration: '30s' }}></div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans font-black text-slate-800 text-sm">Select options to design!</h4>
                    <p className="font-sans text-xs text-slate-400 max-w-xs mx-auto">Configure your dough, icing, and sweet decorations on the left to fire up our custom digital ovens!</p>
                  </div>
                </div>
              )}

              {bakeStatus === 'baking' && (
                <div className="space-y-5 text-center py-6 animate-pulse">
                  <div className="relative w-36 h-36 bg-amber-400/20 rounded-full border-4 border-dashed border-amber-400 animate-spin flex items-center justify-center mx-auto" style={{ animationDuration: '10s' }}>
                    <span className="text-4xl animate-bounce">🔥</span>
                  </div>
                  <div className="space-y-1.5 text-center">
                    <span className="block font-mono text-xs font-black text-amber-600">PREPARATION IN PROGRESS</span>
                    <p className="text-slate-500 text-xs italic">"Mixing flour, cream, berries, and sprinkles..."</p>
                  </div>
                </div>
              )}

              {bakeStatus === 'done' && bakedCakeResult && (
                <div className="relative space-y-4 w-full animate-zoom-in" id="finished-cake-card">
                  
                  {/* Visual Cake Assemblage Illustration representation */}
                  <div className="w-52 h-52 mx-auto relative rounded-3xl bg-white border-2 border-pink-150 p-4 shadow-md overflow-hidden flex flex-col justify-center items-center">
                    {/* Floating decorative elements */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_pink_1px,_transparent_1px)] bg-[size:16px_16px] opacity-10"></div>
                    
                    {/* Decorative Stars */}
                    <div className="absolute top-3 left-4 text-xs animate-pulse text-yellow-400">✨</div>
                    <div className="absolute bottom-3 right-4 text-xs text-yellow-400">✨</div>
                    
                    {/* 1. TOPPING LEVEL LAYER */}
                    <div className="z-30 text-3xl mb-1 flex gap-1 transform hover:scale-110 duration-200">
                      {bakedCakeResult.toppings.map((t: any) => (
                        <span key={t.id} title={t.name}>{t.icon}</span>
                      ))}
                      {bakedCakeResult.toppings.length === 0 && <span className="opacity-0">🎀</span>}
                    </div>

                    {/* 2. FROSTING LEVEL LAYER */}
                    <div className="z-20 w-32 h-14 bg-rose-200 rounded-full relative shadow-sm border border-pink-300 flex items-center justify-center text-xs font-bold text-rose-800 -mb-2 overflow-hidden">
                      <div className="absolute inset-x-0 bottom-0 h-4 bg-rose-350 opacity-20"></div>
                      <span className="font-sans px-2 text-center text-[10px] leading-tight font-black">{bakedCakeResult.frosting.name}</span>
                    </div>

                    {/* 3. BASE LEVEL LAYER */}
                    <div className="z-10 w-40 h-16 bg-amber-100 rounded-tr-2xl rounded-tl-2xl rounded-br-lg rounded-bl-lg border-t border-t-amber-200 relative shadow flex items-center justify-center text-amber-900 border-2 border-amber-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-200/50 to-transparent"></div>
                      <span className="font-sans text-[10px] leading-tight text-center font-black drop-shadow-sm px-1.5">{bakedCakeResult.base.name}</span>
                    </div>

                    {/* 4. TRAY LEVEL COVER */}
                    <div className="w-44 h-2.5 bg-slate-100 border border-slate-250 rounded-full shadow-sm -mt-0.5 z-0"></div>
                  </div>

                  {/* Baked Stats */}
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold uppercase px-2 py-0.5 rounded tracking-widest inline-block animate-pulse">
                       Bake Success! +150 Points 🍓
                    </span>
                    <h4 className="font-sans font-black text-slate-800 text-base">{bakedCakeResult.title}</h4>
                    <p className="font-sans text-xs text-slate-500">Baked perfectly under <strong className="text-amber-500">{bakedCakeResult.temp}</strong>.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-pink-100/50 flex justify-between items-center text-[10px] text-slate-400">
              <span>Decorations used: <strong>{selectedToppings.length} pieces</strong></span>
              {bakeStatus === 'done' && (
                <button
                  type="button"
                  onClick={() => {
                    alert(`Recipe "${bakedCakeResult?.title || 'Scone'}" shared in high fidelity to your virtual companion book! 🎀`);
                  }}
                  className="font-bold uppercase text-pink-400 hover:text-pink-600 underline"
                >
                  Share Card Recipe
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: EXPANDABLE CHARACTER SIGNATURE RECIPES */}
      <section className="space-y-6" id="sanrio-recipes-book">
        <div className="text-left border-b pb-3 border-slate-100 flex justify-between items-end">
          <div>
            <h2 className="font-sans font-black text-2xl text-slate-800 flex items-center gap-2">
              📖 Exclusive Home Signature Recipes
            </h2>
            <p className="font-sans text-xs text-slate-500">Recreate lovely themed treats in your own physical home! Expand each recipe card for details.</p>
          </div>
          <span className="text-rose-400 font-bold font-mono text-[11px] uppercase tracking-wide hidden sm:block">3 RECIPES SECURED 🍒</span>
        </div>

        <div className="space-y-4">
          {RECIPES.map((recipe) => {
            const isExpanded = expandedRecipe === recipe.id;
            return (
              <div 
                key={recipe.id}
                className={`bg-white border rounded-2xl transition duration-300 overflow-hidden ${
                  isExpanded ? 'border-pink-300 shadow-md ring-2 ring-pink-50' : 'border-slate-100 hover:border-pink-100 hover:shadow-sm'
                }`}
                id={`recipe-card-frame-${recipe.id}`}
              >
                {/* Header overview clickable bar */}
                <button
                  type="button"
                  onClick={() => setExpandedRecipe(isExpanded ? null : recipe.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    {/* Circle representing the character's face / recipe brand */}
                    <div className="w-12 h-12 bg-pink-50 hover:scale-105 duration-200 border border-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                      {recipe.id === 'kitty-pie' ? '🍎' : recipe.id === 'melody-cupcake' ? '🍼' : '🍮'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-black uppercase text-pink-500 tracking-wider">
                          By {recipe.author}
                        </span>
                        <span>•</span>
                        <span className="font-sans text-[11px] font-semibold text-slate-400">
                          {recipe.time} bake
                        </span>
                        <span>•</span>
                        <span className="bg-amber-50 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-100 uppercase">
                          {recipe.difficulty}
                        </span>
                      </div>
                      <h3 className="font-sans font-black text-sm sm:text-base text-slate-850">{recipe.title}</h3>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-xs text-pink-500 hover:underline">
                    {isExpanded ? 'Collapse' : 'Expand Details'}
                  </span>
                </button>

                {/* Collapsible detail panel body */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-50 space-y-6 text-left animate-fade-in bg-slate-50/40">
                    <p className="font-sans text-xs text-slate-600 leading-relaxed italic border-l-2 border-pink-400 pl-3">
                      "{recipe.desc}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Left: Ingredients checklist panel */}
                      <div className="md:col-span-5 bg-white border border-slate-100 rounded-2xl p-4 space-y-3">
                        <span className="block font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest">Ingredients List</span>
                        <ul className="space-y-2">
                          {recipe.ingredients.map((ing, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                              <span className="w-4 h-4 rounded-full bg-pink-100/60 border border-pink-200 text-pink-500 text-[9px] font-bold flex items-center justify-center">✓</span>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Step-by-step guidance instructions */}
                      <div className="md:col-span-7 space-y-3">
                        <span className="block font-mono text-[9px] font-black text-slate-400 uppercase tracking-widest">Baking Sequence Steps</span>
                        <ol className="space-y-3.5">
                          {recipe.steps.map((step, idx) => (
                            <li key={idx} className="flex gap-3 text-xs leading-relaxed text-slate-600">
                              <span className="font-mono font-black text-pink-500 bg-pink-50 border border-pink-100 h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                    </div>

                    {/* Baker's Secret Note alert section */}
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                      <span className="text-xl">👩‍🍳</span>
                      <div className="space-y-0.5 text-left">
                        <strong className="block font-sans text-xs text-amber-800">Chef Helper Tip &amp; Secret Trick:</strong>
                        <p className="font-sans text-xs text-slate-600 leading-normal">{recipe.secretTip}</p>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: SWEET TEA PARTY HOST CONVERSATIONS */}
      <section className="bg-gradient-to-r from-red-50/50 via-rose-50/20 to-pink-50/60 border border-pink-100 rounded-3xl p-6 sm:p-8 space-y-6" id="tea-party-host-conversations">
        
        <div className="text-left border-b pb-3 border-pink-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 className="font-sans font-black text-xl text-slate-800 flex items-center gap-2">
              ☕ Cozy Tea Party Chat Room
            </h2>
            <p className="font-sans text-xs text-slate-500">Pick an companion host sitting at our tea table to chat with!</p>
          </div>

          {/* Active host avatars menu */}
          <div className="flex gap-2 shrink-0">
            {TEA_PARTY_OPTIONS.map((host, idx) => {
              const active = idx === activeHostIdx;
              return (
                <button
                  key={host.companion}
                  onClick={() => {
                    setActiveHostIdx(idx);
                    setChatFeedback(null);
                  }}
                  className={`relative p-0.5 rounded-full border-2 transition duration-200 ${
                    active ? 'border-pink-500 scale-105' : 'border-slate-100 opacity-60 hover:opacity-90'
                  }`}
                  title={`Chat with ${host.companion}`}
                >
                  <img src={host.avatar} alt={host.companion} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation View Frame */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white border border-pink-100 rounded-2xl p-5" id="active-tea-convo">
          
          {/* Host Avatar Balloon */}
          <div className="md:col-span-3 text-center flex flex-col items-center space-y-2 lg:border-r border-slate-50 pr-2">
            <img 
              src={currentHost.avatar} 
              alt={currentHost.companion} 
              className="w-16 h-16 rounded-full object-cover border-2 border-pink-400 shadow-sm animate-float"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block font-sans font-black text-xs text-slate-700">{currentHost.companion}</span>
              <span className="block font-mono text-[9px] text-pink-400 font-bold uppercase tracking-wide">Tea Salon Guest</span>
            </div>
          </div>

          {/* Host Prompt & Options */}
          <div className="md:col-span-9 space-y-4 text-left">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-150 relative">
              <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-2 h-2 bg-slate-50 rotate-45 border-l border-b border-slate-150 hidden md:block"></div>
              <p className="font-sans text-xs leading-relaxed text-slate-700">
                {currentHost.welcome}
              </p>
            </div>

            {chatFeedback ? (
              <div className="bg-pink-50 border border-pink-150 rounded-2xl p-4 space-y-3 animate-fade-in">
                <p className="font-sans text-xs text-pink-900 leading-relaxed font-semibold">
                  🌸 {chatFeedback}
                </p>
                <div className="flex justify-between items-center pt-1.5 border-t border-pink-100/50">
                  <span className="text-[10px] text-slate-400 italic font-sans">You gained sweet companion trust (+10 Loyalty)</span>
                  <button
                    onClick={() => {
                      setChatFeedback(null);
                      onAddPoint(5); // tiny point boost
                    }}
                    className="font-mono text-[9px] font-black uppercase text-pink-600 hover:underline"
                  >
                    Reply Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="block text-[8px] uppercase tracking-wider font-mono font-bold text-slate-400">Select Conversation Answer Prompt:</span>
                <div className="space-y-2">
                  {currentHost.choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => setChatFeedback(choice.reply)}
                      className="w-full text-left p-3 border border-slate-100 hover:border-pink-300 hover:bg-pink-50/20 rounded-xl text-xs font-medium text-slate-600 transition"
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </section>

    </div>
  );
}
