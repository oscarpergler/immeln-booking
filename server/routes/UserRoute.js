const { getAllUsers } = require("../controllers/UserController");
const router = require("express").Router();

router.route('/users')
    .get(getAllUsers)

module.exports = router;