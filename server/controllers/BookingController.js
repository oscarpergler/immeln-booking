const Booking = require("../models/BookingModel");

module.exports.bookingsThisYear = async (req, res, next) => {
    const requestedYear = req.body.requestedYear;
    console.log('requested year: ', requestedYear);
    try{
        const bookings = await Booking.find({ year: requestedYear })
        console.log(bookings);
        res.json(bookings);
    }
    catch (error){
        res.status(error)
    }
    next();
}

module.exports.createBooking = async (req, res, next) => {

    /*
    try {
        const { fromObject, toObject, user, note, createdAt, toString } = req.body;
        const existingBooking = await Booking.findOne({ toString });
        if (existingBooking) {
          return res.json({ message: "Booking already exists" });
        }
        const booking = await Booking.create({ 
            fromObject, 
            toObject, 
            user, 
            note, 
            createdAt, 
            toString
        });

        res
          .status(201)
          .json({ success: true, user });

      } catch (error) {
        console.error(error);
      }
      */
}