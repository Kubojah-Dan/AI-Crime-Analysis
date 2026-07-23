import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const INDIAN_INCIDENTS = [
  {
    id: '#AQ-294-81',
    timestamp: '2026.07.21 14:32:01',
    category: 'Property Trespass',
    state: 'Delhi',
    district: 'Central Delhi',
    location: '400 BLOCK OF KEARNY ST',
    provenance: 'VERIFIED',
  },
  {
    id: '#AQ-294-85',
    timestamp: '2026.07.21 14:45:12',
    category: 'Noise Disturbance',
    state: 'Maharashtra',
    district: 'Mumbai South',
    location: '100 BLOCK OF MARKET ST',
    provenance: 'PERIODIC',
  },
  {
    id: '#AQ-294-89',
    timestamp: '2026.07.21 15:01:44',
    category: 'Vehicle Recovery',
    state: 'Karnataka',
    district: 'Bangalore East',
    location: '2200 BLOCK OF VALENCIA ST',
    provenance: 'VERIFIED',
  },
];

export async function GET() {
  return NextResponse.json({
    status: 'success',
    count: INDIAN_INCIDENTS.length,
    items: INDIAN_INCIDENTS,
  });
}
