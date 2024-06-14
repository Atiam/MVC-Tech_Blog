const  { User } = require('../models');

const userdata = [
  {
    username: 'Sal',
    password: 'password12345'
  }

];

const seedUsers = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

// const seedUsers = () => User.bulkCreate(userdata);

console.log(User); // Check if User is undefined
console.log(require('../models')); // Check the structure of the imported object


module.exports =  seedUsers;