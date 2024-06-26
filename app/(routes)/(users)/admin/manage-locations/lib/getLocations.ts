'use client';

import { locations } from '@prisma/client';

export async function getLocations() {
  const res = await fetch('/api/locations');
  const location = (await res.json()) as locations[];

  return location;
}
