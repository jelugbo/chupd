
var cellgroup = require('../models/cellgroup').cellgroup


var nodemailer = require('nodemailer');
var cc = require('coupon-code');
      
exports.index = function(req, res) {
  cellgroup.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { cellgroups: docs });
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
      
  var cellgroup_Name = req.body.cellgroupName; // First name of user.
  var cellgroup_Head = req.body.cellgroupHead;
  var cellgroup_Email_Address = req.body.cellgroupEmailAddress; 
  var cellgroup_Contact = req.body.cellgroupContact;
  var cellgroup_Location =req.body.cellgroupLocation;

    // Start

            cellgroup.findOne({ cellgroupEmailAddress: { $regex: new RegExp(cellgroup_Email_Address, "i") } },
            function(err, doc) { // Using RegEx - search is case insensitive
                if(!err && !doc) {
                  
                  var newcellgroup = new cellgroup();
                  
                  newcellgroup.cellgroupName = cellgroup_Name;
                  newcellgroup.cellgroupHead = cellgroup_Head;
                  newcellgroup.cellgroupEmailAddress = cellgroup_Email_Address;
                  newcellgroup.cellgroupContact = cellgroup_Contact;
                  newcellgroup.cellgroupLocation = cellgroup_Location;


                  newcellgroup.save(function(err) {
                   
                    if(!err) {
                      res.json(201, {message: "cellgroup created with email_address: " + newcellgroup.email_address });
                      // sendMail(user_email_address , user_first_name , verificationCode);

                    } else {
                      res.json(500, {message: "Could not create cellgroup. Error: " + err});
                    }
                  
                  });

     
                } else if(!err) {
                  
                  // User is trying to create a user with a name that
                  // already exists.
                  res.json(403, {message: "cellgroup with that email address already exists, please update instead of create or create a new cellgroup with a different email address."});
               
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
  cellgroup.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "cellgroup removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find cellgroup."});
    } else {
      res.json(403, {message: "Could not delete cellgroup. " + err});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.body.cellgroupId;

  var cellgroup_Name = req.body.cellgroupName; // First name of user.
  var cellgroup_Head = req.body.cellgroupHead;
  var cellgroup_Email_Address = req.body.cellgroupEmailAddress; 
  var cellgroup_Contact = req.body.cellgroupContact;
  var cellgroup_Location = req.body.cellgroupLocation;
  
    

    console.log(cellgroup_Name);
    console.log(cellgroup_Head);
    console.log(cellgroup_Email_Address);
    console.log(cellgroup_Contact);
    console.log(cellgroup_Location);





  cellgroup.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.cellgroupName = cellgroup_Name;
        doc.cellgroupHead = cellgroup_Head;
        doc.cellgroupEmailAddress = cellgroup_Email_Address;
        doc.cellgroupContact = cellgroup_Contact;
        doc.cellgroupLocation = cellgroup_Location;
        
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "cellgroup updated: " +
cellgroup_Name});
          } else {
            res.json(500, {message: "Could not update cellgroup. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find cellgroup."});
      } else {
        res.json(500, { message: "Could not update cellgroup. " +
err});
      }
    });
}


