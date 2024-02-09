const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config()
const authRoute = require("./routes/AuthRoute");
const bookingRoute = require("./routes/BookingRoute");
const userRoute = require("./routes/UserRoute");
const refreshRoute = require("./routes/RefreshRoute");
const userVerification = require("./middleware/AuthMiddleWare")
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
const PORT = 3001; 

//https://immeln.vercel.app
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        method: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


// Public route
app.use(authRoute);
app.use(refreshRoute);

// Protected route
app.use(userVerification);
app.use(bookingRoute);
app.use(userRoute);

app.listen(PORT, () => {
    console.log(`SERVER STATUS: RUNNING\nLISTENING ON PORT ${PORT}`);
});
