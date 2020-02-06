const mongoose = require ("mongoose")


const Schedule = new mongoose.Schema({
    date: {
        type: String,
    },
    totalFifteen: {
        type: Number
    },
    totalThirties: {
        type: Number
    },
    totalBreakTime: {
        type: Number
    },
    goalTime: {
        type: Number
    },
    numFloaters: {
        type: Number
    },
    breaks: {
        type: Object
    },
})

module.exports = Schedule