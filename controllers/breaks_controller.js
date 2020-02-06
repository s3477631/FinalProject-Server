const TimeSheet = require('../database/models/timesheet_model')
const parseCsv = require('../helpers/csvHelper')
const { getShiftLength, getBreaks, getBreakSchedule, getFloaterCount, getFifteens, getThirties } = require('../helpers/calculationsHelper')

async function index(req, res){ 
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

    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            employeeObject.duration = getShiftLength(employeeObject)
        }
    })

    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            employeeObject.breaks = getBreaks(employeeObject.duration)
        }
    })

    


    date = Date.now()
    dateObject = Date.parse(date)
    let fifteens = getFifteens(employeeObjectArray)
    console.log(fifteens)
    // let thirties = getThirties(employeeObjectArray)
    let floaters = getFloaterCount(employeeObjectArray)
    let breaks = getBreakSchedule(employeeObjectArray)

    finalObject = {
        date: dateObject,
        totalFifteen: fifteens,
        totalThirties: thirties,
        totalBreakTime: "",
        goalTime: "",
        numFloaters: floaters,
        breaks: breaks,
    }
    employeeObjectArray.map((employeeObject) => {
        TimeSheet.create(employeeObject)
    })
}

module.exports = { 
    create, 
    index, 
    show,
    createFromCsv
}   