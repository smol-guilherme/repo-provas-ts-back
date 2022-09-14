import * as auth from "../repositories/authRepositories";
import { passwordAuth, passwordFormat } from "../utils/encryptionUtils";
import { IRegistryBody, UserInsertOrLogin } from "../types/dataTypes";

export async function registerRoutine(userData: IRegistryBody) {
  await isUserRegistered(userData.email, false);
  passwordFormat(userData);
  const callback = await auth.insert(userData);
  if (callback === null)
    throw {
      type: "registry_conflict",
      message: "e-mail address is already in use",
    };
  return;
}

async function isUserRegistered(data: string, isLogin: boolean) {
  const response = await auth.findByEmail(data);
  if (!isLogin && response !== null)
    throw {
      type: "registry_conflict",
      message: "e-mail address is already in use",
    };
  if (isLogin && response === null)
    throw { type: "not_found", message: "email invalid or not found" };
  return response;
}

export async function authenticationRoutine(userData: UserInsertOrLogin) {
  const credentials = await isUserRegistered(userData.email, true);
  const token = await passwordAuth(userData, credentials!);
  return { token };
}
