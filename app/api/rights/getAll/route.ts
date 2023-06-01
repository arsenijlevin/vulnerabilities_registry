import { NextResponse } from "next/server";

import { prisma } from "@prisma/prismadb";

export async function GET() {

  const locations = await prisma.rights.findMany();

  return NextResponse.json(locations);
}