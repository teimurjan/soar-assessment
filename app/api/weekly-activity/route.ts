import { NextResponse } from 'next/server';

import { generateWeeklyActivity } from '@/lib/faker';

export async function GET() {
  const weeklyActivity = generateWeeklyActivity();
  return NextResponse.json(weeklyActivity);
} 