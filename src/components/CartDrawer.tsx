/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingCart, Trash2, CheckCircle2, Sparkles, Plus, Minus, X, Info, ShieldCheck, Heart } from 'lucide-react';
import { CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateCartQuantity: (productId: string, qty: number) => void;
  onClearCart: () => void;
  onAddPoint: (amount: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onClearCart,
  onAddPoint,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'shipping' | 'complete'>('idle');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  
  // Real-time calculation of subtotal & points
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const strawberryPointsEarned = Math.floor(subtotal / 10);
  const isFreeShipping = subtotal >= 5000;
  const shipping = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 500);
  const grandTotal = subtotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingName.trim() && shippingAddress.trim()) {
      onAddPoint(strawberryPointsEarned + 100); // 100 bonus order points
      setCheckoutStep('complete');
    }
  };

  const handleOrderReset = () => {
    onClearCart();
    setCheckoutStep('idle');
    setShippingName('');
    setShippingAddress('');
    setShippingPhone('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 cursor-pointer"
            id="cart-drawer-backdrop-overlay"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 bg-linear-to-b from-white via-[#FFF8F9] to-[#FFF0F2] w-full max-w-md h-full z-50 shadow-2xl border-l-4 border-pink-100 flex flex-col justify-between overflow-hidden"
            id="cart-drawer-panel"
          >
            {/* Adorable Ribbon Decorator on left edge */}
            <div className="absolute top-[20%] -left-3 w-6 h-12 bg-pink-400 rounded-r-lg border-y border-r border-pink-300 shadow-md flex items-center justify-center select-none z-20 pointer-events-none">
              <span className="text-xs text-white">🎀</span>
            </div>

            {/* Header: Sweet Pink Theme Header */}
            <div className="p-5 border-b-2 border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100/30 rounded-full blur-xl pointer-events-none select-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-pink-200 shadow-sm">
                  <ShoppingCart className="w-5 h-5 text-pink-500" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-sans font-black text-lg text-slate-800 tracking-tight flex items-center gap-1.5 justify-start">
                    My Sweet Basket <span className="text-pink-400">🏡💖</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <span>共有</span>
                    <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-mono font-bold text-[11px]">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)} 件萌礼
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Close Button with cute scale hover */}
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white hover:bg-rose-50 border border-pink-100 flex items-center justify-center text-slate-400 hover:text-pink-500 transition duration-150 shadow-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Cabinet body list items */}
            <div className="p-5 overflow-y-auto flex-1 h-full space-y-4 relative scrollbar-thin">
              {checkoutStep === 'idle' ? (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center py-16 px-8 text-center space-y-5">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        className="text-6xl select-none"
                      >
                        🎈🌸🌱
                      </motion.div>
                      <div className="space-y-2">
                        <h4 className="font-sans font-black text-base text-pink-500">购物车空空如也~</h4>
                        <p className="font-sans text-xs text-slate-400 max-w-xs leading-relaxed">
                          这里还没有任何心爱的Hello Kitty萌礼哦。快去精品店里精心挑选你最喜欢的伴手礼吧！
                        </p>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { onClose(); onAddPoint(5); }}
                        className="px-6 py-2.5 bg-gradient-to-r from-pink-400 to-[#EE9CA7] text-white font-sans font-black text-xs rounded-full shadow-md hover:shadow-pink-200/80 transition-all uppercase cursor-pointer"
                      >
                        开始探索乐园礼包 ✨
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {/* Shipping Progress Indicator */}
                      <div className="bg-pink-50/70 border border-pink-100/50 rounded-2xl p-3 text-left">
                        {isFreeShipping ? (
                          <div className="flex items-center gap-2">
                            <span className="text-base select-none">🎉</span>
                            <p className="text-xs font-sans text-pink-600 font-bold">
                              恭喜！已满 ¥5,000 享受免运费福利！
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1.5 text-left">
                            <div className="flex justify-between items-center text-xs font-sans text-slate-600 font-medium">
                              <span>再购 <strong className="text-pink-500">¥{(5300 - subtotal).toLocaleString()}</strong> 即可享受免税包邮</span>
                              <span className="font-mono font-bold text-[10px] text-pink-500 bg-pink-100 px-1.5 py-0.5 rounded-sm">¥{subtotal.toLocaleString()} / ¥5,000</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="bg-pink-400 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Items List */}
                      <div className="space-y-3" id="cart-item-list">
                        {cart.map((item) => (
                          <motion.div 
                            layout
                            key={item.product.id}
                            className="flex items-center gap-4 bg-white hover:bg-pink-50/20 p-3.5 rounded-2xl border-2 border-pink-50 hover:border-pink-200/50 shadow-xs hover:shadow-sm text-left transition-all duration-150 relative group/item"
                          >
                            {/* Clear, unblurred thumbnail layout container */}
                            <div className="w-18 h-18 bg-pink-50/40 rounded-xl p-2 shrink-0 border border-pink-100/60 flex items-center justify-center relative overflow-hidden">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-contain max-h-16 drop-shadow-xs transition duration-200 group-hover/item:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Text description details container */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="font-sans font-black text-xs sm:text-sm text-slate-800 leading-snug break-words">
                                  {item.product.name}
                                </h4>
                                <motion.button
                                  whileHover={{ scale: 1.1, textShadow: '0 0 5px rgba(220, 38, 38, 0.4)' }}
                                  onClick={() => onRemoveFromCart(item.product.id)}
                                  className="text-red-400 hover:text-red-500 cursor-pointer self-start p-1 bg-rose-50/50 hover:bg-rose-100/70 rounded-lg transition"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </motion.button>
                              </div>

                              <p className="font-sans text-[10px] text-slate-400 line-clamp-1 leading-normal">
                                {item.product.description}
                              </p>

                              <div className="flex items-center justify-between pt-1">
                                {/* Price tags */}
                                <div className="space-y-0.5">
                                  <span className="font-mono text-xs font-extrabold text-pink-500">
                                    ¥{item.product.price.toLocaleString()}
                                  </span>
                                  {item.quantity > 1 && (
                                    <span className="block font-mono text-[9px] text-slate-400">
                                      共 ¥{(item.product.price * item.quantity).toLocaleString()}
                                    </span>
                                  )}
                                </div>

                                {/* Custom sweet quantity counter buttons */}
                                <div className="flex items-center border border-pink-100 bg-white shadow-xs rounded-lg max-w-[85px] overflow-hidden">
                                  <button 
                                    onClick={() => onUpdateCartQuantity(item.product.id, item.quantity - 1)}
                                    className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-pink-500 hover:bg-pink-50/50 transition cursor-pointer"
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="px-2 py-0.5 text-xs font-black font-mono text-slate-700 min-w-[20px] text-center bg-pink-50/20">
                                    {item.quantity}
                                  </span>
                                  <button 
                                    onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                                    className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-pink-500 hover:bg-pink-50/50 transition cursor-pointer"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : checkoutStep === 'shipping' ? (
                /* Delivery details input form */
                <form id="shipping-checkout-form-global" onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <h4 className="font-sans font-black text-sm text-slate-800 flex items-center gap-1">
                      <span>🌸 1. 收货人配送信息</span>
                    </h4>
                    <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                      请填写您在Hello Kitty乐园中的梦幻专递地址，好礼将会装入配有粉黑胶带的精美礼盒配送哦！
                    </p>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-600">收货人昵称 (Nickname)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="例如: Sweet Member" 
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-pink-100 rounded-xl focus:outline-none focus:border-pink-400 bg-white transition duration-150"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-600">联系电话 (Phone Number)</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="请输入联系电话" 
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-pink-100 rounded-xl focus:outline-none focus:border-pink-400 bg-white transition duration-150"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-600">乐园专递地址 (Shipping Address)</label>
                      <textarea 
                        required
                        rows={3}
                        placeholder="例如: 乐园草莓大道88号 蝴蝶结庄园1楼" 
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border-2 border-pink-100 rounded-xl focus:outline-none focus:border-pink-300 bg-white transition duration-150 resize-none"
                      />
                    </div>
                  </div>

                  <div className="bg-pink-50/70 border border-pink-100/60 p-4 rounded-2xl text-left space-y-1.5">
                    <span className="block text-[10px] uppercase font-mono font-bold text-pink-500">点数结算扣除</span>
                    <span className="font-sans font-bold text-xs text-slate-700 flex items-center gap-1.5">
                      🧁 可消耗积分全额兑换: ¥{grandTotal.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#DB7093] block leading-normal">
                      订单完成时，应消耗积分将从您的草莓俱乐部余额中自动支付并等额扣减!
                    </span>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setCheckoutStep('idle')}
                      className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-sans font-bold text-xs rounded-xl"
                    >
                      返回购物车
                    </button>
                    <button 
                      type="submit" 
                      className="w-1/2 py-3 bg-gradient-to-r from-pink-400 to-[#EE9CA7] hover:from-pink-500 text-white font-sans font-black text-xs rounded-xl shadow-md uppercase transition cursor-pointer"
                    >
                      立即兑换好礼 🎀
                    </button>
                  </div>
                </form>
              ) : (
                /* Completed Receipt */
                <div className="h-full flex flex-col justify-between" id="checkout-completed-receipt-global">
                  <div className="bg-gradient-to-b from-[#FFF0F2] to-white border-2 border-dashed border-pink-200 rounded-3xl p-6 text-center space-y-5 relative">
                    <div className="absolute top-0 right-10 w-8 h-8 text-lg select-none">🕊️</div>
                    <div className="w-14 h-14 mx-auto bg-pink-100 text-pink-500 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans font-black text-lg text-slate-800">兑换成功！</h4>
                      <p className="font-sans text-xs text-slate-500 leading-normal">好礼兑换券已准备就绪，即将专递送达您的庄园！</p>
                    </div>

                    {/* Miniature receipt block */}
                    <div className="border-t border-b border-dashed border-pink-100 py-4 text-left space-y-2 font-sans text-xs text-slate-600">
                      <div className="flex justify-between font-mono text-[9px] text-[#DB7093] font-bold uppercase pb-1">
                        <span>兑换订单号 (Order ID)</span>
                        <span>#HK-{Math.floor(Math.random() * 800000 + 100000)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>收货人:</span>
                        <span className="font-extrabold text-slate-800">{shippingName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>配送电话:</span>
                        <span className="font-mono text-slate-800">{shippingPhone}</span>
                      </div>
                      <div className="flex justify-start items-start gap-1">
                        <span className="shrink-0">配送地址:</span>
                        <span className="font-bold text-slate-800 leading-normal">{shippingAddress}</span>
                      </div>
                      <div className="flex justify-between font-mono text-pink-500 font-black text-sm border-t border-dashed border-slate-100 pt-2">
                        <span>扣减积分价值:</span>
                        <span>¥{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-pink-50/80 border border-pink-100/50 p-3 rounded-xl text-left">
                      <p className="font-sans text-[11px] text-pink-600 leading-relaxed font-semibold">
                        🍓 额外赠送点数: <strong>+{strawberryPointsEarned} pts</strong> (额外返点) + 100 乐园下单福利点数！
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={handleOrderReset}
                    className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-[#EE9CA7] hover:from-pink-500 text-white font-sans font-black text-xs rounded-xl shadow-md uppercase cursor-pointer transition active:scale-98"
                  >
                    清空并返回乐园 🎈
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Basket grand calculations (Only show during basket layout) */}
            {checkoutStep === 'idle' && cart.length > 0 && (
              <div className="p-5 border-t border-pink-100 bg-linear-to-b from-white to-[#FFF5F6] space-y-3.5 text-left shadow-2xl relative z-10">
                <div className="space-y-1.5 text-xs text-slate-600 font-sans border-b border-pink-100/50 pb-3">
                  <div className="flex justify-between font-medium">
                    <span>商品小计 (Subtotal):</span>
                    <span className="font-mono font-bold text-slate-800">¥{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>乐园运费 (Shipping):</span>
                    <span className="font-mono font-bold text-pink-500">
                      {shipping === 0 ? '✨ 免运费 ✨' : `¥${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>本次预计能得草莓积分:</span>
                    <span className="text-emerald-500 font-black">+{strawberryPointsEarned} pts 🍓</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center font-sans text-sm font-black text-rose-500 uppercase">
                    <span>应付总计 (Grand Total):</span>
                    <span className="font-mono text-xl text-pink-600">¥{grandTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={onClearCart}
                      className="py-3 px-3.5 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-600 font-sans font-bold text-xs rounded-xl transition duration-150 uppercase"
                    >
                      清空 (Dump)
                    </button>
                    <button 
                      onClick={() => {
                        setCheckoutStep('shipping');
                        onAddPoint(10);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-[#EE9CA7] hover:from-pink-500 text-white font-sans font-black text-xs rounded-xl shadow-md hover:shadow-pink-100/80 uppercase text-center flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-98"
                    >
                      <span>前往填写专递地址</span>
                      <span>🎀</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
