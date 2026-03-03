"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { transferApi, walletApi } from "@/lib/api";
import {
  ArrowRight,
  Send,
  Loader2,
  Wallet,
  ShieldCheck,
  ArrowLeft,
  Info,
  Check,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TransferPage() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [receiverAccountNo, setReceiverAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingWallet, setFetchingWallet] = useState(true);
  const [success, setSuccess] = useState<any>(null);

  React.useEffect(() => {
    const fetchWallet = async () => {
      if (!user) return;
      try {
        const response = await walletApi.getWallet(user.id);
        setWallet(response.wallet);
      } catch (err) {
        toast.error("Could not load your wallet information");
      } finally {
        setFetchingWallet(false);
      }
    };
    fetchWallet();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!wallet) {
      toast.error("Wallet not detected");
      setLoading(false);
      return;
    }

    const idempotencyKey = uuidv4();

    try {
      const response = await transferApi.create({
        sender_wallet_id: wallet.id,
        receiver_account_no: receiverAccountNo,
        amount: amount,
        transaction_type: "transfer",
        currency: wallet.currency,
        idempotency_key: idempotencyKey,
      });
      setSuccess(response.data);
      toast.success("Settlement Successful");
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || "Failed to initiate settlement");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(null);
    setReceiverAccountNo("");
    setAmount("");
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="p-10 rounded-[2.5rem] bg-bg-card border border-border-default shadow-2xl text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 border border-success/20">
                <Check size={40} className="text-success" />
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-2">Transfer Successful</h1>
              <p className="text-text-secondary text-sm mb-8">
                The transaction has been confirmed and finalized.
              </p>

              <div className="space-y-4 text-left mb-10">
                 <div className="p-6 rounded-2xl bg-white/[0.02] border border-border-subtle space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-medium text-text-muted capitalize">Amount</span>
                       <span className="text-lg font-bold text-white uppercase">{success.amount} {success.currency}</span>
                    </div>
                    <div className="h-[1px] bg-border-subtle" />
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-medium text-text-muted capitalize">Recipient</span>
                       <span className="text-[11px] font-mono text-text-secondary truncate ml-4">{success.receiver_wallet_id}</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/dashboard"
                  className="flex items-center justify-center h-12 bg-white/[0.05] border border-border-default text-white text-xs font-bold rounded-xl hover:bg-white/[0.08] transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={resetForm}
                  className="flex items-center justify-center h-12 bg-white text-black font-bold text-xs rounded-xl hover:bg-white/90 transition-all"
                >
                  New Transfer
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
               <div>
                 <h1 className="text-2xl font-bold text-white mb-1">Send Funds</h1>
                 <p className="text-text-secondary text-sm font-medium">Global p2p cash settlement.</p>
               </div>
               <Link href="/dashboard" className="p-2 text-text-muted hover:text-white transition-colors">
                  <ArrowLeft size={20} />
               </Link>
            </div>

            <div className="p-8 rounded-[2rem] bg-bg-card border border-border-default shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Recipient */}
                <div className="space-y-3">
                  <label htmlFor="receiverAccountNo" className="text-xs font-bold text-text-muted flex items-center justify-between">
                    <span>Recipient Account Number</span>
                    <span className="flex items-center gap-1.5 text-[10px] text-brand-light font-medium">
                      <Info size={12} />
                      Required
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                      <Wallet size={18} />
                    </div>
                    <input
                      id="receiverAccountNo"
                      type="text"
                      placeholder="e.g. 1029384756"
                      value={receiverAccountNo}
                      onChange={(e) => setReceiverAccountNo(e.target.value)}
                      required
                      className="w-full h-14 pl-12 pr-4 bg-white/[0.03] border border-border-default rounded-xl text-white text-sm font-medium focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Amount */}
                <div className="space-y-3">
                  <label htmlFor="amount" className="text-xs font-bold text-text-muted">
                    Amount ({wallet?.currency || "..."})
                  </label>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-muted group-focus-within:text-brand transition-colors">
                      {wallet?.currency === 'NGN' ? '₦' : '$'}
                    </span>
                    <input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="w-full h-20 pl-14 pr-6 bg-white/[0.02] border border-border-default rounded-2xl text-white text-4xl font-black placeholder:text-text-dim/20 focus:ring-2 focus:ring-brand/30 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle flex items-start gap-3">
                  <ShieldCheck size={18} className="text-brand-light mt-0.5" />
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    This transaction is processed through our <span className="text-white">Atomic Settlement Layer</span>, preventing any data inconsistency or duplicate charges.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || fetchingWallet}
                  className="w-full h-14 flex items-center justify-center gap-3 bg-brand text-white text-sm font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                >
                  {loading || fetchingWallet ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      Execute Transfer
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Quick Tips */}
            <div className="text-center">
               <p className="text-[11px] text-text-muted">
                 Make sure you verify the recipient's account number before sending. <br />
                 Settlements are irreversible.
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
