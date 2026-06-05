'use client';

import { useState, useEffect } from 'react';

type Status = 'Paid' | 'Pending' | 'Overdue';
type Filter = 'All' | Status;

const STATUS_STYLES: Record<Status, string> = {
  Paid:    'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Overdue: 'bg-red-100 text-red-700',
};

const INVOICES: { id: string; client: string; description: string; amount: string; status: Status; due: string }[] = [
  { id: 'INV-0041', client: 'Bright Media Co.',  description: 'Brand identity package', amount: '$3,200', status: 'Paid',    due: 'Jun 1' },
  { id: 'INV-0040', client: 'Torres & Sons LLC', description: 'Monthly retainer',        amount: '$1,850', status: 'Pending', due: 'Jun 7' },
  { id: 'INV-0039', client: 'Vega Consulting',   description: 'Website audit',            amount: '$4,500', status: 'Paid',    due: 'May 22' },
  { id: 'INV-0038', client: 'NorthEdge Studio',  description: 'Logo redesign',            amount: '$2,100', status: 'Overdue', due: 'May 15' },
  { id: 'INV-0037', client: 'Bright Media Co.',  description: 'Social media kit',         amount: '$3,200', status: 'Paid',    due: 'May 10' },
  { id: 'INV-0036', client: 'Torres & Sons LLC', description: 'Strategy session',         amount: '$950',   status: 'Paid',    due: 'May 5' },
  { id: 'INV-0035', client: 'Alvarez Creative',  description: 'Landing page',             amount: '$2,800', status: 'Pending', due: 'Jun 12' },
  { id: 'INV-0034', client: 'Vega Consulting',   description: 'SEO report',               amount: '$1,200', status: 'Paid',    due: 'Apr 30' },
  { id: 'INV-0033', client: 'NorthEdge Studio',  description: 'Brand guidelines',         amount: '$3,600', status: 'Paid',    due: 'Apr 22' },
  { id: 'INV-0032', client: 'Bright Media Co.',  description: 'Campaign assets',          amount: '$4,100', status: 'Overdue', due: 'Apr 15' },
];

const FILTERS: Filter[] = ['All', 'Paid', 'Pending', 'Overdue'];

const INPUT_CLS = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-teal';

function EmptyState({ label }: { label: Filter }) {
  const text = label === 'All' ? 'invoices' : `${label.toLowerCase()} invoices`;
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="text-gray-300 mb-4">
        <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
        <line x1="14" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="text-gray-400 text-sm">No {text}</p>
    </div>
  );
}

export default function InvoicesPage() {
  const [filter, setFilter] = useState<Filter>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const [client, setClient] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const visible = filter === 'All' ? INVOICES : INVOICES.filter(inv => inv.status === filter);

  function handleSend() {
    setModalOpen(false);
    setClient(''); setDesc(''); setAmount(''); setDueDate('');
    setToast(true);
  }

  return (
    <div className="page-fade-in max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-display text-2xl font-bold text-brand-navy">Invoices</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-brand-teal text-white rounded-full px-5 py-2.5 font-semibold hover:bg-teal-400 transition-colors"
        >
          New Invoice
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mt-6">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              filter === f ? 'bg-brand-navy text-white' : 'text-gray-500 hover:text-brand-navy'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {['#', 'Client', 'Description', 'Amount', 'Status', 'Due Date'].map(col => (
                <th key={col} className="text-left px-6 py-3 text-gray-500 text-xs uppercase tracking-wide font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(({ id, client, description, amount, status, due }) => (
              <tr key={id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-brand-navy">{id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{client}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{description}</td>
                <td className="px-6 py-4 text-sm font-medium text-brand-navy">{amount}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>
                    {status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{due}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <EmptyState label={filter} />}
      </div>

      {/* Mobile card list */}
      <div className="md:hidden mt-6">
        {visible.length === 0 ? (
          <EmptyState label={filter} />
        ) : (
          <div className="flex flex-col">
            {visible.map(({ id, client, amount, status, due }) => (
              <div key={id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{id}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-brand-navy">{amount}</p>
                    <span className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
                      {status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">Due {due}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Invoice modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-navy transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>

            <h2 className="font-display font-bold text-xl text-brand-navy">New Invoice</h2>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">Client name</label>
                <input type="text" value={client} onChange={e => setClient(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">Description</label>
                <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={`${INPUT_CLS} pl-8`} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">Due date</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={INPUT_CLS} />
              </div>
            </div>

            <button
              onClick={handleSend}
              className="mt-6 w-full bg-brand-teal text-white rounded-full py-3 font-semibold hover:bg-teal-400 transition-colors"
            >
              Send Invoice
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-3 w-full text-gray-400 text-sm text-center hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-brand-navy text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium z-50">
          Invoice sent!
        </div>
      )}
    </div>
  );
}
