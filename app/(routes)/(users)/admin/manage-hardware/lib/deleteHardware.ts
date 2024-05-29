'use client';

export async function deleteHardware(id: string | number) {
  const res = await fetch(`/api/hardware/${id.toString()}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 200) {
    return 'OK';
  }

  return '';
}
