const express = require("express");
const router = express.Router();
const AuthRoute = require("./auth")
const TimeRoute = require('./timeroutes')

router.use("/auth", AuthRoute)
router.use("/upload", TimeRoute)

module.exports = router;