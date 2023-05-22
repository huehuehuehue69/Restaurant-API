const express = require("express");
const paymentRouter = express.Router();
const {createSession} = require("../controllers/paymentController");
const { protectRoute } = require("../controllers/authController");
paymentRouter.use(express.static("public"));
paymentRouter
    .route('/createSession')
    .get(function (req, res) {
        res.sendFile("D:/BackendDevelopment/public/payment.html");
});
// paymentRouter.use(protectRoute);
paymentRouter
    .route('/createSession')
    .post(createSession);

module.exports = paymentRouter;