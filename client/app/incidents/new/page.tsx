'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Plus, AlertTriangle, CheckCircle2, ArrowLeft, Camera, Mic, MapPin, Hash, ShieldCheck, WifiOff } from 'lucide-react';

export default function NewIncidentPage() {
  const router = useRouter();
  const [category, setCategory] = useState('Property Trespass');
  const [district, setDistrict] = useState('Lucknow, Hazratganj');
  const [location, setLocation] = useState('26.8467, 80.9462');
  const [surveyType, setSurveyType] = useState('Foot Patrol Observation');
  const [riskPerception, setRiskPerception] = useState<'Low' | 'Medium' | 'High'>('High');
  const [description, setDescription] = useState('Crowd gathering near market. No immediate threat observed.');
  const [submitted, setSubmitted] = useState(false);
  const [evidenceAttached, setEvidenceAttached] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/incidents');
    }, 1200);
  };

  return (
    <LedgerShell>
      <div className="p-6 md:p-8 space-y-6 max-w-xl mx-auto font-sans selection:bg-cobalt selection:text-white">
        
        {/* Mobile Ledger Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-4">
          <div>
            <span className="font-serif font-bold text-lg text-cobalt block">Field Survey Ledger</span>
            <span className="font-mono text-[10px] text-ink-soft uppercase font-bold">AegisIQ Field Mobile Companion</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="stamp-badge stamp-verified flex items-center gap-1 font-mono text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-stamp-green"></span>
              ONLINE / LOCAL QUEUE
            </span>
          </div>
        </div>

        {submitted && (
          <div className="p-4 rounded bg-stamp-green/10 border border-stamp-green/30 text-stamp-green font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-pulse">
            <CheckCircle2 size={18} />
            FIELD SURVEY STAMPED & QUEUED FOR SYNC. REDIRECTING...
          </div>
        )}

        {/* Field Survey Ledger Form Card */}
        <form onSubmit={handleSubmit} className="ledger-panel rounded p-6 border border-hairline bg-paper-raised space-y-5 font-mono text-xs shadow-md">
          
          <div className="flex justify-between items-center text-[10px] border-b border-hairline pb-2">
            <div>
              <span className="text-ink-soft">SURVEY ID: </span>
              <span className="font-bold text-ink">FS-2025-05-28-0017</span>
            </div>
            <div className="text-ink-soft">LAST SYNC: 09:41 AM</div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] text-ink-soft uppercase font-bold">LOCATION / GPS STAMP</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-2.5 text-cobalt" />
              <input 
                type="text" 
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-paper border border-hairline rounded pl-9 pr-3 py-2 text-xs text-ink font-bold outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-ink-soft uppercase font-bold mb-1">SURVEY TYPE</label>
              <select 
                value={surveyType} 
                onChange={e => setSurveyType(e.target.value)}
                className="w-full bg-paper border border-hairline rounded px-2.5 py-2 text-xs text-ink outline-none font-bold"
              >
                <option value="Foot Patrol Observation">Foot Patrol Observation</option>
                <option value="Vehicle Patrol Check">Vehicle Patrol Check</option>
                <option value="112 On-Scene Verification">112 On-Scene Verification</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-ink-soft uppercase font-bold mb-1">BEAT / DISTRICT</label>
              <select 
                value={district} 
                onChange={e => setDistrict(e.target.value)}
                className="w-full bg-paper border border-hairline rounded px-2.5 py-2 text-xs text-ink outline-none font-bold"
              >
                <option value="Lucknow, Hazratganj">Lucknow, Hazratganj</option>
                <option value="Delhi, Connaught Place">Delhi, Connaught Place</option>
                <option value="Bangalore, Tech Corridor">Bangalore, Tech Corridor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-ink-soft uppercase font-bold mb-1">FIELD OBSERVATION / NARRATIVE</label>
            <textarea 
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full h-24 bg-paper border border-hairline rounded p-3 text-xs text-ink font-sans outline-none focus:border-cobalt resize-none"
              required
            />
          </div>

          {/* Photos / Evidence Attachments */}
          <div className="space-y-2">
            <label className="block text-[10px] text-ink-soft uppercase font-bold">PHOTOS / EVIDENCE ATTACHMENT</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setEvidenceAttached(true)}
                className="flex-1 py-3 border border-dashed border-hairline rounded bg-paper flex items-center justify-center gap-2 hover:border-cobalt text-ink font-bold transition-all cursor-pointer"
              >
                <Camera size={18} className="text-cobalt" />
                <span>Capture Photo</span>
              </button>
              <button
                type="button"
                className="py-3 px-4 border border-dashed border-hairline rounded bg-paper flex items-center justify-center gap-2 hover:border-cobalt text-ink font-bold transition-all cursor-pointer"
              >
                <Mic size={18} className="text-rust" />
                <span>Dictate Note</span>
              </button>
            </div>
            {evidenceAttached && (
              <div className="text-[9px] text-stamp-green font-bold flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span>Photo Evidence Attached (Hash: 9c7f...a2b1 SHA-256)</span>
              </div>
            )}
          </div>

          {/* Risk Perception Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] text-ink-soft uppercase font-bold">MOOD / RISK PERCEPTION</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Low', 'Medium', 'High'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRiskPerception(r)}
                  className={`py-2 rounded text-xs font-bold transition-all ${
                    riskPerception === r
                      ? r === 'High' ? 'bg-rust text-white shadow-sm' : r === 'Medium' ? 'bg-ochre text-white shadow-sm' : 'bg-stamp-green text-white shadow-sm'
                      : 'bg-paper text-ink-soft border border-hairline'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded bg-cobalt text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-cobalt-dark shadow-md transition-all cursor-pointer"
          >
            Submit & Sync Field Ledger Entry
          </button>

        </form>

      </div>
    </LedgerShell>
  );
}
