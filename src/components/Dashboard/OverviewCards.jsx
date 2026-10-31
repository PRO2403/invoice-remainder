import React from 'react';
import { DollarSign, Clock, AlertTriangle, CheckCircle, PlusCircle, ArrowUpRight, TrendingUp } from 'lucide-react';

export function OverviewCards({ stats, onOpenInvoices, onAddInvoice }) {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-700/40">
        <div>
          <h2 className="text-2xl font-bold text-white">Payment Reminder Command Center</h2>
          <p className="text-sm text-slate-300 mt-1">
            Tracking receivables, scheduling automated reminders, and monitoring pending cash flow.
          </p>
        </div>
        <button
          onClick={onAddInvoice}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Record New Invoice</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Outstanding</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">${stats.totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-indigo-300 mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Across all open invoices</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Overdue Balance</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-400">${stats.totalOverdue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          <div className="text-xs text-rose-300 mt-2 flex items-center gap-1">
            <span>{stats.overdueCount} invoices past due date</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Pending (Due Soon)</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-400">{stats.pendingCount} Invoices</div>
          <div className="text-xs text-amber-300 mt-2">
            Automated reminders active
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Avg Collection Rate</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-400">92.4%</div>
          <div className="text-xs text-emerald-300 mt-2 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>+18% since automated reminders</span>
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Need to bill a client?</h3>
          <p className="text-sm text-slate-400">
            Create an invoice with itemized services, automated tax, and payment instructions. Remindr will automatically handle tracking due dates and following up.
          </p>
          <button
            onClick={onAddInvoice}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors"
          >
            <span>Record invoice now</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">View Outstanding & Overdue Invoices</h3>
          <p className="text-sm text-slate-400">
            Check payment due dates, manually trigger instant reminders, or mark received wire transfers as paid.
          </p>
          <button
            onClick={onOpenInvoices}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors"
          >
            <span>Go to invoice management</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
