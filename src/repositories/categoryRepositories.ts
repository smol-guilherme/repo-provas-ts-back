import { prisma } from "../databases/database.js";
import { TCategoryId } from "../types/dataTypes.js";

export async function findByName(catName: string): Promise<TCategoryId> {
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
