import { findRelationIdByNames } from "../repositories/teacherRepositories.js";

export async function teacherDisciplineRelationTest(
  disciplineId: number,
  teacherName: string
) {
  const data = await findRelationIdByNames(disciplineId, teacherName);
  if (data === null || data === undefined) throw { type: "not_found_error" };
  return data.id;
}
