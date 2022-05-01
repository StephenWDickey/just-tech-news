const router = require('express').Router();


const sequelize = require('../config/connection');

const { Post, User, Comment, Vote } = require('../models');



////////////////////////////////////////////////////////////////////



router.get('/', (req, res) => {

    // console log the session variables
    console.log(req.session);

    // we want to retrive all our posts
    // on our homepage
    // we include our comment model and user model

    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {

            // pass a single post object into the homepage template

            // with our template engine (handlebars)
            // we can render a template!
            // we are rendering a template called homepage
            // we can find this template in the views folder
            // res.render accepts a second argument
            // it receieves a json object with data to pass to template
            // we take a 'post' object and pass it to
            // homepage.handlebars


            // we must use .get method of sequelize
            // sequelize's get method gives us the data we need from sequelize object


            // we must 'serialize' the array of posts for the template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // we dont need 2nd argument for render method
    // because we dont need any variables
    res.render('login');
});




router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
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
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        // we want to pass in session variable because
        // we only want upvote button and comment form to appear
        // if the user is logged in
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


/////////////////////////////////////////////////////////


module.exports = router;