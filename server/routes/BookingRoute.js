const { getBookings } = require("../controllers/BookingController");
const router = require("express").Router();

router.route('/bookings')
    .post(getBookings)

module.exports = router;