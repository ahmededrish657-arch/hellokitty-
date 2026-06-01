/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Calendar, BookOpen, Star, HelpCircle, Heart, ArrowRight, Eye, UserPlus, Trophy, Award, Download, Share2, RotateCcw, Music, Coffee, Gift } from 'lucide-react';
import { CHARACTERS, NEWS_STORIES, LUCKY_READINGS, Character, NewsItem } from '../types';

interface HomeViewProps {
  onNavigate: (tabId: string) => void;
  onAddPoint: (amount: number) => void;
  onAddFavorite: (charId: string) => void;
  favorites: string[];
}

// ------------------ INTERACTIVE COMPANION TEST ZONE CONSTANTS & DATA ------------------
const QUIZ_QUESTIONS = {
  cafe: {
    title: "Dream Shibuya Café Test • 梦幻下午茶馆 ☕",
    titleSimple: "Dream Shibuya Café",
    question: "Which magical dessert or signature drink will you order first for your photo-shoot?",
    questionCn: "你会点哪款梦幻打卡饮品和甜点，拉满闺蜜圈的粉红甜度？",
    icon: "☕",
    newsId: "cafe-tokyo",
    options: [
      { key: "latte", text: "Strawberry Cream Lattice Rose Latte (草莓玫瑰拿铁) 🍓", icon: "🍓" },
      { key: "flat", text: "Cinnamon Fluffy Cloud Flat White (肉桂云朵咖啡) ☁️", icon: "☁️" },
      { key: "soda", text: "Pastel Princess Pink Bow Soda Sparkler (丝带梦幻苏打) 🥤", icon: "🥤" }
    ]
  },
  plush: {
    title: "Sweet Spring Fluffy Plush Test • 限量毛绒暖冬 🧸",
    titleSimple: "Spring Bloom Plush",
    question: "What touch of high-density velvet or plush represents your energy vibe today?",
    questionCn: "你觉得今天的心情配重最适合哪一种暖烘烘的毛绒材质？",
    icon: "🧸",
    newsId: "spring-plush",
    options: [
      { key: "silk", text: "Premium Pink Sakura Silk Lace (高定樱花粉蕾丝) 🌸", icon: "🌸" },
      { key: "wool", text: "Puff Pastel Cloud Marshmallow Fleece (棉花糖毛圈绒) ☁️", icon: "☁️" },
      { key: "velvet", text: "Mellifluous Starry Honey Gold Velvet (蜜糖星光丝绒) 🍯", icon: "🍯" }
    ]
  },
  parade: {
    title: "Miracle Gift Circus Parade Test • 乐园巡游巡礼 🌈",
    titleSimple: "Miracle Gift Parade",
    question: "Which stunning VIP stand is your ultimate dream spot to watch the miracle parade?",
    questionCn: "在乐园大巡游中，你最想在哪里看粉色 stardust 激光撒落？",
    icon: "🌈",
    newsId: "puroland-stars",
    options: [
      { key: "front", text: "Front-Row Candy Heart Sparkle Seat (前排星星糖果席) 🍭", icon: "🍭" },
      { key: "laser", text: "Right beneath the Rainbow Laser Stardust (彩虹激光极光雨) 🌈", icon: "🌈" },
      { key: "castle", text: "Grand Royal Castle VIP Sky Balcony (皇家城堡vip阳台) 🏰", icon: "🏰" }
    ]
  },
  birthday: {
    title: "Kitty Twin Birthday Tribute Test • 双胞胎生日会 🎁",
    titleSimple: "Birthday Bash",
    question: "What lovely handmade gift are you baking or crafting for the birthday banquet?",
    questionCn: "双胞胎盛典来临，你会为 Kitty 和 Mimmy 准备什么心意手作？",
    icon: "🎁",
    newsId: "birthday-bash",
    options: [
      { key: "ribbon", text: "Embroidered Double Silk Ribbon (手作双色重瓣丝带) 🎀", icon: "🎀" },
      { key: "pie", text: "Cinnamon-Infused Warm Lattice Apple Pie (刚出炉黄金苹果派) 🥧", icon: "🥧" },
      { key: "album", text: "Memory Blossom Origami Heart Photo Album (时光友谊手折折叠相册) 📸", icon: "📸" }
    ]
  }
};

const calculateResult = (answers: Record<string, string>) => {
  const ansCafe = answers.cafe || 'latte';
  const ansPlush = answers.plush || 'silk';
  const ansParade = answers.parade || 'front';
  const ansBirthday = answers.birthday || 'ribbon';

  let title = "Sweet Rainbow Ribbon Fairy";
  let titleCn = "甜美彩虹丝带仙女";
  let description = "You carry the pure, compassionate heart of Hello Kitty. Wherever you go, you spread friendship, warm smiles, and delicate pink vibes!";
  let descriptionCn = "你拥有哈罗キティ般纯真善良的内心。无论身在何处，你总能用丝带般的温柔连接他人，散播纯粹的爱与温馨！";
  let luckySymbol = "Red Bow Basket 🧺";
  let luckySymbolCn = "红丝带野餐手提篮 🧺";

  if (ansCafe === 'latte' && ansPlush === 'silk') {
    title = "Luxury Strawberry Blossom Princess";
    titleCn = "奢华尊宠•草莓樱粉公主";
    description = "A refined connoisseur of sweetness! You delight in velvet ribbons, gourmet macarons, and the luxurious touch of premium spring blossoms.";
    descriptionCn = "甜美下午茶与高定美学的奢华演绎者！你钟爱精致的蕾丝华服、温润的草莓拿铁以及春天满载柔亮樱粉的梦之圣殿。";
    luckySymbol = "Strawberry Gold Fork 🍓";
    luckySymbolCn = "草莓镶金下午茶甜品叉 🍓";
  } else if (ansCafe === 'flat' || ansPlush === 'wool') {
    title = "Cozy Cloud Marshmallow Guardian";
    titleCn = "冬日治愈•云朵棉花糖守护者";
    description = "You bring soft, fluffy comfort to everyone you meet. Just like My Melody, your caring words act like a warm quilt of cozy cinnamon tea.";
    descriptionCn = "你给身边的每个人带来轻盈蓬松的治愈力。就像温柔纯情的美乐蒂那样，你温暖的陪伴如同冬天最惬意的热奶茶。";
    luckySymbol = "Fluffy White Cloud Pillow ☁️";
    luckySymbolCn = "蓬松绵软天使云朵靠枕 ☁️";
  } else if (ansCafe === 'soda' || ansParade === 'laser') {
    title = "Stardust Rainbow Pop Dreamer";
    titleCn = "绚烂魔法•星辰彩虹气泡筑梦师";
    description = "Bubbling with spunky rebel vibes and magical neon lasers! You write romance diaries, dance to pop beats, and sparkle with bold creativity.";
    descriptionCn = "浑身洋溢着俏皮淘气的汽水活力与霓虹激光般的夺目光彩！你敢做梦、爱写闪亮手帐，在生活舞台上散发无限魔法火花。";
    luckySymbol = "Neon Holographic Diary 📓";
    luckySymbolCn = "极光星愿幻彩全息本 📓";
  }

  return { title, titleCn, description, descriptionCn, luckySymbol, luckySymbolCn };
};

export default function HomeView({ onNavigate, onAddPoint, onAddFavorite, favorites }: HomeViewProps) {
  // Modal for Spotlight character
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [sweetNote, setSweetNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);

  // Daily Luck reading
  const [luckIndex, setLuckIndex] = useState<number | null>(null);
  const [isLuckLoading, setIsLuckLoading] = useState(false);

  // States for the 4-grid interactive companion test zone
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string | null>(null);

  // Audio synthesize chime function
  const playCuteChime = (theme: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      let freqs = [523.25, 659.25, 783.99, 1046.50]; // C Major
      if (theme === 'cafe') freqs = [523.25, 659.25, 783.99, 1046.50];
      else if (theme === 'plush') freqs = [587.33, 739.99, 880.00, 1174.66]; // D Major
      else if (theme === 'parade') freqs = [659.25, 830.61, 987.77, 1318.51]; // E Major
      else if (theme === 'birthday') freqs = [698.46, 880.00, 1046.50, 1396.91]; // F Major
      else freqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]; // Complete scale

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.12, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.45);
      });
    } catch (e) {
      console.warn("Audio Context user-interaction restriction active. Interaction pending.", e);
    }
  };

  // Safe scrollTo with highlighted flash
  const scrollToNews = (newsId: string) => {
    const element = document.getElementById(`news-bento-card-${newsId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // add a temporary ring highlight
      element.classList.add('ring-4', 'ring-pink-300', 'ring-opacity-90', 'scale-[1.01]', 'duration-300');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-pink-300', 'ring-opacity-90', 'scale-[1.01]');
      }, 2500);
    }
  };

  // Canvas drawing card handler with rich decals and Vector Hello Kitty representation
  const handleGenerateShareImage = (currentAnswers: Record<string, string>) => {
    const result = calculateResult(currentAnswers);
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 840;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Fill beautiful pink soft gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, 840);
    grad.addColorStop(0, '#FFF5F6');
    grad.addColorStop(0.5, '#FFEBEF');
    grad.addColorStop(1, '#FFF2F4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 840);

    // 2. Draw lace border pattern
    ctx.strokeStyle = '#FFC0CB';
    ctx.lineWidth = 4;
    ctx.strokeRect(15, 15, 570, 810);

    ctx.strokeStyle = '#FFD700'; // Gold internal border
    ctx.lineWidth = 1.5;
    ctx.strokeRect(22, 22, 556, 796);

    // 3. Draw corner decorative hearts
    const corners = [
      { x: 35, y: 35 },
      { x: 565, y: 35 },
      { x: 35, y: 805 },
      { x: 565, y: 805 }
    ];
    ctx.fillStyle = '#FF5E7E';
    corners.forEach(c => {
      ctx.beginPath();
      // Draw simple heart
      ctx.arc(c.x - 4, c.y, 4, 0, Math.PI, true);
      ctx.arc(c.x + 4, c.y, 4, 0, Math.PI, true);
      ctx.lineTo(c.x, c.y + 10);
      ctx.closePath();
      ctx.fill();
    });

    // 4. Draw Ribbon Bow at top center
    ctx.fillStyle = '#FF5E7E';
    // left bow wing
    ctx.beginPath();
    ctx.ellipse(300 - 18, 55, 18, 12, -Math.PI/6, 0, Math.PI*2);
    ctx.fill();
    // right bow wing
    ctx.beginPath();
    ctx.ellipse(300 + 18, 55, 18, 12, Math.PI/6, 0, Math.PI*2);
    ctx.fill();
    // central knot
    ctx.beginPath();
    ctx.arc(300, 55, 8, 0, Math.PI*2);
    ctx.fill();
    // tails
    ctx.strokeStyle = '#FF5E7E';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(292, 60);
    ctx.lineTo(275, 80);
    ctx.moveTo(308, 60);
    ctx.lineTo(325, 80);
    ctx.stroke();

    // 5. Draw Header Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FF5E7E';
    ctx.font = '900 22px "Inter", sans-serif';
    ctx.fillText('专属 SWEET COMPANION CARD', 300, 122);
    
    ctx.fillStyle = '#8C7477';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('• SANRIO HELLO KITTY WORLD ORIGINAL •', 300, 145);

    // 6. Draw White Card Frame
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(255, 94, 126, 0.15)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;
    
    const drawRoundedRect = (cx: number, cy: number, cw: number, ch: number, cr: number) => {
      ctx.beginPath();
      ctx.moveTo(cx + cr, cy);
      ctx.lineTo(cx + cw - cr, cy);
      ctx.quadraticCurveTo(cx + cw, cy, cx + cw, cy + cr);
      ctx.lineTo(cx + cw, cy + ch - cr);
      ctx.quadraticCurveTo(cx + cw, cy + ch, cx + cw - cr, cy + ch);
      ctx.lineTo(cx + cr, cy + ch);
      ctx.quadraticCurveTo(cx, cy + ch, cx, cy + ch - cr);
      ctx.lineTo(cx, cy + cr);
      ctx.quadraticCurveTo(cx, cy, cx + cr, cy);
      ctx.closePath();
      ctx.fill();
    };

    drawRoundedRect(60, 172, 480, 275, 24);
    ctx.shadowColor = 'transparent';

    // 7. Draw vector Hello Kitty photo
    ctx.fillStyle = '#FFF2F4';
    drawRoundedRect(100, 209, 400, 190, 16);

    // Ears
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(250, 317);
    ctx.quadraticCurveTo(240, 267, 230, 257);
    ctx.quadraticCurveTo(250, 262, 275, 272);
    ctx.quadraticCurveTo(300, 257, 325, 272);
    ctx.quadraticCurveTo(350, 262, 370, 257);
    ctx.quadraticCurveTo(360, 267, 350, 317);
    ctx.closePath();
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(300, 322, 72, 0, Math.PI*2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.arc(272, 317, 6, 0, Math.PI*2);
    ctx.arc(328, 317, 6, 0, Math.PI*2);
    ctx.fill();

    // Yellow Nose
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(300, 331, 7, 5, 0, 0, Math.PI*2);
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(234, 322); ctx.lineTo(214, 320);
    ctx.moveTo(232, 332); ctx.lineTo(210, 335);
    ctx.moveTo(235, 312); ctx.lineTo(216, 306);
    ctx.moveTo(366, 322); ctx.lineTo(386, 320);
    ctx.moveTo(368, 332); ctx.lineTo(390, 335);
    ctx.moveTo(365, 312); ctx.lineTo(384, 306);
    ctx.stroke();

    // Ribbons Bow
    ctx.fillStyle = '#FF3B66';
    ctx.beginPath();
    ctx.ellipse(250 - 10, 264, 12, 8, -Math.PI/6, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(250 + 10, 264, 12, 8, Math.PI/6, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(250, 264, 6, 0, Math.PI*2);
    ctx.fill();

    // Sparkles
    ctx.fillStyle = '#FFC0CB';
    ctx.font = '16px "Inter"';
    ctx.fillText('✨', 140, 247);
    ctx.fillText('🌸', 450, 367);
    ctx.fillText('🧁', 150, 357);
    ctx.fillText('🎈', 440, 237);

    // 8. Result Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FF5E7E';
    ctx.font = '900 20px "Inter", sans-serif';
    ctx.fillText(result.titleCn, 300, 487);
    ctx.font = '900 14px "Inter", sans-serif';
    ctx.fillText(`(${result.title})`, 300, 512);

    // Text Wrap Helper
    ctx.fillStyle = '#6B5A5C';
    ctx.font = '500 13px "Inter", sans-serif';
    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const chars = text.split('');
      let line = '';
      let yy = y;
      for (let n = 0; n < chars.length; n++) {
        let testLine = line + chars[n];
        let testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, yy);
          line = chars[n];
          yy += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, yy);
      return yy;
    };

    const nextY = wrapText(result.descriptionCn, 300, 547, 420, 20);
    wrapText(result.description, 300, nextY + 24, 440, 17);

    // 9. Selections recap
    ctx.fillStyle = '#FFF5F6';
    drawRoundedRect(75, 705, 450, 95, 16);
    ctx.strokeStyle = '#FFE0E3';
    ctx.lineWidth = 1;
    ctx.strokeRect(75, 705, 450, 95);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FF8EAA';
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.fillText('💖 MY CUSTOM SELECTIONS:', 95, 727);

    ctx.fillStyle = '#554446';
    ctx.font = '500 11px "Inter", sans-serif';
    ctx.fillText(`☕ Café: ${QUIZ_QUESTIONS.cafe.options.find(o => o.key === currentAnswers.cafe)?.text || ''}`, 95, 747);
    ctx.fillText(`🧸 Plush: ${QUIZ_QUESTIONS.plush.options.find(o => o.key === currentAnswers.plush)?.text || ''}`, 95, 763);
    ctx.fillText(`🎉 Parade: ${QUIZ_QUESTIONS.parade.options.find(o => o.key === currentAnswers.parade)?.text || ''}`, 95, 779);

    setGeneratedImgUrl(canvas.toDataURL('image/png'));
  };

  // Spotlight characters (Hello Kitty, My Melody, Kuromi to display on Home screen spotlight)
  const spotlightChars = CHARACTERS.filter(c => ['hello-kitty', 'my-melody', 'kuromi'].includes(c.id));

  // Helper to render readable, un-flipped content inside the 3D spinning card faces
  const renderCardInner = (char: Character, isFav: boolean) => (
    <div className="flex flex-col h-full justify-between w-full select-none">
      <div className="relative bg-slate-50 rounded-xl p-4 overflow-hidden mb-4 min-h-[160px] flex items-center justify-center">
        {/* Ribbon backing */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100/30 rounded-full blur-xl -z-0"></div>
        
        <img 
          src={char.spotlightImage || char.image} 
          alt={char.name}
          onError={(e) => {
            e.currentTarget.src = char.image;
          }}
          className="w-32 h-auto object-contain transform group-hover:scale-105 duration-200 relative z-10"
          referrerPolicy="no-referrer"
        />

        {/* Quick favorite heart */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddFavorite(char.id);
            onAddPoint(10);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white border border-slate-100 text-slate-300 hover:text-pink-500 scale-90 z-20 cursor-pointer"
          title={isFav ? "Loved!" : "Like Her"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-pink-500 text-pink-500' : ''}`} />
        </button>
      </div>

      <div className="text-left space-y-2 flex-grow">
        <div className="flex items-center gap-2">
          <h3 className="font-sans font-black text-lg text-slate-800">{char.name}</h3>
          <span className="text-[10px] bg-pink-50 text-pink-500 font-mono font-bold px-1.5 py-0.5 rounded">
            {char.birthday}
          </span>
        </div>
        <p className="font-sans text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {char.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wide truncate max-w-[110px]">
          {char.favorite}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCharacter(char);
            onAddPoint(20);
          }}
          className="text-xs font-sans font-extrabold text-pink-500 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
          id={`meet-spotlight-${char.id}`}
        >
          Meet Her!
        </button>
      </div>
    </div>
  );

  const handlePullLuck = () => {
    setIsLuckLoading(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * LUCKY_READINGS.length);
      setLuckIndex(idx);
      setIsLuckLoading(false);
      onAddPoint(50); // reward points for checking luck
    }, 1200);
  };

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (sweetNote.trim() && selectedCharacter) {
      setNoteSent(true);
      onAddPoint(30); // points for sending cute messages
      setTimeout(() => {
        setNoteSent(false);
        setSweetNote('');
      }, 3000);
    }
  };

  return (
    <div className="space-y-16" id="home-view-canvas">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-rose-50 to-pink-100 rounded-3xl border-2 border-pink-100/50 p-8 sm:p-12 lg:p-16" id="hero-banner-section">
        
        {/* Abstract floating circles background for a polished depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-100/60 via-transparent to-transparent -z-10"></div>
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-pink-300/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-rose-300/10 rounded-full blur-3xl"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100/80 border border-pink-200 text-pink-600 font-sans font-bold text-xs rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Explore Hello Kitty World</span>
            </div>
            
            <h1 className="font-sans font-black tracking-tight text-slate-800 leading-[1.1] text-4xl sm:text-5xl lg:text-6xl">
              Where True <span className="text-pink-500">Friendship</span> <br />
              Becomes <span className="text-rose-400">Pure Magic!</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed">
              Step into the world's most whimsical terminal! Interact with Hello Kitty and her dearest companions, discover limited-edition collectibles, schedule your custom dream trip in Sanrio Puroland, and gather strawberry reward tokens!
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigate('shop')}
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-sans font-bold text-sm lg:text-base rounded-full shadow-lg shadow-pink-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                id="hero-shop-explore-btn"
              >
                🎀 Explore Boutique Shop
              </button>
              <button 
                onClick={() => onNavigate('puroland')}
                className="px-6 py-3 bg-white hover:bg-slate-50 border-2 border-pink-100 font-sans font-bold text-slate-700 text-sm lg:text-base rounded-full transition-all duration-200"
                id="hero-book-tickets-btn"
              >
                🎟️ Book Puroland Tickets
              </button>
            </div>

            {/* Micro Stats Banner Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-pink-100/55 max-w-md">
              <div className="text-left">
                <span className="block text-xl font-black text-slate-800 font-mono">100%</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sweet Kindness</span>
              </div>
              <div className="text-left">
                <span className="block text-xl font-black text-slate-800 font-mono">8+</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Meet Friends</span>
              </div>
              <div className="text-left">
                <span className="block text-xl font-black text-slate-800 font-mono">24/7</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Joyful Events</span>
              </div>
            </div>
          </div>

          {/* Hero Right Banner Image with real hover zoom */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Background glowing disk */}
            <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full scale-75 animate-pulse"></div>
            
            <div className="relative group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEGpp1VwWOVq0Pym_p--MHiQvbNqpCK2WlCX2HCQyXwDSG4ACReeIRoybteNV38a0lM3I5-PAJOKZJATmr7QAQ7NriU1MUL9VszIRCIAYdoOPfuhwtEz6tgMGx1a7Ao_PWmwjpE-oBtGRruB_0G1DglSsI0Gz26JkdwPfpSGuXFH4ZIUaCBIJOUmb2STPIQ89p4O7Is5EDZeY4zRdOsPQFka7l78h0Sb0SFvdi1fWTGcEbpJHVsfca4BUVTrj1qs6Kf5g6tEOWojQ" 
                alt="Hello Kitty 3D" 
                className="w-72 sm:w-80 h-auto object-contain drop-shadow-xl select-none animate-float group-hover:scale-105 transition-all duration-300"
                referrerPolicy="no-referrer"
                id="hero-3d-kitty-image"
              />
              
              {/* Cute Badge element */}
              <div className="absolute -bottom-2 -left-2 bg-gradient-to-tr from-pink-500 to-rose-400 text-white font-sans font-bold text-xs p-3 rounded-2xl shadow-lg border border-pink-300 rotate-12 group-hover:rotate-6 transition duration-200">
                <span className="block text-[8px] tracking-wide uppercase">SWEETEST ICON</span>
                <span>Original Hello Kitty 🎀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN GRID - spotlight grid WITH Luck Star Widget alongside */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="spotlight-and-luckbox-grid">
        
        {/* Spotlight area */}
        <section className="lg:col-span-8 space-y-6" id="char-spotlight-area">
          <div className="flex items-end justify-between">
            <div className="text-left">
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-800 tracking-tight flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-pink-500" />
                Character Spotlight
              </h2>
              <p className="font-sans text-xs text-slate-500">Pick a beloved character below to see active traits, stats, and send them letters!</p>
            </div>
            <button 
              onClick={() => onNavigate('characters')}
              className="text-pink-500 hover:text-pink-600 font-sans font-bold text-xs flex items-center gap-1 group shrink-0"
              id="view-all-guidebook-btn"
            >
              Full Guidebook <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlightChars.map((char) => {
              const isFav = favorites.includes(char.id);
              
              // Determine animation class based on ID to achieve staggered starting delay
              let animClass = 'animate-spin-3d-kitty';
              if (char.id === 'my-melody') {
                animClass = 'animate-spin-3d-melody';
              } else if (char.id === 'kuromi') {
                animClass = 'animate-spin-3d-kuromi';
              }

              return (
                <div 
                  key={char.id}
                  className="w-full h-[405px] relative perspective-1000"
                  id={`spotlight-card-${char.id}`}
                >
                  <div className={`w-full h-full transform-style-3d ${animClass}`}>
                    {/* Front Face of the 3D Card */}
                    <div className="absolute inset-0 w-full h-full bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-pink-200 hover:shadow-md hover:shadow-pink-100/50 transition-all duration-300 backface-hidden flex flex-col justify-between group">
                      {renderCardInner(char, isFav)}
                    </div>
                    {/* Back Face of the 3D Card (pre-flipped 180 degrees so it stays upright in space when turned) */}
                    <div className="absolute inset-0 w-full h-full bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-pink-200 hover:shadow-md hover:shadow-pink-100/50 transition-all duration-300 backface-hidden rotate-y-180 flex flex-col justify-between group" style={{ transform: 'rotateY(180deg)' }}>
                      {renderCardInner(char, isFav)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Lucky Star Side Widget */}
        <section className="lg:col-span-4 bg-gradient-to-b from-stone-50 to-pink-50/50 border-2 border-pink-100 rounded-3xl p-6 text-left flex flex-col justify-between" id="today-luckstar-sidebar">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl animate-spin text-pink-500">⭐️</span>
                <h3 className="font-sans font-black text-sm uppercase tracking-wide text-slate-700">今日甜份 / Lucky Star</h3>
              </div>
              <span className="text-[9px] bg-pink-500 text-white font-mono font-black font-semibold px-2 py-0.5 rounded">LIVE</span>
            </div>

            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Pull a fortune to inspect Hello Kitty's sweet status report of your day! Instantly reward your digital wallet with <strong className="text-pink-600">+50 points</strong>!
            </p>

            {luckIndex === null ? (
              <div className="bg-white border-2 border-dashed border-pink-200 rounded-2xl p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-pink-50 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-8 h-8 text-pink-400 fill-pink-100" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-700 text-xs text-center">Your Fortune is Waiting!</h4>
                  <p className="font-sans text-[10px] text-slate-400 text-center">Bake your sweet day checkup instantly</p>
                </div>
                <button
                  type="button"
                  onClick={handlePullLuck}
                  disabled={isLuckLoading}
                  className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 active:scale-98 text-white font-sans font-black text-xs rounded-xl shadow-md cursor-pointer transition uppercase"
                  id="pull-luck-trigger-btn"
                >
                  {isLuckLoading ? 'Whispering to Stars... ✨' : 'Pull Lucky Ribbons 🎀'}
                </button>
              </div>
            ) : (
              <div className="bg-white border-2 border-pink-200 rounded-2xl p-5 space-y-4 shadow-sm animate-fade-in">
                <div className="flex justify-between items-center bg-pink-50 rounded-xl p-2.5">
                  <span className="font-sans font-extrabold text-xs text-slate-600">Daily Sugar:</span>
                  <span className="font-mono text-xs font-black text-pink-500 bg-white px-2 py-0.5 rounded border border-pink-100">
                    {LUCKY_READINGS[luckIndex].rating}
                  </span>
                </div>
                
                <p className="font-sans text-xs text-slate-600 leading-relaxed italic">
                  "{LUCKY_READINGS[luckIndex].message}"
                </p>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setLuckIndex(null)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 font-sans font-bold text-[10px] rounded-lg transition uppercase"
                  >
                    Clear Luck
                  </button>
                  <button 
                    onClick={handlePullLuck}
                    className="w-full py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 font-sans font-bold text-[10px] rounded-lg transition uppercase"
                  >
                    Roll Again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-pink-100/50 mt-6 md:mt-0 flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>Powered by Ribbon Star</span>
            <span className="font-bold text-pink-400">Bonus points: Active</span>
          </div>
        </section>
      </div>

      {/* Ribbon Separator Banner */}
      <div 
        className="h-6 bg-repeat-x rounded-full opacity-90 shadow-sm"
        style={{ 
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPRI14XuduDt2ZGw1EHRx_Pci90CE67DY0dz5v7UDGKSu3U4qj9D_1frLWBkleSLf0Z1y02cKBQjKBoX8o4zVrRNSEV06ASLXGVvoAgyfQdlouWC0BQCya_-U5J_mmke2yziW_Z-VPPrbgxIFq0SN7qFEIoKf7cGWExyF8kU_C5OsaArWZ8M4FEvsx5TaEX22Kxa91dJtubHKS62AVmXr8Nc1UYi_lLVYApRCnDIBEkXkBgdVqcu4ClGzhHUhE9pHAr9CnhO6d8f0')`,
          backgroundSize: '120px auto'
        }}
      ></div>

      {/* 3. LATEST NEWS - Bento Grid */}
      <section className="space-y-6" id="latest-news-bento-section">
        <div className="text-left">
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-800 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-pink-500" />
            Latest News &amp; Bulletins
          </h2>
          <p className="font-sans text-xs text-slate-500">Stay update to date with sweet celebrations happening across our physical cafes and parks!</p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {NEWS_STORIES.map((item, idx) => {
            // Treat index 0 (cafe Shibuya) and index 2 (Puroland updates) as larger blocks
            const isLarge = idx === 0 || idx === 2;
            return (
              <div 
                key={item.id}
                className={`bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-pink-100 transition-all duration-300 md:col-span-6 flex flex-col`}
                id={`news-bento-card-${item.id}`}
              >
                <div className="relative overflow-hidden min-h-[200px] h-48 sm:h-56 bg-slate-100 group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform scale-100 duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-pink-500 shadow-sm border border-pink-100">
                    {item.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/60 text-white font-sans text-[10px] px-2.5 py-1 rounded-md font-medium">
                    {item.date}
                  </div>
                </div>

                <div className="p-6 text-left space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-pink-400 font-mono">
                      {item.category}
                    </span>
                    <h3 className="font-sans font-black text-lg text-slate-800 hover:text-pink-500 cursor-pointer transition leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button 
                      onClick={() => {
                        // Navigate corresponding pages based on news
                        if (item.category === 'Park Update') onNavigate('puroland');
                        else if (item.category === 'New Arrival') onNavigate('shop');
                        else onNavigate('club');
                        onAddPoint(15);
                      }}
                      className="text-xs font-sans font-bold text-slate-700 hover:text-pink-500 flex items-center gap-1 group"
                    >
                      Read full article <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3B: INTERACTIVE 4-GRID COMPANION TEST ZONE */}
      <section 
        className="bg-gradient-to-br from-rose-50/70 via-pink-50/50 to-white border-2 border-pink-100/70 rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        id="sweet-companion-test-zone"
      >
        {/* Dynamic Video Background */}
        <video 
          src="https://ik.imagekit.io/owyaqu7vl/d9ff18d898d9acf456463a1a8d533054.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          style={{ opacity: 0.8 }}
        />

        {/* Ribbon decoration background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/30 rounded-full blur-xl pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-100/30 rounded-full blur-xl pointer-events-none z-0"></div>

        {/* Section Heading */}
        <div className="text-left flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pink-100/50 pb-5 relative z-10">
          <div className="space-y-1">
            <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-800 tracking-tight flex items-center gap-2">
              <Award className="w-6 h-6 text-pink-500 animate-pulse" />
              <span>Sweet Interactive Quiz: My Exclusive Kitty Match!</span>
            </h2>
            <p className="font-sans text-xs text-slate-500">
              Complete the 4-grid challenge matching our Shibuya cafe, plush collections, parade showcases, and birthdays to generate your custom identity card!
            </p>
          </div>

          {/* Answer Progress Tracker */}
          <div className="bg-white/90 border border-pink-100 px-4 py-2 rounded-2xl flex items-center gap-3 shrink-0 self-start shadow-sm-pink">
            <div className="text-left">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">YOUR PROGRESS</div>
              <div className="text-xs font-black text-pink-500 font-mono">
                {Object.keys(quizAnswers).length} / 4 COMPLETED
              </div>
            </div>
            
            {/* Tiny progress dots */}
            <div className="flex gap-1">
              {['cafe', 'plush', 'parade', 'birthday'].map((theme) => (
                <div 
                  key={theme} 
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    quizAnswers[theme] 
                      ? 'bg-pink-500 scale-110 shadow-sm shadow-pink-300' 
                      : 'bg-pink-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {[
            { id: 'cafe', name: '梦幻咖啡馆', nameEn: 'Shibuya Café', emoji: '☕', bg: 'from-pink-50/50 to-rose-50/50', border: 'border-pink-200/60' },
            { id: 'plush', name: '限量周边', nameEn: 'Spring Plush', emoji: '🧸', bg: 'from-amber-50/50 to-orange-50/50', border: 'border-amber-200/60' },
            { id: 'parade', name: '乐园大巡游', nameEn: 'Miracle Parade', emoji: '🌈', bg: 'from-purple-50/50 to-pink-50/50', border: 'border-purple-200/60' },
            { id: 'birthday', name: '双胞胎生日会', nameEn: 'Birthday Bash', emoji: '🎂', bg: 'from-rose-50/50 to-red-50/50', border: 'border-rose-200/60' }
          ].map((item) => {
            const isCompleted = !!quizAnswers[item.id];
            const answerText = isCompleted 
              ? QUIZ_QUESTIONS[item.id as keyof typeof QUIZ_QUESTIONS].options.find(o => o.key === quizAnswers[item.id])?.text.split('(')[0].trim()
              : null;
            const answerIcon = isCompleted 
              ? QUIZ_QUESTIONS[item.id as keyof typeof QUIZ_QUESTIONS].options.find(o => o.key === quizAnswers[item.id])?.icon
              : null;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveQuiz(item.id);
                  playCuteChime(item.id);
                }}
                className={`relative w-full overflow-hidden rounded-3xl border-2 p-5 flex flex-col items-center justify-between z-10 transition-all duration-300 hover:-translate-y-1 bg-white hover:scale-[1.02] text-center ${
                  isCompleted 
                    ? 'border-emerald-200 shadow-sm hover:shadow-emerald-100 bg-emerald-50/10' 
                    : `${item.border} shadow-sm hover:shadow-md hover:shadow-pink-100/30`
                }`}
              >
                {/* Glow/halo layer inside card */}
                <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>

                <div className="space-y-3 flex-1 flex flex-col items-center justify-center relative z-10">
                  {/* Icon Circle Stand */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-inner transition-transform duration-300 ${
                    isCompleted ? 'bg-emerald-100' : 'bg-pink-100/50'
                  }`}>
                    {item.emoji}
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="font-sans font-black text-sm text-slate-800 tracking-tight">{item.name}</h3>
                    <p className="font-mono text-[10px] uppercase font-semibold text-slate-400">{item.nameEn}</p>
                  </div>
                </div>

                {/* Status bar */}
                <div className="mt-4 w-full pt-3 border-t border-slate-100/80 flex items-center justify-center relative z-10">
                  {isCompleted ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-sans">
                        已完成 <span className="text-pink-500">💖</span>
                      </span>
                      <span className="text-[9px] text-slate-400 max-w-[120px] truncate">
                        {answerIcon} {answerText}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] font-sans font-extrabold text-pink-500 hover:text-pink-600 flex items-center gap-0.5 animate-pulse">
                      Tap to Start 🎀
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Reset / Action triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 relative z-10">
          {Object.keys(quizAnswers).length === 4 ? (
            <div className="space-y-3 text-center w-full max-w-xl animate-bounce-short">
              <p className="text-xs text-slate-500 font-medium">✨ All 4 test challenges completed! Tap below to calculate your companion score and unlock your Hello Kitty identity! ✨</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const result = calculateResult(quizAnswers);
                    setShowResult(true);
                    playCuteChime('finish');
                    onAddPoint(100);
                  }}
                  className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-sans font-black text-sm rounded-full shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all duration-300 animate-pulse"
                >
                  🔮 Reveal My Companion Card (查看我的专属卡)
                </button>
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setShowResult(false);
                  }}
                  className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition"
                  title="Restart Quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 font-sans italic">
              Answer questions across all 4 theme sectors to unlock the grand Sanrio Reward!
            </p>
          )}
        </div>

        {/* RESULTS CARD PRESENTATION LAYER WHEN IN-PLACE */}
        {showResult && (
          <div className="mt-8 pt-8 border-t-2 border-pink-100/50 flex flex-col items-center space-y-6 animate-fade-in relative z-10" id="test-results-view">
            
            {/* Visual Identity Premium Box */}
            <div className="bg-white border-4 border-double border-pink-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-xl shadow-pink-100/60 relative overflow-hidden transition-all duration-500 hover:shadow-pink-200 max-h-none">
              
              {/* Premium Background elements */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-100/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-rose-100/20 rounded-full blur-2xl pointer-events-none"></div>

              {/* Lace border inside card */}
              <div className="absolute inset-2 border-2 border-pink-100/40 rounded-2xl pointer-events-none"></div>

              <div className="text-center space-y-6 relative z-10">
                
                {/* Bow accent on top */}
                <div className="flex justify-center text-4xl animate-bounce-short">🎀</div>

                {/* Header title */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-black text-pink-400 font-mono">SANRIO SWEET ID CARD</span>
                  <h3 className="font-sans font-extrabold text-2xl text-pink-500" id="result-title-chinese">
                    {calculateResult(quizAnswers).titleCn}
                  </h3>
                  <p className="font-mono text-xs text-slate-400 uppercase tracking-tight italic font-bold">
                    {calculateResult(quizAnswers).title}
                  </p>
                </div>

                {/* Large Hello Kitty Picture Container */}
                <div className="my-4 flex items-center justify-center">
                  <div className="relative p-2.5 bg-[#FFF0F2] rounded-3xl border-2 border-pink-100/70 shadow-sm max-w-[180px] group overflow-hidden">
                    <img 
                      src="https://cdn.phototourl.com/free/2026-05-30-8d002f52-ceb4-498f-a86b-739de9acfa09.jpg" 
                      alt="Hello Kitty Companion" 
                      className="w-full h-auto object-contain transform scale-100 group-hover:scale-105 duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 right-1 bg-pink-500 text-white rounded-full p-1 shadow-md">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                </div>

                {/* matched traits description */}
                <div className="bg-[#FFF5F6] border border-pink-100/50 rounded-2xl p-4 text-left space-y-3">
                  <div className="space-y-1">
                    <span className="block text-[10px] font-mono text-pink-400 font-extrabold uppercase tracking-wider">🌟 COMPANION MATCH SUMMARY</span>
                    <p className="font-sans text-xs text-slate-700 leading-relaxed font-semibold">
                      {calculateResult(quizAnswers).descriptionCn}
                    </p>
                    <p className="font-sans text-[11px] text-slate-500 leading-normal italic">
                      {calculateResult(quizAnswers).description}
                    </p>
                  </div>

                  <div className="border-t border-pink-100/50 pt-2.5 flex items-center justify-between text-xs font-sans">
                    <span className="font-mono text-[10px] font-extrabold text-slate-400">LUCKY EMBLEM • 幸运信物:</span>
                    <span className="font-sans font-extrabold text-pink-500">
                      {calculateResult(quizAnswers).luckySymbolCn}
                    </span>
                  </div>
                </div>

                {/* Theme Link-Back Buttons (底部跳转至对应资讯卡) */}
                <div className="space-y-2 text-left pt-2">
                  <span className="block text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest pl-1">
                    🔗 View details in our bulletins (查看对应主题详情):
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'cafe', label: '☕ Shibuya Café (涉谷咖啡)', newsId: 'cafe-tokyo' },
                      { id: 'plush', label: '🧸 Spring Plush (限量周边)', newsId: 'spring-plush' },
                      { id: 'parade', label: '🌈 Parade Act (乐园大巡演)', newsId: 'puroland-stars' },
                      { id: 'birthday', label: '🎁 Birthday Dine (双子生日会)', newsId: 'birthday-bash' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => scrollToNews(btn.newsId)}
                        className="p-2.5 border border-pink-100 hover:border-pink-300 text-slate-600 hover:text-pink-500 font-sans font-bold rounded-xl text-center transition bg-pink-50/10 hover:bg-pink-50/30 truncate"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer and Share option */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button 
                    onClick={() => {
                      setQuizAnswers({});
                      setShowResult(false);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 font-sans transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Re-test matching
                  </button>

                  <button
                    onClick={() => {
                      handleGenerateShareImage(quizAnswers);
                      setShowShareModal(true);
                      onAddPoint(50);
                    }}
                    className="px-6 py-2.5 bg-pink-400 hover:bg-pink-500 text-white font-sans font-black text-xs rounded-full shadow-md shadow-pink-100 hover:shadow-lg transition-all duration-200 flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share My Companion Card (分享我的专属卡)
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </section>

      {/* COMPANION SINGLE TEST OVERLAY MODAL */}
      {activeQuiz && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" 
          id="companion-quiz-modal"
        >
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-pink-200 max-w-md w-full overflow-hidden animate-zoom-in relative">
            
            {/* Header pattern */}
            <div className="p-6 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-100 border-b border-pink-100 text-left flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{QUIZ_QUESTIONS[activeQuiz as keyof typeof QUIZ_QUESTIONS].icon}</span>
                <div>
                  <h3 className="font-sans font-black text-base text-slate-800">
                    {QUIZ_QUESTIONS[activeQuiz as keyof typeof QUIZ_QUESTIONS].titleSimple} Quiz
                  </h3>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-pink-400 font-bold">
                    1-Question Quick Challenge
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setActiveQuiz(null)}
                className="p-1 px-2.5 text-slate-400 hover:text-slate-800 font-bold text-sm bg-white border border-slate-100 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="p-6 text-left space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-black text-pink-500 uppercase tracking-widest block">QUESTION / 问题:</span>
                <h4 className="font-sans font-bold text-slate-800 text-sm leading-relaxed">
                  {QUIZ_QUESTIONS[activeQuiz as keyof typeof QUIZ_QUESTIONS].questionCn}
                </h4>
                <p className="font-sans text-xs text-slate-500 italic">
                  {QUIZ_QUESTIONS[activeQuiz as keyof typeof QUIZ_QUESTIONS].question}
                </p>
              </div>

              {/* Options selection stack */}
              <div className="space-y-2.5">
                {QUIZ_QUESTIONS[activeQuiz as keyof typeof QUIZ_QUESTIONS].options.map((opt) => {
                  const isSelected = quizAnswers[activeQuiz] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => {
                        const updated = { ...quizAnswers, [activeQuiz]: opt.key };
                        setQuizAnswers(updated);
                        setActiveQuiz(null); // Close pop-up instantly
                        onAddPoint(20);
                        playCuteChime(activeQuiz);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${
                        isSelected 
                          ? 'border-pink-400 bg-pink-50/50' 
                          : 'border-slate-100 hover:border-pink-200 bg-slate-50/20 hover:bg-pink-50/10'
                      }`}
                    >
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-base shadow-sm border border-pink-100">
                        {opt.icon}
                      </span>
                      <span className="font-sans text-xs font-bold text-slate-700">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SHARE COMPANION EXCLUSIVE CARD OVERLAY MODAL */}
      {showShareModal && (
        <div 
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" 
          id="companion-share-modal"
        >
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-double border-pink-200 max-w-lg w-full overflow-hidden animate-zoom-in relative">
            
            <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 text-left border-b border-pink-100 flex items-center justify-between">
              <div>
                <h3 className="font-sans font-black text-lg text-slate-800 flex items-center gap-1.5">
                  <Share2 className="w-5 h-5 text-pink-500" />
                  Share My Exclusive Kitty
                </h3>
                <p className="text-[10px] text-slate-400">Right click or tap-and-hold to save your elegant Hello Kitty ID card!</p>
              </div>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 px-2.5 text-slate-400 hover:text-slate-800 font-bold text-sm bg-white border border-slate-100 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex flex-col items-center space-y-6">
              
              {generatedImgUrl ? (
                <div className="border border-pink-100 rounded-3xl overflow-hidden shadow-lg max-w-[280px]">
                  <img 
                    src={generatedImgUrl} 
                    alt="Generated Companion Identity Card" 
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div className="w-48 h-64 bg-slate-50 flex items-center justify-center rounded-2xl border border-dashed border-slate-200 animate-pulse text-slate-400 text-xs">
                  Decorating ribbons...
                </div>
              )}

              {/* Download trigger */}
              {generatedImgUrl && (
                <div className="flex flex-col items-center gap-3 w-full">
                  <a
                    href={generatedImgUrl}
                    download={`my-exclusive-kitty-id.png`}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl text-center shadow-md hover:opacity-95 transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" /> Save Passport Image to Device
                  </a>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-normal">
                    Designed at Hello Kitty World Boutique. Share on social platforms with tag <strong className="text-pink-400">#MyHelloKittyWorld</strong>! 🎀
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* 4. MEET DIALOG MODAL */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" id="character-meet-modal">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-pink-200 max-w-lg w-full overflow-hidden max-h-[90vh] overflow-y-auto animate-zoom-in">
            
            {/* Header frame color block spacing */}
            <div className={`p-6 text-left relative flex items-center justify-between overflow-hidden border-b-2 border-slate-100 ${selectedCharacter.bgColor}`}>
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-1 rounded-2xl bg-white border border-pink-100 shrink-0">
                  <img 
                    src={selectedCharacter.image} 
                    alt={selectedCharacter.name} 
                    className="w-12 h-12 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-sans font-black text-xl text-slate-800">{selectedCharacter.name}</h3>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                    {selectedCharacter.jpName || 'Sanrio Friend'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedCharacter(null);
                  setNoteSent(false);
                }}
                className="relative z-10 p-1 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-800 shadow"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 text-left space-y-6">
              
              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-3">
                  <span className="block text-[9px] font-mono text-slate-400 font-extrabold uppercase">Celebrated Birthday</span>
                  <span className="font-sans font-bold text-xs text-slate-700">{selectedCharacter.birthday}</span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <span className="block text-[9px] font-mono text-slate-400 font-extrabold uppercase">Joyful Personality</span>
                  <span className="font-sans font-bold text-xs text-slate-700">{selectedCharacter.personality}</span>
                </div>
                <div className="col-span-2 bg-slate-50 rounded-xl p-3">
                  <span className="block text-[9px] font-mono text-slate-400 font-extrabold uppercase">Absolute Favorite treats</span>
                  <span className="font-sans font-bold text-xs text-slate-700">{selectedCharacter.favorite}</span>
                </div>
              </div>

              {/* Status sliders */}
              <div className="space-y-3.5">
                <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-700 flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-pink-500" /> Friendship Stats
                </h4>
                <div className="space-y-2.5">
                  {[
                    { label: 'Sweetness', value: selectedCharacter.stats.sweetness, barColor: 'bg-[#FF5E7E]' },
                    { label: 'Kindness', value: selectedCharacter.stats.kindness, barColor: 'bg-emerald-400' },
                    { label: 'Mischief', value: selectedCharacter.stats.mischief, barColor: 'bg-[#9D6BFF]' },
                    { label: 'Patience & Calm', value: selectedCharacter.stats.patience, barColor: 'bg-[#4B9EFF]' },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1 text-left">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>{stat.label}</span>
                        <span className="font-mono">{stat.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.barColor} rounded-full`} style={{ width: `${stat.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write a sweet letter */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-700 flex items-center gap-1">
                  💌 Send her a sweet postcard
                </h4>
                {noteSent ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-4 rounded-xl text-center space-y-1 animate-fade-in">
                    <p className="font-bold font-sans">💕 Postcard Whisked Away!</p>
                    <p className="font-sans text-[11px] text-emerald-600">
                      Your sweet postcard has been sent to {selectedCharacter.name}! <strong className="text-pink-500">+30 Strawberry Points!</strong>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendNote} className="space-y-2">
                    <textarea 
                      placeholder={`Tell ${selectedCharacter.name} about your day or write something sweet... 🎀`}
                      required
                      value={sweetNote}
                      onChange={(e) => setSweetNote(e.target.value)}
                      className="w-full min-h-[70px] p-2.5 border border-slate-200 rounded-2xl text-xs font-sans focus:outline-none focus:border-pink-400 bg-white"
                    />
                    <button 
                      type="submit" 
                      className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-sans font-extrabold text-xs rounded-xl shadow-md transition uppercase"
                    >
                      Banish Letter with Ribbons
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
