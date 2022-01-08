import { Router } from "express";
import registration from "../../../controllers/auth/registration";
import login from "../../../controllers/auth/login";
import logout from "../../../controllers/auth/logout";
import guard from "../../../midllewares/guard";

const router = new Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", guard, logout);

export default router;
