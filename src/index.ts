import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import { handleError } from "./middlewares/errorHandler";
import authRouter from "./routers/authRouter";
import testRouter from "./routers/testRouter";

const app = express();

app.use(json());
app.use(cors());
app.use(authRouter);
app.use(testRouter);
app.use(handleError);

export default app;
