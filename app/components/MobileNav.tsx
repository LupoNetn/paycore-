"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ArrowRightLeft,
  History,
  Settings,
  Plus,
} from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transfer", href: "/transfer", icon: ArrowRightLeft },
    { name: "History", href: "/history", icon: History },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 px-6">
      <nav className="bg-bg-card/90 backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] shadow-2xl flex items-center justify-between px-3 py-2.5 h-[72px]">
        {/* First two items */}
        {navItems.slice(0, 2).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex-1 flex flex-col items-center justify-center gap-1 transition-all"
            >
              <div className={`z-10 transition-all duration-300 ${
                isActive ? "text-brand scale-110" : "text-text-muted hover:text-white"
              }`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold tracking-tight transition-all duration-300 ${
                isActive ? "text-white opacity-100" : "text-text-muted opacity-60"
              }`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -bottom-2 w-8 h-1 bg-brand rounded-full shadow-[0_0_12px_var(--color-brand)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}

        {/* FAB - Centered Transfer Button */}
        <div className="flex-1 flex justify-center -translate-y-6">
          <Link
             href="/transfer"
             className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center text-white shadow-xl shadow-brand/20 border-4 border-bg-card"
          >
            <Plus size={28} strokeWidth={3} />
          </Link>
        </div>

        {/* Last two items */}
        {navItems.slice(2).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex-1 flex flex-col items-center justify-center gap-1 transition-all"
            >
              <div className={`z-10 transition-all duration-300 ${
                isActive ? "text-brand scale-110" : "text-text-muted hover:text-white"
              }`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold tracking-tight transition-all duration-300 ${
                isActive ? "text-white opacity-100" : "text-text-muted opacity-60"
              }`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -bottom-2 w-8 h-1 bg-brand rounded-full shadow-[0_0_12px_var(--color-brand)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
