import React, { useState } from 'react';
import { Save, User, Mail, Bell, Shield } from 'lucide-react';

export function SettingsView({ data, setData }) {
  const [settings, setSettings] = useState({
    businessName: 'My Freelance Studio',
    email: 'hello@studio.com',
    currency: 'USD',
    taxRate: 10,
    autoReminders: true,
  });

  const saveSettings = () => {
    // In a real app, send to backend
    alert('Settings saved!');
  };

  return (
    <div className="max-w-3xl space-y-8">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Business Name</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({...settings, businessName: e.target.value})}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-slate-800">
          <div>
            <div className="font-semibold text-white">Automated Reminders</div>
            <div className="text-sm text-slate-400">Enable automatic reminders for all pending invoices</div>
          </div>
          <button
            onClick={() => setSettings({...settings, autoReminders: !settings.autoReminders})}
            className={`w-12 h-6 rounded-full transition-colors ${settings.autoReminders ? 'bg-indigo-600' : 'bg-slate-700'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform m-1 ${settings.autoReminders ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        <button
          onClick={saveSettings}
          className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
