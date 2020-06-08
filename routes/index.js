var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var {isUser} = require('../controllers/index')


// LANDING PAGE ROUTE=================================
router.get("/", function (req, res) {
   res.render("landing");
});

router.get("/register", function (req, res) {
   res.render("register");
});

router.post("/register", async (req, res) => {
   var newUser = await new User({
      username: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      email: req.body.email,
      address1: req.body.address1,
      address2: req.body.address2,
      zip: req.body.zip,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      phone: req.body.phone
   })

   const user = await User.register(newUser, req.body.password);
   req.login(user, function (err) {
      if (err) {
         req.flash('error', err);
         return res.redirect('/register');
      }
      req.flash('success', `Welcome, ${user.firstName} ${user.lastName}!`);
      const redirectUrl = req.session.redirectTo || '/deal';
      delete req.session.redirectTo;
      res.redirect(redirectUrl);
   });
});

router.get("/login", function (req, res) {
   res.render("login")
});

router.post("/login", async (req, res, next) => {
   const {
      username,
      password
   } = req.body;

   const {
      user,
      error
   } = await User.authenticate()(username, password);
   if (!user && error) {
      console.log(error)
      req.flash('error', "Wrong email or password!");
      return res.redirect('/login');
   }
   req.login(user, function (err) {
      if (err) return res.redirect('/login');
      req.flash('success', `Welcome back`);
      const redirectUrl = req.session.redirectTo || '/deal';
      delete req.session.redirectTo;
      res.redirect(redirectUrl);
   });
})

router.get("/logout", function (req, res) {
   req.logout();
   req.flash("success", "you've been succesfully logged out!");
   res.redirect("back");
});

router.get("/about", function (req, res) {
   res.render("about");
});

router.get("/user/:id", isUser, async(req, res, next)=> {
   let user = await User.findById(req.user.id);
   res.render('user', {user});
})

router.post("/user", isUser, async(req, res, next)=> {
   let user = await User.findByIdAndUpdate(req.user.id, req.body);
   res.redirect('/deal');
})

module.exports = router;