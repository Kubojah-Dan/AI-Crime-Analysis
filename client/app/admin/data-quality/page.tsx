'use client';

import React from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Database, Activity, ShieldCheck, CheckCircle2, RefreshCw, Radio, Video, PhoneCall } from 'lucide-react';

export default function DataQualityPage() {
  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              DATA INGESTION PIPELINE & SENSOR LINEAGE MONITOR
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Data Quality & Ingest Health
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-3xl mt-1">
              Real-time monitoring of emergency 112 CAD feeds, CCTV camera streams, ALPR sensors, and satellite imagery pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-live">4 INGEST STREAMS HEALTHY</span>
          </div>
        </div>

        {/* Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          
          <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-hairline pb-2">
              <div className="flex items-center gap-2 font-bold text-ink">
                <PhoneCall size={16} className="text-emerald-500" />
                <span>112 Emergency CAD Dispatch Feed</span>
              </div>
              <span className="stamp-badge stamp-live">99.9% UPTIME</span>
            </div>
            <p className="font-sans text-xs text-ink-soft">
              Real-time ingest of 112 emergency calls across UP, Delhi, Karnataka, Maharashtra & Tamil Nadu.
            </p>
            <div className="text-[10px] text-ink-soft flex justify-between pt-2 border-t border-hairline">
              <span>LATENCY: 140ms</span>
              <span>PARSED: 14,200 CALLS/HR</span>
            </div>
          </div>

          <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-hairline pb-2">
              <div className="flex items-center gap-2 font-bold text-ink">
                <Video size={16} className="text-cobalt" />
                <span>Municipal CCTV Metadata Feed</span>
              </div>
              <span className="stamp-badge stamp-verified">STREAMING</span>
            </div>
            <p className="font-sans text-xs text-ink-soft">
              Computer vision metadata extraction (dense crowd, loitering, vehicle ALPR plate hits).
            </p>
            <div className="text-[10px] text-ink-soft flex justify-between pt-2 border-t border-hairline">
              <span>ACTIVE CAMS: 1,248</span>
              <span>FPS: 30-60 UNIFORM</span>
            </div>
          </div>

        </div>

      </div>
    </LedgerShell>
  );
}
