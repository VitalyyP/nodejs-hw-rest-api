import { HttpCode } from "../../lib/constants";
import users from "../../repository/users";
import { CustomError } from "../../utils/custom-error";

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = await users.findByVerifyToken(verifyToken);

  if (userFromToken) {
    await users.updateVerify(userFromToken.id, true);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { message: "Success" },
    });
  }
  throw new CustomError(HttpCode.BAD_REQUEST, "Invalid token");
};

export default verifyUser;
