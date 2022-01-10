import { HttpCode } from "../../lib/constants";
import authService from "../../service/auth";

const changeSubscription = async (req, res, next) => {
  const id = req.params.id;
  const { subsctiption } = req.body;
  await authService.setSubscription(id, subsctiption);
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.NO_CONTENT, data: {} });
};

export default changeSubscription;
