import listContacts from "../../models/contacts/listContacts";
import { HttpCode } from "../../lib/constants";

const getContacts = async (req, res, next) => {
  const contacts = await listContacts(req.query);
  console.log(contacts);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};

export default getContacts;
