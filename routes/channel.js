
var channel = require('../models/channel').channel


var nodemailer = require('nodemailer');
var cc = require('coupon-code');
      
exports.index = function(req, res) {
  channel.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { channels: docs });
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
      
  var channel_Name = req.body.channelName; // First name of user.
  var channel_enabled = req.body.channelEnabled;
  var channel_description = req.body.channelDescription;

    // Start

            channel.findOne({ channelName: { $regex: new RegExp(channel_channelName, "i") } },
            function(err, doc) { // Using RegEx - search is case insensitive
                if(!err && !doc) {
                  
                  var newchannel = new channel();
                  
                  newchannel.channelName = channel_Name;
                  newchannel.channelDescription.channel_description;
                  newchannel.enabled = channel_enabled;


                  newchannel.save(function(err) {
                   
                    if(!err) {
                      res.json(201, {message: "channel created " });
                      // sendMail(user_email_address , user_first_name , verificationCode);

                    } else {
                      res.json(500, {message: "Could not create channel. Error: " + err});
                    }
                  
                  });

     
                } else if(!err) {
                  
                  // User is trying to create a user with a name that
                  // already exists.
                  res.json(403, {message: "channel  already exists, please update instead of create or create a new channel with a different email address."});
               
                } else {
                  res.json(500, { message: err});
                }
              });

    // Ends
      
}

exports.createChannelWithImage = function(imagedata,req, res) {
      
  var channel_Name = req.fields.channelName; // First name of user.
  var channel_enabled = req.fields.channelEnabled;
  var channel_Date = req.fields.channelDate;
  var channel_description = req.fields.channelDescription;
  // var channel_imageURL = imagedata.url;
  // var channel_imageName = imagedata.name;

    // Start

            channel.findOne({ channelName: { $regex: new RegExp(channel_Name, "i") } },
            function(err, doc) { // Using RegEx - search is case insensitive
                if(!err && !doc) {
                  
                  var newchannel = new channel();
                  
                  newchannel.channelName = channel_Name;
                  newchannel.date = channel_Date;
                  newchannel.channelDescription = channel_description;
                  newchannel.enabled = channel_enabled;
                  newchannel.imageURL = imagedata.url;
                  newchannel.imageName =imagedata.name;


                  newchannel.save(function(err) {
                   
                    if(!err) {
                      res.json(201, {message: "channel created " });
                      // sendMail(user_email_address , user_first_name , verificationCode);

                    } else {
                      res.json(500, {message: "Could not create channel. Error: " + err});
                    }
                  
                  });

     
                } else if(!err) {
                  
                  // User is trying to create a user with a name that
                  // already exists.
                  res.json(403, {message: "channel  already exists, please update instead of create or create a new channel with a different email address."});
               
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
  channel.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "channel removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find channel."});
    } else {
      res.json(403, {message: "Could not delete channel. " + err});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.body.id;

  var channel_Name = req.body.channel_Name; // First name of user.
  var channel_Email_Address = req.body.channel_email_address; 
  var channel_Contact = req.body.channel_Contact;
      
  channel.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.channelName = channel_Name;
        doc.channelEmailAddress = user_last_name;
        doc.channelContact = user_email_address;
        
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "channel updated: " +
user_name});
          } else {
            res.json(500, {message: "Could not update channel. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find channel."});
      } else {
        res.json(500, { message: "Could not update channel. " +
err});
      }
    });
}


