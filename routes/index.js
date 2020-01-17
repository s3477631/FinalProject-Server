const express = require("express");
const router = express.Router();
const BreaksController = require("../controllers/breaks_controller");

//RETURNS ALL RECORDS FROM DATABASE
router.get('/', function(req, res){ 
    BreaksController.index()
})




//CREATES NEW RAW RECORD:

//currently adds the raw data to the database: start:number, end:number, date:string, employeename:string, floaters:number
router.post('/upload', function(req, res){
    BreaksController.create(req, res)
})


module.exports = router;