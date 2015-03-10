var role = require('../models/role').role;
var nodemailer = require('nodemailer');
var cc = require('coupon-code');
var url ="http://localhost/TKP%20Admin/#/signUp";
      
exports.index = function(req, res) {
  role.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { roles: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}

/* Email Handler */
     var sendMail= function(emailAddress) {

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
            subject: 'An invite to manage RCCG TKP Mobile app',
            text: 'An invit has been sent to you to use the RCCG TKP mobile app control panel',
            html: 'Hello, <br/> You have been invited to use the RCCG TKP mobile app control panel. \n Please  <a href=\"'+ url +'\"> Click here </a> to create your account.'
        };

        transporter.sendMail( mailContent, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });

      };

    // var sendMail_resetCode= function(emailAddress ,username ,resetCode) {

    //     var nodemailer = require('nodemailer');

    //     var transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: 'no.reply.harrisconsult@gmail.com',
    //             pass: 'hconsult120'
    //         }
    //     });

    //     var mailContent = {
    //         from: 'no.reply.harrisconsult@gmail.com',
    //         to: emailAddress,
    //         subject: 'password Reset Code',
    //         text: 'Your password reset code',
    //         html: 'Hello ' + username + ' , <br/> The code to reset your password is <strong>'+ resetCode +'</strong>.'
    //     };

    //     transporter.sendMail( mailContent, function(error, info){
    //         if(error){
    //             console.log(error);
    //         }else{
    //             console.log('Message sent: ' + info.response);
    //         }
    //     });

    //   };

 


exports.create = function(req, res) {
      
  var user_email_address = req.body.user_email_address;
  var role_viewEventList = req.body.canViewEventslist; 
  var role_editEvent = req.body.canEditEvents; 
  var role_deleteEvent = req.body.canDeleteEvents;
  var role_canSendInvites = req.body.canSendInvites;
  var role_canBlockUser = req.body.canBlockUsers;
  var role_canDeleteUser = req.body.canDeleteUsers;
  // var role_blocked = req.body.user_password;

role.findOne({ email_address: { $regex: new RegExp(user_email_address, "i") } },
function(err, doc) { // Using RegEx - search is case insensitive
    if(!err && !doc) {
      
      var newRole = new role();
      
      newRole.email_address= user_email_address;
      newRole.canViewEventList = role_viewEventList;
      newRole.canEditEvent = role_editEvent;
      newRole.canDeleteEvent = role_deleteEvent;
      newRole.canSendInvites = role_canSendInvites;
      newRole.canBlockUsers =  role_canBlockUser;
      newRole.canDeleteUser = role_canDeleteUser;
      // newRole.blocked = verificationCode;


      
      newRole.save(function(err) {
       
        if(!err) {
          res.json(201, {message: "Role created for email_address: " +
newRole.email_address });
          sendMail(user_email_address);

        } else {
          res.json(500, {message: "Could not create role. Error: " + err});
        }
      
      });
      
    } else if(!err) {
      
      // User is trying to create a user with a name that
      // already exists.
      res.json(403, {message: "user with that email address already exists, please update instead of create or create a new user with a different email address." });
         res.json(403, {err: err});
    } else {
      res.json(500, { message: err});
    }
  });
      
}



// exports.auth = function(req, res) {
      
//   var user_email_address = req.body.user_email_address; 
//   var user_password = req.body.user_password;



// user.findOne({ email_address: user_email_address , password: user_password},
// function(err, doc) { 

//  if(!err && doc) {

//       var myState = true ;
//       if (myState === doc.vstate)
//       {
//       res.json(200,  {TOKEN: doc.id 
//                         ,name: doc.first_name
//                         ,id: doc.email_address });
//       }
//       else
//         {
//           res.json(203, { message: "user not verified"});
//         }
   

//     } else if(err) {
//       res.json(500, { message: "Error loading user." + err});
//     } else {
//       res.json(404, { message: "user not found."});
//       res.json(404, doc);
//     }


//   });
      
// }

// exports.sfinder = function(req, res) {
     

//      var id = req.params.id; 
//   user.findById(id, function(err, doc) {
//     if(!err && doc) {
//       //res.json(200, doc);
//        res.json(200, { message: "valid session" });
//     } else if(err) {
//       res.json(500, { message: "Error loading session"});
//     } else {
//       res.json(404, { message: "session not found."});
//     }
//   });

      
// }



// exports.show = function(req, res) {
  
//   var id = req.params.id; // The id of the user the user you want to look up.
//   user.findById(id, function(err, doc) {
//     if(!err && doc) {
//       res.json(200, doc);
//     } else if(err) {
//       res.json(500, { message: "Error loading user." + err});
//     } else {
//       res.json(404, { message: "user not found."});
//     }
//   });
// }

// exports.userByEmail = function(req, res) {
  
//   var user_email_address = req.params.emailAddress; // The id of the user the user you want to look up.
//   user.findOne({email_address: user_email_address}, function(err, doc) {
//     if(!err && doc) {

//       var newuser = new user();
      
//       newuser.first_name = doc.first_name;
//       newuser.last_name = doc.last_name;
//       newuser.email_address = doc.email_address;

//       res.json(200, newuser);

//     } else if(err) {
//       res.json(500, { message: "Error loading user." + err});
//     } else {
//       res.json(404, { message: "user not found."});
//     }
//   });
// }

// exports.userProfile = function(req, res) {
  
//   var user_email_address = req.params.emailAddress; // The id of the user the user you want to look up.
//   user.findOne({email_address: user_email_address}, function(err, doc) {
//     if(!err && doc) {

//       var newuser = new user();
      
      
//       newuser.first_name = doc.first_name;
//       newuser.last_name = doc.last_name;
//       newuser.email_address = doc.email_address;
//       newuser.phone_number = doc.phone_number;
//       newuser.address = doc.address;
//       newuser.marrital_Status = doc.marrital_Status;
//       newuser.anniversary_date = doc.anniversary_date;
//       newuser.imageurl = doc.imageurl;
//       newuser.birthdate = doc.birthdate;
//       newuser.publishBirthday = doc.publishBirthday;
//       newuser.account_type = doc.account_type;


//       res.json(200, newuser);

//     } else if(err) {
//       res.json(500, { message: "Error loading user." + err});
//     } else {
//       res.json(404, { message: "user not found."});
//     }
//   });
// }


exports.delete = function(req, res) {
      
  var id = req.body.id;
  role.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "role removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find role."});
    } else {
      res.json(403, {message: "Could not delete role. " + err});
    }
  });
}

exports.update = function(req, res) {
  
  var id = req.body.id;

  var user_email_address = req.body.user_email_address;
  var role_viewEventList = req.body.canViewEventslist; 
  var role_editEvent = req.body.canEditEvents; 
  var role_deleteEvent = req.body.canDeleteEvents;
  var role_canSendInvites = req.body.canSendInvites;
  var role_canBlockUser = req.body.canBlockUsers;
  var role_canDeleteUser = req.body.canDeleteUsers;
      
  role.findById(id, function(err, doc) {
      if(!err && doc) {


      doc.email_address= user_email_address;
      doc.canViewEventList = role_viewEventList;
      doc.canEditEvent = role_editEvent;
      doc.canDeleteEvent = role_deleteEvent;
      doc.canSendInvites = role_canSendInvites;
      doc.canBlockUsers =  role_canBlockUser;
      doc.canDeleteUser = role_canDeleteUser;

      //   doc.user_first_name = user_first_name;
      //   doc.user_last_name = user_last_name;
		    // doc.user_email_address = user_email_address;
      //   doc.user_password = user_password;

        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "role updated: " +
user_email_address});
          } else {
            res.json(500, {message: "Could not update role. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find role."});
      } else {
        res.json(500, { message: "Could not update role. " +
err});
      }
    });
}


exports.updateProfile1 = function(req, res) {
  
  // console.log(req.body)
   
 
   var user_email_address=req.body.user_email;
  var user_first_name = req.body.user_firstname; // First name of user.
  var user_last_name = req.body.user_lastname; // Last name of the user

      
  user.findOne({email_address: user_email_address}, function(err, doc) {
      if(!err && doc) {
        doc.first_name = user_first_name; 
        doc.last_name = user_last_name;
    // doc.user_email_address = user_email_address;
    //     doc.user_password = user_password;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Update was successful"});
          } else {
            res.json(500, {message: "Could not update user. " + err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find user."});
      } else {
        res.json(500, { message: "Could not update user. " + err});
      }
    });
}



exports.updateProfile2 = function(req, res) {
  
  // console.log(req.body)
   
 
   var user_email_address=req.body.user_email;
  
  var user_gender = req.body.user_gender;
  var user_dateOfBirth = req.body.user_dateOfBirth; // First name of user.
  var user_publishBirthday = req.body.user_publishBirthday; // Last name of the user
  var user_marritalStatus = req.body.user_marritalStatus;
  var user_anniversaryDate = req.body.user_anniversaryDate;
  var user_address = req.body.user_address;

      
  user.findOne({email_address: user_email_address}, function(err, doc) {
      if(!err && doc) {
          doc.gender = user_gender;
          doc.birthdate = user_dateOfBirth; // First name of user.
          doc.publishBirthday = user_publishBirthday; // Last name of the user
          doc.marrital_Status = user_marritalStatus;
          doc.anniversary_date = user_anniversaryDate;
          doc.address = user_address;
    // doc.user_email_address = user_email_address;
    //     doc.user_password = user_password;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Update was successful"});
          } else {
            res.json(500, {message: "Could not update user. " + err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find user."});
      } else {
        res.json(500, { message: "Could not update user. " + err});
      }
    });
}








exports.verify = function(req, res) {
  
  var user_email_address = req.body.user_email_address; 
  var user_verificationCode = req.body.user_verificationCode;

  console.log(user_verificationCode);
     user.findOne({email_address: user_email_address, verificationCode: user_verificationCode }, function(err, doc) {
   // user.findOne({ email_address: user_email_address , verificationCode: user_verificationCode},
   // function(err, doc) {
      if(!err && doc) { 

        doc.vstate = true;
        
        doc.save(function(err) {
          if(!err) {
            console.log(doc);
            res.json(200, {message: "email is verified"});
            console.log(doc);

          } else {
            res.json(500, {message: "Could not verify email address " + user_email_address + ". Try again later."  , user_name: doc.first_name});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find user."});
      } else {
        res.json(500, { message: "Could not verify email address " + user_email_address + ". "  +
err});
      }
    });
}

exports.ResendVerificationCode = function(req, res) {
  
  var user_email_address = req.body.user_email_address; 
  
 
     user.findOne({email_address: user_email_address }, function(err, doc) {
   // user.findOne({ email_address: user_email_address , verificationCode: user_verificationCode},
   // function(err, doc) {
      if(!err && doc) { 

        doc.vstate = false;
        var newVerificationCode = cc.generate({ parts : 2 });
        doc.verificationCode =newVerificationCode;
    
        doc.save(function(err) {
          if(!err) {
            sendMail(user_email_address , doc.first_name , doc.verificationCode);
            res.json(200, {message: "verification code sent successfully"});
            console.log(doc);

          } else {
            res.json(500, {message: "Could not send the verification code to the email address " + user_email_address + ". Try again later."  , user_name: doc.first_name});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find user."});
      } else {
        res.json(500, { message: "Could not verify email address " + user_email_address + ". "  +
err});
      }
    });
}




exports.ResetPassCode = function(req, res) {
  
  var user_email_address = req.body.user_email_address; 
  
 
     user.findOne({email_address: user_email_address }, function(err, doc) {
   // user.findOne({ email_address: user_email_address , verificationCode: user_verificationCode},
   // function(err, doc) {
      if(!err && doc) { 

        var newResetCode = cc.generate({ parts : 2 });
        doc.resetCode =newResetCode;
    
        doc.save(function(err) {
          if(!err) {
            sendMail_resetCode(user_email_address , doc.first_name , doc.resetCode);
            res.json(200, {message: "pass code sent successfully"});
            console.log(doc);

          } else {
            res.json(500, {message: "Could not send the pass code to the email address " + user_email_address + ". Try again later."  , user_name: doc.first_name});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find user."});
      } else {
        res.json(500, { message: "Could not verify email address " + user_email_address + ". "  +
err});
      }
    });
}

exports.changepassword = function(req, res) {
  
  var user_email_address = req.body.user_email_address; 
  var user_newPassword = req.body.user_newPassword;
  var user_resetCode = req.body.user_resetCode;
  
 
     user.findOne({email_address: user_email_address, resetCode:user_resetCode }, function(err, doc) {
   // user.findOne({ email_address: user_email_address , verificationCode: user_verificationCode},
   // function(err, doc) {
      if(!err && doc) { 

        doc.password =user_newPassword;
    
        doc.save(function(err) {
          if(!err) {
            //sendMail_resetCode(user_email_address , doc.first_name , doc.resetCode);
            res.json(200, {message: "Password reset was successfully"});
            console.log(doc);

          } else {
            res.json(500, {message: "could not reset the password to the  email address " + user_email_address + ". Try again later."  , user_name: doc.first_name});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find user."});
      } else {
        res.json(500, { message: "Could not verify email address " + user_email_address + ". "  +
err});
      }
    });
}