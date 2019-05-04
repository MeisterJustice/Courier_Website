var express           = require("express"),
    router            = express.Router(),
    expressSanitizer  = require("express-sanitizer"),
    Blog              = require("../models/blog"),
    User              = require("../models/user"),
    Comment           = require("../models/comment"),
    middleware        = require("../middleware/index");

// BLOG PAGE ROUTE=======================================
router.get("/blog", function(req, res){
   Blog.find({}, function(err, blogs){
      if(err){
         res.redirect("back");
      } else{
         res.render("blog", {blogs: blogs});
      }
   });
});

router.get("/blog/:id", function(req, res) {
   Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
      if(err){
         res.redirect("back");
      } else{
         res.render("show", {blog: foundBlog});
      }
   });
});

// Edit route
router.get("/blog/:id/edit", middleware.isLoggedIn, function(req, res) {
   Blog.findById(req.params.id, function(err, editBlog){
      if(err){
         res.redirect("back");
      } else{
         res.render("edit", {blog: editBlog});
      }
   }); 
});

router.put("/blog/:id", function(req, res){
   req.body.blog.description = req.sanitize(req.body.blog.description);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
      if(err){
         res.redirect("back");
      } else{
         res.redirect("/blog/" + req.params.id);
      }
   });
});

router.delete("/blog/:id", function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err){
      if(err) {
         res.redirect("back");
      } else {
         res.redirect("/blog");
      }
   });
});

module.exports = router;