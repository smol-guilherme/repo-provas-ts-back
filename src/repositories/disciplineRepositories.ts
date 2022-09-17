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
  // console.log(response);
  return response;
}
