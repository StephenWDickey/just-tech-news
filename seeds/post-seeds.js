const { Post } = require('../models');

const postData = [
    {

        post_url: 'coolpost.com',
        title: 'Check out this cool post!',
        user_id: 1
    },
    {
        post_url: 'interestingpost.com',
        title: 'Another interesting post.',
        user_id: 1
    },
    {
        post_url: 'odetocoding.com',
        title: 'An Ode to Coding',
        user_id: 1
    }]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;