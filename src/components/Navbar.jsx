import React from 'react';
import { ReceiptText, ArrowRight, LayoutDashboard, Sparkles, LogOut, ShieldCheck } from 'lucide-react';

export function Navbar({ view, setView, isLoggedIn, setIsLoggedIn }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setView('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <ReceiptText className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent tracking-tight">
              Remindr
            </span>
            <span className="text-xs block text-indigo-400 font-medium tracking-wide">
              Auto Invoicing & Reminders
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => setView('landing')}
            className={`hover:text-indigo-400 transition-colors ${view === 'landing' && !isLoggedIn ? 'text-indigo-400' : ''}`}
          >
            Overview
          </button>
          <a href="#features" onClick={() => setView('landing')} className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#how-it-works" onClick={() => setView('landing')} className="hover:text-indigo-400 transition-colors">How It Works</a>
          <a href="#pricing" onClick={() => setView('landing')} className="hover:text-indigo-400 transition-colors">Pricing</a>
          <a href="#faq" onClick={() => setView('landing')} className="hover:text-indigo-400 transition-colors">FAQ</a>
        </nav>

        {/* Actions / Auth Status */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView('dashboard')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md ${
                  view === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-300" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setView('landing');
                }}
                title="Sign out"
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/80 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setView('dashboard');
                }}
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setView('dashboard');
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
