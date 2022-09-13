import { Router, Request, Response } from "express";
import {
  authenticateUser,
  registerUser,
} from "../controllers/authControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/joiValidationMiddleware.js";

const authRouter = Router();

authRouter.get("/route", (req: Request, res: Response) =>
  res.status(200).send(`ok`)
);
authRouter.post(
  "/signup",
  clearData,
  validateData("signupSchema"),
  registerUser
);
authRouter.post(
  "/signin",
  clearData,
  validateData("signinSchema"),
  authenticateUser
);

export default authRouter;
