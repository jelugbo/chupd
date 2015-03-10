var express = require('../node_modules/express');
var app = express();
var path = require('path');
var fs = require('fs');

var devotion = require('../models/devotion').devotion;
var upload = require('../node_modules/jquery-file-upload-middleware');
 
app.use(express.static(path.join(__dirname, 'public')));
 app.use('/upload', upload.fileHandler());

 upload.configure({
        uploadDir: __dirname + '/public/uploads',
        uploadUrl: '/uploads',
        imageVersions: {
            thumbnail: {
                width: 80
               ,height: 80
            }
        }, accessControl: {
        allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE'
    }
    });

exports.devotionImage =function(imagedata, req , res){
// console.log(imagedata.url);
// console.log(imagedata);
// console.log(req);
var devotiondevotionTitle = req.fields.devotiondevotionTitle; 
      var devotionDate = req.fields.devotionDate;

      

      var devotionDescription1 = req.fields.devotionDescription1;
      var devotionDescription2 = req.fields.devotionDescription2;
      var devotionDescription3 = req.fields.devotionDescription3;
      var  devotionImageUrl = imagedata.url;
      var devotionImageName = imagedata.name;

      var newdevotion = new devotion();
      
      newdevotion.devotionTitle = devotiondevotionTitle;

      newdevotion.date = devotionDate;

      newdevotion.imageURl = devotionImageUrl;
      newdevotion.imageName = devotionImageName;

      newdevotion.description1 = devotionDescription1;
      newdevotion.description2 = devotionDescription2;
      newdevotion.description3 = devotionDescription3;


      newdevotion.save(function(err) {
      
        if(!err) {
            res.json(201, {message: 'devotion created with date : ' + newdevotion.date });
        } else {
          console.log(err);
          res.json(500, {message: 'Could not create devotion. Error: ' + err});
        }
      
      });
      




}

exports.devotionWithImage =function(req,res,next){
upload.fileHandler({
        uploadDir: function () {
            return __dirname + '.../public/uploads/'
        },
        uploadUrl: function () {
            return '.../uploads'
        }
    })(req, res, next);



upload.on('end', function (fileInfo, req, res) { 
  console.log (fileInfo);
  console.log (req);
   });


}



upload.configure({
        uploadDir: __dirname + '../public/uploads',
        uploadUrl: '../uploads',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }, accessControl: {
        allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE'
    }
    });

exports.index = function(req, res) {
  devotion.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { devotion: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}


exports.pushNotification = function(req, res) {


var dateOffset = (24*60*60*1000) * 5; //5 days
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

  devotion.find({date: {$lt: end , $gte: start}}, function(err, docs) {
    if(!err) {
      res.json(200, { devotion: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}



exports.create = function(req, res) {
  
      var devotiondevotionTitle = req.body.devotionTitle; 
      var devotionDate = req.body.devotionDate;
      var devotionContent = req.body.htmlcontent;
      var dayOfWeek;

      // console.log ( "content: " + devotionContent);
      // console.log ( "\nDate: " + devotionDate);
      // console.log ( "\nTitle: " + devotionTitle);
       var myDate = new Date(devotionDate);

      console.log(myDate);


      
      var DevotionDateDay = myDate.getUTCDate();
      if (DevotionDateDay ==1){
        var DevotionDateMonth =myDate.getMonth()+ 2;
      }
      else{
       var DevotionDateMonth =myDate.getMonth()+ 1; 
      }
      var EventDateYear =myDate.getFullYear();
      
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      // var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

      var day = days[ myDate.getUTCDate() -1 ];
      // var month = months[ now.getMonth() ];
      console.log(day);


      var DevotionDateYear =myDate.getFullYear();
  
devotion.findOne({date:devotionDate} , function(err, doc) {
    if(!err && !doc) {
      // res.json(200, doc);
          
      // console.log ( "content: " + devotionContent);
       var newdevotion = new devotion();
      newdevotion.dayOfWeek = day;
      newdevotion.devotionTitle = devotiondevotionTitle;   
      newdevotion.date = devotionDate;
      newdevotion.devotionContent = devotionContent;
      newdevotion.dateDay= DevotionDateDay;
      newdevotion.dateMonth =DevotionDateMonth;
      newdevotion.dateYear=DevotionDateYear;

     
      console.log ("\n Saving devotion ... \n ___________________________________ \n")
      newdevotion.save(function(err) { 
       if  (!err) {
            res.json(201, {message: 'devotion created with date : ' + newdevotion.date });
        } 
        else {
          res.json(500, {message: 'Could not create devotion. Error: ' + err});
        }
      
      });


    } else if(err) {
      res.json(500, { message: "Error creating devotion." + err});
    } else if (doc)  {
            res.json(500, { message: "Sorry devotion has been created for the date specified."});
    }else
    {
       res.json(500, { message: "err : " + err });
    }
     
    });  
    }
   
      
// };




exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the devotion the devotion you want to look up.
  
  devotion.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading devotion." + err});
    } else {
      res.json(404, { message: "devotion not found."});
    }
  });
} 



exports.delete = function(req, res, path) {
      
  var id = req.body.id;
  console.log("I got to this stage");

  
  devotion.findById(id, function(err, doc) {
    if(!err && doc) {
      var fullmagePath = path + '/public/uploads/' + doc.imageName;
      doc.remove();
      // console.log(__dirname );
      
       fs.unlink(fullmagePath, function() {
            if (err) throw err;
            console.log ("Deleted : " + fullmagePath);
            // res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });

      res.json(200, { message: "Workout removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find devotion."});
    } else {
      res.json(403, {message: "Could not delete devotion. " + err});
    }
  });
}


exports.deleteAll = function(req, res) {
      
  var myYear = req.body.year;
  devotion.find({dateYear: myYear }, function(err, doc) {
    if(!err && doc) {
      doc.remove({dateYear: myYear });
      res.json(200, { message: "Workout removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find devotion."});
    } else {
      res.json(403, {message: "Could not delete devotion. " + err});
    }
  });
}


// exports.delete = function(req, res) {
      
//   var id = req.body.id;
//   devotion.findById(id, function(err, doc) {
//     if(!err && doc) {
//       doc.remove();
//       var newdevotion = new devotion();
//        //newdevotion.remove( { "_id ": id }, 1 );
//       newdevotion.remove({ _id : id});
//       console.log(newdevotion.remove({ _id : id}));
//      // newdevotion.removeById(id);

//       //db.inventory.remove( { type : "food" }, 1 )
//       res.json(200, { message: "devotion removed."});
//     } else if(!err) {
//       res.json(404, { message: "Could not find devotion."});
//     } else {
//       res.json(403, {message: "Could not delete devotion. " + err});
//     }
//   });
// }


exports.update = function(req, res) {
  
  var id = req.body.devotion_id;

      var devotiondevotionName = req.body.devotiondevotionName; 
      var devotionVenue = req.body.devotionVenue;
      var devotionVenueLong = req.body.devotionVenueLong;
      var devotionVenueLat = req.body.devotionVenueLat;
      var devotionDate = req.body.devotionDate;
      console.log('req.body.devotionDate:' + req.body.devotionDate);
      console.log('devotionDate:' + devotionDate);
      var myReminderTime = new Date(req.body.devotionReminderTime);
      var myReminderDate = new Date(req.body.devotionReminderDate); 
      // console.log('req.body.devotionReminderTime: ' + req.body.devotionReminderTime)
      // console.log ('myReminderTime:'  + myReminderTime);
      // console.log ('myReminderDate:'  + myReminderDate);
      // var devotionReminderDate = new Date (myReminderDate.getFullYear(),myReminderDate.getMonth()+1,myReminderDate.getDate() , myReminderDate.getUTCHours(), myReminderDate.getUTCMinutes(), '0','0');
      var devotionReminderDate = new Date (req.body.devotionReminderDate);
      var myDate = new Date(devotionDate);

      console.log(myDate);
      
      var devotionDateDay = myDate.getUTCDate();
      if (devotionDateDay ==1){
        var devotionDateMonth =myDate.getMonth()+ 2;
      }
      else{
       var devotionDateMonth =myDate.getMonth()+ 1; 
      }
      
      var devotionDateYear =myDate.getFullYear();
      var devotionImageUrl = req.body.devotionImageUrl; 
      var devotionDescription1 = req.body.devotionDescription1;
      var devotionDescription2 = req.body.devotionDescription2;
      var devotionDescription3 = req.body.devotionDescription3;
      var devotionEnquiryContact = req.body.devotionEnquiryContact;
      // var devotionTime = req.body.devotionTime;

      // var newdevotion = new devotion();
      
      // newdevotion.devotionName = devotiondevotionName;
      // newdevotion.venue = devotionVenue;
      // newdevotion.venueLong = devotionVenueLong;
      // newdevotion.venueLat= devotionVenueLat;
      // newdevotion.date = devotionDate;
      // newdevotion.reminderDate=devotionReminderDate;
      // newdevotion.imageURl = devotionImageUrl;
      // newdevotion.dateDay = devotionDateDay;
      // newdevotion.dateMonth = devotionDateMonth;
      // newdevotion.dateYear = devotionDateYear;
      // newdevotion.description1 = devotionDescription1;
      // newdevotion.description2 = devotionDescription2;
      // newdevotion.description3 = devotionDescription3;
      // newdevotion.enquiryContact = devotionEnquiryContact;
      
      // newdevotion.material.image = devotion_material_image;
      // newdevotion.material.video = devotion_material_video;

      
      
  devotion.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.devotionName = devotiondevotionName;
        doc.venue = devotionVenue;
		    doc.date = devotionDate;
        doc.reminderDate= devotionReminderDate;
        doc.dateDay =
        doc.dateMonth=devotionDateMonth;
        doc.dateYear=devotionDateYear;
        doc.description1=devotionDescription1;
        doc.description2=devotionDescription2;
        doc.description3=devotionDescription3;
        // doc.material_image = devotion_material_image;
        // doc.material_video = devotion_material_image;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "devotion updated: " +
devotiondevotionName});
          } else {
            res.json(500, {message: "Could not update devotion. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find devotion."});
      } else {
        res.json(500, { message: "Could not update devotion. " +
err});
      }
    });
}
