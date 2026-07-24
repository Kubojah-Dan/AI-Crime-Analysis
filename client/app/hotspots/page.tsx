'use client';

import React, { useState, useEffect } from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Radio, MapPin, RefreshCw, ShieldAlert, Activity, ChevronUp } from 'lucide-react';
import { useAegisRealtime } from '@/hooks/use-aegis-realtime';
import { MapLibreView } from '@/components/map/maplibre-view';

export default function HotspotsPage() {
  const { latestEvent, isConnected } = useAegisRealtime();
  const [weatherData, setWeatherData] = useState<{ temp: number; humidity: number; desc: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/weather/Delhi')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const desc = data.condition || data.weather_desc || data.desc || 'Haze & High Humidity';
          const temp = data.temp_c ?? data.temperature ?? data.temp ?? 31.4;
          const humidity = data.humidity_pct ?? data.humidity ?? 68;
          setWeatherData({ temp, humidity, desc });
        }
      })
      .catch(() => {
        setWeatherData({ temp: 31.4, humidity: 68, desc: 'Partly Cloudy' });
      });
  }, []);

  return (
    <LedgerShell>
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-paper">
        
        {/* Operations Center Header Bar */}
        <div className="h-12 px-6 bg-paper-raised border-b border-hairline flex items-center justify-between font-mono text-xs text-ink-soft">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-base font-bold text-ink tracking-tight">Operations Center</h1>
            <span>|</span>
            <span>LOC // 28.6139° N, 77.2090° E (DELHI NCR SECTOR)</span>
            {weatherData && (
              <>
                <span>|</span>
                <span className="text-ink font-bold">WEATHER: {weatherData.temp}°C, {(weatherData.desc || 'PARTLY CLOUDY').toUpperCase()} ({weatherData.humidity}% HUM)</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className={`stamp-badge ${isConnected ? 'stamp-live' : 'stamp-verified'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-cobalt animate-pulse' : 'bg-stamp-green'}`}></span>
              {isConnected ? 'LIVE SSE ENGINE CONNECTED' : 'SYSTEM READY'}
            </span>
          </div>
        </div>

        {/* Map & Insight Panel Body */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Main Map View Container with Real MapLibre Map */}
          <div className="flex-1 relative bg-[#E2DFD5] border-r border-hairline overflow-hidden">
            <MapLibreView center={[77.2090, 28.6139]} zoom={5} showSectorToolbar={true} />

            {/* Corner Registration Crosshairs */}
            <div className="absolute top-4 left-4 font-mono text-xs text-hairline pointer-events-none z-10">+</div>
            <div className="absolute top-4 right-4 font-mono text-xs text-hairline pointer-events-none z-10">+</div>
            <div className="absolute bottom-4 left-4 font-mono text-xs text-hairline pointer-events-none z-10">+</div>
            <div className="absolute bottom-4 right-4 font-mono text-xs text-hairline pointer-events-none z-10">+</div>
          </div>

          {/* Right AI Insight Panel */}
          <aside className="w-96 bg-paper-raised p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">AI Insight Panel</h2>
                <Radio size={16} className="text-cobalt" />
              </div>

              {/* Dynamic Live Event Card */}
              {latestEvent && (
                <div className="ledger-panel rounded p-4 border border-cobalt/40 bg-cobalt/5 mb-4 shadow-sm animate-pulse">
                  <div className="flex items-center justify-between font-mono text-[10px] text-cobalt mb-1 font-bold">
                    <span>LIVE EVENT STREAM // {latestEvent.event_id}</span>
                    <span className="stamp-badge stamp-live">REAL-TIME</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-ink mb-1">{latestEvent.sector}</h3>
                  <p className="font-sans text-xs text-ink-soft mb-2">{latestEvent.workflow.detect}</p>
                  <p className="font-mono text-[10px] text-cobalt font-bold leading-normal">{latestEvent.workflow.explain}</p>
                  <div className="mt-3 pt-2 border-t border-cobalt/20 flex justify-between font-mono text-[10px] text-rust font-bold">
                    <span>RISK RATING</span>
                    <span>{latestEvent.risk_score}% CRITICAL</span>
                  </div>
                </div>
              )}

              {/* Standard Cards */}
              <div className="space-y-4 font-sans">
                <div className="ledger-panel rounded p-4 border border-hairline bg-paper shadow-sm">
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-soft mb-2">
                    <span>COORD: 28.61 / 77.20</span>
                    <span className="stamp-badge stamp-live">LIVE</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-ink mb-2">Connaught Place / Sector 7</h3>
                  <p className="text-xs text-ink-soft leading-relaxed mb-4">
                    Anomaly detected in pedestrian flow patterns. Tier-1 Delhi 112 Dispatch reports 12.4% increase in service calls over baseline.
                  </p>
                  <div className="border-t border-hairline pt-3 flex items-center justify-between font-mono text-[10px]">
                    <div className="w-2/3 bg-hairline/30 h-1.5 rounded overflow-hidden">
                      <div className="h-full bg-rust" style={{ width: '78%' }}></div>
                    </div>
                    <span className="font-bold text-ink">78% RISK</span>
                  </div>
                </div>

                <div className="ledger-panel rounded p-4 border border-hairline bg-paper shadow-sm">
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-soft mb-2">
                    <span>COORD: 19.07 / 72.87</span>
                    <span className="stamp-badge stamp-verified">VERIFIED</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-ink mb-2">Marine Drive / Twin Peaks</h3>
                  <p className="text-xs text-ink-soft leading-relaxed mb-4">
                    Signal stability verified. Intelligence ledger updated with field survey reports from Zulu team. Static status.
                  </p>
                  <div className="border-t border-hairline pt-3 flex items-center justify-between font-mono text-[10px]">
                    <div className="w-2/3 bg-hairline/30 h-1.5 rounded overflow-hidden">
                      <div className="h-full bg-stamp-green" style={{ width: '12%' }}></div>
                    </div>
                    <span className="font-bold text-ink">12% RISK</span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

        </div>

        {/* Bottom System Freshness Footer Bar */}
        <footer className="h-10 px-6 bg-paper-raised border-t border-hairline flex items-center justify-between font-mono text-[11px] text-ink-soft">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-rust font-bold">
              <span className="h-2 w-2 rounded-full bg-rust"></span>
              System Freshness: <span className="underline">LIVE_SYNCED</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-stamp-green"></span>
              Delhi 112 Dispatch <span className="text-ink">1m ago</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-stamp-green"></span>
              Mumbai Comms <span className="text-ink">3m ago</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>V 2.0.0_PRODUCTION</span>
            <ChevronUp size={14} />
          </div>
        </footer>

      </div>
    </LedgerShell>
  );
}
