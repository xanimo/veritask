var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');
var request = require('request'); 
var path = require('path');

var app = express();
var port = process.env.PORT || 5000;

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 
app.use(express.static(process.cwd() + '/app/public'));

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

 
//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
 
 
 
app.get('/', function(req, res) {
 
    res.render("index")
 
});
 
// app.get('/search&search=:search&pageSize=:pageSize&page=:page', function(req, res) {
// 	var search = req.params.search;
// 	var from = req.params.from;
// 	var to = req.params.to;
// 	var pageSize = req.params.pageSize;
// 	var page = req.params.page;
// 	newsapi.v2.everything({
// 		q: search,
// 		from: from,
// 		to: to,
// 		pageSize: pageSize,
// 		page: page,
// 		language: 'en'
// 	}).then(function(response) {
// 		console.log(response);
// 		return response;
// 	}).then(function(data) {
// 		console.log(data);
// 		res.render("search", data);
// 	});
    // var search = req.params.search;
    // var pageSize = req.params.pageSize;
    // var apiKey = "353a8fddcaba4e7dafde4210fc1dc13c";
    // request("https://newsapi.org/v2/everything?q=" + search + "&pageSize=5&totalResults=5&apiKey=" + apiKey, function(error, response, body) {
    //   res.render("search", JSON.parse(body));
    //   //res.json(JSON.parse(body));
    // });


//Models
var models = require(path.join(__dirname, "./app/models"));
 
//Routes
 
var authRoute = require('./app/routes/auth.js')(app, passport);

//load passport strategies
 
require('./app/config/passport/passport.js')(passport, models.user);
 
 
//Sync Database
 
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});
 
 
app.listen(port, function(err) {
 
    if (!err)
 
        console.log("Site is live and listening on port: " + port);
         
    else console.log(err)
 
});