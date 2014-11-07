var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
      
var userSchema = new Schema({
   
    email_address : { type: String, required: true, trim: true,
index: { unique: true } }
	, first_name : { type: String, required: true }
  , last_name : { type: String, required: true }
  , gender : { type: String, required: false }
  , password : { type: String, required: true }
  , resetCode : { type: String, required: true }
  , phone_number : { type: String, required: false }
  , address : {type :String, required: false}
  , marrital_Status: {type:String, required:false}
  ,anniversary_date: {type:String, required:false}
  ,imageurl: {type:String}
  ,birthdate: {type: Date }
  , address : { type: String, required: false }
  ,publishBirthday: {type: Boolean , required:false, default:false }
  ,verificationCode:{type: String}
  ,vstate: {type: Boolean , required: true ,default: false}
  ,account_type: {type: String, required:true, default: "user"}
  ,accountstate: {type: Boolean , required: true ,default: true}
  ,date_created : { type: Date, required: true, default: Date.now}

});
      
var user = mongoose.model('user', userSchema);
      
module.exports = {
  user: user
};