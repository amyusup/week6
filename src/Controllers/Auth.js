const response = require("../Helper/Res");
const db = require("../Helper/db");
const authModel = require("../Models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        response(err.message, res, 500);
      } else {
        const setData = {
          email: req.body.email,
          password: hash,
        };
        authModel.Register(db, setData, (err) => {
          if (err) {
            response("Email has been used ", res, 400);
          } else {
            response("Register Successfully", res, 201);
          }
        });
      }
    });
  },

  login: (req, res) => {
    authModel.getEmail(db, req.body.email, (err, result) => {
      if (err) {
        response(err.message, res, 400);
      } else {
        if (!result.length) {
          response("Username or password is incorrect!", res, 401);
        } else {
          
          bcrypt.compare(
            req.body.password,
            result[0]["password"],
            (bErr, bResult) => {
              if(bErr){
                response("Username or password is incorrect!", res, 401);
              }else{
                if(bResult){
                  const token = jwt.sign({
                    userId:result[0].id,
                    email:result[0].email,
                    role:result[0].role
                  },
                  process.env.SECRET_KEY)

                  authModel.lastLogin(db,result[0].id,(err)=>{
                    if(err){
                      response("Failed to login", res, 401);
                    }else{
                      response({
                        msg:'Successfully login',
                        token:token,
                        user:result[0]
                      }, res, 200);
                    }
                  })
                }else{
                  response("Username or password is incorrect!", res, 401);
                }
              }
            }
          );
        }
      }
    });
  },
};
