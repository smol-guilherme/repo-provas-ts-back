import { Router, Request, Response } from "express";
import { authenticateUser, registerUser } from "../controllers/authControllers";
import validateData from "../middlewares/joiValidationMiddleware";

const authRouter = Router();

authRouter.get("/route", (req: Request, res: Response) =>
  res.status(200).send(`ok`)
);
authRouter.post("/signup", validateData("signupSchema"), registerUser);
authRouter.post("/signin", validateData("signinSchema"), authenticateUser);

export default authRouter;
