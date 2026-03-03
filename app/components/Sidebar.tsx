"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Send,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transfer", href: "/transfer", icon: Send },
    { name: "History", href: "/history", icon: History },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-screen flex flex-col border-r border-border-subtle bg-bg-card/50 backdrop-blur-xl sticky top-0 transition-all duration-300 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 h-20 border-b border-white/[0.03]">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg">
                <span className="font-black text-[10px] text-white">P+</span>
              </div>
              <span className="text-white text-lg font-bold tracking-tight">
                PAYCORE<span className="text-brand">+</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.06] transition-all"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5 px-4 mt-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative group block"
            >
              <div
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-[14px] font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-text-secondary hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-brand rounded-2xl shadow-xl shadow-brand/30 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon
                  size={20}
                  className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-white" : "text-text-muted group-hover:text-white"
                  }`}
                />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
                
                {isActive && !collapsed && (
                   <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
                   />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-white/[0.03] bg-white/[0.01]">
        <div className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${collapsed ? 'justify-center' : 'hover:bg-white/[0.03]'}`}>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center text-white text-xs font-bold">
              {user?.full_name?.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-bg-card rounded-full" />
          </div>
          
          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-white truncate">
                {user?.full_name}
              </span>
              <span className="text-[11px] text-text-muted truncate uppercase tracking-widest font-medium">
                Standard Tier
              </span>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-4 py-3 mt-2 rounded-xl text-sm font-medium text-error/80 hover:text-error hover:bg-error/10 transition-all group ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} className="flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
