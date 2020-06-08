var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    flash = require("connect-flash"),
    favicon = require('serve-favicon'),
    path = require('path'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),

    Blog = require("./models/blog"),
    User = require("./models/user"),
    Rate = require("./models/rate"),
    Country = require("./models/country"),
    Comment = require("./models/comment");


var dashboardRoutes = require("./routes/dashboard"),
    dealRoutes = require("./routes/deal"),
    blogRoutes = require("./routes/blog"),
    indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comment"),
    covidRoutes = require('./routes/covid');


// mongoose.connect("mongodb://localhost:27017/justice_courier", { 
//     useNewUrlParser: true , 
//     useUnifiedTopology: true,
//     useCreateIndex: true
// });

mongoose.connect("mongodb+srv://friday:wiseman@cluster0-cr5cs.mongodb.net/<friday>?retryWrites=true&w=majority", { 
    useNewUrlParser: true , 
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {
    console.log('db connected')
});



app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(expressSanitizer());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ===============================
// PASSPORT CONFIG
// ============================
app.use(require("express-session")({
    secret: "Nickname Meister",
    resave: false,
    saveUninitialized: false
}));


// passpor config
app.use(passport.initialize());
app.use(passport.session());
require('./config')(passport);

// for header login signin shows
app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(blogRoutes);
app.use(dealRoutes);
app.use(dashboardRoutes);
app.use(commentRoutes);
app.use(covidRoutes);

const port = 3000;

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))