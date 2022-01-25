import removeContact from "../../models/contacts/removeContact";
import { HttpCode } from "../../lib/constants";

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (contact) {
    return res.status(HttpCode.OK).json({ contact });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};

export default deleteContact;
