const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            return res.json({
                message: "reviews received",
                data: reviews,
            });
        } else {
            return res.status(404).json({
                message: "No reviews found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.top3reviews = async function top3reviews(req, res) {
    try {
        const reviews = await reviewModel
            .find()
            .sort({
                rating: -1,
            })
            .limit(3);
        if (reviews) {
            return res.json({
                message: "reviews received",
                data: reviews,
            });
        } else {
            return res.status(404).json({
                message: "No reviews found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        let planId = req.params.id;
        let reviews = await reviewModel.find();
        if (reviews) {
            reviews.filter(review => review.plan["_id"] == planId)
            return res.json({
                message: "review received",
                data: reviews,
            });
        } else {
            return res.status(404).json({
                message: "No reviews found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.createReview = async function createReview(req, res) {
    try {
        let id = req.params.plan;
        let plan = await planModel.findById(id);
        let review = req.body;
        let postreview = await reviewModel.create(review);
        await postreview.save();
        //update average rating code here
        if (review) {
            return res.json({
                message: "review posted",
                data: review,
            });
        } else {
            return res.status(404).json({
                message: "No reviews found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.updateReview = async function updateReview(req, res) {
    try {
        let planId = req.params.plan;
        if (planId) {
            let id = req.body.id;
            let review = await reviewModel.findById(id);
            let dataToBeUpdated = req.body;
            let keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                review[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await review.save();
            return res.json({
                message: "review updated succesfully",
                data: review,
            });
        } else {
            return res.status(404).json({
                message: "user not found",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let planId = req.params.plan;
        if (planId) {
            let id = req.body.id;
            let review = await reviewModel.findByIdAndDelete(id);
            return res.json({
                message: "data deleted successfully",
                data: review,
            });
        } else {
            return res.json({
                message: "User not found",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};
