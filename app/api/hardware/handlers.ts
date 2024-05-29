import { UpdateHardwareData } from './[[...id]]/route';
import { hardware } from '@prisma/client';
import { prisma } from '@prisma/prismadb';

export const createHardware = async (data: hardware) => {
  const hardware = await prisma.hardware.create({
    data,
  });

  return hardware;
};

export const updateHardware = async (id: number, data: UpdateHardwareData) => {
  const hardware = await prisma.hardware.update({
    where: {
      id,
    },
    data: {
      hardware_location: {
        deleteMany: {
          hardware_id: id,
        },
        upsert: [
          {
            where: {
              location_id_hardware_id: {
                hardware_id: id,
                location_id: id,
              },
            },
            update: {
              location_id: id,
            },
            create: {
              location_id: id,
            },
          },
        ],
      },
    },
  });

  return hardware;
};

export const getHardwareById = async (id: number) => {
  const hardware = await prisma.hardware.findUnique({
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

  return hardware;
};

export const getAllHardware = async () => {
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

export const deleteHardwareById = async (id: number) => {
  const hardware = await prisma.hardware.delete({
    where: {
      id: id,
    },
  });

  return hardware;
};
