'use client';

import React from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { HelpCircle, ShieldCheck, Mail, Phone, Server, CheckCircle2 } from 'lucide-react';

export default function SupportPage() {
  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto font-sans">
        
        {/* Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              SYSTEM DIAGNOSTICS & ASSISTANCE
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Support & Technical Help Desk
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-2xl mt-1">
              Command Center technical operations, system health diagnostic tools, and emergency help desk contacts.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-live">
              SYSTEM ONLINE
            </span>
          </div>
        </div>

        {/* System Diagnostics Box */}
        <div className="ledger-panel rounded p-6 border border-hairline bg-paper-raised space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-ink border-b border-hairline pb-2">
            <Server size={16} className="text-cobalt" />
            LIVE SYSTEM DIAGNOSTICS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border border-hairline rounded bg-paper">
              <span className="text-[10px] text-ink-soft block mb-1">PYTHON API SERVER</span>
              <span className="font-bold text-stamp-green flex items-center gap-1">
                <CheckCircle2 size={14} /> ONLINE (Port 8000)
              </span>
            </div>

            <div className="p-3 border border-hairline rounded bg-paper">
              <span className="text-[10px] text-ink-soft block mb-1">REDIS CLOUD BUS</span>
              <span className="font-bold text-stamp-green flex items-center gap-1">
                <CheckCircle2 size={14} /> CONNECTED (Port 15853)
              </span>
            </div>

            <div className="p-3 border border-hairline rounded bg-paper">
              <span className="text-[10px] text-ink-soft block mb-1">NEO4J GRAPH DB</span>
              <span className="font-bold text-stamp-green flex items-center gap-1">
                <CheckCircle2 size={14} /> CONNECTED (Port 7687)
              </span>
            </div>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ledger-panel rounded p-6 border border-hairline bg-paper-raised space-y-3">
            <h3 className="font-serif font-bold text-lg text-ink">Technical Help Desk</h3>
            <p className="text-xs text-ink-soft leading-relaxed font-sans">
              Contact the AegisIQ engineering team for system diagnostics, Catalyst cloud deployment help, or database syncing.
            </p>
            <div className="font-mono text-xs text-cobalt font-bold">
              EMAIL: ops-support@aegisiq.gov.in
            </div>
          </div>

          <div className="ledger-panel rounded p-6 border border-hairline bg-paper-raised space-y-3">
            <h3 className="font-serif font-bold text-lg text-ink">Emergency Hotline</h3>
            <p className="text-xs text-ink-soft leading-relaxed font-sans">
              24/7 dedicated line for public safety dispatch officers and command room personnel.
            </p>
            <div className="font-mono text-xs text-cobalt font-bold">
              TEL: +91 (11) 2345-AEGIS
            </div>
          </div>
        </div>

      </div>
    </LedgerShell>
  );
}
