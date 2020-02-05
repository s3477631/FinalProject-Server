const express = require("express");
const router = express.Router();
const AuthRoute = require("./auth")
const TimeRoute = require('./timeroutes')
const CheckedRoute = require('./checked')

router.use("/auth", AuthRoute)
router.use("/upload", TimeRoute)
router.use("/checked", CheckedRoute)

module.exports = router;