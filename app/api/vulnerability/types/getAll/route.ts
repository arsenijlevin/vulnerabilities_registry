import { NextResponse } from 'next/server';

import { prisma, Prisma } from '@prisma/prismadb';

export type VulnerabilityType = Prisma.PromiseReturnType<typeof getAllVulnerabilityTypes>;

const getAllVulnerabilityTypes = async () => {
  const vulnerabilityTypes = await prisma.vuln_types_list.findMany();

  return vulnerabilityTypes;
};

export async function GET() {
  const vulnerabilityTypes = await getAllVulnerabilityTypes();

  return NextResponse.json(vulnerabilityTypes);
}
