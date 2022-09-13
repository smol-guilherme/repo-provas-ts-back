import { Tests } from "@prisma/client";
import { categoryExistsTest } from "./categoryServices.js";

export type ITestInsert = Omit<Tests, "id">;
export type ITestRequest = {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
};

export async function insertTestRoutine(data: ITestRequest) {
  // const insertData: ITestInsert =
  const categoryId: number = await categoryExistsTest(data.category);
  // esses dois aqui
  const disciplineId: number = await disciplineExistsTest(data.discipline);
  const teacherId: number = await isTeacherRegistered(data.teacher);
  // trocar por uma função só que verifica se a combinação existe,
  // se sim, retorna id, se não, registra.
  return "booh";
}

async function disciplineExistsTest(disciplineName: string) {
  return 1;
}

async function isTeacherRegistered(teacherName: string) {
  return 1;
}
