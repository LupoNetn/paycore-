"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Shield, 
  User, 
  Key, 
  Bell, 
  Smartphone, 
  Globe, 
  LogOut, 
  Eye, 
  EyeOff,
  ChevronRight,
  ShieldCheck,
  Fingerprint,
  History,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [showBalancePref, setShowBalancePref] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("hideBalance") !== "true";
    }
    return true;
  });

  const toggleBalanceVisibility = () => {
    const newVal = !showBalancePref;
    setShowBalancePref(newVal);
    localStorage.setItem("hideBalance", (!newVal).toString());
    toast.success(`Balance visibility ${newVal ? "enabled" : "hidden"}`);
  };

  interface SettingItem {
    id: string;
    label: string;
    desc: string;
    icon: any; // Using any for icon components to simplify
    action?: React.ReactNode;
    color?: string;
    onClick?: () => void;
  }

  const sections: { title: string; items: SettingItem[] }[] = [
    {
      title: "Security & Access",
      items: [
        { 
          id: "2fa",
          label: "Two-Factor Authentication", 
          desc: "Add an extra layer of security to your account", 
          icon: Shield, 
          action: <span className="text-xs font-bold text-brand-light">Setup</span> 
        },
        { 
          id: "password",
          label: "Change Password", 
          desc: "Last changed 3 months ago", 
          icon: Key, 
          action: <ChevronRight size={18} /> 
        },
        { 
          id: "sessions",
          label: "Active Sessions", 
          desc: "Manage devices where you're logged in", 
          icon: Smartphone, 
          action: <ChevronRight size={18} /> 
        },
      ]
    },
    {
      title: "Privacy Settings",
      items: [
        { 
          id: "balance",
          label: "Default Balance Visibility", 
          desc: "Hide your balance by default on login", 
          icon: showBalancePref ? Eye : EyeOff, 
          action: (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleBalanceVisibility(); }}
              className={`w-12 h-6 rounded-full transition-colors relative ${showBalancePref ? 'bg-brand' : 'bg-bg-elevated border border-border-subtle'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showBalancePref ? 'left-7' : 'left-1'}`} />
            </button>
          )
        },
        { 
          id: "history",
          label: "Transaction Privacy", 
          desc: "Who can see your wallet activity", 
          icon: Globe, 
          action: <span className="text-xs font-bold text-text-muted">Only Me</span> 
        },
      ]
    },
    {
      title: "Account Actions",
      items: [
        { 
          id: "logout",
          label: "Sign Out", 
          desc: "Securely sign out of this device", 
          icon: LogOut, 
          color: "text-error",
          onClick: logout
        },
        { 
          id: "delete",
          label: "Delete Account", 
          desc: "Permanently remove your data and funds", 
          icon: Trash2, 
          color: "text-error",
          onClick: () => toast.error("Please contact support to close your account")
        },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Secure Settings</h1>
        <p className="text-text-secondary">Manage your identity, security, and global privacy preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
           <div className="p-8 rounded-[2.5rem] bg-bg-card border border-border-default text-center">
              <div className="w-24 h-24 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-6 text-brand">
                 <User size={48} />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{user?.full_name}</h2>
              <p className="text-xs text-text-muted uppercase tracking-widest font-bold mb-6">Standard Member</p>
              
              <div className="space-y-3 pt-6 border-t border-border-subtle">
                 <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-brand-light">
                       <ShieldCheck size={16} />
                    </div>
                    <div>
                       <p className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">KYC Status</p>
                       <p className="text-xs font-bold text-success">Verified</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-cyan">
                       <Fingerprint size={16} />
                    </div>
                    <div>
                       <p className="text-[10px] text-text-muted uppercase font-bold tracking-tighter">Biometrics</p>
                       <p className="text-xs font-bold text-white">Enabled</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Settings Lists */}
        <div className="lg:col-span-2 space-y-10">
          {sections.map((section, idx) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] px-2">{section.title}</h3>
              <div className="rounded-3xl bg-bg-card border border-border-default overflow-hidden">
                {section.items.map((item: SettingItem, i) => (
                  <div 
                    key={item.label}
                    onClick={item.onClick}
                    className={`flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors cursor-pointer group ${i !== section.items.length - 1 ? 'border-b border-border-subtle' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-bg-elevated border border-border-subtle flex items-center justify-center ${item.color || 'text-text-secondary'}`}>
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${item.color || 'text-white'}`}>{item.label}</p>
                        <p className="text-xs text-text-muted">{item.desc}</p>
                      </div>
                    </div>
                    <div className="text-text-muted group-hover:text-white transition-colors">
                      {item.action}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
