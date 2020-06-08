var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
   name: String,
   weight: String,
   reference: String,
   country: String,
   personName: String,
   rank: String,
   image: String,
   price: Number,
   created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Product", productSchema);