import { NextRequest, NextResponse } from 'next/server';

const RAN_SERVICES_URL = process.env.RAN_SERVICES_URL || 'http://ran-services:5000';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint parameter required' }, { status: 400 });
  }

  try {
    const url = `${RAN_SERVICES_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data: data,
      endpoint: endpoint,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reach RAN services',
      endpoint: endpoint
    }, { status: 500 });
  }
}
