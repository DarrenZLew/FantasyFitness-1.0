const Sequelize = require('sequelize');

// Connecting to the database, test connection
let dbUri = (process.env.DATABASE_URL || require('../config').dbUri);
const sequelize = new Sequelize(dbUri);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Import models and sync them
const User = require('./user.js')(sequelize, Sequelize);

User.sync();

module.exports = {
  User,
}