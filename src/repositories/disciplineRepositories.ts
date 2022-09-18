import { prisma } from "../databases/database";
import { Hashtable, TObjectId } from "../types/dataTypes";
import { sortDTests } from "../utils/dataSortingUtils";

export async function findIdByName(
  discName: string
): Promise<TObjectId | null> {
  const response = prisma.disciplines.findUnique({
    where: {
      name: discName,
    },
  });
  return response;
}

export async function queryRoutineByFilter() {
  const response = await prisma.disciplines.findMany({
    where: {},
    include: {
      teacherDiscipline: {
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
          Teachers: {
            select: {
              name: true,
            },
          },
          Disciplines: {
            select: {
              term: {
                select: {
                  number: true,
                },
              },
            },
          },
        },
      },
    },
  });

  console.log(response);

  const newResponse = response.map((disciplineInfoLayer) => {
    return {
      id: disciplineInfoLayer.id,
      disciplineName: disciplineInfoLayer.name,
      tests: disciplineInfoLayer.teacherDiscipline.map((testInfoLayer) =>
        testInfoLayer.tests.map((fields) => {
          return {
            term: testInfoLayer.Disciplines.term.number,
            id: fields.id,
            testName: fields.name,
            pdfUrl: fields.pdfUrl,
            category: fields.Categories.name,
            professorName: testInfoLayer.Teachers.name,
          };
        })
      ),
    };
  });

  const catHash: Hashtable<number> = {};
  let i = 0;

  newResponse.forEach((teacher, index, arr) => {
    if (teacher.tests.flat(1).length === 0) arr.splice(index, 1);
  });

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

  newResponse.forEach((discipline) => {
    discipline.tests = sortDTests(discipline.tests, { ...catHash });
  });

  return newResponse;
}
