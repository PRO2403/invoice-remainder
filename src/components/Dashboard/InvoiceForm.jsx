import React, { useState, useEffect } from 'react';
import { Save, X, PlusCircle, Trash2 } from 'lucide-react';

export function InvoiceForm({ invoice, onCancel, onSave, clients }) {
  const isEdit = Boolean(invoice);

  const [formData, setFormData] = useState({
    clientName: invoice?.clientName || '',
    clientEmail: invoice?.clientEmail || '',
    clientId: invoice?.clientId || '',
    issueDate: invoice?.issueDate || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || '',
    status: invoice?.status || 'draft',
    taxRate: invoice?.taxRate ?? 0,
    notes: invoice?.notes || '',
    items: invoice?.items?.length
      ? invoice.items
      : [{ id: Date.now(), description: '', quantity: 1, rate: 0, total: 0 }],
  });

  const [newClientName, setNewClientName] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);

  useEffect(() => {
    if (!formData.dueDate && formData.issueDate) {
      const issue = new Date(formData.issueDate);
      issue.setDate(issue.getDate() + 30);
      setFormData((prev) => ({ ...prev, dueDate: issue.toISOString().split('T')[0] }));
    }
  }, [formData.issueDate]);

  useEffect(() => {
    const itemsTotal = formData.items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0), 0);
    const taxAmount = itemsTotal * ((Number(formData.taxRate) || 0) / 100);
    const total = itemsTotal + taxAmount;

    setFormData((prev) => ({
      ...prev,
      _subtotal: itemsTotal,
      _taxAmount: taxAmount,
      _total: total,
    }));
  }, [formData.items, formData.taxRate]);

  const updateItem = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        (item.id === id)
          ? { ...item, [field]: value, total: (field === 'quantity' ? value : item.quantity) * (field === 'rate' ? value : item.rate) }
          : item
      ),
    }));
  };

  const addItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { id: Date.now() + Math.random(), description: '', quantity: 1, rate: 0, total: 0 }],
    }));
  };

  const removeItemRow = (id) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const selectClient = (client) => {
    setFormData((prev) => ({
      ...prev,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
    }));
    setShowAddClient(false);
  };

  const handleCreateClient = () => {
    if (!newClientName.trim()) return alert('Please enter a name');
    const newClient = {
      id: 'cli-new-' + Date.now(),
      name: newClientName,
      contactName: '',
      email: '',
      phone: '',
      address: '',
      totalInvoiced: 0,
      outstanding: 0,
    };

    // In a real app we would update the parent client list directly
    setFormData((prev) => ({
      ...prev,
      clientId: newClient.id,
      clientName: newClient.name,
      clientEmail: newClient.email,
    }));
    setNewClientName('');
    setShowAddClient(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName) return alert('Please select or enter a client name.');
    if (!formData.dueDate) return alert('Please set a due date.');
    if (formData.items.some((it) => !it.description)) return alert('Please fill out all item descriptions.');

    const payload = {
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientId: formData.clientId,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      status: formData.status,
      taxRate: Number(formData.taxRate),
      subtotal: formData._subtotal,
      taxAmount: formData._taxAmount,
      amount: formData._total,
      notes: formData.notes,
      items: formData.items,
      remindersSent: invoice?.remindersSent || 0,
      lastReminderDate: invoice?.lastReminderDate || null,
      autoReminderEnabled: invoice?.autoReminderEnabled ?? true,
      paidDate: invoice?.paidDate || null,
    };

    onSave(payload);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {isEdit ? 'Edit Invoice ' + invoice.id : 'Create New Invoice'}
        </h2>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Client</label>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {clients.map((cl) => (
              <button
                key={cl.id}
                type="button"
                onClick={() => selectClient(cl)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  formData.clientId === cl.id
                    ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200'
                    : 'bg-slate-900/70 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cl.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowAddClient(!showAddClient)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium bg-amber-600/10 border border-amber-500/30 text-amber-400 hover:bg-amber-700/20 transition-all"
            >
              + Add New Client
            </button>
          </div>

          {showAddClient && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-900/70 border border-slate-700 text-slate-300">
              <input
                type="text"
                placeholder="New client name"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleCreateClient}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold"
              >
                Create
              </button>
            </div>
          )}

          <div className="mt-3">
            <input
              type="text"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <input
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            className="bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
          />
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Line Items</label>
          <div className="space-y-3">
            {formData.items.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-[1fr,80px,100px,100px,40px] gap-3 items-center bg-slate-900/70 rounded-xl p-3 border border-slate-800">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className="bg-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                  className="bg-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                />
                <input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                  className="bg-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                />
                <div className="text-right font-mono text-white">${((Number(item.quantity) || 0) * (Number(item.rate) || 0)).toFixed(2)}</div>
                <button type="button" onClick={() => removeItemRow(item.id)} className="text-rose-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addItemRow} className="mt-3 text-indigo-400 text-sm font-medium">+ Add Line Item</button>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-800">
          <button type="submit" className="px-7 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm">Save</button>
        </div>
      </form>
    </div>
  );
}
