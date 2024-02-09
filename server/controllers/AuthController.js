const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
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
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
 
      const accessToken = jwt.sign(
        {"id": user.id, "email": user.email, "username": user.username, "role": user.role},
        process.env.ACCESSTOKEN_KEY,
        { expiresIn: '10s' } // test value
      );

      const refreshToken = jwt.sign(
        {"id": user.id, "email": user.email, "username": user.username, "role": user.role},
        process.env.ACCESSTOKEN_KEY,
        { expiresIn: '1d' }
      );

      // Store refresh token for cross-reference
      await User.updateOne(user, {token: refreshToken});

      // Both AT and RT needs to be reachable to the frontend in order to authorize and refresh auth
      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
      res.status(201).json({ success: true, accessToken });
      next()

    } catch (error) {
      console.error(error);
    }
}

module.exports.Refresh = async (req, res, next) => {
    // TODO: Implement refresh token functionality
}