"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import { Loader2, Bell, Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-bg-primary gap-6">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-t-2 border-r-2 border-brand shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-brand/20 flex items-center justify-center backdrop-blur-sm">
               <span className="font-black text-[8px] text-brand">P+</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-white font-bold tracking-tight text-lg">Initializing Paycore+</p>
          <p className="text-text-muted text-sm font-medium animate-pulse">
            Setting up your secure workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary selection:bg-brand/30 selection:text-brand-light">
      {/* Sidebar - Desktop Only */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Top Header - Desktop & Mobile */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-white/[0.03] bg-bg-primary/50 backdrop-blur-xl sticky top-0 z-40">
           {/* Mobile Logo */}
           <div className="lg:hidden flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shadow-lg">
                <span className="font-black text-[10px] text-white">P+</span>
              </div>
              <span className="text-white font-bold text-base tracking-tight">PAYCORE<span className="text-brand">+</span></span>
           </div>

           {/* Search Bar (Sophisticated) */}
           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search transactions, wallets..." 
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/40 transition-all placeholder:text-text-muted/50"
                />
              </div>
           </div>

           {/* Right Actions */}
           <div className="flex items-center gap-3 md:gap-5">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-white transition-all relative border border-white/[0.05]"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full ring-2 ring-bg-primary" />
              </motion.button>
              
              <div className="h-8 w-[1px] bg-white/[0.05] hidden md:block" />

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl bg-white/[0.03] border border-white/[0.05] cursor-pointer"
              >
                <div className="hidden md:flex flex-col items-end px-1 text-right">
                  <span className="text-xs font-bold text-white leading-none capitalize">{user?.full_name?.split(' ')[0]}</span>
                  <span className="text-[10px] text-text-muted leading-none mt-1">Personal Account</span>
                </div>
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-brand/20 to-accent/20 flex items-center justify-center border border-white/[0.1]">
                   <User size={20} className="text-brand-light" />
                </div>
              </motion.div>
           </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          {/* Dashboard Content Container */}
          <div className="max-w-[1200px] mx-auto p-4 md:p-8 lg:p-10 pb-32 lg:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </div>

          {/* Decorative background elements */}
          <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
        </main>

        {/* Mobile Navigation Bar */}
        <MobileNav />
      </div>
    </div>
  );
}
