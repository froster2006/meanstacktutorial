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
  //console.log('list all shops');
  db.maiduo_shop.find(function(err,docs) {
    //console.log(docs);
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

app.put('/shop/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
  db.maiduo_shop.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, phone_number: req.body.phone_number, address: req.body.address}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


/////////////////////////////////////////////////////////////////////////
app.post('/groupbuy', function(req,res) {
  console.log("POST: " + req.body);
  db.maiduo_groupbuy.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});


app.get('/groupbuy', function(req,res) {
  //console.log('list all groupbuy');
  db.maiduo_groupbuy.find(function(err,docs) {
    //console.log(docs);
    res.json(docs);
  });
});

app.delete('/groupbuy/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_groupbuy.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/groupbuy/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
  db.maiduo_groupbuy.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {title: req.body.title, description: req.body.description, photoLink: req.body.photoLink, items:req.body.items
    }},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.get('/groupbuy/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_groupbuy.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

/////////////////////////////////////////////////////////////////////////

app.post('/order', function(req,res) {
  console.log("POST: " + req.body);
  db.maiduo_order.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.get('/order', function(req,res) {
  //console.log('list all groupbuy');
  db.maiduo_order.find(function(err,docs) {
    //console.log(docs);
    res.json(docs);
  });
});

app.delete('/order/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_order.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/order/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
  db.maiduo_order.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {title: req.body.title, description: req.body.description, photoLink: req.body.photoLink, items:req.body.items
    }},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.get('/order/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_order.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/orderByGroupId/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_order.findOne({groupId: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});


app.listen(3000);
console.log("Server running on port 3000");
