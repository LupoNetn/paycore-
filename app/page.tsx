"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import { Zap, Shield, Code, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <Hero />
      <Stats />

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light mb-4">
              Why Paycore+
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 text-balance">
              Everything you need to{" "}
              <span className="gradient-text">scale.</span>
            </h2>
            <p className="text-text-secondary max-w-xl text-lg">
              Built for speed, reliability, and security. From startups to
              enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Real-time Settlements"
              description="Move money globally with sub-second finality. No more waiting days for international transfers."
              icon={<Zap className="text-brand-light" size={28} />}
              color="brand"
            />
            <FeatureCard
              title="Developer-First API"
              description="Integration in minutes, not months. Robust documentation and SDKs for every major language."
              icon={<Code className="text-accent" size={28} />}
              color="accent"
            />
            <FeatureCard
              title="Security Infrastructure"
              description="SOC2 compliant, end-to-end encryption, and multi-signature authorization built-in."
              icon={<Shield className="text-cyan" size={28} />}
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">
                Ready to get started?
              </h2>
              <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">
                Join thousands of businesses that use Paycore+ to power their
                financial infrastructure.
              </p>
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-light transition-all shadow-xl shadow-brand/25 hover:shadow-brand/40"
              >
                Create Free Account
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
              <span className="font-black text-[10px] text-white">P+</span>
            </div>
            <span className="text-text-muted font-semibold text-sm">
              PAYCORE+
            </span>
          </div>
          <p className="text-text-dim text-sm">
            © 2026 Paycore Technologies Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-text-dim hover:text-white transition-colors text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-text-dim hover:text-white transition-colors text-sm"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-text-dim hover:text-white transition-colors text-sm"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="group bg-bg-card border border-border-subtle rounded-3xl p-8 hover:border-border-default transition-all duration-300 hover:-translate-y-1 relative overflow-hidden shadow-sm">
      <div className={`absolute top-0 left-0 w-1 h-full bg-${color} opacity-20 group-hover:opacity-100 transition-opacity`} />
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-2xl bg-${color}/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-text-secondary text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
