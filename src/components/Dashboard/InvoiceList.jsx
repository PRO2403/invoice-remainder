import React, { useState } from 'react';
import { format, parseISO, isAfter, isBefore, startOfToday, isWithinInterval, addDays } from 'date-fns';
import {
  Search,
  Filter,
  PlusCircle,
  Edit3,
  ExternalLink,
  Trash2,
  FileText,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  Send,
} from 'lucide-react';

export function InvoiceList({ invoices, onAddInvoice, onEditInvoice, onUpdateInvoices }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilter, setShowFilter] = useState(false);

  const today = startOfToday();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5 text-amber-400" />;
      case 'overdue':
        return <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'overdue':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-400/10 text-slate-400 border-slate-400/20';
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMarkPaid = (inv) => {
    const updated = invoices.map((i) =>
      i.id === inv.id
        ? { ...i, status: 'paid', paidDate: format(today, 'yyyy-MM-dd') }
        : i
    );
    onUpdateInvoices('invoices', updated);
  };

  const handleSendReminder = (inv) => {
    const updated = invoices.map((i) =>
      i.id === inv.id
        ? {
            ...i,
            remindersSent: (i.remindersSent || 0) + 1,
            lastReminderDate: format(today, 'yyyy-MM-dd'),
          }
        : i
    );
    onUpdateInvoices('invoices', updated);
    alert(`Manual reminder sent to ${inv.clientName} for ${inv.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      const updated = invoices.filter((i) => i.id !== id);
      onUpdateInvoices('invoices', updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">All Invoices</h2>
          <p className="text-sm text-slate-400 mt-0.5">{filteredInvoices.length} of {invoices.length} invoices</p>
        </div>
        <button
          onClick={onAddInvoice}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Record Invoice</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search clients or invoice #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-sm font-medium transition-all"
          >
            <Filter className="w-4 h-4" />
            <span>Filter: {statusFilter === 'all' ? 'All' : statusFilter}</span>
          </button>

          {showFilter && (
            <div className="absolute z-20 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-xl">
              {['all', 'pending', 'overdue', 'paid', 'draft'].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setStatusFilter(val);
                    setShowFilter(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 transition-colors capitalize"
                >
                  {val === 'all' ? 'All Statuses' : val}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950">
              <th className="text-left py-3 px-4 font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Invoice
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Client
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Due Date
              </th>
              <th className="text-right py-3 px-4 font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Amount
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Status
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Reminders
              </th>
              <th className="text-center py-3 px-4 font-semibold text-slate-400 uppercase tracking-wider text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-slate-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                  <p>No invoices found.</p>
                  <button
                    onClick={onAddInvoice}
                    className="mt-3 text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Record your first invoice
                  </button>
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => {
                const due = parseISO(inv.dueDate);
                let daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
                let dueDateLabel = format(due, 'PP');

                if (inv.status === 'overdue') {
                  dueDateLabel += ` (${Math.abs(daysUntilDue)} days ago)`;
                } else if (daysUntilDue === 0) {
                  dueDateLabel = `${format(due, 'PP')} (Due today)`;
                } else if (daysUntilDue > 0) {
                  dueDateLabel = `${format(due, 'PP')} (in ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''})`;
                }

                return (
                  <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono text-indigo-400 font-medium">{inv.id}</div>
                      {inv.notes && (
                        <div className="text-xs text-slate-500 mt-1 truncate max-w-[220px]" title={inv.notes}>
                          {inv.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{inv.clientName}</div>
                      <div className="text-xs text-slate-400">{inv.clientEmail}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{dueDateLabel}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-white">${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(inv.status)}`}
                      >
                        {getStatusIcon(inv.status)}
                        <span className="capitalize">{inv.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {inv.remindersSent > 0 && inv.lastReminderDate ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-indigo-400" />
                          <span>{inv.remindersSent} sent ({format(new Date(inv.lastReminderDate), 'PP')})</span>
                        </div>
                      ) : (
                        <span className="text-slate-500">0 sent</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onEditInvoice(inv)}
                          title="Edit invoice"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {(inv.status === 'pending' || inv.status === 'overdue') && (
                          <button
                            onClick={() => handleSendReminder(inv)}
                            title="Send manual reminder"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-all"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        {inv.status !== 'paid' && (
                          <button
                            onClick={() => handleMarkPaid(inv)}
                            title="Mark as paid"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(inv.id)}
                          title="Delete invoice"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
