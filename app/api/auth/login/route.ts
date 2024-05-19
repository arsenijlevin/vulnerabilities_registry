import { compare } from 'bcrypt';
import { sign, Secret } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { LoginData, SessionUser } from './types';
import { prisma } from '@prisma/prismadb';

export async function POST(request: NextRequest) {
  const { login, password }: LoginData = await request.json();

  const user = await prisma.users.findFirst({
    where: {
      login: login,
    },
  });

  if (!user) return new NextResponse('Incorrect credentials', { status: 400 });

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) new NextResponse('Incorrect credentials', { status: 400 });

  const sessionUser: SessionUser = {
    login: user.login,
    rights_id: user.rights_id,
  };

  const token = sign(sessionUser, process.env.SECRET_KEY as Secret, {
    expiresIn: '4h',
    algorithm: 'HS512',
  });

  const serializedToken = JSON.stringify(token);

  return new NextResponse(serializedToken, {
    status: 200,
  });
}
