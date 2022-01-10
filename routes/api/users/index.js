import { Router } from "express";
import { aggregation } from "../../../controllers/users";
import guard from "../../../midllewares/guard";
import subscriptionAccess from "../../../midllewares/subscription-access";
import { SUBSCRIPTIONS } from "../../../lib/constants";

const router = new Router();

router.get(
  "/stats/:id",
  guard,
  subscriptionAccess(SUBSCRIPTIONS.BUSINESS),
  aggregation
);

export default router;
