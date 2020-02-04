const { Schema } = require("mongoose")
const TimeSheet = require("./times_schema")

const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({ 
    breaks: [TimeSheet]
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email'})

module.exports = UserSchema