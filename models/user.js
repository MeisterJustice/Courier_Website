var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
   firstName: {type: String, lowercase: true, trim: true},
   lastName: String,
   middleName: String,
   username: {type: String, lowercase: true, trim: true},
   password: String,
   email: {type: String, lowercase: true, trim: true, unique: true},
   address1: String,
   address2: String,
   zip: String,
   country: String,
   state: String,
   city: String,
   phone: String,
   phone2: String,
   checkbox: { type: Boolean, default: false }
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);