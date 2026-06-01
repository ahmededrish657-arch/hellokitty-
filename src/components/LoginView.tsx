import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LoginViewProps {
  onLogin: (nickname: string) => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Smooth transition simulation
    setTimeout(() => {
      onLogin(nickname.trim() || 'Sweet Friend');
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="min-h-screen w-full bg-linear-to-b from-[#FFF0F2] via-[#FFF5F6] to-[#FFE3E8] flex items-center justify-center p-4 relative overflow-hidden" 
      id="login-viewport-container"
    >
      {/* 1. Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none opacity-85"
      >
        <source src="https://ik.imagekit.io/owyaqu7vl/5772fb95d39c45d546c353867826fe40.mp4" type="video/mp4" />
      </video>

      {/* 2. Soft pastel glass overlay for legibility & cute blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-transparent to-rose-100/30 backdrop-blur-xs z-1 pointer-events-none select-none" />

      {/* Decorative Floating Elements (Sakura & Sparkles in Background) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-2">
        {/* Soft Pink Clouds */}
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-pink-100/35 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-rose-100/40 blur-3xl" />
        <div className="absolute -bottom-16 left-1/4 w-96 h-96 rounded-full bg-pink-200/25 blur-3xl" />

        {/* Floating stickers / symbols */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-12 left-[12%] text-3xl opacity-75"
        >
          🎈
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="absolute bottom-16 left-[8%] text-3xl opacity-75"
        >
          🍓
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] text-4xl opacity-70"
        >
          🌸
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
          className="absolute bottom-20 right-[10%] text-3xl opacity-70"
        >
          ✨
        </motion.div>
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/85 backdrop-blur-md rounded-[32px] border-4 border-pink-100 shadow-2xl p-8 sm:p-10 relative text-center z-10"
        id="login-dialog-card"
      >
        {/* Absolute Ribbon Header Header */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 select-none filter drop-shadow-md">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="bg-white px-4 py-2 rounded-full border-2 border-pink-200 flex items-center justify-center gap-1.5"
          >
            <span className="text-3xl">🎀</span>
          </motion.div>
        </div>

        {/* Welcome Section */}
        <div className="mt-4 mb-8 space-y-2">
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-pink-500 tracking-tight leading-normal" id="login-title-main">
            Hello Kitty World
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-slate-700 font-extrabold text-sm sm:text-base">
            <span>欢迎回家</span>
            <span className="text-pink-400">🏡💖</span>
          </div>
        </div>

        {/* Main Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left" id="login-auth-form">
          {/* Username Input Container */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-rose-500 font-sans uppercase tracking-wider pl-1">
              Kitty 昵称
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none">🐱</span>
              <input 
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="请输入你的Kitty昵称~"
                className="w-full pl-11 pr-4 py-3 bg-rose-50/50 border-2 border-pink-100 focus:border-pink-300 focus:outline-hidden focus:ring-4 focus:ring-pink-100/70 rounded-2xl font-sans text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all duration-200"
                id="login-username-field"
              />
            </div>
          </div>

          {/* Password Input Container */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-rose-500 font-sans uppercase tracking-wider pl-1">
              专属密码
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none">🔑</span>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入专属密码"
                className="w-full pl-11 pr-4 py-3 bg-rose-50/50 border-2 border-pink-100 focus:border-pink-300 focus:outline-hidden focus:ring-4 focus:ring-pink-100/70 rounded-2xl font-sans text-xs sm:text-sm text-slate-800 placeholder-slate-400 transition-all duration-200"
                id="login-password-field"
              />
            </div>
          </div>

          {/* Spacer */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-gradient-to-r from-pink-400 to-[#EE9CA7] hover:from-pink-500 hover:to-[#EE9CA7]/90 text-white font-sans font-black text-sm rounded-2xl shadow-lg hover:shadow-pink-200/80 active:ring-4 active:ring-pink-100 transition-all duration-200 text-center cursor-pointer flex items-center justify-center gap-1.5"
              id="login-submit-button"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin text-sm">🍭</span>
                  正在搭建梦幻通道...
                </>
              ) : (
                <>
                  <span>进入乐园</span>
                  <span>🌠</span>
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Footer Subtext */}
        <div className="mt-8 pt-4 border-t border-rose-50 flex flex-col items-center gap-1.5">
          <p className="font-sans text-[11px] text-slate-400 font-medium">
            和Hello Kitty一起开启甜蜜之旅✨
          </p>
          <div className="flex items-center gap-2 select-none h-4">
            <span className="text-xs">🍬</span>
            <span className="text-xs">🍓</span>
            <span className="text-xs">🍪</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
