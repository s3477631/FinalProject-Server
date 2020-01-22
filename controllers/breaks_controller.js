 const RawModel = require('../database/models/rawbreaks_model')

 async function index(req, res){ 
     console.log(res)
     RawModel.find()
     .then(rawdatas => res.send(rawdatas))
 }

async function create(req,  res){ 
    //destructures the request
    let { start, end, date, employeename, floaters} = req.body;
    let rawdatabreak = { start, end, date, employeename, floaters}

    //Rawmodel is created by mongodb through a callback function in rawbreaks_model.js (its based off the schema defined in rawbreaks_schema)
    RawModel.create(rawdatabreak).then(rawdatabreak => console.log(rawdatabreak)).catch(err => res.status(500).send(err))
    res.send("Created")
}

async function show(req, res){ 
    RawModel.find({"date": `${req.body.date}`})
    .then(outputs => res.send(outputs))
}



module.exports = { 
    create, 
    index, 
    show
}   