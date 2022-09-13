import { Response, Request } from "express";
// import { authenticationRoutine, registerRoutine } from "../services/authServices.js";

export async function registerUser(req: Request, res: Response) {
  // await registerRoutine(req.body);
  res.status(201).send({ message: "User created" });
  return;
}

export async function authenticateUser(req: Request, res: Response) {
  // const response = await authenticationRoutine(req.body);
  // res.status(200).send(response);
  return;
}
