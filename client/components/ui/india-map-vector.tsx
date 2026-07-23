'use client';

import React from 'react';

export function IndiaMapVector() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/5] flex items-center justify-center p-4">
      
      {/* Glow Layer */}
      <div className="absolute inset-0 bg-cobalt/10 rounded-full filter blur-3xl -z-10 animate-pulse-slow"></div>

      <svg 
        viewBox="0 0 600 700" 
        className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="india-fill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B5AA0" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#A63B2A" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* India Geographic Outline Path (Clean Vector with White Borders) */}
        <path
          d="M 270 50 
             C 290 40, 310 45, 330 65 
             C 350 85, 370 100, 390 115 
             C 410 130, 440 140, 470 145 
             C 500 150, 520 170, 500 190 
             C 480 210, 450 220, 430 240 
             C 410 260, 420 280, 410 300 
             C 400 320, 380 340, 370 360 
             C 360 380, 350 410, 340 440 
             C 330 470, 310 500, 295 540 
             C 285 570, 275 600, 265 640 
             C 255 600, 245 560, 230 530 
             C 215 500, 195 470, 185 430 
             C 175 390, 160 360, 150 330 
             C 140 300, 120 280, 110 250 
             C 100 220, 110 190, 130 170 
             C 150 150, 170 140, 190 120 
             C 210 100, 230 80, 250 65 Z"
          fill="url(#india-fill-grad)"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500 hover:stroke-cobalt"
        />

        {/* Inner Region Boundary Grid Lines */}
        <path
          d="M 270 50 L 295 540 M 190 120 L 430 240 M 150 330 L 370 360"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeDasharray="4,4"
          strokeOpacity="0.4"
        />

        {/* ── Key Metropolitan Command Hub Pins ────────────────────────── */}

        {/* 1. Delhi NCR (North Hub) */}
        <g transform="translate(250, 150)">
          <circle r="12" fill="#A63B2A" opacity="0.3" className="animate-ping" />
          <circle r="6" fill="#A63B2A" stroke="#FFFFFF" strokeWidth="2" />
          <text x="14" y="4" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">DELHI NCR (CRITICAL)</text>
        </g>

        {/* 2. Mumbai (West Coast Hub) */}
        <g transform="translate(145, 360)">
          <circle r="10" fill="#2B5AA0" opacity="0.3" className="animate-ping" />
          <circle r="5" fill="#2B5AA0" stroke="#FFFFFF" strokeWidth="2" />
          <text x="-95" y="4" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">MUMBAI HQ</text>
        </g>

        {/* 3. Bangalore Tech Corridor (South Hub) */}
        <g transform="translate(225, 490)">
          <circle r="10" fill="#3F6B57" opacity="0.3" className="animate-ping" />
          <circle r="5" fill="#3F6B57" stroke="#FFFFFF" strokeWidth="2" />
          <text x="12" y="4" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">BANGALORE (LIVE)</text>
        </g>

        {/* 4. Chennai Port (South East Hub) */}
        <g transform="translate(275, 480)">
          <circle r="8" fill="#C1852B" opacity="0.3" className="animate-ping" />
          <circle r="4" fill="#C1852B" stroke="#FFFFFF" strokeWidth="2" />
          <text x="12" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">CHENNAI</text>
        </g>

        {/* 5. Hyderabad Cyberabad (Central Hub) */}
        <g transform="translate(230, 390)">
          <circle r="8" fill="#2B5AA0" opacity="0.3" className="animate-ping" />
          <circle r="4" fill="#2B5AA0" stroke="#FFFFFF" strokeWidth="2" />
          <text x="12" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">HYDERABAD</text>
        </g>

      </svg>
    </div>
  );
}
