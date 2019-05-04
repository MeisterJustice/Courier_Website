var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// LANDING PAGE ROUTE=================================
router.get("/", function(req, res){
   res.render("landing"); 
});

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username})
   User.register(newUser, req.body.password, function(err, user){
      if(err){
         req.flash("error", err.message);
         return res.redirect("back");
      }
          passport.authenticate("local")(req, res, function(){
             req.flash("success", "We're excited to meet you, " + user.username);
             res.redirect("/blog"); 
          });
   });
});

router.get("/login", function(req, res) {
   res.render("login") 
});

router.post("/login", passport.authenticate("local", {
   successRedirect: "/",
   failureRedirect: "/login"
}), function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "you've been succesfully logged out!");
    res.redirect("back");
});

router.get("/about", function(req, res) {
   res.render("about"); 
});

module.exports = router;