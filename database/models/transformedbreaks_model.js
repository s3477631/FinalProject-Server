const mongoose = require("mongoose");
const TransformedBreakSchema = require("./../schemas/transformedBreaks_schema");

//Mongo creates a database model based on the schema supplied, this is why this is a callback function
const TransformedBreaksModel = mongoose.model("transformedbreaks", TransformedBreakSchema);

module.exports = TransformedBreaksModel;