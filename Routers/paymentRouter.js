const express = require("express");
const paymentRouter = express.Router();
const {createSession} = require("../controllers/paymentController");
const { protectRoute } = require("../controllers/authController");
const path = require('path');
// paymentRouter.use(express.static("public"));
paymentRouter
    .route('/createSession')
    .get(function (req, res) {
        const filePath = path.join(__dirname, '../public/payment.html');
        res.sendFile(filePath);
});
// paymentRouter.use(protectRoute);
paymentRouter
    .route('/createSession')
    .post(createSession);

module.exports = paymentRouter;