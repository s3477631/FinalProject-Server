const mongoose = require("mongoose");
const TimeSheet = require("../schemas/times_schema");

//Mongo creates a database model based on the schema supplied, this is why this is a callback function
const TimeSheetModel = mongoose.model("timesheet", TimeSheet);

module.exports = TimeSheetModel

