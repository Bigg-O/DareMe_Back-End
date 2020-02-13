const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.get_all = (req, res, next) => {
  User.find()
    .then(users => {
      return res.status(200).json({
        "count": users.length,
        "request": "GET",
        "users": users
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.get_one = (req, res, next) => {
  User.find({ _id: req.params.id })
    .select("wallet _id email username about")
    .then(users => {
      return res.status(200).json(
        users[0]
      )
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.signup = (req, res, next) => {
  User.find({ username: req.body.username })
    .then(user => {
      if (user.length > 0)
        return res.status(409).send({
          message: "Username exists"
        });
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              username: req.body.username,
              password_digest: hash,
              wallet: 100,
              about: req.body.about
            });
            user.save()
              .then(result => {
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.login = (req, res, next) => {
  User.find({ username: req.body.username })
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, users[0].password_digest, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          })
        } else if (result) {
          const token = jwt.sign(
            {
              userId: users[0]._id,
              username: users[0].username
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user: {
              _id: users[0]._id,
              username: users[0].username,
              email: users[0].email,
              wallet: users[0].wallet,
              about: users[0].about
            }
          });
        } else
          res.status(401).json({
            message: "Auth failed"
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.update = (req, res, next) => {
  console.log(req.params.id)
  console.log(req.body)
  const id = req.params.id;
  const updateOps = { wallet: req.body.wallet }
  User.update({ _id: id }, { $set: updateOps })
    .then(result => {
      res.status(200).json({
        message: "User updated",
        request: {
          type: "PATCH",
          url: "http://localhost:3000/Dares/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.delete = (req, res, next) => {
  User.remove({ _id: req.params.id })
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
