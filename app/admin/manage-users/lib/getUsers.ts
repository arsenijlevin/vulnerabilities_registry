'use client';

import { UsersWithRights } from '@api/users/getAll/route';

export async function getUsers() {
  const res = await fetch(`/api/users/getAll`);
  const users = (await res.json()) as UsersWithRights;

  const usersWithStringRights = users.map((user) => {
    return {
      ...user,
      rights: user.rights.title,
    };
  });
  return usersWithStringRights;
}
