import React, { useState } from 'react';
import {
  FileText,
  Download,
  CalendarDays,
  Users,
  DollarSign,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart,
  FileDown,
  RefreshCw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

export function PendingReports({ invoices, clients, rules, logs }) {
  const [activeTab, setActiveTab] = useState('aging');

  const overdueInvoices = invoices.filter((i) => i.status === 'overdue');
  const pendingInvoices = invoices.filter((i) => i.status === 'pending');
  const paidInvoices = invoices.filter((i) => i.status === 'paid');

  const totalOutstanding = [...pendingInvoices, ...overdueInvoices].reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = overdueInvoices.reduce((sum, i) => sum + i.amount, 0);
  const totalPending = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const agingBuckets = overdueInvoices.reduce(
    (acc, inv) => {
      const due = new Date(inv.dueDate);
      const daysOverdue = Math.floor((today - due) / (1000 * 60 * 60 * 24));
      if (daysOverdue <= 15) acc['1-15'] += inv.amount;
      else if (daysOverdue <= 30) acc['16-30'] += inv.amount;
      else acc['30+'] += inv.amount;
      return acc;
    },
    { '1-15': 0, '16-30': 0, '30+': 0 }
  );

  const clientOverdue = {};
  overdueInvoices.forEach((inv) => {
    clientOverdue[inv.clientId] = (clientOverdue[inv.clientId] || 0) + inv.amount;
  });

  const clientRisk = clients
    .filter((c) => clientOverdue[c.id])
    .map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      overdueAmount: clientOverdue[c.id],
      riskScore: Math.min(clientOverdue[c.id] / 500, 10),
    }))
    .sort((a, b) => b.overdueAmount - a.overdueAmount);

  const agingChartData = [
    { range: '1-15 Days', amount: agingBuckets['1-15'] },
    { range: '16-30 Days', amount: agingBuckets['16-30'] },
    { range: '30+ Days', amount: agingBuckets['30+'] },
  ];

  const COLORS = ['#f59e0b', '#f97316', '#ef4444'];

  const velocityData = [
    { day: 'Mon', sent: 3, collected: 2100 },
    { day: 'Tue', sent: 5, collected: 4500 },
    { day: 'Wed', sent: 4, collected: 3200 },
    { day: 'Thu', sent: 6, collected: 6800 },
    { day: 'Fri', sent: 7, collected: 8000 },
    { day: 'Sat', sent: 2, collected: 1200 },
    { day: 'Sun', sent: 1, collected: 500 },
  ];

  const pendingByInvoice = [...pendingInvoices, ...overdueInvoices].sort(
    (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
  );

  const tabs = [
    { key: 'aging', label: 'Aging Breakdown', icon: BarChart3 },
    { key: 'clients', label: 'Client Risk Scores', icon: Users },
    { key: 'velocity', label: 'Collection Velocity', icon: PieChart },
    { key: 'list', label: 'Pending Ledger', icon: FileText },
  ];

  const handleExportCSV = () => {
    const headers = ['Invoice #', 'Client', 'Amount', 'Due Date', 'Status'];
    const rows = pendingByInvoice.map((inv) => [
      inv.id,
      `"${inv.clientName}"`,
      inv.amount.toFixed(2),
      inv.dueDate,
      inv.status,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pending-payments-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Pending Payment Reports & Aging</h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time financial visibility into unpaid invoices, overdue barrels, and collection velocity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <FileDown className="w-4 h-4" />
            <span>Export Pending CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Pending & Overdue</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">${totalOutstanding.toFixed(2)}</div>
          <div className="text-xs text-indigo-300 mt-1">
            {pendingInvoices.length} pending + {overdueInvoices.length} overdue
          </div>
        </div>

        <div className="bg-slate-900/80 border border-rose-500/30 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Overdue Risk Amount</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-400">${totalOverdue.toFixed(2)}</div>
          <div className="text-xs text-rose-300 mt-1">
            {overdueInvoices.length} invoices past due
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Current Pending (On Track)</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-400">${totalPending.toFixed(2)}</div>
          <div className="text-xs text-amber-300 mt-1">
            Scheduled reminders queued
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap bg-slate-900 p-2 rounded-xl border border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        {activeTab === 'aging' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-2">Overdue Aging Breakdown</h3>
            <p className="text-xs text-slate-400 mb-6">Categorizes delinquent receivables by how many days they have been overdue.</p>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agingChartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="range" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={(val) => `$${val}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}
                    formatter={(val) => [`$${val.toFixed(2)}`, 'Balance']}
                  />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {agingChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                <div className="text-xs text-amber-400 font-semibold mb-1">1-15 DAYS OVERDUE</div>
                <div className="text-xl font-bold text-white">${agingBuckets['1-15'].toFixed(2)}</div>
                <div className="text-xs text-slate-400 mt-1">Friendly auto-reminders triggering</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-orange-500/30">
                <div className="text-xs text-orange-400 font-semibold mb-1">16-30 DAYS OVERDUE</div>
                <div className="text-xl font-bold text-white">${agingBuckets['16-30'].toFixed(2)}</div>
                <div className="text-xs text-slate-400 mt-1">Urgent payment notices active</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30">
                <div className="text-xs text-rose-400 font-semibold mb-1">30+ DAYS CRITICAL</div>
                <div className="text-xl font-bold text-white">${agingBuckets['30+'].toFixed(2)}</div>
                <div className="text-xs text-slate-400 mt-1">Direct call or escalation advised</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Client Delinquency Risk Profile</h3>
            <p className="text-xs text-slate-400 mb-6">Identifies which clients hold the largest share of unpaid debt.</p>
            <div className="space-y-3">
              {clientRisk.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800 gap-3"
                >
                  <div>
                    <div className="font-semibold text-white">{client.name}</div>
                    <div className="text-xs text-slate-400">{client.email}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-xs text-slate-400">Overdue Balance</div>
                      <div className="font-bold text-rose-400">${client.overdueAmount.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Risk Score</div>
                      <div className="font-bold text-amber-400">{client.riskScore.toFixed(1)} / 10</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'velocity' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-2">Collection Velocity & Recovery Rate</h3>
            <p className="text-xs text-slate-400 mb-6">Correlation between automated reminder deliveries and daily cash collection.</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="sent" name="Reminders Sent" stroke="#818cf8" strokeWidth={2} />
                  <Line type="monotone" dataKey="collected" name="Recovered ($)" stroke="#34d399" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">Complete Pending Invoices Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-400">
                    <th className="py-2.5">Invoice</th>
                    <th className="py-2.5">Client</th>
                    <th className="py-2.5">Due Date</th>
                    <th className="py-2.5 text-right">Amount</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {pendingByInvoice.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-800/40">
                      <td className="py-3 font-mono text-indigo-400">{inv.id}</td>
                      <td className="py-3 text-white">{inv.clientName}</td>
                      <td className="py-3 text-slate-300">{inv.dueDate}</td>
                      <td className="py-3 text-right font-mono text-white">${inv.amount.toFixed(2)}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${
                            inv.status === 'overdue'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
