const express = require("express");
const router = express.Router();
const AuthRoute = require("./auth")
const TimeRoute = require('./timeroutes')
const CheckedRoute = require('./checked')

//use thi route for all authentication features
router.use("/auth", AuthRoute)

//this route is used for all schedulingCalculation features
router.use("/upload", TimeRoute)

//this is the route for the frontend checkboxes
router.use("/checked", CheckedRoute)

module.exports = router;