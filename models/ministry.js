'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var ministrySchema = new Schema({

  ministryName : { type: String, required: true, trim: true,
  index: { unique: true } }
  ,ministryHead: {type: String}
  ,ministryEmailAddress: {type:String, required:true}
  ,ministryContact: {type:String, required:false}
  ,ministryLocation: {type:String, required:false}
  
});
      
var ministry = mongoose.model('ministry', ministrySchema);
      
module.exports = {

  ministry: ministry
};