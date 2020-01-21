const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);

