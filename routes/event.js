'use strict';

var event = require('../models/event').event;
      
exports.index = function(req, res) {
  event.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { event: docs });
    } else {
      res.json(500, { message: err });
    }
  });
};


exports.create = function(req, res) {
  

      var EventEventName = req.body.EventEventName; 
      var EventVenue = req.body.EventVenue; 
      var EventDate = req.body.EventDate; 
      var myDate = new Date(EventDate);
      var EventDateDay = myDate.getDate();
      var EventDateMonth =myDate.getMonth()+ 1;
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
      newevent.date = EventDate;
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
      res.json(500, { message: 'Error loading event.' + err});
    } else {
      res.json(404, { message: 'event not found.'});
    }
  });
}; 



exports.delete = function(req, res) {
      
  var id = req.body.id;
  event.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: 'Workout removed.'});
    } else if(!err) {
      res.json(404, { message: 'Could not find Event.'});
    } else {
      res.json(403, {message: 'Could not delete Event. ' + err});
    }
  });
};






exports.update = function(req, res) {
  
  var id = req.body.EventId;

  var EventEventName = req.body.EventEventName; 
  var EventVenue = req.body.EventVenue;
  var EventDate = req.body.EventDate; 
  // var EventTime = req.body.EventTime;
  
      
  event.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.eventName = EventEventName;
        doc.venue = EventVenue;
		    doc.date = EventDate;
        doc.save(function(err) {
          if(!err) {
            res.json(200, {message: 'event updated: ' +
EventEventName});
          } else {
            res.json(500, {message: 'Could not update event. ' +
err});
          }
        });
      } else if(!err) {
        res.json(404, { message: 'Could not find event.'});
      } else {
        res.json(500, { message: 'Could not update event. ' +
err});
      }
    });
};
