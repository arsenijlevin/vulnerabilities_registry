import { PrismaClient } from "@prisma/client";
export { PrismaClient } from "@prisma/client";
export { Prisma } from "@prisma/client";

export const prisma = new PrismaClient({ log: ["info"] });

export function exclude<T, Key extends keyof T>(
  user: T,
  keys: Key[]
): Omit<T, Key> {
  for (const key of keys) {
    delete user[key]
  }
  return user
}