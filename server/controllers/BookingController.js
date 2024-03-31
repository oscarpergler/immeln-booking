const Booking = require("../models/BookingModel");

module.exports.getBookings = async (req, res, next) => {
    try{
        const bookings = await Booking.find({})
        res.json(bookings);
    }
    catch (error){
        res.status(error)
    }
    next();
}

module.exports.createBookings = async (req, res, next) => {

}