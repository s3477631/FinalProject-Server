const express = require("express");
const router = express.Router();
const AuthRoute = require("./auth")
const TimeRoute = require('./timeroutes')

router.get("/test", (req, res) => {
    res.send(200)
})
router.use("/auth", AuthRoute)
router.use("/upload", TimeRoute)

module.exports = router;