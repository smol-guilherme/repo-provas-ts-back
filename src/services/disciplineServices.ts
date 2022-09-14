import { findIdByName } from "../repositories/disciplineRepositories.js";

export async function disciplineExistsTest(disciplineName: string) {
  const data = await findIdByName(disciplineName);
  if (data === null) throw { type: "not_found_error" };
  return data.id;
}
