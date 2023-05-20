const userModel = require('../models/userModels');

module.exports.getUser = async function getUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    if (user) {
      return res.json(user);
    } 
    else {
      return res.status(404).json({ message: "User not found"});
    }
  } 
  catch (error) {
    // console.error("Error retrieving user:", error);
    return res.status(500).json({ message: "An error occurred while retrieving the user" });
  }
};

// functions postUser
// module.exports.postUser = function postUser(req, res) {
//   console.log(req.body);
//   users = req.body; //fill users
//   res.json({
//     message: "data received successfully",
//     users: req.body,
//   });
// }

// function for UpdateUser
module.exports.updateUser = async function updateUser(req, res) {
  // console.log("req.body-->", req.body);
  try {
    let id = req.params.id;
    //update data in user object
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save;
      res.json({
        message: "data updated successfully",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
  // for (key in dataToBeUpdated) {
  //     users[key] = dataToBeUpdated[key];
  // }
};

// fucntion for deletion
module.exports.deleteUser = async function deleteUser(req, res) {
  // users = {};
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }
    res.json({
      message: "Data deleted successfully",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//parameters
module.exports.getAllUsers = async function getAllUsers(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      return res.json({
        message: "users retrieved",
        data: users,
      });
    }
  } catch (err) {
    return res.json({
      message: err.message
    });
  }
};
