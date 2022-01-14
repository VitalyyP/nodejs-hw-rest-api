import { v2 as cloudinary } from "cloudinary";
import { promisify } from "util";
import { unlink } from "fs/promises";
import { CLOUDINARY_FODLDER_AVATARS } from "../../lib/constants";
import users from "../../repository/users";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class CloudStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filePath = file.path;
    this.idAvatarCloud = user.idAvatarCloud;
    this.folderAvatars = CLOUDINARY_FODLDER_AVATARS;
    this.uploadCloud = promisify(cloudinary.uploader.upload);
  }

  async saveAvatar() {
    const { public_id: returnedIdAvatar, secure_url: avatarUrl } =
      await this.uploadCloud(this.filePath, {
        public_id: this.idAvatarCloud,
        folder: this.folderAvatars,
      });
    const newIdAvatar = returnedIdAvatar.replace(`${this.folderAvatars}/`, "");
    await users.updateAvatar(this.userId, avatarUrl, newIdAvatar);
    await this.removeUploadFile(this.filePath);
    return avatarUrl;
  }

  async removeUploadFile(filePath) {
    try {
      await unlink(filePath);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default CloudStorage;
