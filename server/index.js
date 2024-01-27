const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config()
const authRoute = require("./routes/AuthRoute");
const mongoose = require("mongoose");
const BookingModel = require("./models/BookingModel");

const MONGO_URL = process.env.MONGO_URL;
const PORT = 3001; 

//https://immeln.vercel.app
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

app.use("/", authRoute);

app.get("/getAllBookings", async (req, res) => {
    try{
        const getAllBookings = await BookingModel.find({})
        res.json(getAllBookings);
    }
    catch{
        res.json();
    }
});

app.listen(PORT, () => {
    console.log(`SERVER STATUS: RUNNING\nLISTENING ON PORT ${PORT}`);
});
