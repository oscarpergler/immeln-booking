const jwt = require("jsonwebtoken");
require("dotenv").config();

const userVerification = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.sendStatus(401);
  const token = header.split(' ')[1] // Since the header will contain: "Bearer [actual token value]"
  jwt.verify(
    token, 
    process.env.ACCESSTOKEN_KEY, 
    async (err, data) => {
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
