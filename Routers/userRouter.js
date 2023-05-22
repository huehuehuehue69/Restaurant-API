const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModels");
const { getUser, updateUser, deleteUser, getAllUsers, updateProfileImage} = require("../controllers/userController");
const { signup, login, isAuthorised, protectRoute, forgotpassword, resetpassword, logout } = require("../controllers/authController");
const multer = require("multer");

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

//forgot password
userRouter
  .route("/forgotpassword")
  .post(forgotpassword)

//reset passward  
userRouter
  .route("/resetpassword/:token")
  .post(resetpassword)

//multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/BackendDevelopment/public/Images")
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`)
  }
});
//filter
const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."));
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: filter
});
userRouter.post("/ProfileImage", upload.single("photo"), updateProfileImage);
userRouter.get("/ProfileImage", (req, res)=>{
  res.sendFile("D:/BackendDevelopment/public/multer.html")
})
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


userRouter
  .route("/logout")
  .get(logout)

module.exports = userRouter;
