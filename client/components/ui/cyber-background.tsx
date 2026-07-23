'use client';

import React from 'react';

export function CyberBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* 1. Animated Grid Drift Mesh */}
      <div className="absolute inset-0 opacity-[0.14] dark:opacity-[0.25] transition-opacity duration-300">
        <svg className="w-full h-full scale-110 animate-grid-drift" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="cyber-grid" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 6 0 L 0 0 0 6" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-ink" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>
      </div>

      {/* 2. Rotating Cyber Radar Sweep Scanner (Top Right) */}
      <div className="absolute -top-24 -right-24 w-96 h-96 opacity-[0.20] dark:opacity-[0.35] transition-opacity duration-300">
        <div className="relative w-full h-full rounded-full border border-cobalt/40 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border border-cobalt/30 border-dashed animate-spin-slow"></div>
          <div className="w-1/2 h-1/2 rounded-full border border-cobalt/40"></div>
          
          {/* Radar Sweep Sector */}
          <div 
            className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left animate-radar-spin rounded-tl-full bg-gradient-to-tr from-transparent via-cobalt/20 to-cobalt/40"
          ></div>

          {/* Pinging Threat Markers */}
          <div className="absolute top-1/3 left-1/3 h-2 w-2 rounded-full bg-rust animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/3 h-2 w-2 rounded-full bg-cobalt animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 h-1.5 w-1.5 rounded-full bg-stamp-green animate-ping"></div>
        </div>
      </div>

      {/* 3. Bottom Left Network Topology Mesh */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-[0.15] dark:opacity-[0.28] transition-opacity duration-300">
        <div className="relative w-full h-full font-mono text-[9px] text-ink-soft">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <line x1="40" y1="50" x2="120" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="120" y1="90" x2="160" y2="160" stroke="currentColor" strokeWidth="0.5" />
            <line x1="120" y1="90" x2="60" y2="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            
            {/* Interactive Nodes */}
            <circle cx="40" cy="50" r="4" fill="#2B5AA0" className="animate-pulse" />
            <circle cx="120" cy="90" r="5" fill="#A63B2A" className="animate-ping" />
            <circle cx="160" cy="160" r="4" fill="#3F6B57" />
            <circle cx="60" cy="140" r="3" fill="#C1852B" />

            <text x="48" y="48" fill="currentColor" className="text-[7px]">192.168.1.4 // CAD</text>
            <text x="128" y="88" fill="currentColor" className="text-[7px]">0x8F92 // ANOMALY</text>
            <text x="168" y="158" fill="currentColor" className="text-[7px]">CCTV_CAM_8</text>
          </svg>
        </div>
      </div>

      {/* 4. Hexadecimal Data Stream Ticker (Floating background column) */}
      <div className="absolute top-1/4 left-6 hidden xl:block font-mono text-[9px] text-ink-soft/30 dark:text-ink-soft/40 space-y-1 selection:bg-none">
        <div>[SEC_PROT]: TLS_1.3_AES_256</div>
        <div>[HASH]: 0x89F2A0B7C1</div>
        <div>[GEO_LIMITS]: IN-DL-NCR</div>
        <div>[FIREWALL]: ACTIVE</div>
        <div>[ZERO_TRUST]: ENFORCED</div>
        <div>[GROQ_LLM]: ONLINE</div>
      </div>

      {/* 5. HUD Corner Brackets */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-ink-soft/30 hidden md:block">
        ┌ SYSTEM_STATE: ACTIVE_OPERATIONS ┐
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-ink-soft/30 hidden md:block">
        └ AEGISIQ_SECURITY_LEVEL_5 ┘
      </div>

    </div>
  );
}
