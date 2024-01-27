const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        unique: true
    },
    to: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, "Your email address is required"]
    },
});

module.exports = mongoose.model("bookings", BookingSchema);