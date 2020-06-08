var mongoose = require("mongoose");

var covidSchema = new mongoose.Schema({
   name: String,
   body: String,
   created: {type: Date, default: Date.now},
});
module.exports = mongoose.model("Covid", covidSchema);