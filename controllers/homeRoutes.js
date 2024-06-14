const router = require('express').Router();
const { User } = require('../models')

//localhost:3001
router.get('/', async (req, res) => {
  res.render('all');
}); 



router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  // }
  res.render('login');
});



router.get('/signup', (req, res) => {
  // if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  // }
  res.render('signup');
});



router.get('*', (req, res) => {
  res.status(404).send("Are you lost?");
  
})
module.exports = router;