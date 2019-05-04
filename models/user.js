var mongoose                  = require("mongoose");
var passportLocalMongoose     = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
   firstName:  String,
   lastName:   String,
   middleName: String,
   username:   String,
   password:   String,
   email:      String,
   address:    String,
   apt:        String,
   country:    String,
   checkbox: {type: Boolean, default: false}
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);