var db = require("../models");
var NewsAPI = require('newsapi');
var newsapi = new NewsAPI('353a8fddcaba4e7dafde4210fc1dc13c');

var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 
    res.render('signin');
 
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

exports.findAllUsers = function(req, res) {
    db.user.findAll({
      include: [db.article]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  }

exports.findOneUser = function(req, res) {
	    db.user.findOne({
      where: {
        id: req.params.id
      },
      include: [db.article]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  }

exports.createUser = function(req, res) {
	  db.user.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
}

exports.deleteUser = function(req, res) {
	  db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
}

exports.findAllArticles = function(req, res) {
	var query = {};
    if (req.query.id) {
      query.Id = req.query.id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.user
    db.article.findAll({
      where: query,
      include: [db.user]
    }).then(function(dbArticle) {
      res.json(dbArticle);
    });
}

exports.findOneArticle = function(req, res) {
	// Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.user
    db.article.findOne({
      where: {
        id: req.params.id
      },
      include: [db.user]
    }).then(function(dbArticle) {
      res.json(dbArticle);
    });
}

exports.createArticle = function(req, res) {
	db.article.create(req.body).then(function(dbArticle) {
    res.json(dbArticle);
    });
}

exports.deleteArticle = function(req, res) {
	db.article.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbArticle) {
      res.json(dbArticle);
    });
}

exports.updateArticle = function(req, res) {
	  db.article.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbArticle) {
        res.json(dbArticle);
      });
  }

exports.search = function(req, res) {

	res.render("search");

}

exports.fetchApi = function(req, res) {
	var search = req.params.search;
	var from = req.params.from;
	var to = req.params.to;
	var pageSize = req.params.pageSize;
	var page = req.params.page;
	newsapi.v2.everything({
		q: search,
		from: from,
		to: to,
		pageSize: pageSize,
		page: page,
		language: 'en'
	}).then(function(response) {
		console.log(response);
		return response;
	}).then(function(data) {
		console.log(data);
		res.render("search", data);
	});
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}