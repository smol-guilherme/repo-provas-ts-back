import { prisma } from "../databases/database.js";
import { TObjectId } from "../types/dataTypes.js";

export async function findIdByName(
  discName: string
): Promise<TObjectId | null> {
  const response = prisma.disciplines.findUnique({
    where: {
      name: discName,
    },
  });
  return response;
}
