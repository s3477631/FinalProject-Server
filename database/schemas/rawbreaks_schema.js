const mongoose = require ("mongoose")
// const BreakSchema = require("./transformedBreaks_schema")

const rawSchema = new mongoose.Schema({ 
    start: { 
        type: Number, 
        required: true
    },
    end: { 
        type: Number, 
        required: true
    },
    date: { 
        type: String, 
        // required: true
    },
    employeename: { 
        type: String, 
        // required: true
    }, 
    floaters: { 
        type: Number, 
        // required: true
    },
    // breaks: [BreakSchema]
})



module.exports =  rawSchema
