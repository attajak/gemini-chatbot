import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import chatRouter from "./chat";
import historyRouter from "./history";
import reservationRouter from "./reservation";
import filesRouter from "./files";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(chatRouter);
router.use(historyRouter);
router.use(reservationRouter);
router.use(filesRouter);

export default router;
