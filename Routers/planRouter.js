const express = require("express");
const planRouter = express.Router();
const {protectRoute, isAuthorised} = require("../controllers/authController");
const {getAllPlans, getPlan, createPlan, updatePlan, deletePlan,top3plans} = require("../controllers/planController");


planRouter
    .route("/top3")
    .get(top3plans)

planRouter
    .route("/allplans")
    .get(getAllPlans)
//our own plan

planRouter.use(protectRoute)
planRouter
    .route("/plan/:id")
    .get(getPlan)

//admin and owner can only create , update , and delete plans
planRouter.use(isAuthorised("admin", "owner"));
planRouter
    .route("/crudplan")
    .post(createPlan)

planRouter
    .route("/crudplan/:id")
    .patch(updatePlan)
    .delete(deletePlan)


module.exports = planRouter;

