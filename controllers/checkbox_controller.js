const AnalysisSheet = require('../database/models/analysis_model')


async function starttimes(req, res){ 
//sends datetime object back to the client (to be stored in local storage)
//axios post request from client responds with starttime
    let time = Date.now()
    let starttime = new Date(time)
    AnalysisSheet.create({startTapTime: starttime}).then(starttimes => {
        res.send(starttimes)
    }).done()

}

//receives object from client 
//axios post request finds stored start time in the model (by passing in the whole object)
//& then sets the Endtime for the object
async function endtimes(req, res) { 
    let time = Date.now() 
    let endtime = new Date(time)
    let {starttimes} = req.body
    AnalysisSheet.find(starttimes).then(response => console.log(response))

}


module.exports = { 
    starttimes, 
    endtimes
}