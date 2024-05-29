import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/prismadb';
import { getHardwareById, getAllHardware, deleteHardwareById, updateHardware, createHardware } from '../handlers';
import { hardware } from '@prisma/client';

interface HardwareParamsGET {
  params: {
    id: string;
  };
}
export type UpdateHardwareData = Prisma.hardwareUpdateArgs['data'];
export type SingleHardware = Exclude<Prisma.PromiseReturnType<typeof getHardwareById>, null>;

export async function GET(request: Request, { params }: HardwareParamsGET) {
  const hardware = !params.id ? await getAllHardware() : await getHardwareById(+params.id);

  return NextResponse.json(hardware);
}

export async function POST(request: Request) {
  const hardware = await createHardware((await request.json()) as hardware);

  return NextResponse.json(hardware, {
    status: 201,
  });
}

export async function PUT(request: Request, { params }: HardwareParamsGET) {
  const hardware = await updateHardware(+params.id, (await request.json()) as UpdateHardwareData);

  return NextResponse.json(hardware);
}

export async function DELETE(request: Request, { params }: HardwareParamsGET) {
  const hardware = await deleteHardwareById(+params.id);

  return NextResponse.json(hardware);
}
