// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var db = require('./server/config/db').db;

var modelsPath = path.join(__dirname, 'server/model');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//routes should be at the last
var routes = require('./server/config/routes');
routes(app);
app.listen(3000);
console.log("Server running on port 3000");
