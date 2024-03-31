const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    hex: {
      type: String,
      required: true,
    },
    note: String
});

module.exports = mongoose.model("bookings", BookingSchema);