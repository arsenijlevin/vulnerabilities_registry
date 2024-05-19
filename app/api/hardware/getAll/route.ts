import { NextResponse } from 'next/server';

import { prisma, Prisma } from '@prisma/prismadb';

export type Hardware = Prisma.PromiseReturnType<typeof getAllHardware>;

const getAllHardware = async () => {
  const hardware = await prisma.hardware.findMany({
    include: {
      hardware_location: {
        include: {
          locations: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return hardware;
};

export async function GET() {
  const hardware = await getAllHardware();

  return NextResponse.json(hardware);
}
