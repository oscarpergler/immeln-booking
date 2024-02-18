const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    year: Number,
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
    username: {
        type: String,
        required: true
    },
    hex: {
        type: String,
        required: true,
    },
    note: String
}, {
    // Methods to get the full string values without having to persist them in th DB
    virtuals: {
      fromDateString: {
        get() {
          return [this.from.date, this.from.month, this.from.year].join(' ');
        }
      },
      toDateStrong: {
        get() {
          return [this.to.date, this.to.month, this.to.year].join(' ');
        }
      },
    }
});

module.exports = mongoose.model("bookings", BookingSchema);