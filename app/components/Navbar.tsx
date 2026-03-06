"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "py-4 bg-bg-primary/90 backdrop-blur-md border-b border-white/[0.05]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
            <span className="font-bold text-[10px] text-black">P+</span>
          </div>
          <span className="text-base font-medium tracking-tight text-white">
            Paycore
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/#features" className="text-sm text-text-secondary hover:text-white transition-colors">Features</Link>
          <Link href="/#developers" className="text-sm text-text-secondary hover:text-white transition-colors">Developers</Link>
          <Link href="/#pricing" className="text-sm text-text-secondary hover:text-white transition-colors">Pricing</Link>
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="px-5 py-2 text-sm font-medium bg-white text-black rounded hover:bg-white/90 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors px-2"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 text-sm font-medium bg-white text-black rounded hover:bg-white/90 transition-colors"
              >
                Start building
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-bg-primary border-b border-white/[0.05] p-6 flex flex-col gap-4">
          <Link href="/#features" className="text-sm text-text-secondary" onClick={() => setMobileOpen(false)}>Features</Link>
          <Link href="/#developers" className="text-sm text-text-secondary" onClick={() => setMobileOpen(false)}>Developers</Link>
          <Link href="/#pricing" className="text-sm text-text-secondary" onClick={() => setMobileOpen(false)}>Pricing</Link>
          
          <div className="border-t border-white/[0.05] mt-4 pt-4 flex flex-col gap-4">
            {user ? (
              <Link href="/dashboard" className="text-sm text-white font-medium" onClick={() => setMobileOpen(false)}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm text-text-secondary" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link href="/signup" className="text-sm text-white font-medium" onClick={() => setMobileOpen(false)}>Start building</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
