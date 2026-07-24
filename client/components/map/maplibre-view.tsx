'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation } from 'lucide-react';

interface MapProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  showSectorToolbar?: boolean;
  onRegionChange?: (cityName: string) => void;
}

const INDIAN_REGIONS = [
  { name: 'Delhi NCR', query: 'Delhi', lng: 77.2090, lat: 28.6139, zoom: 11, risk: '88% RISK' },
  { name: 'Mumbai South', query: 'Mumbai', lng: 72.8230, lat: 18.9440, zoom: 11, risk: '74% RISK' },
  { name: 'Bangalore Tech Corridor', query: 'Bangalore', lng: 77.6080, lat: 12.9750, zoom: 11, risk: '65% RISK' },
  { name: 'Chennai Harbour', query: 'Chennai', lng: 80.2707, lat: 13.0827, zoom: 11, risk: '58% RISK' },
  { name: 'Hyderabad Cyberabad', query: 'Hyderabad', lng: 78.4867, lat: 17.3850, zoom: 11, risk: '52% RISK' },
];

/* ── 4 Distinct Map Marker Categories ─────────────────────────────────── */
const MAP_MARKERS = [
  // 1. Hotspots (Risk Score) - Amber/Rust Concentric Circles
  { type: 'HOTSPOT', id: 'HS-01', title: 'Connaught Place Risk Ring', lat: 28.6315, lng: 77.2167, label: '88% RISK', color: '#A63B2A' },
  { type: 'HOTSPOT', id: 'HS-02', title: 'Hazratganj Central Ring', lat: 26.8467, lng: 80.9462, label: '82% RISK', color: '#A63B2A' },
  { type: 'HOTSPOT', id: 'HS-03', title: 'Marine Drive Promenade', lat: 18.9440, lng: 72.8230, label: '74% RISK', color: '#C1852B' },

  // 2. Units (Patrol / PCR) - Cyan Pulsing Markers
  { type: 'UNIT', id: 'UP-32-PCR-124', title: 'PCR Van Unit 124', lat: 26.8480, lng: 80.9490, label: 'UP-32-PCR-124 (En Route)', color: '#06B6D4' },
  { type: 'UNIT', id: 'DL-01-PCR-99', title: 'Delhi Patrol Unit 99', lat: 28.6330, lng: 77.2190, label: 'DL-01-PCR-99 (Patrolling)', color: '#06B6D4' },

  // 3. Police Stations - Blue Station Icon Markers
  { type: 'STATION', id: 'PS-CP', title: 'Central Police Station', lat: 28.6290, lng: 77.2130, label: 'CP Police Station', color: '#2563EB' },
  { type: 'STATION', id: 'PS-HZ', title: 'Hazratganj Police Station', lat: 26.8440, lng: 80.9430, label: 'Hazratganj Station Limits', color: '#2563EB' },

  // 4. Incident Clusters - Red Incident Cluster Pins
  { type: 'CLUSTER', id: 'CLR-441', title: 'Cluster #AQ-CLR-441', lat: 28.6300, lng: 77.2200, label: 'Cluster #441 (4 Incidents)', color: '#DC2626' },
  { type: 'CLUSTER', id: 'CLR-890', title: 'Cluster #AQ-CLR-890', lat: 12.9750, lng: 77.6080, label: 'Cluster #890 (2 Incidents)', color: '#DC2626' },
];

export function MapLibreView({ center = [77.2090, 28.6139], zoom = 6, showSectorToolbar = false, onRegionChange }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>('Delhi NCR');

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Prevent map re-creation on re-render

    // Initialize MapLibre GL map ONCE
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: center,
      zoom: zoom,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

    map.on('load', () => {
      MAP_MARKERS.forEach((item) => {
        const el = document.createElement('div');
        el.className = 'maplibre-marker';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.borderRadius = item.type === 'HOTSPOT' ? '50%' : '4px';
        el.style.backgroundColor = item.color;
        el.style.color = '#FFFFFF';
        el.style.fontSize = '9px';
        el.style.fontWeight = 'bold';
        el.style.fontFamily = 'monospace';
        el.style.padding = item.type === 'HOTSPOT' ? '0' : '2px 6px';
        el.style.width = item.type === 'HOTSPOT' ? '28px' : 'auto';
        el.style.height = item.type === 'HOTSPOT' ? '28px' : 'auto';
        el.style.border = '2px solid #FFFFFF';
        el.style.boxShadow = '0 0 10px rgba(0,0,0,0.4)';
        el.style.cursor = 'pointer';

        if (item.type === 'HOTSPOT') {
          el.innerText = '⚡';
        } else if (item.type === 'UNIT') {
          el.innerText = '🚔 ' + item.id;
        } else if (item.type === 'STATION') {
          el.innerText = '🏛️ ' + item.id;
        } else {
          el.innerText = '🔴 ' + item.id;
        }

        const popupContent = `
          <div style="font-family: 'IBM Plex Sans', sans-serif; padding: 6px; color: #202A33;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: bold; color: ${item.color}; uppercase;">
              ${item.type}: ${item.id}
            </div>
            <div style="font-family: 'Fraunces', serif; font-size: 13px; font-weight: bold; margin-top: 2px;">
              ${item.title}
            </div>
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: bold; margin-top: 4px; color: #202A33;">
              ${item.label}
            </div>
          </div>
        `;

        const popup = new maplibregl.Popup({ offset: 12 }).setHTML(popupContent);

        new maplibregl.Marker(el)
          .setLngLat([item.lng, item.lat])
          .setPopup(popup)
          .addTo(map);
      });
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Run ONCE on mount

  // Fly to center when center prop updates externally
  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.flyTo({
        center: center,
        zoom: zoom,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }
  }, [center, zoom]);

  const handleFlyToRegion = (reg: typeof INDIAN_REGIONS[0]) => {
    setActiveRegion(reg.name);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [reg.lng, reg.lat],
        zoom: reg.zoom,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }
    if (onRegionChange) {
      onRegionChange(reg.query);
    }
  };

  return (
    <div className="w-full h-full relative group">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full rounded" />

      {/* Optional Floating Interactive Indian City Switcher Toolbar */}
      {showSectorToolbar && (
        <div className="absolute bottom-3 left-3 z-10 bg-paper-raised/95 backdrop-blur border border-hairline p-2 rounded shadow-md flex flex-wrap items-center gap-1.5 font-mono text-xs max-w-xl">
          <div className="flex items-center gap-1 text-[10px] font-bold text-cobalt px-2 uppercase">
            <Navigation size={12} className="animate-spin-slow" />
            <span>INDIAN SECTORS:</span>
          </div>
          {INDIAN_REGIONS.map((reg) => (
            <button
              key={reg.name}
              onClick={() => handleFlyToRegion(reg)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all duration-200 ${
                activeRegion === reg.name
                  ? 'bg-cobalt text-white shadow-sm'
                  : 'bg-paper text-ink-soft hover:text-ink hover:bg-paper-raised border border-hairline'
              }`}
            >
              {reg.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
