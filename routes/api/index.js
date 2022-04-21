// this index file will be a culmination of all our model routes
// we will then link it to our server.js file

// import router from Express.js
const router = require('express').Router();
// import our GET, POST, DELETE, and PUT requests for users
const userRoutes = require('./user-routes.js');


////////////////////////////////////////////////////////


// we write /users so all of our userRoutes endpoints have this before
router.use('/users', userRoutes);


////////////////////////////////////////////////////////


// we must export this file so it can be attached in server.js
module.exports = router;