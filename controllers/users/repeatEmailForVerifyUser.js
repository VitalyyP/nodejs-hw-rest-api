import { HttpCode } from "../../lib/constants";
import users from "../../repository/users";
import { EmailService, SenderSendgrid } from "../../service/email";
import { CustomError } from "../../utils/custom-error";

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  const user = await users.findByEmail(email);
  if (user) {
    const { email, name, verifyTokenEmail } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendgrid()
    );

    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verifyTokenEmail
    );

    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: "Success",
        code: HttpCode.OK,
        data: { message: "Success" },
      });
    }
    throw new CustomError(HttpCode.SERVICE_UNAVAILABLE, "Service Unavailable");
  }

  throw new CustomError(HttpCode.NOT_FOUND, "User with this email not found");
};

export default repeatEmailForVerifyUser;
