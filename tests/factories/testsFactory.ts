import { faker } from "@faker-js/faker";
import { ITestRequest, TTestInsert } from "../../src/types/dataTypes";
// "test": "NODE_ENV=test prisma migrate dev && NODE_ENV=test prisma db seed && NODE_ENV=test jest -i --no-cache --watch newRquestTest.test.ts"
// "test": "NODE_ENV=test jest -i --no-cache --watch newRequestTests.test.ts"
export function completeTest(): ITestRequest {
  return {
    name: "Projeto Globo",
    pdfUrl: "https://www.google.com/pdf",
    category: "Projeto",
    discipline: "HTML e CSS",
    teacherName: "Diego Pinho",
  };
}
const categories = ["Projeto", "Prática", "Recuperação"];
const hardDisciplines = ["HTML e CSS", "JavaScript", "React"];
const softDisciplines = ["Humildade", "Planejamento", "Autoconfiança"];
const professorList = ["Diego Pinho", "Bruna Hamori"];

export function randomTestObject(validObject: boolean) {
  const upToLength = (param: number) => Math.floor(Math.random() * param);
  const two = Math.floor(Math.random() * (professorList.length - 1));
  let discipline: string;
  let professor: string;
  if (two < 1) {
    discipline = hardDisciplines[upToLength(hardDisciplines.length)];
  } else {
    discipline = softDisciplines[upToLength(softDisciplines.length)];
  }
  console.log(two, Math.floor(1 / (two + 1)));

  if (validObject) {
    professor = professorList[two];
  } else {
    professor = professorList[Math.floor(1 / (two + 1))];
  }
  return {
    name: `${faker.random.words()} test`,
    pdfUrl: faker.internet.url(),
    category: categories[upToLength(categories.length)],
    discipline: discipline,
    teacherName: professor,
  };
}

export function convertToInsertableRandomObject(
  data: ITestRequest
): TTestInsert {
  return {
    name: data.name,
    pdfUrl: data.pdfUrl,
    categoryId: categories.indexOf(data.category),
    teachersDisciplineId:
      (categories.indexOf(data.discipline) + 1) *
      (categories.indexOf(data.teacherName) + 1),
  };
}

export function incompleteTest(): ITestRequest {
  const data: ITestRequest = completeTest();
  const randomNumber: number = Math.floor(
    Math.random() * Object.keys(data).length
  );
  data[Object.keys(data)[randomNumber] as keyof typeof data] = "";
  return data;
}
