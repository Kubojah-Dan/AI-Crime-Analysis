export interface IndianStateMetric {
  state: string;
  code: string;
  capital: string;
  total_incidents: number;
  solved_rate: number;
  anomaly_flag: string;
  districts: {
    name: string;
    ipc_section: string;
    category: string;
    incidents_count: number;
    risk_level: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
    trend_pct: number;
    coordinates: [number, number]; // [lat, lng]
  }[];
}

export const INDIAN_STATES_DATABASE: IndianStateMetric[] = [
  {
    state: 'Karnataka',
    code: 'KA',
    capital: 'Bangalore',
    total_incidents: 42810,
    solved_rate: 88.4,
    anomaly_flag: 'Tech Corridor Surge (+6.2%)',
    districts: [
      { name: 'Bangalore Urban (Tech Corridor)', ipc_section: 'IPC 420 - Cyber Fraud', category: 'Cyber Fraud', incidents_count: 1420, risk_level: 'HIGH', trend_pct: 6.2, coordinates: [12.9750, 77.6080] },
      { name: 'Bangalore Rural', ipc_section: 'IPC 379 - Larceny', category: 'Property Theft', incidents_count: 620, risk_level: 'MODERATE', trend_pct: -1.2, coordinates: [13.0900, 77.5700] },
      { name: 'Mysuru District', ipc_section: 'IPC 341 - Disturbance', category: 'Public Nuisance', incidents_count: 310, risk_level: 'LOW', trend_pct: 0.0, coordinates: [12.2958, 76.6394] },
      { name: 'Mangaluru Port', ipc_section: 'IPC 380 - Dwelling Theft', category: 'Burglary', incidents_count: 540, risk_level: 'MODERATE', trend_pct: 2.1, coordinates: [12.9141, 74.8560] },
    ],
  },
  {
    state: 'Delhi (UT)',
    code: 'DL',
    capital: 'New Delhi',
    total_incidents: 58920,
    solved_rate: 91.2,
    anomaly_flag: 'Connaught Place Spike (+12.4%)',
    districts: [
      { name: 'Connaught Place / Central', ipc_section: 'IPC 379 - Theft', category: 'Pedestrian Theft', incidents_count: 2410, risk_level: 'CRITICAL', trend_pct: 12.4, coordinates: [28.6315, 77.2167] },
      { name: 'South Delhi / Saket', ipc_section: 'IPC 354 - Public Safety', category: 'Safety Signal', incidents_count: 980, risk_level: 'MODERATE', trend_pct: -3.4, coordinates: [28.5244, 77.2188] },
      { name: 'Dwarka Subcity', ipc_section: 'IPC 384 - Extortion', category: 'Commercial Incursion', incidents_count: 1120, risk_level: 'HIGH', trend_pct: 4.8, coordinates: [28.5921, 77.0460] },
      { name: 'North Delhi / Civil Lines', ipc_section: 'IPC 279 - Traffic Hazard', category: 'Transit Anomaly', incidents_count: 750, risk_level: 'LOW', trend_pct: 0.5, coordinates: [28.6814, 77.2227] },
    ],
  },
  {
    state: 'Maharashtra',
    code: 'MH',
    capital: 'Mumbai',
    total_incidents: 64120,
    solved_rate: 89.6,
    anomaly_flag: 'Harbour Logistics Shift (+3.1%)',
    districts: [
      { name: 'Mumbai South / Marine Drive', ipc_section: 'IPC 341 - Obstruction', category: 'Signal Disruption', incidents_count: 1840, risk_level: 'MODERATE', trend_pct: 1.8, coordinates: [18.9440, 72.8230] },
      { name: 'Suburban Bandra-Kurla', ipc_section: 'IPC 420 - Financial Fraud', category: 'Commercial Fraud', incidents_count: 2100, risk_level: 'HIGH', trend_pct: 5.2, coordinates: [19.0600, 72.8700] },
      { name: 'Pune Metro', ipc_section: 'IPC 379 - Vehicle Theft', category: 'Vehicle Recovery', incidents_count: 1350, risk_level: 'MODERATE', trend_pct: -2.1, coordinates: [18.5204, 73.8567] },
    ],
  },
  {
    state: 'Tamil Nadu',
    code: 'TN',
    capital: 'Chennai',
    total_incidents: 39400,
    solved_rate: 93.1,
    anomaly_flag: 'Port Berth Anomaly (+2.4%)',
    districts: [
      { name: 'Chennai Central / Port', ipc_section: 'IPC 380 - Harbour Theft', category: 'Maritime Incursion', incidents_count: 1290, risk_level: 'HIGH', trend_pct: 2.4, coordinates: [13.0827, 80.2707] },
      { name: 'Coimbatore South', ipc_section: 'IPC 341 - Vandalism', category: 'Property Damage', incidents_count: 480, risk_level: 'LOW', trend_pct: -1.0, coordinates: [11.0168, 76.9558] },
    ],
  },
];

export interface CCTVFeedMetadata {
  camera_id: string;
  location: string;
  fps: number;
  anomaly_score: number;
  detected_objects: string[];
  status: 'ALERT' | 'NORMAL' | 'MAINTENANCE';
  timestamp: string;
}

export const LIVE_CCTV_FEEDS: CCTVFeedMetadata[] = [
  { camera_id: 'CAM-DEL-CP-04', location: 'Connaught Place Inner Circle', fps: 30, anomaly_score: 0.88, detected_objects: ['Dense Crowd Convergence', 'Unattended Baggage'], status: 'ALERT', timestamp: 'Just now' },
  { camera_id: 'CAM-MH-MUM-12', location: 'Marine Drive Promenade', fps: 60, anomaly_score: 0.12, detected_objects: ['Pedestrian Traffic Flow', 'Normal Transit'], status: 'NORMAL', timestamp: '1m ago' },
  { camera_id: 'CAM-KA-BLR-88', location: 'MG Road Junction', fps: 30, anomaly_score: 0.74, detected_objects: ['Unscheduled Vehicle Stop', 'Signal Disruption'], status: 'ALERT', timestamp: '2m ago' },
];
