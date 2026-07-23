'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Plus, AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function NewIncidentPage() {
  const router = useRouter();
  const [category, setCategory] = useState('Property Trespass');
  const [district, setDistrict] = useState('Delhi Central');
  const [location, setLocation] = useState('400 BLOCK OF KEARNY ST');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/incidents');
    }, 1200);
  };

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto font-sans">
        
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <div>
            <div className="font-mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              FIELD ENTRY FORM
            </div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Register New Incident Entry
            </h1>
          </div>

          <button 
            onClick={() => router.back()}
            className="py-2 px-4 rounded border border-hairline bg-paper-raised text-ink font-mono text-xs font-bold hover:bg-paper flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            BACK TO LEDGER
          </button>
        </div>

        {submitted && (
          <div className="p-4 rounded bg-stamp-green/10 border border-stamp-green/30 text-stamp-green font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-pulse">
            <CheckCircle2 size={18} />
            INCIDENT STAMPED AND ADDED TO REAL-TIME LEDGER. REDIRECTING...
          </div>
        )}

        <form onSubmit={handleSubmit} className="ledger-panel rounded p-6 border border-hairline bg-paper-raised space-y-6 font-mono text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] text-ink-soft uppercase mb-1">INCIDENT CATEGORY</label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-paper border border-hairline rounded px-3 py-2 text-xs text-ink outline-none"
              >
                <option value="Property Trespass">Property Trespass</option>
                <option value="Noise Disturbance">Noise Disturbance</option>
                <option value="Vehicle Recovery">Vehicle Recovery</option>
                <option value="Cyber-Phishing Spike">Cyber-Phishing Spike</option>
                <option value="Public Safety Signal">Public Safety Signal</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-ink-soft uppercase mb-1">STATE / DISTRICT</label>
              <select 
                value={district} 
                onChange={e => setDistrict(e.target.value)}
                className="w-full bg-paper border border-hairline rounded px-3 py-2 text-xs text-ink outline-none"
              >
                <option value="Delhi Central">Delhi Central / Connaught Place</option>
                <option value="Mumbai South">Mumbai South / Marine Drive</option>
                <option value="Bangalore East">Bangalore East / Tech Corridor</option>
                <option value="Chennai Central">Chennai Central / Port</option>
                <option value="Hyderabad Cyberabad">Hyderabad Cyberabad</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-ink-soft uppercase mb-1">MASKED LOCATION / BLOCK</label>
            <input 
              type="text" 
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full bg-paper border border-hairline rounded px-3 py-2 text-xs text-ink outline-none focus:border-cobalt"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] text-ink-soft uppercase mb-1">FIELD NARRATIVE / OBSERVATIONS</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter incident observation details..."
              className="w-full h-24 bg-paper border border-hairline rounded p-3 text-xs text-ink outline-none focus:border-cobalt resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded bg-cobalt text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-cobalt-dark shadow-sm transition-all"
          >
            + STAMP & REGISTER INCIDENT
          </button>
        </form>

      </div>
    </LedgerShell>
  );
}
