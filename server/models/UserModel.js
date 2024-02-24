const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  token: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: [true, "Email address already exists"]
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12); // Hashed and salted
});

module.exports = mongoose.model("User", UserSchema);