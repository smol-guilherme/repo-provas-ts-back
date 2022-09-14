import { findByNameOrInsert } from "../repositories/categoryRepositories.js";

export async function categoryExistsTest(
  categoryName: string
): Promise<number> {
  return await findByNameOrInsert(categoryName);
}
