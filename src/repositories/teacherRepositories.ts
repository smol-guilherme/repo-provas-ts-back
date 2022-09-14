import { prisma } from "../databases/database.js";
import { TObjectId } from "../types/dataTypes.js";

export async function findIdByName(
  teachName: string
): Promise<TObjectId | null> {
  const response = prisma.teachers.findUnique({
    where: {
      name: teachName,
    },
  });
  return response;
}
