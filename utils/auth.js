

// authguard middleware
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
        // if the user is logged in, then the middleware
        // will allow the next function to proceed
        next();
    }
  };
  
  module.exports = withAuth