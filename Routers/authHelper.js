const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets.js");
//middle to check if user is logged in before accessing data\
let flag = false ; // user logged in 
function protectRoute(req, res, next){
  if(req.cookies.login){
    let IsVerified = jwt.verify(req.cookies.login, JWT_KEY);
    if(IsVerified){
        next();
    }
    else{
        res.json({
            message : "user not defined",
        })
    }
  }
  else{
    res.json({
      message : "operation not allowed"
    })
  }
}
module.exports = protectRoute;