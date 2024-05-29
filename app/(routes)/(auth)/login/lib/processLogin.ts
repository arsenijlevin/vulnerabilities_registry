'use server';

import { LoginResponse } from '@/app/api/auth/login/route';
import { LoginData } from '@api/auth/types';

export async function processLogin(loginData: LoginData): Promise<LoginResponse | null> {
  const response = await fetch(`http://localhost:3000/api/auth/login`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`${response.status.toString()} ${response.statusText}`);
  }

  const jwt = (await response.json()) as LoginResponse;

  return jwt;
}
