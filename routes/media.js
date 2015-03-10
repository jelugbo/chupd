var express = require('../node_modules/express');
var app = express();
var path = require('path');
var fs = require('fs');

var media = require('../models/media').media;
var upload = require('../node_modules/jquery-file-upload-middleware');
 
app.use(express.static(path.join(__dirname, 'public')));
 app.use('/upload', upload.fileHandler());

 upload.configure({
        uploadDir: __dirname + '/public/uploads',
        uploadUrl: '/uploads',
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

exports.mediaImage =function(imagedata, req , res){
// console.log(imagedata.url);
// console.log(imagedata);
// console.log(req);
var mediamediaTitle = req.fields.mediamediaTitle; 
      var mediaDate = req.fields.mediaDate;

      
      var mediaChannel = req.fields.mediaChannel;
      var mediaDescription = req.fields.mediaDescription;
      var androidVideoURL = req.fields.mediaAdroidVideoURL;
      var iosVideoURL = req.fields.mediaIosVideoURL;
      var windowsVideoURL = req.fields.mediaWindowsVideoURL;

 
 
      var  mediaImageUrl = imagedata.url;
      var mediaImageName = imagedata.name;

      var newmedia = new media();
      
      newmedia.mediaChannel= mediaChannel
      newmedia.mediaTitle = mediamediaTitle;

      newmedia.date = mediaDate;

      newmedia.imageURl = mediaImageUrl;
      newmedia.imageName = mediaImageName;

      newmedia.description = mediaDescription;

      newmedia.androidVideoURL = androidVideoURL;
      newmedia.iosVideoURL = iosVideoURL;
      newmedia.windowsVideoURL = windowsVideoURL;



      newmedia.save(function(err) {
      
        if(!err) {
            res.json(201, {message: 'media created with date : ' + newmedia.date });
        } else {
          console.log(err);
          res.json(500, {message: 'Could not create media. Error: ' + err});
        }
      
      });
      




}

exports.mediaWithImage =function(req,res,next){
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
  media.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { media: docs });
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

  media.find({date: {$lt: end , $gte: start}}, function(err, docs) {
    if(!err) {
      res.json(200, { media: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}



exports.create = function(req, res) {
  
      // var mediaDate = new Date();

      var mediamediaTitle = req.body.mediamediaTitle; 
      var mediaDate = req.body.mediaDate;
      // console.log('req.body.mediaDate:' + req.body.mediaDate);
      // console.log('mediaDate:' + mediaDate);
      // var myReminderTime = new Date(req.body.mediaReminderTime);
      // var myReminderDate = new Date(req.body.mediaReminderDate); 
      // console.log('req.body.mediaReminderTime: ' + req.body.mediaReminderTime)
      // console.log ('myReminderTime:'  + myReminderTime);
      // console.log ('myReminderDate:'  + myReminderDate);
      // var mediaReminderDate = new Date (myReminderDate.getFullYear(),myReminderDate.getMonth()+1,myReminderDate.getDate() , myReminderDate.getUTCHours(), myReminderDate.getUTCMinutes(), '0','0');
      // var mediaReminderDate = new Date (req.body.mediaReminderDate);
      // var myDate = new Date(mediaDate);

      console.log(myDate);
      
      // var mediaDateDay = myDate.getUTCDate();
      // if (mediaDateDay ==1){
      //   var mediaDateMonth =myDate.getMonth()+ 2;
      // }
      // else{
      //  var mediaDateMonth =myDate.getMonth()+ 1; 
      // }
      
      // var mediaDateYear =myDate.getFullYear();
      // var mediaImageUrl = req.body.mediaImageUrl; 
      var mediaDescription1 = req.body.mediaDescription1;
      var mediaDescription2 = req.body.mediaDescription2;
      var mediaDescription3 = req.body.mediaDescription3;
      // var mediaEnquiryContact = req.body.mediaEnquiryContact;
      // var mediaTime = req.body.mediaTime;

      // console.log ( 'media day is ' + mediaDateDay);
      // console.log ( 'media Month is ' + mediaDateMonth);
      // console.log ( 'media Year is ' + mediaDateYear);
   

      var newmedia = new media();
      
      newmedia.mediaTitle = mediamediaTitle;
      // newmedia.venue = mediaVenue;
      // newmedia.venueLong = mediaVenueLong;
      // newmedia.venueLat= mediaVenueLat;
      newmedia.date = mediaDate;
      // newmedia.reminderDate=mediaReminderDate;
      newmedia.imageURl = mediaImageUrl;
      // newmedia.dateDay = mediaDateDay;
      // newmedia.dateMonth = mediaDateMonth;
      // newmedia.dateYear = mediaDateYear;
      newmedia.description1 = mediaDescription1;
      newmedia.description2 = mediaDescription2;
      newmedia.description3 = mediaDescription3;
      // newmedia.enquiryContact = mediaEnquiryContact;
      
      // newmedia.material.image = media_material_image;
      // newmedia.material.video = media_material_video;

      newmedia.save(function(err) {
      
        if(!err) {
            res.json(201, {message: 'media created with date : ' + newmedia.date });
        } else {
          res.json(500, {message: 'Could not create media. Error: ' + err});
        }
      
      });
      
   
      
};




exports.getByID = function(req, res) {
  
  var id = req.params.id; // The id of the media the media you want to look up.
  console.log ( "getByID is " + req.params.id);
   media.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, { media: doc });
    } else if(err) {
      res.json(500, { message: "Error loading media ." + err});
    } else {
      res.json(404, { message: "media not found."});
    }
  });
} 

exports.show = function(req, res) {
  
  var myChannel = req.params.channel; // The id of the media the media you want to look up.
  
  media.find({mediaChannel: myChannel}, function(err, doc) {
    if(!err && doc) {
      res.json(200, { media: doc });
    } else if(err) {
      res.json(500, { message: "Error loading media ." + err});
    } else {
      res.json(404, { message: "media not found."});
    }
  });
} 



exports.delete = function(req, res, path) {
      
  var id = req.body.id;
  console.log("I got to this stage and id is " + id );

  
  media.findById(id, function(err, doc) {
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
      res.json(404, { message: "Could not find media."});
    } else {
      res.json(403, {message: "Could not delete media. " + err});
    }
  });
}


exports.deleteAll = function(req, res) {
      
  var myYear = req.body.year;
  media.find({dateYear: myYear }, function(err, doc) {
    if(!err && doc) {
      doc.remove({dateYear: myYear });
      res.json(200, { message: "Workout removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find media."});
    } else {
      res.json(403, {message: "Could not delete media. " + err});
    }
  });
}


// exports.delete = function(req, res) {
      
//   var id = req.body.id;
//   media.findById(id, function(err, doc) {
//     if(!err && doc) {
//       doc.remove();
//       var newmedia = new media();
//        //newmedia.remove( { "_id ": id }, 1 );
//       newmedia.remove({ _id : id});
//       console.log(newmedia.remove({ _id : id}));
//      // newmedia.removeById(id);

//       //db.inventory.remove( { type : "food" }, 1 )
//       res.json(200, { message: "media removed."});
//     } else if(!err) {
//       res.json(404, { message: "Could not find media."});
//     } else {
//       res.json(403, {message: "Could not delete media. " + err});
//     }
//   });
// }


exports.update = function(req, res) {
  
  var id = req.body.media_id;

      var mediamediaName = req.body.mediamediaName; 
      var mediaVenue = req.body.mediaVenue;
      var mediaVenueLong = req.body.mediaVenueLong;
      var mediaVenueLat = req.body.mediaVenueLat;
      var mediaDate = req.body.mediaDate;
      console.log('req.body.mediaDate:' + req.body.mediaDate);
      console.log('mediaDate:' + mediaDate);
      var myReminderTime = new Date(req.body.mediaReminderTime);
      var myReminderDate = new Date(req.body.mediaReminderDate); 
      // console.log('req.body.mediaReminderTime: ' + req.body.mediaReminderTime)
      // console.log ('myReminderTime:'  + myReminderTime);
      // console.log ('myReminderDate:'  + myReminderDate);
      // var mediaReminderDate = new Date (myReminderDate.getFullYear(),myReminderDate.getMonth()+1,myReminderDate.getDate() , myReminderDate.getUTCHours(), myReminderDate.getUTCMinutes(), '0','0');
      var mediaReminderDate = new Date (req.body.mediaReminderDate);
      var myDate = new Date(mediaDate);

      console.log(myDate);
      
      var mediaDateDay = myDate.getUTCDate();
      if (mediaDateDay ==1){
        var mediaDateMonth =myDate.getMonth()+ 2;
      }
      else{
       var mediaDateMonth =myDate.getMonth()+ 1; 
      }
      
      var mediaDateYear =myDate.getFullYear();
      var mediaImageUrl = req.body.mediaImageUrl; 
      var mediaDescription1 = req.body.mediaDescription1;
      var mediaDescription2 = req.body.mediaDescription2;
      var mediaDescription3 = req.body.mediaDescription3;
      var mediaEnquiryContact = req.body.mediaEnquiryContact;
      // var mediaTime = req.body.mediaTime;

      // var newmedia = new media();
      
      // newmedia.mediaName = mediamediaName;
      // newmedia.venue = mediaVenue;
      // newmedia.venueLong = mediaVenueLong;
      // newmedia.venueLat= mediaVenueLat;
      // newmedia.date = mediaDate;
      // newmedia.reminderDate=mediaReminderDate;
      // newmedia.imageURl = mediaImageUrl;
      // newmedia.dateDay = mediaDateDay;
      // newmedia.dateMonth = mediaDateMonth;
      // newmedia.dateYear = mediaDateYear;
      // newmedia.description1 = mediaDescription1;
      // newmedia.description2 = mediaDescription2;
      // newmedia.description3 = mediaDescription3;
      // newmedia.enquiryContact = mediaEnquiryContact;
      
      // newmedia.material.image = media_material_image;
      // newmedia.material.video = media_material_video;

      
      
  media.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.mediaName = mediamediaName;
        doc.venue = mediaVenue;
		    doc.date = mediaDate;
        doc.reminderDate= mediaReminderDate;
        doc.dateDay =
        doc.dateMonth=mediaDateMonth;
        doc.dateYear=mediaDateYear;
        doc.description1=mediaDescription1;
        doc.description2=mediaDescription2;
        doc.description3=mediaDescription3;
        // doc.material_image = media_material_image;
        // doc.material_video = media_material_image;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "media updated: " +
mediamediaName});
          } else {
            res.json(500, {message: "Could not update media. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find media."});
      } else {
        res.json(500, { message: "Could not update media. " +
err});
      }
    });
}
