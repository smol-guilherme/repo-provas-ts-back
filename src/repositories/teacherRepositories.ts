import { prisma } from "../databases/database";
import { TeachersDisciplines } from "@prisma/client";
import { Hashtable, TTestInfoArray } from "../types/dataTypes.js";

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
  // console.log(catHash);

  newResponse.forEach((teacher) => {
    teacher.tests = sortTests(teacher.tests, { ...catHash });
  });

  return newResponse;
}

function sortTests(data: TTestInfoArray[][], customHash: Hashtable<number>) {
  const newTests: TTestInfoArray[][] = [];
  let auxArr: TTestInfoArray[] = [];
  const newArr = data.flat(1);
  let safety = 0;
  let i = 0;
  let hashFilter = Object.keys(customHash)[0];
  while (Object.keys(customHash).length !== 0) {
    if (safety > 1000) throw {};
    if (i === newArr.length) {
      i = 0;
      delete customHash[hashFilter];
      hashFilter = Object.keys(customHash)[0];
      if (auxArr.length !== 0) newTests.push(auxArr);
      auxArr = [];
    }
    if (newArr[i].category === hashFilter) auxArr.push(newArr[i]);
    i++;
    safety++;
  }
  return newTests;
}
