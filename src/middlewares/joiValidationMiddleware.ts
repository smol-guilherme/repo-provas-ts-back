import { Request, Response, NextFunction } from "express";
import * as schemas from "./schemas/dataSchemas.js";

type SchemaProp = keyof typeof schemas;

export default function validateData(schema: SchemaProp) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas[schema] === undefined) throw Error("no schema found");
    const { error } = schemas[schema].validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error.details;
    next();
  };
}
