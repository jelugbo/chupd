var devices = require('../models/devices').devices

var gcm = require('node-gcm');




// // ... or some given values 
// var message = new gcm.Message({
//     collapseKey: 'demo',
//     delayWhileIdle: true,
//     timeToLive: 3,
//     data: {
//         key1: 'message1',
//         key2: 'message2'
//     }
// });

exports.devices = function(req, res) {
  devices.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { devices: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}


// Value the payload data to send...








exports.pushNotification = function( req, res ){
    var myMSG=req.body.message
    var myTitle = req.body.title


	var message = new gcm.Message();
	// message.addData('message',"\u270C Peace, Love \u2764 and PhoneGap \u2706!");
	 message.addData('message',""+myMSG);
	// message.addData('title','Push Notification Sample' );
	message.addData('title', myTitle );
	message.addData('msgcnt','3'); // Shows up in the notification in the status bar
	message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
	//message.collapseKey = 'demo';
	//message.delayWhileIdle = true; //Default is false
	message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
	 


// Set up the sender with you API key 
var sender = new gcm.Sender('AIzaSyAT4hUfbRFvoza5KBUiq5YLZzt73ztx8AU');

var registrationIds = []; 

 devices.find({deviceType:'android'}, function(err, docs) {
    if(!err) {
      res.json(200, { devices: docs });

      // var myJspnArray=Json.parse(docs);


      for (var key in docs)
		{
	   		if(docs[key].deviceID != null){
		        registrationIds.push(docs[key].deviceID);
		        console.log(docs[key].deviceID)
		    }
		      // here you have access to
		      // var MNGR_NAME = result[key].MNGR_NAME;
		      // var MGR_ID = result[key].MGR_ID;
		   
		}


		sender.send(message, registrationIds, 10, function (err, result) {
		  if(err) console.error(err);
		  else    console.log(result);
		})

  //     for(var i=0;i<myJspnArray.length;i++){
		//     if(myJspnArray[i].deviceID != null){
		//         registrationIds.push(myJspnArray[i].deviceID);
		//         console.log(myJspnArray[i].deviceID)
		//     }
		// }

    } else {
      res.json(500, { message: err });
    }
   });
// Add the registration IDs of the devices you want to send to 

//registrationIds.push('APA91bHmtAFqpqlhzo0z2_Csq8fo6xHsc_s5XcKJdccwIFlFwsxDI_SAro1IXWxDTlo5gJOwG9IBDoWGQhgJbf6L6lcGoJQNbgxwgKVE9nlxU72dLKxyJ-5hx_dHAcDUFU0rWpmbc15oqS-17L7HjxQtgT4PXysYHtXw9xtN81-JYgSF3E7nwb8');
// registrationIds.push('225971551851');
 

    
   // ... or retrying a specific number of times (10) 


};

exports.deviceRegistration = function( req, res ){
    var registration_ID=req.body.registrationID;
    var device_Type = req.body.deviceType;
    
   // ... or retrying a specific number of times (10) 

     devices.findOne({ deviceID: registration_ID },
            function(err, doc) { // Using RegEx - search is case insensitive
                if(!err && !doc) {
                  
                  var newdevices = new devices();
                  
                  newdevices.deviceID = registration_ID;
                 newdevices.deviceType = device_Type;


                  newdevices.save(function(err) {
                   
                    if(!err) {
                      res.json(201, {message: "Device Id has been registered" });
                      // sendMail(user_email_address , user_first_name , verificationCode);

                    } else {
                      res.json(500, {message: "Could not create could not add the device ID " + registration_ID + "\n Error : " + err});
                    }
                  
                  });

     
                } else if(!err) {
                  
                  // User is trying to create a user with a name that
                  // already exists.
                  res.json(403, {message: "Device id already exists"});
               
                } else {
                  res.json(500, { message: err});
                }
              });



};