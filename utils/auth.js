// require the User to login
const withAuth = (req, res, next) => {

  // If the User has not logged in
  // redirect the request to the login page

  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};


module.exports = withAuth;
