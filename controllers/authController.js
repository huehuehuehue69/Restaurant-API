const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets");

//signup
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    if (!dataObj.password == dataObj.confirmPassword) {
      return res.status(401).json({
        message: "Password does not match",
      });
    }
    let user = await userModel.create(dataObj);
    await user.save();
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
      console.log(user);
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
    try {
      if (roles.includes(req.role) == true) {
        next();
      } else {
        res.status(401).json({
          message: "operation not allowed",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
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
      //   console.log(payload);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        //browser
        const client = req.get("User-Agent");
        if (client.includes("Mozilla") == true) {
          return res.redirect("/login");
        }
        //postman
        return res.json({
          message: "please login",
        });
      }
    } else {
      const client = req.get("User-Agent");
      if (client.includes("Mozilla") == true) {
        return res.redirect("/login");
      }
      //postman
      return res.json({
        message: "please login",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//forgot password
module.exports.forgotpassword = async function forgotpassword(req, res) {
  let { useremail } = req.body;
  try {
    const user = await userModel.findOne({ email: useremail });
    if (user) {
      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${req.resetToken}`;
    } else {
      return res.json({
        message: "please signup",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//reset password
module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetPassword handler will update user in data base
      user.resetpasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "password changed successfully. Please login again",
      });
    } else {
      return res.json({
        message: "please signup",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

//logout function
module.exports.logout = function logout(req, res) {
  res.cookie("login", " ", { maxAge: 1 }); //replace token from login cookie and destroy the cookie after 1 ms.
  res.json({
    message: "user logged out successfully",
  });
};
