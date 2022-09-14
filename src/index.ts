import express, { json } from "express";
import "express-async-errors";
import "dotenv/config";
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

const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () =>
  console.log(`Server up and running on PORT ${PORT}@${Date()}`)
);

export default app;
