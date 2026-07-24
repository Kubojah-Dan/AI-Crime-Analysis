'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { ShieldAlert, Filter, Clock, MapPin, CheckCircle2, UserCheck, Eye, Search, Layers, ArrowUpRight } from 'lucide-react';
import { PRIORITY_ALERT_QUEUE, PriorityAlert } from '@/data/indian-public-safety';

export default function UnifiedTriageQueuePage() {
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQueue = PRIORITY_ALERT_QUEUE.filter(item => {
    const matchesSev = filterSeverity === 'ALL' || item.severity === filterSeverity;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSev && matchesSearch;
  });

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Page Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              OPERATIONAL INGEST & EMERGENCY TRIAGE BUS
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Unified Command Triage Queue
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-3xl mt-1">
              Multi-channel emergency intake combining 112 calls, CCTV anomaly triggers, ALPR hit matches, and field officer mobile reports with SLA timers.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="stamp-badge stamp-live flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse"></span>
              {filteredQueue.length} ACTIVE ALERTS IN QUEUE
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Filter size={14} className="text-cobalt" />
            <span className="font-bold text-ink uppercase">Severity Filter:</span>
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterSeverity(s)}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                  filterSeverity === s ? 'bg-cobalt text-white shadow-sm' : 'bg-paper text-ink-soft hover:text-ink border border-hairline'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search size={13} className="absolute left-3 top-2.5 text-ink-soft" />
            <input 
              type="text"
              placeholder="Search queue..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-paper border border-hairline rounded pl-8 pr-3 py-1.5 text-xs text-ink outline-none focus:border-cobalt"
            />
          </div>
        </div>

        {/* Queue Table */}
        <div className="ledger-panel rounded border border-hairline bg-paper-raised overflow-hidden shadow-sm">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-hairline bg-paper/60 text-[10px] text-ink-soft uppercase">
              <tr>
                <th className="p-4 font-bold">Alert / Incident</th>
                <th className="p-4 font-bold">Location & Beat</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Severity</th>
                <th className="p-4 font-bold">SLA Timer</th>
                <th className="p-4 font-bold">Confidence</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredQueue.map(item => (
                <tr key={item.id} className="hover:bg-paper/40 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-ink text-sm">{item.title}</div>
                    <div className="text-[10px] text-cobalt">{item.case_id} • Age {item.age}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-sans text-xs text-ink font-bold">{item.location}</div>
                    <div className="text-[10px] text-ink-soft">{item.beat}</div>
                  </td>
                  <td className="p-4 text-ink-soft">{item.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.severity === 'CRITICAL' ? 'bg-rust/10 text-rust border border-rust/30' : 'bg-cobalt/10 text-cobalt border border-cobalt/30'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-rust">{item.sla_timer}</td>
                  <td className="p-4 font-bold text-stamp-green">{item.confidence_pct}%</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/ops/replay/${item.case_id}`}
                      className="py-1.5 px-3 rounded bg-cobalt text-white font-bold text-[10px] uppercase hover:bg-cobalt-dark inline-flex items-center gap-1 shadow-sm"
                    >
                      Replay & Triage
                      <ArrowUpRight size={12} />
                    </Link>
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
