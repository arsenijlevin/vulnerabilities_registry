import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/prismadb';
import { getLocationsById, getAllLocations, deleteLocationsById, updateLocations, createLocations } from '../handlers';
import { locations } from '@prisma/client';

interface LocationsParamsGET {
  params: {
    id: string;
  };
}

export type SingleLocations = Prisma.PromiseReturnType<typeof getLocationsById>;

export async function GET(request: Request, { params }: LocationsParamsGET) {
  const locations = !params.id ? await getAllLocations() : await getLocationsById(+params.id);

  return NextResponse.json(locations);
}

export async function POST(request: Request) {
  const locations = await createLocations((await request.json()) as locations);

  return NextResponse.json(locations, {
    status: 201,
  });
}

export async function PUT(request: Request, { params }: LocationsParamsGET) {
  const locations = await updateLocations(+params.id, (await request.json()) as locations);

  return NextResponse.json(locations);
}

export async function DELETE(request: Request, { params }: LocationsParamsGET) {
  const location = await deleteLocationsById(+params.id);

  return NextResponse.json(location);
}
