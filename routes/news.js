var express = require('../node_modules/express');
var app = express();
var path = require('path');
var fs = require('fs');

var news = require('../models/news').news;
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

exports.newsImage =function(imagedata, req , res){
// console.log(imagedata.url);
// console.log(imagedata);
// console.log(req);
var newsnewsTitle = req.fields.newsnewsTitle; 
      var newsDate = req.fields.newsDate;

      

      var newsDescription1 = req.fields.newsDescription1;
      var newsDescription2 = req.fields.newsDescription2;
      var newsDescription3 = req.fields.newsDescription3;
      var  newsImageUrl = imagedata.url;
      var newsImageName = imagedata.name;

      var newnews = new news();
      
      newnews.newsTitle = newsnewsTitle;

      newnews.date = newsDate;

      newnews.imageURl = newsImageUrl;
      newnews.imageName = newsImageName;

      newnews.description1 = newsDescription1;
      newnews.description2 = newsDescription2;
      newnews.description3 = newsDescription3;


      newnews.save(function(err) {
      
        if(!err) {
            res.json(201, {message: 'news created with date : ' + newnews.date });
        } else {
          console.log(err);
          res.json(500, {message: 'Could not create news. Error: ' + err});
        }
      
      });
      




}

exports.newsWithImage =function(req,res,next){
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
  news.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { news: docs });
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

  news.find({date: {$lt: end , $gte: start}}, function(err, docs) {
    if(!err) {
      res.json(200, { news: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}



exports.create = function(req, res) {
  
      // var newsDate = new Date();

      var newsnewsTitle = req.body.newsnewsTitle; 
      var newsDate = req.body.newsDate;
      // console.log('req.body.newsDate:' + req.body.newsDate);
      // console.log('newsDate:' + newsDate);
      // var myReminderTime = new Date(req.body.newsReminderTime);
      // var myReminderDate = new Date(req.body.newsReminderDate); 
      // console.log('req.body.newsReminderTime: ' + req.body.newsReminderTime)
      // console.log ('myReminderTime:'  + myReminderTime);
      // console.log ('myReminderDate:'  + myReminderDate);
      // var newsReminderDate = new Date (myReminderDate.getFullYear(),myReminderDate.getMonth()+1,myReminderDate.getDate() , myReminderDate.getUTCHours(), myReminderDate.getUTCMinutes(), '0','0');
      // var newsReminderDate = new Date (req.body.newsReminderDate);
      // var myDate = new Date(newsDate);

      console.log(myDate);
      
      // var newsDateDay = myDate.getUTCDate();
      // if (newsDateDay ==1){
      //   var newsDateMonth =myDate.getMonth()+ 2;
      // }
      // else{
      //  var newsDateMonth =myDate.getMonth()+ 1; 
      // }
      
      // var newsDateYear =myDate.getFullYear();
      // var newsImageUrl = req.body.newsImageUrl; 
      var newsDescription1 = req.body.newsDescription1;
      var newsDescription2 = req.body.newsDescription2;
      var newsDescription3 = req.body.newsDescription3;
      // var newsEnquiryContact = req.body.newsEnquiryContact;
      // var newsTime = req.body.newsTime;

      // console.log ( 'news day is ' + newsDateDay);
      // console.log ( 'news Month is ' + newsDateMonth);
      // console.log ( 'news Year is ' + newsDateYear);
   

      var newnews = new news();
      
      newnews.newsTitle = newsnewsTitle;
      // newnews.venue = newsVenue;
      // newnews.venueLong = newsVenueLong;
      // newnews.venueLat= newsVenueLat;
      newnews.date = newsDate;
      // newnews.reminderDate=newsReminderDate;
      newnews.imageURl = newsImageUrl;
      // newnews.dateDay = newsDateDay;
      // newnews.dateMonth = newsDateMonth;
      // newnews.dateYear = newsDateYear;
      newnews.description1 = newsDescription1;
      newnews.description2 = newsDescription2;
      newnews.description3 = newsDescription3;
      // newnews.enquiryContact = newsEnquiryContact;
      
      // newnews.material.image = news_material_image;
      // newnews.material.video = news_material_video;

      newnews.save(function(err) {
      
        if(!err) {
            res.json(201, {message: 'news created with date : ' + newnews.date });
        } else {
          res.json(500, {message: 'Could not create news. Error: ' + err});
        }
      
      });
      
   
      
};




exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the news the news you want to look up.
  
  news.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading news." + err});
    } else {
      res.json(404, { message: "news not found."});
    }
  });
} 



exports.delete = function(req, res, path) {
      
  var id = req.body.id;
  console.log("I got to this stage");

  
  news.findById(id, function(err, doc) {
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
      res.json(404, { message: "Could not find news."});
    } else {
      res.json(403, {message: "Could not delete news. " + err});
    }
  });
}


exports.deleteAll = function(req, res) {
      
  var myYear = req.body.year;
  news.find({dateYear: myYear }, function(err, doc) {
    if(!err && doc) {
      doc.remove({dateYear: myYear });
      res.json(200, { message: "Workout removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find news."});
    } else {
      res.json(403, {message: "Could not delete news. " + err});
    }
  });
}


// exports.delete = function(req, res) {
      
//   var id = req.body.id;
//   news.findById(id, function(err, doc) {
//     if(!err && doc) {
//       doc.remove();
//       var newnews = new news();
//        //newnews.remove( { "_id ": id }, 1 );
//       newnews.remove({ _id : id});
//       console.log(newnews.remove({ _id : id}));
//      // newnews.removeById(id);

//       //db.inventory.remove( { type : "food" }, 1 )
//       res.json(200, { message: "news removed."});
//     } else if(!err) {
//       res.json(404, { message: "Could not find news."});
//     } else {
//       res.json(403, {message: "Could not delete news. " + err});
//     }
//   });
// }


exports.update = function(req, res) {
  
  var id = req.body.news_id;

      var newsnewsName = req.body.newsnewsName; 
      var newsVenue = req.body.newsVenue;
      var newsVenueLong = req.body.newsVenueLong;
      var newsVenueLat = req.body.newsVenueLat;
      var newsDate = req.body.newsDate;
      console.log('req.body.newsDate:' + req.body.newsDate);
      console.log('newsDate:' + newsDate);
      var myReminderTime = new Date(req.body.newsReminderTime);
      var myReminderDate = new Date(req.body.newsReminderDate); 
      // console.log('req.body.newsReminderTime: ' + req.body.newsReminderTime)
      // console.log ('myReminderTime:'  + myReminderTime);
      // console.log ('myReminderDate:'  + myReminderDate);
      // var newsReminderDate = new Date (myReminderDate.getFullYear(),myReminderDate.getMonth()+1,myReminderDate.getDate() , myReminderDate.getUTCHours(), myReminderDate.getUTCMinutes(), '0','0');
      var newsReminderDate = new Date (req.body.newsReminderDate);
      var myDate = new Date(newsDate);

      console.log(myDate);
      
      var newsDateDay = myDate.getUTCDate();
      if (newsDateDay ==1){
        var newsDateMonth =myDate.getMonth()+ 2;
      }
      else{
       var newsDateMonth =myDate.getMonth()+ 1; 
      }
      
      var newsDateYear =myDate.getFullYear();
      var newsImageUrl = req.body.newsImageUrl; 
      var newsDescription1 = req.body.newsDescription1;
      var newsDescription2 = req.body.newsDescription2;
      var newsDescription3 = req.body.newsDescription3;
      var newsEnquiryContact = req.body.newsEnquiryContact;
      // var newsTime = req.body.newsTime;

      // var newnews = new news();
      
      // newnews.newsName = newsnewsName;
      // newnews.venue = newsVenue;
      // newnews.venueLong = newsVenueLong;
      // newnews.venueLat= newsVenueLat;
      // newnews.date = newsDate;
      // newnews.reminderDate=newsReminderDate;
      // newnews.imageURl = newsImageUrl;
      // newnews.dateDay = newsDateDay;
      // newnews.dateMonth = newsDateMonth;
      // newnews.dateYear = newsDateYear;
      // newnews.description1 = newsDescription1;
      // newnews.description2 = newsDescription2;
      // newnews.description3 = newsDescription3;
      // newnews.enquiryContact = newsEnquiryContact;
      
      // newnews.material.image = news_material_image;
      // newnews.material.video = news_material_video;

      
      
  news.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.newsName = newsnewsName;
        doc.venue = newsVenue;
		    doc.date = newsDate;
        doc.reminderDate= newsReminderDate;
        doc.dateDay =
        doc.dateMonth=newsDateMonth;
        doc.dateYear=newsDateYear;
        doc.description1=newsDescription1;
        doc.description2=newsDescription2;
        doc.description3=newsDescription3;
        // doc.material_image = news_material_image;
        // doc.material_video = news_material_image;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "news updated: " +
newsnewsName});
          } else {
            res.json(500, {message: "Could not update news. " +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: "Could not find news."});
      } else {
        res.json(500, { message: "Could not update news. " +
err});
      }
    });
}
