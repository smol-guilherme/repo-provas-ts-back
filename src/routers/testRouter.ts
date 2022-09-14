import { Router } from "express";
import { registerTest } from "../controllers/testControllers.js";
import { authenticateUser } from "../controllers/authControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/joiValidationMiddleware.js";

const testRouter = Router();

testRouter.post(
  "/tests",
  clearData,
  validateData("testSchema"),
  authenticateUser,
  registerTest
);
testRouter.get("/tests", clearData);

export default testRouter;
