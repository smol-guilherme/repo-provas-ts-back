import * as models from "@prisma/client";

export type ITestInsert = Omit<models.Tests, "id">;
export type ITestRequest = {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacherName: string;
};
export type TObjectId = Omit<models.Categories, "name">;

export interface IRegistryBody {
  email: string;
  password: string;
  repeatPassword?: string;
}

export type UserInsertOrLogin = Omit<models.Users, "id">;
