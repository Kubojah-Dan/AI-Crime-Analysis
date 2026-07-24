'use client';

import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Layers, Clock, Hash, Cpu, HelpCircle } from 'lucide-react';
import { EVIDENCE_AUDIT_TRAIL } from '@/data/indian-public-safety';

interface ProvenanceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  caseId?: string;
  confidencePct?: number;
  provenanceLabel?: 'OBSERVED' | 'INFERRED' | 'PREDICTED';
}

export function ProvenanceDrawer({ 
  isOpen, 
  onClose, 
  caseId = '23-05-28-1127',
  confidencePct = 82,
  provenanceLabel = 'PREDICTED'
}: ProvenanceDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-end animate-fade-in-up font-sans">
      <div className="bg-paper-raised border-l border-hairline w-full max-w-xl h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between overflow-y-auto text-ink">
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex items-center gap-2 font-serif font-bold text-xl text-ink">
              <HelpCircle size={20} className="text-cobalt" />
              Why am I seeing this alert?
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded hover:bg-paper text-ink-soft hover:text-ink transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Subtitle Metadata */}
          <div className="p-3 rounded border border-hairline bg-paper flex items-center justify-between font-mono text-xs shadow-inner">
            <div>
              <span className="text-ink-soft">CASE ID: </span>
              <span className="font-bold text-cobalt">{caseId}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ink-soft">LABEL: </span>
              <span className="stamp-badge stamp-verified">{provenanceLabel}</span>
            </div>
          </div>

          {/* 1. Confidence Meter & Score Breakdown */}
          <div className="ledger-panel rounded p-4 border border-hairline bg-paper space-y-3 shadow-sm font-mono text-xs">
            <div className="flex items-center justify-between font-bold text-ink uppercase">
              <span>Model Confidence Meter</span>
              <span className="text-cobalt text-sm">{confidencePct}%</span>
            </div>

            <div className="w-full bg-hairline/30 h-3 rounded overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  confidencePct > 80 ? 'bg-stamp-green' : confidencePct > 60 ? 'bg-cobalt' : 'bg-ochre'
                }`}
                style={{ width: `${confidencePct}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-center pt-1">
              <div className="p-2 border border-hairline rounded bg-paper-raised">
                <span className="text-ink-soft block">Source Reliability</span>
                <span className="font-bold text-stamp-green">94% (High)</span>
              </div>
              <div className="p-2 border border-hairline rounded bg-paper-raised">
                <span className="text-ink-soft block">Corroboration</span>
                <span className="font-bold text-cobalt">4 Signals</span>
              </div>
              <div className="p-2 border border-hairline rounded bg-paper-raised">
                <span className="text-ink-soft block">Contradictions</span>
                <span className="font-bold text-stamp-green">0 Flags</span>
              </div>
            </div>
          </div>

          {/* 2. Contributed Evidence Lineage Chain */}
          <div className="space-y-3 font-mono text-xs">
            <div className="font-bold text-ink uppercase flex items-center gap-1.5 border-b border-hairline pb-2">
              <Layers size={14} className="text-cobalt" />
              <span>Contributed Evidence Lineage Chain</span>
            </div>

            <div className="space-y-2">
              {EVIDENCE_AUDIT_TRAIL.map((evt, idx) => (
                <div key={idx} className="p-3 rounded border border-hairline bg-paper flex items-start justify-between gap-3 shadow-sm hover:border-cobalt transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cobalt/10 border border-cobalt/30 text-cobalt font-bold text-[10px] uppercase">
                        {evt.source}
                      </span>
                      <span className="text-[10px] text-ink-soft">{evt.timestamp}</span>
                    </div>
                    <p className="font-sans text-xs text-ink">{evt.description}</p>
                  </div>
                  <div className="text-right font-mono text-[9px] text-ink-soft flex items-center gap-1">
                    <Hash size={10} />
                    <span>{evt.hash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Contradiction & Extrapolation Warning Banner */}
          <div className="p-4 rounded border border-ochre/40 bg-ochre/10 text-ochre font-sans text-xs space-y-1 shadow-sm">
            <div className="font-bold font-mono text-[11px] uppercase flex items-center gap-1.5">
              <AlertTriangle size={14} />
              <span>EXTRAPOLATION & UNCERTAINTY NOTICE</span>
            </div>
            <p className="leading-relaxed">
              This intelligence synthesis incorporates pattern extrapolations from secondary sensor nodes. Analysts must verify CCTV footage (CAM-DEL-CP-04) before ordering tactical unit deployment.
            </p>
          </div>

        </div>

        {/* Footer Close */}
        <div className="pt-4 border-t border-hairline flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded bg-cobalt text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-cobalt-dark shadow-sm transition-all cursor-pointer"
          >
            CLOSE PROVENANCE LEDGER
          </button>
        </div>

      </div>
    </div>
  );
}
