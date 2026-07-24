'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Network, ShieldCheck, CheckCircle2, User, Car, PhoneCall, MapPin, Hash, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

export default function EntityGraphPage() {
  const params = useParams();
  const entityId = (params?.id as string) || 'SUSPECT-ENT-441';

  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [hopRing, setHopRing] = useState<'1-HOP' | '2-HOP'>('1-HOP');

  const graphNodes = [
    { id: entityId, label: 'Alias "Raju Black"', type: 'SUSPECT', verified: true, x: 250, y: 150 },
    { id: 'ALPR-UP-32-AB-9988', label: 'Vehicle UP-32-AB-9988', type: 'VEHICLE', verified: true, x: 120, y: 80 },
    { id: 'CALLER-91-9876543210', label: 'Phone +91 98765 43210', type: 'PHONE', verified: true, x: 380, y: 80 },
    { id: 'CASE-23-05-28-1127', label: 'Case #23-05-28-1127', type: 'CASE', verified: false, x: 120, y: 240 },
    { id: 'LOC-CP-BEAT-4', label: 'Hazratganj Beat 4', type: 'LOCATION', verified: true, x: 380, y: 240 },
  ];

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              NEO4J ENTITY RESOLUTION & LINK ANALYSIS GRAPH
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Entity Link Graph: <span className="text-cobalt">{entityId}</span>
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-3xl mt-1">
              Unifies phone numbers, ALPR vehicle sightings, suspect aliases, case references, and police station limits with weighted edge confidence.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="stamp-badge stamp-live flex items-center gap-1">
              <Network size={13} />
              NEO4J GRAPH CONNECTED
            </span>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-cobalt" />
              <span className="font-bold text-ink uppercase">Link Filter:</span>
            </div>

            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${
                verifiedOnly ? 'bg-stamp-green text-white border-stamp-green' : 'bg-paper text-ink-soft border-hairline'
              }`}
            >
              {verifiedOnly ? '✓ ANALYST VERIFIED LINKS ONLY' : 'SHOW MACHINE SUGGESTED LINKS'}
            </button>

            <div className="flex items-center gap-1 bg-paper p-1 rounded border border-hairline">
              <button
                onClick={() => setHopRing('1-HOP')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  hopRing === '1-HOP' ? 'bg-cobalt text-white' : 'text-ink-soft'
                }`}
              >
                1-HOP RING
              </button>
              <button
                onClick={() => setHopRing('2-HOP')}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  hopRing === '2-HOP' ? 'bg-cobalt text-white' : 'text-ink-soft'
                }`}
              >
                2-HOP RING
              </button>
            </div>
          </div>

          <div className="text-ink-soft text-[10px]">
            5 NODES • 6 EDGES (CYPHER QUERY: 42ms)
          </div>
        </div>

        {/* Graph Canvas */}
        <div className="h-[420px] rounded border border-hairline bg-paper-raised p-6 relative overflow-hidden shadow-inner flex items-center justify-center">
          
          <svg className="w-full h-full" viewBox="0 0 500 320">
            {/* Edges */}
            <line x1="250" y1="150" x2="120" y2="80" stroke="#2B5AA0" strokeWidth="2" />
            <line x1="250" y1="150" x2="380" y2="80" stroke="#2B5AA0" strokeWidth="2" />
            <line x1="250" y1="150" x2="120" y2="240" stroke="#A63B2A" strokeWidth="1.5" strokeDasharray="4,4" />
            <line x1="250" y1="150" x2="380" y2="240" stroke="#3F6B57" strokeWidth="2" />

            {/* Nodes */}
            {graphNodes.map(node => (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="cursor-pointer">
                <circle 
                  r="22" 
                  fill={node.id === entityId ? '#2B5AA0' : '#F8F7F3'} 
                  stroke={node.id === entityId ? '#2B5AA0' : '#202A33'} 
                  strokeWidth="2"
                  className="transition-all hover:scale-110" 
                />
                <text 
                  y="36" 
                  textAnchor="middle" 
                  fill="#202A33" 
                  fontSize="10" 
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Graph Legend Overlay */}
          <div className="absolute top-4 left-4 p-3 rounded border border-hairline bg-paper/90 backdrop-blur font-mono text-[10px] space-y-1 text-ink">
            <div className="font-bold text-cobalt uppercase">GRAPH EDGE LEGEND</div>
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 bg-cobalt"></span>
              <span>Verified Link (Weight: 0.95)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 border-b border-dashed border-rust"></span>
              <span>Machine Suggested Link (Weight: 0.64)</span>
            </div>
          </div>

        </div>

      </div>
    </LedgerShell>
  );
}
