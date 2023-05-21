const mongoose = require("mongoose"); 
//mongoose
const db_link = "mongodb://127.0.0.1:27017/personal";
// console.log(db_link)
mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("plan connect");
  })
  .catch(function (err) {
    console.log("plan is not connect");
  });

