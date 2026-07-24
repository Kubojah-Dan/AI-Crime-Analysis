'use client';

import React, { useState } from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { MapLibreView } from '@/components/map/maplibre-view';
import { Sliders, ShieldCheck, ArrowRight, RefreshCw, Activity, Layers, Users, MapPin, Zap } from 'lucide-react';
import { LIVE_PATROL_UNITS } from '@/data/indian-public-safety';

export default function DeploymentSimulatorPage() {
  const [reallocateUnitsCount, setReallocateUnitsCount] = useState<number>(2);
  const [targetSector, setTargetSector] = useState<string>('Lucknow, Hazratganj');

  const baseAvgResponseTime = 4.2; // mins
  const projectedResponseTime = Math.max(2.1, (baseAvgResponseTime - (reallocateUnitsCount * 0.75))).toFixed(1);
  const coverageGapReduction = Math.min(94, 45 + (reallocateUnitsCount * 22));

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              DECISION SUPPORT & RESOURCE PLANNER
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Patrol Coverage & "What-If" Deployment Simulator
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-3xl mt-1">
              Simulate tactical unit re-allocation scenarios to evaluate response-time deltas and coverage gap reduction before issuing dispatch orders.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-live">DECISION SUPPORT ONLY • NO AUTO-DISPATCH</span>
          </div>
        </div>

        {/* Simulation Control Bar */}
        <div className="ledger-panel rounded p-5 border border-hairline bg-paper-raised grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs shadow-sm">
          
          <div className="space-y-1">
            <label className="font-bold text-ink uppercase block">1. Re-allocate Units Count</label>
            <div className="flex items-center gap-3">
              <input 
                type="range"
                min={1}
                max={4}
                value={reallocateUnitsCount}
                onChange={e => setReallocateUnitsCount(Number(e.target.value))}
                className="w-full accent-cobalt cursor-pointer"
              />
              <span className="font-bold text-cobalt text-base">{reallocateUnitsCount} Units</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-ink uppercase block">2. Target Hotspot Sector</label>
            <select
              value={targetSector}
              onChange={e => setTargetSector(e.target.value)}
              className="w-full bg-paper border border-hairline rounded p-2 text-ink outline-none font-bold"
            >
              <option value="Lucknow, Hazratganj">Lucknow (Hazratganj Beat 4)</option>
              <option value="Delhi, Connaught Place">Delhi (Connaught Place Sector 7)</option>
              <option value="Bangalore, Tech Corridor">Bangalore (Tech Corridor Phase 2)</option>
              <option value="Mumbai, Marine Drive">Mumbai (Marine Drive Promenade)</option>
            </select>
          </div>

          <div className="p-3 border border-cobalt/30 bg-cobalt/5 rounded flex items-center justify-between">
            <div>
              <div className="text-[10px] text-ink-soft uppercase font-bold">Projected Response Time</div>
              <div className="font-serif font-bold text-2xl text-cobalt">{projectedResponseTime} min</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-stamp-green font-bold uppercase">Delta</div>
              <div className="font-mono font-bold text-stamp-green">-{(reallocateUnitsCount * 0.75).toFixed(1)} min</div>
            </div>
          </div>

        </div>

        {/* Side-by-Side Comparison Maps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Current State */}
          <div className="ledger-panel rounded border border-hairline bg-paper-raised p-5 space-y-3 shadow-sm">
            <div className="flex justify-between items-center font-mono text-xs border-b border-hairline pb-2">
              <span className="font-bold text-ink uppercase">CURRENT DEPLOYMENT STATE</span>
              <span className="text-ink-soft">Avg Response: 4.2 min</span>
            </div>
            <div className="h-80 rounded overflow-hidden border border-hairline">
              <MapLibreView center={[80.9462, 26.8467]} zoom={11} />
            </div>
            <div className="font-mono text-[10px] text-ink-soft flex justify-between">
              <span>COVERAGE GAP: 24%</span>
              <span className="text-rust font-bold">HOTSPOT RISK: HIGH</span>
            </div>
          </div>

          {/* Proposed Simulated State */}
          <div className="ledger-panel rounded border border-cobalt/40 bg-cobalt/5 p-5 space-y-3 shadow-md">
            <div className="flex justify-between items-center font-mono text-xs border-b border-cobalt/30 pb-2">
              <span className="font-bold text-cobalt uppercase">PROPOSED SIMULATED STATE</span>
              <span className="font-bold text-stamp-green">Avg Response: {projectedResponseTime} min</span>
            </div>
            <div className="h-80 rounded overflow-hidden border border-cobalt/30">
              <MapLibreView center={[80.9462, 26.8467]} zoom={12} />
            </div>
            <div className="font-mono text-[10px] text-cobalt flex justify-between">
              <span>COVERAGE GAP REDUCTION: {coverageGapReduction}%</span>
              <span className="font-bold text-stamp-green">OPTIMIZED PATROL CONTOUR</span>
            </div>
          </div>

        </div>

      </div>
    </LedgerShell>
  );
}
