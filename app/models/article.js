module.exports = function (sequelize, DataTypes) {

  var Article = sequelize.define('article',
  {
    source: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    url: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    urlToImage: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    publishDate: {
      type: DataTypes.STRING,
      defaultValue: false
    },
    isFake: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
  // , {
  //     classMethods: {
  //       associate: function (models) {
  //         article.belongsTo(models.db.user, {
  //           onDelete: "CASCADE",
  //           foreignKey: {
  //             allowNull: true
  //           }
  //         });
  //       }
  //     }
  //   }
    );

  return Article;

};