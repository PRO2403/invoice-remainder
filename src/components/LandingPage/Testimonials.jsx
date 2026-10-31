import React from 'react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      quote:
        "Remindr completely fixed our unpaid invoice backlog. Clients receive courteous automated email reminders, and our average payment time dropped from 32 days to 8 days!",
      author: "Samantha Reed",
      role: "Creative Director",
      company: "Vivid Agency",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      quote:
        "Before Remindr, sending followups felt uncomfortable and ate up my Fridays. Now, invoices record instantly, reminders trigger seamlessly, and payments land in Stripe automatically.",
      author: "Michael Chang",
      role: "Fullstack Freelance Engineer",
      company: "DevCraft Studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
    {
      quote:
        "The pending-payment reports give our executive board crystal clear visibility into our cash flow pipeline. We export monthly CSV summaries directly for accounting.",
      author: "Elena Rostova",
      role: "Operations VP",
      company: "BrightDesign Co",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-indigo-400 font-semibold text-xs uppercase tracking-wider bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
            Trusted by 5,000+ Businesses
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by freelancers & growing agencies worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl relative"
            >
              <Quote className="w-8 h-8 text-indigo-500/30 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{rev.quote}"</p>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-800/80 pt-4">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <div>
                  <div className="font-bold text-white text-sm">{rev.author}</div>
                  <div className="text-xs text-indigo-400">{rev.role}, {rev.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
