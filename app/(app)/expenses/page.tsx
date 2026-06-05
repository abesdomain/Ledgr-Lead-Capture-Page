'use client';

import { useState, useEffect } from 'react';

type Category = 'Software' | 'Meals' | 'Office' | 'Equipment' | 'Travel' | 'Other';

const CATEGORY_STYLES: Record<Category, string> = {
  Software:  'bg-blue-100 text-blue-700',
  Meals:     'bg-orange-100 text-orange-700',
  Office:    'bg-purple-100 text-purple-700',
  Equipment: 'bg-teal-100 text-teal-700',
  Travel:    'bg-yellow-100 text-yellow-700',
  Other:     'bg-gray-100 text-gray-700',
};

const EXPENSES: { date: string; description: string; category: Category; amount: string }[] = [
  { date: 'Jun 3',  description: 'Adobe Creative Cloud',      category: 'Software',  amount: '$54.99' },
  { date: 'Jun 1',  description: 'Client lunch — Torres',     category: 'Meals',     amount: '$87.50' },
  { date: 'May 29', description: 'Notion Pro',                category: 'Software',  amount: '$16.00' },
  { date: 'May 27', description: 'Home office supplies',      category: 'Office',    amount: '$134.00' },
  { date: 'May 24', description: 'Google Workspace',          category: 'Software',  amount: '$12.00' },
  { date: 'May 20', description: 'Zoom Pro',                  category: 'Software',  amount: '$15.99' },
  { date: 'May 18', description: 'Client dinner — Vega',      category: 'Meals',     amount: '$212.00' },
  { date: 'May 15', description: 'External hard drive',       category: 'Equipment', amount: '$89.00' },
];

const SUMMARY = [
  { label: 'This Month',     amount: '$1,840' },
  { label: 'Last Month',     amount: '$2,310' },
  { label: 'Tax Deductible', amount: '$1,560' },
];

const CATEGORIES: Category[] = ['Software', 'Meals', 'Office', 'Equipment', 'Travel', 'Other'];

const INPUT_CLS = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:border-brand-teal';

export default function ExpensesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);

  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<Category>('Software');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function handleSave() {
    setModalOpen(false);
    setDesc(''); setCategory('Software'); setAmount(''); setDate('');
    setToast(true);
  }

  return (
    <div className="page-fade-in max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-display text-2xl font-bold text-brand-navy">Expenses</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-brand-teal text-white rounded-full px-5 py-2.5 font-semibold hover:bg-teal-400 transition-colors"
        >
          Add Expense
        </button>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {SUMMARY.map(({ label, amount }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="font-display text-2xl font-bold text-brand-navy">{amount}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {['Date', 'Description', 'Category', 'Amount'].map(col => (
                <th key={col} className="text-left px-6 py-3 text-gray-500 text-xs uppercase tracking-wide font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EXPENSES.map(({ date, description, category, amount }) => (
              <tr key={`${date}-${description}`} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500">{date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{description}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_STYLES[category]}`}>
                    {category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-brand-navy">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden mt-6 flex flex-col">
        {EXPENSES.map(({ date, description, category, amount }) => (
          <div key={`${date}-${description}`} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-brand-navy">{description}</p>
                <p className="text-gray-400 text-xs mt-0.5">{date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-brand-navy">{amount}</p>
                <span className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-medium ${CATEGORY_STYLES[category]}`}>
                  {category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Expense modal */}
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

            <h2 className="font-display font-bold text-xl text-brand-navy">Add Expense</h2>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">Description</label>
                <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as Category)}
                  className={INPUT_CLS}
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={`${INPUT_CLS} pl-8`} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className={INPUT_CLS} />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-brand-teal text-white rounded-full py-3 font-semibold hover:bg-teal-400 transition-colors"
            >
              Save Expense
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
          Expense saved!
        </div>
      )}
    </div>
  );
}
