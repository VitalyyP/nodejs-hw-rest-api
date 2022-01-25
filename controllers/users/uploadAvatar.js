/* eslint-disable no-unused-vars */
import { HttpCode } from "../../lib/constants";
import {
  LocalStorage,
  FileStorage,
  CloudStorage,
} from "../../service/file-storage";

const uploadAvatar = async (req, res, next) => {
  const fileStorage = new FileStorage(LocalStorage, req.file, req.user); // localStorage
  // const fileStorage = new FileStorage(CloudStorage, req.file, req.user); // cloudStorage
  const avatarUrl = await fileStorage.updateAvatar();
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
};

export default uploadAvatar;
