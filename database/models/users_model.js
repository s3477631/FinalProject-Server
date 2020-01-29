const mongoose = require("mongoose");
const UserSchema = require("./../schemas/user_schema");

//Mongo creates a database model based on the schema supplied, this is why this is a callback function
const UserModel = mongoose.model("userschema", UserSchema);

module.exports = UserModel;