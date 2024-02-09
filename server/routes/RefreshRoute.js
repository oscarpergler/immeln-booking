const { Refresh } = require("../controllers/AuthController");
const router = require("express").Router();

router.get('/refresh', Refresh)

module.exports = router;