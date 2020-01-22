const mongoose = require ("mongoose")

const transformedSchema = new mongoose.Schema({ 
    breakOne: { 
        type: String, 
        required: true,
    },
    breakOneLength: { 
        type: Number, 
        required: true,
    },
    breakTwo: { 
        type: String, 
    },
    breakTwoLength: { 
        type: Number, 
    }, 
    breakThree: { 
        type: String, 
    },
    breakThreeLength: { 
        type: Number, 
    }
})

module.exports = transformedSchema
