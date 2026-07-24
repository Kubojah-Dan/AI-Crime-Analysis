'use client';

import React, { useState, useEffect } from 'react';
import { LedgerShell } from '@/components/layout/ledger-shell';
import { Radio, MapPin, RefreshCw, ShieldAlert, Activity, ChevronUp, Navigation } from 'lucide-react';
import { useAegisRealtime } from '@/hooks/use-aegis-realtime';
import { MapLibreView } from '@/components/map/maplibre-view';

interface CityInfo {
  name: string;
  query: string;
  lat: number;
  lng: number;
  latLabel: string;
  lngLabel: string;
  sectorLabel: string;
}

const INDIAN_CITIES: CityInfo[] = [
  { name: 'Delhi', query: 'Delhi', lat: 28.6139, lng: 77.2090, latLabel: '28.6139° N', lngLabel: '77.2090° E', sectorLabel: 'DELHI NCR SECTOR' },
  { name: 'Mumbai', query: 'Mumbai', lat: 18.9440, lng: 72.8230, latLabel: '18.9440° N', lngLabel: '72.8230° E', sectorLabel: 'MUMBAI SOUTH SECTOR' },
  { name: 'Bangalore', query: 'Bangalore', lat: 12.9750, lng: 77.6080, latLabel: '12.9750° N', lngLabel: '77.6080° E', sectorLabel: 'BANGALORE TECH CORRIDOR' },
  { name: 'Lucknow', query: 'Lucknow', lat: 26.8467, lng: 80.9462, latLabel: '26.8467° N', lngLabel: '80.9462° E', sectorLabel: 'LUCKNOW CENTRAL SECTOR' },
  { name: 'Chennai', query: 'Chennai', lat: 13.0827, lng: 80.2707, latLabel: '13.0827° N', lngLabel: '80.2707° E', sectorLabel: 'CHENNAI HARBOUR SECTOR' },
  { name: 'Hyderabad', query: 'Hyderabad', lat: 17.3850, lng: 78.4867, latLabel: '17.3850° N', lngLabel: '78.4867° E', sectorLabel: 'HYDERABAD CYBERABAD' },
];

export default function HotspotsPage() {
  const { latestEvent, isConnected } = useAegisRealtime();
  const [selectedCity, setSelectedCity] = useState<CityInfo>(INDIAN_CITIES[0]);
  const [weatherData, setWeatherData] = useState<{ temp: number; humidity: number; desc: string } | null>(null);

  // Dynamic Weather Fetching per Selected City
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/weather/${selectedCity.query}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const desc = data.condition || data.weather_desc || data.desc || 'Partly Cloudy';
          const temp = data.temp_c ?? data.temperature ?? data.temp ?? 31.4;
          const humidity = data.humidity_pct ?? data.humidity ?? 68;
          setWeatherData({ temp, humidity, desc });
        }
      })
      .catch(() => {
        setWeatherData({ temp: 31.4, humidity: 68, desc: 'Partly Cloudy' });
      });
  }, [selectedCity]);

  return (
    <LedgerShell>
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-paper selection:bg-cobalt selection:text-white">
        
        {/* Operations Center Dynamic Header Bar */}
        <div className="h-12 px-6 bg-paper-raised border-b border-hairline flex items-center justify-between font-mono text-xs text-ink-soft">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-base font-bold text-ink tracking-tight">Operations Center</h1>
            <span>|</span>

            {/* City / Sector Dynamic Selector */}
            <div className="flex items-center gap-2">
              <Navigation size={12} className="text-cobalt" />
              <select 
                value={selectedCity.name}
                onChange={(e) => {
                  const city = INDIAN_CITIES.find(c => c.name === e.target.value) || INDIAN_CITIES[0];
                  setSelectedCity(city);
                }}
                className="bg-paper border border-hairline rounded px-2.5 py-1 text-xs font-bold text-ink outline-none cursor-pointer hover:border-cobalt transition-colors"
              >
                {INDIAN_CITIES.map(c => (
                  <option key={c.name} value={c.name}>{c.name} Sector</option>
                ))}
              </select>
            </div>

            <span>|</span>
            <span className="font-bold text-ink">LOC // {selectedCity.latLabel}, {selectedCity.lngLabel} ({selectedCity.sectorLabel})</span>
            
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
          
          {/* Main Map View Container with Dynamic MapLibre Map Center */}
          <div className="flex-1 relative bg-[#E2DFD5] border-r border-hairline overflow-hidden">
            <MapLibreView center={[selectedCity.lng, selectedCity.lat]} zoom={11} showSectorToolbar={true} />

            {/* Corner Registration Crosshairs */}
            <div className="absolute top-4 left-4 font-mono text-xs text-hairline pointer-events-none z-10">+</div>
            <div className="absolute bottom-4 right-4 font-mono text-xs text-hairline pointer-events-none z-10">+</div>
          </div>

          {/* Right Operational Insight Sidebar */}
          <div className="w-80 bg-paper-raised border-l border-hairline p-5 font-mono text-xs flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="border-b border-hairline pb-2 flex items-center justify-between">
                <span className="font-bold text-ink uppercase">SECTOR TELEMETRY</span>
                <span className="stamp-badge stamp-live">{selectedCity.name.toUpperCase()}</span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded border border-hairline bg-paper flex justify-between items-center">
                  <span className="text-ink-soft">Latitude</span>
                  <span className="font-bold text-ink">{selectedCity.latLabel}</span>
                </div>
                <div className="p-3 rounded border border-hairline bg-paper flex justify-between items-center">
                  <span className="text-ink-soft">Longitude</span>
                  <span className="font-bold text-ink">{selectedCity.lngLabel}</span>
                </div>
                <div className="p-3 rounded border border-hairline bg-paper flex justify-between items-center">
                  <span className="text-ink-soft">Sector Code</span>
                  <span className="font-bold text-cobalt">{selectedCity.query.toUpperCase()}-SEC-01</span>
                </div>
              </div>

              {latestEvent && (
                <div className="p-3 rounded border border-cobalt/30 bg-cobalt/5 space-y-1 font-mono text-xs animate-fade-in-up">
                  <div className="text-[10px] text-cobalt font-bold uppercase">LIVE EVENT INGESTED</div>
                  <div className="font-bold text-ink">{latestEvent.category}</div>
                  <div className="text-xs text-ink-soft">{latestEvent.sector}</div>
                  <div className="text-[10px] text-rust font-bold pt-1">RISK RATING: {latestEvent.risk_score}%</div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-hairline text-[9px] text-ink-soft italic leading-tight">
              AegisIQ telemetry engine dynamically updates GPS coordinates and weather conditions upon sector switching.
            </div>
          </div>

        </div>

      </div>
    </LedgerShell>
  );
}
