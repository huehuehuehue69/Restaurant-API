const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

module.exports.getAllReviews = async function getAllReviews(req, res){
    try{
        const reviews = await reviewModel.find();
        if(reviews){
            return res.json({
                message : "reviews received",
                data : reviews
            })
        }
        else{
            return res.status(404).json({
                message : "No reviews found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
};

module.exports.top3reviews = async function top3reviews(req, res){
    try{
        const reviews = await reviewModel.find().sort({
            ratings : -1
        }).limit(3);
        if(reviews){
            return res.json({
                message : "reviews received",
                data : reviews
            })
        }
        else{
            return res.status(404).json({
                message : "No reviews found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res){
    try{
        const id = req.params.id;
        const review = await reviewModel.findById(id);
        if(review){
            return res.json({
                message : "review received",
                data : review
            })
        }
        else{
            return res.status(404).json({
                message : "No reviews found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
};

module.exports.createReview = async function createReview(req, res){
    try{
        let id = req.params.plan;
        let plan = await planModel.findById(id);
        let review = req.body;  
        let postreview = await reviewModel.create(review);
        if(review){
            return res.json({
                message : "review received",
                data : review
            })
        }
        else{
            return res.status(404).json({
                message : "No reviews found"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
};

