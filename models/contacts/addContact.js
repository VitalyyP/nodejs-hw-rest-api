import Contact from "../../model/constact";

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

export default addContact;