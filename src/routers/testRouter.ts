import { Router } from "express";
import { registerTest } from "../controllers/testControllers";
import { validateToken } from "../middlewares/tokenValidation";
import validateData from "../middlewares/joiValidationMiddleware";

const testRouter = Router();

testRouter.post(
  "/tests",
  validateData("testSchema"),
  validateToken,
  registerTest
);
testRouter.get("/tests");

export default testRouter;
