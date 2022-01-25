import path from "path";
import fs from "fs/promises";
import users from "../../repository/users";

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.fileName = file.filename;
    this.filePath = file.path;
    this.folderAvatars = `${process.env.PUBLIC_FOLDER}/avatars`;
    // this.folderAvatars = process.env.FOLDER_FOR_AVATARS;
  }

  async saveAvatar() {
    // Папка где будет лежать аватарка физически
    const destination = path.join(this.folderAvatars, this.userId);
    // Создаем папку если ее нет
    await fs.mkdir(destination, { recursive: true });
    // Переносим файл из папки UPLOAD_DIR в destination
    await fs.rename(this.filePath, path.join(destination, this.fileName)); // avatars/userId/filename
    // Создаем путь для базы данных, так как физический путь к файлу не совпадает с путем для API
    const avatarUrl = path.normalize(path.join(this.userId, this.fileName)); // userId/filename
    // Сохраняем новый путь к файлу
    await users.updateAvatar(this.userId, avatarUrl);
    return avatarUrl;
  }
}

export default LocalStorage;
