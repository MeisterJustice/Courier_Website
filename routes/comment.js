var express           = require("express"),
    router            = express.Router(),
    bodyParser        = require("body-parser"),
    Comment           = require("../models/comment"),
    expressSanitizer  = require("express-sanitizer"),
    Blog              = require("../models/blog"),
    User              = require("../models/user"),
    middleware        = require("../middleware/index"),
    expressSession    = require("express-session");
  
  
  
router.get("/blog/:id/comments/new", middleware.isLoggedIn, function(req, res){
   Blog.findById(req.params.id, function(err, blog){
      if(err){
          res.redirect("back");
      } else {
          res.render("comment", {blog: blog});
      }
   });
});  
    
router.post("/blog/:id/comments", middleware.isLoggedIn, function(req, res){
   Blog.findById(req.params.id, function(err, blog) {
      if(err){
         res.redirect("back");
      } else {
         Comment.create(req.body.blog, function(err, comment){
            if(err){
                console.log(err);
               res.redirect("back");
            } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               blog.comments.push(comment);
               blog.save();
               req.flash("success", "Thanks for your comment");
               res.redirect("/blog/" + req.params.id);
            }
         });
      }
   });
});    
    
router.get("/blog/:id/comments/:comment_id/edit", middleware.commentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, comment) {
       if(err){
          res.redirect("back");
       } else {
          res.render("comment_edit", {comment: comment, blog_id: req.params.id});
       }
   });
}); 

router.put("/blog/:id/comments/:comment_id", middleware.commentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.blog, function(err, comment){
      if(err) {
         res.redirect("back");
      } else {
         req.flash("success", "Your comment has been updated");
         res.redirect("/blog/" + req.params.id);
      }
   });
});

router.delete("/blog/:id/comments/:comment_id", middleware.commentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
         req.flash("error", err);
         res.redirect("back");
      } else {
         req.flash("success", "Comment Deleted");
         res.redirect("back");
      }
   });
});


    
module.exports = router;    