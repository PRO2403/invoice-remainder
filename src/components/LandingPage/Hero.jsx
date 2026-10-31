import React from 'react';
import { ArrowRight, CheckCircle2, Clock, MailCheck, Shield, Sparkles, TrendingUp, Zap } from 'lucide-react';

export function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-slate-900">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Automated Cash Flow Engine for Modern Teams</span>
            <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">New v2 font</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Never chase unpaid invoices <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">ever again.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Automate your billing cycle from creation to collection. Record invoices, track due dates, send gentle automated reminders, and view pending payment analytics in one place.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
            >
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Live Interactive App</span>
            </button>
          </div>

          {/* Micro Trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Setup in under 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Stripe & PayPal ready</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Hero Preview Component */}
        <div className="mt-16 relative max-w-5xl mx-auto rounded-3xl border border-slate-700/70 bg-slate-800/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-indigo-950/50">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-400 font-mono">remindr-app.io/dashboard/live-preview</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Auto-Reminder Engine Active</span>
            </div>
          </div>

          {/* Mock KPI cards inside hero */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900/90 border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-xs text-slate-400 font-medium">Total Pending Invoices</div>
              <div className="text-2xl font-bold text-white mt-1">$14,500.00</div>
              <div className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 3 Invoices pending payment
              </div>
            </div>
            <div className="bg-slate-900/90 border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-xs text-slate-400 font-medium">Overdue Amount</div>
              <div className="text-2xl font-bold text-rose-400 mt-1">$11,300.00</div>
              <div className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Auto reminders sent today
              </div>
            </div>
            <div className="bg-slate-900/90 border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-xs text-slate-400 font-medium">Collected This Month</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">$14,400.00</div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +38% faster payout avg
              </div>
            </div>
          </div>

          {/* Sample Table Mock */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-700/60 overflow-hidden text-sm">
            <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700/60 font-semibold text-xs text-slate-300 uppercase tracking-wider flex justify-between items-center">
              <span>Recent Invoice Status & Auto-Schedule</span>
              <span className="text-indigo-400 lowercase font-normal">showing simulated automated activity</span>
            </div>
            <div className="divide-y divide-slate-800">
              <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Acme Software Corp (INV-2026-001)</div>
                    <div className="text-xs text-slate-400">Due 5 days ago ($4,500.00)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    5 Days Overdue
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-lg">
                    <MailCheck className="w-3.5 h-3.5" />
                    <span>Reminder Sent</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Apex Marketing Agency (INV-2026-003)</div>
                    <div className="text-xs text-slate-400">Due in 3 days ($3,200.00)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    Due Soon
                  </span>
                  <span className="text-xs text-slate-400">Scheduled for Tomorrow 9 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
