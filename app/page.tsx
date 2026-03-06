"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary font-sans text-white selection:bg-white/20 selection:text-white">
      <Navbar />
      <Hero />
      <Stats />

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 border-b border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 mt-12 text-white">
              Financial infrastructure <br className="hidden md:block"/> built for scale.
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              We bring together everything that's required to build websites and apps that accept payments and send payouts globally. Robust, fast, and relentlessly reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <FeatureCard
              title="Global Payments"
              description="Accept payments online, in person, and around the world with a payments solution built for any business model."
            />
            <FeatureCard
              title="Revenue and Finance"
              description="Automate your revenue and finance operations to collect more revenue and reduce costs securely."
            />
            <FeatureCard
              title="Banking as a Service"
              description="Embed financial services in your platform or marketplace. Give your customers a way to hold funds."
            />
            <FeatureCard
              title="Custom Checkout"
              description="Design a checkout flow that perfectly matches your brand with our highly customizable drop-in UI components."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-white">
            Ready to get started?
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
            Create an account instantly and start accepting payments, or contact us to design a custom package for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors text-base"
            >
              Start now
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors text-base"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.05] bg-bg-primary">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center mb-6">
              <span className="font-bold text-xs text-black">P+</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Empowering the internet economy with robust, scalable financial infrastructure.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4 text-sm">Products</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-white transition-colors">Payments</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terminal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Connect</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4 text-sm">Developers</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/[0.05] pt-8">
           <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Paycore. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-text-muted">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col gap-3">
      <div className="w-10 h-10 rounded border border-white/10 flex items-center justify-center bg-white/[0.02] mb-2" />
      <h3 className="text-lg font-medium text-white tracking-tight">{title}</h3>
      <p className="text-text-secondary text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
