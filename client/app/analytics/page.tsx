'use client';

import React, { useState } from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { 
  BarChart3, TrendingUp, SlidersHorizontal, Filter, 
  MapPin, Layers, ShieldCheck, Activity, Video, Smartphone, 
  Share2, ArrowUpRight, ArrowDownRight, RefreshCw, Sparkles, X, Download, FileText 
} from 'lucide-react';
import { INDIAN_STATES_DATABASE, LIVE_CCTV_FEEDS, IndianStateMetric } from '@/data/indian-public-safety';
import { downloadCSV, downloadPDF, ReportItem } from '@/lib/export-utils';

export default function AnalyticsPage() {
  const [selectedStateA, setSelectedStateA] = useState<string>('Karnataka');
  const [selectedStateB, setSelectedStateB] = useState<string>('Delhi (UT)');
  const [selectedIPC, setSelectedIPC] = useState<string>('ALL');
  const [timeRange, setTimeRange] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('WEEKLY');
  const [activeModalTrack, setActiveModalTrack] = useState<any | null>(null);

  const stateA = INDIAN_STATES_DATABASE.find(s => s.state === selectedStateA) || INDIAN_STATES_DATABASE[0];
  const stateB = INDIAN_STATES_DATABASE.find(s => s.state === selectedStateB) || INDIAN_STATES_DATABASE[1];

  // Dynamic Time Range Multipliers
  const timeMultiplier = timeRange === 'DAILY' ? 0.15 : timeRange === 'MONTHLY' ? 4.2 : 1.0;

  // Filter Districts by IPC Section
  const filterDistricts = (districts: typeof stateA.districts) => {
    if (selectedIPC === 'ALL') return districts;
    return districts.filter(d => d.ipc_section.includes(selectedIPC) || d.category.toLowerCase().includes(selectedIPC.toLowerCase()));
  };

  const districtsA = filterDistricts(stateA.districts);
  const districtsB = filterDistricts(stateB.districts);

  const CAPABILITY_TRACKS = [
    { 
      id: '01', 
      title: '01 Real-Time Streams', 
      tag: 'CCTV & SENSOR METADATA', 
      color: 'border-rust text-rust', 
      desc: 'Live CCTV metadata, sensor feeds & 112 dispatch anomaly detection pipelines.',
      details: 'Ingesting 14,200 active municipal sensor nodes across Delhi NCR, Mumbai South, and Bangalore Tech Corridor with 500ms latency.'
    },
    { 
      id: '02', 
      title: '02 Multi-Modal AI', 
      tag: 'IMAGE & TEXT INTELLIGENCE', 
      color: 'border-ochre text-ochre', 
      desc: 'Groq Llama 3 LLM inferencing on audio notes, field text, and image evidence.',
      details: 'Groq Llama 3 70B parameter model executing plain-text explainability narratives and pattern discovery on dispatch logs.'
    },
    { 
      id: '03', 
      title: '03 Mobile Companion', 
      tag: 'FIELD OFFICERS APP', 
      color: 'border-stamp-green text-stamp-green', 
      desc: 'On-the-go incident logging, GPS spatial tags, and analyst review gates for field units.',
      details: 'Mobile PWA supporting offline dispatch queuing, GPS spatial coordinate stamping, and officer voice-to-text logging.'
    },
    { 
      id: '04', 
      title: '04 Network Graph', 
      tag: 'NEO4J LINK ANALYSIS', 
      color: 'border-cobalt text-cobalt', 
      desc: 'Entity-relationship link analysis connecting cases, suspects, and police jurisdictions.',
      details: 'Graph database Cypher queries evaluating 1-to-N relationships linking incident clusters to repeating CAD caller numbers.'
    },
    { 
      id: '05', 
      title: '05 Fairness Gate v2', 
      tag: 'HUMAN REVIEW INVARIANT', 
      color: 'border-purple-600 text-purple-600', 
      desc: 'Automated policy auditability, underreporting checks, and analyst confirmation gates.',
      details: 'Strict human-in-the-loop gating preventing automated resource allocation without Level-5 officer electronic sign-off.'
    },
    { 
      id: '06', 
      title: '06 Multi-State SaaS', 
      tag: 'STATE TENANT SYSTEM', 
      color: 'border-ink text-ink', 
      desc: 'Multi-tenant deployment configured by state (Karnataka, Delhi, Maharashtra, Tamil Nadu).',
      details: 'Multi-tenant data isolation partitioning state police records while enabling inter-state intelligence sharing.'
    },
  ];

  const handleExportCSV = () => {
    const exportData = [...districtsA, ...districtsB].map(d => ({
      District: d.name,
      IPC_Section: d.ipc_section,
      Category: d.category,
      Incidents_Count: Math.round(d.incidents_count * timeMultiplier),
      Risk_Level: d.risk_level,
      Trend_Pct: `${d.trend_pct}%`,
      Time_Window: timeRange,
    }));
    downloadCSV(`AegisIQ_Matrix_${selectedStateA}_vs_${selectedStateB}`, exportData);
  };

  const handleExportPDF = () => {
    const pdfItems: ReportItem[] = [...districtsA, ...districtsB].map((d, idx) => ({
      id: `#AQ-MAT-${idx + 101}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      category: d.category,
      ipc_section: d.ipc_section,
      district: d.name,
      risk_score: Math.round(d.incidents_count * 0.05),
      status: d.risk_level,
      provenance: 'VERIFIED',
    }));
    downloadPDF(`State & District Intelligence Matrix (${selectedStateA} vs ${selectedStateB})`, pdfItems);
  };

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto font-sans selection:bg-cobalt selection:text-white relative">
        
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
            <button
              onClick={handleExportCSV}
              className="py-2 px-3 rounded border border-hairline bg-paper-raised text-ink font-bold hover:bg-paper transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              EXPORT CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="py-2 px-3 rounded bg-cobalt text-white font-bold hover:bg-cobalt-dark transition-all flex items-center gap-1.5 shadow-sm"
            >
              <FileText size={13} />
              EXPORT PDF BRIEF
            </button>
          </div>
        </div>

        {/* ── Top Dynamic Filters & Time Range Selector ─────────────────── */}
        <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-cobalt" />
              <span className="font-bold text-ink uppercase">IPC Section Filter:</span>
            </div>
            <select 
              value={selectedIPC} 
              onChange={e => setSelectedIPC(e.target.value)}
              className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-ink font-bold outline-none cursor-pointer hover:border-cobalt transition-colors"
            >
              <option value="ALL">ALL SECTIONS (IPC 379 / 420 / 354 / 380)</option>
              <option value="420">IPC 420 - Cyber Fraud & Scams</option>
              <option value="379">IPC 379 - Larceny & Vehicle Theft</option>
              <option value="354">IPC 354 - Public Safety Signal</option>
              <option value="380">IPC 380 - Dwelling & Commercial Theft</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-paper p-1 rounded border border-hairline">
            <span className="text-[10px] text-ink-soft px-2 font-bold uppercase">TIME WINDOW:</span>
            {(['DAILY', 'WEEKLY', 'MONTHLY'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-all duration-200 ${
                  timeRange === t ? 'bg-cobalt text-white shadow-sm' : 'text-ink-soft hover:text-ink hover:bg-paper-raised'
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
              Side-by-Side District / Zone Comparison ({timeRange} VIEW)
            </div>
            <span className="font-mono text-[10px] text-ink-soft uppercase font-bold">
              FILTER: {selectedIPC === 'ALL' ? 'ALL IPC SECTIONS' : `IPC ${selectedIPC}`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* State A Selector & Metrics */}
            <div className="ledger-panel rounded p-5 border border-hairline bg-paper space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <label className="font-mono text-[10px] text-ink-soft uppercase font-bold">STATE / REGION A</label>
                <select 
                  value={selectedStateA}
                  onChange={e => setSelectedStateA(e.target.value)}
                  className="bg-paper-raised border border-hairline rounded px-2.5 py-1 text-xs font-serif font-bold text-ink outline-none cursor-pointer"
                >
                  {INDIAN_STATES_DATABASE.map(s => (
                    <option key={s.state} value={s.state}>{s.state}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-center">
                <div className="p-3 border border-hairline rounded bg-paper-raised">
                  <div className="text-[9px] text-ink-soft uppercase font-bold">Total Incidents</div>
                  <div className="font-serif font-bold text-xl text-ink">
                    {Math.round(stateA.total_incidents * timeMultiplier).toLocaleString()}
                  </div>
                </div>
                <div className="p-3 border border-hairline rounded bg-paper-raised">
                  <div className="text-[9px] text-ink-soft uppercase font-bold">Closure Rate</div>
                  <div className="font-serif font-bold text-xl text-stamp-green">{stateA.solved_rate}%</div>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="text-[10px] text-ink-soft font-bold uppercase border-b border-hairline pb-1 flex justify-between">
                  <span>DISTRICT BREAKDOWN</span>
                  <span>{districtsA.length} SECTIONS</span>
                </div>
                {districtsA.length === 0 ? (
                  <div className="text-xs text-ink-soft italic py-2">No districts match IPC {selectedIPC} section.</div>
                ) : (
                  districtsA.map((d, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-hairline/40 last:border-0">
                      <div>
                        <div className="text-ink font-sans text-xs font-bold">{d.name}</div>
                        <div className="text-[9px] text-ink-soft">{d.ipc_section}</div>
                      </div>
                      <span className="font-bold text-cobalt">
                        {Math.round(d.incidents_count * timeMultiplier)} cases ({d.trend_pct > 0 ? `+${d.trend_pct}%` : `${d.trend_pct}%`})
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* State B Selector & Metrics */}
            <div className="ledger-panel rounded p-5 border border-hairline bg-paper space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <label className="font-mono text-[10px] text-ink-soft uppercase font-bold">STATE / REGION B</label>
                <select 
                  value={selectedStateB}
                  onChange={e => setSelectedStateB(e.target.value)}
                  className="bg-paper-raised border border-hairline rounded px-2.5 py-1 text-xs font-serif font-bold text-ink outline-none cursor-pointer"
                >
                  {INDIAN_STATES_DATABASE.map(s => (
                    <option key={s.state} value={s.state}>{s.state}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-center">
                <div className="p-3 border border-hairline rounded bg-paper-raised">
                  <div className="text-[9px] text-ink-soft uppercase font-bold">Total Incidents</div>
                  <div className="font-serif font-bold text-xl text-ink">
                    {Math.round(stateB.total_incidents * timeMultiplier).toLocaleString()}
                  </div>
                </div>
                <div className="p-3 border border-hairline rounded bg-paper-raised">
                  <div className="text-[9px] text-ink-soft uppercase font-bold">Closure Rate</div>
                  <div className="font-serif font-bold text-xl text-stamp-green">{stateB.solved_rate}%</div>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="text-[10px] text-ink-soft font-bold uppercase border-b border-hairline pb-1 flex justify-between">
                  <span>DISTRICT BREAKDOWN</span>
                  <span>{districtsB.length} SECTIONS</span>
                </div>
                {districtsB.length === 0 ? (
                  <div className="text-xs text-ink-soft italic py-2">No districts match IPC {selectedIPC} section.</div>
                ) : (
                  districtsB.map((d, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-hairline/40 last:border-0">
                      <div>
                        <div className="text-ink font-sans text-xs font-bold">{d.name}</div>
                        <div className="text-[9px] text-ink-soft">{d.ipc_section}</div>
                      </div>
                      <span className="font-bold text-rust">
                        {Math.round(d.incidents_count * timeMultiplier)} cases ({d.trend_pct > 0 ? `+${d.trend_pct}%` : `${d.trend_pct}%`})
                      </span>
                    </div>
                  ))
                )}
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
                <div key={feed.camera_id} className="p-3 rounded border border-hairline bg-paper flex items-start justify-between shadow-sm hover:border-cobalt transition-colors">
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
              <span className="font-mono text-[10px] text-ink-soft uppercase font-bold">QUICKML ENGINE</span>
            </div>

            <div className="p-4 rounded border border-cobalt/30 bg-cobalt/5 space-y-2 font-mono text-xs shadow-sm">
              <div className="font-bold text-cobalt uppercase">CLUSTER #AQ-CLR-441 (HIGH CORRELATION)</div>
              <p className="font-sans text-xs text-ink leading-relaxed">
                4 incidents across <strong>Connaught Place & Saket</strong> matched spatial proximity (within 1.2km radius) and temporal signatures (02:00 UTC - 04:00 UTC).
              </p>
              <div className="flex justify-between items-center pt-2 text-[10px] border-t border-cobalt/20">
                <span className="text-ink-soft">MATCH CONFIDENCE: 96.4%</span>
                <span className="stamp-badge stamp-live">CLUSTERED</span>
              </div>
            </div>

            <div className="p-4 rounded border border-hairline bg-paper space-y-2 font-mono text-xs shadow-sm">
              <div className="font-bold text-ink uppercase">CLUSTER #AQ-CLR-890 (MODERATE)</div>
              <p className="font-sans text-xs text-ink-soft leading-relaxed">
                2 cyber phishing reports in <strong>Bangalore Tech Corridor</strong> matched victim IP ranges and bank gateway endpoints.
              </p>
            </div>
          </div>

        </div>

        {/* ── Interactive Capability Tracks Navigator (Beyond MVP) ──────── */}
        <div className="space-y-4">
          <div className="border-b border-hairline pb-2 flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-ink">
              Beyond MVP — Interactive Capability Tracks
            </h3>
            <span className="font-mono text-xs text-ink-soft uppercase font-bold">CLICK TRACK CARD FOR LIVE DEMO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {CAPABILITY_TRACKS.map((track) => (
              <div 
                key={track.id}
                onClick={() => setActiveModalTrack(track)}
                className="ledger-panel rounded p-5 border border-hairline bg-paper hover-scale-premium cursor-pointer shadow-sm relative group"
              >
                <span className={`inline-block border px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase mb-3 ${track.color}`}>
                  {track.tag}
                </span>
                <h4 className="font-serif font-bold text-base text-ink mb-2 group-hover:text-cobalt transition-colors">{track.title}</h4>
                <p className="text-xs text-ink-soft leading-relaxed">{track.desc}</p>
                <div className="mt-4 font-mono text-[10px] text-cobalt font-bold uppercase flex items-center gap-1">
                  <span>Explore Track Demo</span>
                  <ArrowUpRight size={12} />
                </div>
              </div>
            ))}
          </div>

          {/* Manifesto Footer Banner */}
          <div className="ledger-panel rounded p-4 border border-hairline bg-ink text-paper text-center font-serif text-xs md:text-sm font-bold tracking-wide shadow-md">
            Every future capability keeps the human-in-the-loop invariant intact. AegisIQ scales by decision support — never toward autonomous policing.
          </div>
        </div>

        {/* ── Capability Track Interactive Modal Drawer ───────────────── */}
        {activeModalTrack && (
          <div className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up">
            <div className="bg-paper-raised border border-hairline rounded max-w-xl w-full p-6 space-y-6 shadow-2xl relative font-sans text-ink">
              
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className={`border px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${activeModalTrack.color}`}>
                  {activeModalTrack.tag}
                </span>
                <button 
                  onClick={() => setActiveModalTrack(null)}
                  className="p-1 rounded hover:bg-paper text-ink-soft hover:text-ink transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-ink">{activeModalTrack.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{activeModalTrack.desc}</p>
              </div>

              <div className="p-4 rounded border border-hairline bg-paper font-mono text-xs space-y-2">
                <div className="font-bold text-cobalt uppercase">CAPABILITY SPECIFICATION</div>
                <p className="text-xs text-ink leading-relaxed">{activeModalTrack.details}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveModalTrack(null)}
                  className="py-2 px-5 rounded bg-cobalt text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-cobalt-dark shadow-sm transition-all"
                >
                  CLOSE SPECIFICATION
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </LedgerShell>
  );
}
