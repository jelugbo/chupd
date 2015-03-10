
var ministry = require('../models/ministry').ministry


var nodemailer = require('nodemailer');
var cc = require('coupon-code');
      
exports.index = function(req, res) {
  ministry.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { ministries: docs });
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
      
  var ministry_Name = req.body.ministryName; // First name of user.
  var ministry_Head= req.body.ministryHead;
  var ministry_Email_Address = req.body.ministryEmailAddress; 
  var ministry_Contact = req.body.ministryContact;
  var ministry_Location = req.body.ministryLocation;

    // Start

            ministry.findOne({ ministryEmailAddress: { $regex: new RegExp(ministry_Email_Address, "i") } },
            function(err, doc) { // Using RegEx - search is case insensitive
                if(!err && !doc) {
                  
                  var newministry = new ministry();
                  
                  newministry.ministryHead= ministry_Head;
                  newministry.ministryName = ministry_Name;
                  newministry.ministryEmailAddress = ministry_Email_Address;
                  newministry.ministryContact = ministry_Contact;
                  newministry.ministryLocation = ministry_Location;



                  newministry.save(function(err) {
                   
                    if(!err) {
                      res.json(201, {message: "ministry created with email_address: " + newministry.email_address });
                      // sendMail(user_email_address , user_first_name , verificationCode);

                    } else {
                      res.json(500, {message: "Could not create ministry. Error: " + err});
                    }
                  
                  });

     
                } else if(!err) {
                  
                  // User is trying to create a user with a name that
                  // already exists.
                  res.json(403, {message: "ministry with that email address already exists, please update instead of create or create a new ministry with a different email address."});
               
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
  ministry.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      console.log ("Deleted");
      res.json(200, { message: "ministry removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find ministry."});
    } else {
      res.json(403, {message: "Could not delete ministry. " + err});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.body.ministryId;

  var ministry_Name = req.body.ministryName; // First name of user.
  var ministry_Head= req.body.ministryHead;
  var ministry_Email_Address = req.body.ministryEmailAddress; 
  var ministry_Contact = req.body.ministryContact;
  var ministry_Location = req.body.ministryLocation;
      
  ministry.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.ministryName = ministry_Name;
        doc.ministryHead = ministry_Head;
        doc.ministryEmailAddress = ministry_Email_Address;
        doc.ministryContact = ministry_Contact;
        doc.ministryLocation = ministry_Location;    
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "ministry updated: " +
ministry_Name});
          } else {
            res.json(500, {message: "Could not update ministry. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find ministry."});
      } else {
        res.json(500, { message: "Could not update ministry. " +
err});
      }
    });
}


