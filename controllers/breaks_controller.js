const TimeSheet = require('../database/models/timesheet_model')
const ScheduleSheet = require('../database/models/schedule_model')
const parseCsv = require('../helpers/csvHelper')
const { getShiftLength, getFloaterNumber, getTotalBreakTime, getBreaks, getBreakSchedule,  getFifteens, getThirties, convertStartEndTimesToMinutes, } = require('../helpers/calculationsHelper')

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

    convertStartEndTimesToMinutes(employeeObjectArray)

    employeeObjectArray.map((employeeObject, index) => {
        if (index > 0) {
            employeeObject.breaks = getBreaks(employeeObject)
        }
    })


    	
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let fifteens = getFifteens(employeeObjectArray)
    let thirties = getThirties(employeeObjectArray)
    let totalBreakTime = getTotalBreakTime(employeeObjectArray)
    let floaters = getFloaterNumber(employeeObjectArray)
    let breaks = getBreakSchedule(employeeObjectArray)

    finalObject = {
        date: date,
        totalFifteen: fifteens,
        totalThirties: thirties,
        totalBreakTime: totalBreakTime,
        goalTime: 960,
        numFloaters: floaters,
        breaks: breaks,
    }

    ScheduleSheet.create(finalObject)


    employeeObjectArray.map((employeeObject) => {
        TimeSheet.create(employeeObject)
    })
    res.send(finalObject)
}



module.exports = { 
    create, 
    index, 
    show,
    createFromCsv
}   