// this file will serve as a culmination of all our models we create
// they will be exported for use

const User = require('./User');

const Post = require('./Post');


////////////////////////////////////////


// create associations

// the User can make many Posts, we use hasMany method
User.hasMany(Post, {
    // we reference our foreign key designation
    foreignKey: 'user_id'
});


// each Post can only have one User, we must define this reverse relationship
// we use belongsTo method
Post.belongsTo(User, {
    // we must reference our foreign key again
    foreignKey: 'user_id',
    onDelete: "cascade"
});


//////////////////////////////////////////


// export our models!
module.exports = { User, Post };