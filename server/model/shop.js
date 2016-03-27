'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ShopSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
});


mongoose.model('Shop', ShopSchema);
