const mongoose = require("mongoose");
//mongoose
const db_link = process.env.DATABASE;
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
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, "plan name should not exceed 20 characters"]
    },
    duration: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: [true, " price not entered"]
    },
    ratingAverage: {
        type: Number,
    },
    discount: {
        type: Number,
        validate: [function () {
            return this.discount < 100
        }, "discount should not exceed price"]
    }
});


//plan model
const planModel = mongoose.model
    ("planModel", planSchema);

module.exports = planModel;