 const RawModel = require('../database/models/rawbreaks_model')
 const parseCsv = require('../helpers/csvHelper')


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
    RawModel.create(rawdatabreak).then(rawdatabreak => {
        res.send("Created") 
    }).catch(err => res.status(500).send(err))
   
}

async function make(startend){ 
    // let transformed = new Map(parseCsv)
        console.log(startend)

//    RawModel.create()
}


async function show(req, res){ 
    let querydate = req.body
    let {date} = querydate
    RawModel.find({"date": `${date}`})
    .then(result => res.send(result))
}

async function createFromCsv(req, res) {
    let result = parseCsv()

    let indexCount = 1
    
    let job = result.data[indexCount][0].trim()
    let employeename = result.data[indexCount][1].trim()
    let start = result.data[indexCount][2].trim()
    let end = result.data[indexCount][3].trim()
    let floaters = 0


    let rawdata = { job, employeename, start, end,  floaters }
    
    await RawModel.create(rawdata)
        .then(rawdata => console.log(rawdata))
        .catch(err => res.status(500).send(err))

    res.send(rawdata)
}




module.exports = { 
    create, 
    index, 
    show,
    make,
    createFromCsv
}   