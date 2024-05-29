import { users } from '@prisma/client';
import { exclude, prisma } from '@prisma/prismadb';

export const updateUser = async (login: string, data: users) => {
  const users = await prisma.users.update({
    where: {
      login,
    },
    data,
  });

  return users;
};

export const getUserByLogin = async (login: string) => {
  const user = await prisma.users.findUnique({
    where: {
      login: login,
    },
    include: {
      rights: {
        select: {
          title: true,
        },
      },
    },
  });

  user && exclude(user, ['password']);

  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    include: {
      rights: {
        select: {
          title: true,
        },
      },
    },
  });

  users.map((user) => exclude(user, ['password']));

  return users;
};

export const deleteUserByLogin = async (login: string) => {
  const users = await prisma.users.delete({
    where: {
      login: login,
    },
  });

  return users;
};
