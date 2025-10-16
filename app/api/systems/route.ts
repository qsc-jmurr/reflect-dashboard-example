import { NextRequest, NextResponse } from 'next/server';

// For development with self-signed certificates
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_REFLECT_BASE_URL || 'https://reflect.qsc.com/api/public/v0';
    const bearerToken = process.env.NEXT_PUBLIC_REFLECT_BEARER_TOKEN;

    console.log('Systems API - Base URL:', baseUrl);
    console.log('Systems API - Bearer token exists:', !!bearerToken);
    console.log('Systems API - Bearer token length:', bearerToken?.length);

    if (!bearerToken) {
      console.error('Systems API - Bearer token not configured');
      return NextResponse.json(
        { error: 'Bearer token not configured' },
        { status: 500 }
      );
    }

    const apiUrl = `${baseUrl}/systems`;
    console.log('Systems API - Making request to:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Systems API - Response status:', response.status);
    console.log('Systems API - Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Systems API - Error response:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}. Response: ${errorText}`);
    }

    const data = await response.json();
    console.log('Systems API - Success, data length:', Array.isArray(data) ? data.length : 'not array');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Systems API - Catch block error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch systems data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}