import { prisma } from "../databases/database.js";
import { TObjectId } from "../types/dataTypes.js";

export async function findIdByName(catName: string): Promise<TObjectId | null> {
  const response = await prisma.categories.findUnique({
    where: {
      name: catName,
    },
  });
  return response;
}
