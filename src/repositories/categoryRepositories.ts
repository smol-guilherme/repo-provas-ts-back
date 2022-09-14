import { prisma } from "../databases/database";
import { TObjectId } from "../types/dataTypes";

export async function findIdByName(catName: string): Promise<TObjectId | null> {
  const response = await prisma.categories.findUnique({
    where: {
      name: catName,
    },
  });
  return response;
}
