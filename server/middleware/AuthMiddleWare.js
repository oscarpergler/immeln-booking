const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authRefresh = async (dataID)  => {
  const user = await User.findById(dataID)
  jwt.verify(user.token, process.env.REFRESHTOKEN_KEY, async (err, data) => {
    if (err){ // Refresh token has expired => user needs to re-authorize
      return false;
    } else{ // Refresh token is valid => refresh access token
      res.cookie("token", generateAccessToken(user), {
        withCredentials: true,
        httpOnly: true,
      });
      return true;
    }
  })
}

const generateAccessToken = (user) => {
  jwt.sign(
    {"id": user.id, "email": user.email, "username": user.username, "role": user.role},
    process.env.ACCESSTOKEN_KEY,
    { expiresIn: '10m' }
  )
} 

// https://youtu.be/favjC6EKFgw?si=6Nm9_ePs45ybscc_&t=1156

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.ACCESSTOKEN_KEY, async (err, data) => {
    if (err) {
      if (data){
        if (authRefresh(data.id)){
          return res.json({ status: true, user: data.username })
        }
      } 
      return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}