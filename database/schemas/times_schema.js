const mongoose = require ("mongoose")
// const BreakSchema = require("./transformedBreaks_schema")
const AnalysisSheet = require('./analysis_schema')
const TimeSheet = new mongoose.Schema({ 
    name: { 
        type: String, 
    }, 
    startTime: { 
        type: String, 
    },
    endTime: { 
        type: String, 
    }, 
    duration: {
        type: String, 
    },
    job: {
        type: String, 
    },
    breaks: {
        type: Array,
    },
    analysis: [AnalysisSheet]
})

module.exports =  TimeSheet
