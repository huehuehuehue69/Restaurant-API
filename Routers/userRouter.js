const express = require("express");
const userRouter = express.Router();
const protectRoute = require('./authHelper');
const userModel = require("../models/userModels");
const {getUser, getUserById, updateUser, deleteUser, postUser} = require("../controllers/userController");
userRouter

  .route("/")
  .get(protectRoute, getUser)
  
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);


userRouter.route("/:id").get(getUserById)

module.exports = userRouter;
