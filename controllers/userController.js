module.exports.getUser = async function getUser(req, res) {
  let allUser = await userModel.find();
  res.json({
    message: "list of all users",
    data: allUser,
  });
}

// functions postUser
module.exports.postUser = function postUser(req, res) {
  console.log(req.body);
  users = req.body; //fill users
  res.json({
    message: "data received successfully",
    users: req.body,
  });
}

// function for UpdateUser
module.exports.updateUser = async function updateUser(req, res) {
  // console.log("req.body-->", req.body);
  //update data in user object
  let dataToBeUpdated = req.body;
  let user = await userModel.findOneAndUpdate(
    { email: "huehuehue@gmail.com" },
    dataToBeUpdated
  );
  // for (key in dataToBeUpdated) {
  //     users[key] = dataToBeUpdated[key];
  // }
  res.json({
    message: "data updated successfully",
  });
}

// fucntion for deletion
module.exports.deleteUser = function deleteUser(req, res) {
  // users = {};
  let dataToBeDeleted = req.body;
  let user = userModel.findOneAndDelete({ dataToBeDeleted });
  res.json({
    message: "Data deleted successfully",
  });
}

//parameters
module.exports.getUserById = function getUserById(req, res) {
  console.log(req.params.id);
  let paramId = req.params.id;
  let obj = {};
  for (let i = 0; i < users.length; ++i) {
    if (users[i]["Id"] == paramId) {
      obj = users[i];
    }
  }
  res.json({
    message: "req received",
    data: obj,
  });
}
