var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var connectSchema = new Schema({
   
    time : { type: Date, required: true, default:Date.now,
index: { unique: true } }
	, firstname : { type: String, required: true }
  , lastname : { type: String, required: true }
  , phonenumber : { type: String, required: false }
  , email : { type: String, required: true }
  , departmentEmail : {type: String, required: true}
  , comment : { type: String, required: true }
  , bestContactDate : {type:Date}
  , bestContactTime : {type:String} 
  , connectStatus : {type: String, required:true , default: "pendding"}
  
});
      
var connect = mongoose.model('connect', connectSchema);
      
module.exports = {
  connect: connect
};