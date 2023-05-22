// This is your test secret API key.
const SK = process.env.SK;
const stripe = require('stripe')(SK);
const planModel = require("../models/planModel");
const userModels = require("../models/userModels");

module.exports.createSession = async function createSession(req, res) {
    console.log("done");
    try {
        let userId = req.id;
        let planId = req.params.id;
        const user = await userModels.findById(userId);
        const plan = await planModel.findById(planId);
        console.log(plan);
        const session = await stripe.checkout.session.create({
            payment_method_types: ["card"],
            customer_email: user.email,
            client_reference_id: plan.id,
            line_items: [
                {
                    name: plan.name,
                    description: plan.description,
                    amount: plan.price,
                    currency: "inr",
                    quantity: 1
                }
            ],
            success_url: `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get("host")}/profile`
        });
        // res.status(303).redirect("D:/BackendDevelopment/public/index.html");
        console.log(session);
        res.status(200).json({
            message: "success"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
};

