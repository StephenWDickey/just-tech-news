// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// import dotenv module, config method uses .env file
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize('just_tech_news_db', 'root', 'Splinter_6', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;