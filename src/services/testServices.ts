import { insert } from "../repositories/testRepositories";
import { ITestRequest, TTestInsert } from "../types/dataTypes";
import { categoryExistsTest } from "./categoryServices";
import { disciplineExistsTest } from "./disciplineServices";
import { teacherDisciplineRelationTest } from "./teacherServices";
import * as teacher from "../repositories/teacherRepositories";
import * as discipline from "../repositories/disciplineRepositories";

export async function insertTestRoutine(data: ITestRequest) {
  const categoryId: number = await categoryExistsTest(data.category);

  const disciplineId: number = await disciplineExistsTest(data.discipline);
  const relationId: number = await teacherDisciplineRelationTest(
    disciplineId,
    data.teacherName
  );
  const insertData: TTestInsert = {
    name: data.name,
    pdfUrl: data.pdfUrl,
    teachersDisciplineId: relationId!,
    categoryId,
  };
  const accessId = await insert(insertData);
  return accessId;
}

export async function getTestsByFilterRoutine(filter: string) {
  if (filter === "teacher") return await teacher.queryRoutineByFilter();
  return await discipline.queryRoutineByFilter();
}
