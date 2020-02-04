const Papa = require('papaparse')
const { StringDecoder } = require('string_decoder')
const decoder = new StringDecoder('utf8');

function parseCsv(data) {

    // console.log(data)
    const output = Buffer.from(data);
    //parses the data from a data buffer to a string
    let result = decoder.write(output)

    //Papa parse converts the data to json
    let jsonconversion = Papa.parse(result).data
    let employeeObjectArray = []

    //Returns raw CSV data
    employeeObjectArray.push(jsonconversion.map(getDateObjects))

    return employeeObjectArray
}  
 
function getDateObjects(item, index) {

    let startNum = Date.parse(`2020-02-04 ${item[2]}`)
    let endNum = Date.parse(`2020-02-04 ${item[3]}`)
    
    let start = new Date(startNum)
    let end = new Date(endNum)
    
    let job = item[0]
    let name = item[1]

    if (index > 0) {
        return getEmployeeObject(job, name, start, end)
    } 
}

function getEmployeeObject(job, name, start, end) {
    let employee = {
        job: job,
        name: name,
        startTime: start,
        endTime: end,
    }
    console.log(employee)
    return employee
}

module.exports = parseCsv

