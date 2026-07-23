'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { 
  Search, ExternalLink, Filter, ChevronLeft, ChevronRight, 
  Plus, Layers, ShieldCheck, Database, TrendingUp, TrendingDown, Minus 
} from 'lucide-react';

const LEDGER_ROWS = [
  { id: '#AQ-294-81', timestamp: '2026.07.21 14:32:01', category: 'Property Trespass', location: '400 BLOCK OF KEARNY ST', provenance: 'VERIFIED', stampClass: 'stamp-verified' },
  { id: '#AQ-294-85', timestamp: '2026.07.21 14:45:12', category: 'Noise Disturbance', location: '100 BLOCK OF MARKET ST', provenance: 'PERIODIC', stampClass: 'stamp-periodic' },
  { id: '#AQ-294-89', timestamp: '2026.07.21 15:01:44', category: 'Vehicle Recovery', location: '2200 BLOCK OF VALENCIA ST', provenance: 'VERIFIED', stampClass: 'stamp-verified' },
  { id: '#AQ-294-92', timestamp: '2026.07.21 15:22:10', category: 'System Anomaly', location: 'BLOCK MASKED - INFRASTRUCTURE', provenance: 'PERIODIC', stampClass: 'stamp-periodic' },
  { id: '#AQ-294-98', timestamp: '2026.07.21 16:05:00', category: 'Public Safety Signal', location: '100 BLOCK OF POST ST', provenance: 'VERIFIED', stampClass: 'stamp-verified' },
  { id: '#AQ-295-01', timestamp: '2026.07.21 16:12:30', category: 'Unscheduled Maintenance', location: '300 BLOCK OF MISSION ST', provenance: 'PERIODIC', stampClass: 'stamp-periodic' },
];

const INTELLIGENCE_FEEDS = [
  {
    district: 'DISTRICT 04',
    change: '+4.2%',
    isUp: true,
    title: 'Residential Theft',
    forecast: '7-Day Forecast: Moderate Ascent',
    svgPath: 'M0,15 Q15,5 30,12 T60,8 T90,2',
  },
  {
    district: 'DISTRICT 11',
    change: '-1.8%',
    isUp: false,
    title: 'Commercial Vandalism',
    forecast: '7-Day Forecast: Stable Decline',
    svgPath: 'M0,5 Q15,15 30,10 T60,18 T90,22',
  },
  {
    district: 'DISTRICT 09',
    change: '+/- 0.0%',
    isNeutral: true,
    title: 'Field Incursions',
    forecast: '7-Day Forecast: Nominal Activity',
    svgPath: 'M0,12 L30,12 L60,12 L90,12',
  },
];

export default function IncidentsLedgerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('ALL_TIERS');
  const [selectedCategory, setSelectedCategory] = useState('ALL_CATEGORIES');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL_REGIONS');

  const filteredRows = LEDGER_ROWS.filter(r => {
    const text = `${r.id} ${r.category} ${r.location}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
        
        {/* Main Grid: Left Intelligence Feeds vs Right Table & Map preview */}
        <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
          
          {/* Left Column: Intelligence Feed Cards */}
          <div className="space-y-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-ink-soft mb-2">
              Intelligence Feed
            </h2>

            {INTELLIGENCE_FEEDS.map((feed, idx) => (
              <div key={idx} className="ledger-panel rounded p-4 border border-hairline bg-paper-raised">
                <div className="flex items-center justify-between font-mono text-[10px] text-ink-soft mb-1">
                  <span>{feed.district}</span>
                  <span className={feed.isUp ? 'text-rust font-bold' : feed.isNeutral ? 'text-ink-soft' : 'text-stamp-green font-bold'}>
                    {feed.change}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm text-ink mb-3">{feed.title}</h3>

                {/* Mini Sparkline Chart */}
                <div className="h-10 w-full mb-3 flex items-center justify-center border-b border-hairline/40 pb-2">
                  <svg className="w-full h-8" viewBox="0 0 90 25" preserveAspectRatio="none">
                    <path 
                      d={feed.svgPath} 
                      fill="none" 
                      stroke={feed.isUp ? '#A63B2A' : feed.isNeutral ? '#5B6570' : '#3F6B57'} 
                      strokeWidth="2" 
                    />
                  </svg>
                </div>

                <p className="font-mono text-[9px] text-ink-soft uppercase">{feed.forecast}</p>
              </div>
            ))}

            <Link 
              href="/incidents/new" 
              className="w-full py-3 px-4 rounded bg-ink text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-black transition-all"
            >
              + NEW INCIDENT
            </Link>
          </div>

          {/* Right Column: Filters Bar & Main Ledger Table */}
          <div className="space-y-6">
            
            {/* Top Filters Header Bar */}
            <div className="flex flex-wrap gap-4 items-center justify-between bg-paper-raised p-4 border border-hairline rounded">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <div>
                  <label className="block text-[9px] text-ink-soft uppercase mb-1">TIER RANGE</label>
                  <select 
                    value={selectedTier} 
                    onChange={e => setSelectedTier(e.target.value)}
                    className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-ink outline-none"
                  >
                    <option value="ALL_TIERS">ALL_TIERS</option>
                    <option value="TIER_1">TIER_1_LIVE</option>
                    <option value="TIER_2">TIER_2_VERIFIED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] text-ink-soft uppercase mb-1">CATEGORY</label>
                  <select 
                    value={selectedCategory} 
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-ink outline-none"
                  >
                    <option value="ALL_CATEGORIES">ALL_CATEGORIES</option>
                    <option value="PROPERTY">PROPERTY_TRESPASS</option>
                    <option value="NOISE">NOISE_DISTURBANCE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] text-ink-soft uppercase mb-1">DISTRICT</label>
                  <select 
                    value={selectedDistrict} 
                    onChange={e => setSelectedDistrict(e.target.value)}
                    className="bg-paper border border-hairline rounded px-3 py-1.5 text-xs text-ink outline-none"
                  >
                    <option value="ALL_REGIONS">ALL_REGIONS</option>
                    <option value="DELHI">DELHI_NCR</option>
                    <option value="MUMBAI">MUMBAI_METRO</option>
                  </select>
                </div>
              </div>

              {/* Case Search Input */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-3 text-ink-soft" />
                <input 
                  type="text" 
                  placeholder="CASE_ID_SEARCH..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-paper border border-hairline rounded pl-9 pr-3 py-1.5 text-xs font-mono text-ink outline-none focus:border-cobalt"
                />
              </div>
            </div>

            {/* Main Ledger Table */}
            <div className="ledger-panel rounded border border-hairline bg-paper-raised overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-hairline bg-paper/60 text-[10px] text-ink-soft uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3 font-semibold">CASE #</th>
                      <th className="px-5 py-3 font-semibold">TIMESTAMP</th>
                      <th className="px-5 py-3 font-semibold font-sans">CATEGORY</th>
                      <th className="px-5 py-3 font-semibold">LOCATION (MASKED)</th>
                      <th className="px-5 py-3 font-semibold">PROVENANCE</th>
                      <th className="px-5 py-3 font-semibold text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {filteredRows.map((row) => (
                      <tr key={row.id} className="hover:bg-paper/50 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-cobalt">{row.id}</td>
                        <td className="px-5 py-3.5 text-ink-soft">{row.timestamp}</td>
                        <td className="px-5 py-3.5 font-sans font-bold text-ink">{row.category}</td>
                        <td className="px-5 py-3.5 text-ink-soft">{row.location}</td>
                        <td className="px-5 py-3.5">
                          <span className={`stamp-badge ${row.stampClass}`}>{row.provenance}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Link href={`/cases/${row.id.replace('#', '')}`} className="inline-block text-ink-soft hover:text-cobalt p-1">
                            <ExternalLink size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination */}
              <div className="p-4 border-t border-hairline bg-paper/40 flex items-center justify-between text-[11px] font-mono text-ink-soft">
                <span>SHOWING 1-6 OF 124 VERIFIED RECORDS</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:text-ink disabled:opacity-30"><ChevronLeft size={16} /></button>
                  <span className="font-bold text-ink">1</span>
                  <span>2</span>
                  <span>3</span>
                  <button className="p-1 hover:text-ink"><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Map Thumbnail + Metadata Analysis Card */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
              
              {/* Regional Map Preview Thumbnail */}
              <div className="ledger-panel rounded border border-hairline bg-[#E2DFD5] h-48 relative overflow-hidden flex items-center justify-center">
                <span className="absolute top-3 left-3 bg-paper-raised px-2.5 py-1 border border-hairline rounded text-[10px] font-mono font-bold text-ink uppercase">
                  REGIONAL HOTSPOT OVERLAY
                </span>
                <svg className="w-full h-full opacity-30" viewBox="0 0 500 200">
                  <circle cx="250" cy="100" r="60" fill="rgba(43,90,160,0.15)" stroke="#2B5AA0" strokeWidth="1" />
                  <circle cx="250" cy="100" r="30" fill="rgba(166,59,42,0.2)" stroke="#A63B2A" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Metadata Analysis Card */}
              <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised flex flex-col justify-between font-mono text-xs">
                <div>
                  <h4 className="text-[10px] text-ink-soft uppercase tracking-wider border-b border-hairline pb-2 mb-3">
                    METADATA ANALYSIS
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-ink-soft">Aggregation Rate</span>
                      <span className="font-bold text-ink">0.942ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-soft">Confidence Score</span>
                      <span className="font-bold text-stamp-green">98.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-soft">Active Sensors</span>
                      <span className="font-bold text-ink">14,204</span>
                    </div>
                  </div>
                </div>

                <p className="text-[9px] text-ink-soft italic leading-tight mt-4 pt-2 border-t border-hairline">
                  The information contained in this ledger has been cross-referenced with regional field intelligence. Timestamp integrity is verified by the central datum node.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </LedgerShell>
  );
}
