var mongoose = require('mongoose')
var dbPath = 'mongodb://localhost/maiduo'
exports.mongoose = mongoose;

var mongoOptions = { db: { safe: true } };

// Connect to Database
exports.db = mongoose.connect(dbPath, mongoOptions, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + dbPath+ '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + dbPath);
  }
});
