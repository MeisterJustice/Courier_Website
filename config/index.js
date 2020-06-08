const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local');

module.exports = (passport) => {
    passport.use(User.createStrategy());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}