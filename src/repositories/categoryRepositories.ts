import { prisma } from "../databases/database.js";
import { Categories } from "@prisma/client";

export async function findByName(catName: string): Promise<Categories> {
  const response = await prisma.categories.upsert({
    where: {
      name: catName,
    },
    update: {},
    create: {
      name: catName,
    },
    select: {
      id: true,
    },
  });
  return response;
}
