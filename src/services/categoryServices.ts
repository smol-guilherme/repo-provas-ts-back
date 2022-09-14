import { findIdByName } from "../repositories/categoryRepositories.js";

export async function categoryExistsTest(
  categoryName: string
): Promise<number> {
  const data = await findIdByName(categoryName);
  if (data === null) throw { type: "not_found_error" };
  return data.id;
}
