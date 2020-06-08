exports.isUser = async (req, res, next) => {
    if(req.user){
        return next();
    }
    req.flash("error", "Please log in");
    req.session.redirectTo = req.originalUrl;
    res.redirect("/login");
}