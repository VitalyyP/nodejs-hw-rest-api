import Contact from "../../model/constact";

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, favorite, page, limit = 5, skip = 0 }
) => {
  let sortCriteria = null;
  const total = await Contact.find({ owner: userId }).countDocuments();
  let result = Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "name email age subscription",
  });
  if (favorite) {
    result = Contact.find({ owner: userId }).find({ favorite });
  }
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 };
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 };
  }
  if (filter) {
    result = result.select(filter.split("|").join(" "));
  }
  const skipCurrent = page ? (page - 1) * limit : skip;
  result = await result
    .skip(Number(skipCurrent))
    .limit(Number(limit))
    .sort(sortCriteria);
  return { total, contacts: result };
};

export default listContacts;
