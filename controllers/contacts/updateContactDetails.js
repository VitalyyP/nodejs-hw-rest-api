import updateContact from "../../models/contacts/updateContact";
import { HttpCode } from "../../lib/constants";

const updateContactDetails = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await updateContact(userId, id, req.body);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};

export default updateContactDetails;
