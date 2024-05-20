import { NextResponse } from 'next/server';

import { prisma, Prisma } from '@prisma/prismadb';

export type VulnerabilitiesForHardware = Prisma.PromiseReturnType<typeof getAllVulnerabilitiesForHardware>;

const getAllVulnerabilitiesForHardware = async (hardwareId: number) => {
  const vulnerabilities = await prisma.vulnerabilities.findMany({
    where: {
      vuln_hardware: {
        some: {
          hardware_id: hardwareId,
        },
      },
    },
    include: {
      vuln_hardware: {
        select: {
          hardware: true,
        },
      },
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

export async function POST(request: Request) {
  const { id } = await request.json();

  const vulnerabilities = await getAllVulnerabilitiesForHardware(id);

  return NextResponse.json(vulnerabilities);
}
