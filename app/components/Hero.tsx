"use client";

import Link from "next/link";
import { ArrowRight, Code } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-20 bg-bg-primary">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Sleek Pill */}
        <div className="mb-10 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-brand-light animate-pulse" />
          Paycore is now open for everyone
        </div>

        {/* Dual Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-6 sm:mb-8 text-white leading-tight">
          Financial power, <br className="hidden sm:block" />
          <span className="text-text-secondary">for people and platforms.</span>
        </h1>

        {/* Inclusive Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-text-secondary mb-12">
          Whether you're seamlessly managing your personal finances or building the next generation of fintech applications, Paycore is your unified engine for moving money.
        </p>

        {/* Split Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            Open an Account
            <ArrowRight size={16} />
          </Link>
          <div className="hidden sm:block w-[1px] h-10 bg-white/10" />
          <Link
            href="/developer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            <Code size={16} />
            Start Building
          </Link>
        </div>

        {/* Audience row */}
        <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row gap-4 sm:gap-12 text-sm text-text-muted justify-center border-t border-white/10 pt-8 sm:pt-10 w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <span className="text-white font-medium">For Users:</span> Instant Transfers & Wallets
          </div>
          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <span className="text-white font-medium">For Devs:</span> RESTful API & Webhooks
          </div>
        </div>
      </div>
    </section>
  );
}
