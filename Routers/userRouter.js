const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModels");
const {getUser, updateUser, deleteUser, getAllUsers} = require("../controllers/userController");
const {signup, login, isAuthorised, protectRoute, forgotpassword,resetpassword,logout} = require("../controllers/authController")

//user options
userRouter 
  .route("/:id")
  .patch(updateUser)
  .delete(deleteUser)

userRouter
  .route("/signup")
  .post(signup)

userRouter
  .route("/login")
  .post(login)

//profile function
userRouter.use(protectRoute);
userRouter
  .route("/profile")
  .get(getUser)
  
//admin specific func
userRouter.use(isAuthorised(["admin"]))
userRouter 
  .route('/')
  .get(getAllUsers)

//forgot password
userRouter
  .route("/forgotpassword")
  .post(forgotpassword)

//reset passward 
userRouter
  .route("/resetpassword/:token")
  .post(resetpassword)

userRouter
  .route("/logout")
  .get(logout)

module.exports = userRouter;
