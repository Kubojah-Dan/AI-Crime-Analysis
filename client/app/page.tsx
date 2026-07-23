'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, ArrowRight, Activity, Database, 
  Layers, Lock, Sparkles, RefreshCw, Cpu, Server, Sun, Moon 
} from 'lucide-react';
import { useAegisRealtime } from '@/hooks/use-aegis-realtime';
import { useTheme } from '@/context/theme-context';
import { CyberBackground } from '@/components/ui/cyber-background';

export default function LandingPage() {
  const { latestEvent, isConnected } = useAegisRealtime();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col selection:bg-cobalt selection:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Animated Cybersecurity HUD Background */}
      <CyberBackground />

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="h-16 px-6 md:px-12 border-b border-hairline bg-paper-raised/95 backdrop-blur flex items-center justify-between z-30 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl font-bold tracking-tight text-cobalt hover:scale-105 transition-transform duration-200 cursor-pointer">
            AegisIQ
          </span>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-hairline bg-paper text-ink-soft uppercase font-bold tracking-widest animate-pulse-slow">
            INDIA COMMAND
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded border border-hairline bg-paper/85 shadow-sm">
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-stamp-green animate-pulse' : 'bg-cobalt animate-ping'}`}></span>
            <span className="text-ink-soft text-[10px] font-bold">
              {isConnected ? 'LIVE BACKEND ACTIVE' : 'LOCAL EMULATION'}
            </span>
          </div>

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 text-ink-soft hover:text-ink hover:bg-paper-raised rounded border border-hairline transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={15} className="text-yellow-500" /> : <Moon size={15} className="text-cobalt" />}
          </button>

          <Link
            href="/auth/signin"
            className="py-2.5 px-5 rounded bg-cobalt text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-cobalt-dark shadow-md transition-all active:scale-[0.98] duration-200"
          >
            SIGN IN TO LEDGER
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28 relative z-10 flex-1 flex flex-col justify-center max-w-5xl mx-auto space-y-8 animate-fade-in-up">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cobalt/10 border border-cobalt/25 text-cobalt font-mono text-[10px] font-bold uppercase tracking-wider w-fit hover:bg-cobalt/15 transition-colors duration-300">
          <ShieldCheck size={13} className="text-cobalt" />
          EXPLAINABLE AI PUBLIC SAFETY DECISION SUPPORT PLATFORM
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-ink leading-tight">
          Explainable Public Safety Intelligence & <span className="text-cobalt">Decision Support</span>
        </h1>

        <p className="font-sans text-base md:text-lg text-ink-soft max-w-3xl leading-relaxed">
          AegisIQ integrates fragmented public safety data across Indian municipal limits, predicts spatial anomalies using transparent risk modeling, and guides resource allocation with strict human review checks.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/auth/signin"
            className="py-3.5 px-8 rounded bg-cobalt text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-cobalt-dark hover:shadow-lg transition-all active:scale-[0.98] duration-300"
          >
            ACCESS COMMAND CENTER
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/auth/signup"
            className="py-3.5 px-6 rounded border border-hairline bg-paper-raised text-ink font-mono text-xs font-bold uppercase tracking-wider hover:bg-paper hover:border-cobalt transition-all duration-300"
          >
            REQUEST SECURITY CLEARANCE
          </Link>
        </div>

        {/* Live Stream Ticker Card */}
        {latestEvent && (
          <div className="ledger-panel rounded p-4 border border-hairline bg-paper-raised/95 backdrop-blur flex flex-wrap items-center justify-between font-mono text-xs shadow-sm gap-4 transition-all duration-500 hover:border-cobalt/50 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-rust animate-ping"></span>
              <span className="font-bold text-cobalt">{latestEvent.event_id}</span>
              <span className="text-ink-soft">|</span>
              <span className="text-ink font-bold">{latestEvent.sector}</span>
              <span className="text-ink-soft">({latestEvent.category})</span>
            </div>
            <div className="flex items-center gap-3 ml-auto sm:ml-0">
              <span className="stamp-badge stamp-alert font-bold">{latestEvent.risk_score}% RISK</span>
              <span className="text-ink-soft text-[10px]">{latestEvent.timestamp}</span>
            </div>
          </div>
        )}
      </section>

      {/* ── Continuous Decision Loop Section ──────────────────────────── */}
      <section className="px-6 md:px-12 py-16 bg-paper-raised border-t border-hairline relative z-10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="font-mono text-[10px] font-bold text-cobalt uppercase tracking-widest">
              CONTINUOUS INTELLIGENCE WORKFLOW
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink">
              The AegisIQ Continuous Decision Loop
            </h2>
            <p className="font-mono text-xs text-ink-soft italic">
              ↻ The loop runs continuously in real-time as data lands — never a static batch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            
            {/* Step 1: Collect */}
            <div className="ledger-panel rounded p-6 border border-hairline bg-paper hover-scale-premium">
              <div className="h-9 w-9 rounded bg-stamp-green/10 border border-stamp-green/30 text-stamp-green grid place-items-center font-serif font-bold text-base mb-4">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-ink mb-1">Collect</h3>
              <p className="font-mono text-[10px] text-stamp-green font-bold uppercase mb-2">All Data Feeds</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Ingests live 112 emergency calls, NCRB historical datasets, and meteorological streams for full spatial awareness.
              </p>
            </div>

            {/* Step 2: Detect */}
            <div className="ledger-panel rounded p-6 border border-hairline bg-paper hover-scale-premium">
              <div className="h-9 w-9 rounded bg-cobalt/10 border border-cobalt/30 text-cobalt grid place-items-center font-serif font-bold text-base mb-4">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-ink mb-1">Detect</h3>
              <p className="font-mono text-[10px] text-cobalt font-bold uppercase mb-2">Flags Anomalies</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Identifies geographical and temporal deviations from baseline averages using desaturated risk-contour indexing.
              </p>
            </div>

            {/* Step 3: Explain */}
            <div className="ledger-panel rounded p-6 border border-hairline bg-paper hover-scale-premium">
              <div className="h-9 w-9 rounded bg-ochre/10 border border-ochre/30 text-ochre grid place-items-center font-serif font-bold text-base mb-4">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-ink mb-1">Explain</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Groq Llama 3 LLM generates plain-text narrative summaries and highlights contributing factors transparently.
              </p>
            </div>

            {/* Step 4: Act */}
            <div className="ledger-panel rounded p-6 border border-hairline bg-paper hover-scale-premium">
              <div className="h-9 w-9 rounded bg-rust/10 border border-rust/30 text-rust grid place-items-center font-serif font-bold text-base mb-4">
                4
              </div>
              <h3 className="font-serif font-bold text-base text-ink mb-1">Act</h3>
              <p className="font-mono text-[10px] text-rust font-bold uppercase mb-2">Triggers Alerts</p>
              <p className="text-xs text-ink-soft leading-relaxed">
                Enables analysts to make audit-logged decisions via human review gates (patrol dispatch, verification, dismiss).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="px-6 md:px-12 py-6 bg-paper-raised border-t border-hairline font-mono text-[11px] text-ink-soft flex flex-wrap items-center justify-between gap-4 relative z-10 transition-colors duration-300">
        <div>
          <span className="font-serif text-base font-bold text-cobalt">AegisIQ</span>
          <span className="block mt-0.5">PUBLIC SAFETY INTELLIGENCE COMMAND</span>
        </div>
        <div>
          COPYRIGHT © 2026 AEGISIQ CORP. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </div>
  );
}
