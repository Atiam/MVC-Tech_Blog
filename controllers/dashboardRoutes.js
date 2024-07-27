const router = require('express').Router();
const { User, Blog_post, Comment } = require("../models");
const withAuthentication = require('../utils/loggedin.js');

// need to have my dashboard routes if I am logged in.

// create aroute to display the dashboard and all the blog posts that the user has created


// create a route to display a single post if I want to update or delete the post

// create a route to display the create post page
router.get('/new', withAuthentication,  (req, res) => {
    res.render('new-post');
  });


module.exports = router;