import addContact from "../../models/contacts/addContact";
import { HttpCode } from "../../lib/constants";

const addNewContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: newContact },
  });
};

export default addNewContact;
