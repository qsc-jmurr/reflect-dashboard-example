import { NextRequest, NextResponse } from 'next/server';

// For development with self-signed certificates
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_REFLECT_BASE_URL || 'https://reflect.qsc.com/api/public/v0';
    const bearerToken = process.env.NEXT_PUBLIC_REFLECT_BEARER_TOKEN;

    console.log('Cores API - Base URL:', baseUrl);
    console.log('Cores API - Bearer token exists:', !!bearerToken);
    console.log('Cores API - Bearer token length:', bearerToken?.length);

    if (!bearerToken) {
      console.error('Cores API - Bearer token not configured');
      return NextResponse.json(
        { error: 'Bearer token not configured' },
        { status: 500 }
      );
    }

    const apiUrl = `${baseUrl}/cores`;
    console.log('Cores API - Making request to:', apiUrl);

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Cores API - Response status:', response.status);
    console.log('Cores API - Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cores API - Error response:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}. Response: ${errorText}`);
    }

    const data = await response.json();
    console.log('Cores API - Success, data length:', Array.isArray(data) ? data.length : 'not array');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Cores API - Catch block error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cores data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}