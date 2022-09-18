import {
  convertToInsertableRandomObject,
  randomTestObject,
} from "../../tests/factories/testsFactory.js";
import { TTestInsert } from "../types/dataTypes.js";
import { prisma } from "./database.js";

async function main() {
  const data: TTestInsert[] = [];
  for (let i = 0; i < Math.floor(Math.random() * 12); i++) {
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
