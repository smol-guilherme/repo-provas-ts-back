import { prisma } from "../databases/database";
import { TeachersDisciplines } from "@prisma/client";
import { Hashtable } from "../types/dataTypes";
import { sortTests } from "../utils/dataSortingUtils";

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
          tests: {
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              Categories: {
                select: {
                  name: true,
                },
              },
            },
          },
          Disciplines: {
            select: {
              id: false,
              name: true,
              term: true,
            },
          },
        },
      },
    },
  });

  const newResponse = response.map((teacherInfoLayer) => {
    return {
      id: teacherInfoLayer.id,
      professorName: teacherInfoLayer.name,
      tests: teacherInfoLayer.teachersDisciplines.map((testInfoLayer) =>
        testInfoLayer.tests.map((test) => {
          return {
            id: test.id,
            term: testInfoLayer.Disciplines.term.number,
            testName: test.name,
            pdfUrl: test.pdfUrl,
            category: test.Categories.name,
            discipline: testInfoLayer.Disciplines.name,
          };
        })
      ),
    };
  });
  newResponse.forEach((teacher) =>
    teacher.tests.map((test, index, arr) => {
      if (Object.keys(test).length === 0) arr.splice(index, 1);
    })
  );
  const catHash: Hashtable<number> = {};
  let i = 0;
  newResponse.map((data) =>
    data.tests.map((item) =>
      item.map((test) => {
        if (catHash[test.category as keyof typeof catHash] === undefined) {
          catHash[test.category as keyof typeof catHash] = i;
          i++;
        }
      })
    )
  );

  newResponse.forEach((teacher) => {
    teacher.tests = sortTests(teacher.tests, { ...catHash });
  });

  return newResponse;
}
