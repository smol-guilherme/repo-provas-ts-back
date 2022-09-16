import { Router } from "express";
import { getTests, registerTest } from "../controllers/testControllers";
import { validateToken } from "../middlewares/tokenValidation";
import validateData from "../middlewares/joiValidationMiddleware";

const testRouter = Router();

testRouter.post(
  "/tests",
  validateToken,
  validateData("testSchema"),
  registerTest
);
testRouter.get(
  "/tests/:filter",
  validateToken,
  validateData("filterSchema"),
  getTests
);

export default testRouter;
