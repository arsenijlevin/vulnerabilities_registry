import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/prismadb';
import { getUserByLogin, getAllUsers, deleteUserByLogin, updateUser } from '../handlers';
import { users } from '@prisma/client';

interface UserParamsGET {
  params?: {
    login?: string[];
  };
}

export type SingleUser = Prisma.PromiseReturnType<typeof getUserByLogin>;

export async function GET(request: Request, { params }: UserParamsGET) {
  if (params?.login && params.login.length > 0) {
    const login = params.login[0];

    const user = await getUserByLogin(login);

    return NextResponse.json(user);
  }

  const users = await getAllUsers();

  return NextResponse.json(users);
}

export async function PUT(request: Request, { params }: UserParamsGET) {
  if (!params?.login || params.login.length === 0) {
    return NextResponse.json(
      {},
      {
        status: 404,
      },
    );
  }

  const users = await updateUser(params.login[0], (await request.json()) as users);

  return NextResponse.json(users);
}

export async function DELETE(request: Request, { params }: UserParamsGET) {
  if (!params?.login || params.login.length === 0) {
    return NextResponse.json(
      {},
      {
        status: 404,
      },
    );
  }

  const users = await deleteUserByLogin(params.login[0]);

  return NextResponse.json(users);
}
