import { IRegistryBody, UserInsertOrLogin } from "../../src/types/dataTypes.js";

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

export function completeUserForSignin(): IRegistryBody {
  return {
    email: "ademir@email.com",
    password: "averysecretpassword",
  };
}

export function incompleteUserForSignin(): UserInsertOrLogin {
  const data: UserInsertOrLogin = completeUserForSignin();
  const randomNumber: number = Math.floor(
    Math.random() * Object.keys(data).length
  );
  data[Object.keys(data)[randomNumber] as keyof typeof data] = "";
  return data;
}
