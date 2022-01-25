import { Router } from "express";
import { aggregation } from "../../../controllers/users";
import guard from "../../../midllewares/guard";
import subscriptionAccess from "../../../midllewares/subscription-access";
import { SUBSCRIPTIONS } from "../../../lib/constants";
import changeSubscription from "../../../controllers/users/changeSubscription";

const router = new Router();

router.get(
  "/stats/:id",
  guard,
  subscriptionAccess(SUBSCRIPTIONS.BUSINESS),
  aggregation
);

router.patch("/:id", guard, changeSubscription);

export default router;
