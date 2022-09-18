import {
  convertToInsertableRandomObject,
  randomTestObject,
} from "../../tests/factories/testsFactory";
import { TTestInsert } from "../types/dataTypes";
import { prisma } from "./database";

const SAMPLE_SIZE = 40;

async function main() {
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
