'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var newsSchema = new Schema({
   
  newsTitle: {type:String, required:true}
  ,date: {type:Date , required:true}
  ,imageURl: {type:String , required: false }
  ,imageName:{type:String , required: false }
  ,videoURL: {type:String, required:false}
  ,description1: {type: String, required:false}
  ,description2: {type: String, required:false}
  ,description3: {type: String, required:false}
  // ,enquiryContact : {type: String, required:false}
});
      
var news = mongoose.model('news', newsSchema);
      
module.exports = {

  news: news
};