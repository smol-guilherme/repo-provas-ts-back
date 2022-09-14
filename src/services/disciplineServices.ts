import { findIdByName } from "../repositories/disciplineRepositories.js";

export async function disciplineExistsTest(disciplineName: string) {
  const data = await findIdByName(disciplineName);
  if (data === null)
    throw {
      type: "not_found_error",
      message: `${disciplineName} discipline not found in the database`,
    };
  return data.id;
}
