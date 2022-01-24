import { Router } from "express";
import signup from "../../../controllers/auth/signup";
import login from "../../../controllers/auth/login";
import logout from "../../../controllers/auth/logout";
import guard from "../../../midllewares/guard";
import limiter from "../../../midllewares/rate-limit";
import { authValidation } from "../../../midllewares/validation/authValidation";
import wrapperError from "../../../midllewares/error-handler";

const router = new Router();

router.post(
  "/signup",
  limiter(15 * 60 * 1000, 20),
  authValidation,
  wrapperError(signup)
);
router.post("/login", wrapperError(login));
router.post("/logout", guard, wrapperError(logout));

export default router;
