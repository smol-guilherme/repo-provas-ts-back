import { Response, Request } from "express";
import { insertTestRoutine } from "../services/testServices.js";

export async function registerTest(req: Request, res: Response) {
  const response = await insertTestRoutine(req.body);
  res.status(201).send(response);
  return;
}
