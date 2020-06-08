var express           = require("express"),
    router            = express.Router(),
    Blog              = require("../models/blog"),
    User              = require("../models/user"),
    middleware        = require("../middleware"),
    Covid = require('../models/covid');
    
    
// DEAL PAGE ROUTE==================================
router.get("/deal", async(req, res) =>{
   let covid = await Covid.find({});
   let blog = await Blog.find({});
   res.render("deal", {covid, blog}); 
});

router.get("/deal/rates", function(req, res){
   res.render("rates"); 
});
    
    
module.exports = router;    