import { NextResponse } from 'next/server';

import { generateCards } from '@/lib/faker';

export async function GET() {
  const cards = generateCards();
  return NextResponse.json(cards);
} 