import { NextFunction, Request, Response } from "express";
import { stripHtml } from "string-strip-html";

export default function (req: Request, res: Response, next: NextFunction) {
  const data = [req.headers, req.params, req.query, req.body];

  for (let i = 0; i < data.length; i++) {
    for (const param in data[i]) {
      if (typeof data[i][param] === "string") {
        data[i][param] = stripHtml(data[i][param]).result.trim();
      }
    }
  }
  next();
}
