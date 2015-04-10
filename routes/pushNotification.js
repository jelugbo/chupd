var devices = require('../models/devices').devices
var department = require ('../models/department').department

var gcm = require('node-gcm');
var apn = require('apn');

var isPushExist = false;






exports.pushIosNotification = function( req, res ){

		    var myMSG=req.body.message
		    var myTitle = req.body.title

		// var myiPad = "f8b568fce1fb1e689779c0c802a1eaa4f1ccd9d583e7db30bd518df4a541f97b";
		var myiPad = "324dce451a06393dd40599d0b4d760d91e0014acebbf11c70fff2c62d854791d";
		// var myiPad = "06cf2d5ad0d54d78bdc7468fda4b69d8e55709a668c069fea9661ed3b70ef3ea";

		var myDevice = new apn.Device(myiPad);

		var note = new apn.Notification();
		note.badge = 1;
		note.sound = "notification-beep.wav";
		note.alert = { "body" : "Your turn!", "action-loc-key" : "Play" , "launch-image" : "mysplash.png"};
		// note.alert = { "body" : "Your turn!"};
		note.alert = { "body" : myMSG};
		// note.payload = {'messageFrom': 'Holly'};
		note.payload = {'messageFrom': myTitle};

		note.device = myDevice;

		 
		var callback = function(errorNum, notification){
		    console.log('Error is: %s', errorNum);
		    console.log("Note " + notification);
		    res.json(500, { error: notification });
		}
		var options = {
		    gateway: 'gateway.sandbox.push.apple.com', //gateway.sandbox.push.apple.com this URL is different for Apple's Production Servers and changes when you go to production // gateway.push.apple.com
		    errorCallback: callback,
		    cert: 'Cert.pem',                 
		    key:  'Key.pem',                 
		    passphrase: 'harrisconsult',                 
		    port: 2195,                    
		    enhanced: true,                   
		    cacheLength: 100                  
		}
		var apnsConnection = new apn.Connection(options);
		try{



				devices.find({deviceType:'ios'}, function(err, docs) {
			    if(!err) {
			      // res.json(200, { devices: docs });

			      // var myJspnArray=Json.parse(docs);

			  //     for (var key in docs)
					// {
				 //   		if(docs[key].deviceID != null){

				 //   			var myiPad = docs[key].deviceID;
					// 	    var myDevice = new apn.Device(myiPad);
					// 		note.device = myDevice;
					// 		apnsConnection.sendNotification(note);

					        
					//     }

					   
					// }


					for (var key in docs)
		{
	   		if(docs[key].deviceID != null){
	   				// console.log('docs[key].allowSource ' + docs[key].allowSource)
	   				var myQuery = docs[key].allowSource

	   				for (var key2 in myQuery)
	   				{
	   					// console.log('key2 ' + key2)
	   					// console.log('sourceName ' + myQuery[key2].sourceName);
	   					// console.log('sourcePermission ' + myQuery[key2].sourcePermission);
	   					if (myQuery[key2].sourceName==myTitle && myQuery[key2].sourcePermission==true )
	   					{
	   										   			var myiPad = docs[key].deviceID;
						    var myDevice = new apn.Device(myiPad);
							note.device = myDevice;
							apnsConnection.sendNotification(note);
	   					}
	   				}


	   		}

		        
		    }


					// })



			    } else {
			      res.json(500, { message: err });
			    }
			   });


		




		}catch(err){
		res.json(500, { error: err });
		 }




		





}


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

exports.devicesByID = function(req, res) {
	var myDeviceId= req.body.myDeviceID
	console.log (myDeviceId)
  devices.findOne({deviceID: myDeviceId }, function(err, docs) {
    if(!err) {
    	try{
       res.json(200, { devices: docs.allowSource });
	   }catch (err){
	   	console.log(err);
	   	afterDeviceRegistration(myDeviceId);
	   }
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

 devices.find({deviceType:'android', 'allowSource.sourceName': myTitle , 'allowSource.sourcePermission': true }, function(err, docs) {
    if(!err) {
      res.json(200, { devices: docs });

      // var myJspnArray=Json.parse(docs);


      for (var key in docs)
		{
	   		if(docs[key].deviceID != null){
	   				// console.log('docs[key].allowSource ' + docs[key].allowSource)
	   				var myQuery = docs[key].allowSource

	   				for (var key2 in myQuery)
	   				{
	   					// console.log('key2 ' + key2)
	   					// console.log('sourceName ' + myQuery[key2].sourceName);
	   					// console.log('sourcePermission ' + myQuery[key2].sourcePermission);
	   					if (myQuery[key2].sourceName==myTitle && myQuery[key2].sourcePermission==true )
	   					{
	   						registrationIds.push(docs[key].deviceID);
					        // console.log(docs[key].deviceID)
	   					}
	   				}




		        
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



isPushSettingsExist= function (deviceId,sourceID)
{	
	isPushExist = false
	devices.findOne({deviceID: deviceId, 'allowSource.sourceID': sourceID },
            function(err, Doc) { // Using RegEx - search is case insensitive
                if(!err && Doc) {
                	console.log('Already exists.');
                	isPushExist = true;
                	         
                } else {
                 console.log (err);
                 console.log('does not exists.');
                 isPushExist = false
                }
              });

}


var addPushSettings =function (deviceId,departmentData )
{
	 console.log ("\n \nAdding PushSettings \n ========================================================");
    console.log ("deviceId \t:" + deviceId);
    console.log ("departmentData._id \t:" + departmentData._id);
    console.log ("departmentData.departmentName \t:" + departmentData.departmentName);
    //console.log (" ========================================================");
	// isPushSettingsExist(deviceId,departmentData._id);

	console.log ("isPushExist \t:" + isPushExist);
	devices.findOne({ deviceID: deviceId },
            function(err, devicesDoc) { // Using RegEx - search is case insensitive
                if(!err && devicesDoc) {
//------------------------
                	devices.findOne({deviceID: deviceId, 'allowSource.sourceID': departmentData._id },
            function(err, Doc) { // Using RegEx - search is case insensitive
                if(!err && Doc) {
                	console.log('Already exists.');
                	isPushExist = true;
                	         
                } else {

					// if (isPushExist == false){ 

						    devicesDoc.allowSource.push({ sourceID:departmentData._id ,  sourceName: departmentData.departmentName });
						  devicesDoc.save(function(err) {
						          if(!err) {
						           console.log('saved')
						          } else {
						       console.log(err)
						      
						      // res.json(201, {message: "Device Id has been registered" });
						          }
						        });

		             // }

	     			  }
	              });
 //-------------------------------              
                } else {
                 console.log ("Could not find device to push");
                }
              });
}

exports.updateAllowSource = function(req, res) {
  
	var deviceId = req.body.myDeviceID;
	var sourceID = req.body.allowSourceID;
	var myValue = req.body.myValue;
	console.log("Device : " + deviceId );
	console.log("sourceID : " + sourceID );
	console.log("myValue : " + myValue );

  devices.findOne({deviceID: deviceId, 'allowSource._id': sourceID },
       function(err, doc) {
      if(!err && doc) {
//         doc.cellgroupName = cellgroup_Name;
//         doc.cellgroupHead = cellgroup_Head;
//         doc.cellgroupEmailAddress = cellgroup_Email_Address;
//         doc.cellgroupContact = cellgroup_Contact;
//         doc.cellgroupLocation = cellgroup_Location;
        
//         doc.save(function(err) {
//           if(!err) {
//             res.json(200, {message: "cellgroup updated: " +
// cellgroup_Name});
//           } else {
//             res.json(500, {message: "Could not update cellgroup. " +
// err});
//           }
//         });

  			 for (var key in doc.allowSource)
		{
	   		if(doc.allowSource[key]._id == sourceID){
		        //registrationIds.push(docs[key].deviceID);
		        console.log('sourceID ' + doc.allowSource[key]._id)
		        doc.allowSource[key].sourcePermission =myValue;

		        	 doc.save(function(err) {
			          if(!err) {
				            res.json(200, {message: "updated successfully"});
						} else {
							res.json(500, {message: "Could not update . " + err});
						}
					    });
		   }
		   
		}




      res.json(200, { message: doc});

      } else if(!err) {
        res.json(404, { message: "Could not find cellgroup."});
      } else {
        res.json(500, { message: "Could not update cellgroup. " +
err});
      }
    });
}








var afterDeviceRegistration = function(deviceId)
{
	// var myDeviceId =deviceId;
    console.log ("\n \nAfter Device Registration \n ========================================================");
    console.log ("deviceId \t:" + deviceId);
    console.log (" ========================================================");

                   	 department.find({}, function(err, docs) {
					    if(!err) {
					      allDepartment = docs ;

					      for (var key in docs)
							{
						   		if(docs[key].departmentName != null){
							        // registrationIds.push(docs[key].deviceID);
							        // console.log(docs[key].deviceID)

							        	addPushSettings(deviceId,docs[key])

							    }				   
							}

							

					    } else {
					      // res.json(500, { message: err });
					      console.log("Error: Couldn\'t populate the notification settings.")
					    }
					  });

}




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

                  
       //             department.find({}, function(err, docs) {
					  //   if(!err) {
					  //     allDepartment = docs ;

					  //     for (var key in docs)
							// {
						 //   		if(docs[key].departmentName != null){
							//         // registrationIds.push(docs[key].deviceID);
							//         // console.log(docs[key].deviceID)
							//     newdevices.allowSource.push({  sourceName: docs[key].departmentName });
							//     console.log (docs[key].departmentName);
							//     }				   
							// }

							// console.log(newdevices);

					  //   } else {
					  //     // res.json(500, { message: err });
					  //     console.log("Error: Couldn\'t populate the notification settings.")
					  //   }
					  // });




                   	console.log('\n' + newdevices);






                  newdevices.save(function(err,data) {
                   
                    if(!err) {

                    afterDeviceRegistration(data.deviceID);
                    // console.log(data);

                      // res.json(201, {message: "Device Id has been registered" });
                      // sendMail(user_email_address , user_first_name , verificationCode);

                    } else {
                      res.json(500, {message: "Could not create could not add the device ID " + registration_ID + "\n Error : " + err});
                    }
                  
                  });

     
                } else if(!err) {
                  
                  if (doc){
                  	afterDeviceRegistration(doc.deviceID);
                  }
                  // User is trying to create a user with a name that
                  // already exists.
                  // res.json(403, {message: "Device id already exists"});
               
                } else {
                  res.json(500, { message: err});
                }
              });



};











var pushIOS = function( myMSG, myTitle ){
    // var myMSG=req.body.message
    // var myTitle = req.body.title


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
      // res.json(200, { devices: docs });

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


    } else {
      // res.json(500, { message: err });
    }
   });
 };




 var pushAndroid = function( myMSG, myTitle ){
    // var myMSG=req.body.message
    // var myTitle = req.body.title


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
      // res.json(200, { devices: docs });



      for (var key in docs)
		{
	   		if(docs[key].deviceID != null){
		        registrationIds.push(docs[key].deviceID);
		        console.log(docs[key].deviceID)
		    }

		}


		sender.send(message, registrationIds, 10, function (err, result) {
		  if(err) console.error(err);
		  else    console.log(result);


		})


    } else {
      // res.json(500, { message: err });
    }
   });
 };



 exports.pushToDevices = function( req, res ){
    var myMSG=req.body.message;
    var myTitle = req.body.title;

	pushAndroid (myMSG,myTitle);
	
	pushIOS (myMSG,myTitle);
};