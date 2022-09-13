import { Request, Response, NextFunction } from "express";
import * as schemas from "./schemas/dataSchemas";

type SchemaProp = keyof typeof schemas;

export default function validateData(schema: SchemaProp) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas[schema] === undefined) throw Error("no schema found");
    schemas[schema].validate(req.body, {
      abortEarly: false,
    });
    next();
  };
}
