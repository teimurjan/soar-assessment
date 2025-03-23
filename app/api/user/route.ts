import { NextResponse } from "next/server";

import { generateUser } from "@/lib/faker";

export async function GET() {
  const user = generateUser();
  return NextResponse.json(user);
}
