const  { User } = require('./models');

const userdata = [
  {
    username: 'tiam',
    password: 'password12345'
  }

];

const seedUsers = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports =  seedUsers;