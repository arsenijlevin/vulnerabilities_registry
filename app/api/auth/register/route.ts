import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { prisma } from '@prisma/prismadb';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    login: string;
    password: string;
    rights_id: number;
  };
  const { login, rights_id } = body;

  const password = await bcrypt.hash(body.password, 12);

  const user = await prisma.users.create({
    data: {
      login,
      password,
      rights_id,
    },
  });

  return NextResponse.json(user);
}
