import { prisma } from "../databases/database";
import { TObjectId } from "../types/dataTypes";

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

export async function queryRoutineByFilter() {
  return;
}
