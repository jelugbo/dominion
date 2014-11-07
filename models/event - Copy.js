'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var eventSchema = new Schema({
   
  eventName: {type:String, required:true}
  ,venue: {type: String , required:true}
  ,date: {type:Date , required:true}
  ,dateDay: {type:String , required: false }
  ,dateMonth: {type:String , required: false }
  ,dateYear: {type:String , required: false }
  ,imageURl: {type:String , required: false }
  ,videoURL: {type:String, required:false}
  ,description1: {type: String, required:false}
  ,description2: {type: String, required:false}
  ,description3: {type: String, required:false}
  ,enquiryContact : {type: String, required:false}
});
      
var event = mongoose.model('event', eventSchema);
      
module.exports = {

  event: event
};