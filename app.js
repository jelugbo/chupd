var express = require('express');



var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');// Handler to permit Access-Control-Allow-Origin
var braintree = require('braintree');





var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "xycp8rk96scpf7z6",
  publicKey: "5zck8cxfbjdfhxvh",
  privateKey: "2f80be8142ab4686c1a1ead92f4ca599"
});


var mongoose = require('mongoose');
// var mongoose2 = require('mongoose');

var upload = require('jquery-file-upload-middleware');


var routes = require('./routes');
var users = require('./routes/user');
var comments = require('./routes/comment');
var appointments = require('./routes/appointment');
var connections = require('./routes/connect');
var events = require('./routes/event');
var news = require('./routes/news');
var media = require('./routes/media');
var roles = require('./routes/role');
var department = require('./routes/department');
var channel = require('./routes/channel');
var cellgroup = require('./routes/cellgroup');
var group = require('./routes/group');
var devotions = require('./routes/devotion');
var ministry = require('./routes/ministry')
var channel = require('./routes/channel');
var pushNotification = require('./routes/pushNotification');
var im = require('imagemagick');


var app = express();
app.use(cors());

//var app = express();


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


// Data Manipulations
mongoose.connection.close();
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'mecs',
  pass: 'mecs'
}
var uri ='mongodb://127.0.0.1:27017/ChurchApp'; //,mongodb://localhost/event

if ('development'==app.get('env')){
    app.use(express.errorHandler());
    mongoose.connect(uri );
}


mongoose.connection.once('connected', function() {
  console.log("Connected to database")
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.use('/upload', upload.fileHandler());



 






// CRUD Invocation

        // Create Data
          app.post('/user', users.create);
          app.post('/comment', comments.create);
          app.post('/appointment', appointments.create);
          app.post('/connect', connections.create);
          app.post('/role', roles.create);
          app.post('/department', department.create)
          app.post('/channel', channel.create)
          app.post('/cellgroup', cellgroup.create)
          app.post('/group', group.create)
          app.post('/event', events.create);
          app.post('/news', news.create);
          app.post('/newsAndImage', news.newsWithImage);
          app.post ('/auth' , users.auth);
          app.post('/devotion', devotions.create);
          app.post('/ministry',ministry.create);
          app.post('/queryEvent', events.queryEvent);
          app.post('/pushmessage', pushNotification.pushNotification);
          app.post('/deviceRegistration',pushNotification.deviceRegistration);
          app.post('/pushMessageToIos', pushNotification.pushIosNotification);
 app.post('/pushToDevices', pushNotification.pushToDevices);
 app.post('/deviceById',pushNotification.devicesByID);
 app.post('/changePushSetting',pushNotification.updateAllowSource);
        // End of Create Data

        // Read Data
          app.get('/', routes.index);
          app.get('/users', users.index);
          app.get('/users/:id',users.show);
          app.get('/userByEmail/:emailAddress',users.userByEmail);
          app.get('/userProfile/:emailAddress',users.userProfile);
          app.get('/comments', comments.index);
          app.get('/appointment', appointments.index);
          app.get('/roles', roles.index);
          app.get ('/permission/:emailAddress' , users.permission);
          app.get('/pushNotification', events.pushNotification);
          app.get('/department',department.index);
          app.get('/channel',channel.index);
          app.get('/cellgroup',cellgroup.index);
          app.get('/group',group.index);
          app.get('/events', events.index);
          app.get('/news', news.index);
          app.get('/media', media.index);
          app.get('/events/:id',events.show);
          app.get('/sessionFinder/:id',users.sfinder);
          app.get('/devotion', devotions.index);
          app.get('/ministry',ministry.index);
          app.get('/channel',channel.index);
          app.get('/media/:channel',media.show);
          app.get('/selectmedia/:id',media.getByID);
           app.get('/devices',pushNotification.devices);
           app.get('/deviceById',pushNotification.devicesByID);
        // End OF Read

        // Update Data
          app.put('/users', users.update);
          app.put('/updateProfile1', users.updateProfile1);
          app.put('/updateProfile2', users.updateProfile2);
          app.put('/verify',users.verify);
          app.put('/ResendVerificationCode',users.ResendVerificationCode);
          app.put('/ResetPassCode',users.ResetPassCode);
          app.put('/changepassword',users.changepassword);
          app.put('/role', roles.update);
          app.put('/events', events.update);
          app.put('/department', department.update);
          app.put('/ministry', ministry.update);
          app.put('/group', group.update);
          app.put('/cellgroup', cellgroup.update);
        // End of Udate Data

        // Delete Data
          app.del('/users',users.delete);
          app.del('/events', events.delete);
          app.del('/eventsAll', events.deleteAll);
          app.del('/department',department.delete);
          app.del('/group',group.delete);
          app.del('/ministry',ministry.delete);
          app.del('/news' , function (req , res ){ news.delete(req , res , __dirname)});
          // app.del('/news',news.delete);
        // End of Delete Data


// End of CRUD Invocation













// configure upload middleware
  


// upload.configure({
//     uploadDir: __dirname + '/public/uploads/',
//     uploadUrl: '/uploads'
// });

/// Redirect all to home except post
app.get('/upload', function( req, res ){
    res.redirect('/');
    
    
});

// app.post('/upload', function( req, res ){
//     // res.redirect('/');
//   console.log (req.body.fileDescription);
//     res.json(201, {message: 'image uploaded' + req.body.fileDescription });
// });

app.put('/upload', function( req, res ){

    res.redirect('/');

});

app.delete('/upload', function( req, res ){
    res.redirect('/');

    // console.log(req.body.actionType);
    // if (req.body.actionType =='DeleteNews'){
    //     news.delete(req , res);
    //     console.log('worked')
    //   }

});

app.delete('/news', function( req, res ){
    // res.redirect('/');\

    console.log(req.body.actionType);
    if (req.body.actionType =='DeleteNews'){
        news.delete(req , res , __dirname);
        console.log('worked')
      }

});

app.delete('/media', function( req, res ){
    // res.redirect('/');\

    console.log(req.body.actionType);
    if (req.body.actionType =='DeleteMedia'){
        media.delete(req , res , __dirname);
        console.log('worked')
      }

});




app.use('/upload', function(req, res, next){
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/public/uploads/'
        },
        uploadUrl: function () {
            return '/uploads'
        }
    })(req, res, next);
});

// app.use('/list', function (req, res, next) {
//             upload.fileManager({
//                 uploadDir: function () {
//                     return __dirname + '/public/uploads/' + req.sessionID
//                 },
//                 uploadUrl: function () {
//                     return '/uploads/' + req.sessionID
//                 }
//             }).getFiles(function (files) {
//                 res.json(files);
//             });
//         });



upload.on('end', function (fileInfo, req, res) { 

  dirPath = __dirname;
 


  if (req.fields.actionType =='newsWithImage'){
        news.newsImage(fileInfo,req , res ,dirPath);
        console.log('saving news with image')
      }else if(req.fields.actionType =='mediaWithImage'){
        media.mediaImage(fileInfo,req , res,dirPath);
        console.log('Saving video information with image')
      }else if(req.fields.actionType =='channelWithImage'){
        try{
          console.log (req.fields);
        channel.createChannelWithImage(fileInfo,req , res ,dirPath);
        console.log('Saving channel information with image')
        }catch(err){
          console.log(err);
        }
      }
   });


app.get('/payment', function (req, res){
    res.render("braintree.ejs");
});

app.post("/create_customer", function (req, res) {
  var customerRequest = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    creditCard: {
      number: req.body.number,
      cvv: req.body.cvv,
      expirationMonth: req.body.month,
      expirationYear: req.body.year,
      billingAddress: {
        postalCode: req.body.postal_code
      }
    }
  };

  gateway.customer.create(customerRequest, function (err, result) {
    if (result.success) {
      res.send("<h1>Customer created with name: " + result.customer.firstName + " " + result.customer.lastName + "</h1>");
    } else {
      res.send("<h1>Error: " + result.message + "</h1>");
    }
  });
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}





// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});




// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(3000);


module.exports = app;
