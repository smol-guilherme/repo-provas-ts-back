import express, { json } from "express";
import "express-async-errors";
import "dotenv/config"
import cors from "cors";
import router from "./routers/router";
import { handleError } from "./middlewares/errorHandler";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(handleError)


const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}@${Date()}`) );