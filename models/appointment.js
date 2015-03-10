var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var appointmentSchema = new Schema({
   
    time : { type: Date, required: true, default:Date.now,
index: { unique: true } }
	, firstname : { type: String, required: true }
  , lastname : { type: String, required: true }
  , phonenumber : { type: String, required: false }
  , email : { type: String, required: true }
  , appointment : { type: String, required: true }
  , bestContactDate : {type:Date}
  , bestContactTime : {type:String} 
  , appointmentStatus : {type: String, required:true , default: "pendding"}
  
});
      
var appointment = mongoose.model('appointment', appointmentSchema);
      
module.exports = {
  appointment: appointment
};