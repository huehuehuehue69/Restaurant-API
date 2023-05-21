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

//schema
const planSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        unique : true,
        maxlength : [20, "plan name should not exceed 20 characters"]
    },
    duration:{
        type : Number,
        required :true,
    },
    price : {
        type : Number,
        required : [true, " price not entered"]
    },
    ratingAverage : {
        type : Number,
    },
    discount : {
        type : Number,
        validate : [function(){
            return this.discount < 100
        }, "discount should not exceed price"]
    }
});


//plan model
const planModel = mongoose.model
("planModel", planSchema);
//dummy
// (async function createPlan(){
//     let planObj ={
//         name : "Ultra",
//         duration : 20,
//         price : 100,
//         ratingAverage : 4,
//         discount : 10,
//     }
//     let data = await planModel.create(planObj);
//     console.log(data);
// })();

module.exports = planModel;