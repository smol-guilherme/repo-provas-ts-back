import { findRelationIdByNames } from "../repositories/teacherRepositories";

export async function teacherDisciplineRelationTest(
  disciplineId: number,
  teacherName: string
) {
  const data = await findRelationIdByNames(disciplineId, teacherName);

  if (data === null || data === undefined)
    throw {
      type: "invalid_request_error",
      message: `Relation between ${teacherName} and discipline id ${disciplineId} not found in the database`,
    };
  return data.id;
}
