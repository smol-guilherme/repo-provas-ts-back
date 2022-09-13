
import { Router, Request, Response } from "express";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/validateMiddleware.js";

const router = Router();

router.get('/route', (req: Request, res: Response) => res.status(200).send(`ok`));
router.post('/route', clearData, validateData);
router.delete('/route', clearData, validateData);

export default router;