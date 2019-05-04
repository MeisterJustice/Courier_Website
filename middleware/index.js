var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login");
    res.redirect("/login");
}

middlewareObj.commentOwnership = function(req, res, next){
    if(req.isAuthenticated){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               req.flash("error", "Comment not found");
               res.redirect("back");
           } else {
               if(foundComment.author.id.equals(req.user._id)){
                  return next();
            } else {
                req.flash("error", "You don't have access to that comment");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;
