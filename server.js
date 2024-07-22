// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
// var enforce = require("express-sslify")
var env = process.env.NODE_ENV || 'dev';

require('dotenv').config();
// console.log("mapbox: " + process.env.MapBoxToken);
// console.log("google: " + process.env.GoogleApi);
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT ||3306;
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

console.log("THIS IS ENVIRONMENT"+env)
if(env === "production"){
  console.log("It is not DEV")
  // app.use(enforce.HTTPS({ trustProtoHeader: true }))
}else{
  console.log("IT is DEV")
}


// Routes
// =============================================================


// Static directory
require("./routes/api-routes")(app);
require("./routes/html-routes.js")(app);
app.use('/', express.static(path.join(__dirname, 'public')))

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
