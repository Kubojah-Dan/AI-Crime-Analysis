'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Search, Hash, MapPin, User, Car, FileText, ArrowUpRight, Network } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const searchResults = [
    { type: 'INCIDENT', id: '23-05-28-1127', title: 'Armed Robbery Reported', subtitle: 'Lucknow, Hazratganj • Beat 4', confidence: '96%', link: '/cases/23-05-28-1127' },
    { type: 'VEHICLE', id: 'ALPR-UP-32-AB-9988', title: 'Stolen White SUV (ALPR Hit)', subtitle: 'Matched CAM-DEL-CP-04 • 10:18 UTC', confidence: '92%', link: '/entities/ALPR-UP-32-AB-9988' },
    { type: 'PERSON', id: 'SUSPECT-ENT-441', title: 'Alias "Raju Black" (Repeat MO)', subtitle: 'Linked to Cluster #AQ-CLR-441', confidence: '88%', link: '/entities/SUSPECT-ENT-441' },
    { type: 'PHONE', id: 'CALLER-91-9876543210', title: '+91 98765 43210 (112 Intake)', subtitle: '3 Emergency Dispatch Calls Logged', confidence: '99%', link: '/entities/CALLER-91-9876543210' },
  ];

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Search Header */}
        <div className="border-b border-hairline pb-4">
          <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
            CROSS-SYSTEM ENTITY & CASE RESOLUTION
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink">
            Global Search Engine
          </h1>
        </div>

        {/* Input Bar */}
        <div className="relative max-w-2xl">
          <Search size={18} className="absolute left-4 top-3.5 text-cobalt" />
          <input 
            type="text"
            placeholder="Search by case ID, suspect name, vehicle plate, phone number, or station limit..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-paper border border-hairline rounded pl-11 pr-4 py-3 text-sm text-ink font-mono outline-none focus:border-cobalt shadow-sm"
          />
        </div>

        {/* Results List */}
        <div className="space-y-3 font-mono text-xs">
          <div className="font-bold text-ink uppercase text-[10px] tracking-wider">
            SEARCH RESULTS ({searchResults.length} MATCHES FOUND)
          </div>

          <div className="space-y-3">
            {searchResults.map((res, i) => (
              <div key={i} className="ledger-panel rounded p-4 border border-hairline bg-paper-raised flex items-center justify-between shadow-sm hover:border-cobalt transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cobalt/10 border border-cobalt/30 text-cobalt font-bold text-[10px] uppercase">
                      {res.type}
                    </span>
                    <span className="font-bold text-ink text-sm font-serif">{res.title}</span>
                  </div>
                  <div className="text-xs text-ink-soft font-sans">{res.subtitle}</div>
                  <div className="text-[10px] text-ink-soft">ENTITY ID: {res.id}</div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="stamp-badge stamp-verified">{res.confidence} MATCH</span>
                  <Link
                    href={res.link}
                    className="py-2 px-4 rounded bg-cobalt text-white font-bold text-xs uppercase flex items-center gap-1 hover:bg-cobalt-dark transition-all"
                  >
                    View Entity
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </LedgerShell>
  );
}

export default function GlobalSearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-mono text-xs text-ink-soft">Loading Search Engine...</div>}>
      <SearchContent />
    </Suspense>
  );
}
