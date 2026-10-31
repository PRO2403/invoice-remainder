import React, { useState } from 'react';
import { Check, Sparkles, Zap } from 'lucide-react';

export function Pricing({ onGetStarted }) {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Freelancer',
      priceMonthly: 15,
      priceAnnual: 12,
      description: 'Ideal for solo freelancers and independent contractors getting started.',
      features: [
        'Up to 20 active invoices/mo',
        'Automated Email reminders',
        'Payment due date calendar',
        'Stripe & PayPal integration',
        'Basic pending payment reports',
        'Standard email support',
      ],
      popular: false,
      cta: 'Start Free Trial',
    },
    {
      name: 'Agency & Growth',
      priceMonthly: 39,
      priceAnnual: 29,
      description: 'Perfect for growing teams, agencies, and businesses with multiple clients.',
      features: [
        'Unlimited active invoices',
        'Automated Email + SMS reminders',
        'Custom white-label branding & domain',
        'Overdue aging analysis & analytics',
        'CSV & PDF financial exports',
        'Multi-currency support',
        'Priority 24/7 support',
      ],
      popular: true,
      cta: 'Start 14-Day Free Trial',
    },
    {
      name: 'Small Business Pro',
      priceMonthly: 79,
      priceAnnual: 59,
      description: 'Advanced features, dedicated workflows, and custom SLA for established vendors.',
      features: [
        'Everything in Agency plan',
        'Dedicated account manager',
        'Automated phone call reminders (AI)',
        'Custom API & Webhook integrations',
        'Advanced client risk scoring',
        '99.9% Uptime SLA',
      ],
      popular: false,
      cta: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-indigo-400 font-semibold text-xs uppercase tracking-wider bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
            Simple Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Predictable plans that pay for themselves
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            One overdue invoice collected 5 days faster covers your entire annual subscription.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 bg-slate-800 rounded-full p-1 border border-slate-700 transition-colors focus:outline-none"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md transform transition-transform ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-slate-400'} flex items-center gap-1.5`}>
              <span>Annual</span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/80 transform md:-translate-y-2'
                  : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-xs mb-6 min-h-[36px]">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    ${annual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-slate-400 text-sm">/month</span>
                  {annual && <span className="text-xs text-indigo-400 font-medium ml-1">billed yearly</span>}
                </div>

                <ul className="space-y-3 border-t border-slate-800 pt-6 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onGetStarted}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
