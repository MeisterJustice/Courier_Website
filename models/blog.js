var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   created: {type: Date, default: Date.now},
   author: String,
   comments: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Comment"
          }
       ]
});
module.exports = mongoose.model("Blog", blogSchema);