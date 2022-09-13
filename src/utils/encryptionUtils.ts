import { Users } from "@prisma/client";
import { emitToken } from "./tokenUtils.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import { UserInsertOrLogin } from "../services/authServices.js";
import { IRegistryBody } from "../services/authServices.js";

export function passwordEncrypt(rawData: string) {
  return bcrypt.hashSync(rawData, 10);
}

export async function passwordAuth(
  requestData: UserInsertOrLogin,
  queriedData: Users
) {
  if (await passwordCompare(requestData.password, queriedData.password))
    return emitToken(queriedData.id);
  throw {
    type: "authentication_error",
    message: "incorrect email or password",
  };
}

async function passwordCompare(userPassword: string, queryPassword: string) {
  return bcrypt.compare(userPassword, queryPassword);
}

export function passwordFormat(userData: IRegistryBody) {
  const bcryptPassword = passwordEncrypt(userData.password);
  userData.password = bcryptPassword;
  delete userData.repeatPassword;
  return;
}
