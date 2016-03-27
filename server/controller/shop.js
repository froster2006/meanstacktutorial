var mongoose = require('mongoose'),
  Shop = mongoose.model('Shop'),
  ObjectId = mongoose.Types.ObjectId;


exports.create = function (req, res) {
  var newShop = new Shop(req.body);
console.log(req.body);
  newShop.save(function(err) {
    if (err) {
    	console.log(err);
      return res.status(400).json(err);
    }
  });
};

exports.findAll = function (req, res) {

  Shop.find(function(err, shops) {
    if (err) {
      return res.status(400).json(err);
    }
    res.json(shops);
  });
};

exports.findOne = function (req, res) {
  Shop.findById(req.params.id, function(err, shop) {
    if (err) {
      return res.status(400).json(err);
    }
    res.json(shop);
  });
};

exports.update = function (req, res) {
  Shop.findById(req.params.id, function(err, shop) {
    if (err) {
      return res.status(400).json(err);
    }
    shop.name = req.body.name;
    shop.email = req.body.email;
    shop.phone_number = req.body.phone_number;
    shop.address = req.body.address;
   	shop.save(function(err) {
    	if (err) {
      	return res.status(400).json(err);
    	}
  	});

  });
};

exports.delete = function (req, res) {
  Shop.findByIdAndRemove(req.params.id, function(err, shop) {
    if (err) {
      return res.status(400).json(err);
    }
  });
};

