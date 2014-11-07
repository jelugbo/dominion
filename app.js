'use strict';

// Node package declarations
    var express = require('express');
    var path = require('path');
    var favicon = require('static-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    // var nodemailer = require('nodemailer');
    var cors = require('cors');
    var mongoose = require('mongoose');
    var upload = require('jquery-file-upload-middleware');


// Section for routes
    // var routes = require('./routes');
    var routes = require('./routes/index');
    var users = require('./routes/users');
    var events = require('./routes/event');


    var app = express();


// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(cors());

    app.use('/upload', function(req, res, next){
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/public/uploads/';
        },
        uploadUrl: function () {
            return '/uploads';
        }
        })(req, res, next);
    });



    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', routes);
    app.use('/users', users);
    app.use('/upload', upload.fileHandler());

// My development Section

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

     mongoose.connection.close();
        // var options = {
        //   db: { native_parser: true },
        //   server: { poolSize: 5 },
        //   replset: { rs_name: 'myReplicaSetName' },
        //   user: 'mecs',
        //   pass: 'mecs'
        // };
        var uri ='mongodb://127.0.0.1:27017/RCCG_DominionDB'; //,mongodb://localhost/event

        if ('development'===app.get('env')){
            //app.use(express.errorHandler());
            mongoose.connect(uri );
        }


        mongoose.connection.once('connected', function() {
          console.log('Connected to database');
        });

// My Api Method access point

    // All get Methods
         // app.get('/', routes.index);
         //app.get('/users', users.index);
         //app.get('/users/:id',users.show);
         // app.get('/userByEmail/:emailAddress',users.userByEmail);
         // app.get('/userProfile/:emailAddress',users.userProfile);
         app.get('/events', events.index);
         app.get('/events/:id',events.show);
         
         // app.get('/upload', function( req, res ){
         //    res.redirect('/');
         // });

    // All post Methods
         app.post('/event', events.create);

    // All put Methods

    // All delete Methods 



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
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
            next();
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
        next();
    });



    module.exports = app;
