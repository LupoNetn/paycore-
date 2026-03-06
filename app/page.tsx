"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import { ArrowRight, Terminal, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary font-sans text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />

      {/* For Users Section */}
      <section id="users" className="py-16 md:py-32 border-b border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10 md:mb-16">
            <div className="w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center mb-6 border border-white/10">
              <User size={24} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
              For everyday life. <br className="hidden md:block"/> Send, spend, and manage.
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              Paycore acts as your unified personal finance engine. Hold funds in multiple currencies, transfer instantly to peers, and pay merchants globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 border-t border-white/[0.05] pt-10 md:pt-12">
            <FeatureCard
              title="Instant Peer-to-Peer"
              description="Send money directly to other Paycore users instantly, without intermediate delays or clearing periods."
            />
            <FeatureCard
              title="Multi-Currency Wallets"
              description="Hold and manage multiple asset types natively within the app. Secure, compliant, and backed by trusted institutions."
            />
            <FeatureCard
              title="Transaction History"
              description="Keep absolute track of every cent. Searchable, filterable, and clearly formatted ledgers for your personal sanity."
            />
            <FeatureCard
              title="Bank Integrations"
              description="Deposit and withdraw to external bank accounts easily with optimized routing to ensure minimal fees."
            />
          </div>
        </div>
      </section>

      {/* For Developers Section */}
      <section id="developers" className="py-16 md:py-32 border-b border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center mb-10 md:mb-16">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center border border-brand/20">
                  <Terminal size={24} className="text-brand-light" />
                </div>
                <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-light animate-pulse" />
                  API Coming Soon
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-white">
                For developers. <br className="hidden md:block"/> Infrastructure built for scale.
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Integrate powerful financial primitives natively into your application. We provide the APIs, SDKs, and compliance framework so you can focus on building your product.
              </p>
            </div>

            <div className="lg:w-1/2 w-full">
               <div className="bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
                 <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                     <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                   </div>
                   <span className="ml-4 text-xs text-text-muted">transfer.ts</span>
                 </div>
                 <div className="p-5 text-zinc-300 overflow-x-auto leading-loose">
                   <span className="text-brand-light">import</span> {"{ Paycore }"} <span className="text-brand-light">from</span> <span className="text-green-400">'@paycore/node'</span>;<br/><br/>
                   <span className="text-text-muted">// Initialize client</span><br/>
                   <span className="text-brand-light">const</span> paycore = <span className="text-brand-light">new</span> Paycore(process.env.PAYCORE_KEY);<br/><br/>
                   <span className="text-text-muted">// Create peer transfer</span><br/>
                   <span className="text-brand-light">const</span> transfer = <span className="text-brand-light">await</span> paycore.transfers.create({"{"}<br/>
                   &nbsp;&nbsp;amount: <span className="text-orange-400">100.00</span>,<br/>
                   &nbsp;&nbsp;currency: <span className="text-green-400">'USD'</span>,<br/>
                   &nbsp;&nbsp;destinationId: <span className="text-green-400">'usr_9a8b7c6d'</span><br/>
                   {"}"});
                 </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 border-t border-white/[0.05] pt-10 md:pt-12">
            <FeatureCard
              title="RESTful API"
              description="A deeply documented, predictable API interface to programmatically generate accounts, handle ledgers, and execute transfers."
            />
            <FeatureCard
              title="Real-time Webhooks"
              description="Listen to state changes autonomously without polling. Build reactive, event-driven payment flows."
            />
            <FeatureCard
              title="Drop-in Components"
              description="Pre-built, customizable UI elements to handle the most sensitive aspects of the payment flow directly in your app."
            />
            <FeatureCard
              title="Test Environments"
              description="A robust sandbox mirroring production exactly. Safely build and test integrations against exhaustive edge cases."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-white">
            Ready to get started?
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
            Create an account instantly and start interacting with Paycore, or read our docs if you are a developer looking to integrate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors text-base"
            >
              Start for free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/docs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors text-base"
            >
              Read Docs
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
              Empowering the internet economy with robust, scalable financial infrastructure for both users and platforms.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4 text-sm">For Users</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-white transition-colors">Wallets</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Transfers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4 text-sm">For Developers</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
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
      <h3 className="text-lg font-medium text-white tracking-tight">{title}</h3>
      <p className="text-text-secondary text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
