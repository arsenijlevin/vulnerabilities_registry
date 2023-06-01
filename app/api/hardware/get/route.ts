import { NextRequest, NextResponse } from "next/server";

import { prisma, Prisma } from "@prisma/prismadb";

export type SingleHardware = Prisma.PromiseReturnType<typeof getHardwareById>

const getHardwareById = async (id: number) => {
  const hardware = await prisma.hardware.findUnique({
    where: {
      id: id
    },
    include: {
      hardware_location: {
        include: {
          locations: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });


  return hardware;
}

export async function POST(request: NextRequest) {
  const { id } = await request.json();


  const hardware = await getHardwareById(id);

  return NextResponse.json(hardware);
}