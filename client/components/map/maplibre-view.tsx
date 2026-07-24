'use client';

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation } from 'lucide-react';

interface MapProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  showSectorToolbar?: boolean;
}

const INDIAN_REGIONS = [
  { name: 'Delhi NCR', lng: 77.2090, lat: 28.6139, zoom: 11, risk: '88% RISK' },
  { name: 'Mumbai South', lng: 72.8230, lat: 18.9440, zoom: 11, risk: '74% RISK' },
  { name: 'Bangalore Tech Corridor', lng: 77.6080, lat: 12.9750, zoom: 11, risk: '65% RISK' },
  { name: 'Chennai Harbour', lng: 80.2707, lat: 13.0827, zoom: 11, risk: '58% RISK' },
  { name: 'Hyderabad Cyberabad', lng: 78.4867, lat: 17.3850, zoom: 11, risk: '52% RISK' },
];

const INDIAN_HOTSPOTS = [
  { id: 'DL-01', title: 'Connaught Place Sector', lat: 28.6315, lng: 77.2167, risk: 88, status: 'CRITICAL' },
  { id: 'MH-02', title: 'Marine Drive / Twin Peaks', lat: 18.9440, lng: 72.8230, risk: 74, status: 'VERIFIED' },
  { id: 'KA-03', title: 'Bangalore MG Road / Indiranagar', lat: 12.9750, lng: 77.6080, risk: 65, status: 'LIVE' },
  { id: 'TN-04', title: 'Chennai Harbour Zone', lat: 13.0827, lng: 80.2707, risk: 58, status: 'PERIODIC' },
  { id: 'TS-05', title: 'Hyderabad Cyberabad', lat: 17.3850, lng: 78.4867, risk: 52, status: 'LIVE' },
];

export function MapLibreView({ center = [77.2090, 28.6139], zoom = 6, showSectorToolbar = false }: MapProps) {
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
      INDIAN_HOTSPOTS.forEach((spot) => {
        const el = document.createElement('div');
        el.className = 'maplibre-hotspot-pin';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = spot.risk > 70 ? 'rgba(166, 59, 42, 0.90)' : 'rgba(43, 90, 160, 0.90)';
        el.style.border = '2px solid #F1EFE7';
        el.style.boxShadow = '0 0 12px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';

        const popupContent = `
          <div style="font-family: 'IBM Plex Sans', sans-serif; padding: 6px; color: #202A33;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: bold; color: #5B6570;">
              ID: ${spot.id} | ${spot.status}
            </div>
            <div style="font-family: 'Fraunces', serif; font-size: 14px; font-weight: bold; margin-top: 2px;">
              ${spot.title}
            </div>
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; margin-top: 4px; font-weight: bold; color: ${spot.risk > 70 ? '#A63B2A' : '#2B5AA0'};">
              RISK RATING: ${spot.risk}%
            </div>
          </div>
        `;

        const popup = new maplibregl.Popup({ offset: 12 }).setHTML(popupContent);

        new maplibregl.Marker(el)
          .setLngLat([spot.lng, spot.lat])
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
