const mongoose = require("mongoose")
const AnalysisSheet = require("../schemas/analysis_schema")

const AnalysisSheetModel = mongoose.model("analysismodel", AnalysisSheet);

module.exports = AnalysisSheetModel