import getContactById from "../../models/contacts/getContactById";
import { HttpCode } from "../../lib/constants";
import { CustomError } from "../../utils/custom-error";

const getContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await getContactById(userId, id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

export default getContact;
