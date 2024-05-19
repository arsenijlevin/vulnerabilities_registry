import { NextResponse } from 'next/server';

import { prisma, Prisma } from '@prisma/prismadb';

export type Vulnerabilities = Prisma.PromiseReturnType<typeof getAllVulnerabilities>;

const getAllVulnerabilities = async () => {
  const vulnerabilities = await prisma.vulnerabilities.findMany({
    include: {
      vuln_types: {
        include: {
          vuln_types_list: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  return vulnerabilities;
};

export async function GET() {
  const vulnerabilities = await getAllVulnerabilities();

  return NextResponse.json(vulnerabilities);
}
