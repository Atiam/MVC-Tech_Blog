const sequelize = require('../config/connection');
const seedUsers = require('./userSeedData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  

  process.exit(0);
};

seedDatabase();