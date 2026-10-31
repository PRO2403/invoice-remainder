import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How do automatic payment reminders work?',
      a: 'When you record an invoice, you assign a due date. Remindr automatically schedules polite reminder emails (or SMS) based on your chosen rule sequence—for example, 3 days before due, on the due date, and 3 days overdue. Each reminder contains a direct payment link so clients can pay instantly.',
    },
    {
      q: 'Can I customize the wording of reminder emails?',
      a: 'Yes! You have full control over reminder templates. You can customize subject lines and message body using dynamic tokens like {client_name}, {invoice_id}, {amount_due}, and {payment_link} to match your brand tone.',
    },
    {
      q: 'Can I stop automatic reminders if a client pays by bank transfer?',
      a: 'Absolutely. Once an invoice is marked as "Paid" (either automatically via Stripe/PayPal integration or manually with one click), all queued future reminders for that invoice are immediately cancelled.',
    },
    {
      q: 'What kind of pending payment reports are generated?',
      a: 'Remindr generates real-time reports detailing total outstanding receivables, overdue aging breakdowns (1-15 days, 16-30 days, 30+ days overdue), monthly collection velocity, and client payment reliability scores. Reports can be exported directly as CSV or PDF.',
    },
    {
      q: 'Can I import my existing client list and past invoices?',
      a: 'Yes, you can import clients via CSV or create them directly in the dashboard. Our intuitive interface lets you set up past or recurring invoices in seconds.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full text-left p-6 flex items-center justify-between font-semibold text-white text-base hover:text-indigo-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-400 transition-transform duration-200 ${
                    openIdx === idx ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
