import React from 'react';
import { User, Mail, Phone, MapPin, DollarSign } from 'lucide-react';

export function Clients({ clients, invoices }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Clients</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => {
          const clientInvoices = invoices.filter((i) => i.clientId === client.id);
          const totalInvoiced = clientInvoices.reduce((sum, i) => sum + i.amount, 0);
          const outstanding = clientInvoices
            .filter((i) => i.status === 'pending' || i.status === 'overdue')
            .reduce((sum, i) => sum + i.amount, 0);

          return (
            <div key={client.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="font-bold text-lg text-white">{client.name}</div>
                <div className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">{client.id}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-400 mb-6">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {client.email}</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {client.phone}</div>
                <div className="flex items-center gap-2 col-span-2"><MapPin className="w-4 h-4" /> {client.address}</div>
              </div>
              <div className="flex gap-4 border-t border-slate-800 pt-4">
                <div>
                  <div className="text-xs text-slate-500 uppercase">Total Invoiced</div>
                  <div className="font-bold text-white">${totalInvoiced.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Outstanding</div>
                  <div className="font-bold text-rose-400">${outstanding.toFixed(2)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
