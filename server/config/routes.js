var mongojs = require('mongojs');
var db = mongojs('maiduo', ['maiduo_shop','maiduo_order','maiduo_groupbuy']);

module.exports = function(app) {

//shop routes
var shop = require('../controller/shop');
app.get('/shop', shop.findAll); 
app.post('/shop', shop.create);
app.get('/shop/:id', shop.findOne);
app.delete('/shop/:id', shop.delete);
app.put('/shop/:id', shop.update);


/////////////////////////////////////////////////////////////////////////
app.post('/groupbuy', function(req,res) {
  //console.log("POST: " + req.body);
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
  db.maiduo_groupbuy.findAndModify({
        query: {_id: mongojs.ObjectId(req.body._id)},
        update: {$set: {title: req.body.title, description: req.body.description, photoLink: req.body.photoLink, items:req.body.items, batchId:req.body.batchId}},
        new: true}, function (err, doc) {res.json(doc);
  });
});


app.put('/togglegroupbuy/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body);
  db.maiduo_groupbuy.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {status: req.body.status}},
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
    console.log(req.body);
  console.log("POST: " + req.body);
  db.maiduo_order.insert(req.body, function(err, doc) {
    console.log(doc);
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
    update: {$set: {name: req.body.name, email: req.body.email, phone_number: req.body.phone_number, notes:req.body.notes,items: req.body.items, batchId:req.body.batchId
    }},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.put('/pickuporder/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
  db.maiduo_order.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {pickedup: true}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.put('/unpickuporder/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
  db.maiduo_order.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {pickedup: false}},
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

app.get('/orderByGroupbuyId/:id', function (req, res) {
  var id = req.params.id;
  db.maiduo_order.find({groupbuyId: id}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/distinctBatchId/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.maiduo_order.distinct('batchId',{groupbuyId: id}, function (err, list) {
    res.json(list);
  });
});

app.get('/orderBybatchId/:gid/:bid', function (req, res) {
  var gid = req.params.gid;
  var bid = req.params.bid;
  console.log(gid);
  console.log(bid);
  db.maiduo_order.find({groupbuyId: gid, batchId:bid}, function (err, doc) {
    res.json(doc);
  });
});
}