import React from 'react';
import {
  FilePlus,
  CalendarDays,
  BellRing,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  Receipt,
  Mail,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export function FeatureShowcase({ onGetStarted }) {
  const features = [
    {
      id: 'record-invoices',
      title: 'Records New Invoices',
      subtitle: 'Create professional invoices in under 60 seconds',
      description:
        'Build and issue custom, itemized invoices with automated tax calculation, payment links (Stripe, PayPal), client database synchronization, and instant PDF/print export.',
      icon: FilePlus,
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20',
      badge: 'Invoice Creation',
      points: [
        'Multi-currency & custom line items',
        'Automatic client email delivery',
        'Direct Stripe & PayPal payment buttons',
        'Downloadable branded PDF receipts',
      ],
      previewContent: (
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs text-slate-400">Invoice #</div>
              <div className="font-bold text-white text-base">INV-2026-008</div>
            </div>
            <div className="text-right">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
                Draft Ready
              </span>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Website Redesign & Figma Wireframes (40 hrs)</span>
              <span className="font-semibold text-white">$5,000.00</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Frontend React Integration & API Setup</span>
              <span className="font-semibold text-white">$2,500.00</span>
            </div>
            <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
              <span>Tax (10%)</span>
              <span>$750.00</span>
            </div>
            <div className="flex justify-between text-slate-100 font-bold text-sm pt-1">
              <span>Total Payable</span>
              <span className="text-indigo-400">$8,250.00</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'track-due-dates',
      title: 'Tracks Payment Due Dates',
      subtitle: 'Visual timelines & real-time overdue alerts',
      description:
        'Never lose track of who owes what. Stay organized with intelligent due-date calendars, color-coded urgency badges, and proactive alerts before payments become past due.',
      icon: CalendarDays,
      color: 'from-purple-500 to-pink-600',
      shadow: 'shadow-purple-500/20',
      badge: 'Due Date Engine',
      points: [
        'Interactive calendar & list views',
        'Color-coded urgency status badges',
        'Days-remaining real-time countdowns',
        'Proactive early warnings before due dates',
      ],
      previewContent: (
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-5 space-y-3">
          <div className="flex justify-between text-xs font-medium text-slate-400 border-b border-slate-800 pb-2">
            <span>Upcoming Due Dates</span>
            <span>Countdown</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-amber-500/30">
              <span className="font-medium text-slate-200">Apex Marketing Agency</span>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-semibold">
                Due in 3 Days
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-rose-500/30">
              <span className="font-medium text-slate-200">Acme Software Corp</span>
              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded font-semibold">
                5 Days Overdue
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'auto-reminders',
      title: 'Sends Automatic Payment Reminders',
      subtitle: 'Friendly multi-step reminder sequences that work',
      description:
        'Set up personalized reminder workflows triggered automatically before, on, and after due dates via Email and SMS. Gentle phrasing keeps client relationships strong while securing payments faster.',
      icon: BellRing,
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20',
      badge: 'Automated Messaging',
      points: [
        'Customizable email & SMS templates',
        'Automated multi-step sequence triggers',
        'Placeholder tags ({client_name}, {payment_link})',
        'Detailed delivery log & open tracking',
      ],
      previewContent: (
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-5 space-y-3 text-xs">
          <div className="flex items-center justify-between bg-indigo-950/60 border border-indigo-800/60 p-2.5 rounded-xl text-indigo-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold">Auto-Trigger Sequence</span>
            </div>
            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5 border border-slate-700">
            <div className="text-slate-400 font-mono text-[11px]">Subject: Payment Due Today - Invoice #INV-2026-003</div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              "Hi Marcus, just a friendly reminder that invoice #INV-2026-003 ($3,200) is due today. Pay securely in one click..."
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'pending-reports',
      title: 'Generates Pending-Payment Reports',
      subtitle: 'Complete visibility over outstanding revenue & aging',
      description:
        'Understand your financial health with actionable pending-payment reports, overdue aging buckets (1-15, 16-30, 30+ days), client risk profiles, and one-click CSV/PDF financial export.',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
      badge: 'Financial Analytics',
      points: [
        'Overdue aging breakdown charts',
        'Collection velocity & average payout speed',
        'Client delinquency risk scores',
        'One-click CSV & PDF report downloads',
      ],
      previewContent: (
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Pending Revenue Aging</span>
            <span className="text-emerald-400 font-bold">$14,500 Total</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>1-15 Days Overdue ($11,300)</span>
                <span>78%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[78%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>16-30 Days Overdue ($3,200)</span>
                <span>22%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[22%]" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950 border border-indigo-800/80 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Complete End-to-End Invoice Platform</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built to handle every stage of your payment cycle
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Stop losing hours each week manually checking bank accounts and typing awkward reminder emails. Remindr does it automatically.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg ${item.shadow} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-indigo-300 font-medium text-sm mb-4">{item.subtitle}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>

                  <ul className="space-y-2.5 mb-8">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Live Preview Card */}
                <div>{item.previewContent}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
          >
            <span>Try All Features Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
