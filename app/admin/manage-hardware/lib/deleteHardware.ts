'use client';

export async function deleteHardware(id: string | number) {
  const res = await fetch('/api/hardware/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: `${id}`,
    }),
  });

  if (res.status === 200) {
    return 'OK';
  }

  return '';
}
