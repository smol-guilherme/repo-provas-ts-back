import { Request, Response, NextFunction } from "express";
import * as schemas from "./schemas/dataSchemas";

type SchemaProp = keyof typeof schemas;

export default function validateData(schema: SchemaProp) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = () => {
      if (Object.keys(req.body).length !== 0) return req.body;
      if (Object.keys(req.params).length !== 0) return req.params;
      if (Object.keys(req.query).length !== 0) return req.query;
      return {};
    };
    if (schemas[schema] === undefined) throw Error("no schema found");
    console.log(data());

    if (Object.keys(data()).length === 0)
      throw {
        type: "empty_request",
        message: "request has no data to process.",
      };
    const { error } = schemas[schema].validate(data(), {
      abortEarly: false,
    });
    if (error) throw error;
    next();
  };
}
