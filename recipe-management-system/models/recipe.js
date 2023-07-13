'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class Recipe extends Model {
    static associate(models) {
    }
  };
  Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255], 
          },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 500], 
          },
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 1000],
          },
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 5000], 
          },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Recipe',
      tableName: 'recipes',
    });
    return Recipe;
  };