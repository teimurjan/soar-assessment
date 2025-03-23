import { NextResponse } from 'next/server';

import { generateBalanceHistory } from '@/lib/faker';

export async function GET() {
  const balanceHistory = generateBalanceHistory();
  return NextResponse.json(balanceHistory);
} 