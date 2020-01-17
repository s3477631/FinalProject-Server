const mongoose = require("mongoose");
const RawBreaksSchema = require("./../schemas/rawbreaks_schema");

//Mongo creates a database model based on the schema supplied, this is why this is a callback function
const RawBreaksModel = mongoose.model("rawbreaks", RawBreaksSchema);

module.exports = RawBreaksModel;