
const router = require('express').Router();

const { User } = require('../../models');


///////////////////////////////////////////////////


// GET request for / endpoint
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    // findAll is a method from the Model class of Sequelize
    // it's like saying SELECT * FROM users
    User.findAll({
        // we pass this into findAll() method
        // we don't return password info for security
        attributes: { exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {

            console.log(err);

            res.status(500).json(err);

        });

});

// GET request for /:id endpoint
router.get('/:id', (req, res) => {
    // the findOne method gets one piece of data, it is a method
    // imported from Sequelize for the model class
    // we pass in an object as the argument
    // the where option is like saying SELECT * FROM users WHERE id = ?
    User.findOne({

        // we have two objects being passed in as arguments in findOne()
        // again, we want to protect password information
        attributes: {exclude: ['password']},

        // now we want to find the one data point that has this value
        where: {
            // we are focusing on id 
            id: req.params.id
        }
    })
        // if id is not attached to a user, we send 404
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//////////////////////////////////////


// POST request for / endpoint
router.post('/', (req, res) => {
    
    // create method is from sequelize's model class
    // we can pass in key/value pairs where the keys are those defined
    // in our User model
    // this is like writing INSERT INTO users (username, email, password)
    //                      VALUES ("user", "email", "password");
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});


///////////////////////////////////////
// *** remember an HTTP 500 error is different from 404
// *** 404 error means server has not found anything
// *** 400 error is a bad request, usually client side


// PUT request (update request) for user based on id
// remember this involves manipulating req.body as well as req.params
router.put('/:id', (req, res) => {

    // if req.body has exact key/value pairs to match the model, 
    // you can just use `req.body` instead
    // update method is from Sequelize's model class
    // we pass in req.body as 1st argument, then req.params.id as next
    // this is like SQL syntax of: UPDATE users
    //                             SET username = "user", email = "email", password = "password"
    //                             WHERE id = ?;
    User.update(req.body, {

        // because we used beforeUpdate() hook in User model
        // we must make individualHooks = true
        individualHooks: true,
        // we pass in object as argument, define id value as req.params.id
        where: {
            id: req.params.id
        }

    })
        .then(dbUserData => {

            // if no data is returned in our array, send 404
            if (!dbUserData[0]) {

                res.status(404).json({ message: 'No user found with this id' });
                
                return;
            }

            // send data as json
            res.json(dbUserData);
        })

            // if there's an error we will respond with 500 status
            .catch(err => {

                console.log(err);

                res.status(500).json(err);

            });
        
});


///////////////////////////////////////////////


// DELETE request for user based on id
router.delete('/:id', (req, res) => {

    // we use destroy method from Sequelize's model class
    // pass in object as argument, specify id as req.params.id
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            // if there is no data, send 404 status
            if (!dbUserData) {

                res.status(404).json({ message: 'No user found with this id' });
                
                return;
            }
            // send data as json
            res.json(dbUserData);
        })
        // if there's an error respond with 500 status
        .catch(err => {
            
            console.log(err);
            
            res.status(500).json(err);
        });
});


/////////////////////////////////////////////////////


module.exports = router;