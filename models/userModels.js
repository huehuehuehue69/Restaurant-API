const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
//mongoose
const db_link = "mongodb://127.0.0.1:27017/personal";
// console.log(db_link)
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("database connect");
  })
  .catch(function (err) {
    console.log("mongodb is not connect");
  });

//schema of database
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    // validate: function () {
    //   return this.confirmPassword == this.password;
    // },
  },
  role: {
    type: String,
    enum: ["admin", "user", "owner", "deliveryBoy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "/image/user/default.jpeg",
  },
});

//function for creating user
// (async function createUser(){
//     let user = {
//         name  : "huehuehue",
//         email : "huehuehue@gmail.com",
//         password : "12345678",
//         confirmPassword : " 12345678"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();

//basic syntax of hooks for operations before and after saving
// userSchema.pre('save',function(){
//     console.log('before', this);
// });

// userSchema.post('save', function(doc){
//     console.log('after', doc);
// });

//not save confirm password in database
userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

//hash function
// userSchema.pre("save", async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
// })
// user model
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
