import { faker } from "@faker-js/faker";
import { ITestRequest } from "../../src/types/dataTypes";

export function completeTest(): ITestRequest {
  return {
    name: "Projeto Globo",
    pdfUrl: "https://www.google.com/pdf",
    category: "Projeto",
    discipline: "HTML e CSS",
    teacherName: "Diego Pinho",
  };
}

export function randomTestObject(validObject: boolean) {
  const categories = ["Projeto", "Recuperação", "Prática"];
  const upToLength = (param: number) => Math.floor(Math.random() * param);
  const hardDisciplines = ["HTML e CSS", "JavaScript", "React"];
  const softDisciplines = ["Humildade", "Planejamento", "Autoconfiança"];
  const professorList = ["Bruna Hamori", "Diego Pinho"];
  const two = Math.floor(Math.random() * (professorList.length - 1));
  let discipline: string;
  let professor: string;
  if (two < 1) {
    discipline = softDisciplines[upToLength(softDisciplines.length)];
  } else {
    discipline = hardDisciplines[upToLength(hardDisciplines.length)];
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

export function incompleteTest(): ITestRequest {
  const data: ITestRequest = completeTest();
  const randomNumber: number = Math.floor(
    Math.random() * Object.keys(data).length
  );
  data[Object.keys(data)[randomNumber] as keyof typeof data] = "";
  return data;
}
