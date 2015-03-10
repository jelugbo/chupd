'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var departmentSchema = new Schema({

  departmentName : { type: String, required: true, trim: true,
  index: { unique: true } }
  ,departmentHead : {type:String}
  ,departmentEmailAddress: {type:String, required:true}
  ,departmentContact: {type:String, required:false}
  ,departmentLocation: {type:String, required:false}

  
});
      
var department = mongoose.model('department', departmentSchema);
      
module.exports = {

  department: department
};