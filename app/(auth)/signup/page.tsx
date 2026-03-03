"use client";

import React, { useState } from "react";
import { authApi } from "@/lib/api";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone,
  Globe,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    phone_number: "",
    nationality: "",
    country_code: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.signup(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 py-10 bg-bg-primary">
        <div className="w-full max-w-[420px] animate-fade-in-up opacity-0">
          <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} className="text-success" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Account created!</h1>
            <p className="text-text-secondary text-sm mb-8">
              Your account has been created successfully. You can now sign in.
            </p>
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-all shadow-lg shadow-brand/20"
            >
              Go to Login
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 bg-bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/3 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[460px] py-10">
        <div className="bg-bg-card border border-border-default rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-white text-xl sm:text-2xl font-black tracking-[0.2em] group-hover:text-brand transition-colors">
                PAYCORE<span className="text-brand">+</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold mb-1 text-white">Create your account</h1>
            <p className="text-text-secondary text-base">
              Join the future of high-performance finance
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-xl text-error text-sm text-center mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="full_name" className="text-sm font-medium text-text-secondary">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                <input
                  id="full_name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border-subtle rounded-xl text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-text-secondary">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border-subtle rounded-xl text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                />
              </div>
            </div>

            {/* Phone, Nationality & Country Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="country_code" className="text-sm font-medium text-text-secondary">
                  Country Code
                </label>
                <div className="relative">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                  <input
                    id="country_code"
                    type="text"
                    placeholder="NG"
                    value={formData.country_code}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border-subtle rounded-xl text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="nationality" className="text-sm font-medium text-text-secondary">
                  Nationality
                </label>
                <div className="relative">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                  <input
                    id="nationality"
                    type="text"
                    placeholder="Nigerian"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border-subtle rounded-xl text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone_number" className="text-sm font-medium text-text-secondary">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                  <input
                    id="phone_number"
                    type="tel"
                    placeholder="+234..."
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border-subtle rounded-xl text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-text-secondary">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border-subtle rounded-xl text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                />
              </div>
              <p className="text-xs text-text-dim">Minimum 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-light transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin-slow" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-white hover:text-brand-light transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
