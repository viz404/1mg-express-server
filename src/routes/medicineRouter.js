const { Router } = require("express");
const {
  getMedicines,
  getSingleMedicine,
} = require("../controllers/medicineController");

const medicineRouter = Router();

medicineRouter.get("/", getMedicines);
medicineRouter.get("/:id", getSingleMedicine);

module.exports = { medicineRouter };
