import React, { useState } from 'react';
import {
  Send,
  Bell,
  PlusCircle,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Mail,
  MessageSquare,
  Clock,
  History,
  CheckCircle,
  XCircle,
  BarChart3,
} from 'lucide-react';

export function ReminderCenter({ rules, logs, data, setData }) {
  const [activeTab, setActiveTab] = useState('rules');
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [ruleForm, setRuleForm] = useState({});

  const openNewRule = () => {
    setEditingRule(null);
    setRuleForm({
      title: '',
      triggerDays: 3,
      type: 'before_due',
      channels: ['Email'],
      enabled: true,
      subject: 'Payment Reminder: Invoice #{invoice_id}',
      template: 'Hi {client_name},\n\nThis is a reminder that invoice {invoice_id} for {amount_due} is due {due_date}. You can pay here: {payment_link}\n\nThank you!',
    });
    setShowRuleForm(true);
  };

  const editRule = (rule) => {
    setEditingRule(rule);
    setRuleForm({ ...rule });
    setShowRuleForm(true);
  };

  const saveRule = () => {
    if (!ruleForm.title.trim()) {
      return alert('Please enter a rule title.');
    }

    const newRule = {
      ...ruleForm,
      id: editingRule ? editingRule.id : 'rule-' + (rules.length + 1),
      triggerDays: Number(ruleForm.triggerDays),
      channels: Array.isArray(ruleForm.channels) ? ruleForm.channels : [ruleForm.channels],
    };

    let updatedRules;
    if (editingRule) {
      updatedRules = rules.map((r) => (r.id === editingRule.id ? newRule : r));
    } else {
      updatedRules = [...rules, newRule];
    }

    setData('reminderRules', updatedRules);
    setShowRuleForm(false);
    setEditingRule(null);
  };

  const toggleRule = (id) => {
    const updated = rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
    setData('reminderRules', updated);
  };

  const deleteRule = (id) => {
    if (window.confirm('Delete this automation rule?')) {
      setData('reminderRules', rules.filter((r) => r.id !== id));
    }
  };

  const simulateSendReminder = (invoiceId) => {
    const invoice = data.invoices.find((i) => i.id === invoiceId);
    if (!invoice) return;

    const newLog = {
      id: 'log-' + Date.now(),
      invoiceId,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      type: 'Manual Trigger Test',
      channel: 'Email',
      sentAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Delivered',
    };

    setData('reminderLogs', [newLog, ...logs]);
    alert(`Reminder simulated for ${invoice.clientName} (${invoice.id}).`);
  };

  if (showRuleForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {editingRule ? 'Edit Automation Rule' : 'Create New Automation Rule'}
          </h2>
          <button
            onClick={() => {
              setShowRuleForm(false);
              setEditingRule(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all"
          >
            Back to Rules
          </button>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300">Rule Title</label>
              <input
                type="text"
                value={ruleForm.title}
                onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
                placeholder="e.g. 'Final Overdue Notice'"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300">Trigger Days</label>
              <select
                value={ruleForm.type}
                onChange={(e) => setRuleForm({ ...ruleForm, type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white mb-2"
              >
                <option value="before_due">Before Due Date</option>
                <option value="on_due">On Due Date</option>
                <option value="after_due">After Due Date</option>
              </select>
              <input
                type="number"
                value={ruleForm.triggerDays}
                onChange={(e) => setRuleForm({ ...ruleForm, triggerDays: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">Email Subject</label>
            <input
              type="text"
              value={ruleForm.subject}
              onChange={(e) => setRuleForm({ ...ruleForm, subject: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">Message Template</label>
            <textarea
              value={ruleForm.template}
              onChange={(e) => setRuleForm({ ...ruleForm, template: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white h-40 resize-none font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setShowRuleForm(false);
                setEditingRule(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all"
            >
              Cancel
            </button>
            <button
              onClick={saveRule}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              {editingRule ? 'Update Rule' : 'Create Rule'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Reminder Center</h2>
          <p className="text-sm text-slate-400 mt-1">
            Configure automated payment reminder rules & review delivery history.
          </p>
        </div>
        <button
          onClick={openNewRule}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-md shadow-indigo-600/30 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Rule</span>
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap bg-slate-900 p-2 rounded-xl border border-slate-800">
        {[
          { key: 'rules', label: 'Automation Rules' },
          { key: 'logs', label: 'Delivery History' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'rules' && (
        <div className="space-y-5">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`bg-slate-900/80 border rounded-2xl p-5 transition-all ${
                rule.enabled
                  ? 'border-indigo-700/50'
                  : 'border-slate-800 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">{rule.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className="p-1.5 rounded-lg text-indigo-400 bg-indigo-500/10"
                  >
                    {rule.enabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => editRule(rule)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase text-slate-400">
                <th className="py-2">Timestamp</th>
                <th className="py-2">Client</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map((log) => (
                <tr key={log.id} className="text-white">
                  <td className="py-3 text-slate-300">{log.sentAt}</td>
                  <td className="py-3">{log.clientName}</td>
                  <td className="py-3 text-emerald-400">{log.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
