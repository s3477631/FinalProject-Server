const express = require('express')
const router = express.Router()
const multer = require('multer')
const BreaksController = require("../controllers/breaks_controller")
const fs = require('fs')

const storage = multer.diskStorage({ 
    destination: function(req, file, cb){ 
        cb(null, './uploads/'); 
    }, 

    filename: function(req, file, cb){ 
        cb(null,new Date().toJSON().slice(0,10)+ ".csv")
    }
})

const upload = multer({storage: storage})
('/home/ghostcoder/Downloads/preview.png')

router.post('/csv', upload.single('csvFile'), function(req, res){     
    fs.readFile(req.file.path, async function(err, data) {
        
        res.writeHead(200, {'Content-Type': 'text/csv'});
        //  console.log(res.write(data))
        BreaksController.createFromCsv(req, res, data)
        res.end()
    }); 
})

module.exports = router