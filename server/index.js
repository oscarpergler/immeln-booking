const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config()
const authRoute = require("./routes/AuthRoute");
const bookingRoute = require("./routes/BookingRoute");
const userRoute = require("./routes/UserRoute");
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
const PORT = 3001; 

//https://immeln.vercel.app
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
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


// Map all routes
app.use(authRoute);
app.use(bookingRoute);
app.use(userRoute);

app.listen(PORT, () => {
    console.log(`SERVER STATUS: RUNNING\nLISTENING ON PORT ${PORT}`);
});
