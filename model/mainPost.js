const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  dimension: {
    type: String,
    require: true
  },
  battery: {
    type: String,
    default: ""
  },
  sim: {
    type: String,
    require: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bestcategories',
    required: true
  },
  ram: {
    type: String,
    require: true
  },
  sensor: {
    type: String,
    require: true
  },
  resolution: {
    type: String,
    require: true
  },
  discount: {
    type: String,
    default: ""
  },  
  camera: {
    type: String,
    default: ""
  },  
  picture: {
    type: String,
    default: ""
  },
  picturesec: {
    type: String,
    default: ""
  },
  price: {
    type: String,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },

  views: {
    type: Number,
    default: 0
  },

 
});



module.exports = mongoose.model("Product", ProductsSchema);
