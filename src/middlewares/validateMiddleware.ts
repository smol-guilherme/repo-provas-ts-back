import { Request, Response, NextFunction } from "express";
import * as schemas from "./schemas/dataSchemas";

export default async function validateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationData = [req.params, req.body];
  for (const index in validationData) {
    if (Object.keys(validationData[index]).length === 0) continue;
    const schema = schemas[setSchema(validationData[index])];
    await schema.validateAsync(validationData[index], {
      abortEarly: false,
    });
  }
  next();
}

function setSchema(objectData: Object): string {
  const keys = Object.keys(objectData);
  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case "number":
        return "onlinePayments";
      case "cardId":
        if(keys.length !== 1) break;
        return "cardHistory";
      case "type":
        return "cardType";
      case "id":
        return "companyId";
      case "CVV":
        return "workerCard";
      case "password":
        if (keys.includes("businessId")) return "payments";
        if (keys.includes("amount")) return "cardLoad";
        return "cardBlock";
      case "amount":
        return "cardLoad";
      default:
        break;
    }
  }
  throw { type: "no_schema_error" };
}