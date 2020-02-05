const express = require("express")
const router = express.Router()
const checkboxcontroller = require('../controllers/checkbox_controller') 

router.post('/start', function(req, res){
    checkboxcontroller.starttimes(req, res)
})

router.post('/end', function(req, res){ 
    checkboxcontroller.endtimes(req, res)
})


module.exports = router