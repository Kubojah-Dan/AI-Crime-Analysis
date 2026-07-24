'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { MapLibreView } from '@/components/map/maplibre-view';
import { Play, Pause, RotateCcw, FastForward, CheckCircle2, ShieldCheck, Clock, Hash, MapPin, Activity, Video } from 'lucide-react';
import { EVIDENCE_AUDIT_TRAIL } from '@/data/indian-public-safety';

export default function IncidentReplayPage() {
  const params = useParams();
  const caseId = (params?.id as string) || '23-05-28-1127';

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(1);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => (prev < EVIDENCE_AUDIT_TRAIL.length - 1 ? prev + 1 : 0));
      }, 2000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeEvent = EVIDENCE_AUDIT_TRAIL[currentStepIndex];

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              TEMPORAL NARRATIVE RECONSTRUCTION & STORYLINE REPLAY
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Incident Storyline Replay: <span className="text-cobalt">{caseId}</span>
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-3xl mt-1">
              Reconstructs incident progression minute-by-minute across 112 emergency calls, CCTV detection metadata, patrol unit movements, and field officer voice notes.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-verified flex items-center gap-1">
              <CheckCircle2 size={13} />
              IMMUTABLE AUDIT CHAIN VERIFIED
            </span>
          </div>
        </div>

        {/* Map & Playback Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Map Playback View */}
          <div className="lg:col-span-8 h-[450px] rounded border border-hairline overflow-hidden relative shadow-sm">
            <MapLibreView center={[80.9462, 26.8467]} zoom={12} />
            <div className="absolute top-3 left-3 z-10 bg-paper-raised/95 border border-hairline p-2 rounded font-mono text-xs shadow-sm">
              <span className="font-bold text-cobalt">REPLAY STEP {currentStepIndex + 1} / {EVIDENCE_AUDIT_TRAIL.length}:</span>
              <span className="ml-2 font-bold text-ink">{activeEvent.source} ({activeEvent.step})</span>
            </div>
          </div>

          {/* Step Details & Lineage Card */}
          <div className="lg:col-span-4 ledger-panel rounded p-5 border border-hairline bg-paper-raised space-y-4 shadow-sm flex flex-col justify-between font-mono text-xs">
            <div className="space-y-3">
              <div className="font-bold text-cobalt uppercase border-b border-hairline pb-2 flex justify-between">
                <span>ACTIVE STEP SPECIFICATION</span>
                <span>{activeEvent.timestamp}</span>
              </div>

              <div className="p-3 rounded border border-cobalt/30 bg-cobalt/5 space-y-1">
                <div className="font-bold text-cobalt">{activeEvent.source}</div>
                <p className="font-sans text-xs text-ink">{activeEvent.description}</p>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Cryptographic Hash:</span>
                  <span className="font-bold text-ink">{activeEvent.hash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Provenance:</span>
                  <span className="stamp-badge stamp-live">LIVE_VERIFIED</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded border border-hairline bg-paper text-[10px] text-ink-soft italic">
              "Replay scrubbers allow shift handovers and senior supervisory review without altering underlying audit logs."
            </div>
          </div>

        </div>

        {/* Playback Scrubber Controls Strip */}
        <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised space-y-4 shadow-md font-mono text-xs">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded bg-cobalt text-white font-bold hover:bg-cobalt-dark transition-all cursor-pointer shadow-sm"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                onClick={() => { setIsPlaying(false); setCurrentStepIndex(0); }}
                className="p-3 rounded border border-hairline bg-paper text-ink hover:bg-paper-raised transition-all cursor-pointer"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            <div className="flex-1 max-w-xl mx-6 space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-ink-soft uppercase">
                <span>Timeline Progress</span>
                <span>Step {currentStepIndex + 1} of {EVIDENCE_AUDIT_TRAIL.length}</span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={EVIDENCE_AUDIT_TRAIL.length - 1} 
                value={currentStepIndex}
                onChange={e => setCurrentStepIndex(Number(e.target.value))}
                className="w-full cursor-pointer accent-cobalt"
              />
            </div>

            <div className="text-right">
              <span className="font-bold text-cobalt text-sm block">{activeEvent.timestamp}</span>
              <span className="text-[10px] text-ink-soft">EVENT TIMESTAMP</span>
            </div>
          </div>

          {/* Timeline Nodes Bar */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {EVIDENCE_AUDIT_TRAIL.map((evt, i) => (
              <div 
                key={i}
                onClick={() => setCurrentStepIndex(i)}
                className={`p-2.5 rounded border text-center cursor-pointer transition-all ${
                  currentStepIndex === i 
                    ? 'border-cobalt bg-cobalt/10 text-cobalt font-bold shadow-sm' 
                    : 'border-hairline bg-paper text-ink-soft hover:border-cobalt/50'
                }`}
              >
                <div className="text-[10px] font-bold">{evt.step}</div>
                <div className="text-[9px] font-sans truncate">{evt.source}</div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </LedgerShell>
  );
}
