const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res) => {
  try {
    const { accessToken, email, password, username, role,  createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ accessToken, email, password, username, role, createdAt });
    res
      .status(201)
      .json({ success: true, user });
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res) => {
    try {

      const { email, password } = req.body;
      if(!email || !password ){
        return res.sendStatus(401) // Wrong input
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.sendStatus(401) // User doesn't exist
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.sendStatus(401) // Wrong password
      }
 
      const accessToken = jwt.sign(
        {"id": user.id, "email": user.email, "username": user.username, "role": user.role},
        process.env.ACCESSTOKEN_KEY,
        { expiresIn: '10m' }
      );

      const refreshToken = jwt.sign(
        {"id": user.id, "email": user.email, "username": user.username, "role": user.role},
        process.env.ACCESSTOKEN_KEY,
        { expiresIn: '1d' }
      );

      // Store refresh token for cross-reference
      await User.updateOne(user, {token: refreshToken});

      res
        .cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        .status(201)
        .json({ accessToken });

    } catch (error) {
      console.error(error);
    }
}

module.exports.Refresh = async (req, res, next) => {
    // TODO: Implement refresh token functionality
}