// this is our 'master file' that will import all of our routes
// we dont need to import models because those are being used
// in our routes files, not here

const express = require('express');

// we import all of our routes with the /routes folder
const routes = require('./routes');

// we must import our connection to the database
const sequelize = require('./config/connection');

// import express method so we can chain other methods to it
// this is our main instance of the express server running, all other
// files will need to use router(), beacuse using app would created
// a new server! not use the existing one
const app = express();

// we make our PORT variable OR 3001
const PORT = process.env.PORT || 3001;


////////////////////////////////////////////////////////////


// middleware expressions
// we use json data for req.body
app.use(express.json());
// we accept arrays/objects within arrays/objects
app.use(express.urlencoded({ extended: true }));


////////////////////////////////////////////////////////////////


// turn on routes
app.use(routes);


//////////////////////////////////////////////////////////////////


// turn on connection to db and server
// sync method is a Sequelize method, it is like app.listen for the db
// the we write our actual app.listen expression for the server
// force: true would drop and recreate all of our tables on startup
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});