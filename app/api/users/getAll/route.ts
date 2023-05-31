import { NextResponse } from "next/server";

import { exclude, prisma, Prisma } from "@prisma/prismadb";

export type UsersWithRights = Prisma.PromiseReturnType<typeof getAllUsersWithRights>

const getAllUsersWithRights = async () => {
  const users = await prisma.users.findMany({
    include: {
      rights: true,
    },
  });

  return users.map((user) => exclude(user, ["rights_id"]));
}

export async function GET() {
  const users = await getAllUsersWithRights();

  return NextResponse.json(users);
}