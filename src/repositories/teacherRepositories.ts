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

export async function queryRoutineByFilter() {
  const response = await prisma.teachers.findMany({
    where: {},
    include: {
      teachersDisciplines: {
        select: {
          Disciplines: {
            select: {
              id: false,
              name: true,
            },
          },
          tests: {
            select: {
              name: true,
              pdfUrl: true,
              Categories: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const newResponse = response.map((teacherInfoLayer) => {
    return {
      id: teacherInfoLayer.id,
      name: teacherInfoLayer.name,
      tests: teacherInfoLayer.teachersDisciplines.map((testInfoLayer) => {
        return {
          discipline: testInfoLayer.Disciplines.name,
          ...testInfoLayer.tests.map((test) => {
            return {
              name: test.name,
              pdfUrl: test.pdfUrl,
              category: test.Categories.name,
            };
          }),
        };
      }),
    };
  });
  newResponse.forEach((teacher) =>
    teacher.tests.map((test, index, arr) => {
      if (Object.keys(test).length === 1) arr.splice(index, 1);
    })
  );
  console.log(newResponse[0].tests[0]);

  return newResponse;
}
