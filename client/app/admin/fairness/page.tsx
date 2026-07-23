'use client';

import React from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { ShieldCheck, Lock, AlertTriangle, Eye, CheckCircle2, UserCheck } from 'lucide-react';

const ETHICS_PRINCIPLES = [
  {
    title: "Area-Level Scoring Only",
    desc: "Outputs rank geographic sectors and 24-hour time windows. The platform contains zero individual profiling algorithms and never predicts actions of named persons.",
    status: "ENFORCED",
  },
  {
    title: "Mandatory Human-in-the-Loop Review Gate",
    desc: "No AI recommendation is actioned automatically. Every patrol flag, anomaly alert, or briefing require explicit analyst confirmation and sign-off.",
    status: "ENFORCED",
  },
  {
    title: "Block-Level Address Masking",
    desc: "Public safety records are geocoded to the block or sector level. Exact private residential addresses are masked at ingestion to preserve privacy.",
    status: "ENFORCED",
  },
  {
    title: "Historical Underreporting Awareness",
    desc: "The platform displays persistent disclaimers indicating that incident counts reflect official police reports, not absolute ground-truth victimization.",
    status: "ENFORCED",
  },
];

const AUDIT_TRAIL = [
  { id: 'AUD-8821', actor: 'Officer 902', action: 'human_gate_flag_patrol', resource: 'CASE: NY-8821', timestamp: '2026.07.21 15:42:01' },
  { id: 'AUD-8819', actor: 'Analyst 404', action: 'export_stratus_pdf', resource: 'REPORT: Aegis-2026-Q3-DEL', timestamp: '2026.07.21 14:10:22' },
  { id: 'AUD-8815', actor: 'System Auto', action: 'ingest_tier1_cad_dispatch', resource: 'FEED: SF_DISPATCH_99', timestamp: '2026.07.21 14:00:00' },
  { id: 'AUD-8810', actor: 'Director J. Vance', action: 'approve_shift_brief', resource: 'BRIEF: Stratos-v4', timestamp: '2026.07.21 08:00:00' },
];

export default function EthicsFairnessPage() {
  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
        
        {/* Page Title */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              GOVERNANCE & AUDIT TRAIL
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Ethics, Bias & Human Review Gate
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-2xl mt-1">
              Provides complete transparency into data provenance, algorithmic guardrails, human review gates, and immutable audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-verified">
              <ShieldCheck size={14} />
              ETHICS GUIDELINES VERIFIED
            </span>
          </div>
        </div>

        {/* Core Ethics Disclaimer Box */}
        <div className="ledger-panel rounded p-6 border border-cobalt/40 bg-cobalt/5 space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-cobalt uppercase text-sm">
            <Lock size={16} />
            DECISION-SUPPORT POSITIONING STATEMENT
          </div>
          <p className="text-ink leading-relaxed font-sans">
            AegisIQ is designed strictly as a <strong className="font-mono text-cobalt">human-in-the-loop decision-support platform</strong> for crime intelligence.
            It unifies public incident datasets, detects spatial-temporal anomalies, and assists tactical planning with mandatory analyst oversight.
            The system <span className="underline">never engages in autonomous policing</span> or individual profiling.
          </p>
        </div>

        {/* Ethics Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ETHICS_PRINCIPLES.map((item, idx) => (
            <div key={idx} className="ledger-panel rounded p-5 border border-hairline bg-paper-raised flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-hairline pb-2 mb-3">
                  <h3 className="font-serif font-bold text-sm text-ink">{item.title}</h3>
                  <span className="stamp-badge stamp-verified text-[9px]">{item.status}</span>
                </div>
                <p className="font-sans text-xs text-ink-soft leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Log Table */}
        <div className="ledger-panel rounded border border-hairline bg-paper-raised overflow-hidden">
          <div className="p-4 border-b border-hairline bg-paper/60 flex items-center justify-between font-mono text-xs">
            <h3 className="font-sans font-bold text-ink uppercase tracking-wider">Immutable System Audit Trail</h3>
            <span className="text-[10px] text-ink-soft">SECURITY LEVEL-5 LOGS</span>
          </div>

          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-hairline text-[10px] text-ink-soft uppercase tracking-wider bg-paper/30">
              <tr>
                <th className="px-5 py-3 font-semibold">Audit Event ID</th>
                <th className="px-5 py-3 font-semibold">Actor / Operator</th>
                <th className="px-5 py-3 font-semibold">Action</th>
                <th className="px-5 py-3 font-semibold">Target Resource</th>
                <th className="px-5 py-3 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {AUDIT_TRAIL.map((log) => (
                <tr key={log.id} className="hover:bg-paper/50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-cobalt">{log.id}</td>
                  <td className="px-5 py-3.5 font-sans font-bold text-ink">{log.actor}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{log.action}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{log.resource}</td>
                  <td className="px-5 py-3.5 text-right text-ink-soft">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </LedgerShell>
  );
}
