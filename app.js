var express = require('express');



var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');// Handler to permit Access-Control-Allow-Origin
// var braintree = require('braintree');


// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "xycp8rk96scpf7z6",
//   publicKey: "5zck8cxfbjdfhxvh",
//   privateKey: "2f80be8142ab4686c1a1ead92f4ca599"
// });


var mongoose = require('mongoose');
// var mongoose2 = require('mongoose');

var upload = require('jquery-file-upload-middleware');


var routes = require('./routes');
var users = require('./routes/user');
var events = require('./routes/event');

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
 var uri ='mongodb://127.0.0.1:27017/RCCG_DominionDB'

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




app.get('/', routes.index);
// app.get('/users', users.list);
app.get('/users', users.index);
app.get('/users/:id',users.show);
app.get('/userByEmail/:emailAddress',users.userByEmail);
app.get('/userProfile/:emailAddress',users.userProfile);

app.post('/user', users.create);
app.post ('/auth' , users.auth);

app.del('/users',users.delete);

app.put('/users', users.update);
app.put('/updateProfile1', users.updateProfile1);
app.put('/updateProfile2', users.updateProfile2);
app.put('/verify',users.verify);
app.put('/ResendVerificationCode',users.ResendVerificationCode);
app.put('/ResetPassCode',users.ResetPassCode);
app.put('/changepassword',users.changepassword);
// event Section

app.get('/events', events.index);
app.get('/events/:id',events.show);
app.post('/event', events.create);
app.del('/events', events.delete);
app.put('/events', events.update);


app.get('/sessionFinder/:id',users.sfinder);





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
//     res.redirect('/');
// });

app.put('/upload', function( req, res ){
    res.redirect('/');
});

app.delete('/upload', function( req, res ){
    res.redirect('/');
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

app.listen(3001);


module.exports = app;
