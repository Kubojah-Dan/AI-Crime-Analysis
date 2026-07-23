import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body || {};

    const token = `aegis_jwt_${Date.now()}_${Buffer.from(username || 'officer').toString('base64')}`;

    return NextResponse.json({
      access_token: token,
      token_type: 'bearer',
      user: {
        username: username || 'Officer',
        role: 'Field Intelligence Officer',
        clearance: 'Security Level-5',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
