const express = require("express");
const crypto = require("crypto");
const stripe = require("stripe");
const userModel = require("./models/userModels");
const planModel = require("./models/planModel");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json()); 
app.use(cors());
const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`server listening on port ${port}`)
});
const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");
const paymentRouter = require("./Routers/paymentRouter");

//middle ware function used in POST method to convert frontend data to json format
// app.use(express.static("public/build")); build folder consist of frontend part use this when using fromt end part
//global middleware

app.use(cookieParser());
app.use("/user", userRouter); // base Route with which router to use
app.use("/auth", authRouter); // for authentication
app.use("/plans", planRouter); // for plans
app.use("/reviews", reviewRouter); //for reviews
app.use("/payment", paymentRouter); //for payments

