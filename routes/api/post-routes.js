


const router = require('express').Router();


const { Post, User } = require('../../models');


///////////////////////////////////////////////////////


// get all posts (posts/)
router.get('/', (req, res) => {

    // use findAll method (like SELECT * FROM posts)
    Post.findAll({

        // we pass in our post attributes that we defined in Post.js
        // created_at is auto-generated
        attributes: ['id', 'post_url', 'title', 'created_at'],

        // we want to include our User table
        // we have it give us the username attribute from the user table
        // include: is like saying JOIN in SQL
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))

        .catch(err => {

            console.log(err);

            res.status(500).json(err);

        });
});


// GET request for single post, based on id
router.get('/:id', (req, res) => {
    // findOne method
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        // order will allow us to designate how the posts are ordered
        // here we put them in descending order based on creation time
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


/////////////////////////////////////////////////////////


// POST request for posts/ endpoint
router.post('/', (req, res) => {
    // user create method to create post
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



////////////////////////////////////////////////////////////


// PUT request for posts/:id endpoint
router.put('/:id', (req, res) => {
    // update method for PUT requests
    Post.update(
        {
        title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//////////////////////////////////////////////////////////


// DELETE request for posts/:id endpoint
router.delete('/:id', (req, res) => {
    // destroy method for deletion
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/////////////////////////////////////////////////////////


module.exports = router;