var express           = require("express"),
    router            = express.Router(),
    bodyParser        = require("body-parser"),
    // expressSanitizer  = require("express-sanitizer"),
    Blog              = require("../models/blog"),
    User              = require("../models/user"),
    Rate              = require("../models/rate"),
    Country           = require("../models/country"),
    middleware        = require("../middleware");
    
    
// dashboard==============================
router.get("/dashboard", function(req, res) {
   res.render("dashboards");
});

//  BLOG POST
router.get("/dashboard/new", middleware.isLoggedIn, function(req, res) {
   res.render("newPost"); 
});

router.post("/dashboard", function(req, res){
   Blog.create(req.body.blog, function(err, createPost){
      if(err){
         res.redirect("back");
      } else{
         res.redirect("/blog");
      }
   });
});

// RATES
router.get("/dashboard/rates", function(req, res){
   Rate.find({}, function(err, found){
      if(err){
         res.redirect("back");
      } else {
         res.render("rates", {pack: found});
      }
   });
});

router.get("/dashboard/rates/package/table", function(req, res) {
   res.render("packageRate");
});

router.post("/dashboard/rates/package", function(req, res){
   Rate.create(req.body.pack, function(err, pack){
      if(err){
         console.log(err + "before post")
         return res.redirect("back");
      } 
         res.redirect("/dashboard/rates");
   });
});

router.delete("/dashboard/rates/package", function(req, res){
   Rate.remove({}, function(err) {
      if(err) {
         res.redirect("back");
      } else {
         res.redirect("back");
      }
   });
});

// EDITING PACKAGE======================================================================================
router.get("/dashboard/rates/package/:package_id/edit", function(req, res) {
   Rate.findById(req.params.package_id, function(err, found) {
      if(err) {
         res.redirect("back");
      } else {
         res.render("packageRateEdit", {package: found, pack_id: req.params.package_id});
      }
   });
});

router.put("/dashboard/rates/package/:package_id", function(req, res){
   Rate.findByIdAndUpdate(req.params.package_id, req.body.pack, function(err, found){
      if(err){
         return res.redirect("back");
      }
      res.redirect("/dashboard/rates");
   });
});

router.delete("/dashboard/rates/package/:package_id", function(req, res){
   Rate.findByIdAndRemove(req.params.package_id, function(err){
      if(err){
         res.redirect("back");
      } else {
         res.redirect("/dashboard/rates");
      }
   });
});
// ================================================================================================
// COUNTRY==========================================
router.get("/dashboard/rates/country/table", function(req, res) {
   res.render("countryRate");
});

router.post("/dashboard/rates/country", function(req, res){
   Country.create(req.body.pack, function(err, pack){
      if(err){
         return res.redirect("back");
      } 
         res.redirect("/dashboard/rates");
   });
});

router.delete("/dashboard/rates/country", function(req, res){
   Country.remove({}, function(err) {
      if(err) {
         res.redirect("back");
      } else {
         res.redirect("back");
      }
   });
});



module.exports = router;    