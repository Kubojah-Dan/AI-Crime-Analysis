'use client';

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
}

const INDIAN_HOTSPOTS = [
  { id: 'DL-01', title: 'Connaught Place Sector', lat: 28.6315, lng: 77.2167, risk: 88, status: 'CRITICAL' },
  { id: 'MH-02', title: 'Marine Drive / Twin Peaks', lat: 18.9440, lng: 72.8230, risk: 42, status: 'VERIFIED' },
  { id: 'KA-03', title: 'Bangalore Tech Corridor', lat: 12.9750, lng: 77.6080, risk: 74, status: 'LIVE' },
  { id: 'TN-04', title: 'Chennai Harbour Zone', lat: 13.0827, lng: 80.2707, risk: 62, status: 'PERIODIC' },
  { id: 'TS-05', title: 'Hyderabad Cyberabad', lat: 17.3850, lng: 78.4867, risk: 55, status: 'LIVE' },
];

export function MapLibreView({ center = [77.2090, 28.6139], zoom = 5 }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize MapLibre GL map with desaturated positron tiles
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: center,
      zoom: zoom,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

    map.on('load', () => {
      // Add Hotspot Pins & Radius Circles
      INDIAN_HOTSPOTS.forEach((spot) => {
        const el = document.createElement('div');
        el.className = 'maplibre-hotspot-pin';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = spot.risk > 70 ? 'rgba(166, 59, 42, 0.85)' : 'rgba(43, 90, 160, 0.85)';
        el.style.border = '2px solid #F1EFE7';
        el.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
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
      map.remove();
    };
  }, [center, zoom]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full rounded" />
    </div>
  );
}
