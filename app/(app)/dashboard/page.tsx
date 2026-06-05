'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/lib/auth/UserContext';

const STATS = [
  { value: '$24,850', label: 'Total Invoiced',    sublabel: 'This month' },
  { value: '$19,200', label: 'Collected',          sublabel: 'Payments received' },
  { value: '$5,650',  label: 'Outstanding',        sublabel: 'Awaiting payment' },
  { value: '8 days',  label: 'Avg. Payment Time', sublabel: 'Per invoice' },
];

type Status = 'Paid' | 'Pending' | 'Overdue';

const STATUS_STYLES: Record<Status, string> = {
  Paid:    'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Overdue: 'bg-red-100 text-red-700',
};

const INVOICES: { id: string; client: string; amount: string; status: Status; date: string }[] = [
  { id: 'INV-0041', client: 'Bright Media Co.',  amount: '$3,200', status: 'Paid',    date: 'Jun 1, 2026' },
  { id: 'INV-0040', client: 'Torres & Sons LLC', amount: '$1,850', status: 'Pending', date: 'May 28, 2026' },
  { id: 'INV-0039', client: 'Vega Consulting',   amount: '$4,500', status: 'Paid',    date: 'May 22, 2026' },
  { id: 'INV-0038', client: 'NorthEdge Studio',  amount: '$2,100', status: 'Overdue', date: 'May 15, 2026' },
  { id: 'INV-0037', client: 'Bright Media Co.',  amount: '$3,200', status: 'Paid',    date: 'May 10, 2026' },
];

const SHIMMER = 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-lg';

export default function DashboardPage() {
  const { user } = useUser();
  const displayName = user?.email?.split('@')[0] ?? 'there';
  const [statsReady, setStatsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page-fade-in max-w-6xl mx-auto px-6 py-8">
      {/* Greeting */}
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-navy">
          Good morning, {displayName}
        </h1>
        <p className="font-display text-gray-500 mt-1">
          Here&apos;s your financial snapshot for June 2026
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {STATS.map(({ value, label, sublabel }) => (
          <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {!statsReady ? (
              <>
                <div className={`h-9 w-24 mb-2 ${SHIMMER}`} />
                <div className={`h-4 w-28 mb-1 ${SHIMMER}`} />
                <div className={`h-3 w-20 ${SHIMMER}`} />
              </>
            ) : (
              <>
                <p className="font-display text-3xl font-bold text-brand-navy">{value}</p>
                <p className="text-gray-500 text-sm mt-1">{label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{sublabel}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Recent invoices */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl text-brand-navy">Recent Invoices</h2>
          <Link href="/invoices" className="text-brand-teal text-sm hover:underline">
            View all
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['Invoice #', 'Client', 'Amount', 'Status', 'Date'].map(col => (
                  <th key={col} className="text-left px-6 py-3 text-gray-500 text-xs uppercase tracking-wide font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INVOICES.map(({ id, client, amount, status, date }) => (
                <tr key={id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-brand-navy">{id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{client}</td>
                  <td className="px-6 py-4 text-sm font-medium text-brand-navy">{amount}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="md:hidden flex flex-col gap-3">
          {INVOICES.map(({ id, client, amount, status, date }) => (
            <div key={id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
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
              <p className="text-gray-400 text-xs mt-2">{date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/invoices"
          className="bg-brand-teal text-white rounded-full px-6 py-3 font-semibold hover:bg-teal-400 transition-colors"
        >
          New Invoice
        </Link>
        <Link
          href="/expenses"
          className="bg-white text-brand-navy border border-gray-200 rounded-full px-6 py-3 font-semibold hover:bg-gray-50 transition-colors"
        >
          Log Expense
        </Link>
      </div>
    </div>
  );
}
