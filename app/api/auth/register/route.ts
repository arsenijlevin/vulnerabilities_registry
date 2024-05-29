import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { prisma } from '@prisma/prismadb';
import { LoginData } from '../types';

export async function POST(request: Request) {
  const { login, password, rights_id } = (await request.json()) as LoginData;

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.users.create({
    data: {
      login,
      password: passwordHash,
      rights_id,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
