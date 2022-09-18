import { IRegistryBody, UserInsertOrLogin } from "../../src/types/dataTypes.js";
import { faker } from "@faker-js/faker";

export function completeUserForSignup(): IRegistryBody {
  return {
    email: "ademir@email.com",
    password: "averysecretpassword",
    repeatPassword: "averysecretpassword",
  };
}

export function incompleteUserForSignup(): IRegistryBody {
  const data: IRegistryBody = completeUserForSignup();
  const randomNumber: number = Math.floor(
    Math.random() * Object.keys(data).length
  );
  data[Object.keys(data)[randomNumber] as keyof typeof data] = "";
  return data;
}

export function completeUserForSignin(rightPassword: boolean): IRegistryBody {
  let password = "averysecretpassword";
  if (!rightPassword) {
    password = faker.internet.password();
  }
  return {
    email: "ademir@email.com",
    password: password,
  };
}

export function incompleteUserForSignin(): UserInsertOrLogin {
  const data: UserInsertOrLogin = completeUserForSignin(true);
  const randomNumber: number = Math.floor(
    Math.random() * Object.keys(data).length
  );
  data[Object.keys(data)[randomNumber] as keyof typeof data] = "";
  return data;
}

export function randomUserRegister(validBody: boolean): IRegistryBody {
  const password = faker.internet.password();
  const repeatPassword = () => {
    if (validBody) return password;
    return faker.internet.password();
  };
  return {
    email: faker.internet.email(),
    password: password,
    repeatPassword: repeatPassword(),
  };
}

export function nonExistentUserLogin(): IRegistryBody {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
