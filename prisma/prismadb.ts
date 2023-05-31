import { PrismaClient } from "@prisma/client";
export { Prisma } from "@prisma/client";

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({ log: ["info"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export function exclude<T, Key extends keyof T>(
  user: T,
  keys: Key[]
): Omit<T, Key> {
  for (const key of keys) {
    delete user[key]
  }
  return user
}