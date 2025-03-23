import { NextResponse } from 'next/server';

import { generateContacts } from '@/lib/faker';

export async function GET() {
  const contacts = generateContacts();
  return NextResponse.json(contacts);
} 