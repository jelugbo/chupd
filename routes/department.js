
var department = require('../models/department').department


var nodemailer = require('nodemailer');
var cc = require('coupon-code');
      
exports.index = function(req, res) {
  department.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { departments: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}

// Email Handler
     var sendMail= function(emailAddress ,username ,verificationCode) {

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'no.reply.harrisconsult@gmail.com',
                pass: 'hconsult120'
            }
        });

        var mailContent = {
            from: 'no.reply.harrisconsult@gmail.com',
            to: emailAddress,
            subject: 'Email Verification',
            text: 'Your Email has been successfully been created',
            html: 'Hello ' + username + ' , <br/> your Verification code is <strong>'+ verificationCode +'</strong>.'
        };

        transporter.sendMail( mailContent, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });

      };

    var sendMail_resetCode= function(emailAddress ,username ,resetCode) {

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'no.reply.harrisconsult@gmail.com',
                pass: 'hconsult120'
            }
        });

        var mailContent = {
            from: 'no.reply.harrisconsult@gmail.com',
            to: emailAddress,
            subject: 'password Reset Code',
            text: 'Your password reset code',
            html: 'Hello ' + username + ' , <br/> The code to reset your password is <strong>'+ resetCode +'</strong>.'
        };

        transporter.sendMail( mailContent, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });

      };


exports.create = function(req, res) {
      
  var department_Name = req.body.departmentName; // First name of user.
  var department_Head = req.body.departmentHead; // First name of user.
  var department_Email_Address = req.body.departmrntEmailAddress; 
  var department_Contact = req.body.departmentContact;
  var department_Location = req.body.department_Location;

    // Start

            department.findOne({ departmentEmailAddress: { $regex: new RegExp(department_Email_Address, "i") } },
            function(err, doc) { // Using RegEx - search is case insensitive
                if(!err && !doc) {
                  
                  var newDepartment = new department();
                  
                  newDepartment.departmentName = department_Name;
                  newDepartment.departmentHead = department_Head;
                  newDepartment.departmentEmailAddress = department_Email_Address;
                  newDepartment.departmentContact = department_Contact;
                  newDepartment.departmentLocation = department_Location;


                  newDepartment.save(function(err) {
                   
                    if(!err) {
                      res.json(201, {message: "department created with email_address: " + newDepartment.email_address });
                      // sendMail(user_email_address , user_first_name , verificationCode);

                    } else {
                      res.json(500, {message: "Could not create department. Error: " + err});
                    }
                  
                  });

     
                } else if(!err) {
                  
                  // User is trying to create a user with a name that
                  // already exists.
                  res.json(403, {message: "department with that email address already exists, please update instead of create or create a new department with a different email address."});
               
                } else {
                  res.json(500, { message: err});
                }
              });

    // Ends
      
}



exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the user the user you want to look up.
  user.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading user." + err});
    } else {
      res.json(404, { message: "user not found."});
    }
  });
}


exports.userByEmail = function(req, res) {
  
  var user_email_address = req.params.emailAddress; // The id of the user the user you want to look up.
  user.findOne({email_address: user_email_address}, function(err, doc) {
    if(!err && doc) {

      var newuser = new user();
      
      newuser.first_name = doc.first_name;
      newuser.last_name = doc.last_name;
      newuser.email_address = doc.email_address;

      res.json(200, newuser);

    } else if(err) {
      res.json(500, { message: "Error loading user." + err});
    } else {
      res.json(404, { message: "user not found."});
    }
  });
}


exports.delete = function(req, res) {
      
  var id = req.body.id;
  department.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "department removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find department."});
    } else {
      res.json(403, {message: "Could not delete department. " + err});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.body.departmentId;

  var department_Name = req.body.departmentName; // First name of user.
  var department_Head = req.body.departmentHead;
  var department_Email_Address = req.body.departmrntEmailAddress; 
  var department_Contact = req.body.departmentContact;
  var department_Location = req.body.departmentLocation;
      
  department.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.departmentHead = department_Head
        doc.departmentName = department_Name;
        doc.departmentEmailAddress = department_Email_Address;
        doc.departmentContact = department_Contact;
        doc.departmentLocation = department_Location;
        
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "department updated: " +
department_Name});
          } else {
            res.json(500, {message: "Could not update department. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find department."});
      } else {
        res.json(500, { message: "Could not update department. " +
err});
      }
    });
}


