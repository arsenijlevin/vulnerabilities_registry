'use client';

import { hardware } from '@prisma/client';

export async function getHardware() {
  const res = await fetch('/api/hardware');
  const hardware = (await res.json()) as hardware[];

  return hardware.map((hardwareItem) => {
    return {
      ...hardwareItem,
      hardware_location: [],
      // hardware_location: [hardwareItem.hardware_location.map((location) => location.locations.name).join(', ')],
    };
  });
}
