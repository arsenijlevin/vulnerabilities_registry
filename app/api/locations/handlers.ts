import { locations } from '@prisma/client';
import { prisma } from '@prisma/prismadb';

export const createLocations = async (data: locations) => {
  const locations = await prisma.locations.create({
    data,
  });

  return locations;
};

export const updateLocations = async (id: number, data: locations) => {
  const locations = await prisma.locations.update({
    where: {
      id,
    },
    data,
  });

  return locations;
};

export const getLocationsById = async (id: number) => {
  const locations = await prisma.locations.findUnique({
    where: {
      id: id,
    },
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

  return locations;
};

export const getAllLocations = async () => {
  const locations = await prisma.locations.findMany();

  return locations;
};

export const deleteLocationsById = async (id: number) => {
  const locations = await prisma.locations.delete({
    where: {
      id: id,
    },
  });

  return locations;
};
