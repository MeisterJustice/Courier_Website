var express          = require("express"),
    mongoose         = require("mongoose");
    
var countrySchema = new mongoose.Schema({
   country: String,
   rate: Number
});  

module.exports = mongoose.model("Country", countrySchema);