'use client';

import React from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Archive, Search, FileText, Download, ShieldCheck } from 'lucide-react';

const ARCHIVE_RECORDS = [
  { id: 'ARC-2025-Q4-01', title: 'NCRB Annual Benchmark Ledger 2025', date: '2025-12-31', records: '3,842,104', provenance: 'VERIFIED' },
  { id: 'ARC-2025-Q3-04', title: 'Delhi Police Annual Security Audit', date: '2025-09-30', records: '142,800', provenance: 'VERIFIED' },
  { id: 'ARC-2025-Q2-11', title: 'Mumbai South Port Safety Review', date: '2025-06-30', records: '98,420', provenance: 'VERIFIED' },
  { id: 'ARC-2025-Q1-09', title: 'Bangalore Tech Corridor Special Report', date: '2025-03-31', records: '64,120', provenance: 'PERIODIC' },
];

export default function ArchivePage() {
  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
        
        {/* Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              HISTORIC CASE VAULT
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Archived Intelligence Records
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-2xl mt-1">
              Immutable vault containing past NCRB benchmark ledgers, annual security audits, and sealed case files.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-verified">
              <ShieldCheck size={14} />
              IMMUTABLE VAULT
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="ledger-panel rounded border border-hairline bg-paper-raised overflow-hidden font-mono text-xs">
          <div className="p-4 border-b border-hairline bg-paper/60 flex items-center justify-between">
            <h3 className="font-sans font-bold text-ink uppercase tracking-wider">Archived Benchmark Files</h3>
            <span className="text-[10px] text-ink-soft">4 RECORDS FOUND</span>
          </div>

          <table className="w-full text-left">
            <thead className="border-b border-hairline text-[10px] text-ink-soft uppercase tracking-wider bg-paper/30">
              <tr>
                <th className="px-5 py-3 font-semibold">Archive ID</th>
                <th className="px-5 py-3 font-semibold font-sans">Title</th>
                <th className="px-5 py-3 font-semibold">Date Sealed</th>
                <th className="px-5 py-3 font-semibold">Incident Count</th>
                <th className="px-5 py-3 font-semibold">Provenance</th>
                <th className="px-5 py-3 font-semibold text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {ARCHIVE_RECORDS.map((rec) => (
                <tr key={rec.id} className="hover:bg-paper/50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-cobalt">{rec.id}</td>
                  <td className="px-5 py-3.5 font-sans font-bold text-ink">{rec.title}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{rec.date}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{rec.records}</td>
                  <td className="px-5 py-3.5">
                    <span className="stamp-badge stamp-verified">{rec.provenance}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="text-cobalt hover:underline font-bold flex items-center gap-1 ml-auto">
                      <Download size={14} />
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </LedgerShell>
  );
}
