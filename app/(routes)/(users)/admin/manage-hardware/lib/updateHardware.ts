'use client';

import { SingleHardware, UpdateHardwareData } from '@api/hardware/[[...id]]/route';

export async function updateHardware(id: number, data: UpdateHardwareData) {
  console.log('id', id);
  console.log('data', data);

  const res = await fetch(`/api/hardware/${id.toString()}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const hardware = (await res.json()) as SingleHardware;

  return hardware;
}
