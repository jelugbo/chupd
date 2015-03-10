
var group = require('../models/group').group


var nodemailer = require('nodemailer');
var cc = require('coupon-code');
      
exports.index = function(req, res) {
  group.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { groups: docs });
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
      
  var group_Name = req.body.groupName; // First name of user.
  var group_Head = req.body.groupHead;
  var group_Email_Address = req.body.groupEmailAddress; 
  var group_Contact = req.body.groupContact;
  var group_Location = req.body.groupLocation;

    // Start

            group.findOne({ groupEmailAddress: { $regex: new RegExp(group_Email_Address, "i") } },
            function(err, doc) { // Using RegEx - search is case insensitive
                if(!err && !doc) {
                  
                  var newgroup = new group();
                  
                  newgroup.groupHead = group_Head;
                  newgroup.groupName = group_Name;
                  newgroup.groupEmailAddress = group_Email_Address;
                  newgroup.groupContact = group_Contact;
                  newgroup.groupLocation = group_Location;


                  newgroup.save(function(err) {
                   
                    if(!err) {
                      res.json(201, {message: "group created with email_address: " + newgroup.email_address });
                      // sendMail(user_email_address , user_first_name , verificationCode);

                    } else {
                      res.json(500, {message: "Could not create group. Error: " + err});
                    }
                  
                  });

     
                } else if(!err) {
                  
                  // User is trying to create a user with a name that
                  // already exists.
                  res.json(403, {message: "group with that email address already exists, please update instead of create or create a new group with a different email address."});
               
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
  group.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "group removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find group."});
    } else {
      res.json(403, {message: "Could not delete group. " + err});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.body.goupId;

  var group_Name = req.body.groupName; // First name of user.
  var group_Head = req.body.groupHead;
  var group_Email_Address = req.body.groupEmailAddress; 
  var group_Contact = req.body.groupContact;
  var group_Location = req.body.groupLocation;


      
  group.findById(id, function(err, doc) {
      if(!err && doc) {

        doc.groupName = group_Name;
        doc.groupHead = group_Head;
        doc.groupEmailAddress = group_Email_Address;
        doc.groupContact = group_Contact;
        doc.groupLocation = group_Location;
        
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "group updated: " +
group_Name});
          } else {
            res.json(500, {message: "Could not update group. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find group."});
      } else {
        res.json(500, { message: "Could not update group. " +
err});
      }
    });
}


