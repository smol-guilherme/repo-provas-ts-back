import { prisma } from "../databases/database.js";
import { UserInsertOrLogin } from "../types/dataTypes.js";
import { Users } from "@prisma/client";

export async function findByEmail(email: string): Promise<Users | null> {
  return await prisma.users.findFirst({ where: { email } });
}

export async function insert(data: UserInsertOrLogin) {
  return await prisma.users.create({ data });
}
