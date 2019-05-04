var express          = require("express"),
    mongoose         = require("mongoose");
    
var rateSchema = new mongoose.Schema({
   package: String,
   size: String,
   rate: Number,
   country: String,
   weight: Number
});  

module.exports = mongoose.model("Rate", rateSchema);