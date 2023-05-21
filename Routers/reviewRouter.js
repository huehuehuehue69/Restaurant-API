const express = require("express");
const reviewRouter = express.Router();
const {protectRoute} = require("../controllers/authController"); 
const reviewModel = require("../models/reviewModel");

reviewRouter
    .route("/all")
    .get(getAllReviews)

reviewRouter
    .route("/top3")
    .get(top3reviews)

reviewRouter
    .route("/:id")
    .get(getPlanReviews)
        
reviewRouter.use(protectRoute)
reviewRouter
    .route("/crud/:plan")
    .post(createReview)

reviewRouter
    .route("/crud/:id")
    .patch(updateReview)
    .delete(deleteReview)

module.exports = reviewRouter;