var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {
 
 
    app.get('/signup', authController.signup);
 
 
    app.get('/signin', authController.signin);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup'
        }
 
    ));

    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signin'
        }
 
    )); 

    app.get('/logout', authController.logout); 	

    app.get('/dashboard', isLoggedIn, authController.dashboard);
 
 	app.get('/savedArticles', isLoggedIn, authController.savedArticles);

    // search page
    app.get('/search', isLoggedIn, authController.search);

    // search page after form submit with appended querystring
    app.get('/search&search=:search&pageSize=:pageSize&page=:page', isLoggedIn, authController.fetchApi);

    // find all users endpoint
    app.get('/users', isLoggedIn, authController.findAllUsers);

    // find single user endpoint
    app.get('/users/:id', isLoggedIn, authController.findOneUser);

    // create new user endpoint
	app.post('/users', isLoggedIn, authController.createUser); 
 
 	// delete user
	app.delete('users/:id', isLoggedIn, authController.deleteUser);

	// find all articles
	app.get('/articles', isLoggedIn, authController.findAllArticles);

	// find individual article
	app.get('/articles/:id', isLoggedIn, authController.findOneArticle);

	// create new article
	app.post('/articles', isLoggedIn, authController.createArticle);

	// delete article
	app.delete('/articles/:id', isLoggedIn, authController.deleteArticle);

	// update article
	app.put('/articles', isLoggedIn, authController.updateArticle);

	// if logged in else redirect to signin page
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/signin');
 
    }
 
}