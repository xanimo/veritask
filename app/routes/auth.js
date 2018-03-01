var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {
 
 
    app.get('/signup', authController.signup);
 
 
    app.get('/signin', authController.signin);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup'
        }
 
    ));
 
 
    app.get('/dashboard', isLoggedIn, authController.dashboard);
 
 
    app.get('/logout', authController.logout);
 
 
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signin'
        }
 
    ));

    app.get('/search', isLoggedIn, authController.search);

    app.get('/fetch&search=:search&pageSize=:pageSize&page=:page', isLoggedIn, authController.fetchApi);

    app.get('/users', isLoggedIn, authController.findAllUsers);

    app.get('/users/:id', isLoggedIn, authController.findOneUser);

	app.post('/users', isLoggedIn, authController.createUser); 
 
	app.delete('users/:id', isLoggedIn, authController.deleteUser);

	app.get('/articles', isLoggedIn, authController.findAllArticles);

	app.get('/articles/:id', isLoggedIn, authController.findOneArticle);

	app.post('/articles', isLoggedIn, authController.createArticle);

	app.delete('/articles/:id', isLoggedIn, authController.deleteArticle);

	app.put('/articles', isLoggedIn, authController.updateArticle);

    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/signin');
 
    }
 
}