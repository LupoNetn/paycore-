"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { walletApi } from "@/lib/api";
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  CreditCard,
  Zap,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Eye,
  EyeOff,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Transaction {
  id: string;
  sender_wallet_id: string;
  receiver_wallet_id: string;
  amount: string;
  currency: string;
  status: string;
  created_at: string;
}

interface WalletData {
  id: string;
  balance: string;
  currency: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const walletRes = await walletApi.getWallet(user.id);
      setWallet(walletRes.wallet);
      const transRes = await walletApi.getTransactions(user.id, 1, 5);
      setTransactions(transRes.transactions || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Load preference from local storage if exists
    const pref = localStorage.getItem('hideBalance');
    if (pref === 'true') setShowBalance(false);
  }, [user]);

  const toggleBalance = () => {
    const newVal = !showBalance;
    setShowBalance(newVal);
    localStorage.setItem('hideBalance', (!newVal).toString());
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10 py-6"
    >
      {/* Header & Greeting */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Overview
          </h1>
          <p className="text-text-secondary font-medium">
            Welcome back, <span className="text-white font-bold">{user?.full_name?.split(' ')[0]}</span>.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <button
            onClick={fetchDashboardData}
            className="flex items-center justify-center w-11 h-11 rounded-xl border border-border-default bg-bg-card text-text-muted hover:text-white transition-all shadow-sm"
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          
          <Link
            href="/transfer"
            className="flex items-center gap-2.5 px-6 h-11 bg-white text-black text-sm font-bold rounded-xl hover:bg-neutral-100 transition-all shadow-md active:scale-95"
          >
            <Plus size={18} />
            <span>Send Money</span>
          </Link>
        </div>
      </motion.div>

      {/* Premium Balance Card */}
      <motion.div variants={item} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 relative p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-brand via-brand-dark to-purple-900 border border-white/20 shadow-2xl shadow-brand/20 overflow-hidden group">
           {/* Visual depth elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
           
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between">
                <div>
                   <div className="flex items-center gap-3 mb-3">
                      <span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.2em]">Total Balance</span>
                      <button 
                        onClick={toggleBalance}
                        className="p-1 rounded-md hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                      >
                         {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                   </div>
                   <div className="flex items-baseline gap-4">
                      <span className="text-white/60 text-2xl font-medium tracking-tight">{wallet?.currency || "USD"}</span>
                      <span className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                        {showBalance ? parseFloat(wallet?.balance || "0").toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        }) : "••••••••"}
                      </span>
                   </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <Wallet className="text-white" size={32} />
                </div>
              </div>

              <div className="mt-14 flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                       <TrendingUp size={16} className="text-success-light" />
                       <span className="text-sm font-bold text-white">+2.45%</span>
                    </div>
                    <div>
                       <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none mb-1">Status</p>
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success" />
                          <span className="text-xs font-bold text-white/90">Verified</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                       <div key={i} className="w-9 h-9 rounded-full border-2 border-brand-dark bg-bg-elevated/40 backdrop-blur-sm" />
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-brand-dark bg-white/10 flex items-center justify-center text-[10px] font-black text-white">+12</div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:flex xl:flex-col gap-6">
           <div className="p-6 rounded-[2rem] bg-bg-card border border-border-default flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-subtle flex items-center justify-center text-brand-light">
                    <ShieldCheck size={20} />
                 </div>
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Global Vault</span>
              </div>
              <p className="text-sm font-bold text-white mb-1 px-1">AES-256 Protected</p>
              <p className="text-[11px] text-text-muted px-1">Military-grade encryption for all assets.</p>
           </div>
           
           <div className="p-6 rounded-[2rem] bg-bg-card border border-border-default flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-subtle flex items-center justify-center text-cyan">
                    <Zap size={20} />
                 </div>
                 <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Network Speed</span>
              </div>
              <p className="text-sm font-bold text-white mb-1 px-1">0.42ms Latency</p>
              <p className="text-[11px] text-text-muted px-1">Real-time settlement on all rails.</p>
           </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <motion.div variants={item} className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2">
           <div className="flex items-center justify-between mb-6 px-1">
             <h2 className="text-xl font-bold text-white">Active Ledger</h2>
             <Link href="/history" className="text-xs font-bold text-brand-light hover:text-white transition-colors">
               View Full History
             </Link>
           </div>

           <div className="space-y-3">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="h-20 rounded-3xl bg-bg-card/40 border border-border-subtle animate-pulse" />
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx, idx) => {
                  const isSent = tx.sender_wallet_id === wallet?.id;
                  return (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-5 rounded-[1.75rem] bg-bg-card border border-border-subtle hover:border-border-default transition-all flex items-center gap-4 group cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isSent ? "bg-red-500/5 text-red-400" : "bg-success/5 text-success"
                      }`}>
                        {isSent ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                           <p className="text-sm font-bold text-white truncate">
                             {isSent ? "Payment Dispatched" : "Credit Received"}
                           </p>
                        </div>
                        <p className="text-[10px] text-text-muted font-medium flex items-center gap-2">
                           {new Date(tx.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                           <span className="w-1 h-1 rounded-full bg-border-default" />
                           <span className="capitalize">{tx.status}</span>
                        </p>
                      </div>

                      <div className="text-right">
                         <p className={`text-lg font-bold tracking-tight ${isSent ? 'text-white' : 'text-success'}`}>
                           {isSent ? "-" : "+"}{parseFloat(tx.amount).toLocaleString()} {tx.currency}
                         </p>
                         <p className="text-[10px] font-mono text-text-dim uppercase tracking-tighter">Settled</p>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <div className="h-64 flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-border-default text-center">
                   <CreditCard size={32} className="text-text-dim/40 mb-4" />
                   <p className="text-sm text-text-secondary font-medium">No activity recorded on this ledger.</p>
                </div>
              )}
           </div>
        </div>

        <div className="space-y-8">
           <div className="p-8 rounded-[2.5rem] bg-bg-card border border-border-default">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-8">Payment Methods</h3>
              <div className="space-y-4">
                 {[
                   { name: "Digital Visa", last4: "4421" },
                   { name: "USD Wallet", last4: "9001" }
                 ].map((card, i) => (
                   <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-bg-elevated/40 border border-border-subtle group cursor-pointer hover:border-brand transition-all">
                      <div className="w-11 h-8 rounded-lg bg-brand flex items-center justify-center text-white shadow-lg">
                         <CreditCard size={18} />
                      </div>
                      <div className="flex-1">
                         <p className="text-xs font-bold text-white">{card.name}</p>
                         <p className="text-[10px] text-text-muted tracking-widest mt-0.5">•••• {card.last4}</p>
                      </div>
                   </div>
                 ))}
                 <button className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border-default text-xs font-bold text-text-muted hover:text-white hover:border-border-default transition-all">
                    <Plus size={14} /> Add Source
                 </button>
              </div>
           </div>
           
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-border-default">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-success">
                    <TrendingUp size={16} />
                 </div>
                 <span className="text-xs font-bold text-white">Reward Points</span>
              </div>
              <p className="text-2xl font-black text-white mb-2 tracking-tight">2,450 <span className="text-[10px] text-text-muted uppercase tracking-widest">PTS</span></p>
              <Link href="/settings" className="text-[10px] font-bold text-brand-light hover:underline">Manage Rewards</Link>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
