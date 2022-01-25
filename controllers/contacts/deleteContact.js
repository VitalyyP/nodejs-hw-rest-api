import removeContact from "../../models/contacts/removeContact";
import { HttpCode } from "../../lib/constants";
import { CustomError } from "../../utils/custom-error";

const deleteContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await removeContact(userId, id);
  if (contact) {
    return res.status(HttpCode.OK).json({ contact });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

export default deleteContact;
