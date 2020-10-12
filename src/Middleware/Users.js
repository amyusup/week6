const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    if (
      req.body.password != req.body.repeatPassword
    ) {
      return res.status(400).send("Both passwords must match");
    }
    next();
  },

  isLoggedIn:(req,res,next)=>{
    try{
      const token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(
        token,
        process.env.SECRET_KEY
      )
      req.userData = decode
      console.log (req.userData['role'])
      next()
    }catch(err){
      // console.log(err)
      return res.status(401).send('Your session is not valid!')
    }
  },

  isAdmin:(req,res,next)=>{
    try{
      const token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(
        token,
        process.env.SECRET_KEY
      )
      req.userData = decode
      if(req.userData['role'] == 1){
        next()
      }else{
        return res.status(401).send('Your session is not valid!')
      }
    }catch(err){
      // console.log(err)
      return res.status(401).send('Your session is not valid!')
    }
  }
};
