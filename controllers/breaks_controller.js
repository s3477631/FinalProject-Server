const TimeSheet = require('../database/models/timesheet_model')
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

async function show(req, res){ 
    let querydate = req.body
    let {date} = querydate
    RawModel.find({"date": `${date}`})
        .then(result => res.send(result))
}

async function createFromCsv(req, res, data) {
    let employeeObjectArray = await parseCsv(data)
    employeeObjectArray.map((timevalues) => {
        TimeSheet.create(timevalues)
    })
}

module.exports = { 
    create, 
    index, 
    show,
    make,
    createFromCsv
}   