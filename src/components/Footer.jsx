import React from 'react';
import { ReceiptText, Heart, ShieldCheck, Mail, Send } from 'lucide-react';

export function Footer({ setView }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                <ReceiptText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Remindr</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Automated invoice tracking and intelligent payment reminders designed for freelancers, agencies, and growing small businesses to get paid 3x faster.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-950/50 border border-indigo-800/50 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Bank-grade encryption & automated Stripe payment links</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#features" onClick={() => setView('landing')} className="hover:text-white transition-colors">Invoice Builder</a></li>
              <li><a href="#features" onClick={() => setView('landing')} className="hover:text-white transition-colors">Due Date Tracking</a></li>
              <li><a href="#features" onClick={() => setView('landing')} className="hover:text-white transition-colors">Auto Reminders</a></li>
              <li><a href="#features" onClick={() => setView('landing')} className="hover:text-white transition-colors">Pending Reports</a></li>
              <li><a href="#pricing" onClick={() => setView('landing')} className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#faq" onClick={() => setView('landing')} className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Freelancer Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-3">Get free invoicing tips & cash flow strategies every Tuesday.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Remindr Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
