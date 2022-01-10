import { HttpCode } from "../lib/constants";
import { FORBIDDEN } from "../lib/messages";

const subscriptionAccess = (subscription) => async (req, res, next) => {
  const subscriptionCurrentUser = req.user.subscription;
  if (subscriptionCurrentUser !== subscription) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: "error",
      code: HttpCode.FORBIDDEN,
      message: FORBIDDEN[req.app.get("lang")],
    });
  }
  next();
};

export default subscriptionAccess;
