import { Request, Response, NextFunction } from "express";
import * as schemas from "./schemas/dataSchemas";

type SchemaProp = keyof typeof schemas;

export default async function validateData(schema: SchemaProp) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (schemas[schema] === undefined) throw Error("no schema found");
    await schemas[schema].validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  };
}
