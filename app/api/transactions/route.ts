import { NextResponse } from 'next/server';

import { generateTransactions } from '@/lib/faker';

export async function GET() {
  const transactions = generateTransactions();
  return NextResponse.json(transactions);
} 