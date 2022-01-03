import mongoose from "mongoose";
import { MIN_AGE, MAX_AGE } from "../lib/constants";

const { Schema, model } = mongoose;

const constactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    age: {
      type: Number,
      min: MIN_AGE,
      max: MAX_AGE,
      default: null,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
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

const Contact = model("contact", constactShema);

export default Contact;
