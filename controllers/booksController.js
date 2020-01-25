const db = require("../models");
var bcrypt = require('bcryptjs');
const saltRounds = 10;
// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book
      .findAll(req.query)
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    db.Book
      .findOne({where: {
        id: req.params.id
      }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({where: {
        id: req.params.id
      } }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .destroy({where: {
        id: req.params.id
      } })
     
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
