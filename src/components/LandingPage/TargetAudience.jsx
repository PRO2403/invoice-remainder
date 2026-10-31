import React from 'react';
import { User, Briefcase, Building2, CheckCircle2, ArrowUpRight } from 'lucide-react';

export function TargetAudience({ onGetStarted }) {
  const audiences = [
    {
      title: 'Freelancers & Solo Pros',
      icon: User,
      color: 'from-blue-500 to-indigo-600',
      tag: 'For Independent Designers, Devs & Consultants',
      description:
        'Focus on doing great client work instead of feeling like an awkward debt collector. Set up automatic reminders that sound polite and professional.',
      benefits: [
        'Get paid 14 days faster on average',
        'Pre-designed professional invoice templates',
        'Stripe payment link directly in email reminders',
        'Zero manual followup emails needed',
      ],
    },
    {
      title: 'Digital Agencies',
      icon: Briefcase,
      color: 'from-purple-500 to-pink-600',
      tag: 'For Design, Marketing & Dev Agencies',
      description:
        'Keep multi-project client retainers on schedule. Maintain healthy agency cash flow and predictable recurring revenue month after month.',
      benefits: [
        'Manage 50+ client billing schedules',
        'Multi-user team permissions & audit logs',
        'Custom white-label reminder branding',
        'Detailed client risk & payment history',
      ],
    },
    {
      title: 'Small Businesses',
      icon: Building2,
      color: 'from-emerald-500 to-teal-600',
      tag: 'For Local Services, B2B Vendors & Contractors',
      description:
        'Eliminate outstanding receivables that bottleneck business operations. Streamline accounting reports for tax season effortlessly.',
      benefits: [
        'Detailed pending-payment aging reports',
        'Exportable CSV & PDF financial summaries',
        'Automated late fee structure option',
        'Multi-channel Email + SMS reminders',
      ],
    },
  ];

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-indigo-400 font-semibold text-xs uppercase tracking-wider bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
            Tailored Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed specifically for your business workflow
          </h2>
          <p className="text-slate-400 text-base">
            Whether you send 2 invoices a month or 200, Remindr scales with your business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${aud.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold mb-2">{aud.tag}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{aud.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{aud.description}</p>

                  <ul className="space-y-3 border-t border-slate-800 pt-6 mb-8">
                    {aud.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onGetStarted}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 font-medium text-xs border border-slate-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore for {aud.title.split(' ')[0]}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
