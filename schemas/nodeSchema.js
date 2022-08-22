const mongoose = require('mongoose')

var nodeSchema = new mongoose.Schema({

  ip : String,
  nanoAddress: String,
  country: String,

    coordinates:[{
      long : Number,
      lat : Number,
    }],
    XYZcoordinates:[{
      x : Number,
      y : Number,
      z : Number
    }]

    });

module.exports = mongoose.model('Nodes', nodeSchema)
