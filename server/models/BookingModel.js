const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    year: {
      type: Number,
      required: true
    },
    from: {
      day: Number,
      month: Number,
      year: Number
    },
    to: {
      day: Number,
      month: Number,
      year: Number
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