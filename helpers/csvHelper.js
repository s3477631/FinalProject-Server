const Papa = require('papaparse')
const { StringDecoder } = require('string_decoder')
const decoder = new StringDecoder('utf8');

function parseCsv(data) {

  // console.log(data)
    const output = Buffer.from(data);
  //parses the data from a data buffer to a string
    let result = decoder.write(output)
//Papa parse converts the data to json
    let endresult = Papa.parse(result)
    let employeeObjectArray = []
//Returns raw CSV data
    employeeObjectArray.push(endresult.data.map(getDateObjects))
    return employeeObjectArray
}  
 
function getDateObjects(item, index) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    let startNum = Date.parse(`${date} ${item[2]}`)
    let endNum = Date.parse(`${date} ${item[3]}`)

    let start = new Date(startNum)
    let end = new Date(endNum)
    if (index > 0) {
        return getEmployeeObject(item, start, end)
    } 
}

function getEmployeeObject(item, start, end) {

    let employee = {
        job: item[0],
        name: item[1],
        startTime: start,
        endTime: end,
    }

    return employee
}

module.exports = parseCsv

