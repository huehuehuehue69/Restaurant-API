
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets");

//signup
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if (user) {
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signing up",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//login
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        if (user.password == data.password) {
          let uid = user["_id"];
          let jwtToken = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", jwtToken, { httpOnly: true });
          return res.json({
            message: "User has logged in",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong Credentials",
          });
        }
      } else {
        return res.json({
          message: "user does not exist",
        });
      }
    } else {
      return res.json({
        message: "empty field",
      });
    }
  } catch {
    return res.json({
      message: error.message,
    });
  }
};

//isAuthorised = to check the users's role
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};

//protectRoute
module.exports.protectRoute = async function protectRoute(req, res, next) {
  let token;
  try {
    if (req.cookies.login) { 
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        return res.json({
          message: "user not defined",
        });
      }
    }
    else{
        res.json({
            message : "please login"
        })
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
