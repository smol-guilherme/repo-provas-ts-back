import { findIdByName } from "../repositories/categoryRepositories";

export async function categoryExistsTest(
  categoryName: string
): Promise<number> {
  const data = await findIdByName(categoryName);
  if (data === null)
    throw {
      type: "not_found_error",
      message: `${categoryName} category not found in the database`,
    };
  return data.id;
}
