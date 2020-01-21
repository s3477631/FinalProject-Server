const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override")
const app = express();
const cors = cors()


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("combined"));

app.use(require("./routes"));

app.use(express.static("public"));

// cors origin URL - Allow inbound traffic from origin


app.use(require("./middleware/error_handler_middleware"));

module.exports = app;