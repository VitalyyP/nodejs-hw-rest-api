import Joi from "joi";

const createSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const authValidation = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};
