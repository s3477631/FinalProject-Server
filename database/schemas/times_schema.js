const mongoose = require ("mongoose")
// const BreakSchema = require("./transformedBreaks_schema")

const TimeSheet = new mongoose.Schema({ 
    employee: { 
        type: String, 
        required: true
    }, 
    startTime: { 
        type: String, 
        required: true
    },
    endTime: { 
        type: String, 
        required: true
    }, 
    duration: {
        type: Number, 
        required: true
    },
    floater: {
        type: Number, 
        required: true
    },
    breakNum: {
        type: Number, 
        required: true
    }
})



module.exports =  TimeSheet
