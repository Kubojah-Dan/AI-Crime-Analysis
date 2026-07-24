'use client';

import React from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Cpu, ShieldCheck, Activity, AlertTriangle, CheckCircle2, RefreshCw, BarChart3, Database, Lock } from 'lucide-react';

export default function ModelGovernancePage() {
  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              TRUSTWORTHY AI & GOVERNANCE CONSOLE (NIST COMPLIANCE)
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Model Governance & AI Health
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-3xl mt-1">
              Monitors model latency, false-alert rates, analyst override metrics, regional drift indicators, and data pipeline health.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-verified flex items-center gap-1">
              <ShieldCheck size={14} />
              LEVEL-5 ADMIN AUDIT LOG ACTIVE
            </span>
          </div>
        </div>

        {/* Traffic Light Model Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
          
          <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised space-y-2 shadow-sm">
            <div className="text-[10px] text-ink-soft uppercase font-bold">Model Latency (p95)</div>
            <div className="font-serif font-bold text-2xl text-stamp-green">182 ms</div>
            <div className="text-[10px] text-stamp-green">✓ WITHIN SLA TARGET (&lt; 500ms)</div>
          </div>

          <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised space-y-2 shadow-sm">
            <div className="text-[10px] text-ink-soft uppercase font-bold">False Alert Rate</div>
            <div className="font-serif font-bold text-2xl text-cobalt">4.2%</div>
            <div className="text-[10px] text-cobalt">OPTIMAL PRECISION</div>
          </div>

          <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised space-y-2 shadow-sm">
            <div className="text-[10px] text-ink-soft uppercase font-bold">Analyst Override Rate</div>
            <div className="font-serif font-bold text-2xl text-ochre">8.6%</div>
            <div className="text-[10px] text-ochre">HUMAN-IN-THE-LOOP ACTIVE</div>
          </div>

          <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised space-y-2 shadow-sm">
            <div className="text-[10px] text-ink-soft uppercase font-bold">Regional Drift Indicator</div>
            <div className="font-serif font-bold text-2xl text-stamp-green">0.02</div>
            <div className="text-[10px] text-stamp-green">LOW DRIFT DETECTED</div>
          </div>

        </div>

        {/* AI Model Inventory & Health Status */}
        <div className="ledger-panel rounded border border-hairline bg-paper-raised p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
              <Cpu size={16} className="text-cobalt" />
              Deployed Model Pipeline Inventory
            </div>
            <span className="font-mono text-[10px] text-ink-soft uppercase font-bold">AUDIT TIMESTAMP: 2026-07-24 UTC</span>
          </div>

          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-hairline text-[10px] text-ink-soft uppercase bg-paper/60">
              <tr>
                <th className="p-3">Model Name</th>
                <th className="p-3">Version / Provider</th>
                <th className="p-3">Task Scope</th>
                <th className="p-3">Precision / F1</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="p-3 font-bold text-ink">CrimeRisk-v2.3</td>
                <td className="p-3 text-ink-soft">Groq Llama 3.3 70B</td>
                <td className="p-3 text-ink-soft">Explainable Copilot Narratives</td>
                <td className="p-3 font-bold text-stamp-green">94.8% F1</td>
                <td className="p-3 text-right">
                  <span className="stamp-badge stamp-live">ACTIVE</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-ink">SpatialDensity-v1.8</td>
                <td className="p-3 text-ink-soft">Zoho QuickML Engine</td>
                <td className="p-3 text-ink-soft">Hotspot Contour Risk Scoring</td>
                <td className="p-3 font-bold text-stamp-green">91.2% F1</td>
                <td className="p-3 text-right">
                  <span className="stamp-badge stamp-verified">HEALTHY</span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-ink">Neo4jLinker-v4</td>
                <td className="p-3 text-ink-soft">Cypher Graph Engine</td>
                <td className="p-3 text-ink-soft">Cross-System Entity Resolution</td>
                <td className="p-3 font-bold text-cobalt">96.4% Precision</td>
                <td className="p-3 text-right">
                  <span className="stamp-badge stamp-verified">HEALTHY</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </LedgerShell>
  );
}
