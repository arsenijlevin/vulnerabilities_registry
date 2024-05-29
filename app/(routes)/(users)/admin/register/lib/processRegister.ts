'use server';

import { LoginData } from '@api/auth/types';
import { users } from '@prisma/client';

export async function processRegister(loginData: LoginData) {
  const response = await fetch(`/api/auth/register`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error(`${response.status.toString()} ${response.statusText}`);
  }

  const data = (await response.json()) as users;

  return data;
}
