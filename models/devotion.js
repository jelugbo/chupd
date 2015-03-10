'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var devotionSchema = new Schema({
   
  devotionTitle: {type:String, required:true}
  ,date: {type:Date , required:true}
  ,dayOfWeek: {type:String, required: false}
  ,dateDay: {type:String , required: false }
  ,dateMonth: {type:String , required: false }
  ,dateYear: {type:String , required: false }
  ,devotionContent: {type: String, required:false}

  // ,enquiryContact : {type: String, required:false}
});
      
var devotion = mongoose.model('devotion', devotionSchema);
      
module.exports = {

  devotion: devotion
};