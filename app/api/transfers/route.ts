import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock successful response
    return NextResponse.json({
      success: true,
      message: 'Transfer completed successfully',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        ...body,
        date: new Date().toISOString(),
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process transfer' },
      { status: 500 }
    );
  }
} 