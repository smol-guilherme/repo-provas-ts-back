import { prisma } from "../databases/database";
import { TObjectId } from "../types/dataTypes";

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
  const newReponse = response.map((disciplineInfoLayer) => {
    return {
      id: disciplineInfoLayer.id,
      disciplineName: disciplineInfoLayer.name,
      tests: disciplineInfoLayer.teacherDiscipline.map((testInfoLayer) => {
        return {
          ...testInfoLayer.tests.map((fields) => {
            return {
              id: fields.id,
              name: fields.name,
              pdfUrl: fields.pdfUrl,
              professorName: testInfoLayer.Teachers.name,
              term: testInfoLayer.Disciplines.term.number,
              category: fields.Categories.name,
            };
          }),
        };
      }),
    };
  });
  return newReponse;
}
