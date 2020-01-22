const mongoose = require ("mongoose")
const BreakSchema = require("./transformedBreaks_schema")

const rawSchema = new mongoose.Schema({ 
    job: { 
        type: String, 
        required: true
    },
    employeename: { 
        type: String, 
        required: true
    }, 
    start: { 
        // string is temp, will change back to number once sorted
        type: String, 
        required: true
    },
    end: { 
        // string is temp, will change back to number once sorted
        type: String, 
        required: true
    },
    floaters: { 
        type: Number, 
    },
    breaks: [BreakSchema]
})



module.exports =  rawSchema
