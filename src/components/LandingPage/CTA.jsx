import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export function CTA({ onGetStarted }) {
  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950 border border-indigo-700/80 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Get Paid On Time, Every Time</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to eliminate late invoice payments forever?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Join thousands of freelancers, agencies, and small businesses using Remindr to record invoices, track due dates, send automatic payment reminders, and analyze pending reports.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-2xl shadow-indigo-600/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            <span>Launch Interactive App Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>14-day free trial • No credit card required • Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
