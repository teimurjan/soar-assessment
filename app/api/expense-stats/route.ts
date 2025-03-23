import { NextResponse } from 'next/server';

import { generateExpenseStats } from '@/lib/faker';

export async function GET() {
  const expenseStats = generateExpenseStats();
  return NextResponse.json(expenseStats);
} 