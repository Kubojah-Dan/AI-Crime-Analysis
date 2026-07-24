'use client';

import React from 'react';
import { 
  ShieldCheck, Lock, Activity, Cpu, Server, 
  Eye, Terminal, Network, Zap, Radio 
} from 'lucide-react';

interface CyberBackgroundProps {
  variant?: 'hero' | 'subtle';
}

export function CyberBackground({ variant = 'subtle' }: CyberBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* 1. High-Visibility Animated Grid Mesh */}
      <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.20] transition-opacity duration-300">
        <svg className="w-full h-full scale-105 animate-grid-drift" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="cyber-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-cobalt/60 dark:text-cobalt" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>
      </div>

      {/* 2. Rotating Cyber Radar Sweep Scanner (Top Right Sector) */}
      <div className="absolute -top-12 -right-12 w-72 h-72 md:w-96 md:h-96 opacity-[0.20] dark:opacity-[0.30] transition-opacity duration-300">
        <div className="relative w-full h-full rounded-full border border-cobalt/40 dark:border-cobalt/60 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border border-cobalt/30 border-dashed animate-spin-slow"></div>
          <div className="w-1/2 h-1/2 rounded-full border border-cobalt/40"></div>
          
          {/* Radar Sweep Beam */}
          <div 
            className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left animate-radar-spin rounded-tl-full bg-gradient-to-tr from-transparent via-cobalt/20 to-cobalt/40 dark:to-cobalt/60"
          ></div>

          {/* Pinging Threat Markers */}
          <div className="absolute top-1/3 left-1/3 h-2.5 w-2.5 rounded-full bg-rust opacity-75 animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/3 h-2 w-2 rounded-full bg-cobalt opacity-75 animate-pulse"></div>
        </div>
      </div>

      {/* 3. Hero-Only Floating Animated Cybersecurity Tool Badges */}
      {variant === 'hero' && (
        <>
          <div className="absolute top-20 left-8 space-y-3 font-mono text-xs hidden lg:block opacity-[0.85] dark:opacity-[0.95]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-paper-raised/90 border border-cobalt/40 shadow-sm backdrop-blur text-cobalt font-bold animate-pulse-slow">
              <ShieldCheck size={14} className="text-cobalt" />
              <span>ZERO_TRUST_FIREWALL // ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-paper-raised/90 border border-ochre/40 shadow-sm backdrop-blur text-ochre font-bold">
              <Cpu size={14} className="text-ochre" />
              <span>GROQ_LLM_L3 // INFERRING</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-paper-raised/90 border border-stamp-green/40 shadow-sm backdrop-blur text-stamp-green font-bold">
              <Network size={14} className="text-stamp-green" />
              <span>NEO4J_GRAPH // LINKED</span>
            </div>
          </div>

          <div className="absolute bottom-12 right-8 space-y-3 font-mono text-xs hidden lg:block opacity-[0.85] dark:opacity-[0.95]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-paper-raised/90 border border-rust/40 shadow-sm backdrop-blur text-rust font-bold">
              <Activity size={14} className="text-rust animate-pulse" />
              <span>ANOMALY_DETECTOR // 99.4% ACCURACY</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-paper-raised/90 border border-cobalt/40 shadow-sm backdrop-blur text-cobalt font-bold">
              <Lock size={14} className="text-cobalt" />
              <span>AES_256_EVIDENCE_VAULT // SECURE</span>
            </div>
          </div>
        </>
      )}

      {/* 4. Bottom Left Network Topology Mesh */}
      <div className="absolute -bottom-10 -left-10 w-64 h-64 opacity-[0.18] dark:opacity-[0.30] transition-opacity duration-300">
        <div className="relative w-full h-full font-mono text-[9px] text-ink-soft">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <line x1="40" y1="50" x2="120" y2="90" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" className="text-cobalt" />
            <line x1="120" y1="90" x2="160" y2="160" stroke="currentColor" strokeWidth="0.8" className="text-rust" />
            <line x1="120" y1="90" x2="60" y2="140" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" className="text-stamp-green" />
            
            <circle cx="40" cy="50" r="4" fill="#2B5AA0" className="animate-pulse" />
            <circle cx="120" cy="90" r="5" fill="#A63B2A" className="animate-ping" />
            <circle cx="160" cy="160" r="4" fill="#3F6B57" />
          </svg>
        </div>
      </div>

    </div>
  );
}
