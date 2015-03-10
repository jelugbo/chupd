'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var mediaSchema = new Schema({
   
  mediaTitle: {type:String, required:true}
  ,mediaChannel: {type:String, required:true}
  ,date: {type:Date , required:true}
  ,imageURl: {type:String , required: false }
  ,imageName:{type:String , required: false }
  ,androidVideoURL: {type:String, required:false}
  ,iosVideoURL: {type:String, required:false}
  ,windowsVideoURL: {type:String, required:false}
  ,description: {type: String, required:false}
  // ,enquiryContact : {type: String, required:false}
});
      
var media = mongoose.model('media', mediaSchema);
      
module.exports = {

  media: media
};