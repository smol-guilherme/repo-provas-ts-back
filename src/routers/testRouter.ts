import { Router } from "express";
import { registerTest } from "../controllers/testControllers";
import { authenticateUser } from "../controllers/authControllers";
import validateData from "../middlewares/joiValidationMiddleware";

const testRouter = Router();

testRouter.post(
  "/tests",
  validateData("testSchema"),
  authenticateUser,
  registerTest
);
testRouter.get("/tests");

export default testRouter;
