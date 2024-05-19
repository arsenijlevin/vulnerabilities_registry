'use server';

import { LoginData } from '@api/auth/login/types';
import { users } from '@prisma/client';

export async function processRegister(loginData: LoginData) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}api/auth/register`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as users;

  return data;
}
