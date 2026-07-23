'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { 
  Shield, ShieldCheck, CheckSquare, XCircle, 
  Lock, TrendingUp, AlertTriangle, FileText, CheckCircle2 
} from 'lucide-react';

export default function CaseWorkspacePage() {
  const params = useParams();
  const caseId = (params?.id as string) || 'NY-8821';

  const [comments, setComments] = useState('');
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  const handleAction = (statusText: string) => {
    setActionStatus(statusText);
  };

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
        
        {/* Workspace Title & Priority Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              WORKSPACE / CASE: {caseId}
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Harbor District / Dwarka Sector Anomaly
            </h1>
            <div className="font-mono text-[11px] text-ink-soft mt-1">
              REPORTED: 2026-10-24 04:12Z
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="stamp-badge stamp-alert text-sm px-3 py-1 font-bold">
              PRIORITY 01
            </span>
          </div>
        </div>

        {/* 3-Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_300px] gap-6">
          
          {/* Column 1: Narrative Summary */}
          <div className="ledger-panel rounded p-6 border border-hairline bg-paper-raised flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">
                  Narrative Summary
                </h3>
                <span className="font-mono text-[10px] text-ink-soft">QuickML v.4.2</span>
              </div>

              <p className="font-serif text-sm text-ink leading-relaxed mb-6">
                <span className="text-xl font-bold font-serif float-left mr-1.5 leading-none">A</span>
                t approximately 03:00 local time, sensors detected a 42% deviation from historical baseline activity in the Harbor District.
                The spike aligns with high-tide shifts and unscheduled transport signatures. Forensic metadata suggests a non-standard mechanical origin, possibly associated with maritime bypass protocols.
              </p>

              {/* Probable Cause Highlight Box */}
              <div className="p-4 rounded border border-cobalt/30 bg-cobalt/5 space-y-1">
                <h4 className="font-mono text-[10px] font-bold uppercase text-cobalt tracking-wider">
                  PROBABLE CAUSE
                </h4>
                <p className="font-mono text-xs text-ink leading-normal">
                  Unidentified deep-draft vessel movement near restricted berth 4C.
                </p>
              </div>
            </div>

            <div className="border-t border-hairline pt-4 flex items-center justify-between font-mono text-[10px] text-ink-soft">
              <span>ENCRYPTION: AES-256</span>
              <Lock size={14} className="text-ink-soft" />
            </div>
          </div>

          {/* Column 2: Trend Analysis & Anomaly Flux */}
          <div className="ledger-panel rounded p-6 border border-hairline bg-paper-raised flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4 font-mono text-xs">
                <h3 className="font-sans font-bold uppercase tracking-wider text-ink">
                  Trend Analysis: Anomaly Flux
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-ink-soft">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 bg-cobalt"></span> Actuals</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 border border-cobalt"></span> Forecast</span>
                </div>
              </div>

              {/* Simulated Anomaly Flux SVG Chart */}
              <div className="h-48 w-full border border-hairline/60 bg-paper rounded p-2 relative flex items-center justify-center mb-6">
                <svg className="w-full h-full" viewBox="0 0 350 150">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="350" y2="30" stroke="#C9C6B8" strokeDasharray="2,2" />
                  <line x1="0" y1="75" x2="350" y2="75" stroke="#C9C6B8" strokeDasharray="2,2" />
                  <line x1="0" y1="120" x2="350" y2="120" stroke="#C9C6B8" strokeDasharray="2,2" />

                  {/* Actual Curve */}
                  <path 
                    d="M 10 110 L 60 100 L 120 85 L 180 25 L 220 70" 
                    fill="none" 
                    stroke="#2B5AA0" 
                    strokeWidth="2.5" 
                  />

                  {/* Peak Anomaly Dot */}
                  <circle cx="180" cy="25" r="5" fill="#A63B2A" />
                  <text x="190" y="22" fill="#A63B2A" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">
                    PEAK ANOMALY (+42%)
                  </text>

                  {/* Forecast Dotted Curve */}
                  <path 
                    d="M 220 70 Q 270 40 340 60" 
                    fill="none" 
                    stroke="#2B5AA0" 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4" 
                  />

                  {/* X Axis Labels */}
                  <text x="15" y="142" fill="#5B6570" fontSize="8" fontFamily="IBM Plex Mono">T-72H</text>
                  <text x="75" y="142" fill="#5B6570" fontSize="8" fontFamily="IBM Plex Mono">T-48H</text>
                  <text x="135" y="142" fill="#5B6570" fontSize="8" fontFamily="IBM Plex Mono">T-24H</text>
                  <text x="180" y="142" fill="#2B5AA0" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">CURRENT</text>
                  <text x="250" y="142" fill="#5B6570" fontSize="8" fontFamily="IBM Plex Mono">T+24H</text>
                  <text x="310" y="142" fill="#5B6570" fontSize="8" fontFamily="IBM Plex Mono">T+48H</text>
                </svg>
              </div>

              {/* Stats Metrics Row */}
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 border border-hairline rounded bg-paper">
                  <div className="text-[9px] text-ink-soft uppercase mb-1">CONFIDENCE</div>
                  <div className="font-serif font-bold text-base text-ink">94.2%</div>
                </div>

                <div className="p-3 border border-hairline rounded bg-paper">
                  <div className="text-[9px] text-ink-soft uppercase mb-1">VOLATILITY</div>
                  <div className="font-serif font-bold text-base text-cobalt">HIGH</div>
                </div>

                <div className="p-3 border border-hairline rounded bg-paper">
                  <div className="text-[9px] text-ink-soft uppercase mb-1">STABILITY</div>
                  <div className="font-serif font-bold text-base text-rust">WEAK</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Human Review Gate & Data Lineage */}
          <div className="space-y-6">
            
            {/* Human Review Gate Box */}
            <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised space-y-4">
              <div className="flex items-center gap-2 border-b border-hairline pb-2 font-sans font-bold text-xs uppercase text-ink">
                <ShieldCheck size={16} className="text-cobalt" />
                Human Review Gate
              </div>

              <div>
                <label className="block font-mono text-[9px] text-ink-soft uppercase mb-1">
                  REVIEWER COMMENTS
                </label>
                <textarea
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="Enter findings for physical dispatch..."
                  className="w-full h-24 p-3 bg-paper border border-hairline rounded font-mono text-xs text-ink outline-none focus:border-cobalt resize-none"
                />
              </div>

              {actionStatus && (
                <div className="p-2.5 rounded bg-stamp-green/10 border border-stamp-green/30 text-stamp-green font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 size={14} />
                  {actionStatus}
                </div>
              )}

              {/* Gate Action Buttons */}
              <div className="space-y-2 font-sans">
                <button
                  onClick={() => handleAction('FLAGGED FOR PATROL DISPATCH')}
                  className="w-full py-2.5 px-4 rounded bg-cobalt text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cobalt-dark shadow-sm transition-all"
                >
                  <Shield size={14} />
                  FLAG FOR PATROL
                </button>

                <button
                  onClick={() => handleAction('VERIFICATION REQUESTED FROM FIELD UNIT')}
                  className="w-full py-2.5 px-4 rounded border border-cobalt text-cobalt font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cobalt/10 transition-all"
                >
                  <CheckSquare size={14} />
                  REQUEST VERIFICATION
                </button>

                <button
                  onClick={() => handleAction('ANOMALY DISMISSED BY ANALYST')}
                  className="w-full py-2.5 px-4 rounded border border-hairline text-ink-soft font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-paper transition-all"
                >
                  <XCircle size={14} />
                  DISMISS ANOMALY
                </button>
              </div>
            </div>

            {/* Data Lineage Box */}
            <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised font-mono text-[10px] space-y-2">
              <div className="text-ink-soft font-bold uppercase tracking-wider border-b border-hairline pb-1 mb-2">
                DATA LINEAGE
              </div>
              
              <div className="flex justify-between text-ink-soft">
                <span>Ingest: SensorArray-09</span>
                <span className="font-bold text-ink">[STAMPED]</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>ML Sweep: AegisIQ Core</span>
                <span className="font-bold text-ink">[STAMPED]</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Validation: Tier 1 Auto</span>
                <span className="font-bold text-ink">[STAMPED]</span>
              </div>

              <div className="pt-3 text-center border-t border-hairline">
                <span className="stamp-badge stamp-verified text-[9px] px-3 py-1 font-bold">
                  VERIFIED_BY_SYSTEM
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </LedgerShell>
  );
}
