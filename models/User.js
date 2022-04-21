
// import Model class, DataTypes object from Sequelize module
const { Model, DataTypes } = require('sequelize');

// we require our connection to our db
const sequelize = require('../config/connection');

// create our User model
// extends from sequelize model class
class User extends Model {}

// define table columns and configuration
// initializes mode's data/configuration
// two arguments: first argument defines columns and datatypes
// second argument configures options for the table
User.init(
    {
    // define an id column
    id: {
        // use the special Sequelize DataTypes object provide 
        // what type of data it is, INTEGER***
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key****
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
    },
    // define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // define an email column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // there cannot be any duplicate email values in this table
        unique: true,
        // if allowNull is set to false, we can run our data through validators before creating the table data
        validate: {
        isEmail: true
        }
    },
    // define a password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        // this means the password must be at least four characters long
        len: [4]
        }
    }
    },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);


// we must export our User model
module.exports = User;