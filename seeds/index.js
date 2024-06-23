const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const blog_post_seed = require('./blog_post_seed');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- Users SEEDED -----\n');

  await blog_post_seed();
  console.log('\n----- BLOG POSTS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();