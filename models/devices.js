'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var devicesSchema = new Schema({

  deviceID : { type: String, required: true, trim: true,
  index: { unique: true } }
  ,deviceType: {type:String,required: true}
 ,date_created : { type: Date, required: true, default: Date.now}


  
});
      
var devices = mongoose.model('devices', devicesSchema);
      
module.exports = {

  devices: devices
};