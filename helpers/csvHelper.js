const Papa = require('papaparse')
const CSV = require('../database/csvExamples/example.csv')

function parseCsv() {
    result = Papa.parse(`Job,CoWorker,Shift Start,Shift End
    R4,Coworker 1,8:30 AM,4:30 PM
    E3,Coworker 2,9:15 AM,5:45 PM
    R5,Coworker 3,10:00 AM,3:00 PM
    F,Coworker 4,9:30 AM,4:00 PM
    R4,Coworker 5,10:00 AM,5:45 PM
    R6,Coworker 6,11:00 AM,5:15 PM
    PM F,Coworker 7,2:30 PM,9:30 PM
    E3,Coworker 8,1:30 PM,9:15 PM
    R5,Coworker 9,5:30 PM,9:30 PM
    E4,Coworker 10,5:30 PM,10:30 PM`)
    return result
}

module.exports = parseCsv