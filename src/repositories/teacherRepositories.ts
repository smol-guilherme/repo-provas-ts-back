import { prisma } from "../databases/database";
import { TeachersDisciplines } from "@prisma/client";

export async function findRelationIdByNames(
  discId: number,
  teachName: string
): Promise<TeachersDisciplines | null> {
  const response = await prisma.teachers
    .findUnique({
      where: { name: teachName },
    })
    .teachersDisciplines();
  if (response === null) return response;
  const relation = response.filter((relation) => relation.id === discId)[0];
  return relation;
}
