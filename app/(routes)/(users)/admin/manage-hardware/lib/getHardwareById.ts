'use client';

import { SingleHardware } from '@api/hardware/[[...id]]/route';

export async function getHardwareById(id: number) {
  const res = await fetch(`/api/hardware/${id.toString()}`);

  const hardware = (await res.json()) as SingleHardware;

  return hardware;
}
