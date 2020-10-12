const response = require("../Helper/Res");
const db = require("../Helper/db");
const userModel = require("../Models/Users");
const bcrypt = require("bcrypt");
module.exports = {
  getUsers: (req, res) => {
    userModel.getUsers(db, (err, result) => {
      if (err) {
        response(err.message, res, 500);
      } else {
        response(result, res, 200);
      }
    });
  },

  addUsers: (req, res) => {
    // userModel.addUsers(db, req.body, (err) => {
    //   if (err) {
    //     response(err.message, res, 500);
    //   } else {
    //     response("Successfully create users", res, 201);
    //   }
    // });

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        response(err.message, res, 500);
      } else {
        const setData = {
          email: req.body.email,
          password: hash,
        };
        userModel.addUsers(db, setData, (err) => {
          if (err) {
            response("Email has been used ", res, 400);
          } else {
            response("Successfully create users", res, 201);
          }
        });
      }
    });
  },

  updateUsers: (req, res) => {
    if (!req.body.password) {
      userModel.updateUsers(db, req.body, req.params.id, (err) => {
        if (err) {
          response(err.message, res, 500);
        } else {
          response("Successfully update users", res, 200);
        }
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          response(err.message, res, 500);
        } else {
          const setData = {
            ...req.body,
            password: hash,
          };
          userModel.updateUsers(db, setData, req.params.id, (err) => {
            if (err) {
              response(err.message, res, 400);
            } else {
              response("Successfully update users", res, 200);
            }
          });
        }
      });
    }
  },

  deleteUsers: (req, res) => {
    userModel.deleteUsers(db, req.params.id, (err) => {
      if (err) {
        response(err, res, 500);
      } else {
        response("Successfully delete users", res, 200);
      }
    });
  },
};
