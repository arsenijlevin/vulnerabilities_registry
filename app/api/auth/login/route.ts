import { compare } from 'bcrypt';

import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@prisma/prismadb';
import { SessionPayload, createSession } from '@lib/session';
import { LoginData } from '../types';

export interface LoginResponse {
  token: string;
}

export async function POST(request: NextRequest) {
  const { login, password } = (await request.json()) as LoginData;

  const user = await prisma.users.findFirst({
    where: {
      login: login,
    },
  });

  if (!user) return new NextResponse('Incorrect credentials', { status: 400 });

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) new NextResponse('Incorrect credentials', { status: 400 });

  const sessionUser: SessionPayload = {
    login: user.login,
    rights_id: user.rights_id.toString(),
  };

  const token = await createSession(sessionUser);

  return NextResponse.json({ token } as LoginResponse);
}
