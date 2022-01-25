import { Router } from "express";
import { aggregation } from "../../../controllers/users";
import uploadAvatar from "../../../controllers/users/uploadAvatar";
import verifyUser from "../../../controllers/users/verifyUser";
import guard from "../../../midllewares/guard";
import { upload } from "../../../midllewares/upload";
import subscriptionAccess from "../../../midllewares/subscription-access";
import { SUBSCRIPTIONS } from "../../../lib/constants";
import changeSubscription from "../../../controllers/users/changeSubscription";
import repeatEmailForVerifyUser from "../../../controllers/users/repeatEmailForVerifyUser";
import wrapperError from "../../../midllewares/error-handler";

const router = new Router();

router.get(
  "/stats/:id",
  guard,
  subscriptionAccess(SUBSCRIPTIONS.BUSINESS),
  wrapperError(aggregation)
);

router.patch(
  "/avatars",
  guard,
  upload.single("avatar"),
  wrapperError(uploadAvatar)
);
router.patch("/:id", guard, wrapperError(changeSubscription));

router.post("/verify", wrapperError(repeatEmailForVerifyUser));
router.get("/verify/:token", wrapperError(verifyUser));

export default router;
