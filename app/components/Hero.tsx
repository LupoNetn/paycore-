"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Activity, Shield, Globe, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 bg-bg-primary">
      {/* Very subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-bg-primary to-bg-primary pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Sleek Pill */}
        <Link 
          href="/changelog" 
          className="mb-10 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm text-text-secondary"
        >
          <span className="flex items-center gap-1.5 text-white font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-light animate-pulse" />
            API v2 Live
          </span>
          <span className="w-[1px] h-3 bg-white/20" />
          <span>Read the announcement</span>
          <ChevronRight size={14} />
        </Link>

        {/* Minimal Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tight mb-8 text-white leading-tight">
          Payments for <br className="hidden sm:block" />
          <span className="text-text-secondary">developers.</span>
        </h1>

        {/* Minimal Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-text-secondary mb-12">
          A powerful, unified API to move money globally. Built for speed, reliability, and unparalleled developer experience.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            Start building
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            Read the docs
          </Link>
        </div>

        {/* Ultra-simple features row */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 border-t border-white/10 pt-12 w-full text-left">
           {[
             { icon: Zap, title: "Lowest Latency", desc: "Built for speed" },
             { icon: Shield, title: "Bank-Grade", desc: "SOC2 & PCI Compliant" },
             { icon: Globe, title: "Global Reach", desc: "135+ Currencies" },
             { icon: Activity, title: "99.999% Uptime", desc: "Reliability first" }
           ].map((item, i) => (
             <div key={i} className="flex flex-col gap-3">
                <item.icon size={20} className="text-brand-light" />
                <div>
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-text-muted mt-1">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
