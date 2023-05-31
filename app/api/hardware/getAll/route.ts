import { NextResponse } from "next/server";

import prisma from "@prisma/prismadb";

export async function GET() {

  const hardware = await prisma.hardware.findMany();

  return NextResponse.json(hardware);
}