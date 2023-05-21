const express = require("express");
const crypto = require("crypto");
const userModel = require("./models/userModels");
const planModel = require("./models/planModel");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
const planRouter = require("./Routers/planRouter");
// const reviewRouter = require("./Routers/reviewRouter");
const app = express();
//middle ware function used in POST method to convert frontend data to json format
app.use(express.json()); //global middleware
app.use(cookieParser());
app.use("/user", userRouter); // base Route with which router to use
app.use("/auth", authRouter); // for authentication
app.use("/plans", planRouter); // for plans
// app.use("/reviews", reviewRouter); //for reviews
app.listen(3000);
