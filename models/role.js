var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var roleSchema = new Schema({
   
    email_address : { type: String, required: true, trim: true,
index: { unique: true } }
	, canViewEventList : { type: Boolean,required: false, default: false }
  , canEditEvent : { type: Boolean,required: false, default: false }
  , canDeleteEvent : { type: Boolean,required: false, default: false }
  , canSendInvites : { type: Boolean,required: false, default: false }
  , canBlockUsers : { type: Boolean,required: false, default: false }
  , canDeleteUser : { type: Boolean,required: false, default: false }
  , blocked : {type :Boolean,required: false, default: false}
});
      
var role = mongoose.model('role', roleSchema);
      
module.exports = {
  role: role
};