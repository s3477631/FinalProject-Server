const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const RawSchema = new Schema({ 
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
        required: true
    },
    employeename: { 
        type: String, 
        required: true
    }, 
    floaters: { 
        type: Number, 
        required: true
    }
})

module.exports = RawSchema
