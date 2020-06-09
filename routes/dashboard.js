var express           = require("express"),
    router            = express.Router(),
    bodyParser        = require("body-parser"),
    // expressSanitizer  = require("express-sanitizer"),
    Product              = require("../models/product"),
    Card              = require("../models/card"),
    Rate              = require("../models/rate"),
    Country           = require("../models/country"),
    middleware        = require("../middleware");

    var {isUser, isAdmin}= require('../controllers/index');
    
    
// dashboard==============================
router.get("/admin", isUser, isAdmin, async(req, res) => {
    let products = await Product.find({})
    let cards = await Card.find({}).populate('user').exec();
   res.render("dashboards", {products, cards});
});

module.exports = router;    