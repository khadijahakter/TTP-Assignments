'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.hasMany(models.Comment);
    }
  }
  Post.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
    tableName: "posts",
  });
  return Post;
};