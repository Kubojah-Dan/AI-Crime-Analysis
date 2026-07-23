'use client';

import React, { useState } from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { 
  BarChart3, TrendingUp, SlidersHorizontal, Filter, 
  MapPin, Layers, ShieldCheck, Activity, Video, Smartphone, 
  Share2, ArrowUpRight, ArrowDownRight, RefreshCw, Sparkles 
} from 'lucide-react';
import { INDIAN_STATES_DATABASE, LIVE_CCTV_FEEDS, IndianStateMetric } from '@/data/indian-public-safety';

export default function AnalyticsPage() {
  const [selectedStateA, setSelectedStateA] = useState<string>('Karnataka');
  const [selectedStateB, setSelectedStateB] = useState<string>('Delhi (UT)');
  const [selectedIPC, setSelectedIPC] = useState<string>('ALL');
  const [timeRange, setTimeRange] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('WEEKLY');
  const [activeTrack, setActiveTrack] = useState<string>('01');

  const stateA = INDIAN_STATES_DATABASE.find(s => s.state === selectedStateA) || INDIAN_STATES_DATABASE[0];
  const stateB = INDIAN_STATES_DATABASE.find(s => s.state === selectedStateB) || INDIAN_STATES_DATABASE[1];

  const CAPABILITY_TRACKS = [
    { id: '01', title: '01 Real-Time Streams', tag: 'CCTV & SENSOR METADATA', color: 'border-rust text-rust', desc: 'Live CCTV metadata, sensor feeds & 112 dispatch anomaly detection pipelines.' },
    { id: '02', title: '02 Multi-Modal AI', tag: 'IMAGE & TEXT INTELLIGENCE', color: 'border-ochre text-ochre', desc: 'Groq Llama 3 LLM inferencing on audio notes, field text, and image evidence.' },
    { id: '03', title: '03 Mobile Companion', tag: 'FIELD OFFICERS APP', color: 'border-stamp-green text-stamp-green', desc: 'On-the-go incident logging, GPS spatial tags, and analyst review gates for field units.' },
    { id: '04', title: '04 Network Graph', tag: 'NEO4J LINK ANALYSIS', color: 'border-cobalt text-cobalt', desc: 'Entity-relationship link analysis connecting cases, suspects, and police jurisdictions.' },
    { id: '05', title: '05 Fairness Gate v2', tag: 'HUMAN REVIEW INVARIANT', color: 'border-purple-600 text-purple-600', desc: 'Automated policy auditability, underreporting checks, and analyst confirmation gates.' },
    { id: '06', title: '06 Multi-State SaaS', tag: 'STATE TENANT SYSTEM', color: 'border-ink text-ink', desc: 'Multi-tenant deployment configured by state (Karnataka, Delhi, Maharashtra, Tamil Nadu).' },
  ];

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Page Header */}
        <div className="border-b border-hairline pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              DECISION SUPPORT ANALYTICS & VISUALIZATION PLATFORM
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              State & District Intelligence Matrix
            </h1>
            <p className="font-sans text-xs text-ink-soft max-w-3xl mt-1">
              Explores Indian public safety metrics across state jurisdictions, compares district crime rates, clusters IPC section anomalies, and monitors CCTV metadata feeds.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="stamp-badge stamp-verified">
              <ShieldCheck size={14} />
              12 INTEGRATED MODULES ACTIVE
            </span>
          </div>
        </div>

        {/* ── Top Filters & Time Range Selector ───────────────────────── */}
        <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-cobalt" />
              <span className="font-bold text-ink uppercase">IPC Section Filter:</span>
            </div>
            <select 
              value={selectedIPC} 
              onChange={e => setSelectedIPC(e.target.value)}
              className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-ink outline-none"
            >
              <option value="ALL">ALL SECTIONS (IPC 379 / 420 / 354 / 380)</option>
              <option value="420">IPC 420 - Cyber Fraud & Scams</option>
              <option value="379">IPC 379 - Larceny & Vehicle Theft</option>
              <option value="354">IPC 354 - Public Safety Signal</option>
              <option value="380">IPC 380 - Dwelling & Commercial Theft</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-paper p-1 rounded border border-hairline">
            {(['DAILY', 'WEEKLY', 'MONTHLY'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                  timeRange === t ? 'bg-cobalt text-white shadow-sm' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── District / Zone Side-by-Side Comparison Module ──────────── */}
        <div className="ledger-panel rounded border border-hairline bg-paper-raised p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-ink">
              <BarChart3 size={18} className="text-cobalt" />
              Side-by-Side District / Zone Comparison
            </div>
            <span className="font-mono text-[10px] text-ink-soft uppercase">BENCHMARKING MATRIX</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* State A Selector & Metrics */}
            <div className="ledger-panel rounded p-5 border border-hairline bg-paper space-y-4">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <label className="font-mono text-[10px] text-ink-soft uppercase font-bold">STATE / REGION A</label>
                <select 
                  value={selectedStateA}
                  onChange={e => setSelectedStateA(e.target.value)}
                  className="bg-paper-raised border border-hairline rounded px-2.5 py-1 text-xs font-serif font-bold text-ink outline-none"
                >
                  {INDIAN_STATES_DATABASE.map(s => (
                    <option key={s.state} value={s.state}>{s.state}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-center">
                <div className="p-3 border border-hairline rounded bg-paper-raised">
                  <div className="text-[9px] text-ink-soft uppercase">Total Incidents</div>
                  <div className="font-serif font-bold text-xl text-ink">{stateA.total_incidents.toLocaleString()}</div>
                </div>
                <div className="p-3 border border-hairline rounded bg-paper-raised">
                  <div className="text-[9px] text-ink-soft uppercase">Closure Rate</div>
                  <div className="font-serif font-bold text-xl text-stamp-green">{stateA.solved_rate}%</div>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="text-[10px] text-ink-soft font-bold uppercase border-b border-hairline pb-1">DISTRICT BREAKDOWN</div>
                {stateA.districts.map((d, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-ink font-sans text-xs">{d.name}</span>
                    <span className="font-bold text-cobalt">{d.incidents_count} cases ({d.trend_pct > 0 ? `+${d.trend_pct}%` : `${d.trend_pct}%`})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* State B Selector & Metrics */}
            <div className="ledger-panel rounded p-5 border border-hairline bg-paper space-y-4">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <label className="font-mono text-[10px] text-ink-soft uppercase font-bold">STATE / REGION B</label>
                <select 
                  value={selectedStateB}
                  onChange={e => setSelectedStateB(e.target.value)}
                  className="bg-paper-raised border border-hairline rounded px-2.5 py-1 text-xs font-serif font-bold text-ink outline-none"
                >
                  {INDIAN_STATES_DATABASE.map(s => (
                    <option key={s.state} value={s.state}>{s.state}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-center">
                <div className="p-3 border border-hairline rounded bg-paper-raised">
                  <div className="text-[9px] text-ink-soft uppercase">Total Incidents</div>
                  <div className="font-serif font-bold text-xl text-ink">{stateB.total_incidents.toLocaleString()}</div>
                </div>
                <div className="p-3 border border-hairline rounded bg-paper-raised">
                  <div className="text-[9px] text-ink-soft uppercase">Closure Rate</div>
                  <div className="font-serif font-bold text-xl text-stamp-green">{stateB.solved_rate}%</div>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="text-[10px] text-ink-soft font-bold uppercase border-b border-hairline pb-1">DISTRICT BREAKDOWN</div>
                {stateB.districts.map((d, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-ink font-sans text-xs">{d.name}</span>
                    <span className="font-bold text-rust">{d.incidents_count} cases ({d.trend_pct > 0 ? `+${d.trend_pct}%` : `${d.trend_pct}%`})</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── CCTV Metadata & Real-Time Sensors Feed Module ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* CCTV Feed Panel */}
          <div className="ledger-panel rounded p-6 border border-hairline bg-paper-raised space-y-4">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
                <Video size={16} className="text-rust" />
                Live CCTV Metadata & Sensor Stream
              </div>
              <span className="stamp-badge stamp-live flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse"></span>
                LIVE SENSORS
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {LIVE_CCTV_FEEDS.map((feed) => (
                <div key={feed.camera_id} className="p-3 rounded border border-hairline bg-paper flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink">{feed.camera_id}</span>
                      <span className="text-[10px] text-ink-soft">({feed.fps} FPS)</span>
                    </div>
                    <div className="text-xs text-ink-soft font-sans">{feed.location}</div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {feed.detected_objects.map((obj, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-hairline/20 border border-hairline text-ink">
                          {obj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className={`stamp-badge ${feed.status === 'ALERT' ? 'stamp-alert' : 'stamp-verified'}`}>
                      {feed.status}
                    </span>
                    <div className="text-[10px] font-bold text-rust">SCORE: {feed.anomaly_score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar-Incident Clustering Engine Panel */}
          <div className="ledger-panel rounded p-6 border border-hairline bg-paper-raised space-y-4">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-ink">
                <Sparkles size={16} className="text-cobalt" />
                Similar-Incident Spatio-Temporal Clustering
              </div>
              <span className="font-mono text-[10px] text-ink-soft uppercase">QUICKML ENGINE</span>
            </div>

            <div className="p-4 rounded border border-cobalt/30 bg-cobalt/5 space-y-2 font-mono text-xs">
              <div className="font-bold text-cobalt uppercase">CLUSTER #AQ-CLR-441 (HIGH CORRELATION)</div>
              <p className="font-sans text-xs text-ink leading-relaxed">
                4 incidents across <strong>Connaught Place & Saket</strong> matched spatial proximity (within 1.2km radius) and temporal signatures (02:00 UTC - 04:00 UTC).
              </p>
              <div className="flex justify-between items-center pt-2 text-[10px] border-t border-cobalt/20">
                <span className="text-ink-soft">MATCH CONFIDENCE: 96.4%</span>
                <span className="stamp-badge stamp-live">CLUSTERED</span>
              </div>
            </div>

            <div className="p-4 rounded border border-hairline bg-paper space-y-2 font-mono text-xs">
              <div className="font-bold text-ink uppercase">CLUSTER #AQ-CLR-890 (MODERATE)</div>
              <p className="font-sans text-xs text-ink-soft leading-relaxed">
                2 cyber phishing reports in <strong>Bangalore Tech Corridor</strong> matched victim IP ranges and bank gateway endpoints.
              </p>
            </div>
          </div>

        </div>

        {/* ── Capability Tracks Navigator (Beyond MVP) ────────────────── */}
        <div className="space-y-4">
          <div className="border-b border-hairline pb-2 flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-ink">
              Beyond MVP — Capability Tracks
            </h3>
            <span className="font-mono text-xs text-ink-soft uppercase">HUMAN-IN-THE-LOOP INVARIANT INTACT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {CAPABILITY_TRACKS.map((track) => (
              <div 
                key={track.id}
                className="ledger-panel rounded p-5 border border-hairline bg-paper hover-scale-premium cursor-pointer"
              >
                <span className={`inline-block border px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase mb-3 ${track.color}`}>
                  {track.tag}
                </span>
                <h4 className="font-serif font-bold text-base text-ink mb-2">{track.title}</h4>
                <p className="text-xs text-ink-soft leading-relaxed">{track.desc}</p>
              </div>
            ))}
          </div>

          {/* Manifesto Footer Banner */}
          <div className="ledger-panel rounded p-4 border border-hairline bg-ink text-paper text-center font-serif text-xs md:text-sm font-bold tracking-wide">
            Every future capability keeps the human-in-the-loop invariant intact. AegisIQ scales by decision support — never toward autonomous policing.
          </div>
        </div>

      </div>
    </LedgerShell>
  );
}
