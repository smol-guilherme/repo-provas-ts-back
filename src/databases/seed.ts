import {
  convertToInsertableRandomObject,
  randomTestObject,
} from "../../tests/factories/testsFactory";
import { TTestInsert } from "../types/dataTypes";
import { prisma } from "./database";

const SAMPLE_SIZE = 40;

async function main() {
  // módulos do curso
  await prisma.terms.upsert({
    where: { id: 1 },
    update: {},
    create: { number: 1 },
  });
  await prisma.terms.upsert({
    where: { id: 2 },
    update: {},
    create: { number: 2 },
  });
  await prisma.terms.upsert({
    where: { id: 3 },
    update: {},
    create: { number: 3 },
  });
  await prisma.terms.upsert({
    where: { id: 4 },
    update: {},
    create: { number: 4 },
  });
  await prisma.terms.upsert({
    where: { id: 5 },
    update: {},
    create: { number: 5 },
  });
  await prisma.terms.upsert({
    where: { id: 6 },
    update: {},
    create: { number: 6 },
  });

  // tipos de provas
  await prisma.categories.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Projeto" },
  });
  await prisma.categories.upsert({
    where: { id: 2 },
    update: {},
    create: { name: "Prática" },
  });
  await prisma.categories.upsert({
    where: { id: 3 },
    update: {},
    create: { name: "Recuperação" },
  });

  // professores(as)
  await prisma.teachers.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Diego Pinho" },
  });
  await prisma.teachers.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Bruna Hamori" },
  });

  // disciplinas
  await prisma.disciplines.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "HTML e CSS", termId: 1 },
  });
  await prisma.disciplines.upsert({
    where: { id: 2 },
    update: {},
    create: { name: "JavaScript", termId: 2 },
  });
  await prisma.disciplines.upsert({
    where: { id: 3 },
    update: {},
    create: { name: "React", termId: 3 },
  });
  await prisma.disciplines.upsert({
    where: { id: 4 },
    update: {},
    create: { name: "Humildade", termId: 1 },
  });
  await prisma.disciplines.upsert({
    where: { id: 5 },
    update: {},
    create: { name: "Planejamento", termId: 2 },
  });
  await prisma.disciplines.upsert({
    where: { id: 6 },
    update: {},
    create: { name: "Autoconfiança", termId: 3 },
  });

  await prisma.teachersDisciplines.upsert({
    where: { id: 1 },
    update: {},
    create: { teacherId: 1, disciplineId: 1 },
  });
  await prisma.teachersDisciplines.upsert({
    where: { id: 2 },
    update: {},
    create: { teacherId: 1, disciplineId: 1 },
  });
  await prisma.teachersDisciplines.upsert({
    where: { id: 3 },
    update: {},
    create: { teacherId: 1, disciplineId: 1 },
  });
  await prisma.teachersDisciplines.upsert({
    where: { id: 4 },
    update: {},
    create: { teacherId: 2, disciplineId: 2 },
  });
  await prisma.teachersDisciplines.upsert({
    where: { id: 5 },
    update: {},
    create: { teacherId: 2, disciplineId: 2 },
  });
  await prisma.teachersDisciplines.upsert({
    where: { id: 6 },
    update: {},
    create: { teacherId: 2, disciplineId: 2 },
  });

  const data: TTestInsert[] = [];
  for (let i = 0; i < SAMPLE_SIZE; i++) {
    data.push(convertToInsertableRandomObject(randomTestObject(true)));
  }
  await prisma.tests.createMany({ data });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
