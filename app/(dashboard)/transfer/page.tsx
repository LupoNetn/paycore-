"use client";

import { useState,useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { transferApi, walletApi, externalTransferApi } from "@/lib/api";
import {
  ArrowRight,
  Send,
  Loader2,
  Wallet,
  ShieldCheck,
  ArrowLeft,
  Info,
  Check,
  Building2,
  User,
  Search,
  ChevronDown,
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
  const [transferTo,setTransferTo] = useState<string>("paycore")
  const [resolvedPaycoreUser, setResolvedPaycoreUser] = useState<any>(null)
  const [resolvingPaycore, setResolvingPaycore] = useState(false)

  const [externalReceipientAcc, setExternalReceipientAcc] = useState<string>("")
  const [externalReceipientBank, setExternalReceipientBank] = useState<string>("")
  const [externalReceipientBankCode, setExternalReceipientBankCode] = useState<string>("")
  const [externalReceipientName, setExternalReceipientName] = useState<string>("")
  const [banks, setBanks] = useState<any[]>([])
  const [filteredBanks, setFilteredBanks] = useState<any[]>([])
  const [bankSearch, setBankSearch] = useState("")
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false)
  const [resolvingAccount, setResolvingAccount] = useState(false)
  const [externalLoading, setExternalLoading] = useState(false)
  const [showSimulationPopup, setShowSimulationPopup] = useState(false)

  useEffect(() => {
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

  useEffect(() => {
    const fetchBanks = async () => {
      if (transferTo === "external" && banks.length === 0) {
        try {
          const response = await externalTransferApi.getBanks();
          setBanks(response.data);
          setFilteredBanks(response.data);
        } catch (error) {
          toast.error("Failed to load banks");
        }
      }
    };
    fetchBanks();
  }, [transferTo]);

  useEffect(() => {
    setFilteredBanks(
      banks.filter((bank) =>
        bank.name.toLowerCase().includes(bankSearch.toLowerCase())
      )
    );
  }, [bankSearch, banks]);

  useEffect(() => {
    if (externalReceipientAcc.length !== 10 || !externalReceipientBankCode) {
      setExternalReceipientName("");
      return;
    }

    const timer = setTimeout(async () => {
      setResolvingAccount(true);
      try {
        const response = await externalTransferApi.confirmAcc({
          account_number: externalReceipientAcc,
          bank_code: externalReceipientBankCode,
        });
        setExternalReceipientName(response.data.account_name);
      } catch (error) {
        setExternalReceipientName("");
        toast.error("Could not resolve account details");
      } finally {
        setResolvingAccount(false);
      }
    }, 600); // 600ms debounce

    return () => clearTimeout(timer);
  }, [externalReceipientAcc, externalReceipientBankCode]);

  useEffect(() => {
    if (receiverAccountNo.length !== 10) {
      setResolvedPaycoreUser(null);
      return;
    }

    const timer = setTimeout(async () => {
      setResolvingPaycore(true);
      try {
        const response = await walletApi.resolveAccount(receiverAccountNo);
        setResolvedPaycoreUser(response.data);
      } catch (error) {
        setResolvedPaycoreUser(null);
        toast.error("Paycore account not found");
      } finally {
        setResolvingPaycore(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [receiverAccountNo]);

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
    setExternalReceipientAcc("");
    setExternalReceipientBank("");
    setExternalReceipientBankCode("");
    setExternalReceipientName("");
    setResolvedPaycoreUser(null);
    setShowSimulationPopup(false);
  };

  const handleExternalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setExternalLoading(true);

    if (!wallet) {
      toast.error("Wallet not detected");
      setExternalLoading(false);
      return;
    }

    if (!externalReceipientName) {
      toast.error("Please verify recipient account");
      setExternalLoading(false);
      return;
    }

    try {
      const response = await externalTransferApi.create({
        sender_wallet_id: wallet.id,
        amount: parseFloat(amount),
        bank_code: externalReceipientBankCode,
        account_number: externalReceipientAcc,
        account_name: externalReceipientName,
        bank_name: externalReceipientBank,
        currency: wallet.currency,
      });
      setSuccess(response.data);
      setShowSimulationPopup(true);
      toast.success("External Transfer Successful");
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate external transfer");
    } finally {
      setExternalLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="p-6 md:p-10 rounded-[2.5rem] bg-bg-card border border-border-default shadow-2xl text-center">
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
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
               <div>
                 <h1 className="text-2xl font-bold text-white mb-1">Send Funds</h1>
                 <p className="text-text-secondary text-sm font-medium">Global p2p cash settlement.</p>
               </div>
               <Link href="/dashboard" className="p-2 text-text-muted hover:text-white transition-colors">
                  <ArrowLeft size={20} />
               </Link>
            </div>
            <div>
              <div className="inline-flex p-1 bg-white/[0.03] border border-border-default rounded-xl relative w-full sm:w-auto min-w-[240px]">
                {/* Sliding Background */}
                <div 
                  className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-brand rounded-lg transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 ${
                    transferTo === "paycore" ? "translate-x-0" : "translate-x-full"
                  }`}
                />
                
                {/* Tabs */}
                <button 
                  type="button"
                  onClick={() => setTransferTo("paycore")}
                  className={`flex-1 relative z-10 px-6 py-2 text-xs font-bold transition-colors duration-300 ${
                    transferTo === "paycore" ? "text-white" : "text-text-muted hover:text-white/60"
                  }`}
                >
                  Paycore
                </button>
                <button 
                  type="button"
                  onClick={() => setTransferTo("external")}
                  className={`flex-1 relative z-10 px-6 py-2 text-xs font-bold transition-colors duration-300 ${
                    transferTo === "external" ? "text-white" : "text-text-muted hover:text-white/60"
                  }`}
                >
                  External
                </button>
              </div>
            </div>
            </div>

            {transferTo === "paycore" ? (
               <div className="p-6 md:p-8 rounded-[2rem] bg-bg-card border border-border-default shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Recipient */}
                <div className="space-y-3">
                  <label htmlFor="receiverAccountNo" className="text-xs font-bold text-text-muted flex items-center justify-between">
                    <span>Recipient Account Number</span>
                    <span className="flex items-center gap-1.5 text-[10px] text-brand-light font-medium">
                      {resolvingPaycore ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Info size={12} />
                          Required
                        </>
                      )}
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                      <Wallet size={18} />
                    </div>
                    <input
                      id="receiverAccountNo"
                      type="text"
                      maxLength={10}
                      placeholder="e.g. 1029384756"
                      value={receiverAccountNo}
                      onChange={(e) => setReceiverAccountNo(e.target.value.replace(/\D/g, ''))}
                      required
                      className="w-full h-14 pl-12 pr-4 bg-white/[0.03] border border-border-default rounded-xl text-white text-sm font-medium focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all outline-none"
                    />
                  </div>
                  {resolvedPaycoreUser && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-brand/5 border border-brand/10"
                    >
                      <User size={14} className="text-brand-light" />
                      <span className="text-xs font-bold text-brand-light capitalize">{resolvedPaycoreUser.full_name.toLowerCase()}</span>
                    </motion.div>
                  )}
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
            ) : (
              <div className="p-6 md:p-8 rounded-[2rem] bg-bg-card border border-border-default shadow-xl">
                <form onSubmit={handleExternalSubmit} className="space-y-6">
                  {/* Bank Selection */}
                  <div className="space-y-3 relative">
                    <label className="text-xs font-bold text-text-muted flex items-center justify-between">
                      <span>Select Bank</span>
                      <span className="flex items-center gap-1.5 text-[10px] text-brand-light font-medium">
                        <Info size={12} />
                        Required
                      </span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <Building2 size={18} />
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)}
                        className="w-full h-14 pl-12 pr-10 bg-white/[0.03] border border-border-default rounded-xl text-white text-sm font-medium text-left focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all outline-none"
                      >
                        {externalReceipientBank || "Choose a bank"}
                      </button>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isBankDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isBankDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 top-full left-0 right-0 mt-2 bg-bg-elevated border border-border-default rounded-xl shadow-2xl overflow-hidden"
                        >
                          <div className="p-3 border-b border-border-subtle bg-white/[0.02]">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                              <input
                                type="text"
                                placeholder="Search banks..."
                                value={bankSearch}
                                onChange={(e) => setBankSearch(e.target.value)}
                                className="w-full h-10 pl-9 pr-4 bg-white/[0.03] border border-border-subtle rounded-lg text-xs text-white focus:outline-none focus:border-brand transition-colors"
                              />
                            </div>
                          </div>
                          <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
                            {filteredBanks.map((bank) => (
                              <button
                                key={bank.code}
                                type="button"
                                onClick={() => {
                                  setExternalReceipientBank(bank.name);
                                  setExternalReceipientBankCode(bank.code);
                                  setIsBankDropdownOpen(false);
                                  setBankSearch("");
                                }}
                                className="w-full px-4 py-3 text-left text-xs text-text-secondary hover:bg-white/[0.05] hover:text-white transition-colors border-b border-border-subtle last:border-0"
                              >
                                {bank.name}
                              </button>
                            ))}
                            {filteredBanks.length === 0 && (
                              <div className="px-4 py-8 text-center text-xs text-text-muted">
                                No banks found matching "{bankSearch}"
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Account Number */}
                  <div className="space-y-3">
                    <label htmlFor="externalAcc" className="text-xs font-bold text-text-muted flex items-center justify-between">
                      <span>Account Number</span>
                      {resolvingAccount && (
                        <span className="flex items-center gap-1.5 text-[10px] text-brand-light font-medium">
                          <Loader2 size={12} className="animate-spin" />
                          Verifying...
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <Wallet size={18} />
                      </div>
                      <input
                        id="externalAcc"
                        type="text"
                        maxLength={10}
                        placeholder="10 digits account number"
                        value={externalReceipientAcc}
                        onChange={(e) => setExternalReceipientAcc(e.target.value.replace(/\D/g, ''))}
                        required
                        className="w-full h-14 pl-12 pr-4 bg-white/[0.03] border border-border-default rounded-xl text-white text-sm font-medium focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all outline-none"
                      />
                    </div>
                    {externalReceipientName && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-success/5 border border-success/10"
                      >
                        <User size={14} className="text-success" />
                        <span className="text-xs font-bold text-success capitalize">{externalReceipientName.toLowerCase()}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Amount */}
                  <div className="space-y-3">
                    <label htmlFor="externalAmount" className="text-xs font-bold text-text-muted">
                      Amount ({wallet?.currency || "..."})
                    </label>
                    <div className="relative group">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-muted group-focus-within:text-brand transition-colors">
                        {wallet?.currency === 'NGN' ? '₦' : '$'}
                      </span>
                      <input
                        id="externalAmount"
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
                    <ShieldCheck size={18} className="text-cyan mt-0.5" />
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      External transfers are processed via <span className="text-white">Secure Gateway</span> and may take up to 24 hours depending on the bank.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={externalLoading || !externalReceipientName || fetchingWallet}
                    className="w-full h-14 flex items-center justify-center gap-3 bg-brand text-white text-sm font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                  >
                    {externalLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        Transfer to Bank
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
            
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

      <AnimatePresence>
        {showSimulationPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="max-w-md w-full p-8 rounded-3xl bg-bg-elevated border border-border-focus shadow-[0_0_40px_-12px_rgba(79,70,229,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-accent" />
              <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-6 mx-auto border border-brand/20">
                <Info size={32} className="text-brand-light" />
              </div>
              <h2 className="text-2xl font-black text-white text-center mb-3">Simulation Complete</h2>
              <div className="space-y-4 mb-8">
                <p className="text-sm text-text-secondary text-center leading-relaxed">
                  Your external transfer of <strong className="text-white">{success?.amount} {success?.currency}</strong> was processed successfully in the simulation engine.
                </p>
                <div className="p-4 rounded-xl bg-brand/5 border border-brand/10">
                  <p className="text-xs text-brand-light text-center leading-relaxed">
                    <strong>Note:</strong> Paycore is currently running in an external simulator mode. No real-world funds were moved to the destination bank account.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSimulationPopup(false)}
                className="w-full h-12 bg-white text-black font-bold text-sm rounded-xl hover:bg-white/90 transition-all active:scale-[0.98]"
              >
                Acknowledge
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
