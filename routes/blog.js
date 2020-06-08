var express           = require("express"),
    router            = express.Router(),
    expressSanitizer  = require("express-sanitizer"),
    Blog              = require("../models/blog"),
    User              = require("../models/user"),
    Comment           = require("../models/comment"),
    middleware        = require("../middleware/index");

// BLOG PAGE ROUTE=======================================

router.get('/blog', async (req, res)=> {
   let blog = await Blog.find({});
   res.render("blog", {blog});
})

router.get("/blog/:id", function(req, res) {
   Blog.findById(req.params.id).populate("comments").exec(function(err, blog){
      if(err){
         res.redirect("back");
      } else{
         res.render("show", {blog: blog});
      }
   });
});

router.post('/blog', async (req, res) => {
   let blog = await Blog.create(req.body);

   res.redirect('/admin');
})

module.exports = router;