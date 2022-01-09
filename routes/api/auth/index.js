import { Router } from "express";
import registration from "../../../controllers/auth/registration";
import login from "../../../controllers/auth/login";
import logout from "../../../controllers/auth/logout";
import guard from "../../../midllewares/guard";
import limiter from "../../../midllewares/rate-limit";

const router = new Router();

router.post("/registration", limiter(15 * 60 * 1000, 2), registration);
router.post("/login", login);
router.post("/logout", guard, logout);

export default router;
