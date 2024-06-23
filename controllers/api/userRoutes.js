const router = require("express").Router();
const { User, Blog_post, Comment } = require("../../models");
const withAuthentication = require(`../../utils/loggedin.js`);

// CREATE A NEW USER /api/users
router.post("/sighup", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    // Save session information after successfully creating the user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      // res.json(userData);
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});



// To login
// /api/users/login
router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted username address
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect user or password, please try again" });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect user or password, please try again" });
      return;
    }

     // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({
        user: userData,
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


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


// Create a new blog post
router.post(`/dashboard`, withAuthentication, async (req, res) => {
  if (req.session.logged_in) {
    //Retrieve the current user's ID from the session
    const user_id = req.session.user_id;
    if (user_id){
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
    } else{
      res.status(400).end(`User not find`);
    }
  } else {
    res.redirect("/login"); //Redirect to the login page if the user is not authenticated
  }
}); 

// Comment on a blog post
router.post(`/comment`, withAuthentication, async (req, res) => {
  if (req.session.logged_in) {
    //Retrieve the current user's ID from the session
    const user_id = req.session.user_id;
    if (user_id){
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
    } else{
      res.status(400).end(`User not find`);
    }
  } else {
    res.redirect("/login"); //Redirect to the login page if the user is not authenticated
  }
});


// Logout

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;