import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  details: IJoiError[];
  type: string;
  message: string;
}

interface IJoiError {
  type: string;
  custom_message?: string;
}

export function handleError(
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  if (isJoiError(error)) {
    if (error?.details[0]?.type === "string.pattern.base")
      return res.status(422).send(error?.message);
    if (error?.details[0]?.type === "any.only")
      return res.status(422).send(error?.message);
    if (error?.details[0]?.type === "string.empty")
      return res.status(422).send(error?.message);
  }
  if (error.type === "not_found_error")
    return res.status(404).send({ message: error.message });
  if (error.type === "no_schema_error")
    return res.status(400).send({ message: error.message });
  if (error.type === "already_exists_error")
    return res.status(409).send({ message: error.message });
  if (error.type === "ownership_not_match_error")
    return res.status(401).send({ message: error.message });

  res.status(500).send({ message: error.message });
}

function isJoiError(error: IError): Boolean {
  if (Object.keys(error).includes("details")) return true;
  return false;
}
