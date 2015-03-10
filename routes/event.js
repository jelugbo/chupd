var event = require('../models/event').event;
      
exports.index = function(req, res) {
  event.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { event: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}


exports.pushNotification = function(req, res) {


var dateOffset = (24*60*60*1000) * 15; //5 days
var myDate = new Date();
var myDate2 = new Date();
var start1 = myDate.setTime(myDate.getTime() - dateOffset);
var end1 = myDate2.setTime(myDate2.getTime() + dateOffset);
var start = new Date(start1).toISOString();
var end = new Date(end1).toISOString();


console.log('start' + start);
console.log ('end' + end );

var now = new Date();

console.log (' start in iso format ' +  new Date(start1).toISOString() )

  event.find({date: {$lt: end , $gte: start}}, function(err, docs) {
    if(!err) {
      res.json(200, { event: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}



exports.queryEvent = function(req, res) {


var strMonth = req.body.strMonth;
var strYear= req.body.strYear;

console.log('day' + strMonth);
console.log ('Month' + strYear );

// var now = new Date();

// console.log (' start in iso format ' +  new Date(start1).toISOString() )

  event.find({dateMonth:strMonth , dateYear:strYear }, function(err, docs) {
    if(!err) {
      res.json(200, { event: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}



exports.create = function(req, res) {
  
      // var EventDate = new Date();

      var EventEventName = req.body.EventEventName; 
      var EventVenue = req.body.EventVenue;
      var EventVenueLong = req.body.EventVenueLong;
      var EventVenueLat = req.body.EventVenueLat;
      var EventDate = req.body.EventDate;
      console.log('req.body.EventDate:' + req.body.EventDate);
      console.log('EventDate:' + EventDate);
      var myReminderTime = new Date(req.body.EventReminderTime);
      var myReminderDate = new Date(req.body.EventReminderDate); 
      // console.log('req.body.EventReminderTime: ' + req.body.EventReminderTime)
      // console.log ('myReminderTime:'  + myReminderTime);
      // console.log ('myReminderDate:'  + myReminderDate);
      // var EventReminderDate = new Date (myReminderDate.getFullYear(),myReminderDate.getMonth()+1,myReminderDate.getDate() , myReminderDate.getUTCHours(), myReminderDate.getUTCMinutes(), '0','0');
      var EventReminderDate = new Date (req.body.EventReminderDate);
      var myDate = new Date(EventDate);

      console.log(myDate);
      
      var EventDateDay = myDate.getUTCDate();
      if (EventDateDay ==1){
        var EventDateMonth =myDate.getMonth()+ 2;
      }
      else{
       var EventDateMonth =myDate.getMonth()+ 1; 
      }
      
      var EventDateYear =myDate.getFullYear();
      var EventImageUrl = req.body.EventImageUrl; 
      var EventDescription1 = req.body.EventDescription1;
      var EventDescription2 = req.body.EventDescription2;
      var EventDescription3 = req.body.EventDescription3;
      var EventEnquiryContact = req.body.EventEnquiryContact;
      // var EventTime = req.body.EventTime;

      console.log ( 'Event day is ' + EventDateDay);
      console.log ( 'Event Month is ' + EventDateMonth);
      console.log ( 'Event Year is ' + EventDateYear);
   

      var newevent = new event();
      
      newevent.eventName = EventEventName;
      newevent.venue = EventVenue;
      newevent.venueLong = EventVenueLong;
      newevent.venueLat= EventVenueLat;
      newevent.date = EventDate;
      newevent.reminderDate=EventReminderDate;
      newevent.imageURl = EventImageUrl;
      newevent.dateDay = EventDateDay;
      newevent.dateMonth = EventDateMonth;
      newevent.dateYear = EventDateYear;
      newevent.description1 = EventDescription1;
      newevent.description2 = EventDescription2;
      newevent.description3 = EventDescription3;
      newevent.enquiryContact = EventEnquiryContact;
      
      // newevent.material.image = event_material_image;
      // newevent.material.video = event_material_video;

      newevent.save(function(err) {
      
        if(!err) {
            res.json(201, {message: 'event created with date : ' + newevent.date });
        } else {
          res.json(500, {message: 'Could not create event. Error: ' + err});
        }
      
      });
      
   
      
};




exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the event the event you want to look up.
  
  event.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading event." + err});
    } else {
      res.json(404, { message: "event not found."});
    }
  });
} 



exports.delete = function(req, res) {
      
  var id = req.body.id;
  console.log("I got to this stage");
  
  event.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Workout removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find Event."});
    } else {
      res.json(403, {message: "Could not delete Event. " + err});
    }
  });
}


exports.deleteAll = function(req, res) {
      
  var myYear = req.body.year;
  event.find({dateYear: myYear }, function(err, doc) {
    if(!err && doc) {
      doc.remove({dateYear: myYear });
      res.json(200, { message: "Workout removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find Event."});
    } else {
      res.json(403, {message: "Could not delete Event. " + err});
    }
  });
}


// exports.delete = function(req, res) {
      
//   var id = req.body.id;
//   event.findById(id, function(err, doc) {
//     if(!err && doc) {
//       doc.remove();
//       var newevent = new event();
//        //newevent.remove( { "_id ": id }, 1 );
//       newevent.remove({ _id : id});
//       console.log(newevent.remove({ _id : id}));
//      // newevent.removeById(id);

//       //db.inventory.remove( { type : "food" }, 1 )
//       res.json(200, { message: "event removed."});
//     } else if(!err) {
//       res.json(404, { message: "Could not find event."});
//     } else {
//       res.json(403, {message: "Could not delete event. " + err});
//     }
//   });
// }


exports.update = function(req, res) {
  
  var id = req.body.event_id;

      var EventEventName = req.body.EventEventName; 
      var EventVenue = req.body.EventVenue;
      var EventVenueLong = req.body.EventVenueLong;
      var EventVenueLat = req.body.EventVenueLat;
      var EventDate = req.body.EventDate;
      console.log('req.body.EventDate:' + req.body.EventDate);
      console.log('EventDate:' + EventDate);
      var myReminderTime = new Date(req.body.EventReminderTime);
      var myReminderDate = new Date(req.body.EventReminderDate); 
      // console.log('req.body.EventReminderTime: ' + req.body.EventReminderTime)
      // console.log ('myReminderTime:'  + myReminderTime);
      // console.log ('myReminderDate:'  + myReminderDate);
      // var EventReminderDate = new Date (myReminderDate.getFullYear(),myReminderDate.getMonth()+1,myReminderDate.getDate() , myReminderDate.getUTCHours(), myReminderDate.getUTCMinutes(), '0','0');
      var EventReminderDate = new Date (req.body.EventReminderDate);
      var myDate = new Date(EventDate);

      console.log(myDate);
      
      var EventDateDay = myDate.getUTCDate();
      if (EventDateDay ==1){
        var EventDateMonth =myDate.getMonth()+ 2;
      }
      else{
       var EventDateMonth =myDate.getMonth()+ 1; 
      }
      
      var EventDateYear =myDate.getFullYear();
      var EventImageUrl = req.body.EventImageUrl; 
      var EventDescription1 = req.body.EventDescription1;
      var EventDescription2 = req.body.EventDescription2;
      var EventDescription3 = req.body.EventDescription3;
      var EventEnquiryContact = req.body.EventEnquiryContact;
      // var EventTime = req.body.EventTime;

      // var newevent = new event();
      
      // newevent.eventName = EventEventName;
      // newevent.venue = EventVenue;
      // newevent.venueLong = EventVenueLong;
      // newevent.venueLat= EventVenueLat;
      // newevent.date = EventDate;
      // newevent.reminderDate=EventReminderDate;
      // newevent.imageURl = EventImageUrl;
      // newevent.dateDay = EventDateDay;
      // newevent.dateMonth = EventDateMonth;
      // newevent.dateYear = EventDateYear;
      // newevent.description1 = EventDescription1;
      // newevent.description2 = EventDescription2;
      // newevent.description3 = EventDescription3;
      // newevent.enquiryContact = EventEnquiryContact;
      
      // newevent.material.image = event_material_image;
      // newevent.material.video = event_material_video;

      
      
  event.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.eventName = EventEventName;
        doc.venue = EventVenue;
		    doc.date = EventDate;
        doc.reminderDate= EventReminderDate;
        doc.dateDay =
        doc.dateMonth=EventDateMonth;
        doc.dateYear=EventDateYear;
        doc.description1=EventDescription1;
        doc.description2=EventDescription2;
        doc.description3=EventDescription3;
        // doc.material_image = event_material_image;
        // doc.material_video = event_material_image;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "event updated: " +
EventEventName});
          } else {
            res.json(500, {message: "Could not update event. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find event."});
      } else {
        res.json(500, { message: "Could not update event. " +
err});
      }
    });
}
