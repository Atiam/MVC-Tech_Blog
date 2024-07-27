const router = require('express').Router();
const { User, Blog_post, Comment } = require("../models");



//Route do display  logged in user's blog posts
router.get(`/dashboard`, withAuthentication, async (req, res) => {
  if (req.session.logged_in) {
    //Retrieve the current user's ID from the session
    const user_id = req.session.user_id;
    if (user_id){
      //Find the blog posts belonging to the logged in user
      Blog_post.findAll({
        where: {
          user_id,
        },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      })
        .then((dbBlogData) => {
          //Serialize data so the template can read it
          const blog_posts = dbBlogData.map((blog_post) => blog_post.get({ plain: true }));
          //Pass the blog posts into the homepage template
          res.render("dashboard", {
            blog_posts,
            logged_in: true,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    } else{
      res.status(400).end(`User not find`);
    }
  } else {
    res.redirect("/login"); //Redirect to the login page if the user is not authenticated
  }
});

module.exports = router;