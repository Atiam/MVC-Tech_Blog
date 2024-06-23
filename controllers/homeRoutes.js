const router = require('express').Router();
const { User, Blog_post, Comment } = require("../models");
// const withAuthentication = require('./utils/loggedin.js');





router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Get blog posts for the homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog_post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blog_posts = blogData.map((blog_post) => blog_post.get({ plain: true }));

    // Pass the blog posts into the homepage template
    res.render('home', {
      blog_posts,
      logged_in: req.session.logged_in,
    });
     } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.post('/logout', (req, res) => {
  if (req.session.email) {
      req.session.destroy(() => {
          res.status(204).end();
          res.redirect('/');
      });
  } else {
      res.status(404).end();
  }
});


// //Middleware function to ensure user is authenticated
// function Authenticated(req, res, next) {
//   if (req.session.loggedIn) {
//       return next();
//   }
//   res.redirect('/login');
// }

module.exports = router;