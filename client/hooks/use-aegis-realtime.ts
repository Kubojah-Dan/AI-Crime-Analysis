'use client';

import { useState, useEffect } from 'react';

export interface AegisRealtimeEvent {
  step: number;
  event_id: string;
  sector: string;
  category: string;
  risk_score: number;
  provenance: string;
  timestamp: string;
  workflow: {
    collect: string;
    detect: string;
    explain: string;
    act: string;
  };
}

export function useAegisRealtime() {
  const [latestEvent, setLatestEvent] = useState<AegisRealtimeEvent | null>(null);
  const [eventsList, setEventsList] = useState<AegisRealtimeEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;
    let stepCounter = 0;

    const startLocalEmulation = () => {
      setIsConnected(false);
      const sectors = ["Delhi Connaught Place", "Mumbai Marine Drive", "Bangalore MG Road", "Chennai Port Area", "Hyderabad Cyberabad"];
      const categories = ["112 Emergency Call", "Pedestrian Flow Anomaly", "Commercial Vandalism", "Signal Stability", "Vehicle Theft"];

      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }

      fallbackInterval = setInterval(() => {
        stepCounter++;
        const sec = sectors[Math.floor(Math.random() * sectors.length)];
        const cat = categories[Math.floor(Math.random() * categories.length)];
        const risk = Math.floor(Math.random() * 45) + 50;

        const fakeEvent: AegisRealtimeEvent = {
          step: stepCounter,
          event_id: `AQ-EVT-${stepCounter.toString().padStart(4, '0')}`,
          sector: sec,
          category: cat,
          risk_score: risk,
          provenance: 'LOCAL_EMULATION',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          workflow: {
            collect: `Ingested local CAD telemetry for ${sec}`,
            detect: `Anomaly evaluation complete (${risk}% risk score)`,
            explain: `Observed abnormal cluster activity in proximity to the ${cat} zone.`,
            act: `Awaiting human review authorization.`
          }
        };

        setLatestEvent(fakeEvent);
        setEventsList((prev) => [fakeEvent, ...prev.slice(0, 19)]);
      }, 5000);
    };

    try {
      eventSource = new EventSource('http://localhost:8000/api/v1/realtime/stream');

      eventSource.onopen = () => {
        setIsConnected(true);
        if (fallbackInterval) {
          clearInterval(fallbackInterval);
          fallbackInterval = null;
        }
      };

      eventSource.onmessage = (event) => {
        try {
          const data: AegisRealtimeEvent = JSON.parse(event.data);
          setLatestEvent(data);
          setEventsList((prev) => [data, ...prev.slice(0, 19)]);
        } catch (err) {
          // Handled internally
        }
      };

      eventSource.onerror = (e) => {
        // Prevent default browser error reporting/uncaught exception bubbles
        if (e && typeof e.preventDefault === 'function') {
          e.preventDefault();
        }
        setIsConnected(false);
        if (eventSource) {
          eventSource.close();
        }
        if (!fallbackInterval) {
          startLocalEmulation();
        }
      };
    } catch (err) {
      setIsConnected(false);
      startLocalEmulation();
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
    };
  }, []);

  return { latestEvent, eventsList, isConnected };
}
