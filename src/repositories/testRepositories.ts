import { prisma } from "../databases/database";
import { TObjectId, TTestInsert } from "../types/dataTypes";

export async function insert(data: TTestInsert): Promise<TObjectId> {
  return await prisma.tests.create({ data, select: { id: true } });
}
