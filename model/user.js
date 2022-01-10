import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { SUBSCRIPTIONS } from "../lib/constants";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Guest",
    },
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).trim().toLocaleLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      // minLength: 8, // TODO
    },
    subscription: {
      type: String,
      enum: {
        values: Object.values(SUBSCRIPTIONS),
        message: "Subscription is not allowed",
      },
      default: SUBSCRIPTIONS.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(6);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

const User = model("user", userSchema);

export default User;
