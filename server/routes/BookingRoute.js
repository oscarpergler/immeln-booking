const { getAllBookings } = require("../controllers/BookingController");
const router = require("express").Router();

router.route('/bookings')
    .get(getAllBookings)

module.exports = router;