const planModel = require("../models/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      res.json({
        message: "all plans retrieved",
        data: plans,
      });
    } else {
      res.status(404).json({
        message: "No plans found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({
        message: "plan",
        data: plan,
      });
    } else {
      return res.status(404).json({
        message: "plan not found",
      });
    }
  } catch {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.json({
      message: "plan created Successfully",
      data: createdPlan,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    if (id) {
      let planToBeDeleted = await planModel.findByIdAndDelete(id);
      return res.json({
        message: "data deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "data does not exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    if (id) {
      let dataToBeUpdated = req.body;
      let keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      let plan = await planModel.findById(id);
      //   console.log(plan);
      for (let i = 0; i < keys.length; i++) {
        plan[keys[i]] = dataToBeUpdated[keys[i]];
      }
      //   console.log(plan);
      await plan.save();
      res.json({
        message: "data updated successfully",
        data: plan,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch {
    return res.json({
      message: err.message,
    });
  }
};

module.exports.top3plans = async function top3plans(req, res) {
  try {
    const _3plans = await planModel
      .find()
      .sort({
        ratingAverage: -1,
      })
      .limit(3);
    return res.json({
      message: "Top 3 Plans",
      data: _3plans,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
