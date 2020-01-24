const Papa = require('papaparse')

  function parseCsv(files) {
    let result = Papa.parse(files)
    return console.log(result)
}

module.exports = parseCsv