exports.isUser = async (req, res, next) => {
    if(req.user){
        return next();
    }
    req.flash("error", "Please log in");
    req.session.redirectTo = req.originalUrl;
    res.redirect("/login");
}

exports.isAdmin = async(req, res, next)=> {
    if(req.user.email = 'pence@gmail.com'){
        return next();
    } else {
        req.flash("error", "not admin");
        res.redirect('/deal');
    }
}