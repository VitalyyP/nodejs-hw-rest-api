import { HttpCode } from "../../lib/constants";
import getStatisticsContacts from "../../models/contacts/getStatisticsContacts";
import { CustomError } from "../../utils/custom-error";

const aggregation = async (req, res, next) => {
  const { id } = req.params;
  const data = await getStatisticsContacts(id);
  if (data) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};
export { aggregation };
