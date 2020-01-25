'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    date: DataTypes.DATE,
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};