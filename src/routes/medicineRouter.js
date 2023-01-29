const { Router } = require("express");
const { getMedicines } = require("../controllers/medicineController");

const medicineRouter = Router();

medicineRouter.get("/", getMedicines);

module.exports = { medicineRouter };
