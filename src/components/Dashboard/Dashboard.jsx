import React, { useState } from 'react';
import { LayoutDashboard, FileText, Send, BarChart2, Settings, Users, Menu, X, BellDot, ReceiptText } from 'lucide-react';

import { OverviewCards } from './OverviewCards';
import { InvoiceList } from './InvoiceList';
import { InvoiceForm } from './InvoiceForm';
import { Clients } from './Clients';
import { PendingReports } from './PendingReports';
import { ReminderCenter } from './ReminderCenter';
import { SettingsView } from './SettingsView';

const navItems = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'invoices', label: 'Invoices', icon: FileText },
  { key: 'clients', label: 'Clients', icon: Users },
  { key: 'reminders', label: 'Reminder Center', icon: Send },
  { key: 'reports', label: 'Pending Reports', icon: BarChart2 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const sectionTitles = {
  overview: 'Dashboard Overview',
  invoices: 'All Invoices',
  add_invoice: 'New Invoice',
  edit_invoice: 'Edit Invoice',
  clients: 'Clients',
  reminders: 'Reminder Center',
  reports: 'Pending Payment Reports',
  settings: 'Settings',
};

export function Dashboard({
  data,
  setData,
  activeSection,
  setActiveSection,
  mobileNavOpen,
  setMobileNavOpen,
  onBackToLanding,
}) {
  const [editingInvoice, setEditingInvoice] = useState(null);

  const openAddInvoice = (inv = null) => {
    setEditingInvoice(inv || null);
    setActiveSection(inv ? 'edit_invoice' : 'add_invoice');
  };

  const closeForm = () => {
    setEditingInvoice(null);
    setActiveSection('invoices');
  };

  // Compute derived data for overview stats
  const allInvoices = data.invoices;
  const totalOutstanding = allInvoices
    .filter((i) => i.status === 'pending' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = allInvoices
    .filter((i) => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);
  const pendingCount = allInvoices.filter((i) => i.status === 'pending').length;
  const overdueCount = allInvoices.filter((i) => i.status === 'overdue').length;

  const stats = {
    totalOutstanding,
    totalOverdue,
    pendingCount,
    overdueCount,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Mobile sidebar backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 md:relative top-0 left-0 h-screen w-72 sm:w-64 bg-slate-900/80 border-r border-slate-800 flex flex-col transition-transform duration-200 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <ReceiptText className="w-5 h-5 text-indigo-400" />
            Remindr
          </div>
          <button
            onClick={() => setMobileNavOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveSection(item.key);
                  setMobileNavOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-left rounded-xl transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border-l-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-3">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/70 text-slate-300 hover:text-white text-sm font-medium transition-all"
          >
            <ReceiptText className="w-4 h-4" />
            <span>Back to Landing</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white capitalize">
              {sectionTitles[activeSection] || activeSection}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all">
              <BellDot className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                U
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-300">User</span>
            </div>
          </div>
        </header>

        {/* Page Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {(() => {
              switch (activeSection) {
                case 'overview':
                  return <OverviewCards stats={stats} onOpenInvoices={() => setActiveSection('invoices')} onAddInvoice={() => openAddInvoice()} />;
                case 'invoices':
                  return <InvoiceList invoices={data.invoices} onAddInvoice={() => openAddInvoice()} onEditInvoice={openAddInvoice} onUpdateInvoices={setData} />;
                case 'add_invoice':
                  return <InvoiceForm onCancel={closeForm} onSave={(inv) => { setData('invoices', [...data.invoices, { ...inv, id: 'INV-' + (data.invoices.length + 1), remindersSent: 0, lastReminderDate: null, autoReminderEnabled: true }]); closeForm(); }} clients={data.clients} />;
                case 'edit_invoice':
                  return <InvoiceForm invoice={editingInvoice} onCancel={closeForm} onSave={(inv) => { const others = data.invoices.filter(i => i.id !== editingInvoice.id); setData('invoices', [...others, { ...inv, id: editingInvoice.id, clientId: editingInvoice.clientId, clientName: editingInvoice.clientName, clientEmail: editingInvoice.clientEmail, remindersSent: editingInvoice.remindersSent, lastReminderDate: editingInvoice.lastReminderDate, autoReminderEnabled: editingInvoice.autoReminderEnabled }]); closeForm(); }} clients={data.clients} />;
                case 'clients':
                  return <Clients clients={data.clients} invoices={data.invoices} />;
                case 'reminders':
                  return <ReminderCenter rules={data.reminderRules} logs={data.reminderLogs} data={data} setData={setData} />;
                case 'reports':
                  return <PendingReports invoices={data.invoices} clients={data.clients} rules={data.reminderRules} logs={data.reminderLogs} />;
                case 'settings':
                  return <SettingsView data={data} setData={setData} />;
                default:
                  return <OverviewCards stats={stats} />;
              }
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}
