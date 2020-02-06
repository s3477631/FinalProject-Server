const mongoose = require("mongoose");
const Schedule = require("../schemas/schedule_schema");

//Mongo creates a database model based on the schema supplied, this is why this is a callback function
const ScheduleModel = mongoose.model("schedule", Schedule);

module.exports = ScheduleModel