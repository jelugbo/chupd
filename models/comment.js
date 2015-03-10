var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var commentSchema = new Schema({
   
    time : { type: Date, required: true, default:Date.now,
index: { unique: true } }
	, firstname : { type: String, required: true }
  , lastname : { type: String, required: true }
  , phonenumber : { type: String, required: false }
  , email : { type: String, required: true }
  , comment : { type: String, required: true }
  , commentStatus : {type: String, required:true , default: "pendding"}
  
});
      
var comment = mongoose.model('comment', commentSchema);
      
module.exports = {
  comment: comment
};