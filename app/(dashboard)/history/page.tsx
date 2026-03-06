"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { walletApi } from "@/lib/api";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  CreditCard,
  Filter,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Transaction {
  id: string;
  sender_wallet_id: string;
  receiver_wallet_id: string;
  amount: string;
  currency: string;
  status: string;
  created_at: string;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchTransactions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await walletApi.getTransactions(user.id, page, pageSize);
      setTransactions(res.transactions || []);
      console.log(res)
      console.log(transactions)
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user, page]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
            Ledger History
          </h1>
          <p className="text-text-muted font-medium">
            Immutable record of all sub-second settlements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2.5 px-5 h-12 bg-white/[0.03] border border-white/[0.08] text-xs font-bold text-text-secondary rounded-2xl hover:bg-white/[0.06] hover:text-white transition-all group">
            <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            Export Data
          </button>
          <button className="w-12 h-12 flex items-center justify-center bg-brand text-white rounded-2xl shadow-xl shadow-brand/20 hover:bg-brand-light transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
         <div className="lg:col-span-3 h-14 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center px-5 focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/10 transition-all group">
            <Search size={18} className="text-text-muted transition-colors group-focus-within:text-brand" />
            <input
              type="text"
              placeholder="Filter by transaction ID, recipient, or exact volume..."
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-white placeholder:text-text-muted/50 font-medium"
            />
         </div>
         <div className="h-14 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-center gap-3 px-5">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Total Volume:</span>
            <span className="text-sm font-bold text-white leading-none">
              {transactions.length} <span className="text-text-muted/40 font-medium ml-1">Entries</span>
            </span>
         </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-bg-card/50 border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02]">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Type</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Network Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Entity Identifier</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Timestamp</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted text-right">Settlement</th>
              <th className="px-6 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {loading ? (
              Array(pageSize).fill(0).map((_, i) => (
                <tr key={i} className="animate-pulse">
                   <td colSpan={6} className="px-8 py-4"><div className="h-12 bg-white/[0.02] rounded-xl w-full" /></td>
                </tr>
              ))
            ) : transactions.length > 0 ? (
              transactions.map((tx, idx) => {
                const isSent = tx.sender_wallet_id === user?.id;
                return (
                  <motion.tr
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    key={tx.id}
                    className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                            isSent ? "bg-red-500/10 text-red-100" : "bg-emerald-500/10 text-emerald-100"
                        }`}>
                          {isSent ? <ArrowUpRight size={16} strokeWidth={2.5} /> : <ArrowDownLeft size={16} strokeWidth={2.5} />}
                        </div>
                        <span className="text-sm font-bold text-white truncate max-w-[100px]">
                          {isSent ? "Transfer Out" : "Credit In"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${tx.status === 'completed' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-mono text-white/60 font-medium">@{ (isSent ? tx.receiver_wallet_id : tx.sender_wallet_id)?.substring(0, 16) }</span>
                         <span className="text-[8px] text-text-muted font-bold uppercase tracking-tight">External Node ID</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">
                          {new Date(tx.created_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="text-[10px] text-text-muted mt-0.5">
                          {new Date(tx.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex flex-col items-end">
                        <span className={`text-sm font-black tracking-tight ${isSent ? "text-white" : "text-emerald-400"}`}>
                          {isSent ? "-" : "+"}{parseFloat(tx.amount).toLocaleString()} {tx.currency}
                        </span>
                        <span className="text-[8px] font-bold text-text-muted uppercase tracking-tighter mt-1">Confirmed Layer 1</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 text-text-muted hover:text-white transition-colors">
                          <MoreVertical size={16} />
                       </button>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-8 py-32 text-center">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-white/[0.02] flex items-center justify-center mx-auto mb-6">
                     <CreditCard size={40} className="text-text-muted/20" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Null Activity</h3>
                  <p className="text-sm text-text-muted max-w-xs mx-auto">No transaction data was detected for the current wallet configuration.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Enhanced) */}
      <div className="md:hidden space-y-4">
        {loading ? (
             Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-32 rounded-3xl bg-white/[0.02] border border-white/[0.05] animate-pulse" />
             ))
        ) : transactions.length > 0 ? (
          transactions.map((tx, idx) => {
            const isSent = tx.sender_wallet_id === user?.id;
            return (
              <motion.div 
                key={tx.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-[2rem] bg-bg-card border border-white/[0.05] flex flex-col gap-6 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${isSent ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                      {isSent ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white uppercase tracking-wider">{isSent ? "Payment Out" : "Credit In"}</span>
                      <span className="text-[10px] text-text-muted font-bold tracking-tight mt-1">
                        {new Date(tx.created_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })} • {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-black tracking-tight ${isSent ? "text-white" : "text-emerald-400"}`}>
                      {isSent ? "-" : "+"} {parseFloat(tx.amount).toLocaleString()}
                    </span>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mt-1">{tx.currency}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-5 border-t border-white/[0.03]">
                   <div className="flex flex-col gap-1">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-text-muted font-bold">Node Address</span>
                      <span className="text-[11px] font-mono text-white/50 truncate max-w-[120px]">
                        @{ (isSent ? tx.receiver_wallet_id : tx.sender_wallet_id)?.substring(0, 16) }
                      </span>
                   </div>
                   <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                   }`}>
                      {tx.status}
                    </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="bg-bg-card rounded-[2rem] py-16 text-center border border-dashed border-white/10">
             <div className="w-16 h-16 rounded-full bg-white/[0.02] flex items-center justify-center mx-auto mb-4">
                <CreditCard size={32} className="text-text-muted/20" />
             </div>
             <p className="text-white font-bold">Initial state detected</p>
             <p className="text-[10px] text-text-muted mt-1 uppercase tracking-widest">No transaction records available</p>
          </div>
        )}
      </div>

      {/* Pagination (Sophisticated) */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-6">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-brand" />
           <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">
             Page {page} of Data Stream
           </span>
        </div>
        
        <div className="flex items-center gap-2 p-1.5 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.05] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={20} />
          </motion.button>
          
          <div className="w-12 h-12 flex items-center justify-center text-sm font-black text-white">
            {page}
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-text-muted hover:text-white hover:bg-white/[0.05] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={() => setPage(page + 1)}
            disabled={transactions.length < pageSize}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
