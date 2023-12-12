const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: {
      type: [String],
      default: [],
    },
    groups: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = new model("User", userSchema);
export default User;
