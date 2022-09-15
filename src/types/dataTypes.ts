import * as models from "@prisma/client";

export type TTestInsert = Omit<models.Tests, "id">;
type TTestStrings = Omit<TTestInsert, "categoryId" | "teachersDisciplineId">;
export interface ITestRequest extends TTestStrings {
  category: string;
  discipline: string;
  teacherName: string;
}

export type TObjectId = Omit<models.Categories, "name">;

export interface IRegistryBody {
  email: string;
  password: string;
  repeatPassword?: string;
}

export type UserInsertOrLogin = Omit<models.Users, "id">;

export interface IError extends Error {
  details: IJoiError[];
  type: string;
  message: string;
}

export interface IJoiError {
  type: string;
  message: string;
  custom_message?: string;
}
