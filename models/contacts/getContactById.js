import Contact from "../../model/constact";

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email age subscription",
  });
  return result;
};

export default getContactById;
