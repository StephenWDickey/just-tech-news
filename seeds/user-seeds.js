const { User } = require('../models');

const userData = [
    {
        username: 'TestTesterson',
        email: 'testtesterson@gmail.com',
        password: 'password123'
    },
    {
        username: 'CodyCoder',
        email: 'codycoder@gmail.com',
        password: 'thisisapassword'
    }]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;