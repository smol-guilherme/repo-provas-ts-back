import { Request, Response, NextFunction } from "express";
import * as schemas from "./schemas/dataSchemas";

type SchemaProp = keyof typeof schemas;

export default function validateData(schema: SchemaProp) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas[schema] === undefined) throw Error("no schema found");
    if (Object.keys(req.body).length === 0)
      throw {
        type: "empty_request",
        message: "request has no data to process.",
      };
    const { error } = schemas[schema].validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;
    next();
  };
}
