// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('maiduo', ['maiduo_shop','maiduo_order','maiduo_groupbuy']);
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/contactlist');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/shop', function(req,res) {
  console.log('list all shops');
  db.maiduo_shop.find(function(err,docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/shop', function(req,res) {
  console.log("POST: " + req.body);
  db.maiduo_shop.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});
app.get('/shop/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_shop.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.delete('/shop/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_shop.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

/////////////////////////////////////////////////////////////////////////
app.post('/groupbuy', function(req,res) {
  console.log("POST: " + req.body);
  db.maiduo_groupbuy.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.get('/groupbuy', function(req,res) {
  console.log('list all groupbuy');
  db.maiduo_groupbuy.find(function(err,docs) {
    console.log(docs);
    res.json(docs);
  });
})

app.delete('/groupbuy/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_groupbuy.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

/////////////////////////////////////////////////////////////////////////

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log("POST: " + req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
