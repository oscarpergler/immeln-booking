const { Signup, Login, Refresh } = require("../controllers/AuthController");
const router = require("express").Router();

router.post('/signup', Signup)
router.post('/login', Login)
router.get('/refresh', Refresh)

module.exports = router;