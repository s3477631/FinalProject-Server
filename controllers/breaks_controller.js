 const TimeSheet = require('../database/models/timesheet_model')
 const parseCsv = require('../helpers/csvHelper')
 const { getShiftLength, getBreaks, getBreakSchedule, convertStartEndTimesToMinutes } = require('../helpers/calculationsHelper')

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
    //console.log(employeeObjectArray)
    console.log(getBreakSchedule(employeeObjectArray))

    employeeObjectArray.map((employeeObject) => {
        // console.log(employeeObject)
        TimeSheet.create(employeeObject)
    })
 
}



module.exports = { 
    create, 
    index, 
    show,
    createFromCsv
}   