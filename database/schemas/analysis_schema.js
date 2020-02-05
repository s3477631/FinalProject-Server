const mongoose = require('mongoose')

const AnalysisSheet = new mongoose.Schema({ 
   startTapTime: { 
       type: String, 
   },
   endTapTime: { 
       type: String, 
   }, 
})


module.exports = AnalysisSheet