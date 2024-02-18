const { bookingsThisYear } = require("../controllers/BookingController");
const router = require("express").Router();

router.route('/bookings')
    .post(bookingsThisYear)

module.exports = router;