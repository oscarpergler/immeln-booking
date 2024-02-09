const Booking = require("../models/BookingModel");

module.exports.getAllBookings = async (req, res, next) => {
    try{
        const allBookings = await Booking.find({})
        res.json(allBookings);
    }
    catch (error){
        res.status(error)
    }
    next();
}