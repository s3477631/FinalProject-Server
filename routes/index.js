const express = require("express");
const router = express.Router();
const BreaksController = require("../controllers/breaks_controller");
const multer = require('multer')
const parseCsv = require('../helpers/csvHelper')
const fs = require("fs")
const TimeFormat = require('hh-mm-ss')
const storage = multer.diskStorage({ 
    destination: function(req, file, cb){ 
        cb(null, './uploads/'); 
    }, 
    filename: function(req, file, cb){ 
        cb(null,new Date().toJSON().slice(0,10)+ ".csv")
    }
})


const upload = multer({storage: storage})
//RETURNS ALL RECORDS FROM DATABASE
router.get('/', function(req, res){ 
    BreaksController.index(req,res)
})
//CREATES NEW RAW RECORD:

//currently adds the raw data to the database: start:number, end:number, date:string, employeename:string, floaters:number
router.post('/upload', function(req, res){
    BreaksController.create(req, res)
})

router.post('/today', function(req, res){ 
    BreaksController.show(req, res)
})

router.post('/csvupload', upload.single('csvFile'), function(req, res){     
    fs.readFile(req.file.path, async function(err, data) {
        
        res.writeHead(200, {'Content-Type': 'text/csv'});
        //  console.log(res.write(data))
        // let duration = await parseCsv(data)     
        // return duration
        BreaksController.createFromCsv(req, res, data)
        res.end();
    }); 
})

router.get('/csv', function(req, res){
    BreaksController.createFromCsv(req, res)
})


module.exports = router;