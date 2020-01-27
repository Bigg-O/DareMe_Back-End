const mongoose = require("mongoose");
const Dare = require("../models/dare");

exports.get_all = (req, res, next) => {
  Dare.find()
    .then(dares => {
      const response = {
        count: dares.length,
        dares: dares.map(dare => {
          return {
            name: dare.name,
            price: dare.price,
            DareImage: are.DareImage,
            _id: are._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/Dares/" + are._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.create = (req, res, next) => {
  const dare = new Dare({
    id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    open_title: req.body.open_title,
    open_description: req.body.open_description,
    open_pic_url: req.body.open_pic_url,
    wanted_profit: req.body.wanted_profit,
    amount: req.body.amount
  });
  dare.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Dare successfully",
        createdDare: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/Dares/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_one = (req, res, next) => {
  const id = req.params.id;
  Dare.findById(id)
    .select("name price _id dareImage")
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          Dare: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/Dares"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.update = (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Dare.update({ _id: id }, { $set: updateOps })
    .then(result => {
      res.status(200).json({
        message: "Dare updated",
        request: {
          type: "GET",
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
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Dare.remove({ _id: id })
    .then(result => {
      res.status(200).json({
        message: "Dare deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/Dares",
          body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
