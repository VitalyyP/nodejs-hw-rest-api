import User from "../model/user";

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByVerifyToken = async (verifyTokenEmail) => {
  return await User.findOne({ verifyTokenEmail });
};

const create = async (body) => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateVerify = async (id, status) => {
  return await User.updateOne(
    { _id: id },
    { isVerify: status, verifyTokenEmail: null }
  );
};

const updateAvatar = async (id, avatar, idAvatarCloud = null) => {
  return await User.updateMany({ _id: id }, { avatar, idAvatarCloud });
};

const updateSubscription = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription });
};

export default {
  findById,
  findByEmail,
  create,
  updateToken,
  updateVerify,
  updateSubscription,
  updateAvatar,
  findByVerifyToken,
};
