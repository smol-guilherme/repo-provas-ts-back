import { Response, Request } from "express";
import {
  getTestsByFilterRoutine,
  insertTestRoutine,
} from "../services/testServices";

export async function registerTest(req: Request, res: Response) {
  const response = await insertTestRoutine(req.body);
  res.status(201).send(response);
  return;
}

export async function getTests(req: Request, res: Response) {
  const { filter } = req.params;
  const response = await getTestsByFilterRoutine(filter);
  res.status(200).send(response);
  return;
}
