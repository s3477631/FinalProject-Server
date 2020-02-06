const mongoose = require ("mongoose")
const Breaks = require('./times_schema')


const Schedule = new mongoose.schema({
    date: {
        type: Object,
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
    breaks: [Breaks],

})

module.exports = Schedule