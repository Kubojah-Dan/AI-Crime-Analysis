'use client';

import React, { useState } from 'react';
import { 
  Sparkles, ShieldAlert, CheckCircle2, AlertTriangle, 
  HelpCircle, ChevronRight, Send, ArrowRight, UserCheck, Eye, X 
} from 'lucide-react';
import { evaluateCopilotNarrative, CopilotSignalInput } from '@/lib/copilot-engine';
import { ProvenanceDrawer } from '@/components/ui/provenance-drawer';

interface CopilotCardProps {
  caseId?: string;
  sector?: string;
  category?: string;
  ipcSection?: string;
  onHumanAction?: (actionName: string) => void;
}

export function CopilotCard({
  caseId = '23-05-28-1127',
  sector = 'Lucknow, Hazratganj',
  category = 'Armed Robbery Reported',
  ipcSection = 'IPC 392 - Robbery',
  onHumanAction,
}: CopilotCardProps) {
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);
  const [reviewState, setReviewState] = useState<string | null>(null);

  const copilotData = evaluateCopilotNarrative({
    case_id: caseId,
    sector: sector,
    category: category,
    ipc_section: ipcSection,
    call_count: 2,
    cctv_anomaly_score: 0.88,
    similar_cluster_id: '#AQ-CLR-441',
    cluster_similarity_pct: 96.4,
    nearest_unit_id: 'UP-32-PCR-124',
    nearest_unit_eta: 'ETA 2 mins',
  });

  const handleAction = (actionLabel: string) => {
    setReviewState(actionLabel);
    if (onHumanAction) onHumanAction(actionLabel);
  };

  return (
    <div className="ledger-panel rounded border border-hairline bg-paper-raised p-5 space-y-4 shadow-md font-sans relative transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
          <Sparkles size={18} className="text-cobalt" />
          EXPLAINABLE AI INSIGHT
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-ink-soft">CASE: {caseId}</span>
          <span className="stamp-badge stamp-live">MODEL: CrimeRisk v2.3</span>
        </div>
      </div>

      {/* Risk Level & Confidence Bar */}
      <div className="grid grid-cols-2 gap-4 font-mono">
        <div className="p-3 border border-hairline rounded bg-paper space-y-1">
          <div className="text-[10px] text-ink-soft uppercase font-bold">Predicted Risk Level</div>
          <div className="font-serif font-bold text-2xl text-rust">
            {copilotData.predicted_risk_level} <span className="text-xs font-mono text-rust">({copilotData.risk_severity_label})</span>
          </div>
        </div>

        <div className="p-3 border border-hairline rounded bg-paper space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-ink-soft uppercase font-bold">Confidence</span>
            <span className="font-bold text-cobalt">{copilotData.confidence_pct}%</span>
          </div>
          <div className="w-full bg-hairline/30 h-2 rounded overflow-hidden">
            <div 
              className="h-full bg-cobalt transition-all duration-500" 
              style={{ width: `${copilotData.confidence_pct}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[8px] text-ink-soft">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Plain Language Operational Summary */}
      <div className="p-3.5 rounded border border-hairline bg-paper text-xs text-ink leading-relaxed space-y-2">
        <p className="font-sans font-normal">{copilotData.summary_narrative}</p>
        <button
          onClick={() => setIsProvenanceOpen(true)}
          className="font-mono text-[10px] text-cobalt font-bold uppercase underline flex items-center gap-1 hover:text-cobalt-dark transition-colors cursor-pointer"
        >
          <HelpCircle size={12} />
          Why am I seeing this alert? (View Provenance Ledger)
        </button>
      </div>

      {/* Top Risk Drivers */}
      <div className="space-y-2 font-mono text-xs">
        <div className="text-[10px] text-ink-soft font-bold uppercase">Top Risk Drivers</div>
        <div className="space-y-1.5">
          {copilotData.top_risk_drivers.map((driver, i) => (
            <div key={i} className="flex items-center justify-between text-[11px] p-1.5 rounded bg-paper border border-hairline/60">
              <span className="font-sans text-ink-soft">{driver.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-hairline/30 h-1.5 rounded overflow-hidden">
                  <div className="h-full bg-cobalt" style={{ width: `${driver.score * 100}%` }}></div>
                </div>
                <span className="font-bold text-cobalt">+{driver.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fairness & Sensitivity Warning Box */}
      {copilotData.fairness_warning && (
        <div className="p-3 rounded border border-ochre/30 bg-ochre/10 text-ochre font-sans text-xs flex items-start gap-2">
          <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold uppercase block">FAIRNESS & SENSITIVITY WARNING</span>
            <p className="text-[11px] leading-tight">{copilotData.fairness_warning}</p>
          </div>
        </div>
      )}

      {/* Human Review Gate Action Buttons */}
      <div className="border-t border-hairline pt-3 space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] text-ink-soft font-bold uppercase">
          <span>Human Review Gate</span>
          {reviewState && <span className="text-stamp-green font-bold">STATUS: {reviewState}</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
          <button
            onClick={() => handleAction('DISPATCHED')}
            className="py-2 px-3 rounded bg-stamp-green text-white font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 shadow-sm transition-all cursor-pointer"
          >
            <UserCheck size={13} />
            Approve & Dispatch
          </button>

          <button
            onClick={() => handleAction('VERIFICATION_REQUESTED')}
            className="py-2 px-3 rounded border border-hairline bg-paper text-ink font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-paper-raised transition-all cursor-pointer"
          >
            <Eye size={13} />
            Request Info
          </button>

          <button
            onClick={() => handleAction('ESCALATED_SUPERVISOR')}
            className="py-2 px-3 rounded border border-rust/40 text-rust bg-rust/10 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-rust/20 transition-all cursor-pointer"
          >
            <ShieldAlert size={13} />
            Escalate
          </button>
        </div>
      </div>

      {/* Provenance Drawer Component */}
      <ProvenanceDrawer 
        isOpen={isProvenanceOpen}
        onClose={() => setIsProvenanceOpen(false)}
        caseId={caseId}
        confidencePct={copilotData.confidence_pct}
        provenanceLabel={copilotData.provenance_type}
      />

    </div>
  );
}
