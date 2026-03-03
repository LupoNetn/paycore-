"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, LogIn, UserPlus, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Developers", href: "/#developers" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-bg-primary/40 backdrop-blur-2xl border-b border-white/[0.05] shadow-2xl shadow-black/40"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg transition-all"
          >
            <span className="font-black text-xs text-white">P+</span>
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-light transition-colors">
            Paycore<span className="text-brand-light">+</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-2xl backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2 text-[13px] font-semibold text-text-secondary hover:text-white hover:bg-white/[0.05] rounded-xl transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 px-6 py-2.5 bg-brand text-white text-[13px] font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg group active:scale-95"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[13px] font-bold text-text-secondary hover:text-white transition-colors px-4"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2.5 px-6 py-2.5 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-white/90 transition-all shadow-xl shadow-white/10 active:scale-95"
              >
                <UserPlus size={16} />
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-bg-primary/95 backdrop-blur-3xl border-b border-white/[0.08] overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    className="text-lg font-bold text-text-secondary hover:text-brand-light py-3 block border-b border-white/[0.03]" 
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="mt-6 flex flex-col gap-4">
                {user ? (
                  <Link href="/dashboard" className="flex items-center justify-center gap-2 px-5 py-4 bg-brand text-white font-bold rounded-2xl" onClick={() => setMobileOpen(false)}>
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="flex items-center justify-center gap-2 py-4 text-text-secondary font-bold hover:text-white" onClick={() => setMobileOpen(false)}>Sign In</Link>
                    <Link href="/signup" className="flex items-center justify-center gap-2 px-5 py-4 bg-white text-black font-bold rounded-2xl" onClick={() => setMobileOpen(false)}>Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
