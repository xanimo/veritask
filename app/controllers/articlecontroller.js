var db = require("../models");

module.exports = function(app) {
   // GET route for getting all of the articles
  app.get("/api/articles", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.user
    db.Article.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbArticle) {
      res.json(dbArticle);
    });
  });

  // Get route for retrieving a single article
  app.get("/api/articles/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.user
    db.Article.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbArticle) {
      res.json(dbArticle);
    });
  });

  // Post route for saving a new article
  app.post("/api/articles", function(req, res) {
    db.Users.create(req.body).then(function(dbArticle) {
      res.json(dbArticle);
    });
  });

  // DELETE route for deleting articles
  app.delete("/api/articles/:id", function(req, res) {
    db.Article.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbArticle) {
      res.json(dbArticle);
    });
  });
  
  // PUT route for updating articles
  app.put("/api/articles", function(req, res) {
    db.Article.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbArticle) {
        res.json(dbArticle);
      });
  }); 
};