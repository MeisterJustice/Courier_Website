var express           = require("express"),
    router            = express.Router(),
    Blog              = require("../models/blog"),
    User              = require("../models/user"),
    middleware        = require("../middleware");
    
    
// DEAL PAGE ROUTE==================================
router.get("/deal", function(req, res) {
   res.render("deal"); 
});

router.get("/deal/rates", function(req, res){
   res.render("rates"); 
});
    
    
module.exports = router;    