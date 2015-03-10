'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var groupSchema = new Schema({

  groupName : { type: String, required: true, trim: true,
  index: { unique: true } }
  ,groupHead: {type:String}
  ,groupEmailAddress: {type:String, required:true}
  ,groupContact: {type:String, required:false}
  ,groupLocation: {type:String, required:false}


  
});
      
var group = mongoose.model('group', groupSchema);
      
module.exports = {

  group: group
};