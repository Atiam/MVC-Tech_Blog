const router = require('express').Router();
const { User, Blog_post, Comment, dashboard } = require("../../models");
const withAuthentication = require('../../utils/loggedin.js');

// Create a new blog post
router.post(`/`, withAuthentication,  (req, res) => {

    //Retrieve the current user's ID from the session
    const user_id = req.session.user_id;
   
      //Create a new blog post with the user_id
      Blog_post.create({
        title: req.body.title,
        content: req.body.content,
        user_id,
      })
        .then((dbBlogData) => {
          res.json(dbBlogData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      
    
    
  
}); 

// create the route to update the blog post

// create the route to delete the blog post

module.exports = router;