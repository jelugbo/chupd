'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var channelSchema = new Schema({

  channelName : { type: String, required: true, trim: true
 , index: { unique: true } }
 ,date: {type:Date , required:true}
  ,enabled: {type:Boolean,  required:true, default: true}
  ,channelDescription: {type:String, required:false}
  ,imageURL: {type:String, required:false}
  ,imageName: {type:String, required:false}

  // ,channelContact: {type:String, required:false}

  
});
      
var channel = mongoose.model('channel', channelSchema);
      
module.exports = {

  channel: channel
};