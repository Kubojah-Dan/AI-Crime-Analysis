'use client';

import React, { useState } from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { 
  Download, FileText, Sparkles, ShieldCheck, 
  CheckCircle2, AlertTriangle, ArrowDown, ArrowUp 
} from 'lucide-react';

import { downloadCSV, downloadPDF, ReportItem } from '@/lib/export-utils';

export default function ReportsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadPDF = () => {
    setDownloadSuccess('STRATUS_PDF_EXPORTED');
    setTimeout(() => setDownloadSuccess(null), 2500);

    const reportItems: ReportItem[] = [
      { id: '#AQ-REP-01', timestamp: '2026.07.21 08:00 UTC', category: 'First Response Time', ipc_section: 'IPC 379', district: 'Connaught Place / Central', risk_score: 88, status: 'OPTIMIZED', provenance: 'VERIFIED' },
      { id: '#AQ-REP-02', timestamp: '2026.07.21 08:00 UTC', category: 'Case Closure Rate', ipc_section: 'IPC 420', district: 'Bangalore Tech Corridor', risk_score: 92, status: 'ELITE', provenance: 'VERIFIED' },
      { id: '#AQ-REP-03', timestamp: '2026.07.21 08:00 UTC', category: 'Evidence Integrity', ipc_section: 'IPC 354', district: 'Mumbai Marine Drive', risk_score: 74, status: 'REVIEW', provenance: 'PERIODIC' },
      { id: '#AQ-REP-04', timestamp: '2026.07.21 08:00 UTC', category: 'Personnel Availability', ipc_section: 'IPC 380', district: 'Chennai Harbour Zone', risk_score: 65, status: 'LOW STOCK', provenance: 'PERIODIC' },
    ];

    downloadPDF('Executive Performance Brief (NCRB Benchmark Matrix)', reportItems);
  };

  const handleDownloadCSV = () => {
    setDownloadSuccess('CSV_PERFORMANCE_MATRIX_EXPORTED');
    setTimeout(() => setDownloadSuccess(null), 2500);

    const matrixRows = [
      { Metric_Category: 'First Response Time', City_Actual: '04:12 min', Benchmark: '04:30 min', Variance: '-00:18', Status: 'OPTIMIZED' },
      { Metric_Category: 'Case Closure Rate', City_Actual: '92.4%', Benchmark: '88.5%', Variance: '+3.9%', Status: 'ELITE' },
      { Metric_Category: 'Evidence Integrity', City_Actual: '99.1%', Benchmark: '99.5%', Variance: '-0.4%', Status: 'REVIEW' },
      { Metric_Category: 'Personnel Availability', City_Actual: '81.0%', Benchmark: '85.0%', Variance: '-4.0%', Status: 'LOW STOCK' },
    ];

    downloadCSV('AegisIQ-Performance-Matrix', matrixRows);
  };

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto font-sans">
        
        {/* Title & Export Buttons Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              REF ID: Aegis-2026-Q3-DEL
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Executive Performance Brief
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-2xl mt-1 leading-normal">
              Intelligence summary of Metropolitan Division performance metrics benchmarked against Tier-4 national security standards and NCRB historical data.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={handleDownloadPDF}
              className="py-2.5 px-4 rounded border border-hairline bg-paper-raised text-ink font-bold hover:bg-paper flex items-center gap-2 shadow-sm transition-all"
            >
              <Download size={14} className="text-cobalt" />
              Stratus PDF
            </button>

            <button
              onClick={handleDownloadCSV}
              className="py-2.5 px-4 rounded border border-hairline bg-paper-raised text-ink font-bold hover:bg-paper flex items-center gap-2 shadow-sm transition-all"
            >
              <FileText size={14} className="text-cobalt" />
              Export CSV
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded bg-stamp-green/10 border border-stamp-green/30 text-stamp-green font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-pulse">
            <CheckCircle2 size={16} />
            {downloadSuccess}
          </div>
        )}

        {/* Automated Weekly Synthesis Card */}
        <div className="ledger-panel rounded p-6 border border-hairline bg-paper-raised space-y-4">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
              <Sparkles size={16} className="text-cobalt" />
              Automated Weekly Synthesis
            </div>
            <span className="stamp-badge stamp-verified">
              VERIFIED: AI-GEN
            </span>
          </div>

          <p className="font-sans text-xs text-ink leading-relaxed">
            Analysis of the preceding 168-hour window indicates a <span className="font-bold text-ink">4.2% stabilization</span> in Grade-A incidents across the North-East corridor. Sector 7 remains an outlier with localized escalation in high-density commercial zones.
          </p>

          <p className="font-sans text-xs text-ink leading-relaxed">
            Comparative modeling against NCRB Tier-4 benchmarks suggests that metropolitan response times are outperforming the national median by <span className="font-bold text-ink">18 seconds</span>, though resource depletion in secondary sectors warrants immediate executive attention.
          </p>

          {/* Highlight Core Directive Box */}
          <div className="p-4 rounded border border-cobalt/30 bg-cobalt/5 space-y-1 font-mono text-xs">
            <p className="text-cobalt font-bold leading-relaxed">
              CORE DIRECTIVE: Re-allocate tactical assets from Sector 3 (Low Activity) to the Waterfront / Dwarka District for the upcoming weekend peak period.
            </p>
          </div>

          <div className="text-right font-mono text-[9px] text-ink-soft italic pt-2">
            Generated at 08:00 UTC / Model: Stratos-v4
          </div>
        </div>

        {/* Bar Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Verified Local Bar Chart */}
          <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised">
            <div className="flex items-center justify-between border-b border-hairline pb-2 mb-4 font-mono text-xs">
              <h3 className="font-serif font-bold text-sm text-ink">Verified Local</h3>
              <span className="text-[10px] text-ink-soft">Live Tracking</span>
            </div>

            <div className="h-40 flex items-end justify-around border-b border-hairline/60 pb-2 px-4 font-mono text-[10px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-ink-soft font-bold">85</span>
                <div className="w-8 bg-cobalt rounded-t h-28"></div>
                <span className="text-ink-soft uppercase mt-1">RES</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-ink-soft font-bold">62</span>
                <div className="w-8 bg-cobalt rounded-t h-20"></div>
                <span className="text-ink-soft uppercase mt-1">DET</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-ink-soft font-bold">45</span>
                <div className="w-8 bg-cobalt rounded-t h-14"></div>
                <span className="text-ink-soft uppercase mt-1">SEC</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-ink-soft font-bold">78</span>
                <div className="w-8 bg-cobalt rounded-t h-24"></div>
                <span className="text-ink-soft uppercase mt-1">LOG</span>
              </div>
            </div>
          </div>

          {/* Tier-4 Median Bar Chart */}
          <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised">
            <div className="flex items-center justify-between border-b border-hairline pb-2 mb-4 font-mono text-xs">
              <h3 className="font-serif font-bold text-sm text-ink">Tier-4 Median</h3>
              <span className="text-[10px] text-ink-soft">Periodic Sync</span>
            </div>

            <div className="h-40 flex items-end justify-around border-b border-hairline/60 pb-2 px-4 font-mono text-[10px]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-ink-soft font-bold">79</span>
                <div className="w-8 bg-stamp-gray/50 rounded-t h-24"></div>
                <span className="text-ink-soft uppercase mt-1">RES</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-ink-soft font-bold">70</span>
                <div className="w-8 bg-stamp-gray/50 rounded-t h-22"></div>
                <span className="text-ink-soft uppercase mt-1">DET</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-ink-soft font-bold">65</span>
                <div className="w-8 bg-stamp-gray/50 rounded-t h-20"></div>
                <span className="text-ink-soft uppercase mt-1">SEC</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-ink-soft font-bold">72</span>
                <div className="w-8 bg-stamp-gray/50 rounded-t h-22"></div>
                <span className="text-ink-soft uppercase mt-1">LOG</span>
              </div>
            </div>
          </div>

        </div>

        {/* Granular Performance Matrix Table */}
        <div className="ledger-panel rounded border border-hairline bg-paper-raised overflow-hidden">
          <div className="p-4 border-b border-hairline bg-paper/60 flex items-center justify-between font-mono text-xs">
            <h3 className="font-sans font-bold text-ink uppercase tracking-wider">Granular Performance Matrix</h3>
            <span className="text-[10px] text-ink-soft">TIMESTAMP: 2026-07-21_0800</span>
          </div>

          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-hairline text-[10px] text-ink-soft uppercase tracking-wider bg-paper/30">
              <tr>
                <th className="px-5 py-3 font-semibold">Metric Category</th>
                <th className="px-5 py-3 font-semibold">City Actual</th>
                <th className="px-5 py-3 font-semibold">Benchmark</th>
                <th className="px-5 py-3 font-semibold">Variance</th>
                <th className="px-5 py-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr>
                <td className="px-5 py-3.5 font-bold text-ink">First Response Time</td>
                <td className="px-5 py-3.5 text-ink-soft">04:12 min</td>
                <td className="px-5 py-3.5 text-ink-soft">04:30 min</td>
                <td className="px-5 py-3.5 font-bold text-stamp-green">-00:18</td>
                <td className="px-5 py-3.5 text-right">
                  <span className="border border-stamp-green/40 text-stamp-green px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    OPTIMIZED
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-5 py-3.5 font-bold text-ink">Case Closure Rate</td>
                <td className="px-5 py-3.5 text-ink-soft">92.4%</td>
                <td className="px-5 py-3.5 text-ink-soft">88.5%</td>
                <td className="px-5 py-3.5 font-bold text-stamp-green">+3.9%</td>
                <td className="px-5 py-3.5 text-right">
                  <span className="border border-cobalt/40 text-cobalt px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    ELITE
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-5 py-3.5 font-bold text-ink">Evidence Integrity</td>
                <td className="px-5 py-3.5 text-ink-soft">99.1%</td>
                <td className="px-5 py-3.5 text-ink-soft">99.5%</td>
                <td className="px-5 py-3.5 font-bold text-rust">-0.4%</td>
                <td className="px-5 py-3.5 text-right">
                  <span className="border border-rust/40 text-rust px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    REVIEW
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-5 py-3.5 font-bold text-ink">Personnel Availability</td>
                <td className="px-5 py-3.5 text-ink-soft">81.0%</td>
                <td className="px-5 py-3.5 text-ink-soft">85.0%</td>
                <td className="px-5 py-3.5 font-bold text-rust">-4.0%</td>
                <td className="px-5 py-3.5 text-right">
                  <span className="border border-rust/40 text-rust px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    LOW STOCK
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Confidential Clearance Footer */}
        <div className="pt-6 border-t border-hairline flex flex-wrap items-center justify-between text-[10px] font-mono text-ink-soft gap-4">
          <div>
            <span className="block font-bold text-ink uppercase">REVIEWED BY</span>
            <span>DIRECTOR J. VANCE</span>
          </div>

          <div>
            <span className="block font-bold text-ink uppercase">SECURITY CLEARANCE</span>
            <span>LEVEL-5 / EYES ONLY</span>
          </div>

          <div className="text-right">
            <span className="block font-bold text-ink uppercase">PROPRIETARY AEGIS INTELLIGENCE</span>
            <span>COPYRIGHT © 2026 AEGISIQ CORP</span>
          </div>
        </div>

      </div>
    </LedgerShell>
  );
}
