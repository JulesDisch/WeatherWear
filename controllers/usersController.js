const db = require("../models");
var bcrypt = require('bcryptjs');
const saltRounds = 10;
// Defining methods for the UsersController
module.exports = {
  findAll: function (req, res) {
    db.User
      .findAll(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  initial: function(req, res){
    db.User
    .findOne({where: {
      id: req.params.id
    }})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  findOne: function (req, res) {
    db.User
      .findOne({
        where: {
          id: req.params.id
        }
      }).then(function(dbModel) {
        if (!dbModel) {
          res.redirect('/');
        } else {
          bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result == true) {
              res.redirect('/home');
            } else {
              res.send('Incorrect password');
              res.redirect('/');
            }
          });
        }
      });
  },
  create: function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash
      }).then(function (data) {
        if (data) {
          console.log(data)
          res.json({ ...data.dataValues, success: true })
        }
      });
    });
  },
  update: function (req, res) {
    db.User
      .update({
        where: {
          id: req.params.id
        }
      }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })

      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  logIn: function (req, res) {
    db.User
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ where: { username: username } }).then(user => {
      if (!user) {
        res.status(200).send({ incorrectUsername: true, inSession: false, msg: "Incorrect Username" })
      } else if (!user.validPassword(password)) {
        res.status(200).send({ incorrectPassword: true, inSession: false, msg: "Incorrect Password" })
      } else {
        res.status(200).send({
          inSession: true, msg: "Logged in!", loggedUserName: user.username
        })
      }
    })
  },

  logOut: function (req, res) {
    res.clearCookie('user_sid');
    res.status(200).send({ inSession: false });
  }
};


