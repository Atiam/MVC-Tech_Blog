const router = require("express").Router();
const { User } = require("../../models");

// // GET ALL USERS // does not work with insomnia
// router.get('/', async (req, res) => {
//   try {
//       const userData = await User.findAll({
//           // attributes: {
//           //     exclude: ['password']
//           // }
//       });
//       res.status(200).json(userData);
//   } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//   }
// });





// CREATE A NEW USER /api/users
router.post("/", async (req, res) => {
  try {
    console.log('@controllers>api>user-routes.js --->',req.body.username);
    console.log('@controllers>api>user-routes.js ---> --->',req.body.password);
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    // Save session information after successfully creating the user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      // res.json(userData);
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});



// /api/users/login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    // Save session information only if the user is found and the password is valid
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

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

module.exports = router;