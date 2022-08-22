const mongoose = require('mongoose')

var projectSchema = new mongoose.Schema({

  name : String,
  nanoAddress: String,
  representative: String,
  description: String,
  totalDonated : String,
  logoURL: String,
  sourceURL: String

    });

module.exports = mongoose.model('Projects', projectSchema)
