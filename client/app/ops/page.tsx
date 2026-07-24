'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { MapLibreView } from '@/components/map/maplibre-view';
import { CopilotCard } from '@/components/ui/copilot-card';
import { 
  Radio, MapPin, Activity, ShieldAlert, Video, PhoneCall, 
  Search, SlidersHorizontal, ArrowRight, Play, CheckCircle2, 
  AlertTriangle, Clock, Hash, Lock, Users, Shield, Cpu, ExternalLink, ChevronRight, Layers, FileText 
} from 'lucide-react';
import { 
  INDIAN_STATES_DATABASE, 
  PRIORITY_ALERT_QUEUE, 
  LIVE_PATROL_UNITS, 
  EVIDENCE_AUDIT_TRAIL, 
  LIVE_CCTV_FEEDS 
} from '@/data/indian-public-safety';
import { useAegisRealtime } from '@/hooks/use-aegis-realtime';

export default function OperationsConsolePage() {
  const router = useRouter();
  const { latestEvent, isConnected } = useAegisRealtime();
  
  const [selectedState, setSelectedState] = useState<string>('Uttar Pradesh');
  const [emergencyMode, setEmergencyMode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAlert, setSelectedAlert] = useState(PRIORITY_ALERT_QUEUE[0]);

  const activeStateObj = INDIAN_STATES_DATABASE.find(s => s.state === selectedState) || INDIAN_STATES_DATABASE[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <LedgerShell>
      <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#0B0E14] text-slate-100 font-sans selection:bg-cobalt selection:text-white">
        
        {/* ── 1. Top Command Bar ─────────────────────────────────────────── */}
        <div className="h-14 px-6 bg-[#121721] border-b border-slate-800 flex flex-wrap items-center justify-between font-mono text-xs text-slate-300 gap-4 shadow-md">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-cobalt tracking-tight">AegisIQ</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">AI-Driven Crime Analytics</span>
            </div>

            {/* Jurisdiction Selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold uppercase text-[10px]">State:</span>
              <select 
                value={selectedState} 
                onChange={e => setSelectedState(e.target.value)}
                className="bg-[#1A202C] border border-slate-700 rounded px-2.5 py-1 text-xs text-white font-bold outline-none cursor-pointer hover:border-cobalt transition-colors"
              >
                {INDIAN_STATES_DATABASE.map(s => (
                  <option key={s.state} value={s.state}>🇮🇳 {s.state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden md:block">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Global Search (Incidents, Persons, Vehicles, Places...)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A202C] border border-slate-700 rounded pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cobalt transition-colors"
            />
          </form>

          {/* Shift, Latency, Ingest & Emergency Switch */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-2 text-[11px]">
              <span className="text-slate-400">Shift:</span>
              <span className="font-bold text-emerald-400">● Day Shift</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[11px]">
              <span className="text-slate-400">Latency:</span>
              <span className="font-bold text-white">182 ms</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[11px]">
              <span className="text-slate-400">Ingestion:</span>
              <span className="font-bold text-emerald-400">⚡ Healthy</span>
            </div>

            {/* Emergency Mode Toggle */}
            <div className="flex items-center gap-2 p-1 rounded bg-[#1A202C] border border-slate-700">
              <span className="text-[10px] font-bold text-rose-400 uppercase px-1">Emergency Mode</span>
              <button 
                onClick={() => setEmergencyMode(!emergencyMode)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                  emergencyMode ? 'bg-rose-600' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  emergencyMode ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </button>
            </div>
          </div>

        </div>

        {/* ── 2. Main Middle Canvas (Left 60% Map + Right 40% Operational Stack) ──────── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden border-b border-slate-800">
          
          {/* LEFT 60%: Situational Map & Hotspot Leaderboard */}
          <div className="lg:col-span-7 border-r border-slate-800 flex flex-col relative bg-[#121721] overflow-hidden">
            
            {/* Canvas Header */}
            <div className="h-10 px-4 bg-[#1A202C]/80 border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Radio size={14} className="text-cobalt animate-pulse" />
                <span className="font-bold uppercase tracking-wider text-white">SITUATIONAL MAP</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400 text-[10px]">Real-time Hotspots, Units & Incidents</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">STATE: {selectedState}</span>
            </div>

            {/* Map Canvas */}
            <div className="flex-1 relative overflow-hidden">
              <MapLibreView center={activeStateObj.districts[0].coordinates.slice().reverse() as [number, number]} zoom={7} />

              {/* Map Overlay Legend */}
              <div className="absolute top-3 right-3 z-10 bg-[#0B0E14]/90 border border-slate-800 p-2.5 rounded font-mono text-[10px] space-y-1.5 text-slate-300 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-cyan-500"></span>
                  <span>Unit (Patrol / PCR)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-blue-600"></span>
                  <span>Police Station</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-600"></span>
                  <span>Incident Cluster</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded bg-amber-500"></span>
                  <span>Hotspot (Risk Score)</span>
                </div>
              </div>

              {/* District Risk Leaderboard Card */}
              <div className="absolute bottom-3 left-3 z-10 bg-[#0B0E14]/90 border border-slate-800 p-3 rounded font-mono text-xs w-64 text-slate-300 backdrop-blur space-y-2">
                <div className="flex items-center justify-between font-bold text-white text-[10px] uppercase border-b border-slate-800 pb-1">
                  <span>Risk Score (District)</span>
                  <Link href="/analytics" className="text-cobalt hover:underline text-[9px]">View all →</Link>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {activeStateObj.districts.map((d, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-slate-300 truncate max-w-[130px]">{d.name.split(' ')[0]}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-800 h-1.5 rounded overflow-hidden">
                          <div 
                            className={`h-full ${d.risk_level === 'CRITICAL' ? 'bg-rose-500' : 'bg-amber-500'}`}
                            style={{ width: `${Math.round(d.incidents_count * 0.03)}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-white text-[10px]">
                          {(Math.round(d.incidents_count * 0.03) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 40%: Operational Stack (Triage Queue + Copilot + Live Telemetry) */}
          <div className="lg:col-span-5 bg-[#0B0E14] overflow-y-auto p-4 space-y-4">
            
            {/* 1. Priority Alert Queue */}
            <div className="bg-[#121721] border border-slate-800 rounded p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-white uppercase">
                  <ShieldAlert size={15} className="text-rose-500" />
                  <span>PRIORITY ALERT QUEUE</span>
                </div>
                <Link href="/ops/queue" className="text-cobalt hover:underline text-[10px] font-bold uppercase">
                  View all alerts →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead className="text-[9px] text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="pb-1">#</th>
                      <th className="pb-1">Alert / Incident</th>
                      <th className="pb-1">Location</th>
                      <th className="pb-1">Severity</th>
                      <th className="pb-1">SLA Timer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {PRIORITY_ALERT_QUEUE.map((alt, i) => (
                      <tr 
                        key={alt.id}
                        onClick={() => setSelectedAlert(alt)}
                        className={`cursor-pointer hover:bg-slate-800/40 transition-colors ${
                          selectedAlert.id === alt.id ? 'bg-slate-800/80 font-bold' : ''
                        }`}
                      >
                        <td className="py-2 text-slate-500">{i + 1}</td>
                        <td className="py-2">
                          <div className="text-white font-bold">{alt.title}</div>
                          <div className="text-[9px] text-slate-400">{alt.case_id}</div>
                        </td>
                        <td className="py-2 text-slate-300">{alt.location}</td>
                        <td className="py-2">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            alt.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                            alt.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          }`}>
                            {alt.severity}
                          </span>
                        </td>
                        <td className="py-2 text-rose-400 font-bold">{alt.sla_timer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Explainable Live Ops Copilot Card */}
            <CopilotCard 
              caseId={selectedAlert.case_id}
              sector={selectedAlert.location}
              category={selectedAlert.title}
              ipcSection={selectedAlert.category}
            />

            {/* 3. Live Telemetry Summary Cards */}
            <div className="bg-[#121721] border border-slate-800 rounded p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-white uppercase">
                  <Activity size={15} className="text-emerald-400" />
                  <span>LIVE TELEMETRY</span>
                </div>
                <span className="text-[9px] text-emerald-400 font-bold uppercase">● All streams live</span>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                <div className="p-2.5 rounded bg-[#1A202C] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>CCTV Feeds</span>
                    <Video size={12} className="text-cobalt" />
                  </div>
                  <div className="text-white font-bold text-xs">1,248 / 1,482</div>
                  <div className="text-rose-400 text-[9px]">87 Motion Alerts</div>
                </div>

                <div className="p-2.5 rounded bg-[#1A202C] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>112 Emergency Calls</span>
                    <PhoneCall size={12} className="text-emerald-400" />
                  </div>
                  <div className="text-white font-bold text-xs">142 Active</div>
                  <div className="text-emerald-400 text-[9px]">326 Answered (15m)</div>
                </div>

                <div className="p-2.5 rounded bg-[#1A202C] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Sensor Streams</span>
                    <Radio size={12} className="text-amber-400" />
                  </div>
                  <div className="text-white font-bold text-xs">2,314 Active</div>
                  <div className="text-amber-400 text-[9px]">21 Anomalies (15m)</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── 3. Bottom Operational Strip ───────────────────────────────── */}
        <div className="p-4 bg-[#121721] grid grid-cols-1 lg:grid-cols-12 gap-4 font-mono text-xs">
          
          {/* Incident Timeline */}
          <div className="lg:col-span-3 bg-[#0B0E14] border border-slate-800 rounded p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[10px]">
              <span className="font-bold text-white uppercase">INCIDENT TIMELINE ({selectedAlert.case_id})</span>
              <Link href={`/ops/replay/${selectedAlert.case_id}`} className="text-cobalt hover:underline">Full timeline →</Link>
            </div>
            <div className="space-y-2 text-[10px]">
              {EVIDENCE_AUDIT_TRAIL.slice(0, 4).map((evt, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{evt.step}</span>
                  <div>
                    <span className="text-white font-bold">{evt.source}: </span>
                    <span className="text-slate-300">{evt.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patrol Unit Status */}
          <div className="lg:col-span-4 bg-[#0B0E14] border border-slate-800 rounded p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[10px]">
              <span className="font-bold text-white uppercase">PATROL UNIT STATUS</span>
              <Link href="/ops/simulator" className="text-cobalt hover:underline">Simulator →</Link>
            </div>
            <table className="w-full text-left text-[10px]">
              <thead className="text-slate-500 uppercase border-b border-slate-800">
                <tr>
                  <th className="pb-1">Unit ID</th>
                  <th className="pb-1">Location</th>
                  <th className="pb-1">Status</th>
                  <th className="pb-1">ETA / Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {LIVE_PATROL_UNITS.slice(0, 4).map((u, i) => (
                  <tr key={i}>
                    <td className="py-1 font-bold text-white">{u.unit_id}</td>
                    <td className="py-1 text-slate-300">{u.location}</td>
                    <td className="py-1">
                      <span className={`font-bold ${u.status === 'En Route' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-1 text-slate-400">{u.eta_activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Evidence Lineage & Audit Trail Launchers */}
          <div className="lg:col-span-5 bg-[#0B0E14] border border-slate-800 rounded p-3 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[10px]">
              <span className="font-bold text-white uppercase">EVIDENCE & DATA LINEAGE (AUDIT TRAIL)</span>
              <span className="text-emerald-400 font-bold">Chain Verified ✓</span>
            </div>

            <div className="flex items-center justify-between gap-2 p-2 rounded bg-[#1A202C] border border-slate-800 text-[10px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Hash size={12} className="text-cobalt" />
                <span>Hash: <strong className="text-white">9c7f...a2b1</strong></span>
              </div>
              <span className="text-slate-400">Tamper-evident • Immutable</span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <Link 
                href={`/cases/${selectedAlert.case_id}`}
                className="flex-1 py-2 px-3 rounded bg-cobalt text-white font-bold text-[10px] uppercase text-center hover:bg-cobalt-dark transition-all"
              >
                Open Case Workspace →
              </Link>
              <Link 
                href="/admin/models"
                className="py-2 px-3 rounded border border-slate-700 bg-[#1A202C] text-slate-300 font-bold text-[10px] uppercase hover:text-white transition-all"
              >
                Governance Console
              </Link>
            </div>
          </div>

        </div>

      </div>
    </LedgerShell>
  );
}
