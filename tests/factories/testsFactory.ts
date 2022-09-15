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

export function incompleteTest(): ITestRequest {
  const data: ITestRequest = {
    name: "Projeto Globo",
    pdfUrl: "https://www.google.com/pdf",
    category: "Projeto",
    discipline: "HTML e CSS",
    teacherName: "Diego Pinho",
  };
  const randomNumber: number = Math.floor(
    Math.random() * Object.keys(data).length
  );
  data[Object.keys(data)[randomNumber] as keyof typeof data] = "";
  return data;
}

incompleteTest();
