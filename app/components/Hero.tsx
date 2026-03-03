"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/10 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[120px]" 
        />
        
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Floating Badge */}
        <motion.div 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl group hover:border-brand/40 transition-all cursor-default">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-brand/20 text-brand-light group-hover:scale-110 transition-transform">
               <Sparkles size={14} />
            </div>
            <span className="text-white/80 text-[11px] font-bold tracking-[0.2em] uppercase">
              Financial Infrastructure 2.0
            </span>
          </div>
        </motion.div>

        {/* Cinematic Heading */}
        <motion.h1 
          initial={{ opacity: 1, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-10 text-balance"
        >
          The <span className="text-white">Future</span> of <br />
          <span className="gradient-text drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">Payments</span>
        </motion.h1>

        {/* Sophisticated Subtitle */}
        <motion.p 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-text-secondary font-medium leading-relaxed mb-14"
        >
          Move money globally with <span className="text-white font-bold">sub-second finality</span>. 
          A secure, scalable API-first platform built for modern enterprises.
        </motion.p>

        {/* Premium CTA Buttons */}
        <motion.div 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            href="/signup"
            className="group relative flex items-center justify-center gap-3 px-10 h-16 bg-white text-black text-sm font-black rounded-2xl hover:bg-white/90 transition-all shadow-2xl shadow-white/5 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span>Launch Console</span>
            <ArrowRight
              size={18}
              strokeWidth={3}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-3 px-10 h-16 text-white text-sm font-bold rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all active:scale-95"
          >
            Explore API
          </Link>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
           {[
             { icon: Zap, label: "0.4ms Latency" },
             { icon: Shield, label: "Bank-grade Security" },
             { icon: Globe, label: "Global Coverage" },
             { icon: Sparkles, label: "AI-Powered Fraud Prevention" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center gap-3 group px-4 py-2 hover:bg-white/[0.02] rounded-2xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 group-hover:text-brand transition-colors">
                   <item.icon size={20} />
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest text-text-muted group-hover:text-white transition-colors">{item.label}</span>
             </div>
           ))}
        </motion.div>
      </div>
      
      {/* Floating element for more depth */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-20">
         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Scroll</span>
         <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
