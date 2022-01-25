import Contact from "../../model/constact";

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

export default removeContact;
