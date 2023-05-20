const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets.js");
authRouter.route("/signup").get(middleware, getSignUp).post(postSignUp);

authRouter.route("/login").post(loginUser);
// middleware function
function middleware(req, res, next) {
  console.log("middleware mil gya");
  next();
}

//function for getsignup
function getSignUp(req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
}

// function for postSignUp
async function postSignUp(req, res) {
  let dataObj = req.body;
  let user = await userModel.create(dataObj);
  res.json({
    message: "user signed up",
    data: user,
  });
}

async function loginUser(req, res) {  
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        if (user.password == data.password) {
          let uid = user["_id"];
          let jwtToken = jwt.sign({payload : uid} , JWT_KEY)
          res.cookie('login', jwtToken, {httpOnly : true});
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
}
module.exports = authRouter;
