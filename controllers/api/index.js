const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const blogRoutes = require('./blogPostRoutes.js');
const commentRoutes = require('./commentRoutes.js');


router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);


module.exports = router;