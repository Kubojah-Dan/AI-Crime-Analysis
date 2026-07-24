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
    state: 'Uttar Pradesh',
    code: 'UP',
    capital: 'Lucknow',
    total_incidents: 72410,
    solved_rate: 92.4,
    anomaly_flag: 'Hazratganj Patrol Surge (+8.4%)',
    districts: [
      { name: 'Lucknow (Hazratganj)', ipc_section: 'IPC 392 - Robbery', category: 'Armed Robbery Reported', incidents_count: 2840, risk_level: 'CRITICAL', trend_pct: 8.4, coordinates: [26.8467, 80.9462] },
      { name: 'Prayagraj (Civil Lines)', ipc_section: 'IPC 143 - Unlawful Assembly', category: 'Gang Activity Detected', incidents_count: 1920, risk_level: 'HIGH', trend_pct: 5.1, coordinates: [25.4358, 81.8463] },
      { name: 'Meerut (Kanker Khera)', ipc_section: 'IPC 379 - Vehicle Theft', category: 'Vehicle Theft Cluster', incidents_count: 1450, risk_level: 'HIGH', trend_pct: 3.2, coordinates: [28.9845, 77.7064] },
      { name: 'Varanasi (Sigra)', ipc_section: 'IPC 498A - Domestic Anomaly', category: 'Domestic Violence Alert', incidents_count: 1100, risk_level: 'MODERATE', trend_pct: -1.4, coordinates: [25.3176, 82.9739] },
      { name: 'Gorakhpur (Taramandal)', ipc_section: 'IPC 151 - Crowd Gathering', category: 'Suspicious Gathering', incidents_count: 880, risk_level: 'MODERATE', trend_pct: 1.0, coordinates: [26.7606, 83.3732] },
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

/* ── Operational Command Triage Queue ────────────────────────────────── */
export interface PriorityAlert {
  id: string;
  case_id: string;
  title: string;
  location: string;
  beat: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  sla_timer: string;
  age: string;
  source_count: number;
  confidence_pct: number;
  category: string;
  status: 'NEW' | 'CORROBORATING' | 'ESCALATED' | 'DISPATCHED' | 'VERIFIED' | 'CLOSED';
}

export const PRIORITY_ALERT_QUEUE: PriorityAlert[] = [
  {
    id: 'ALT-101',
    case_id: '23-05-28-1127',
    title: 'Armed Robbery Reported',
    location: 'Lucknow, Hazratganj',
    beat: 'Beat 4 (Central Market)',
    severity: 'CRITICAL',
    sla_timer: '00:02:15',
    age: '2m',
    source_count: 4,
    confidence_pct: 82,
    category: 'IPC 392 - Robbery',
    status: 'DISPATCHED',
  },
  {
    id: 'ALT-102',
    case_id: '23-05-28-1123',
    title: 'Gang Activity Detected',
    location: 'Prayagraj, Civil Lines',
    beat: 'Beat 2 (Station limits)',
    severity: 'HIGH',
    sla_timer: '00:07:48',
    age: '7m',
    source_count: 3,
    confidence_pct: 76,
    category: 'IPC 143 - Assembly',
    status: 'ESCALATED',
  },
  {
    id: 'ALT-103',
    case_id: '23-05-28-1119',
    title: 'Vehicle Theft Cluster',
    location: 'Meerut, Kanker Khera',
    beat: 'Beat 7 (Bypass Rd)',
    severity: 'HIGH',
    sla_timer: '00:09:12',
    age: '9m',
    source_count: 2,
    confidence_pct: 69,
    category: 'IPC 379 - Vehicle Theft',
    status: 'NEW',
  },
  {
    id: 'ALT-104',
    case_id: '23-05-28-1114',
    title: 'Domestic Violence Alert',
    location: 'Varanasi, Sigra',
    beat: 'Beat 1 (Residential)',
    severity: 'MEDIUM',
    sla_timer: '00:14:32',
    age: '14m',
    source_count: 2,
    confidence_pct: 88,
    category: 'IPC 498A - Domestic',
    status: 'CORROBORATING',
  },
  {
    id: 'ALT-105',
    case_id: '23-05-28-1108',
    title: 'Suspicious Gathering',
    location: 'Gorakhpur, Taramandal',
    beat: 'Beat 5 (Lake Circle)',
    severity: 'MEDIUM',
    sla_timer: '00:16:05',
    age: '16m',
    source_count: 1,
    confidence_pct: 54,
    category: 'IPC 151 - Crowd',
    status: 'NEW',
  },
];

/* ── Live Patrol Unit Status ─────────────────────────────────────────── */
export interface PatrolUnit {
  unit_id: string;
  location: string;
  status: 'En Route' | 'On Scene' | 'Patrolling' | 'Busy';
  eta_activity: string;
  coordinates: [number, number];
  officer_in_charge: string;
  vehicle_type: 'PCR Van' | 'Motorcycle Beat' | 'Interceptor';
}

export const LIVE_PATROL_UNITS: PatrolUnit[] = [
  { unit_id: 'UP-32-PCR-124', location: 'Hazratganj', status: 'En Route', eta_activity: 'ETA 2 mins', coordinates: [26.8467, 80.9462], officer_in_charge: 'Sub-Inspector R. Sharma', vehicle_type: 'PCR Van' },
  { unit_id: 'UP-32-PCR-117', location: 'Aminabad', status: 'On Scene', eta_activity: 'At Incident', coordinates: [26.8410, 80.9250], officer_in_charge: 'Head Constable V. Singh', vehicle_type: 'PCR Van' },
  { unit_id: 'UP-32-PCR-101', location: 'Gomti Nagar', status: 'Patrolling', eta_activity: 'Patrolling', coordinates: [26.8500, 81.0000], officer_in_charge: 'Constable A. Verma', vehicle_type: 'Motorcycle Beat' },
  { unit_id: 'UP-32-PCR-108', location: 'Aliganj', status: 'Patrolling', eta_activity: 'Patrolling', coordinates: [26.8800, 80.9500], officer_in_charge: 'Sub-Inspector M. Khan', vehicle_type: 'PCR Van' },
  { unit_id: 'UP-32-PCR-132', location: 'Indira Nagar', status: 'Busy', eta_activity: 'Other Assignment', coordinates: [26.8700, 80.9800], officer_in_charge: 'Constable S. Gupta', vehicle_type: 'Interceptor' },
];

/* ── Evidence & Data Lineage (Audit Trail) ───────────────────────────── */
export interface LineageEvent {
  step: string;
  source: '112 Call' | 'CCTV Footage' | 'ALPR Hit' | 'Witness Statement' | 'Field Survey';
  timestamp: string;
  description: string;
  hash: string;
}

export const EVIDENCE_AUDIT_TRAIL: LineageEvent[] = [
  { step: '10:17', source: '112 Call', timestamp: '10:17:32', description: 'Caller reported robbery by 2 unknown persons.', hash: '9c7f...a2b1' },
  { step: '10:18', source: 'CCTV Footage', timestamp: '10:18:41', description: 'CCTV Match found on CAM-DEL-CP-04.', hash: '8f3e...b4c2' },
  { step: '10:19', source: 'ALPR Hit', timestamp: '10:18:59', description: 'Stolen vehicle plate hit on Junction 12.', hash: '3d1a...f901' },
  { step: '10:20', source: 'Witness Statement', timestamp: '10:20:15', description: 'Field officer voice note attached.', hash: '7c89...e12a' },
  { step: '10:23', source: 'Field Survey', timestamp: '10:21:08', description: 'Officer foot patrol observation synced.', hash: '1b44...d88c' },
];
