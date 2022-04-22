

// import Model class and DataTypes method from sequelize
const { Model, DataTypes } = require('sequelize');


// import connection to db
const sequelize = require('../config/connection');



//////////////////////////////////////////////////////////


// create our Post model
class Post extends Model {}



// create fields/columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //***here is our PRIMARY KEY
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {

            type: DataTypes.INTEGER,

            //***here is our FOREIGN KEY, it references the user table
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
    
        sequelize,

        freezeTableName: true,
    
        underscored: true,
    
        modelName: 'post'
    }
);


////////////////////////////////////////////////////////////


// export the Post model
module.exports = Post;