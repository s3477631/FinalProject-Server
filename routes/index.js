const express = require("express");
const router = express.Router();
const RawUploadController = require("../controllers/breaks_controller");
router.get("/", (req, res) => res.send("Welcome"));

router.post('/upload', RawUploadController.create)

module.exports = router;