import { prisma } from "../databases/database.js";
import { TCategoryId } from "../types/dataTypes.js";

export async function findByNameOrInsert(catName: string): Promise<number> {
  const { id } = await prisma.categories.upsert({
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
  return id;
}
