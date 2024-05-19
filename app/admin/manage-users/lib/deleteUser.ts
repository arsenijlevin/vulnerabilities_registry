'use client';

export async function deleteUser(login: string | number) {
  const res = await fetch(`/api/users/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: `${login}`,
    }),
  });

  if (res.status === 200) {
    return 'OK';
  }

  return '';
}
