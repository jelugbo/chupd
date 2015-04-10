'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var AllowSourceSchema = new Schema();
AllowSourceSchema.add({
	sourceID: {type:String }
	,sourceName: {type:String}
	,sourcePermission: {type:Boolean , required:true , default:true}
});
      
var devicesSchema = new Schema({
  deviceID : { type: String, required: true, trim: true,
  index: { unique: true } }
  ,deviceType: {type:String,required: true}
 ,date_created : { type: Date, required: true, default: Date.now}
 ,allowSource : [AllowSourceSchema]
});

// var AllowSource = mongoose.model('allowSource', AllowSourceSchema); 

var devices = mongoose.model('devices', devicesSchema);
      

// module.exports = {

//   AllowSource: AllowSource
// };

exports.allowSource = mongoose.model('allowSource',AllowSourceSchema);

module.exports = {

  devices: devices
};