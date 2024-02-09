const jwt = require("jsonwebtoken");
require("dotenv").config();

const userVerification = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(' ')[1] // Since the header will contain: "Bearer <token>"
  jwt.verify(
    token, 
    process.env.ACCESSTOKEN_KEY, 
    (err, data) => {
      if (err) {
        return res.sendStatus(403); // invalid token
      } else {
        req.user = data.username;
        next();
      }
    }
  )
}

module.exports = userVerification;
