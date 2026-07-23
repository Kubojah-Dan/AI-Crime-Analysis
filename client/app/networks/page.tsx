'use client';

import React from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Activity, CheckCircle2, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

const NETWORKS_DATA = [
  {
    name: 'San Francisco CAD 911 Dispatch (Tier 1)',
    type: 'Live Dispatch Stream',
    coverage: 'SF City & County',
    cadence: '10 min rolling',
    provenance: 'LIVE',
    stampClass: 'stamp-live',
    status: 'CONNECTED',
    lastSync: '2026.07.21 15:40:00 UTC',
  },
  {
    name: 'Seattle Real-Time Fire 911 (Tier 1)',
    type: 'Live Emergency Calls',
    coverage: 'Seattle Metro',
    cadence: '5 min rolling',
    provenance: 'LIVE',
    stampClass: 'stamp-live',
    status: 'CONNECTED',
    lastSync: '2026.07.21 15:42:00 UTC',
  },
  {
    name: 'NCRB Crime in India Database (Tier 2)',
    type: 'Official Benchmark',
    coverage: 'All Indian States & UTs',
    cadence: 'Daily Sync',
    provenance: 'VERIFIED',
    stampClass: 'stamp-verified',
    status: 'CONNECTED',
    lastSync: '2026.07.21 10:00:00 UTC',
  },
  {
    name: 'data.gov.in Open Data Bulletins (Tier 2)',
    type: 'State Police Bulletins',
    coverage: 'Delhi, Mumbai, Bangalore',
    cadence: 'Daily 05:00',
    provenance: 'VERIFIED',
    stampClass: 'stamp-verified',
    status: 'CONNECTED',
    lastSync: '2026.07.21 05:00:00 UTC',
  },
  {
    name: 'Chicago Crimes Data API (Tier 2)',
    type: 'Verified Incident Logs',
    coverage: 'Chicago City',
    cadence: 'Daily (-7d holdout)',
    provenance: 'VERIFIED',
    stampClass: 'stamp-verified',
    status: 'CONNECTED',
    lastSync: '2026.07.21 04:00:00 UTC',
  },
  {
    name: 'LAPD NIBRS Offenses & Victims (Tier 3)',
    type: 'Biweekly Reports',
    coverage: 'Los Angeles Metro',
    cadence: 'Biweekly',
    provenance: 'PERIODIC',
    stampClass: 'stamp-periodic',
    status: 'SYNCING',
    lastSync: '2026.07.15 12:00:00 UTC',
  },
  {
    name: 'FBI Crime Data Explorer (Tier 4)',
    type: 'National Benchmark',
    coverage: 'US National',
    cadence: 'Monthly (+3m lag)',
    provenance: 'PERIODIC',
    stampClass: 'stamp-periodic',
    status: 'CONNECTED',
    lastSync: '2026.07.01 00:00:00 UTC',
  },
  {
    name: 'Open-Meteo Atmospheric Context (Enrichment)',
    type: 'Weather & Spatial Feed',
    coverage: 'Global / Regional',
    cadence: 'Hourly Live',
    provenance: 'LIVE',
    stampClass: 'stamp-live',
    status: 'CONNECTED',
    lastSync: '2026.07.21 15:00:00 UTC',
  },
];

export default function NetworksPage() {
  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
        
        {/* Page Title Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              DATA PIPELINE INVENTORY
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Ingestion Networks
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-2xl mt-1">
              Monitors live CAD feeds, daily police bulletins, and periodic benchmarks. Every record lands with an immutable provenance stamp.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-verified flex items-center gap-1">
              <ShieldCheck size={14} />
              ALL PROVENANCE AUDITED
            </span>
          </div>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised">
            <div className="text-[10px] text-ink-soft uppercase tracking-wider mb-1">Connected Feeds</div>
            <div className="font-serif font-bold text-2xl text-ink">8 / 8</div>
          </div>

          <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised">
            <div className="text-[10px] text-ink-soft uppercase tracking-wider mb-1">Live Feeds</div>
            <div className="font-serif font-bold text-2xl text-cobalt">3 Active</div>
          </div>

          <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised">
            <div className="text-[10px] text-ink-soft uppercase tracking-wider mb-1">Degraded / Syncing</div>
            <div className="font-serif font-bold text-2xl text-ochre">1 Syncing</div>
          </div>
        </div>

        {/* Data Table */}
        <div className="ledger-panel rounded border border-hairline bg-paper-raised overflow-hidden">
          <div className="p-4 border-b border-hairline bg-paper/60 flex items-center justify-between font-mono text-xs">
            <h3 className="font-sans font-bold text-ink uppercase tracking-wider">Public Safety Data Sources</h3>
            <span className="text-[10px] text-ink-soft">LIVE MONITORING</span>
          </div>

          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-hairline text-[10px] text-ink-soft uppercase tracking-wider bg-paper/30">
              <tr>
                <th className="px-5 py-3 font-semibold">Network Name</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Coverage</th>
                <th className="px-5 py-3 font-semibold">Cadence</th>
                <th className="px-5 py-3 font-semibold">Provenance</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {NETWORKS_DATA.map((net, idx) => (
                <tr key={idx} className="hover:bg-paper/50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-ink">{net.name}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{net.type}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{net.coverage}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{net.cadence}</td>
                  <td className="px-5 py-3.5">
                    <span className={`stamp-badge ${net.stampClass}`}>{net.provenance}</span>
                  </td>
                  <td className="px-5 py-3.5 font-bold">
                    <span className={net.status === 'CONNECTED' ? 'text-stamp-green' : 'text-ochre'}>
                      {net.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-ink-soft">{net.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </LedgerShell>
  );
}
