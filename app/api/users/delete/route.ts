import { NextResponse } from "next/server";

import prisma from "@prisma/prismadb";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { login }  = await request.json();

  await prisma.users.delete({
    where: {
      login
    }
  });

  return new NextResponse(login, {
    status: 200,
  });
}