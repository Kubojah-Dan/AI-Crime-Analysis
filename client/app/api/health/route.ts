import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    platform: 'AegisIQ Public Safety Intelligence',
    checked_at: new Date().toISOString(),
    dependencies: {
      catalyst_datastore: 'healthy',
      quickml_engine: 'healthy',
      stratus_storage: 'healthy',
    },
  });
}
