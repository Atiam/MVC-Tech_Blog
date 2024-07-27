const router = require('express').Router();
const { Comment } = require("../../models");
const withAuthentication = require('../../utils/loggedin.js');

// Comment on a blog post
router.post(`/`, withAuthentication, async (req, res) => {
  
    //Retrieve the current user's ID from the session
    const user_id = req.session.user_id;
   
      //Create a new comment with the user_id
      Comment.create({
        content: req.body.content,
        blog_post_id: req.body.blog_post_id,
        user_id,
      })
        .then((dbCommentData) => {
          res.json(dbCommentData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    
});

module.exports = router;