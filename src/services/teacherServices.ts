import { findIdByName } from "../repositories/teacherRepositories.js";

export async function isTeacherRegistered(teacherName: string) {
  const data = await findIdByName(teacherName);
  if (data === null) throw { type: "not_found_error" };
  return data.id;
}
