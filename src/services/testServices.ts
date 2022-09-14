import { ITestRequest } from "../types/dataTypes.js";
import { categoryExistsTest } from "./categoryServices.js";
import { disciplineExistsTest } from "./disciplineServices.js";
import { teacherDisciplineRelationTest } from "./teacherServices.js";

export async function insertTestRoutine(data: ITestRequest) {
  const categoryId: number = await categoryExistsTest(data.category);
  // esses dois aqui
  const disciplineId: number = await disciplineExistsTest(data.discipline);
  const relationId: number = await teacherDisciplineRelationTest(
    disciplineId,
    data.teacherName
  );
  // trocar por uma função só que verifica se a combinação existe,
  // se sim, retorna id, se não, registra.
  return "booh";
}
